import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { productsData } from "@/data/products";
import { OUTDOOR_CATEGORIES, INDOOR_CATEGORIES, MATERIALS, MOQ_OPTIONS, COLORS, STYLES } from "@/domains/product/product.types";
import type { Product, FilterState, Collection } from "@/domains/product/product.types";
import { useTranslation } from "react-i18next";

export function useCatalogue() {
  const router = useRouter();
  const { t } = useTranslation();
  
  const [collection, setCollection] = useState<Collection>("Outdoor");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({ category: [], material: [], moq: [], color: [], style: [] });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    
    let initCol: Collection = "Outdoor";
    if (q.collection === "Indoor" || q.collection === "Outdoor") {
      initCol = q.collection as Collection;
    }
    
    const initFilters: FilterState = { category: [], material: [], moq: [], color: [], style: [] };
    
    ['category', 'material', 'moq', 'color', 'style'].forEach((key) => {
      const val = q[key];
      if (val) {
        if (typeof val === 'string') initFilters[key as keyof FilterState] = val.split(',');
        else if (Array.isArray(val)) initFilters[key as keyof FilterState] = val;
      }
    });

    if (initFilters.category.length > 0) {
      const firstCat = initFilters.category[0];
      if (OUTDOOR_CATEGORIES.includes(firstCat)) initCol = "Outdoor";
      else if (INDOOR_CATEGORIES.includes(firstCat)) initCol = "Indoor";
    }

    setCollection(initCol);
    setFilters(initFilters);
    if (q.search && typeof q.search === "string") setSearch(q.search);
    if (q.page && typeof q.page === "string") {
      const parsedPage = parseInt(q.page, 10);
      if (!isNaN(parsedPage) && parsedPage > 0) setPage(parsedPage);
    }
    
    setInitialized(true);
  }, [router.isReady]);

  useEffect(() => {
    if (!initialized) return;

    const query: Record<string, string> = {};
    if (collection !== "Outdoor") query.collection = collection;
    if (search) query.search = search;
    if (page > 1) query.page = page.toString();
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        query[key] = values.join(',');
      }
    });

    const currentQueryRaw = { ...router.query };
    delete currentQueryRaw.slug; 
    
    const newQueryString = new URLSearchParams(query).toString();
    const currentQueryString = new URLSearchParams(currentQueryRaw as any).toString();

    if (newQueryString !== currentQueryString) {
      router.replace({ pathname: router.pathname, query }, undefined, { shallow: true, scroll: false });
    }
  }, [collection, search, filters, page, initialized, router.pathname]);

  const handleCollectionChange = (newCollection: Collection) => {
    setCollection(newCollection);
    setFilters(prev => ({ ...prev, category: [] })); 
    setPage(1);
  };

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return { ...prev, [key]: arr.includes(value) ? arr.filter((v: string) => v !== value) : [...arr, value] };
    });
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ category: [], material: [], moq: [], color: [], style: [] });
    setSearch("");
    setPage(1);
  };

  const activeCount = Object.values(filters).flat().length + (search ? 1 : 0);

  let collectionProducts = productsData.filter(p => p.collection === collection);

  let filtered = collectionProducts.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.code.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
    }
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    if (filters.moq.length && (!p.moq || !filters.moq.includes(p.moq))) return false;
    if (filters.color.length && (!p.color || !filters.color.includes(p.color))) return false;
    if (filters.style.length && (!p.style || !filters.style.includes(p.style))) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const filterGroups: { key: keyof FilterState; label: string; options: string[] }[] = [
    { key: "category", label: t("catalogue.category"), options: collection === "Outdoor" ? OUTDOOR_CATEGORIES : INDOOR_CATEGORIES },
    { key: "material", label: t("catalogue.material"), options: MATERIALS },
    { key: "moq", label: t("catalogue.moq"), options: MOQ_OPTIONS },
    { key: "color", label: t("catalogue.color"), options: COLORS },
    { key: "style", label: t("catalogue.style"), options: STYLES },
  ];

  return {
    collection,
    search,
    setSearch,
    filters,
    quickViewProduct,
    setQuickViewProduct,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    page,
    setPage,
    handleCollectionChange,
    toggleFilter,
    clearFilters,
    activeCount,
    collectionProducts,
    filtered,
    paginated,
    totalPages,
    safePage,
    filterGroups,
    t
  };
}
