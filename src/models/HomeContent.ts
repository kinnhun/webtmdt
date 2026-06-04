import mongoose, { Schema, Document, Model } from 'mongoose';

const I18nTextSchema = {
  us: { type: String, default: "" },
  uk: { type: String, default: "" },
  vi: { type: String, default: "" },
};

export interface IHomeContent extends Document {
  factoryVideoUrl: string;
  factoryVideoTitle1?: { us: string; uk: string; vi: string };
  factoryVideoTitle2?: { us: string; uk: string; vi: string };
  factoryVideoDescription?: { us: string; uk: string; vi: string };
}

const HomeContentSchema = new Schema<IHomeContent>(
  {
    factoryVideoUrl: { type: String, default: '' },
    factoryVideoTitle1: I18nTextSchema,
    factoryVideoTitle2: I18nTextSchema,
    factoryVideoDescription: I18nTextSchema,
  },
  { timestamps: true }
);

if (process.env.NODE_ENV !== "production" && mongoose.models.HomeContent) {
  delete mongoose.models.HomeContent;
}

export default (mongoose.models.HomeContent as Model<IHomeContent>) ||
  mongoose.model<IHomeContent>('HomeContent', HomeContentSchema);
