import mongoose, { Schema, type Document } from "mongoose";

export type AttributeType = "category" | "material" | "moq" | "color" | "style";

export interface IProductAttribute extends Document {
  type: AttributeType;
  nameUS: string;
  nameUK?: string;
  nameVI?: string;
  /** Only for type=category: 'Outdoor' | 'Indoor' */
  collection?: string;
  /** Only for type=color: CSS hex value */
  colorHex?: string;
  /** Soft-delete / hidden toggle */
  isActive: boolean;
  order: number;
}

const ProductAttributeSchema = new Schema<IProductAttribute>(
  {
    type: {
      type: String,
      required: true,
      enum: ["category", "material", "moq", "color", "style"],
      index: true,
    },
    nameUS: { type: String, required: true },
    nameUK: { type: String },
    nameVI: { type: String },
    collection: { type: String, enum: ["Outdoor", "Indoor", null] },
    colorHex: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Compound unique index: same type + nameUS cannot be duplicated
ProductAttributeSchema.index({ type: 1, nameUS: 1 }, { unique: true });

// Force Mongoose to recompile the model to avoid caching old schema in Next.js dev server
if (mongoose.models.ProductAttribute) {
  delete mongoose.models.ProductAttribute;
}

export default mongoose.model<IProductAttribute>("ProductAttribute", ProductAttributeSchema);
