import React, { useState } from "react";
import mapData from "../../../public/data/vietnam-map.json";
import { HOANG_SA_ISLANDS, TRUONG_SA_ISLANDS } from "@/data/manufacturingNetwork";
import type { ClusterInfo, VietnamProductionMapProps } from "@/types/manufacturing";

export type { ClusterInfo };

type HoveredMapTarget = {
  title: string;
  subtitle: string;
};

export default function VietnamProductionMap({
  activeCluster,
  onSelectCluster,
  clusters,
  isVi = false,
}: VietnamProductionMapProps) {
  const [hoveredTarget, setHoveredTarget] = useState<HoveredMapTarget | null>(null);

  const activeClusterData = clusters.find((c) => c.id === activeCluster);
  const activeProvinces = activeClusterData?.provinceNames || [];

  const ports = [
    {
      id: "haiphong",
      label: isVi ? "Cảng Hải Phòng" : "Hai Phong Port",
      x: 195.5,
      y: 187.9,
      align: "right" as const,
    },
    {
      id: "quynhon",
      label: isVi ? "Cảng Quy Nhơn" : "Quy Nhon Port",
      x: 288.9,
      y: 459.0,
      align: "right" as const,
    },
    {
      id: "catlai",
      label: isVi ? "Cảng Cát Lái (TP.HCM)" : "Cat Lai Port (HCMC)",
      x: 199.2,
      y: 571.3,
      align: "left" as const,
    },
    {
      id: "caimep",
      label: isVi ? "Cảng Cái Mép - Thị Vải" : "Cai Mep Deep-Water Port",
      x: 208.3,
      y: 580.6,
      align: "left" as const,
    },
  ];

  return (
    <div className="relative w-full flex flex-col items-center bg-[#F8F6F0] rounded-2xl border border-black/10 p-3 sm:p-4 shadow-sm overflow-hidden select-none">
      {/* MAP HEADER */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2 border-b border-gray-200/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#173C2C]" />
          <span className="font-bold text-[#173C2C] uppercase tracking-wider text-[11px]">
            {isVi ? "Bản Đồ Mạng Lưới Sản Xuất DHT Việt Nam" : "DHT Vietnam Manufacturing Network Map"}
          </span>
        </div>
        <div className="text-[11px] font-semibold text-[#9A5B2A]">
          {isVi ? "11 Cơ Sở • 4 Cụm Chiến Lược" : "11 Facilities • 4 Strategic Clusters"}
        </div>
      </div>

      {/* LIVE HOVER STATUS BAR (Always Clean Single-Language) */}
      <div className="w-full mb-2 px-3 py-1.5 rounded-lg bg-white/90 border border-black/8 text-[11.5px] text-[#173C2C] flex items-center justify-between min-h-[30px]">
        {hoveredTarget ? (
          <div className="flex flex-wrap items-center gap-1.5 truncate">
            <span className="font-bold">{hoveredTarget.title}:</span>
            <span className="text-[#1F2723]/85">{hoveredTarget.subtitle}</span>
          </div>
        ) : activeClusterData ? (
          <div className="flex flex-wrap items-center gap-1.5 truncate">
            <span className="font-bold text-[#9A5B2A]">{activeClusterData.name}:</span>
            <span className="text-[#1F2723]/85">
              {activeClusterData.facilitiesCount}{" "}
              {isVi ? "cơ sở" : activeClusterData.facilitiesCount === 1 ? "facility" : "facilities"} •{" "}
              {activeClusterData.totalArea} • {activeClusterData.ports}
            </span>
          </div>
        ) : (
          <span className="text-[#1F2723]/75">
            {isVi
              ? "Chọn hoặc di chuột lên bản đồ để xem chi tiết từng cụm."
              : "Click a cluster pin or hover across provinces to inspect details."}
          </span>
        )}
      </div>

      {/* SVG MAP CANVAS — Enlarged ViewBox to Fill Column */}
      <div className="relative w-full aspect-[540/655] flex items-center justify-center">
        <svg
          viewBox="25 75 530 650"
          className="w-full h-full drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F7F2" />
              <stop offset="100%" stopColor="#F1EDE3" />
            </linearGradient>
          </defs>

          <rect x="25" y="75" width="530" height="650" fill="url(#oceanGrad)" rx="12" />

          {/* Subtle Latitude & Longitude Grid */}
          <g stroke="#E3DDD0" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.7">
            <line x1="25" y1="170" x2="555" y2="170" />
            <line x1="25" y1="350" x2="555" y2="350" />
            <line x1="25" y1="530" x2="555" y2="530" />
            <line x1="150" y1="75" x2="150" y2="725" />
            <line x1="300" y1="75" x2="300" y2="725" />
            <line x1="450" y1="75" x2="450" y2="725" />
          </g>

          {/* MARITIME REGION LABEL */}
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

          {/* VIETNAM 63 PROVINCES */}
          <g id="mainland-provinces">
            {mapData.provinces.map((prov) => {
              const isHighlight = activeProvinces.includes(prov.name);
              return (
                <path
                  key={prov.id}
                  d={prov.path}
                  fill={isHighlight ? "#0F3826" : "#DDD7C8"}
                  stroke={isHighlight ? "#B97846" : "#C7BFAD"}
                  strokeWidth={isHighlight ? "1.5" : "0.5"}
                  className="transition-colors duration-300 cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredTarget({
                      title: prov.name,
                      subtitle: isHighlight
                        ? `${isVi ? "Thuộc cụm" : "Cluster"}: ${activeClusterData?.name}`
                        : isVi
                          ? "Tỉnh / Thành phố Việt Nam"
                          : "Province / Municipality, Vietnam",
                    });
                  }}
                  onMouseLeave={() => setHoveredTarget(null)}
                />
              );
            })}
          </g>

          {/* HOANG SA ARCHIPELAGO (PARACEL ISLANDS) */}
          <g id="hoang-sa-territory">
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
              <g key={isl.nameEn} transform={`translate(${isl.x}, ${isl.y})`}>
                <circle r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
              </g>
            ))}
            <text x="388" y="338" fontSize="8.5" fontWeight="bold" fill="#173C2C" textAnchor="middle">
              {isVi ? "QUẦN ĐẢO HOÀNG SA" : "HOANG SA ARCHIPELAGO"}
            </text>
            <text x="388" y="348" fontSize="7" fontWeight="medium" fill="#6B7280" textAnchor="middle">
              {isVi ? "(TP. Đà Nẵng, Việt Nam)" : "(Da Nang, Vietnam)"}
            </text>
            <text x="388" y="392" fontSize="7.5" fontStyle="italic" fill="#B97846" textAnchor="middle">
              Paracel Islands
            </text>
          </g>

          {/* TRUONG SA ARCHIPELAGO (SPRATLY ISLANDS) */}
          <g id="truong-sa-territory">
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
              <g key={isl.nameEn} transform={`translate(${isl.x}, ${isl.y})`}>
                <circle r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle r="4.5" fill="none" stroke="#B97846" strokeWidth="0.5" opacity="0.6" />
              </g>
            ))}
            <text x="447" y="552" fontSize="9.5" fontWeight="bold" fill="#173C2C" textAnchor="middle">
              {isVi ? "QUẦN ĐẢO TRƯỜNG SA" : "TRUONG SA ARCHIPELAGO"}
            </text>
            <text x="447" y="563" fontSize="7.5" fontWeight="medium" fill="#6B7280" textAnchor="middle">
              {isVi ? "(Tỉnh Khánh Hòa, Việt Nam)" : "(Khanh Hoa, Vietnam)"}
            </text>
            <text x="447" y="690" fontSize="8" fontStyle="italic" fill="#B97846" textAnchor="middle">
              Spratly Islands
            </text>
          </g>

          {/* COASTAL ISLANDS */}
          <g id="coastal-islands">
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

          {/* EXPORT PORTS */}
          <g id="export-ports">
            {ports.map((p) => (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                <circle r="4.5" fill="#0D5C3A" stroke="#FFFFFF" strokeWidth="1.5" />
                <text
                  x={p.align === "right" ? 10 : -8}
                  y="3.5"
                  textAnchor={p.align === "right" ? "start" : "end"}
                  fontSize="8"
                  fontWeight="bold"
                  fill="#0D5C3A"
                  className="select-none pointer-events-none"
                >
                  {p.label}
                </text>
              </g>
            ))}
          </g>

          {/* 4 MANUFACTURING CLUSTERS INTERACTIVE PINS */}
          <g id="cluster-pins">
            {clusters.map((c) => {
              const isSelected = activeCluster === c.id;
              const pillText = `${c.name} (${c.totalArea})`;
              const boxWidth = Math.max(122, pillText.length * 4.9 + 16);
              const placeLeft = c.id === "quynhon" || c.pin.x > 180;

              return (
                <g
                  key={c.id}
                  transform={`translate(${c.pin.x}, ${c.pin.y})`}
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => onSelectCluster(c.id)}
                  onMouseEnter={() => {
                    setHoveredTarget({
                      title: c.name,
                      subtitle: `${c.facilitiesCount} ${isVi ? "Cơ sở" : c.facilitiesCount === 1 ? "Facility" : "Facilities"
                        } • ${c.totalArea} • ${isVi ? "Cảng" : "Port"}: ${c.ports}`,
                    });
                  }}
                  onMouseLeave={() => setHoveredTarget(null)}
                >
                  {isSelected && (
                    <>
                      <circle r="22" fill="#B97846" opacity="0.15" />
                      <circle r="15" fill="#B97846" opacity="0.3" className="animate-ping" />
                    </>
                  )}

                  <circle
                    r={isSelected ? "11" : "8"}
                    fill={isSelected ? "#B97846" : "#173C2C"}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="shadow-md transition-all duration-300"
                  />
                  <circle r={isSelected ? "4.5" : "3"} fill="#FFFFFF" />

                  <g transform={`translate(${placeLeft ? -12 : 14}, -2)`}>
                    <rect
                      x={placeLeft ? -boxWidth : 0}
                      y="-11"
                      width={boxWidth}
                      height="20"
                      rx="4"
                      fill={isSelected ? "#173C2C" : "#FFFFFF"}
                      fillOpacity={isSelected ? "0.95" : "0.92"}
                      stroke={isSelected ? "#B97846" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                    <text
                      x={placeLeft ? -boxWidth / 2 : boxWidth / 2}
                      y="2"
                      textAnchor="middle"
                      fontSize="8.2"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#173C2C"}
                    >
                      {pillText}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* COMPASS ROSE */}
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

      {/* MAP FOOTER & LEGEND */}
      <div className="w-full mt-2.5 pt-2.5 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173C2C]" />{" "}
            {isVi ? "Cụm sản xuất" : "Manufacturing Cluster"}
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C3A]" />{" "}
            {isVi ? "Cảng xuất khẩu" : "Export Port"}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#9A5B2A]">
            <span className="w-3 h-2 border border-dashed border-[#9A5B2A] rounded-xs" />{" "}
            {isVi ? "Hoàng Sa & Trường Sa" : "Hoang Sa & Truong Sa"}
          </span>
        </div>
        <div className="italic text-gray-600 font-medium">
          {isVi ? "Khẳng định chủ quyền biển đảo Việt Nam" : "Vietnam sovereignty & network footprint"}
        </div>
      </div>
    </div>
  );
}
