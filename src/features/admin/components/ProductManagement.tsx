import React from 'react';
import { useProductManagement } from '@/features/admin/hooks/useProductManagement';
import { ProductHeader } from './product-management/ProductHeader';
import { ProductSearch } from './product-management/ProductSearch';
import { ProductTable } from './product-management/ProductTable';
import { useAdminAuth } from '@/hooks/useAdminAuth';

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

  const { hasPermission } = useAdminAuth();
  const canManage = hasPermission('product.manage');

  return (
    <div className="space-y-4">
      <ProductHeader onCreateProduct={handleCreateProduct} canManage={canManage} />
      
      <ProductSearch 
        searchText={searchText} 
        onSearchChange={setSearchText} 
      />
      
      <ProductTable 
        data={filteredData} 
        onEdit={handleEditProduct} 
        onDelete={handleDelete}
        loading={isLoading}
        canManage={canManage}
      />
    </div>
  );
}
