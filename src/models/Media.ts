import mongoose, { Document, Model } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  mimeType: string;
  base64Data: string;
  size: number;
  md5: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new mongoose.Schema<IMedia>(
  {
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    base64Data: { type: String, required: true },
    size: { type: Number, required: true },
    md5: { type: String, required: true, unique: true }, // Deduplication
  },
  {
    timestamps: true,
  }
);

// Indexes "cho thật đẹp"
// md5 index removed to avoid duplicate since the schema already defines unique: true

MediaSchema.index({ createdAt: -1 });

// Avoid schema overwrite in Next.js Hot Reload
export const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
