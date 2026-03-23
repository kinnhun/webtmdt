export interface Product {
  id: string;
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
  "Bedroom",
  "Dining Room",
  "Living Room",
  "Home Office",
  "Outdoor",
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
