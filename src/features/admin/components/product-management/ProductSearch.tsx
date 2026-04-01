import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface ProductSearchProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

export function ProductSearch({ searchText, onSearchChange }: ProductSearchProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm flex items-center justify-between">
      <Input
        placeholder="Search products by name or code..."
        prefix={<SearchOutlined className="text-gray-400" />}
        className="max-w-md"
        size="large"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}
