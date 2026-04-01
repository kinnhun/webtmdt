import dynamic from "next/dynamic";

const CatalogueContainer = dynamic(() => import("@/features/catalogue/components/CatalogueContainer"), { ssr: false });

export default function IndoorCataloguePage() {
  return <CatalogueContainer forcedCollection="Indoor" />;
}
