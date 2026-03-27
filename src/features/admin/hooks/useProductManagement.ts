import { useState } from 'react';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { productsData } from '@/data/products';

export function useProductManagement() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  // Mock data for table
  const dataSource = productsData.map((p) => ({ ...p, key: p.id }));

  const filteredData = dataSource.filter(
    (item) => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) || 
      item.code.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id: string) => {
    message.success(`Product ${id} deleted successfully (Demo)`);
  };

  const handleCreateProduct = () => {
    router.push('/admin/products/create');
  };

  const handleEditProduct = (slugOrId: string) => {
    router.push(`/admin/products/${slugOrId}`);
  };

  return {
    searchText,
    setSearchText,
    filteredData,
    handleDelete,
    handleCreateProduct,
    handleEditProduct,
  };
}
