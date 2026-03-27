import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { FilterState, Collection } from "@/domains/product/product.types";
import { getOptionTranslation } from "../utils/translations";

export function SidebarFilter({ collection, handleCollectionChange, filters, toggleFilter, clearFilters, activeCount, filterGroups }: {
  collection: Collection;
  handleCollectionChange: (c: Collection) => void;
  filters: FilterState;
  toggleFilter: (key: keyof FilterState, value: string) => void;
  clearFilters: () => void;
  activeCount: number;
  filterGroups: { key: keyof FilterState; label: string; options: string[] }[];
}) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ category: true, material: true, moq: true, color: false, style: false });

  return (
    <aside className="w-full space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground text-lg">{t("catalogue.filters")}</h3>
        {activeCount > 0 && (
          <button onClick={clearFilters} className="font-body text-xs font-medium hover:underline" style={{ color: "hsl(var(--orange))" }}>{t("catalogue.clearAll")} ({activeCount})</button>
        )}
      </div>

      <div className="border-b border-border pb-4 mb-2">
        <p className="font-body font-semibold text-sm text-foreground mb-3">{t("catalogue.collection")}</p>
        <div className="space-y-2.5">
          {(["Outdoor", "Indoor"] as Collection[]).map((c) => (
            <label key={c} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" checked={collection === c} onChange={() => handleCollectionChange(c)} className="w-4 h-4 accent-orange outline-none" style={{ accentColor: "hsl(var(--orange))" }} />
              <span className={`font-body text-sm transition-colors ${collection === c ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                {c === "Outdoor" ? t("catalogue.outdoorCollection") : t("catalogue.indoorCollection")}
              </span>
            </label>
          ))}
        </div>
      </div>
      {filterGroups.map(({ key, label, options }) => (
        <div key={key} className="border-b border-border">
          <button onClick={() => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))} className="w-full flex items-center justify-between py-3.5 font-body text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors">
            {label}
            {filters[key].length > 0 && <span className="w-5 h-5 rounded-full text-xs text-white flex items-center justify-center mr-1" style={{ backgroundColor: "hsl(var(--orange))" }}>{filters[key].length}</span>}
            <ChevronRight size={14} className={`transition-transform duration-200 text-muted-foreground ml-auto ${expanded[key] ? "rotate-90" : ""}`} />
          </button>
          <AnimatePresence>
            {expanded[key] && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                <div className="pb-3 space-y-1.5">
                  {options.map((opt) => {
                    const displayOpt = getOptionTranslation(t, key, opt);
                    const checked = filters[key].includes(opt);
                    return (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group py-0.5 px-1 rounded hover:bg-muted/50 transition-colors">
                        <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleFilter(key, opt)} />
                        <span className={`w-4 h-4 rounded-[3px] border-2 flex items-center justify-center transition-all ${checked ? "border-orange bg-orange" : "border-border group-hover:border-muted-foreground"}`} style={checked ? { borderColor: "hsl(var(--orange))", backgroundColor: "hsl(var(--orange))" } : {}}>
                          {checked && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                        <span className={`font-body text-sm transition-colors ${checked ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>{displayOpt}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </aside>
  );
}
