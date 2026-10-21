import mongoose, { type Model } from "mongoose";

const publicLeadLimitSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  count: { type: Number, required: true, default: 0 },
  resetAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
}, { versionKey: false });
publicLeadLimitSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "public_lead_limit_ttl" });
const PublicLeadLimit = (mongoose.models.PublicLeadLimit as Model<any> | undefined) ?? mongoose.model("PublicLeadLimit", publicLeadLimitSchema);
export default PublicLeadLimit;
