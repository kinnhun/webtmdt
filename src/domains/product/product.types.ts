export interface Product {
  id: string;
  slug: string;
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
  /** Detail page extras */
  video?: string;
  dimensions?: string;
  weight?: string;
  specifications?: Record<string, string>;
  careInstructions?: string[];
  usageSettings?: string[];
  longDescription?: string;
}


export interface FilterState {
  category: string[];
  material: string[];
  color: string[];
  size: string[];
  style: string[];
}

export const emptyFilters: FilterState = {
  category: [],
  material: [],
  color: [],
  size: [],
  style: [],
};

export const CATEGORIES = [
  "Outdoor Sofas",
  "Dining Sets",
  "Lounge & Daybeds",
  "Tables",
  "Chairs",
];

export const MATERIALS = [
  "Solid Oak",
  "Walnut Wood",
  "Teak",
  "Marble Top",
  "Upholstered",
  "Metal Frame",
  "Rattan",
];

export const COLORS = [
  "Natural Wood",
  "Walnut Brown",
  "Ivory White",
  "Charcoal Grey",
  "Sage Green",
  "Deep Navy",
  "Warm Beige",
];

export const SIZES = [
  "Single",
  "Double / Full",
  "Queen",
  "King",
  "Small",
  "Medium",
  "Large",
];

export const STYLES = [
  "Scandinavian",
  "Mid-Century Modern",
  "Contemporary",
  "Classic",
  "Industrial",
  "Coastal",
  "Minimalist",
];
