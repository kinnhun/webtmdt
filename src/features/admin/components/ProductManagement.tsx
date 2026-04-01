import React from 'react';
import { useProductManagement } from '@/features/admin/hooks/useProductManagement';
import { ProductHeader } from './product-management/ProductHeader';
import { ProductSearch } from './product-management/ProductSearch';
import { ProductTable } from './product-management/ProductTable';

export default function ProductManagement() {
  const {
    searchText,
    setSearchText,
    filteredData,
    isLoading,
    handleDelete,
    handleCreateProduct,
    handleEditProduct,
  } = useProductManagement();

  return (
    <div className="space-y-4">
      <ProductHeader onCreateProduct={handleCreateProduct} />
      
      <ProductSearch 
        searchText={searchText} 
        onSearchChange={setSearchText} 
      />
      
      <ProductTable 
        data={filteredData} 
        onEdit={handleEditProduct} 
        onDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}
