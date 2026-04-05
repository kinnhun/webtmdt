import mongoose, { Schema, type Document, Types } from "mongoose";

export interface IAboutRevision extends Document {
  aboutContentId: Types.ObjectId;
  data: any;
  note?: string;
  createdBy?: string;
  createdAt: Date;
}

const AboutRevisionSchema = new Schema<IAboutRevision>(
  {
    aboutContentId: {
      type: Schema.Types.ObjectId,
      ref: "AboutContent",
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
    createdBy: {
      type: String,
      default: "System",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AboutRevisionSchema.index({ createdAt: -1 });
AboutRevisionSchema.index({ aboutContentId: 1, createdAt: -1 });

if (process.env.NODE_ENV !== "production" && mongoose.models.AboutRevision) {
  delete mongoose.models.AboutRevision;
}

export default mongoose.models.AboutRevision ||
  mongoose.model<IAboutRevision>("AboutRevision", AboutRevisionSchema);
