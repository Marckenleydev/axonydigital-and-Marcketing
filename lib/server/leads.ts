import "server-only";

import Lead from "@/models/Lead";
import LeadConflict from "@/models/LeadConflict";
import type { PublicLeadInput } from "@/lib/validation/leads";
import { normalizePhone } from "@/lib/validation/leads";

function publicInquiry(input: PublicLeadInput) {
  return {
    submittedName: input.name,
    receivedAt: new Date(),
    source: "Website",
    website: input.website,
    estimatedBudget: input.budget,
    interestedServices: input.services,
    message: input.message,
  };
}

export async function receivePublicLead(input: PublicLeadInput) {
  const normalizedEmail = input.email.toLowerCase();
  const normalizedPhone = normalizePhone(input.phone);
  const contactQuery = {
    $or: [
      { normalizedEmail },
      ...(normalizedPhone ? [{ normalizedPhone }] : []),
    ],
  };
  const matches = await Lead.find(contactQuery).select("_id normalizedEmail normalizedPhone").lean();
  const emailMatch = matches.find((item) => item.normalizedEmail === normalizedEmail);
  const phoneMatch = normalizedPhone ? matches.find((item) => item.normalizedPhone === normalizedPhone) : undefined;

  if (emailMatch && phoneMatch && String(emailMatch._id) !== String(phoneMatch._id)) {
    await LeadConflict.create({
      email: normalizedEmail,
      phone: normalizedPhone,
      matchedLeadIds: [emailMatch._id, phoneMatch._id],
      submittedName: input.name,
      company: undefined,
      website: input.website,
      estimatedBudget: input.budget,
      interestedServices: input.services,
      message: input.message,
      source: "Website",
    });
    return { kind: "conflict" as const };
  }

  const match = emailMatch ?? phoneMatch;
  if (match) {
    await Lead.updateOne({ _id: match._id }, {
      $push: {
        inquiries: publicInquiry(input),
        activities: { $each: [{ type: "repeat_inquiry", details: "Repeat website inquiry received.", createdAt: new Date() }], $slice: -200 },
      },
      $set: { lastContactAt: new Date() },
    }, { runValidators: true });
    return { kind: "duplicate" as const };
  }

  try {
    await Lead.create({
      name: input.name,
      email: normalizedEmail,
      normalizedEmail,
      phone: input.phone,
      normalizedPhone,
      website: input.website,
      source: "Website",
      interestedServices: input.services,
      estimatedBudget: input.budget,
      status: "New",
      priority: "Normal",
      lastContactAt: new Date(),
      inquiries: [publicInquiry(input)],
      activities: [{ type: "created", details: "Lead submitted through the public website." }],
    });
    return { kind: "created" as const };
  } catch (error) {
    // Unique indexes close the race between the lookup and insert. Re-read to
    // append the inquiry to the record that won the race, preserving history.
    if (!(error && typeof error === "object" && "code" in error && error.code === 11000)) throw error;
    const racedMatches = await Lead.find(contactQuery).select("_id normalizedEmail normalizedPhone").lean();
    const racedEmail = racedMatches.find((item) => item.normalizedEmail === normalizedEmail);
    const racedPhone = normalizedPhone ? racedMatches.find((item) => item.normalizedPhone === normalizedPhone) : undefined;
    if (racedEmail && racedPhone && String(racedEmail._id) !== String(racedPhone._id)) {
      await LeadConflict.create({
        email: normalizedEmail,
        phone: normalizedPhone,
        matchedLeadIds: [racedEmail._id, racedPhone._id],
        submittedName: input.name,
        website: input.website,
        estimatedBudget: input.budget,
        interestedServices: input.services,
        message: input.message,
        source: "Website",
      });
      return { kind: "conflict" as const };
    }
    const raced = racedEmail ?? racedPhone;
    if (!raced) throw error;
    await Lead.updateOne({ _id: raced._id }, {
      $push: { inquiries: publicInquiry(input), activities: { $each: [{ type: "repeat_inquiry", details: "Repeat website inquiry received.", createdAt: new Date() }], $slice: -200 } },
      $set: { lastContactAt: new Date() },
    }, { runValidators: true });
    return { kind: "duplicate" as const };
  }
}
