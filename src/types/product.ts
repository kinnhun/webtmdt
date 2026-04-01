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

export interface ProductSpecification {
  nameUS: string;
  nameVI?: string;
  nameUK?: string;
  valueUS: string;
  valueVI?: string;
  valueUK?: string;
}

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

export interface Product {
  id: string;
  slug: string;
  name: I18nText;
  code: string;
  collection: Collection | Collection[];
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
  /** Structured attribute cards with icon + localized labels & values */
  attributes?: ProductAttribute[];
  /** Detail page extras */
  video?: string;
  dimensions?: string;
  weight?: string;
  specifications?: ProductSpecification[];
  careInstructions?: I18nList;
  usageSettings?: I18nList;
  longDescription?: I18nText;
}

export interface FilterState {
  category: string[];
  material: string[];
  moq: string[];
  color: string[];
  style: string[];
}
