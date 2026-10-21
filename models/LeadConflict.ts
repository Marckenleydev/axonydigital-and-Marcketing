import mongoose, { type InferSchemaType, type Model } from "mongoose";

const leadConflictSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, trim: true, maxlength: 254 },
  phone: { type: String, trim: true, maxlength: 24 },
  matchedLeadIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true }],
  submittedName: { type: String, required: true, maxlength: 120 },
  company: { type: String, maxlength: 160 },
  website: { type: String, maxlength: 200 },
  estimatedBudget: { type: String, maxlength: 100 },
  interestedServices: [{ type: String, maxlength: 100 }],
  message: { type: String, maxlength: 4000 },
  source: { type: String, required: true, default: "Website" },
  status: { type: String, enum: ["pending", "resolved", "dismissed"], default: "pending", index: true },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser" },
  reviewedAt: { type: Date },
}, { timestamps: true, versionKey: false });

leadConflictSchema.index({ status: 1, createdAt: -1 }, { name: "lead_conflict_review_queue" });
export type LeadConflictRecord = InferSchemaType<typeof leadConflictSchema>;
const LeadConflict: Model<LeadConflictRecord> = (mongoose.models.LeadConflict as Model<LeadConflictRecord> | undefined) ?? mongoose.model<LeadConflictRecord>("LeadConflict", leadConflictSchema);
export default LeadConflict;
