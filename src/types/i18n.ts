export type Locale = 'vi-VN' | 'en-US' | 'en-GB';

export interface I18nRecord {
  'vi-VN'?: string;
  'en-US'?: string;
  'en-GB'?: string;
}

export interface I18nFlatRecord {
  vi?: string;
  us?: string;
  uk?: string;
}
