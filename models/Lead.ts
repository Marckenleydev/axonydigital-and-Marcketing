import mongoose, { type InferSchemaType, type Model } from "mongoose";
import { LEAD_PRIORITIES, LEAD_SERVICES, LEAD_SOURCES, LEAD_STATUSES } from "@/lib/validation/leads";

const inquirySchema = new mongoose.Schema({
  submittedName: { type: String, maxlength: 120 },
  receivedAt: { type: Date, required: true, default: Date.now },
  source: { type: String, required: true },
  website: { type: String, maxlength: 200 },
  estimatedBudget: { type: String, maxlength: 100 },
  interestedServices: [{ type: String, enum: LEAD_SERVICES }],
  message: { type: String, maxlength: 4000 },
}, { _id: false });

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ["created", "updated", "status_changed", "call", "email", "meeting", "note", "repeat_inquiry", "converted", "conversion_conflict", "task_created", "task_updated", "task_completed", "task_assigned", "task_comment"] },
  actorId: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser" },
  actorName: { type: String, maxlength: 100 },
  details: { type: String, maxlength: 1000 },
  createdAt: { type: Date, required: true, default: Date.now },
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  company: { type: String, trim: true, maxlength: 160 },
  email: { type: String, trim: true, lowercase: true, maxlength: 254 },
  normalizedEmail: { type: String, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 40 },
  normalizedPhone: { type: String, trim: true, maxlength: 24 },
  website: { type: String, trim: true, maxlength: 200 },
  industry: { type: String, trim: true, maxlength: 100 },
  source: { type: String, enum: LEAD_SOURCES, required: true, default: "Other" },
  interestedServices: [{ type: String, enum: LEAD_SERVICES }],
  estimatedBudget: { type: String, trim: true, maxlength: 100 },
  status: { type: String, enum: LEAD_STATUSES, required: true, default: "New" },
  priority: { type: String, enum: LEAD_PRIORITIES, required: true, default: "Normal" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser" },
  notes: { type: String, trim: true, maxlength: 10000 },
  nextFollowUpAt: { type: Date, default: null },
  lastContactAt: { type: Date, default: null },
  convertedClientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", default: null },
  conversionConflictId: { type: mongoose.Schema.Types.ObjectId, ref: "ClientConversionConflict", default: null },
  archived: { type: Boolean, default: false, index: true },
  inquiries: { type: [inquirySchema], default: [] },
  activities: { type: [activitySchema], default: [] },
}, { timestamps: true, versionKey: false });

leadSchema.index({ normalizedEmail: 1 }, { unique: true, sparse: true, name: "lead_normalized_email_unique" });
leadSchema.index({ normalizedPhone: 1 }, { unique: true, sparse: true, name: "lead_normalized_phone_unique" });
leadSchema.index({ status: 1, archived: 1, createdAt: -1 }, { name: "lead_status_created" });
leadSchema.index({ assignedTo: 1, status: 1, archived: 1 }, { name: "lead_owner_status" });
leadSchema.index({ source: 1, createdAt: -1 }, { name: "lead_source_created" });
leadSchema.index({ nextFollowUpAt: 1, archived: 1 }, { name: "lead_follow_up" });
leadSchema.index({ name: "text", company: "text", email: "text", phone: "text" }, { name: "lead_search_text" });

export type LeadRecord = InferSchemaType<typeof leadSchema>;
const Lead: Model<LeadRecord> = (mongoose.models.Lead as Model<LeadRecord> | undefined) ?? mongoose.model<LeadRecord>("Lead", leadSchema);
export default Lead;
