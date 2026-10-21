import { NextResponse } from "next/server";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { createDueNotifications } from "@/lib/server/notifications";
import CrmNotification from "@/models/CrmNotification";

export const GET = withCrmAuth(async (_request, actor) => {
  await connectMongo();
  await createDueNotifications(actor.id);
  const [notifications, unread] = await Promise.all([
    CrmNotification.find({ recipient: actor.id, dismissedAt: null }).select("kind title message href readAt createdAt recordType recordId").sort({ createdAt: -1 }).limit(50).lean(),
    CrmNotification.countDocuments({ recipient: actor.id, dismissedAt: null, readAt: null }),
  ]);
  return NextResponse.json({ notifications, unread });
});
