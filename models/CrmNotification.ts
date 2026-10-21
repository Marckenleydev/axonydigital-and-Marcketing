import mongoose, { type InferSchemaType, type Model } from "mongoose";
const schema = new mongoose.Schema({ recipient: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser", required: true }, actor: { type: mongoose.Schema.Types.ObjectId, ref: "CrmUser" }, kind: { type: String, required: true, enum: ["task_assigned", "task_changed", "task_due_soon", "task_overdue", "lead_follow_up_soon", "lead_follow_up_overdue"] }, title: { type: String, required: true, maxlength: 180 }, message: { type: String, required: true, maxlength: 500 }, recordType: { type: String, required: true, enum: ["task", "lead"] }, recordId: { type: mongoose.Schema.Types.ObjectId, required: true }, href: { type: String, required: true, maxlength: 300 }, dedupeKey: { type: String, required: true, maxlength: 240 }, readAt: Date, dismissedAt: Date }, { timestamps: true, versionKey: false });
schema.index({ dedupeKey: 1 }, { unique: true, name: "crm_notification_dedupe_unique" });
schema.index({ recipient: 1, dismissedAt: 1, readAt: 1, createdAt: -1 }, { name: "crm_notification_inbox" });
export type CrmNotificationRecord = InferSchemaType<typeof schema>;
const CrmNotification: Model<CrmNotificationRecord> = (mongoose.models.CrmNotification as Model<CrmNotificationRecord> | undefined) ?? mongoose.model<CrmNotificationRecord>("CrmNotification", schema);
export default CrmNotification;
