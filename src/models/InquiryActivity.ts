import mongoose, { Schema, type Document } from "mongoose";

export interface IInquiryActivity extends Document {
  inquiryId: mongoose.Types.ObjectId;
  action: string; // 'created' | 'assigned' | 'accepted' | 'rejected' | 'status_changed' | 'note_updated' | 'resolved' | 'closed'
  performedBy?: mongoose.Types.ObjectId;
  performedByName?: string;
  customerName?: string;
  fromValue?: string;
  toValue?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const InquiryActivitySchema = new Schema<IInquiryActivity>(
  {
    inquiryId: { type: Schema.Types.ObjectId, ref: "Contact", required: true, index: true },
    action: { type: String, required: true },
    performedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    performedByName: { type: String },
    customerName: { type: String },
    fromValue: { type: String },
    toValue: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Index for fast dashboard queries
InquiryActivitySchema.index({ createdAt: -1 });
InquiryActivitySchema.index({ inquiryId: 1, createdAt: -1 });

export default mongoose.models.InquiryActivity ||
  mongoose.model<IInquiryActivity>("InquiryActivity", InquiryActivitySchema);
