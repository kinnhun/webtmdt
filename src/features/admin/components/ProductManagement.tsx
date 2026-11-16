import React from 'react';
import { Tabs, Tag } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useProductManagement } from '@/features/admin/hooks/useProductManagement';
import { getAdminFeaturedProducts } from '@/services/featuredProducts.service';
import { ProductHeader } from './product-management/ProductHeader';
import { ProductSearch } from './product-management/ProductSearch';
import { ProductTable } from './product-management/ProductTable';
import FeaturedProductsSelector from './featured-products/FeaturedProductsSelector';
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

  const { data: featuredData } = useQuery({
    queryKey: ['admin-featured-products'],
    queryFn: getAdminFeaturedProducts,
  });

  const featuredSlugs = featuredData?.featuredProductSlugs ?? [];
  const featuredCount = featuredSlugs.length;
  const featuredOrderMap = featuredSlugs.reduce<Record<string, number>>((acc, slug, index) => {
    acc[slug] = index + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <ProductHeader onCreateProduct={handleCreateProduct} canManage={canManage} />

      <Tabs
        defaultActiveKey="all"
        items={[
          {
            key: 'all',
            label: (
              <span className="inline-flex items-center gap-1.5 font-medium">
                <UnorderedListOutlined />
                <span>Tất cả sản phẩm ({filteredData.length})</span>
              </span>
            ),
            children: (
              <div className="space-y-4">
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
                  featuredOrderMap={featuredOrderMap}
                />
              </div>
            ),
          },
          {
            key: 'home-featured',
            label: (
              <span className="inline-flex items-center gap-2 font-medium">
                <AppstoreOutlined />
                <span>Hiển thị Trang chủ</span>
                <Tag color={featuredCount > 0 ? 'green' : 'default'} className="m-0">
                  {featuredCount}/6
                </Tag>
              </span>
            ),
            children: <FeaturedProductsSelector canEdit={canManage} />,
          },
        ]}
      />
    </div>
  );
}
