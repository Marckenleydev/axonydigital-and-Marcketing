import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import { notificationUpdateSchema } from "@/lib/validation/tasks";
import CrmNotification from "@/models/CrmNotification";

type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  return withCrmAuth(async (req, actor) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Notification not found." }, { status: 404 });
    const body = await readBoundedJson(req, 2048);
    if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
    const parsed = notificationUpdateSchema.safeParse(body.value);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid notification update." }, { status: 400 });
    await connectMongo();
    const now = new Date();
    const update: Record<string, Date | null> = {};
    if (parsed.data.read !== undefined) update.readAt = parsed.data.read ? now : null;
    if (parsed.data.dismissed !== undefined) update.dismissedAt = parsed.data.dismissed ? now : null;
    const notification = await CrmNotification.findOneAndUpdate({ _id: id, recipient: actor.id }, { $set: update }, { new: true }).select("kind title message href readAt dismissedAt createdAt recordType recordId").lean();
    if (!notification) return NextResponse.json({ error: "Notification not found." }, { status: 404 });
    return NextResponse.json({ notification });
  })(request);
}
