import mongoose, { Schema, type Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: string;
  category: string | null;
  source: string;
  interestedProduct?: string;
  internalNotes?: string;
  assignedTo?: mongoose.Types.ObjectId;
  assignedBy?: mongoose.Types.ObjectId;
  assignedAt?: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  closedAt?: Date;
  priority: "low" | "normal" | "high" | "urgent";
  lastActionBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    company: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      default: "new",
    },
    category: {
      type: String,
      default: "other",
    },
    source: { type: String, default: "Website Contact Form" },
    interestedProduct: { type: String },
    internalNotes: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    assignedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    assignedAt: { type: Date },
    acceptedAt: { type: Date },
    rejectedAt: { type: Date },
    closedAt: { type: Date },
    priority: { type: String, enum: ["low", "normal", "high", "urgent"], default: "normal" },
    lastActionBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
