import mongoose, { Schema, type Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: "new" | "pending" | "processing" | "resolved" | "cancelled";
  category: "consulting" | "support" | "complaint" | "cooperation" | "quotation" | "other" | null;
  source: string;
  interestedProduct?: string;
  internalNotes?: string;
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
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
