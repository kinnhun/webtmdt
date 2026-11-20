export type BrandId = "DHT" | "JAGER" | "THE ONE" | "MEKONG";

export type CollectionBrandFilter = "ALL" | BrandId;

export type BrandLogoProps = {
  brand: BrandId;
  variant?: "color" | "light" | "badge";
  className?: string;
};

export type DhtHorizontalLogoProps = {
  className?: string;
  iconSize?: number;
  textClassName?: string;
};

export type BrandShowcaseItem = {
  id: BrandId;
  name: string;
  specialty: string;
  shortDesc: string;
  modalTitle: string;
  modalDescription: string;
  factoryImage: string;
  brandCardImage: string;
  videoUrl: string;
};

export type CuratedCollectionItem = {
  id: string;
  slug: string;
  brand: BrandId;
  title: string;
  category: string;
  material: string;
  style: string;
  image: string;
  featuredOrder: number;
  wideCard?: boolean;
};

export type EvolutionMilestone = {
  year: string;
  logoSrc: string;
  title: string;
  description: string;
};

export type BusinessModelPillar = {
  id: string;
  title: string;
  description: string;
  iconName: "handshake" | "factory" | "layers";
};

export type FacilityRowItem = {
  id: string;
  name: string;
  footprint: string;
  focus: string;
};

export type RegionalFacilityBlock = {
  id: "quynhon" | "hcmc" | "hungyen" | "phutho";
  regionLabel: string;
  clusterName: string;
  facilityCountLabel: string;
  totalFootprint: string;
  bannerImage: string;
  clusterCardImage: string;
  clusterCardSummary: string;
  facilities: FacilityRowItem[];
};

export type ExportRegionTableRow = {
  id: "quynhon" | "hcmc" | "hungyen" | "phutho";
  regionName: string;
  facilitiesRange: string;
  count: number;
  primaryGateway: string;
  portId: "quynhon_port" | "south_ports" | "haiphong_port";
};

export type ExportGatewayCardItem = {
  id: "haiphong_port" | "south_ports" | "quynhon_port";
  name: string;
  roleLabel: string;
  servedFrom: string;
  image: string;
};

export type GlobalMarketRegionItem = {
  id: "na" | "eu" | "mea" | "apac";
  name: string;
  count: number;
  countries: string[];
};

export type InquiryTypeValue =
  | "General Inquiry"
  | "Request a Quotation"
  | "Request Catalogue Access"
  | "Discuss a Project"
  | "Arrange Factory Visit";

export type BrandInterestValue =
  | "DHT – Outdoor Furniture"
  | "JAGER – Indoor Furniture"
  | "THE ONE – Project & Office Furniture"
  | "MEKONG – Wood Panels & Processing"
  | "Multiple Brands / Not Sure";

export type SmartContactFormValues = {
  inquiryType: InquiryTypeValue;
  brandOfInterest: BrandInterestValue;
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneWhatsapp: string;
  countryMarket: string;
  message: string;
  attachmentName: string;
};

export type OurBrandCardItem = {
  id: BrandId;
  specialty: string;
  description: string;
  image: string;
  ctaLabel: string;
};

export type ProductCapabilityItem = {
  title: string;
  href: string;
  icon: "outdoor" | "indoor" | "office" | "project" | "panels";
};
