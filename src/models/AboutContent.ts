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
export interface IAboutContent extends Document {
  hero: {
    title: { us: string; uk: string; vi: string };
    subtitle: { us: string; uk: string; vi: string };
    description: { us: string; uk: string; vi: string };
    backgroundImages: string[];
  };
  marquee: { us: string[]; uk: string[]; vi: string[] };
  welcome: {
    title: { us: string; uk: string; vi: string };
    description: { us: string; uk: string; vi: string };
    values: Array<{
      title: { us: string; uk: string; vi: string };
      desc: { us: string; uk: string; vi: string };
    }>;
  };
  story: {
    label: { us: string; uk: string; vi: string };
    heading: { us: string; uk: string; vi: string };
    content: { us: string; uk: string; vi: string };
    images: string[];
  };
  values: {
    label: { us: string; uk: string; vi: string };
    heading: { us: string; uk: string; vi: string };
    items: Array<{
      icon: string;
      title: { us: string; uk: string; vi: string };
      desc: { us: string; uk: string; vi: string };
    }>;
  };
  timeline: {
    label: { us: string; uk: string; vi: string };
    heading: { us: string; uk: string; vi: string };
    items: Array<{
      year: string;
      title: { us: string; uk: string; vi: string };
      desc: { us: string; uk: string; vi: string };
    }>;
  };
  stats: {
    heading: { us: string; uk: string; vi: string };
    subtitle: { us: string; uk: string; vi: string };
    items: Array<{
      value: string;
      suffix: string;
      label: { us: string; uk: string; vi: string };
    }>;
    hr: {
      heading: { us: string; uk: string; vi: string };
      items: Array<{ us: string; uk: string; vi: string }>;
    };
    machinery: {
      heading: { us: string; uk: string; vi: string };
      items: Array<{
        count: string;
        label: { us: string; uk: string; vi: string };
      }>;
    };
  };
  team: {
    heading: { us: string; uk: string; vi: string };
    leader: {
      name: string;
      role: { us: string; uk: string; vi: string };
      quote: { us: string; uk: string; vi: string };
      email: string;
      phone: string;
      image: string;
    };
    members: Array<{
      name: string;
      key: string;
      isLeader: boolean;
      role: { us: string; uk: string; vi: string };
      quote: { us: string; uk: string; vi: string };
      email: string;
      phone: string;
      image: string;
    }>;
  };
  locations: {
    heading: { us: string; uk: string; vi: string };
    items: Array<{
      key: string;
      name: { us: string; uk: string; vi: string };
      address: { us: string; uk: string; vi: string };
      hotline: string;
    }>;
  };
  cta: {
    heading: { us: string; uk: string; vi: string };
    button: { us: string; uk: string; vi: string };
  };
}

/* ── Schema ── */
const AboutContentSchema = new Schema<IAboutContent>(
  {
    hero: {
      title: I18nTextRequired,
      subtitle: I18nTextSchema,
      description: I18nTextSchema,
      backgroundImages: [{ type: String }],
    },
    marquee: {
      us: [{ type: String }],
      uk: [{ type: String }],
      vi: [{ type: String }],
    },
    welcome: {
      title: I18nTextSchema,
      description: I18nTextSchema,
      values: [
        {
          title: I18nTextSchema,
          desc: I18nTextSchema,
        },
      ],
    },
    story: {
      label: I18nTextSchema,
      heading: I18nTextSchema,
      content: I18nTextSchema,
      images: [{ type: String }],
    },
    values: {
      label: I18nTextSchema,
      heading: I18nTextSchema,
      items: [
        {
          icon: { type: String, default: "Award" },
          title: I18nTextSchema,
          desc: I18nTextSchema,
        },
      ],
    },
    timeline: {
      label: I18nTextSchema,
      heading: I18nTextSchema,
      items: [
        {
          year: { type: String },
          title: I18nTextSchema,
          desc: I18nTextSchema,
        },
      ],
    },
    stats: {
      heading: I18nTextSchema,
      subtitle: I18nTextSchema,
      items: [
        {
          value: { type: String },
          suffix: { type: String, default: "" },
          label: I18nTextSchema,
        },
      ],
      hr: {
        heading: I18nTextSchema,
        items: [I18nTextSchema],
      },
      machinery: {
        heading: I18nTextSchema,
        items: [
          {
            count: { type: String },
            label: I18nTextSchema,
          },
        ],
      },
    },
    team: {
      heading: I18nTextSchema,
      leader: {
        name: { type: String, default: "" },
        role: I18nTextSchema,
        quote: I18nTextSchema,
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        image: { type: String, default: "" },
      },
      members: [
        {
          name: { type: String },
          key: { type: String },
          isLeader: { type: Boolean, default: false },
          role: I18nTextSchema,
          quote: I18nTextSchema,
          email: { type: String, default: "" },
          phone: { type: String, default: "" },
          image: { type: String, default: "" },
        },
      ],
    },
    locations: {
      heading: I18nTextSchema,
      items: [
        {
          key: { type: String },
          name: I18nTextSchema,
          address: I18nTextSchema,
          hotline: { type: String, default: "" },
        },
      ],
    },
    cta: {
      heading: I18nTextSchema,
      button: I18nTextSchema,
    },
  },
  { timestamps: true }
);

// Dev-mode: clear cached model so schema changes apply immediately
if (process.env.NODE_ENV !== "production" && mongoose.models.AboutContent) {
  delete mongoose.models.AboutContent;
}

export default mongoose.models.AboutContent ||
  mongoose.model<IAboutContent>("AboutContent", AboutContentSchema);
