import React from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import ProductForm from '@/features/admin/components/ProductForm';
import { useProductDetail } from '@/features/catalogue/hooks/useProductDetail';

export function EditProductFeature() {
  const router = useRouter();
  const { product, isReady } = useProductDetail();

  if (!isReady) {
    return <div className="flex justify-center flex-col items-center h-64"><Spin size="large" /></div>;
  }

  if (isReady && !product) {
    return (
      <div className="flex justify-center flex-col items-center h-64 gap-4">
        <h2 className="text-xl font-display text-navy">Product Not Found</h2>
        <button onClick={() => router.push('/admin/products')} className="text-blue-500 hover:underline">
          Return to Product List
        </button>
      </div>
    );
  }

  return product ? <ProductForm initialValues={product} isEdit={true} /> : null;
}
