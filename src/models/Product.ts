import mongoose, { Schema, type Document } from "mongoose";

export interface I18nText {
  us: string;
  uk?: string;
  vi?: string;
}

export interface I18nList {
  us: string[];
  uk?: string[];
  vi?: string[];
}

export interface IProduct extends Omit<Document, 'collection'> {
  productId: string;
  slug: string;
  name: I18nText;
  code: string;
  collection: string;
  category: I18nText;
  subCategory?: string;
  material: I18nText;
  color: I18nText;
  size?: string;
  style: I18nText;
  moq?: string;
  image: string;
  images: string[];
  description: I18nText;
  features: I18nList;
  room: I18nText;
  video?: string;
  dimensions?: string;
  weight?: string;
  specifications?: {
    nameUS: string;
    nameVI?: string;
    nameUK?: string;
    valueUS: string;
    valueVI?: string;
    valueUK?: string;
  }[];
  careInstructions?: I18nList;
  usageSettings?: I18nList;
  longDescription?: I18nText;
}

const I18nTextSchema = {
  us: { type: String, default: '' },
  uk: { type: String },
  vi: { type: String }
};

const I18nListSchema = {
  us: [{ type: String }],
  uk: [{ type: String }],
  vi: [{ type: String }]
};

const ProductSchema = new Schema<IProduct>(
  {
    productId: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true, index: true },
    name: I18nTextSchema,
    code: { type: String, required: true, unique: true, index: true },
    collection: { type: String, required: true, index: true },
    category: I18nTextSchema,
    subCategory: { type: String },
    material: I18nTextSchema,
    color: I18nTextSchema,
    size: { type: String },
    style: I18nTextSchema,
    moq: { type: String },
    image: { type: String, required: true },
    images: { type: [String], index: true },
    description: I18nTextSchema,
    features: I18nListSchema,
    room: I18nTextSchema,
    video: { type: String },
    dimensions: { type: String },
    weight: { type: String },
    specifications: [{ 
      nameUS: String, 
      nameVI: String, 
      nameUK: String, 
      valueUS: String, 
      valueVI: String, 
      valueUK: String 
    }],
    careInstructions: I18nListSchema,
    usageSettings: I18nListSchema,
    longDescription: I18nTextSchema,
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

// Compound indexing for robust B2B catalogue queries
ProductSchema.index({ collection: 1, category: 1, material: 1 });

// Text index for fast text searches
ProductSchema.index(
  {
    "name.us": "text",
    "name.vi": "text",
    "name.uk": "text",
    "description.us": "text",
    "description.vi": "text"
  },
  {
    weights: { "name.us": 10, "name.vi": 10, "name.uk": 10, "description.us": 5, "description.vi": 5 },
    name: "Product_Text_Index"
  }
);

// In development, delete cached model so schema changes take effect immediately
if (process.env.NODE_ENV !== 'production' && mongoose.models.Product) {
  delete mongoose.models.Product;
}

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
