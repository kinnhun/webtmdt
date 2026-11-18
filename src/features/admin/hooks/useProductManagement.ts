import { useState, useMemo } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts, deleteProduct } from '@/services/product.service';
import type { FilterState } from '@/domains/product/product.types';
import type { Product as ProductType } from '@/types/product';

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
    retry: 1,
  });

  // Build table data source
  const dataSource = useMemo(() => {
    const source = products || [];
    return source.map((p) => ({ ...p, key: p.id || p.slug }));
  }, [products]);

  // Client-side search filter
  const filteredData = useMemo(() => {
    if (!searchText) return dataSource;
    const q = searchText.toLowerCase();
    return dataSource.filter((item) => {
      const catUs = (item.category?.us || '').toLowerCase();
      const catUk = (item.category?.uk || '').toLowerCase();
      const catVi = (item.category?.vi || '').toLowerCase();

      const nameUs = (item.name?.us || '').toLowerCase();
      const nameUk = (item.name?.uk || '').toLowerCase();
      const nameVi = (item.name?.vi || '').toLowerCase();

      return (
        nameUs.includes(q) || nameUk.includes(q) || nameVi.includes(q) ||
        item.code?.toLowerCase().includes(q) ||
        catUs.includes(q) || catUk.includes(q) || catVi.includes(q)
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
