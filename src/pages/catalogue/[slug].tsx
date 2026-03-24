import { useRouter } from "next/router";
import Head from "next/head";
import { productsData } from "@/data/products";
import ProductDetailContainer from "@/features/catalogue/components/ProductDetailContainer";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!router.isReady) return null;

  const product = productsData.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div className="pt-[120px] pb-20 text-center" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <h1 className="font-display text-2xl font-bold mb-2" style={{ color: "hsl(var(--navy-deep))" }}>Product Not Found</h1>
        <p className="font-body text-sm" style={{ color: "hsl(var(--navy)/0.5)" }}>The product you are looking for does not exist.</p>
      </div>
    );
  }

  const relatedProducts = productsData
    .filter((p) => p.id !== product.id && (p.category === product.category || p.material === product.material))
    .slice(0, 4);

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
