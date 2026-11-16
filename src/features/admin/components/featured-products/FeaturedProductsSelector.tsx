import React from "react";
import Link from "next/link";
import { Alert, Button, Card, Checkbox, Empty, Input, Select, Spin } from "antd";
import {
  AppstoreOutlined,
  EyeOutlined,
  SaveOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { useFeaturedProductsManager } from "@/features/admin/hooks/useFeaturedProductsManager";
import type { FeaturedProductsSelectorProps } from "@/features/admin/types/featuredProducts.types";
import { CandidateFeaturedItem } from "./CandidateFeaturedItem";
import { SelectedFeaturedItem } from "./SelectedFeaturedItem";

export default function FeaturedProductsSelector({
  canEdit = true,
}: FeaturedProductsSelectorProps) {
  const {
    isLoading,
    isSaving,
    hasChanges,
    selectedItems,
    filteredCandidates,
    positionBySlug,
    searchText,
    setSearchText,
    collectionFilter,
    setCollectionFilter,
    hideStandaloneTables,
    setHideStandaloneTables,
    setDraggedIndex,
    handleAdd,
    handleRemove,
    handleMoveUp,
    handleMoveDown,
    handleMoveToPosition,
    handleDrop,
    handleReset,
    handleSave,
  } = useFeaturedProductsManager();

  const renderCountAlert = () => {
    if (selectedItems.length === 0) {
      return (
        <Alert
          type="info"
          showIcon
          message="Chưa chọn bộ sản phẩm thủ công"
          description="Website đang tự động hiển thị 6 bộ mặc định (loại trừ bàn rời và ảnh cũ). Hãy chọn bên trái để cố định đúng bộ sản phẩm và thứ tự ưu tiên trên Trang chủ."
        />
      );
    }

    if (selectedItems.length !== 6) {
      return (
        <Alert
          type="warning"
          showIcon
          message={`Đang chọn ${selectedItems.length} bộ sản phẩm`}
          description="Khuyến nghị chọn đúng 6 bộ để hiển thị cân đối 3 cột × 2 hàng trên desktop."
        />
      );
    }

    return (
      <Alert
        type="success"
        showIcon
        message="Đã đủ 6 bộ sản phẩm chuẩn (3 cột × 2 hàng)"
        description="Kéo thả, bấm mũi tên ↑ ↓ hoặc chọn số thứ tự để ưu tiên vị trí hiển thị từ trái sang phải, trên xuống dưới."
      />
    );
  };

  return (
    <Card
      className="shadow-sm rounded-xl border-gray-100"
      title={
        <div className="flex items-center gap-2 py-1">
          <AppstoreOutlined className="text-orange-500" />
          <span>Selected Furniture Collections — Chọn &amp; Sắp xếp Trang chủ</span>
        </div>
      }
      extra={
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/" target="_blank">
            <Button icon={<EyeOutlined />} size="middle">
              Xem Trang chủ
            </Button>
          </Link>
          {canEdit && hasChanges && (
            <Button icon={<UndoOutlined />} onClick={handleReset} disabled={isSaving}>
              Hoàn tác
            </Button>
          )}
          {canEdit && (
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={isSaving}
              disabled={!hasChanges}
              onClick={handleSave}
              className="bg-orange-600 hover:bg-orange-500 border-none font-medium"
            >
              Lưu thứ tự hiển thị
            </Button>
          )}
        </div>
      }
    >
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Spin size="large" />
        </div>
      ) : (
        <div className="space-y-4">
          {renderCountAlert()}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left column: Pick from catalogue */}
            <div className="lg:col-span-5 bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="m-0 font-semibold text-sm text-navy-deep">
                  Danh mục sản phẩm ({filteredCandidates.length})
                </h4>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  allowClear
                  prefix={<SearchOutlined className="text-gray-400" />}
                  placeholder="Tìm tên, mã, nhóm..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="flex-1"
                />
                <Select
                  value={collectionFilter}
                  onChange={setCollectionFilter}
                  className="w-full sm:w-32"
                  options={[
                    { label: "Tất cả", value: "all" },
                    { label: "Outdoor", value: "Outdoor" },
                    { label: "Indoor", value: "Indoor" },
                  ]}
                />
              </div>

              <Checkbox
                checked={hideStandaloneTables}
                onChange={(e) => setHideStandaloneTables(e.target.checked)}
                className="text-xs text-gray-600"
              >
                Ẩn bàn rời đơn lẻ (ưu tiên hiển thị các bộ sưu tập trọn bộ)
              </Checkbox>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredCandidates.length === 0 ? (
                  <Empty description="Không tìm thấy sản phẩm phù hợp" />
                ) : (
                  filteredCandidates.map((product) => (
                    <CandidateFeaturedItem
                      key={product.slug}
                      product={product}
                      selectedIndex={positionBySlug.get(product.slug) ?? -1}
                      canEdit={canEdit}
                      onAdd={handleAdd}
                      onRemove={handleRemove}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right column: Ordered showcase list */}
            <div className="lg:col-span-7 bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="m-0 font-semibold text-sm text-navy-deep">
                  Thứ tự hiển thị trên Trang chủ ({selectedItems.length}/6 khuyến nghị)
                </h4>
                {hasChanges && (
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    Chưa lưu thay đổi
                  </span>
                )}
              </div>

              <div className="space-y-2.5 max-h-[540px] overflow-y-auto pr-1">
                {selectedItems.length === 0 ? (
                  <div className="py-12 bg-white rounded-lg border border-dashed border-gray-300">
                    <Empty description="Chưa có sản phẩm nào được chọn. Bấm 'Chọn' ở danh sách bên trái để thêm." />
                  </div>
                ) : (
                  selectedItems.map((product, index) => (
                    <SelectedFeaturedItem
                      key={product.slug}
                      product={product}
                      index={index}
                      total={selectedItems.length}
                      canEdit={canEdit}
                      onMoveUp={handleMoveUp}
                      onMoveDown={handleMoveDown}
                      onMoveToPosition={handleMoveToPosition}
                      onRemove={handleRemove}
                      onDragStart={setDraggedIndex}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

