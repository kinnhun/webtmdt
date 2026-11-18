import React, { useState } from "react";
import mapData from "../../../public/data/vietnam-map.json";

export interface ClusterInfo {
  id: string;
  name: string;
  region: string;
  totalArea: string;
  furnitureArea: string;
  panelArea?: string;
  facilitiesCount: number;
  focus: string;
  ports: string;
  pin: { x: number; y: number };
  provinceNames: string[];
}

interface VietnamProductionMapProps {
  activeCluster: string;
  onSelectCluster: (clusterId: string) => void;
  clusters: ClusterInfo[];
}

export default function VietnamProductionMap({
  activeCluster,
  onSelectCluster,
  clusters,
}: VietnamProductionMapProps) {
  const [hoveredTarget, setHoveredTarget] = useState<{
    title: string;
    subtitle?: string;
    x: number;
    y: number;
  } | null>(null);

  // Active cluster province highlight mapping
  const activeClusterData = clusters.find((c) => c.id === activeCluster);
  const activeProvinces = activeClusterData?.provinceNames || [];

  // Key islands for Hoang Sa (Paracel Islands) - TP. Đà Nẵng
  const hoangSaIslands = [
    { name: "Đảo Hoàng Sa", x: 375.0, y: 354.7 },
    { name: "Đảo Phú Lâm", x: 401.6, y: 343.2 },
    { name: "Đảo Tri Tôn", x: 360.4, y: 383.2 },
    { name: "Đảo Linh Côn", x: 416.2, y: 349.7 },
    { name: "Đảo Quang Hòa", x: 378.6, y: 357.7 },
  ];

  // Key islands for Truong Sa (Spratly Islands) - Tỉnh Khánh Hòa
  const truongSaIslands = [
    { name: "Đảo Song Tử Tây", x: 474.5, y: 546.4 },
    { name: "Đảo Sơn Ca", x: 479.6, y: 585.8 },
    { name: "Đảo Nam Yết", x: 475.6, y: 592.9 },
    { name: "Đảo Sinh Tồn", x: 474.2, y: 604.0 },
    { name: "Đảo Trường Sa Lớn", x: 386.6, y: 649.4 },
    { name: "Đảo Phan Vinh", x: 428.6, y: 637.6 },
    { name: "Đảo Thuyền Chài", x: 437.0, y: 667.1 },
    { name: "Đảo An Bang", x: 422.4, y: 677.4 },
    { name: "Đảo Tiên Nữ", x: 486.2, y: 642.0 },
  ];

  // Export maritime ports coordinates
  const ports = [
    { id: "haiphong", name: "Cảng Hải Phòng (Hai Phong Port)", x: 195.5, y: 187.9, align: "right" },
    { id: "quynhon", name: "Cảng Quy Nhơn (Quy Nhon Port)", x: 288.9, y: 459.0, align: "right" },
    { id: "catlai", name: "Cảng Cát Lái (Cat Lai, HCMC)", x: 199.2, y: 571.3, align: "left" },
    { id: "caimep", name: "Cảng Cái Mép - Thị Vải (Deep-Water)", x: 208.3, y: 580.6, align: "left" },
  ];

  return (
    <div className="relative w-full flex flex-col items-center bg-[#F8F6F0] rounded-2xl border border-black/10 p-4 shadow-sm overflow-hidden select-none">
      {/* MAP HEADER */}
      <div className="w-full flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-gray-200/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#173C2C]" />
          <span className="font-bold text-[#173C2C] uppercase tracking-wider text-[11px]">
            Bản Đồ Năng Lực Sản Xuất DHT Việt Nam
          </span>
        </div>
        <div className="text-[11px] font-semibold text-[#B97846]">
          11 Cơ Sở • 4 Cụm • Hoàng Sa & Trường Sa
        </div>
      </div>

      {/* SVG MAP CANVAS */}
      <div className="relative w-full max-w-[560px] aspect-[600/740] flex items-center justify-center">
        <svg
          viewBox="0 65 600 705"
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Ocean Pattern */}
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9F7F2" />
              <stop offset="100%" stopColor="#F1EDE3" />
            </linearGradient>

            {/* Active Cluster Radar Glow */}
            <radialGradient id="clusterGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B97846" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#B97846" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Ocean */}
          <rect x="0" y="65" width="600" height="705" fill="url(#oceanGrad)" rx="12" />

          {/* Subtle Latitude & Longitude Navigation Grid */}
          <g stroke="#E3DDD0" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.7">
            <line x1="0" y1="170" x2="600" y2="170" />
            <line x1="0" y1="350" x2="600" y2="350" />
            <line x1="0" y1="530" x2="600" y2="530" />
            <line x1="0" y1="710" x2="600" y2="710" />
            <line x1="150" y1="65" x2="150" y2="770" />
            <line x1="300" y1="65" x2="300" y2="770" />
            <line x1="450" y1="65" x2="450" y2="770" />
          </g>

          {/* EAST SEA / BIỂN ĐÔNG TYPOGRAPHY */}
          <g opacity="0.45">
            <text
              x="365"
              y="440"
              fontSize="24"
              fontWeight="bold"
              letterSpacing="9"
              fill="#8C9E96"
              fontFamily="serif"
              textAnchor="middle"
              transform="rotate(-28 365 440)"
            >
              BIỂN ĐÔNG
            </text>
            <text
              x="370"
              y="465"
              fontSize="12"
              fontWeight="semibold"
              letterSpacing="4"
              fill="#A2B0A9"
              fontFamily="sans-serif"
              textAnchor="middle"
              transform="rotate(-28 370 465)"
            >
              (SOUTH CHINA SEA)
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
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredTarget({
                      title: prov.name,
                      subtitle: isHighlight ? `Thuộc cụm: ${activeClusterData?.name}` : "Tỉnh / Thành phố Việt Nam",
                      x: rect.left,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredTarget(null)}
                />
              );
            })}
          </g>

          {/* ======================================================== */}
          {/* QUẦN ĐẢO HOÀNG SA (PARACEL ISLANDS) - OFFICIAL TERRITORY */}
          {/* ======================================================== */}
          <g id="hoang-sa-territory">
            {/* Territorial Demarcation Box */}
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

            {/* Official GeoJSON Polygon of Hoang Sa */}
            {mapData.hoangSa?.path && (
              <path
                d={mapData.hoangSa.path}
                fill="#173C2C"
                stroke="#B97846"
                strokeWidth="1.5"
              />
            )}

            {/* Prominent Island Atolls in Hoang Sa */}
            {hoangSaIslands.map((isl) => (
              <g key={isl.name} transform={`translate(${isl.x}, ${isl.y})`}>
                <circle r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
              </g>
            ))}

            {/* Official Label */}
            <text
              x="388"
              y="338"
              fontSize="9"
              fontWeight="bold"
              fill="#173C2C"
              textAnchor="middle"
            >
              QUẦN ĐẢO HOÀNG SA
            </text>
            <text
              x="388"
              y="348"
              fontSize="7"
              fontWeight="medium"
              fill="#6B7280"
              textAnchor="middle"
            >
              (TP. Đà Nẵng, Việt Nam)
            </text>
            <text
              x="388"
              y="392"
              fontSize="7.5"
              fontStyle="italic"
              fill="#B97846"
              textAnchor="middle"
            >
              Paracel Islands
            </text>
          </g>

          {/* ======================================================== */}
          {/* QUẦN ĐẢO TRƯỜNG SA (SPRATLY ISLANDS) - OFFICIAL TERRITORY */}
          {/* ======================================================== */}
          <g id="truong-sa-territory">
            {/* Territorial Demarcation Box */}
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

            {/* Official GeoJSON Polygon of Truong Sa */}
            {mapData.truongSa?.path && (
              <path
                d={mapData.truongSa.path}
                fill="#173C2C"
                stroke="#B97846"
                strokeWidth="1.5"
              />
            )}

            {/* Prominent Island Atolls in Truong Sa */}
            {truongSaIslands.map((isl) => (
              <g key={isl.name} transform={`translate(${isl.x}, ${isl.y})`}>
                <circle r="2.5" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
                <circle r="4.5" fill="none" stroke="#B97846" strokeWidth="0.5" opacity="0.6" />
              </g>
            ))}

            {/* Official Label */}
            <text
              x="445"
              y="552"
              fontSize="10"
              fontWeight="bold"
              fill="#173C2C"
              textAnchor="middle"
            >
              QUẦN ĐẢO TRƯỜNG SA
            </text>
            <text
              x="445"
              y="563"
              fontSize="8"
              fontWeight="medium"
              fill="#6B7280"
              textAnchor="middle"
            >
              (Tỉnh Khánh Hòa, Việt Nam)
            </text>
            <text
              x="445"
              y="690"
              fontSize="8"
              fontStyle="italic"
              fill="#B97846"
              textAnchor="middle"
            >
              Spratly Islands
            </text>
          </g>

          {/* MAJOR COASTAL ISLANDS (PHU QUOC & CON DAO) */}
          <g id="coastal-islands">
            {/* Phu Quoc */}
            <g transform="translate(96, 590)">
              <circle r="4" fill="#173C2C" stroke="#FFFFFF" strokeWidth="1" />
              <text x="7" y="4" fontSize="8" fontWeight="bold" fill="#173C2C">Đảo Phú Quốc</text>
            </g>
            {/* Con Dao */}
            <g transform="translate(193, 648)">
              <circle r="3" fill="#173C2C" stroke="#FFFFFF" strokeWidth="0.8" />
              <text x="6" y="3" fontSize="8" fontWeight="bold" fill="#173C2C">Côn Đảo</text>
            </g>
          </g>

          {/* EXPORT PORTS */}
          <g id="export-ports">
            {ports.map((p) => (
              <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
                {/* Port Anchor Dot */}
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
                  ⚓ {p.name.split(" (")[0]}
                </text>
              </g>
            ))}
          </g>

          {/* 4 MANUFACTURING CLUSTERS INTERACTIVE PINS */}
          <g id="cluster-pins">
            {clusters.map((c) => {
              const isSelected = activeCluster === c.id;
              return (
                <g
                  key={c.id}
                  transform={`translate(${c.pin.x}, ${c.pin.y})`}
                  className="cursor-pointer transition-transform duration-300"
                  onClick={() => onSelectCluster(c.id)}
                  onMouseEnter={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredTarget({
                      title: c.name,
                      subtitle: `${c.facilitiesCount} Cơ sở • ${c.totalArea} • Cảng: ${c.ports}`,
                      x: rect.left,
                      y: rect.top,
                    });
                  }}
                  onMouseLeave={() => setHoveredTarget(null)}
                >
                  {/* Outer Pulsing Wave for Active Cluster */}
                  {isSelected && (
                    <>
                      <circle r="22" fill="#B97846" opacity="0.15" />
                      <circle r="15" fill="#B97846" opacity="0.3" className="animate-ping" />
                    </>
                  )}

                  {/* Marker Pin */}
                  <circle
                    r={isSelected ? "11" : "8"}
                    fill={isSelected ? "#B97846" : "#173C2C"}
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    className="shadow-md transition-all duration-300"
                  />
                  <circle
                    r={isSelected ? "4.5" : "3"}
                    fill="#FFFFFF"
                  />

                  {/* Cluster Name Label with background box for high legibility */}
                  <g transform={`translate(${c.id === "quynhon" ? -10 : (c.pin.x > 180 ? -12 : 14)}, -2)`}>
                    <rect
                      x={c.id === "quynhon" ? -110 : (c.pin.x > 180 ? -110 : 0)}
                      y="-12"
                      width="112"
                      height="20"
                      rx="4"
                      fill={isSelected ? "#173C2C" : "#FFFFFF"}
                      fillOpacity={isSelected ? "0.95" : "0.9"}
                      stroke={isSelected ? "#B97846" : "#D1D5DB"}
                      strokeWidth="1"
                    />
                    <text
                      x={c.id === "quynhon" ? -54 : (c.pin.x > 180 ? -54 : 56)}
                      y="1.5"
                      textAnchor="middle"
                      fontSize="8.5"
                      fontWeight="bold"
                      fill={isSelected ? "#FFFFFF" : "#173C2C"}
                    >
                      {c.name} ({c.totalArea})
                    </text>
                  </g>
                </g>
              );
            })}
          </g>

          {/* COMPASS ROSE ACCENT */}
          <g transform="translate(535, 120)" opacity="0.75">
            <circle r="18" fill="#FFFFFF" stroke="#B97846" strokeWidth="1" fillOpacity="0.8" />
            <polygon points="0,-14 4,-2 0,0" fill="#B97846" />
            <polygon points="0,-14 -4,-2 0,0" fill="#8B4513" />
            <polygon points="0,14 4,2 0,0" fill="#9CA3AF" />
            <polygon points="0,14 -4,2 0,0" fill="#4B5563" />
            <polygon points="14,0 2,4 0,0" fill="#9CA3AF" />
            <polygon points="-14,0 -2,4 0,0" fill="#9CA3AF" />
            <text x="0" y="-17" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B97846">N</text>
          </g>
        </svg>
      </div>

      {/* MAP FOOTER & SOVEREIGNTY NOTE */}
      <div className="w-full mt-3 pt-3 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#173C2C]" /> Cụm sản xuất (Cluster)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C3A]" /> Cảng biển quốc tế
          </span>
          <span className="flex items-center gap-1.5 font-medium text-[#B97846]">
            <span className="w-3 h-2 border border-dashed border-[#B97846] rounded-xs" /> Hoàng Sa & Trường Sa
          </span>
        </div>
        <div className="italic text-gray-500 font-medium">
          Khẳng định chủ quyền biển đảo Việt Nam
        </div>
      </div>
    </div>
  );
}
