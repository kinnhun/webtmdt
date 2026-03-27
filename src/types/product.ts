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
