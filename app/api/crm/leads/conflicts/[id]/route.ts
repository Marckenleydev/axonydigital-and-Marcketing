import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import LeadConflict from "@/models/LeadConflict";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return withCrmAuth(async (req, user) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Conflict not found." }, { status: 404 });
    const parsedBody = await readBoundedJson(req, 2 * 1024);
    if (!parsedBody.ok) return NextResponse.json({ error: parsedBody.reason === "too_large" ? "Request is too large." : "Invalid JSON body." }, { status: parsedBody.reason === "too_large" ? 413 : 400 });
    const body = parsedBody.value;
    const status = body && typeof body === "object" && "status" in body ? body.status : undefined;
    if (status !== "resolved" && status !== "dismissed") return NextResponse.json({ error: "Choose a valid review outcome." }, { status: 400 });
    await connectMongo();
    const conflict = await LeadConflict.findOneAndUpdate({ _id: id, status: "pending" }, {
      $set: { status, reviewedBy: user.id, reviewedAt: new Date() },
    }, { new: true }).select("_id status reviewedAt").lean();
    if (!conflict) return NextResponse.json({ error: "Conflict not found or already reviewed." }, { status: 404 });
    return NextResponse.json({ conflict });
  }, ["administrator", "manager"])(request);
}
