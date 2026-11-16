import React from "react";
import Image from "next/image";
import { Button, Tag } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import type { CandidateFeaturedItemProps } from "@/features/admin/types/featuredProducts.types";

export function CandidateFeaturedItem({
  product,
  selectedIndex,
  canEdit,
  onAdd,
  onRemove,
}: CandidateFeaturedItemProps) {
  const isSelected = selectedIndex >= 0;

  return (
    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-gray-100 bg-white hover:border-gray-300 transition-colors">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <Image
          src={product.image || "/img/WhyDHT.png"}
          alt={product.nameUs}
          width={48}
          height={40}
          unoptimized
          className="w-12 h-10 rounded object-contain bg-[#F6F2EA] border border-gray-100 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="font-medium text-sm text-navy-deep truncate">{product.nameUs}</div>
          <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
            <span className="text-[11px] font-mono text-gray-500">{product.code}</span>
            <Tag className="m-0 text-[10px] border-0 bg-gray-100 text-gray-700">
              {product.categoryUs}
            </Tag>
            {product.isStandaloneTable && (
              <Tag color="warning" className="m-0 text-[10px]">
                Bàn rời
              </Tag>
            )}
            {product.isLegacyExcluded && (
              <Tag color="error" className="m-0 text-[10px]">
                Logo cũ
              </Tag>
            )}
          </div>
        </div>
      </div>

      {canEdit &&
        (isSelected ? (
          <Button
            size="small"
            icon={<CheckOutlined />}
            onClick={() => onRemove(product.slug)}
            className="shrink-0 text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
          >
            #{selectedIndex + 1}
          </Button>
        ) : (
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => onAdd(product.slug)}
            className="shrink-0 bg-navy-deep hover:bg-navy border-none"
          >
            Chọn
          </Button>
        ))}
    </div>
  );
}
