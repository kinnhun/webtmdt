import mongoose, { Schema, type Document } from "mongoose";

export interface IProduct extends Document {
  productId: string;
  name: string;
  code: string;
  category: string;
  subCategory?: string;
  material: string;
  color: string;
  size: string;
  style: string;
  image: string;
  images: string[];
  description: string;
  features: string[];
  room: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    category: { type: String, required: true, index: true },
    subCategory: { type: String },
    material: { type: String, required: true, index: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    style: { type: String, required: true, index: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    features: [{ type: String }],
    room: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
