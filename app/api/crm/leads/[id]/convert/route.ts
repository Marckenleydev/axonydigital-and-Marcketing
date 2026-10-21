import { NextResponse } from "next/server";
import mongoose, { Types } from "mongoose";
import { withCrmAuth } from "@/lib/server/authorization";
import { connectMongo } from "@/lib/server/mongodb";
import Client from "@/models/Client";
import ClientConversionConflict from "@/models/ClientConversionConflict";
import Lead from "@/models/Lead";
type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Context) {
  return withCrmAuth(async (_req, user) => {
    const { id } = await context.params;
    if (!Types.ObjectId.isValid(id)) return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    await connectMongo();
    const session = await mongoose.startSession();
    let result: { clientId?: string; alreadyConverted?: boolean; conflictId?: string; error?: string; status?: number } = {};
    try {
      await session.withTransaction(async () => {
        const lead = await Lead.findById(id).session(session);
        if (!lead) { result = { error: "Lead not found.", status: 404 }; return; }
        if (lead.convertedClientId) {
          const existing = await Client.findById(lead.convertedClientId).session(session).select("_id").lean();
          if (existing) { result = { clientId: String(existing._id), alreadyConverted: true }; return; }
          result = { error: "The linked client record is unavailable; ask an administrator to review this lead.", status: 409 }; return;
        }
        if (!["Qualified", "Won"].includes(lead.status)) { result = { error: "Only qualified or won leads can be converted.", status: 409 }; return; }
        const matches = (lead.normalizedEmail || lead.normalizedPhone) ? await Client.find({ $or: [...(lead.normalizedEmail ? [{ normalizedEmail: lead.normalizedEmail }] : []), ...(lead.normalizedPhone ? [{ normalizedPhone: lead.normalizedPhone }] : [])] }).session(session).select("_id normalizedEmail normalizedPhone").lean() : [];
        const distinctIds = [...new Set(matches.map((client) => String(client._id)))];
        if (distinctIds.length > 1) {
          let conflict = await ClientConversionConflict.findOne({ leadId: lead._id, status: "pending" }).session(session);
          if (!conflict) [conflict] = await ClientConversionConflict.create([{ leadId: lead._id, matchedClientIds: distinctIds, email: lead.normalizedEmail, phone: lead.normalizedPhone, actorId: user.id, actorName: user.name }], { session });
          lead.conversionConflictId = conflict._id;
          lead.activities.push({ type: "conversion_conflict", actorId: new Types.ObjectId(user.id), actorName: user.name, details: "Conversion held for administrator review because email and phone match different clients." } as never);
          await lead.save({ session });
          result = { conflictId: String(conflict._id), error: "This lead matches different client records. Review the conflict before converting.", status: 409 };
          return;
        }
        let client = distinctIds.length === 1 ? await Client.findById(distinctIds[0]).session(session) : null;
        if (!client) {
          [client] = await Client.create([{
            contactName: lead.name, companyName: lead.company, email: lead.email, normalizedEmail: lead.normalizedEmail,
            phone: lead.phone, normalizedPhone: lead.normalizedPhone, website: lead.website, industry: lead.industry,
            servicesPurchased: lead.interestedServices, engagementValue: undefined, accountOwner: lead.assignedTo || undefined,
            status: "Active", internalNotes: lead.notes, convertedFromLead: lead._id,
            activities: [{ type: "lead_converted", actorId: user.id, actorName: user.name, details: `Converted from lead ${lead.name}.` }],
          }], { session });
        } else {
          client.activities.push({ type: "lead_converted", actorId: new Types.ObjectId(user.id), actorName: user.name, details: `Lead ${lead.name} was matched to this existing client by email or phone.` } as never);
          await client.save({ session });
        }
        lead.convertedClientId = client._id;
        lead.activities.push({ type: "converted", actorId: new Types.ObjectId(user.id), actorName: user.name, details: `Converted to client ${client.contactName}.` } as never);
        await lead.save({ session });
        result = { clientId: String(client._id), alreadyConverted: false };
      }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === 11000) {
        // Unique contact indexes arbitrate simultaneous conversions. The next request is idempotent after the winner commits.
        return NextResponse.json({ error: "A client with this email or phone already exists. Reload the lead and retry conversion." }, { status: 409 });
      }
      if (error instanceof Error && /Transaction numbers are only allowed|replica set|does not support transactions|transactions are not supported/i.test(error.message)) {
        return NextResponse.json({ error: "Lead conversion requires MongoDB transactions. Configure a replica set or MongoDB Atlas cluster." }, { status: 503 });
      }
      throw error;
    } finally { await session.endSession(); }
    if (result.error) return NextResponse.json({ error: result.error, conflictId: result.conflictId }, { status: result.status ?? 409 });
    return NextResponse.json({ ok: true, clientId: result.clientId, alreadyConverted: result.alreadyConverted });
  }, ["administrator", "manager"])(request);
}
