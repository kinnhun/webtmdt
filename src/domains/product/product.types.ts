export type Collection = 'Outdoor' | 'Indoor';

export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  collection: Collection;
  category: string;
  subCategory?: string;
  material: string;
  color: string;
  size?: string;
  style: string;
  moq?: string;
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
  moq: string[];
  color: string[];
  style: string[];
}

export const emptyFilters: FilterState = {
  category: [],
  material: [],
  moq: [],
  color: [],
  style: [],
};

// ── Outdoor categories ──────────────────────────────────────────
export const OUTDOOR_CATEGORIES = [
  'Outdoor Sofas',
  'Dining Sets',
  'Lounge & Daybeds',
  'Tables',
  'Chairs',
];

// ── Indoor categories ───────────────────────────────────────────
export const INDOOR_CATEGORIES = [
  'Living Room Furniture',
  'Dining Room Furniture',
  'Bathroom Furniture',
];

// ── Shared filters ──────────────────────────────────────────────
export const MATERIALS = ['Teak', 'Acacia', 'Aluminium'];

export const MOQ_OPTIONS = ['Under 10', '10–50', '50–100', '100+'];

export const CATEGORIES = [...OUTDOOR_CATEGORIES, ...INDOOR_CATEGORIES];

export const COLORS = [
  'Natural Wood',
  'Brown',
  'Black',
  'White',
  'Grey',
  'Beige',
  'Green'
];

export const STYLES = [
  'Modern',
  'Contemporary',
  'Minimalist',
  'Coastal',
  'Luxury'
];

export const SIZES: string[] = [];
