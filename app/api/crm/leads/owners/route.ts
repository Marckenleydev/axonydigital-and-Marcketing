import { NextResponse } from "next/server";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import CrmUser from "@/models/CrmUser";

export const GET = withCrmAuth(async () => {
  await connectMongo();
  const owners = await CrmUser.find({ active: true }).select("name email role").sort({ name: 1 }).lean();
  return NextResponse.json({ owners });
}, ["administrator", "manager"]);
