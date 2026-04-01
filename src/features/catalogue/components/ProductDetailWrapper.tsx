import Head from "next/head";
import ProductDetailContainer from "./ProductDetailContainer";
import { useProductDetail } from "../hooks/useProductDetail";

export default function ProductDetailWrapper() {
  const { isReady, product, relatedProducts } = useProductDetail();

  if (!isReady) return null;

  if (!product) {
    return (
      <div className="pt-[120px] pb-20 text-center" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "hsl(var(--navy-deep))" }}>Product Not Found</h1>
        <p className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.5)" }}>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} — DHT Furniture</title>
        <meta name="description" content={product.description} />
      </Head>
      <ProductDetailContainer product={product} relatedProducts={relatedProducts} />
    </>
  );
}
