import mongoose, { Schema, Document } from "mongoose";

export interface IInquirySetting extends Document {
  type: "category" | "status";
  key: string;
  label: string;
  color?: string; // e.g., 'blue', 'error' for statuses
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySettingSchema = new Schema<IInquirySetting>(
  {
    type: { type: String, enum: ["category", "status"], required: true },
    key: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Ensure a key is unique per setting type
InquirySettingSchema.index({ type: 1, key: 1 }, { unique: true });

export default mongoose.models.InquirySetting ||
  mongoose.model<IInquirySetting>("InquirySetting", InquirySettingSchema);
