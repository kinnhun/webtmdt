import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

interface ProductHeaderProps {
  onCreateProduct: () => void;
  canManage?: boolean;
}

export function ProductHeader({ onCreateProduct, canManage = true }: ProductHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 className="font-display font-semibold text-2xl m-0 text-navy-deep">Products</h2>
        <p className="text-sm text-gray-500 m-0">Manage your catalogue and inventory</p>
      </div>
      {canManage && (
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={onCreateProduct}
          className="bg-orange hover:bg-orange/90 border-none shadow-md h-10 px-6 font-semibold"
        >
          Add Product
        </Button>
      )}
    </div>
  );
}
