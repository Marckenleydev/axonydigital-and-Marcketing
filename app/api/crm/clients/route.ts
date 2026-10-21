import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import { readBoundedJson } from "@/lib/server/request-body";
import Client from "@/models/Client";
import CrmUser from "@/models/CrmUser";
import { clientListQuerySchema, createClientSchema, normalizeClientPhone } from "@/lib/validation/clients";

export const GET = withCrmAuth(async (request, user) => {
  await connectMongo();
  const parsed = clientListQuerySchema.safeParse(Object.fromEntries(new URL(request.url).searchParams.entries()));
  if (!parsed.success) return NextResponse.json({ error: "Invalid client filters." }, { status: 400 });
  const { q, status, service, owner, archived, sort, order, page, limit } = parsed.data;
  const filter: Record<string, any> = { archived: archived === "true" };
  if (status) filter.status = status;
  if (service) filter.servicesPurchased = service;
  if (owner) filter.accountOwner = new Types.ObjectId(owner);
  if (user.role === "team_member") filter.accountOwner = new Types.ObjectId(user.id);
  if (q) filter.$text = { $search: q };
  const direction = order === "asc" ? 1 : -1;
  const [clients, total] = await Promise.all([
    Client.find(filter).select("contactName companyName email phone website industry servicesPurchased engagementValue accountOwner status archived createdAt updatedAt").populate("accountOwner", "name role").sort({ [sort]: direction, _id: direction }).skip((page - 1) * limit).limit(limit).lean(),
    Client.countDocuments(filter),
  ]);
  return NextResponse.json({ clients, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
}, ["administrator", "manager", "team_member"]);

export const POST = withCrmAuth(async (request, user) => {
  await connectMongo();
  const body = await readBoundedJson(request, 32 * 1024);
  if (!body.ok) return NextResponse.json({ error: "Invalid request body." }, { status: body.reason === "too_large" ? 413 : 400 });
  const parsed = createClientSchema.safeParse(body.value);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid client." }, { status: 400 });
  const data = parsed.data;
  const normalizedEmail = data.email ? data.email.toLowerCase() : undefined;
  const normalizedPhone = normalizeClientPhone(data.phone);
  if ((normalizedEmail || normalizedPhone) && await Client.exists({ $or: [...(normalizedEmail ? [{ normalizedEmail }] : []), ...(normalizedPhone ? [{ normalizedPhone }] : [])] })) return NextResponse.json({ error: "A client with this email or phone already exists." }, { status: 409 });
  if (data.accountOwner) {
    const owner = await CrmUser.exists({ _id: data.accountOwner, active: true });
    if (!owner) return NextResponse.json({ error: "Choose an active account owner." }, { status: 400 });
  }
  if (user.role === "manager" && !data.accountOwner) data.accountOwner = user.id;
  try {
    const [client] = await Client.create([{ ...data, normalizedEmail, normalizedPhone, accountOwner: data.accountOwner || undefined, activities: [{ type: "created", actorId: user.id, actorName: user.name, details: "Client created in the CRM." }] }]);
    return NextResponse.json({ client: { id: String(client._id) } }, { status: 201 });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) return NextResponse.json({ error: "A client with this email or phone already exists." }, { status: 409 });
    throw error;
  }
}, ["administrator", "manager"]);
