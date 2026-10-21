import mongoose, { type InferSchemaType, type Model } from "mongoose";
const schema = new mongoose.Schema({ key: { type: String, required: true, unique: true }, lockVersion: { type: Number, default: 0 } }, { timestamps: true, versionKey: false });
type SecurityState = InferSchemaType<typeof schema>;
const CrmSecurityState = (mongoose.models.CrmSecurityState as Model<SecurityState> | undefined) ?? mongoose.model<SecurityState>("CrmSecurityState", schema);
export default CrmSecurityState;
