import mongoose, { Schema, type Document } from "mongoose";

/* ── Shared i18n sub-schemas ── */
const I18nTextSchema = {
  us: { type: String, default: "" },
  uk: { type: String, default: "" },
  vi: { type: String, default: "" },
};

const I18nTextRequired = {
  us: { type: String, required: true, default: "" },
  uk: { type: String, default: "" },
  vi: { type: String, default: "" },
};

/* ── Interface ── */
export interface IContactContent extends Document {
  seo: {
    title: { us: string; uk: string; vi: string };
    description: { us: string; uk: string; vi: string };
  };
  hero: {
    title: { us: string; uk: string; vi: string };
    subtitle: { us: string; uk: string; vi: string };
  };
  locations: {
    heading: { us: string; uk: string; vi: string };
    items: Array<{
      key: string;
      title: { us: string; uk: string; vi: string };
      subtitle: { us: string; uk: string; vi: string };
      address: { us: string; uk: string; vi: string };
      phone: string;
      href: string; // tel link or map link
      hours: { us: string; uk: string; vi: string };
    }>;
  };
  formSection: {
    title: { us: string; uk: string; vi: string };
    subtitle: { us: string; uk: string; vi: string };
    successTitle: { us: string; uk: string; vi: string };
    successDesc: { us: string; uk: string; vi: string };
    sendAnotherBtn: { us: string; uk: string; vi: string };
    fields?: Array<{
      id: string;
      key: string;
      label: { us: string; uk: string; vi: string };
      type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'category';
      required: boolean;
      width: 'half' | 'full';
      options?: Array<{ key: string; label: { us: string; uk: string; vi: string } }>;
      isDeletable?: boolean;
    }>;
    labels: {
      name: { us: string; uk: string; vi: string };
      email: { us: string; uk: string; vi: string };
      phone: { us: string; uk: string; vi: string };
      company: { us: string; uk: string; vi: string };
      category: { us: string; uk: string; vi: string };
      subject: { us: string; uk: string; vi: string };
      message: { us: string; uk: string; vi: string };
      sendBtn: { us: string; uk: string; vi: string };
      sendingBtn: { us: string; uk: string; vi: string };
    };
  };
  inquiryModal: {
    title: { us: string; uk: string; vi: string };
    subtitlePrefix: { us: string; uk: string; vi: string };
    successTitle: { us: string; uk: string; vi: string };
    successDescPrefix: { us: string; uk: string; vi: string };
    successDescSuffix: { us: string; uk: string; vi: string };
    closeBtn: { us: string; uk: string; vi: string };
    whatsappText: { us: string; uk: string; vi: string };
    whatsappNumber: string;
  };
}

/* ── Schema ── */
const ContactContentSchema = new Schema<IContactContent>(
  {
    seo: {
      title: I18nTextSchema,
      description: I18nTextSchema,
    },
    hero: {
      title: I18nTextSchema,
      subtitle: I18nTextSchema,
    },
    locations: {
      heading: I18nTextSchema,
      items: [
        {
          key: { type: String },
          title: I18nTextSchema,
          subtitle: I18nTextSchema,
          address: I18nTextSchema,
          phone: { type: String, default: "" },
          href: { type: String, default: "" },
          hours: I18nTextSchema,
        },
      ],
    },
    formSection: {
      title: I18nTextSchema,
      subtitle: I18nTextSchema,
      successTitle: I18nTextSchema,
      successDesc: I18nTextSchema,
      sendAnotherBtn: I18nTextSchema,
      fields: {
        type: [
          {
            id: { type: String },
            key: { type: String },
            label: I18nTextSchema,
            type: { type: String, enum: ['text', 'email', 'tel', 'textarea', 'select', 'category'], default: 'text' },
            required: { type: Boolean, default: false },
            width: { type: String, enum: ['half', 'full'], default: 'full' },
            options: [
              {
                key: { type: String },
                label: I18nTextSchema,
              }
            ],
            isDeletable: { type: Boolean, default: true },
          }
        ],
        default: undefined
      },
      labels: {
        name: I18nTextSchema,
        email: I18nTextSchema,
        phone: I18nTextSchema,
        company: I18nTextSchema,
        category: I18nTextSchema,
        subject: I18nTextSchema,
        message: I18nTextSchema,
        sendBtn: I18nTextSchema,
        sendingBtn: I18nTextSchema,
      },
    },
    inquiryModal: {
      title: I18nTextSchema,
      subtitlePrefix: I18nTextSchema,
      successTitle: I18nTextSchema,
      successDescPrefix: I18nTextSchema,
      successDescSuffix: I18nTextSchema,
      closeBtn: I18nTextSchema,
      whatsappText: I18nTextSchema,
      whatsappNumber: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

delete mongoose.models.ContactContent;
export default mongoose.model<IContactContent>("ContactContent", ContactContentSchema);
