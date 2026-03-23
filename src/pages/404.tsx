import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 — Page Not Found</title>
      </Head>
      <div className="flex flex-col items-center justify-center text-center px-6" style={{ minHeight: "100vh", backgroundColor: "hsl(var(--warm-cream))" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display font-bold leading-none mb-4" style={{ fontSize: "clamp(5rem, 15vw, 12rem)", color: "hsl(var(--orange)/0.15)" }}>404</h1>
          <h2 className="font-display font-bold text-foreground text-2xl mb-3">Page Not Found</h2>
          <p className="font-body text-muted-foreground text-sm mb-8 max-w-sm mx-auto">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-body font-semibold text-sm text-white transition-all hover:opacity-90" style={{ backgroundColor: "hsl(var(--orange))" }}>
            <Home size={15} /> Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}
