import mongoose, { type InferSchemaType, type Model } from "mongoose";
const schema = new mongoose.Schema({ leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead", required: true }, matchedClientIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Client" }], email: String, phone: String, status: { type: String, enum: ["pending", "resolved", "dismissed"], default: "pending", required: true }, actorId: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser", required: true }, actorName: { type: String, required: true }, reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser" }, reviewedAt: Date, createdAt: { type: Date, default: Date.now, required: true } }, { timestamps: true, versionKey: false });
schema.index({ leadId: 1, status: 1 }, { name: "client_conversion_conflict_lead" });
schema.index({ status: 1, createdAt: -1 }, { name: "client_conversion_conflict_queue" });
export type ClientConversionConflictRecord = InferSchemaType<typeof schema>;
const ClientConversionConflict: Model<ClientConversionConflictRecord> = (mongoose.models.ClientConversionConflict as Model<ClientConversionConflictRecord> | undefined) ?? mongoose.model<ClientConversionConflictRecord>("ClientConversionConflict", schema);
export default ClientConversionConflict;
