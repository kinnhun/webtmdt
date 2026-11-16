import { useState } from "react";
import { Anchor, Building2 } from "lucide-react";
import mapData from "../../../public/data/vietnam-map.json";
import { HOANG_SA_ISLANDS, TRUONG_SA_ISLANDS } from "@/data/manufacturingNetwork";
import type { VietnamExportVolumeMapProps } from "@/types/manufacturing";

type HoverDetail = {
  title: string;
  subtitle: string;
};

/**
 * Interactive Vietnam Export Volume & Port Gateway map for Facilities 01-10.
 * Explicitly excludes upstream panel plant Facility 11 from finished export container volume.
 */
export default function VietnamExportVolumeMap({
  selectedFilter,
  onSelectFilter,
  groups,
  ports,
  isVi = false,
}: VietnamExportVolumeMapProps) {
  const [hoveredDetail, setHoveredDetail] = useState<HoverDetail | null>(null);

  const selectedGroup = groups.find(
    (g) => g.id === selectedFilter || g.facilityIds.includes(selectedFilter)
  );
  const selectedPort = ports.find((p) => p.id === selectedFilter);

  const activeProvinceSet = new Set(
    groups
      .filter(
        (g) =>
          selectedFilter === "all" ||
          selectedFilter === g.id ||
          selectedFilter === g.portId ||
          g.facilityIds.includes(selectedFilter)
      )
      .flatMap((g) => g.provinceNames)
  );

  return (
    <div className="bg-[#F8F6F0] rounded-2xl p-4 sm:p-5 border border-black/10 flex flex-col items-center select-none shadow-xs">
      <div className="w-full flex items-center justify-between text-xs text-gray-700 pb-2.5 mb-2.5 border-b border-gray-200/80">
        <span className="font-bold text-[#173C2C] flex items-center gap-1.5">
          <Building2 size={14} className="text-[#9A5B2A]" />
          {isVi ? "Cơ sở 01–10 (KCN)" : "Facilities 01–10 (IPs)"}
        </span>
        <span className="font-bold text-[#173C2C] flex items-center gap-1.5">
          <Anchor size={14} className="text-[#9A5B2A]" />
          {isVi ? "3 Cửa ngõ Cảng Biển" : "3 Maritime Gateways"}
        </span>
      </div>

      {/* Live Hover / Active Selection Bar */}
      <div className="w-full mb-2.5 px-3 py-1.5 rounded-lg bg-white/95 border border-black/8 text-[11.5px] text-[#173C2C] flex items-center min-h-[32px]">
        {hoveredDetail ? (
          <div className="truncate">
            <span className="font-bold">{hoveredDetail.title}: </span>
            <span className="text-[#1F2723]/85">{hoveredDetail.subtitle}</span>
          </div>
        ) : selectedGroup ? (
          <div className="truncate">
            <span className="font-bold text-[#9A5B2A]">{selectedGroup.label}: </span>
            <span className="text-[#1F2723]/85">
              {selectedGroup.industrialPark} • {selectedGroup.volume}
            </span>
          </div>
        ) : selectedPort ? (
          <div className="truncate">
            <span className="font-bold text-[#9A5B2A]">{selectedPort.name}: </span>
            <span className="text-[#1F2723]/85">
              {selectedPort.facilitiesServed} • {selectedPort.volume}
            </span>
          </div>
        ) : (
          <span className="text-[#1F2723]/80 truncate">
            {isVi
              ? "500–600 cont/tháng (Cơ sở 01–10 · Trừ Cơ sở 11 KCN Cẩm Khê)"
              : "500–600 containers/mo (F01–10 · Excl. F11 Cam Khe panel plant)"}
          </span>
        )}
      </div>

      <div className="relative w-full aspect-[540/655] flex items-center justify-center">
        <svg
          viewBox="25 75 530 650"
          className="w-full h-full drop-shadow-xs"
          aria-label={
            isVi
              ? "Bản đồ Sản lượng Xuất khẩu Nội thất và Cảng biển Việt Nam"
              : "Vietnam Furniture Export Volume and Port Gateways Map"
          }
        >
          <defs>
            <linearGradient id="exportOceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F7F2" />
              <stop offset="100%" stopColor="#F1EDE3" />
            </linearGradient>
          </defs>

          <rect x="25" y="75" width="530" height="650" fill="url(#exportOceanGrad)" rx="12" />

          {/* Latitude & Longitude Grid */}
          <g stroke="#E3DDD0" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.7">
            <line x1="25" y1="170" x2="555" y2="170" />
            <line x1="25" y1="350" x2="555" y2="350" />
            <line x1="25" y1="530" x2="555" y2="530" />
            <line x1="150" y1="75" x2="150" y2="725" />
            <line x1="300" y1="75" x2="300" y2="725" />
            <line x1="450" y1="75" x2="450" y2="725" />
          </g>

          {/* East Sea Watermark */}
          <g opacity="0.45">
            <text
              x="365"
              y="445"
              fontSize="22"
              fontWeight="bold"
              letterSpacing="8"
              fill="#8C9E96"
              fontFamily="serif"
              textAnchor="middle"
              transform="rotate(-28 365 445)"
            >
              {isVi ? "BIỂN ĐÔNG" : "EAST SEA"}
            </text>
            <text
              x="370"
              y="468"
              fontSize="10"
              fontWeight="semibold"
              letterSpacing="3"
              fill="#A2B0A9"
              fontFamily="sans-serif"
              textAnchor="middle"
              transform="rotate(-28 370 468)"
            >
              {isVi ? "(VIỆT NAM)" : "(VIETNAM MARITIME CORRIDOR)"}
            </text>
          </g>

          {/* Mainland Provinces */}
          <g>
            {mapData.provinces.map((prov: { id: string; name: string; path: string }) => {
              const isHighlighted = activeProvinceSet.has(prov.name);
              return (
                <path
                  key={prov.id}
                  d={prov.path}
                  fill={isHighlighted ? "#0F3826" : "#DDD7C8"}
                  stroke={isHighlighted ? "#B97846" : "#C7BFAD"}
                  strokeWidth={isHighlighted ? "1.3" : "0.5"}
                  className="transition-colors duration-300"
                />
              );
            })}
          </g>

          {/* Hoang Sa Archipelago */}
          <g>
            <rect
              x="345"
              y="325"
              width="85"
              height="75"
              fill="#0F3826"
              fillOpacity="0.04"
              stroke="#B97846"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              rx="4"
            />
            {mapData.hoangSa?.path && (
              <path d={mapData.hoangSa.path} fill="#173C2C" stroke="#B97846" strokeWidth="1.5" />
            )}
            {HOANG_SA_ISLANDS.map((isl) => (
              <circle key={isl.nameEn} cx={isl.x} cy={isl.y} r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
            ))}
            <text x="388" y="338" fontSize="8.5" fontWeight="bold" fill="#173C2C" textAnchor="middle">
              {isVi ? "QUẦN ĐẢO HOÀNG SA" : "HOANG SA ARCHIPELAGO"}
            </text>
            <text x="388" y="348" fontSize="7" fontWeight="medium" fill="#6B7280" textAnchor="middle">
              {isVi ? "(TP. Đà Nẵng, Việt Nam)" : "(Da Nang, Vietnam)"}
            </text>
          </g>

          {/* Truong Sa Archipelago */}
          <g>
            <rect
              x="375"
              y="535"
              width="145"
              height="165"
              fill="#0F3826"
              fillOpacity="0.04"
              stroke="#B97846"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              rx="4"
            />
            {mapData.truongSa?.path && (
              <path d={mapData.truongSa.path} fill="#173C2C" stroke="#B97846" strokeWidth="1.5" />
            )}
            {TRUONG_SA_ISLANDS.map((isl) => (
              <circle key={isl.nameEn} cx={isl.x} cy={isl.y} r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
            ))}
            <text x="447" y="552" fontSize="9.5" fontWeight="bold" fill="#173C2C" textAnchor="middle">
              {isVi ? "QUẦN ĐẢO TRƯỜNG SA" : "TRUONG SA ARCHIPELAGO"}
            </text>
            <text x="447" y="563" fontSize="7.5" fontWeight="medium" fill="#6B7280" textAnchor="middle">
              {isVi ? "(Tỉnh Khánh Hòa, Việt Nam)" : "(Khanh Hoa, Vietnam)"}
            </text>
          </g>

          {/* Coastal Islands */}
          <g>
            <g transform="translate(96, 590)">
              <circle r="4" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
              <text x="7" y="4" fontSize="8" fontWeight="bold" fill="#173C2C">
                {isVi ? "Đảo Phú Quốc" : "Phu Quoc Island"}
              </text>
            </g>
            <g transform="translate(193, 648)">
              <circle r="3" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
              <text x="6" y="3" fontSize="8" fontWeight="bold" fill="#173C2C">
                {isVi ? "Côn Đảo" : "Con Dao"}
              </text>
            </g>
          </g>

          {/* Connectors & Facility Industrial Park Nodes (F01-10) */}
          {groups.map((group) => {
            const isActive =
              selectedFilter === "all" ||
              selectedFilter === group.id ||
              selectedFilter === group.portId ||
              group.facilityIds.includes(selectedFilter);
            const pillText = `${group.facilitiesLabel} · ${group.industrialPark}`;
            const boxWidth = Math.max(138, pillText.length * 4.55 + 14);
            const placeRight = group.id === "quynhon";
            const pillX = placeRight ? 12 : -12;
            const pillY = group.id === "phutho" ? -26 : group.id === "hungyen" ? 16 : -2;

            return (
              <g key={group.id}>
                <line
                  x1={group.pin.x}
                  y1={group.pin.y}
                  x2={group.portPin.x}
                  y2={group.portPin.y}
                  stroke={isActive ? "#B97846" : "#9CA3AF"}
                  strokeWidth={isActive ? "2.2" : "1.1"}
                  strokeDasharray="3.5 2.5"
                />
                <g
                  transform={`translate(${group.pin.x}, ${group.pin.y})`}
                  className="cursor-pointer"
                  onClick={() => onSelectFilter(selectedFilter === group.id ? "all" : group.id)}
                  onMouseEnter={() =>
                    setHoveredDetail({
                      title: `${group.facilitiesLabel} (${group.industrialPark})`,
                      subtitle: `${group.volume} -> ${group.portName}`,
                    })
                  }
                  onMouseLeave={() => setHoveredDetail(null)}
                >
                  {isActive && selectedFilter !== "all" && (
                    <circle r="15" fill="#B97846" opacity="0.22" />
                  )}
                  <circle
                    r={isActive ? 7.5 : 5.5}
                    fill={isActive ? "#173C2C" : "#6B7280"}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <g transform={`translate(${pillX}, ${pillY})`}>
                    <rect
                      x={placeRight ? 0 : -boxWidth}
                      y="-10"
                      width={boxWidth}
                      height="19"
                      rx="4"
                      fill={isActive ? "#FFFFFF" : "#F3F4F6"}
                      fillOpacity="0.94"
                      stroke={isActive ? "#173C2C" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                    <text
                      x={placeRight ? boxWidth / 2 : -boxWidth / 2}
                      y="2.5"
                      textAnchor="middle"
                      fontSize="7.8"
                      fontWeight="bold"
                      fill="#173C2C"
                    >
                      {pillText}
                    </text>
                  </g>
                </g>
              </g>
            );
          })}

          {/* Export Port Gateways */}
          {ports.map((port) => {
            const isActive =
              selectedFilter === "all" ||
              selectedFilter === port.id ||
              groups.some(
                (g) =>
                  (g.id === selectedFilter || g.facilityIds.includes(selectedFilter)) &&
                  g.portId === port.id
              );
            return (
              <g
                key={port.id}
                transform={`translate(${port.x}, ${port.y})`}
                className="cursor-pointer"
                onClick={() => onSelectFilter(selectedFilter === port.id ? "all" : port.id)}
                onMouseEnter={() =>
                  setHoveredDetail({
                    title: port.name,
                    subtitle: `${port.facilitiesServed} • ${port.volume}`,
                  })
                }
                onMouseLeave={() => setHoveredDetail(null)}
              >
                <rect
                  x="-6"
                  y="-6"
                  width="12"
                  height="12"
                  rx="3"
                  fill={isActive ? "#A45E2F" : "#9CA3AF"}
                  stroke="#FFFFFF"
                  strokeWidth="1.6"
                />
                <text
                  x="11"
                  y={port.id === "quynhon_port" ? 15 : 3.5}
                  textAnchor="start"
                  fill="#0E241B"
                  fontSize="8.5"
                  fontWeight="800"
                >
                  {port.name}
                </text>
              </g>
            );
          })}

          {/* Compass Rose */}
          <g transform="translate(500, 120)" opacity="0.75">
            <circle r="18" fill="#FFFFFF" stroke="#B97846" strokeWidth="1" fillOpacity="0.85" />
            <polygon points="0,-14 4,-2 0,0" fill="#B97846" />
            <polygon points="0,-14 -4,-2 0,0" fill="#8B4513" />
            <polygon points="0,14 4,2 0,0" fill="#9CA3AF" />
            <polygon points="0,14 -4,2 0,0" fill="#4B5563" />
            <polygon points="14,0 2,4 0,0" fill="#9CA3AF" />
            <polygon points="-14,0 -2,4 0,0" fill="#9CA3AF" />
            <text x="0" y="-17" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B97846">
              N
            </text>
          </g>
        </svg>
      </div>

      <p className="text-[11px] text-gray-600 text-center mt-2.5 leading-snug">
        {isVi
          ? "Nhấp vào cụm KCN (Cơ sở 01–10) hoặc cửa ngõ cảng trên bản đồ hoặc thẻ thông tin để lọc sản lượng."
          : "Click any industrial park group (Facilities 01–10) or export gateway on the map or cards to filter volume."}
      </p>
    </div>
  );
}

