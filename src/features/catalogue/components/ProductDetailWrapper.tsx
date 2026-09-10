import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import ProductDetailContainer from "./ProductDetailContainer";
import { useProductDetail } from "../hooks/useProductDetail";
import { useTranslation } from "react-i18next";

interface ProductDetailWrapperProps {
  initialProduct?: any;
  initialRelated?: any[];
}

export default function ProductDetailWrapper({ initialProduct, initialRelated }: ProductDetailWrapperProps) {
  const { isReady, product, relatedProducts } = useProductDetail(initialProduct, initialRelated);
  const { i18n } = useTranslation();

  if (!isReady && !initialProduct) return null;

  const currentProduct = product || initialProduct;

  if (!currentProduct) {
    return (
      <div className="pt-[120px] pb-20 text-center" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "hsl(var(--navy-deep))" }}>Product Not Found</h1>
        <p className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.5)" }}>The product you are looking for does not exist.</p>
      </div>
    );
  }

  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const pName = currentProduct.name?.[langId] || currentProduct.name?.us || "Luxury Furniture";
  const pDesc = currentProduct.description?.[langId] || currentProduct.description?.us || "High quality handcrafted luxury furniture by DHT Company.";
  const pImage = currentProduct.images?.[0] || currentProduct.image || "/img/logo-no-text.png";
  const pSlug = currentProduct.slug || currentProduct.id || currentProduct._id;
  const pCollection = currentProduct.collection || "Outdoor";
  const collectionSlug = pCollection.toLowerCase() === "indoor" ? "indoor" : "outdoor";

  const productImages = currentProduct.images?.length ? currentProduct.images : [pImage];

  return (
    <>
      <SEO 
        title={`${pName} — DHT Furniture`} 
        description={pDesc} 
        image={pImage}
        type="product"
        brand="DHT Company"
        sku={currentProduct.code || currentProduct.productId}
        availability="InStock"
      />
      <Schema 
        id="schema-product"
        type="Product"
        data={{
          name: pName,
          description: pDesc,
          image: productImages,
          sku: currentProduct.code || currentProduct.productId,
          mpn: currentProduct.code || currentProduct.productId,
          brand: {
            "@type": "Brand",
            name: "DHT Company"
          },
          manufacturer: {
            "@type": "Organization",
            name: "DHT Company"
          },
          category: currentProduct.category?.us || currentProduct.category?.vi || "Furniture",
          offers: {
            "@type": "Offer",
            url: `https://dhtcompany.com/catalogue/${pSlug}`,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@type": "Organization",
              name: "DHT Company"
            }
          }
        }}
      />
      <Schema 
        id="schema-breadcrumbs"
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://dhtcompany.com"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `${pCollection} Collection`,
              item: `https://dhtcompany.com/catalogue/${collectionSlug}`
            },
            {
              "@type": "ListItem",
              position: 3,
              name: pName,
              item: `https://dhtcompany.com/catalogue/${pSlug}`
            }
          ]
        }}
      />
      <ProductDetailContainer product={currentProduct} relatedProducts={relatedProducts} />
    </>
  );
}
