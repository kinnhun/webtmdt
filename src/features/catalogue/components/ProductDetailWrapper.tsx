import Head from "next/head";
import ProductDetailContainer from "./ProductDetailContainer";
import { useProductDetail } from "../hooks/useProductDetail";
import { useTranslation } from "react-i18next";

export default function ProductDetailWrapper() {
  const { isReady, product, relatedProducts } = useProductDetail();
  const { i18n } = useTranslation();

  if (!isReady) return null;

  if (!product) {
    return (
      <div className="pt-[120px] pb-20 text-center" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "hsl(var(--navy-deep))" }}>Product Not Found</h1>
        <p className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.5)" }}>The product you are looking for does not exist.</p>
      </div>
    );
  }

  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  const pName = product.name?.[langId] || product.name?.us || "";
  const pDesc = product.description?.[langId] || product.description?.us || "";

  return (
    <>
      <Head>
        <title>{pName} — DHT Furniture</title>
        <meta name="description" content={pDesc} />
      </Head>
      <ProductDetailContainer product={product} relatedProducts={relatedProducts} />
    </>
  );
}
