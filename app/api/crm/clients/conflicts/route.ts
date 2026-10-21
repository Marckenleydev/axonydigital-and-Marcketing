import { NextResponse } from "next/server";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import ClientConversionConflict from "@/models/ClientConversionConflict";

export const GET = withCrmAuth(async () => {
  await connectMongo();
  const conflicts = await ClientConversionConflict.find({ status: "pending" }).populate("leadId", "name company status email phone").populate("matchedClientIds", "contactName companyName email phone status").sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ conflicts });
}, ["administrator", "manager"]);
