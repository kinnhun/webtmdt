export type Collection = 'Outdoor' | 'Indoor';

/** One visual attribute card as shown on the catalogue detail page */
export interface ProductAttribute {
  icon: string;       // Ant Design icon name string e.g. "RulerOutlined"
  titleUS: string;    // Primary (American English)
  titleVI?: string;
  titleUK?: string;
  valueUS: string;    // Primary (American English)
  valueVI?: string;
  valueUK?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameVI?: string;
  nameUS?: string;
  nameUK?: string;
  code: string;
  collection: Collection | Collection[];
  category: string | string[];
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
  /** Structured attribute cards with icon + localized labels & values */
  attributes?: ProductAttribute[];
  /** Detail page extras */
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

export interface FilterState {
  category: string[];
  material: string[];
  moq: string[];
  color: string[];
  style: string[];
}
