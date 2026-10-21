import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Lead from "@/models/Lead";
import CrmUser from "@/models/CrmUser";
import { createLeadSchema, leadListQuerySchema, normalizePhone } from "@/lib/validation/leads";

export const GET = withCrmAuth(async (request, user) => {
  await connectMongo();
  const params = Object.fromEntries(new URL(request.url).searchParams.entries());
  const parsed = leadListQuerySchema.safeParse(params);
  if (!parsed.success) return NextResponse.json({ error: "Invalid lead filters." }, { status: 400 });
  const { q, status, source, priority, service, owner, archived, sort, order, page, limit } = parsed.data;
  const filter: Record<string, any> = { archived: archived === "true" };
  if (status) filter.status = status;
  if (source) filter.source = source;
  if (priority) filter.priority = priority;
  if (service) filter.interestedServices = service;
  if (owner) filter.assignedTo = new Types.ObjectId(owner);
  if (user.role === "team_member") filter.assignedTo = new Types.ObjectId(user.id);
  if (q) filter.$text = { $search: q };
  const direction = order === "asc" ? 1 : -1;
  const [records, total] = await Promise.all([
    Lead.find(filter).select("name company email phone website source interestedServices estimatedBudget status priority assignedTo nextFollowUpAt lastContactAt archived createdAt updatedAt")
      .populate("assignedTo", "name role")
      .sort({ [sort]: direction, _id: direction }).skip((page - 1) * limit).limit(limit).lean(),
    Lead.countDocuments(filter),
  ]);
  return NextResponse.json({ leads: records, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}, ["administrator", "manager", "team_member"]);

export const POST = withCrmAuth(async (request, user) => {
  await connectMongo();
  const body = await readBoundedJson(request, 32 * 1024);
  if (!body.ok) return NextResponse.json({ error: body.reason === "too_large" ? "Request is too large." : "Invalid JSON body." }, { status: body.reason === "too_large" ? 413 : 400 });
  const parsed = createLeadSchema.safeParse(body.value);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid lead." }, { status: 400 });
  const data = parsed.data;
  const normalizedEmail = data.email?.toLowerCase();
  const normalizedPhone = normalizePhone(data.phone);
  if (normalizedEmail || normalizedPhone) {
    const duplicate = await Lead.findOne({ $or: [
      ...(normalizedEmail ? [{ normalizedEmail }] : []),
      ...(normalizedPhone ? [{ normalizedPhone }] : []),
    ] }).select("_id").lean();
    if (duplicate) return NextResponse.json({ error: "A lead with this email or phone already exists.", leadId: String(duplicate._id) }, { status: 409 });
  }
  if (data.assignedTo) {
    const activeOwner = await CrmUser.exists({ _id: data.assignedTo, active: true });
    if (!activeOwner) return NextResponse.json({ error: "Choose an active team member." }, { status: 400 });
  }
  try {
    const lead = await Lead.create({
      ...data,
      normalizedEmail,
      normalizedPhone,
      phone: data.phone || undefined,
      assignedTo: data.assignedTo || undefined,
      activities: [{ type: "created", actorId: user.id, actorName: user.name, details: "Lead created in the CRM." }],
    });
    return NextResponse.json({ lead: { id: String(lead._id) } }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "A lead with this email or phone already exists." }, { status: 409 });
    }
    throw error;
  }
}, ["administrator", "manager"]);
