import { useState, useMemo } from "react";
import { message } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminFeaturedProducts,
  saveAdminFeaturedProducts,
} from "@/services/featuredProducts.service";
import { productKeys } from "@/domains/product/product.keys";
import type {
  FeaturedProductCandidate,
  FeaturedProductsAdminData,
} from "@/features/admin/types/featuredProducts.types";

const MAX_FEATURED = 12;

function moveItem<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) return list;
  if (fromIndex < 0 || fromIndex >= list.length) return list;
  if (toIndex < 0 || toIndex >= list.length) return list;
  const copy = [...list];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

export function useFeaturedProductsManager() {
  const queryClient = useQueryClient();
  const [draftSlugs, setDraftSlugs] = useState<string[] | null>(null);
  const [searchText, setSearchText] = useState("");
  const [collectionFilter, setCollectionFilter] = useState<"all" | "Outdoor" | "Indoor">("all");
  const [hideStandaloneTables, setHideStandaloneTables] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-featured-products"],
    queryFn: getAdminFeaturedProducts,
  });

  const serverSlugs = useMemo(
    () => data?.featuredProductSlugs ?? [],
    [data?.featuredProductSlugs]
  );

  const selectedSlugs = draftSlugs ?? serverSlugs;
  const candidates = useMemo(() => data?.candidates ?? [], [data?.candidates]);

  const candidateBySlug = useMemo(() => {
    const map = new Map<string, FeaturedProductCandidate>();
    for (const item of candidates) {
      map.set(item.slug, item);
    }
    return map;
  }, [candidates]);

  const selectedItems = useMemo(
    () =>
      selectedSlugs
        .map((slug) => candidateBySlug.get(slug))
        .filter((item): item is FeaturedProductCandidate => item !== undefined),
    [selectedSlugs, candidateBySlug]
  );

  const positionBySlug = useMemo(() => {
    const map = new Map<string, number>();
    selectedSlugs.forEach((slug, index) => {
      map.set(slug, index);
    });
    return map;
  }, [selectedSlugs]);

  const filteredCandidates = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return candidates.filter((item) => {
      if (hideStandaloneTables && item.isStandaloneTable) return false;
      if (collectionFilter !== "all") {
        const hasCollection = item.collection.toLowerCase().includes(collectionFilter.toLowerCase());
        if (!hasCollection) return false;
      }
      if (!q) return true;
      return (
        item.nameUs.toLowerCase().includes(q) ||
        item.nameVi.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.categoryUs.toLowerCase().includes(q)
      );
    });
  }, [candidates, searchText, collectionFilter, hideStandaloneTables]);

  const hasChanges = useMemo(() => {
    if (draftSlugs === null) return false;
    if (draftSlugs.length !== serverSlugs.length) return true;
    return draftSlugs.some((slug, idx) => slug !== serverSlugs[idx]);
  }, [draftSlugs, serverSlugs]);

  const { mutate: saveOrder, isPending: isSaving } = useMutation({
    mutationFn: () => saveAdminFeaturedProducts(selectedSlugs),
    onSuccess: (savedSlugs) => {
      queryClient.setQueryData<FeaturedProductsAdminData>(
        ["admin-featured-products"],
        (prev) => (prev ? { ...prev, featuredProductSlugs: savedSlugs } : prev)
      );
      setDraftSlugs(null);
      queryClient.invalidateQueries({ queryKey: ["admin-featured-products"] });
      queryClient.invalidateQueries({ queryKey: productKeys.featured() });
      message.success("Đã lưu danh sách và thứ tự sản phẩm Trang chủ.");
    },
    onError: () => {
      message.error("Không thể lưu danh sách sản phẩm Trang chủ. Vui lòng thử lại.");
    },
  });

  const handleAdd = (slug: string) => {
    const current = draftSlugs ?? serverSlugs;
    if (current.includes(slug)) return;
    if (current.length >= MAX_FEATURED) {
      message.warning(`Tối đa ${MAX_FEATURED} sản phẩm nổi bật trên Trang chủ.`);
      return;
    }
    setDraftSlugs([...current, slug]);
  };

  const handleRemove = (slug: string) => {
    const current = draftSlugs ?? serverSlugs;
    setDraftSlugs(current.filter((item) => item !== slug));
  };

  const handleMoveUp = (index: number) => {
    const current = draftSlugs ?? serverSlugs;
    setDraftSlugs(moveItem(current, index, index - 1));
  };

  const handleMoveDown = (index: number) => {
    const current = draftSlugs ?? serverSlugs;
    setDraftSlugs(moveItem(current, index, index + 1));
  };

  const handleMoveToPosition = (fromIndex: number, toPosition: number) => {
    const current = draftSlugs ?? serverSlugs;
    setDraftSlugs(moveItem(current, fromIndex, toPosition - 1));
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null) return;
    const current = draftSlugs ?? serverSlugs;
    setDraftSlugs(moveItem(current, draggedIndex, targetIndex));
    setDraggedIndex(null);
  };

  const handleReset = () => {
    setDraftSlugs(null);
  };

  const handleSave = () => {
    saveOrder();
  };

  return {
    isLoading,
    isSaving,
    hasChanges,
    selectedItems,
    filteredCandidates,
    positionBySlug,
    searchText,
    setSearchText,
    collectionFilter,
    setCollectionFilter,
    hideStandaloneTables,
    setHideStandaloneTables,
    setDraggedIndex,
    handleAdd,
    handleRemove,
    handleMoveUp,
    handleMoveDown,
    handleMoveToPosition,
    handleDrop,
    handleReset,
    handleSave,
  };
}
