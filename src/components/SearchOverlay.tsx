import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { productsData } from "@/data/products";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const results = query.length >= 2
    ? productsData.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.code.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSelect = () => {
    router.push(`/catalogue?search=${encodeURIComponent(query)}`);
    onClose();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }} className="fixed top-0 left-0 right-0 z-50 bg-white shadow-2xl p-6">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4">
                <Search size={20} className="text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus type="text" placeholder="Search by product name or code..."
                  value={query} onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { handleSelect(); }
                    if (e.key === "Escape") { onClose(); setQuery(""); }
                  }}
                  className="flex-1 text-lg font-body outline-none text-foreground placeholder:text-muted-foreground"
                />
                <button onClick={() => { onClose(); setQuery(""); }} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              {results.length > 0 && (
                <div className="mt-4 border-t border-border pt-4 grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
                  {results.map((p) => (
                    <button key={p.id} onClick={handleSelect} className="flex items-center gap-4 p-3 hover:bg-muted rounded-md transition-colors text-left">
                      <img src={p.image} alt={p.name} className="w-12 h-10 rounded object-cover flex-shrink-0" />
                      <div>
                        <p className="font-body font-medium text-sm text-foreground">{p.name}</p>
                        <p className="font-body text-xs text-muted-foreground">{p.code} · {p.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query.length >= 2 && results.length === 0 && (
                <p className="mt-4 border-t border-border pt-4 font-body text-sm text-muted-foreground">No products found for &ldquo;{query}&rdquo;</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
