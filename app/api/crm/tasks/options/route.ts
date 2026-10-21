import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import Client from "@/models/Client";
import CrmUser from "@/models/CrmUser";
import Lead from "@/models/Lead";
import Project from "@/models/Project";

export const GET = withCrmAuth(async (_request, user) => {
  await connectMongo();
  const [members, leads, clients, projects] = await Promise.all([
    user.role === "team_member" ? CrmUser.find({ _id: user.id, active: true }).select("name role").lean() : CrmUser.find({ active: true }).select("name role").sort({ name: 1 }).limit(200).lean(),
    Lead.find({ archived: false, ...(user.role === "team_member" ? { assignedTo: new Types.ObjectId(user.id) } : {}) }).select("name company assignedTo").sort({ createdAt: -1 }).limit(200).lean(),
    Client.find({ archived: false, ...(user.role === "team_member" ? { accountOwner: new Types.ObjectId(user.id) } : {}) }).select("contactName companyName accountOwner").sort({ createdAt: -1 }).limit(200).lean(),
    Project.find({ archived: false, ...(user.role === "team_member" ? { $or: [{ projectManager: user.id }, { teamMembers: user.id }] } : {}) }).select("name client").sort({ createdAt: -1 }).limit(200).lean(),
  ]);
  return NextResponse.json({ members, leads, clients, projects });
}, ["administrator", "manager", "team_member"]);
