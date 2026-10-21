import mongoose, { type Model } from "mongoose";

const crmLoginLimitSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    count: { type: Number, required: true },
    resetAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false, timestamps: false },
);

crmLoginLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "crm_login_limit_ttl" });

type CrmLoginLimitRecord = {
  _id: string;
  count: number;
  resetAt: Date;
  expiresAt: Date;
};

const CrmLoginLimit: Model<CrmLoginLimitRecord> =
  (mongoose.models.CrmLoginLimit as Model<CrmLoginLimitRecord> | undefined) ??
  mongoose.model<CrmLoginLimitRecord>("CrmLoginLimit", crmLoginLimitSchema);

export default CrmLoginLimit;
