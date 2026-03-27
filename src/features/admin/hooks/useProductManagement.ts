import { useState, useMemo } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct } from '@/services/product.service';
import type { FilterState } from '@/domains/product/product.types';
import type { Product as ProductType } from '@/types/product';
import { productsData } from '@/data/products';

const DEFAULT_FILTERS: FilterState = {
  category: [],
  material: [],
  moq: [],
  color: [],
  style: [],
};

export function useProductManagement() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');

  // Fetch live data from MongoDB via API
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'admin'],
    queryFn: () => getProducts(DEFAULT_FILTERS, ''),
    // Fallback to static data on error
    placeholderData: productsData as ProductType[],
    retry: 1,
  });

  // Build table data source
  const dataSource = useMemo(() => {
    const source = products || productsData;
    return source.map((p) => ({ ...p, key: p.id || p.slug }));
  }, [products]);

  // Client-side search filter
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource;
    const q = searchText.toLowerCase();
    return dataSource.filter((item) => {
      const catMatch = Array.isArray(item.category)
        ? item.category.some(c => c.toLowerCase().includes(q))
        : item.category?.toLowerCase().includes(q);

      return (
        item.name.toLowerCase().includes(q) ||
        item.code?.toLowerCase().includes(q) ||
        catMatch
      );
    });
  }, [dataSource, searchText]);

  // Delete mutation
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (slugOrId: string) => deleteProduct(slugOrId),
    onSuccess: (_, slugOrId) => {
      message.success(`Product deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: () => {
      message.error('Failed to delete product. Try again.');
    },
  });

  const handleDelete = (slugOrId: string) => {
    mutateDelete(slugOrId);
  };

  const handleCreateProduct = () => {
    router.push('/admin/products/create');
  };

  const handleEditProduct = (slugOrId: string) => {
    router.push(`/admin/products/edit/${slugOrId}`);
  };

  return {
    searchText,
    setSearchText,
    filteredData,
    isLoading,
    handleDelete,
    handleCreateProduct,
    handleEditProduct,
  };
}
