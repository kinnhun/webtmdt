import type { FilterState } from "@/types/product";

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
