import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { OUTDOOR_CATEGORIES, INDOOR_CATEGORIES, MATERIALS, MOQ_OPTIONS, COLORS, STYLES } from "@/domains/product/product.types";
import type { Product, FilterState, Collection } from "@/domains/product/product.types";
import { useProducts } from "@/domains/product/product.hooks";
import { useTranslation } from "react-i18next";

export function useCatalogue(forcedCollection?: Collection) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const langEnum: Record<string, 'vi' | 'uk' | 'us'> = { "vi-VN": "vi", "en-GB": "uk", "en-US": "us" };
  const langId = langEnum[i18n?.language] || "us";
  
  const [collection, setCollection] = useState<Collection>(forcedCollection || "Outdoor");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({ category: [], material: [], moq: [], color: [], style: [] });
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const [initialized, setInitialized] = useState(false);

  // Fetch all live products and use existing client-side filtering logic
  const emptyFilters: FilterState = { category: [], material: [], moq: [], color: [], style: [] };
  const { data: rawProducts = [], isLoading } = useProducts(emptyFilters, "");

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    
    let initCol: Collection = forcedCollection || "Outdoor";
    if (!forcedCollection) {
      if (q.collection === "Indoor" || q.collection === "Outdoor") {
        initCol = q.collection as Collection;
      }
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
    if (!forcedCollection && collection !== "Outdoor") query.collection = collection;
    if (search) query.search = search;
    if (page > 1) query.page = page.toString();
    
    Object.entries(filters).forEach(([key, values]) => {
      if (values && values.length > 0) {
        query[key] = values.join(',');
      }
    });

    const currentQueryRaw = { ...router.query };
    delete currentQueryRaw.slug; 
    
    const ObjectQuery = Object.fromEntries(
      Object.entries(currentQueryRaw).filter(([_, v]) => typeof v === 'string')
    ) as Record<string, string>;

    const newQueryString = new URLSearchParams(query).toString();
    const currentQueryString = new URLSearchParams(ObjectQuery).toString();

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

  const productsToFilter = Array.isArray(rawProducts) ? rawProducts : (rawProducts as any)?.data || [];

  let collectionProducts = productsToFilter.filter((p: Product) => {
    if (!p.collection) return false;
    const colArray = Array.isArray(p.collection) ? p.collection : String(p.collection).split(',').map(s => s.trim());
    return colArray.includes(collection);
  });

  let filtered = collectionProducts.filter((p: Product) => {
    if (search) {
      const q = search.toLowerCase();
      const pName = (p.name?.[langId] || p.name?.us || "").toLowerCase();
      const pCat = (p.category?.[langId] || p.category?.us || "").toLowerCase();
      if (!pName.includes(q) && !p.code.toLowerCase().includes(q) && !pCat.includes(q)) return false;
    }
    
    const checkOverlapExt = (fieldData: Product[keyof Product], selectedFilters: string[]) => {
      if (!selectedFilters.length) return true;

      const normalizedSelected = selectedFilters
        .map((value) => value.trim().toLowerCase())
        .filter(Boolean);

      const normalizedValues = new Set<string>();

      if (typeof fieldData === 'string') {
        fieldData
          .split(',')
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean)
          .forEach((value) => normalizedValues.add(value));
      } else if (fieldData && typeof fieldData === 'object') {
        [fieldData.us, fieldData[langId], fieldData.uk, fieldData.vi]
          .filter((value): value is string => typeof value === 'string')
          .flatMap((value) => value.split(','))
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean)
          .forEach((value) => normalizedValues.add(value));
      }

      return normalizedSelected.some((value) => normalizedValues.has(value));
    };

    if (!checkOverlapExt(p.category, filters.category)) return false;
    if (!checkOverlapExt(p.material, filters.material)) return false;
    if (filters.moq.length && (!p.moq || !filters.moq.includes(p.moq))) return false;
    if (!checkOverlapExt(p.color, filters.color)) return false;
    if (!checkOverlapExt(p.style, filters.style)) return false;

    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    const aName = a.name?.[langId] || a.name?.us || "";
    const bName = b.name?.[langId] || b.name?.us || "";
    return aName.localeCompare(bName);
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  const getDynamicOptions = (key: 'material' | 'color' | 'style'): string[] => {
    const opts = new Set<string>();
    collectionProducts.forEach((p: Product) => {
      const valStr = p[key]?.[langId] || p[key]?.us || "";
      valStr.split(',').forEach((s: string) => {
        const trimmed = s.trim();
        if (trimmed) opts.add(trimmed);
      });
    });
    return Array.from(opts).sort();
  };

  const filterGroups: { key: keyof FilterState; label: string; options: string[] }[] = [
    { key: "category", label: t("catalogue.category"), options: collection === "Outdoor" ? OUTDOOR_CATEGORIES : INDOOR_CATEGORIES },
    { key: "material", label: t("catalogue.material"), options: getDynamicOptions('material') },
    { key: "moq", label: t("catalogue.moq"), options: MOQ_OPTIONS },
    { key: "color", label: t("catalogue.color"), options: getDynamicOptions('color') },
    { key: "style", label: t("catalogue.style"), options: getDynamicOptions('style') },
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
    t,
    isLoading
  };
}
