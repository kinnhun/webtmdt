import React from "react";
import Image from "next/image";
import { Button, Select, Tag, Tooltip } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import type { SelectedFeaturedItemProps } from "@/features/admin/types/featuredProducts.types";

function getGridSlotLabel(index: number): string {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  return `Hàng ${row} · Ô ${col}`;
}

export function SelectedFeaturedItem({
  product,
  index,
  total,
  canEdit,
  onMoveUp,
  onMoveDown,
  onMoveToPosition,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
}: SelectedFeaturedItemProps) {
  const positionOptions = Array.from({ length: total }, (_, idx) => ({
    label: `#${idx + 1}`,
    value: idx + 1,
  }));

  return (
    <div
      draggable={canEdit}
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={() => onDrop(index)}
      className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:border-amber-500/60 transition-colors"
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {canEdit && (
          <Tooltip title="Kéo thả để sắp xếp thứ tự">
            <span className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-700 px-1">
              <HolderOutlined />
            </span>
          </Tooltip>
        )}

        <Select
          size="small"
          value={index + 1}
          disabled={!canEdit}
          options={positionOptions}
          onChange={(val) => onMoveToPosition(index, val)}
          className="w-16 shrink-0 font-semibold"
          aria-label={`Vị trí sản phẩm ${product.nameUs}`}
        />

        <Image
          src={product.image || "/img/WhyDHT.png"}
          alt={product.nameUs}
          width={56}
          height={44}
          unoptimized
          className="w-14 h-11 rounded object-contain bg-[#F6F2EA] border border-gray-100 shrink-0"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-sm text-navy-deep truncate">
              {product.nameUs}
            </span>
            <Tag color={index < 6 ? "green" : "default"} className="m-0 text-[11px]">
              {getGridSlotLabel(index)}
            </Tag>
            {product.isStandaloneTable && (
              <Tag color="warning" className="m-0 text-[11px]">
                Bàn rời
              </Tag>
            )}
            {product.isLegacyExcluded && (
              <Tag color="error" className="m-0 text-[11px]">
                Logo cũ
              </Tag>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-0.5 truncate">
            <span className="font-mono text-gray-600">{product.code}</span>
            <span className="mx-1.5">·</span>
            <span>{product.categoryUs}</span>
          </div>
        </div>
      </div>

      {canEdit && (
        <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
          <Tooltip title="Đưa lên">
            <Button
              type="text"
              size="small"
              icon={<ArrowUpOutlined />}
              disabled={index === 0}
              onClick={() => onMoveUp(index)}
            />
          </Tooltip>
          <Tooltip title="Đưa xuống">
            <Button
              type="text"
              size="small"
              icon={<ArrowDownOutlined />}
              disabled={index === total - 1}
              onClick={() => onMoveDown(index)}
            />
          </Tooltip>
          <Tooltip title="Bỏ khỏi Trang chủ">
            <Button
              type="text"
              size="small"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(product.slug)}
            />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
