import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import CrmSecurityState from "@/models/CrmSecurityState";
import CrmUser from "@/models/CrmUser";
import Task from "@/models/Task";
import { updateTeamMemberSchema } from "@/lib/validation/tasks";
type Context = { params: Promise<{ id: string }> };
const GUARD_KEY = "team-admin-mutation-lock";

export async function GET(request: Request, context: Context) {
  return withCrmAuth(async (_req, actor) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    await connectMongo();
    const member = await CrmUser.findById(id).select("name email role active createdAt updatedAt activities").lean();
    if (!member) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    const tasks = await Task.find({ assignee: id, archived: false }).select("title status priority dueDate project client lead updatedAt").populate("project", "name").populate("client", "contactName companyName").populate("lead", "name company").sort({ dueDate: 1 }).limit(100).lean();
    return NextResponse.json({ member, tasks });
  }, ["administrator"])(request);
}

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, actor) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    await connectMongo();
    const body = await readBoundedJson(req, 4 * 1024);
    if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = updateTeamMemberSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid team update." }, { status: 400 });
    if (id === actor.id) return NextResponse.json({ error: "You cannot change your own role or active status." }, { status: 403 });
    // Ensure the single guard record exists before transaction retries serialize competing admin mutations.
    try { await CrmSecurityState.updateOne({ key: GUARD_KEY }, { $setOnInsert: { key: GUARD_KEY, lockVersion: 0 } }, { upsert: true }); }
    catch (error) { if (!(error && typeof error === "object" && "code" in error && error.code === 11000)) throw error; }
    const session = await mongoose.startSession();
    let failure: { status: number; message: string } | null = null;
    try {
      await session.withTransaction(async () => {
        await CrmSecurityState.updateOne({ key: GUARD_KEY }, { $inc: { lockVersion: 1 } }, { session });
        const target = await CrmUser.findById(id).session(session);
        if (!target) { failure = { status: 404, message: "Team member not found." }; return; }
        const nextRole = parsed.data.role ?? target.role;
        const nextActive = parsed.data.active ?? target.active;
        const removesAdmin = target.role === "administrator" && target.active && (nextRole !== "administrator" || !nextActive);
        if (removesAdmin) {
          const otherAdmins = await CrmUser.countDocuments({ _id: { $ne: target._id }, role: "administrator", active: true }).session(session);
          if (otherAdmins === 0) { failure = { status: 409, message: "The last active administrator cannot be demoted or deactivated." }; return; }
        }
        const now = new Date(); const events: { type: string; details: string }[] = [];
        if (parsed.data.role && parsed.data.role !== target.role) events.push({ type: "role_changed", details: `Role changed from ${target.role} to ${parsed.data.role}.` });
        if (parsed.data.active !== undefined && parsed.data.active !== target.active) events.push({ type: parsed.data.active ? "activated" : "deactivated", details: parsed.data.active ? "Account activated." : "Account deactivated." });
        if (!events.length) { failure = { status: 400, message: "The requested values are already set." }; return; }
        target.role = nextRole; target.active = nextActive;
        for (const event of events) target.activities.push({ ...event, actorId: new Types.ObjectId(actor.id), actorName: actor.name, createdAt: now });
        if (target.activities.length > 300) target.activities.splice(0, target.activities.length - 300);
        await target.save({ session });
      }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
    } catch (error) {
      if (error instanceof Error && /Transaction numbers are only allowed|replica set|does not support transactions|transactions are not supported/i.test(error.message)) return NextResponse.json({ error: "Team role and active-state changes require MongoDB transactions. Configure a replica set or MongoDB Atlas cluster." }, { status: 503 });
      throw error;
    } finally { await session.endSession(); }
    const mutationFailure = failure as { status: number; message: string } | null;
    if (mutationFailure) return NextResponse.json({ error: mutationFailure.message }, { status: mutationFailure.status });
    const member = await CrmUser.findById(id).select("name email role active createdAt updatedAt activities").lean();
    return NextResponse.json({ member });
  }, ["administrator"])(request);
}
