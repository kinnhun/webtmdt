export type FeaturedProductCandidate = {
  id: string;
  slug: string;
  code: string;
  nameUs: string;
  nameVi: string;
  categoryUs: string;
  collection: string;
  image: string;
  isStandaloneTable: boolean;
  isLegacyExcluded: boolean;
};

export type FeaturedProductsAdminData = {
  featuredProductSlugs: string[];
  candidates: FeaturedProductCandidate[];
};

export type FeaturedProductsSaveResponse = {
  success: true;
  data: {
    featuredProductSlugs: string[];
  };
};

export type FeaturedProductsGetResponse = {
  success: true;
  data: FeaturedProductsAdminData;
};

export type FeaturedProductsSelectorProps = {
  canEdit?: boolean;
};

export type SelectedFeaturedItemProps = {
  product: FeaturedProductCandidate;
  index: number;
  total: number;
  canEdit: boolean;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onMoveToPosition: (fromIndex: number, toPosition: number) => void;
  onRemove: (slug: string) => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (index: number) => void;
};

export type CandidateFeaturedItemProps = {
  product: FeaturedProductCandidate;
  selectedIndex: number;
  canEdit: boolean;
  onAdd: (slug: string) => void;
  onRemove: (slug: string) => void;
};

