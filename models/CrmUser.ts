import mongoose, { type InferSchemaType, type Model } from "mongoose";

export const CRM_ROLES = ["administrator", "manager", "team_member"] as const;
export type CrmRole = (typeof CRM_ROLES)[number];

const crmUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: CRM_ROLES, required: true, default: "team_member" },
    active: { type: Boolean, required: true, default: true },
    // A unique marker prevents concurrent or repeated first-admin bootstraps.
    bootstrapKey: { type: String, select: false },
    activities: [{ type: new mongoose.Schema({ type: { type: String, required: true, enum: ["role_changed", "activated", "deactivated"] }, actorId: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser", required: true }, actorName: { type: String, required: true, maxlength: 100 }, details: { type: String, required: true, maxlength: 500 }, createdAt: { type: Date, default: Date.now, required: true } }, { _id: false }) }],
  },
  { timestamps: true, versionKey: false },
);

crmUserSchema.index({ email: 1 }, { unique: true, name: "crm_user_email_unique" });
crmUserSchema.index(
  { bootstrapKey: 1 },
  { unique: true, sparse: true, name: "crm_initial_admin_once" },
);

export type CrmUserRecord = InferSchemaType<typeof crmUserSchema>;

const CrmUser: Model<CrmUserRecord> =
  (mongoose.models.CrmUser as Model<CrmUserRecord> | undefined) ??
  mongoose.model<CrmUserRecord>("CrmUser", crmUserSchema);

export default CrmUser;
