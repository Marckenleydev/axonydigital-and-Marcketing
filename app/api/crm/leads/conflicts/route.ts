import { NextResponse } from "next/server";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import LeadConflict from "@/models/LeadConflict";

export const GET = withCrmAuth(async () => {
  await connectMongo();
  const conflicts = await LeadConflict.find({ status: "pending" }).populate("matchedLeadIds", "name company status email phone").sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ conflicts });
}, ["administrator", "manager"]);
