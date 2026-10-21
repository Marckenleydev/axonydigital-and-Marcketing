import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import Client from "@/models/Client";
import ClientConversionConflict from "@/models/ClientConversionConflict";
import Lead from "@/models/Lead";
import { readBoundedJson } from "@/lib/server/request-body";
type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Conflict not found." }, { status: 404 });
    const body = await readBoundedJson(req, 4 * 1024);
    if (!body.ok || !body.value || typeof body.value !== "object") return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    const payload = body.value as Record<string, unknown>;
    if (payload.status === "dismissed") {
      await connectMongo();
      const conflict = await ClientConversionConflict.findOneAndUpdate({ _id: id, status: "pending" }, { $set: { status: "dismissed", reviewedBy: user.id, reviewedAt: new Date() } }, { new: true }).lean();
      return conflict ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Conflict not found." }, { status: 404 });
    }
    if (payload.status !== "resolved" || typeof payload.clientId !== "string" || !Types.ObjectId.isValid(payload.clientId)) return NextResponse.json({ error: "Choose a matched client to resolve this conflict." }, { status: 400 });
    await connectMongo();
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        const conflict = await ClientConversionConflict.findOne({ _id: id, status: "pending" }).session(session);
        if (!conflict || !conflict.matchedClientIds.some((clientId) => String(clientId) === payload.clientId)) throw new Error("CONFLICT_NOT_FOUND");
        const lead = await Lead.findById(conflict.leadId).session(session);
        const client = await Client.findById(payload.clientId).session(session);
        if (!lead || !client) throw new Error("CONFLICT_NOT_FOUND");
        if (lead.convertedClientId && String(lead.convertedClientId) !== String(client._id)) throw new Error("ALREADY_CONVERTED");
        lead.convertedClientId = client._id;
        lead.conversionConflictId = conflict._id;
        lead.activities.push({ type: "converted", actorId: new Types.ObjectId(user.id), actorName: user.name, details: `Lead converted to ${client.contactName} after conflict review.` } as never);
        client.activities.push({ type: "lead_converted", actorId: new Types.ObjectId(user.id), actorName: user.name, details: `Lead ${lead.name} was linked after conflict review.` } as never);
        conflict.status = "resolved"; conflict.reviewedBy = new Types.ObjectId(user.id); conflict.reviewedAt = new Date();
        await Promise.all([lead.save({ session }), client.save({ session }), conflict.save({ session })]);
      });
      return NextResponse.json({ ok: true });
    } catch (error) {
      if (error instanceof Error && error.message === "CONFLICT_NOT_FOUND") return NextResponse.json({ error: "Conflict or matched client not found." }, { status: 404 });
      if (error instanceof Error && error.message === "ALREADY_CONVERTED") return NextResponse.json({ error: "Lead is already linked to another client." }, { status: 409 });
      throw error;
    } finally { await session.endSession(); }
  }, ["administrator", "manager"])(request);
}
