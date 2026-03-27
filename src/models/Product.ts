import mongoose, { Schema, type Document } from "mongoose";

export interface IProduct extends Omit<Document, 'collection'> {
  productId: string;
  slug: string;
  name: string;
  nameVI?: string;
  nameUS?: string;
  nameUK?: string;
  code: string;
  collection: string;
  category: string;
  categoryVI?: string;
  subCategory?: string;
  material: string;
  materialVI?: string;
  color: string;
  colorVI?: string;
  size?: string;
  style: string;
  styleVI?: string;
  moq?: string;
  image: string;
  images: string[];
  description: string;
  descriptionVI?: string;
  descriptionUS?: string;
  descriptionUK?: string;
  features: string[];
  featuresVI?: string[];
  room: string;
  roomVI?: string;
  video?: string;
  dimensions?: string;
  weight?: string;
  specifications?: Record<string, string>;
  specificationsVI?: Record<string, string>;
  careInstructions?: string[];
  careInstructionsVI?: string[];
  usageSettings?: string[];
  usageSettingsVI?: string[];
  longDescription?: string;
  longDescriptionVI?: string;
  longDescriptionUS?: string;
  longDescriptionUK?: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    nameVI: { type: String },
    nameUS: { type: String },
    nameUK: { type: String },
    code: { type: String, required: true, unique: true, index: true },
    collection: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    categoryVI: { type: String },
    subCategory: { type: String },
    material: { type: String, required: true, index: true },
    materialVI: { type: String },
    color: { type: String, required: true },
    colorVI: { type: String },
    size: { type: String },
    style: { type: String, required: true, index: true },
    styleVI: { type: String },
    moq: { type: String },
    image: { type: String, required: true },
    images: { type: [String], index: true }, // Index to optimize fetching multiple images
    description: { type: String, required: true },
    descriptionVI: { type: String },
    descriptionUS: { type: String },
    descriptionUK: { type: String },
    features: [{ type: String }],
    featuresVI: [{ type: String }],
    room: { type: String, required: true },
    roomVI: { type: String },
    video: { type: String },
    dimensions: { type: String },
    weight: { type: String },
    specifications: { type: Map, of: String },
    specificationsVI: { type: Map, of: String },
    careInstructions: [{ type: String }],
    careInstructionsVI: [{ type: String }],
    usageSettings: [{ type: String }],
    usageSettingsVI: [{ type: String }],
    longDescription: { type: String },
    longDescriptionVI: { type: String },
    longDescriptionUS: { type: String },
    longDescriptionUK: { type: String },
  },
  { timestamps: true }
);

// Compound indexing for robust B2B catalogue queries
ProductSchema.index({ collection: 1, category: 1, material: 1 });

// Text index for fast text searches
ProductSchema.index(
  {
    name: "text",
    nameVI: "text",
    nameUS: "text",
    description: "text",
    descriptionVI: "text"
  },
  {
    weights: { name: 10, nameVI: 10, nameUS: 10, description: 5, descriptionVI: 5 },
    name: "Product_Text_Index"
  }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
