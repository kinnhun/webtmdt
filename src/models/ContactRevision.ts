import mongoose, { Schema, type Document, Types } from "mongoose";

export interface IContactRevision extends Document {
  contactContentId: Types.ObjectId;
  data: any;
  note?: string;
  isDefault?: boolean;
  createdBy?: string;
  createdAt: Date;
}

const ContactRevisionSchema = new Schema<IContactRevision>(
  {
    contactContentId: {
      type: Schema.Types.ObjectId,
      ref: "ContactContent",
      required: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      default: "System",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ContactRevisionSchema.index({ createdAt: -1 });
ContactRevisionSchema.index({ contactContentId: 1, createdAt: -1 });

if (process.env.NODE_ENV !== "production" && mongoose.models.ContactRevision) {
  delete mongoose.models.ContactRevision;
}

export default mongoose.models.ContactRevision ||
  mongoose.model<IContactRevision>("ContactRevision", ContactRevisionSchema);
