import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import {
  ArrowRight,
  Ship,
  Info,
  Sparkles,
  Globe2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import VietnamProductionMap from "@/components/maps/VietnamProductionMap";
import VietnamExportVolumeMap from "@/components/maps/VietnamExportVolumeMap";
import {
  getClustersList,
  getExportVolumeGroups,
  getFacilitiesList,
  getPortGateways,
  GLOBAL_MARKETS_REGIONS,
} from "@/data/manufacturingNetwork";

const ALL_MARKET_COUNTRIES = GLOBAL_MARKETS_REGIONS.flatMap((r) => r.countries);

export default function ManufacturingPage() {
  const { i18n } = useTranslation();
  const isVi = Boolean(i18n.language?.startsWith("vi"));
  const facilities = getFacilitiesList(isVi);
  const clusters = getClustersList(isVi);
  const exportVolumeGroups = getExportVolumeGroups(isVi);
  const portGateways = getPortGateways(isVi);

  const [activeCluster, setActiveCluster] = useState<string>("quynhon");

  // Interactive state for Section 05: Monthly Export Volume Across Our Furniture Facilities
  const [selectedVolumeFilter, setSelectedVolumeFilter] = useState<string>("all");

  // Interactive state for Section 06: Our Global Markets
  const [europeZoom, setEuropeZoom] = useState<boolean>(false);
  const [activeMarketRegion, setActiveMarketRegion] = useState<string>("all");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const activeHoveredCountryObj = hoveredCountry
    ? ALL_MARKET_COUNTRIES.find((c) => c.name === hoveredCountry)
    : undefined;

  const activeVolumeSummary = (() => {
    if (selectedVolumeFilter === "all") {
      return {
        title: isVi
          ? "Toàn bộ 10 nhà máy thành phẩm (Cơ sở 01–10)"
          : "All 10 Furniture Facilities (01–10)",
        volume: isVi ? "500–600 container/tháng" : "500–600 containers/month",
        sub: isVi
          ? "Trung bình 50–60 container/tháng mỗi nhà máy · Không tính Cơ sở 11 (260.000 m² ván gỗ & sơ chế)"
          : "Average 50–60 containers/month per furniture facility · Excludes Facility 11 (260,000 m² panel & primary processing)",
        ports: isVi
          ? "Cảng Quy Nhơn · Cát Lái / Cái Mép - Thị Vải · Cảng Hải Phòng"
          : "Quy Nhon Port · Cat Lai / Cai Mep - Thi Vai · Hai Phong Port",
      };
    }
    const byFacility = facilities.find(
      (f) => f.id === selectedVolumeFilter && f.id !== "11"
    );
    if (byFacility) {
      return {
        title: `${byFacility.name} — ${byFacility.cluster} (${byFacility.area})`,
        volume: byFacility.monthlyVolume || (isVi ? "50–60 container/tháng" : "50–60 containers/month"),
        sub: byFacility.focus,
        ports: `${isVi ? "Cảng xuất khẩu" : "Port of Loading"}: ${byFacility.port}`,
      };
    }
    const byRegion = exportVolumeGroups.find((g) => g.id === selectedVolumeFilter);
    if (byRegion) {
      return {
        title: `${byRegion.label} (${byRegion.facilitiesLabel})`,
        volume: byRegion.volume,
        sub: byRegion.note,
        ports: `${isVi ? "Cửa ngõ xuất khẩu" : "Export Gateway"}: ${byRegion.portName}`,
      };
    }
    const byPort = portGateways.find((p) => p.id === selectedVolumeFilter);
    if (byPort) {
      return {
        title: `${byPort.name} (${byPort.region})`,
        volume: byPort.volume,
        sub: byPort.facilitiesServed,
        ports: `${isVi ? "Sản lượng xuất qua" : "Consolidated export volume via"} ${byPort.name}`,
      };
    }
    return {
      title: isVi
        ? "Toàn bộ 10 nhà máy thành phẩm (Cơ sở 01–10)"
        : "All 10 Furniture Facilities (01–10)",
      volume: isVi ? "500–600 container/tháng" : "500–600 containers/month",
      sub: isVi
        ? "Trung bình 50–60 container/tháng mỗi nhà máy"
        : "Average 50–60 containers/month per furniture facility",
      ports: isVi
        ? "Cảng Quy Nhơn · Cát Lái / Cái Mép - Thị Vải · Cảng Hải Phòng"
        : "Quy Nhon Port · Cat Lai / Cai Mep - Thi Vai · Hai Phong Port",
    };
  })();

  return (
    <>
      <SEO
        title={
          isVi
            ? "Năng Lực Sản Xuất | 11 Cơ Sở Tại Việt Nam | DHT Furniture"
            : "Manufacturing Footprint | 11 Facilities Across Vietnam | DHT Furniture"
        }
        description={
          isVi
            ? "Khám phá 11 cơ sở sản xuất của DHT với tổng diện tích 543.380 m² tại 4 cụm công nghiệp Việt Nam: 283.380 m² nội thất thành phẩm và 260.000 m² chế biến ván gỗ."
            : "Explore DHT Furniture's 11 manufacturing facilities covering 543,380 m² across 4 industrial clusters in Vietnam: 283,380 m² finished furniture and 260,000 m² panel processing."
        }
        canonical="https://dhtcompany.com/manufacturing"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: isVi ? "Trang chủ" : "Home", item: "https://dhtcompany.com" },
            {
              "@type": "ListItem",
              position: 2,
              name: isVi ? "Năng lực sản xuất" : "Manufacturing",
              item: "https://dhtcompany.com/manufacturing",
            },
          ],
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* 01 — OVERVIEW + FOUR EXISTING KPIS */}
        <section className="container mx-auto px-6 py-10 text-center max-w-5xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#9A5B2A] bg-[#B97846]/12 rounded-full">
            <Sparkles size={13} />{" "}
            {isVi ? "Mạng Lưới Sản Xuất Toàn Quốc" : "National Production Footprint"}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-5 leading-tight max-w-4xl mx-auto">
            {isVi
              ? "11 Cơ Sở Sản Xuất. Năng Lực Chuyên Môn Hóa Toàn Việt Nam."
              : "11 Production Facilities. Specialised Capabilities Across Vietnam."}
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/85 leading-relaxed mb-10 max-w-3xl mx-auto">
            {isVi
              ? "Mạng lưới sản xuất của chúng tôi kết hợp 10 nhà máy sản xuất nội thất thành phẩm cùng 1 nhà máy ván gỗ kỹ thuật và sơ chế gỗ, với tổng diện tích mặt bằng 543.380 m² tại Việt Nam."
              : "Our manufacturing network combines 10 furniture manufacturing facilities with one engineered-wood panel and primary-processing facility, covering a combined manufacturing footprint of 543,380 m² across Vietnam."}
          </p>

          {/* 4 KPI CARDS — EQUAL HEIGHT, NO LINE BREAK ON m² */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left auto-rows-fr">
            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-600 tracking-wider">
                {isVi ? "Tổng Số Cơ Sở" : "Total Facilities"}
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                {isVi ? "11 Cơ Sở" : "11 Facilities"}
              </p>
              <p className="text-xs text-gray-700">
                {isVi ? "10 Nhà máy Nội thất + 1 Nhà máy Ván" : "10 Furniture + 1 Panel Plant"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-600 tracking-wider">
                {isVi ? "Tổng Mặt Bằng" : "Combined Footprint"}
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#9A5B2A] my-2 whitespace-nowrap lining-nums tabular-nums">
                543,380 m²
              </p>
              <p className="text-xs text-gray-700">
                {isVi ? "4 Cụm Công Nghiệp Chiến Lược" : "4 Strategic Regional Clusters"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-600 tracking-wider">
                {isVi ? "Nội Thất Thành Phẩm" : "Finished Furniture"}
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                283,380 m²
              </p>
              <p className="text-xs text-gray-700">
                {isVi ? "Ngoài trời, Trong nhà & Dự án" : "Outdoor, Indoor & Hospitality"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col justify-between">
              <p className="text-xs uppercase font-semibold text-gray-600 tracking-wider">
                {isVi ? "Ván Gỗ & Sơ Chế" : "Panel & Processing"}
              </p>
              <p className="text-2xl xl:text-3xl font-black text-[#173C2C] my-2 whitespace-nowrap lining-nums tabular-nums">
                260,000 m²
              </p>
              <p className="text-xs text-gray-700">
                {isVi ? "Ván Gỗ Kỹ Thuật & Phôi Gỗ" : "Engineered Wood & Veneer"}
              </p>
            </div>
          </div>
        </section>

        {/* 02 — MAP OF FOUR MANUFACTURING REGIONS (45% MAP / 55% CARDS) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl p-6 md:p-10 border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B2A]">
                  {isVi ? "Phân Bố Địa Lý" : "Geographic Distribution"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi ? "Bốn Cụm Sản Xuất Chuyên Môn Hóa" : "Four Specialised Manufacturing Clusters"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  {isVi
                    ? "Phân bố tại miền Bắc, miền Trung và miền Nam nhằm tận dụng lợi thế nguồn nguyên liệu và cửa ngõ xuất khẩu đường biển."
                    : "Distributed across North, Central, and South Vietnam to combine regional material advantages and maritime export gateways."}
                </p>
              </div>
              <div className="text-xs bg-[#F3EFE7] px-3.5 py-2 rounded-lg text-gray-700 font-medium">
                {isVi
                  ? "Chọn vùng trên bản đồ hoặc thẻ bên cạnh"
                  : "Select a region on the map or cluster cards"}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-8 items-start">
              {/* 45% LEFT: INTERACTIVE ENLARGED VIETNAM MAP */}
              <div className="flex flex-col items-center w-full">
                <VietnamProductionMap
                  activeCluster={activeCluster}
                  onSelectCluster={setActiveCluster}
                  clusters={clusters}
                  isVi={isVi}
                />
              </div>

              {/* 55% RIGHT: 4 CLUSTER CARDS WITH FACILITY COUNT, AREA, SPECIALISATION & PORT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
                {clusters.map((c) => {
                  const isSelected = activeCluster === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setActiveCluster(c.id)}
                      className={`p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                        ? "bg-[#173C2C] text-white border-[#173C2C] shadow-md scale-[1.01]"
                        : "bg-white text-[#1F2723] border-black/10 hover:border-[#9A5B2A]/60 hover:shadow-sm"
                        }`}
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? "text-[#F3BA7A]" : "text-gray-600"
                              }`}
                          >
                            {c.region}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0 ${isSelected
                              ? "bg-white/15 text-white"
                              : "bg-[#173C2C]/8 text-[#173C2C]"
                              }`}
                          >
                            {c.facilitiesCount}{" "}
                            {isVi ? "Cơ sở" : c.facilitiesCount > 1 ? "Facilities" : "Facility"}
                          </span>
                        </div>
                        <h3
                          className={`text-lg font-bold mb-1 ${isSelected ? "text-white" : "text-[#173C2C]"
                            }`}
                        >
                          {c.name}
                        </h3>
                        <p
                          className={`text-2xl font-black mb-2.5 whitespace-nowrap ${isSelected ? "text-[#F5CA7B]" : "text-[#9A5B2A]"
                            }`}
                        >
                          {c.totalArea}
                        </p>
                        <p
                          className={`text-xs leading-relaxed ${isSelected ? "text-white/90" : "text-gray-600"
                            }`}
                        >
                          {c.focus}
                        </p>
                      </div>

                      <div
                        className={`mt-4 pt-3 border-t text-xs flex flex-col gap-1 ${isSelected
                          ? "border-white/20 text-white/90"
                          : "border-gray-100 text-gray-600"
                          }`}
                      >
                        <span className="font-semibold text-[11px]">
                          {c.panelArea
                            ? isVi
                              ? "12.000 m² Nội thất + 260.000 m² Ván gỗ"
                              : "12,000 m² Furniture + 260,000 m² Panel"
                            : isVi
                              ? "Nội thất Thành phẩm"
                              : "Finished Furniture"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OPERATIONAL COORDINATION NOTE */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-start gap-2.5 text-xs text-gray-600">
              <Info size={16} className="text-[#9A5B2A] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>{isVi ? "Lưu ý vận hành:" : "Operational Note:"}</strong>{" "}
                {isVi
                  ? "Các cụm nhà máy đại diện cho khu vực sản xuất theo địa bàn trên mạng lưới tại Việt Nam. Toàn bộ yêu cầu thương mại, báo giá, kiểm soát chất lượng và điều phối xuất khẩu được quản lý thống nhất qua đội ngũ DHT."
                  : "Location clusters represent geographical production regions across our manufacturing network in Vietnam. Commercial inquiries, quotations, quality control and export coordination are managed through one DHT commercial team."}
              </p>
            </div>
          </div>
        </section>

        {/* 03 — OUR FACILITIES AT A GLANCE (6-COLUMN 11-ROW TABLE + 2 SUBTOTALS + TOTAL ROW) */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B2A]">
                  {isVi ? "Mạng Lưới Cơ Sở" : "Manufacturing Network"}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-[#173C2C] mt-0.5">
                  {isVi ? "Tổng Quan 11 Cơ Sở Sản Xuất" : "Our Facilities at a Glance"}
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  {isVi
                    ? "10 nhà máy nội thất thành phẩm (283.380 m²) + 01 nhà máy ván gỗ kỹ thuật và sơ chế (260.000 m²)."
                    : "10 finished furniture facilities (283,380 m²) + 01 engineered-wood panel and primary-processing plant (260,000 m²)."}
                </p>
              </div>
              <span className="text-xs bg-[#173C2C]/8 text-[#173C2C] px-3.5 py-2 rounded-lg font-semibold shrink-0">
                {isVi ? "~2.400 Nhân sự Mạng lưới" : "~2,400 Network Personnel"}
              </span>
            </div>

            {/* DESKTOP 6-COLUMN TABLE — FULL VISIBILITY WITHOUT ACCORDIONS */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700 border-collapse">
                <thead className="bg-[#173C2C] text-white text-[11px] uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-4 px-5 whitespace-nowrap">
                      {isVi ? "Cơ sở" : "Facility"}
                    </th>
                    <th className="py-4 px-5 whitespace-nowrap">
                      {isVi ? "Cụm Địa bàn" : "Location Cluster"}
                    </th>
                    <th className="py-4 px-5 whitespace-nowrap">
                      {isVi ? "Diện tích" : "Operating Footprint"}
                    </th>
                    <th className="py-4 px-5 whitespace-nowrap">
                      {isVi ? "Phân loại" : "Operational Classification"}
                    </th>
                    <th className="py-4 px-5">
                      {isVi ? "Chuyên môn Sản xuất Chính" : "Core Manufacturing Focus"}
                    </th>
                    <th className="py-4 px-5 whitespace-nowrap">
                      {isVi ? "Cảng Xuất khẩu Chính" : "Primary Export Gateway"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {facilities.map((fac) => (
                    <tr
                      key={fac.id}
                      className={`transition-colors ${fac.isUpstreamPanel ? "bg-[#FAF6EE]/80 hover:bg-[#FAF6EE]" : "hover:bg-gray-50/80"}`}
                    >
                      <td className="py-3.5 px-5 font-bold text-[#173C2C] whitespace-nowrap">
                        {fac.name}
                      </td>
                      <td className="py-3.5 px-5 font-medium text-gray-800 whitespace-nowrap">
                        {fac.cluster}
                      </td>
                      <td className="py-3.5 px-5 font-bold text-[#9A5B2A] whitespace-nowrap tabular-nums">
                        {fac.area}
                      </td>
                      <td className="py-3.5 px-5 whitespace-nowrap">
                        <span
                          className={`inline-block text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                            fac.isUpstreamPanel
                              ? "bg-amber-100 text-amber-900 border border-amber-200"
                              : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                          }`}
                        >
                          {fac.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-xs text-gray-700 leading-relaxed min-w-[240px]">
                        {fac.focus}
                      </td>
                      <td className="py-3.5 px-5 text-xs font-semibold text-[#173C2C] whitespace-nowrap">
                        {fac.port}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[#F8F6F0] border-t-2 border-gray-200 text-xs">
                    <td colSpan={2} className="py-3 px-5 font-bold text-[#173C2C]">
                      {isVi
                        ? "Cộng 10 Nhà máy Nội thất Thành phẩm"
                        : "10 Finished Furniture Facilities Subtotal"}
                    </td>
                    <td className="py-3 px-5 font-bold text-[#173C2C] whitespace-nowrap tabular-nums">
                      283,380 m²
                    </td>
                    <td colSpan={3} className="py-3 px-5 text-gray-600">
                      {isVi
                        ? "Cơ sở 01–10 · Công suất xuất khẩu tham chiếu ~500–600 container/tháng"
                        : "Facilities 01–10 · Reference capacity ~500–600 containers/month"}
                    </td>
                  </tr>
                  <tr className="bg-[#FAF6EE] border-t border-gray-200 text-xs">
                    <td colSpan={2} className="py-3 px-5 font-bold text-[#9A5B2A]">
                      {isVi
                        ? "Cộng 01 Nhà máy Ván gỗ Công nghiệp & Sơ chế"
                        : "01 Engineered-Wood Panel Plant Subtotal"}
                    </td>
                    <td className="py-3 px-5 font-bold text-[#9A5B2A] whitespace-nowrap tabular-nums">
                      260,000 m²
                    </td>
                    <td colSpan={3} className="py-3 px-5 text-gray-600">
                      {isVi
                        ? "Cơ sở 11 (MEKONG) · Chuyên ván gỗ đầu nguồn, không tính vào tổng container thành phẩm"
                        : "Facility 11 (MEKONG) · Upstream panel processing, excluded from finished container total"}
                    </td>
                  </tr>
                  <tr className="bg-[#173C2C] text-white text-sm">
                    <td colSpan={2} className="py-4 px-5 font-bold">
                      {isVi
                        ? "Tổng Diện Tích Mạng Lưới Sản Xuất"
                        : "Total Group Manufacturing Footprint"}
                    </td>
                    <td className="py-4 px-5 font-black text-[#F5CA7B] whitespace-nowrap tabular-nums">
                      543,380 m²
                    </td>
                    <td colSpan={3} className="py-4 px-5 text-xs text-white/90">
                      {isVi
                        ? "11 cơ sở tại 4 cụm địa bàn chiến lược · Kết nối 3 cửa ngõ cảng xuất khẩu"
                        : "11 facilities across 4 strategic clusters · Connected to 3 export port gateways"}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* MOBILE 6-FIELD FACILITY CARDS */}
            <div className="md:hidden divide-y divide-gray-100">
              {facilities.map((fac) => (
                <div key={fac.id} className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-sm text-[#173C2C]">{fac.name}</p>
                      <p className="text-xs font-medium text-gray-700">{fac.cluster}</p>
                    </div>
                    <span className="font-bold text-sm text-[#9A5B2A] whitespace-nowrap tabular-nums">
                      {fac.area}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full font-semibold ${
                        fac.isUpstreamPanel
                          ? "bg-amber-100 text-amber-900 border border-amber-200"
                          : "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      }`}
                    >
                      {fac.category}
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#173C2C]">
                      <Ship size={12} className="text-[#9A5B2A]" /> {fac.port}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{fac.focus}</p>
                </div>
              ))}
              <div className="p-4 bg-[#F8F6F0] space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#173C2C]">
                  <span>{isVi ? "10 Nhà máy Thành phẩm" : "10 Furniture Facilities Subtotal"}</span>
                  <span className="tabular-nums">283,380 m²</span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#9A5B2A]">
                  <span>{isVi ? "01 Nhà máy Ván gỗ" : "01 Panel Plant Subtotal"}</span>
                  <span className="tabular-nums">260,000 m²</span>
                </div>
                <div className="flex items-center justify-between font-bold bg-[#173C2C] text-white p-3 rounded-lg mt-2">
                  <span>{isVi ? "Tổng Mặt Bằng Toàn Nhóm" : "Total Group Footprint"}</span>
                  <span className="text-[#F5CA7B] font-black tabular-nums">543,380 m²</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — INSIDE OUR MANUFACTURING NETWORK */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B2A]">
                  {isVi ? "Hình Ảnh Nhà Xưởng" : "Factory Imagery"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi ? "Khám Phá Mạng Lưới Sản Xuất" : "Inside Our Manufacturing Network"}
                </h2>
              </div>
              <p className="text-xs text-gray-600">
                {isVi
                  ? "Một số công đoạn xử lý gỗ, tạo hình, lắp ráp và sơn hoàn thiện tại nhà máy"
                  : "Selected views across our wood processing, joinery and finishing operations"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  src: "/img/WhoWeAre1.png",
                  tag: isVi ? "Gia công & Lắp ráp Gỗ" : "Woodworking & Joinery",
                  title: isVi ? "Xưởng Tạo Hình & Lắp Ráp" : "Joinery & Assembly Workshop",
                  focus: isVi
                    ? "Cắt phôi chuẩn xác, tạo mộng và lắp ráp kết cấu đồ gỗ."
                    : "Component sizing, profiling and joinery assembly for wooden furniture.",
                },
                {
                  src: "/img/WhoWeAre2.png",
                  tag: isVi ? "Chế biến Gỗ & Ván" : "Timber & Panel Preparation",
                  title: isVi ? "Sơ Chế Gỗ Nguyên Liệu" : "Primary Timber Processing",
                  focus: isVi
                    ? "Ổn định độ ẩm phôi gỗ, xẻ nhiều lưỡi và chuẩn bị ván."
                    : "Lumber conditioning, multi-blade sawing and panel preparation.",
                },
                {
                  src: "/img/WhoWeAre3.png",
                  tag: isVi ? "Hoàn thiện Bề mặt" : "Coating & Line Transfer",
                  title: isVi ? "Chuyền Sơn & Hoàn Thiện" : "Surface Finishing Line",
                  focus: isVi
                    ? "Dây chuyền sơn hoàn thiện chi tiết, băng chuyền trung chuyển và kiểm đóng."
                    : "In-line component coating, transfer conveyor and pre-pack staging.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl overflow-hidden border border-black/10 bg-[#FBF9F5] flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A5B2A] block mb-1">
                      {item.tag}
                    </span>
                    <h3 className="font-bold text-sm text-[#173C2C] mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-snug">{item.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — MONTHLY EXPORT VOLUME ACROSS OUR FURNITURE FACILITIES */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B2A]">
                  {isVi ? "Công suất Xuất khẩu Tham chiếu & Cảng biển" : "Reference Export Capacity & Gateways"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi
                    ? "Sản lượng Xuất khẩu Hàng tháng theo Nhà máy Nội thất"
                    : "Monthly Export Volume Across Our Furniture Facilities"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-3xl leading-relaxed">
                  {isVi
                    ? "Công suất xuất khẩu tham chiếu hàng tháng trên 10 nhà máy nội thất thành phẩm (Cơ sở 01–10) và các cửa ngõ cảng biển chính tại Việt Nam."
                    : "Reference monthly export capacity across our 10 finished furniture facilities (Facilities 01–10) and primary maritime export gateways in Vietnam."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVolumeFilter("all")}
                className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-colors shrink-0 ${selectedVolumeFilter === "all"
                  ? "bg-[#173C2C] text-white border-[#173C2C]"
                  : "bg-[#F3EFE7] text-[#173C2C] border-black/10 hover:bg-[#173C2C]/10"
                  }`}
              >
                {isVi
                  ? "Hiển thị cả 10 Nhà máy Thành phẩm (500–600 cont/tháng)"
                  : "Show All 10 Furniture Facilities (500–600 containers/month)"}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: VIETNAM EXPORT VOLUME & PORT GATEWAY MAP (Facilities 01–10) */}
              <div className="lg:col-span-5">
                <VietnamExportVolumeMap
                  selectedFilter={selectedVolumeFilter}
                  onSelectFilter={setSelectedVolumeFilter}
                  groups={exportVolumeGroups}
                  ports={portGateways}
                  isVi={isVi}
                />
              </div>

              {/* RIGHT: TOTAL REFERENCE + REGION & PORT BREAKDOWN */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                {/* Active Summary Banner */}
                <div className="bg-[#173C2C] text-white p-6 rounded-xl shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#F5CA7B] font-bold">
                      {activeVolumeSummary.title}
                    </span>
                    <span className="text-xs bg-white/15 px-3 py-1 rounded-full text-white font-medium">
                      {isVi
                        ? "50–60 container/tháng mỗi nhà máy"
                        : "50–60 containers/month per facility"}
                    </span>
                  </div>
                  <p className="text-3xl sm:text-4xl font-black text-[#F5CA7B] my-1 whitespace-nowrap">
                    {activeVolumeSummary.volume}
                  </p>
                  <p className="text-xs text-white/95 mt-1">{activeVolumeSummary.sub}</p>
                  <p className="text-xs text-[#F3BA7A] font-medium mt-2 pt-2 border-t border-white/15 flex items-center gap-1.5">
                    <Ship size={14} /> {activeVolumeSummary.ports}
                  </p>
                </div>

                {/* Individual Facility Selector (Facilities 01–10) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2.5">
                    {isVi
                      ? "Chọn từng Nhà máy Nội thất Thành phẩm (01–10)"
                      : "Select Individual Furniture Facility (01–10)"}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {facilities
                      .filter((f) => f.id !== "11")
                      .map((fac) => {
                        const isSelected = selectedVolumeFilter === fac.id;
                        return (
                          <button
                            type="button"
                            key={fac.id}
                            onClick={() =>
                              setSelectedVolumeFilter(isSelected ? "all" : fac.id)
                            }
                            className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${isSelected
                              ? "bg-[#173C2C] text-white border-[#173C2C] shadow-sm"
                              : "bg-white text-[#173C2C] border-black/15 hover:border-[#9A5B2A]"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold">{fac.name}</span>
                              <span
                                className={`text-[10px] font-semibold ${isSelected ? "text-[#F5CA7B]" : "text-[#9A5B2A]"
                                  }`}
                              >
                                50–60
                              </span>
                            </div>
                            <p
                              className={`text-[10px] truncate mt-0.5 ${isSelected ? "text-white/90" : "text-gray-600"
                                }`}
                            >
                              {fac.cluster}
                            </p>
                          </button>
                        );
                      })}
                  </div>
                </div>

                {/* Breakdown by Furniture Facility Cluster (Facilities 01–10) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                    {isVi
                      ? "Phân bổ theo Cụm Sản xuất (Cơ sở 01–10)"
                      : "Breakdown by Manufacturing Region (Facilities 01–10)"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {exportVolumeGroups.map((group) => {
                      const isSelected = selectedVolumeFilter === group.id;
                      return (
                        <button
                          type="button"
                          key={group.id}
                          onClick={() =>
                            setSelectedVolumeFilter(isSelected ? "all" : group.id)
                          }
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between text-left ${isSelected
                            ? "bg-[#173C2C]/8 border-[#173C2C] shadow-sm"
                            : "bg-[#F8F6F0] border-black/8 hover:border-[#9A5B2A]/60"
                            }`}
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="text-xs font-bold text-[#173C2C]">
                                {group.label}
                              </span>
                              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#173C2C]/10 text-[#173C2C]">
                                {group.facilitiesLabel}
                              </span>
                            </div>
                            <p className="text-lg font-black text-[#9A5B2A] my-1">
                              {group.volume}
                            </p>
                            <p className="text-[11px] text-gray-700">{group.note}</p>
                          </div>
                          <div className="w-full mt-3 pt-2.5 border-t border-black/8 flex items-center justify-between text-[11px] text-[#173C2C] font-semibold">
                            <span className="flex items-center gap-1">
                              <Ship size={12} className="text-[#9A5B2A]" /> {group.portName}
                            </span>
                            <span>
                              {group.facilityCount}{" "}
                              {isVi
                                ? "cơ sở"
                                : group.facilityCount > 1
                                  ? "facilities"
                                  : "facility"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Breakdown by Export Port Gateway (No Double Counting) */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-3">
                    {isVi
                      ? "Sản lượng Tổng hợp theo Cảng Xuất khẩu Chính"
                      : "Consolidated Volume by Primary Export Port"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {portGateways.map((port) => {
                      const isSelected = selectedVolumeFilter === port.id;
                      return (
                        <button
                          type="button"
                          key={port.id}
                          onClick={() =>
                            setSelectedVolumeFilter(isSelected ? "all" : port.id)
                          }
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${isSelected
                            ? "bg-[#173C2C] text-white border-[#173C2C]"
                            : "bg-white border-black/15 hover:border-[#9A5B2A]/60"
                            }`}
                        >
                          <p
                            className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-[#F3BA7A]" : "text-gray-600"
                              }`}
                          >
                            {port.region}
                          </p>
                          <p
                            className={`text-sm font-bold mt-0.5 ${isSelected ? "text-white" : "text-[#173C2C]"
                              }`}
                          >
                            {port.name}
                          </p>
                          <p className={`text-base font-black my-1 ${isSelected ? "text-[#F5CA7B]" : "text-[#9A5B2A]"}`}>
                            {port.volume}
                          </p>
                          <p
                            className={`text-[11px] ${isSelected ? "text-white/90" : "text-gray-600"
                              }`}
                          >
                            {port.facilitiesServed}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footnote */}
                <div className="p-3.5 rounded-lg bg-[#F8F6F0] border border-black/5 text-xs text-gray-600 leading-relaxed">
                  {isVi ? (
                    <>
                      <strong>Ghi chú Sản lượng Tham chiếu:</strong> Số liệu thể hiện mức tham chiếu ước tính (
                      <strong>50–60 container/tháng</strong> mỗi nhà máy thành phẩm × 10 nhà máy ={" "}
                      <strong>500–600 container/tháng</strong> trên toàn mạng lưới tham chiếu, không bao gồm Cơ sở 11). Đây là thông số tham chiếu nội bộ của mạng lưới sản xuất và không đại diện cho năng lực thuộc sở hữu riêng hay cam kết sản lượng độc quyền của DHT. Mỗi container chỉ được thống kê một lần tại cảng xếp hàng, không tính trùng lặp trung chuyển.
                    </>
                  ) : (
                    <>
                      <strong>Reference Volume Note:</strong> Figures represent an indicative reference
                      range (<strong>50–60 containers/month</strong> per furniture facility × 10
                      facilities = <strong>500–600 containers/month</strong> across the reference
                      network, excluding Facility 11). These are unaudited reference estimates for the
                      facility network and do not represent DHT-owned capacity or DHT-exclusive order
                      volume. Each container is counted once at its port of loading without
                      transshipment double-counting.
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06 — OUR GLOBAL MARKETS */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="bg-white p-6 md:p-10 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A5B2A]">
                  {isVi ? "Hiện diện Quốc tế" : "International Reach"}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                  {isVi ? "Thị trường Xuất khẩu Toàn cầu" : "Our Global Markets"}
                </h2>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  {isVi
                    ? "Cung ứng xuất khẩu tới 29 quốc gia tại Bắc Mỹ, Châu Âu, Trung Đông & Âu-Á và Châu Á - Thái Bình Dương & Châu Phi."
                    : "Exporting across 29 countries in North America, Europe, Middle East & Eurasia, and Asia-Pacific & Africa."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEuropeZoom(false)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${!europeZoom
                    ? "bg-[#173C2C] text-white border-[#173C2C]"
                    : "bg-[#F8F6F0] text-[#173C2C] border-black/15 hover:bg-[#173C2C]/10"
                    }`}
                >
                  <ZoomOut size={14} /> {isVi ? "Toàn cầu (29)" : "World View (29)"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEuropeZoom(true);
                    setActiveMarketRegion("eu");
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${europeZoom
                    ? "bg-[#A45E2F] text-white border-[#A45E2F]"
                    : "bg-[#F8F6F0] text-[#173C2C] border-black/15 hover:bg-[#A45E2F]/15"
                    }`}
                >
                  <ZoomIn size={14} />{" "}
                  {isVi ? "Phóng to Cụm Châu Âu (14)" : "Europe Cluster Zoom (14)"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* 70% WORLD MAP (NO FLIGHT LINES / SHIPPING ROUTES) */}
              <div className="lg:col-span-8 bg-[#0E241B] rounded-xl p-4 sm:p-6 border border-black/10 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMarketRegion("all");
                        setEuropeZoom(false);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeMarketRegion === "all"
                        ? "bg-[#A45E2F] text-white"
                        : "bg-white/15 text-white/95 hover:bg-white/25"
                        }`}
                    >
                      {isVi ? "Tất cả Khu vực (29)" : "All Regions (29)"}
                    </button>
                    {GLOBAL_MARKETS_REGIONS.map((reg) => (
                      <button
                        type="button"
                        key={reg.id}
                        onClick={() => {
                          setActiveMarketRegion(reg.id);
                          if (reg.id === "eu") setEuropeZoom(true);
                          else setEuropeZoom(false);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${activeMarketRegion === reg.id
                          ? "bg-[#A45E2F] text-white"
                          : "bg-white/15 text-white/95 hover:bg-white/25"
                          }`}
                      >
                        {isVi ? reg.nameVi : reg.name} ({reg.count})
                      </button>
                    ))}
                  </div>

                  {activeHoveredCountryObj && (
                    <span className="px-3 py-1 rounded-full bg-[#A45E2F] text-white text-xs font-bold">
                      {isVi ? activeHoveredCountryObj.nameVi : activeHoveredCountryObj.name}
                    </span>
                  )}
                </div>

                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-[#132E22]">
                  <svg
                    viewBox={europeZoom ? "440 100 140 110" : "80 60 840 380"}
                    className="w-full h-full transition-all duration-500 select-none"
                    aria-label={isVi ? "Bản đồ Thị trường Toàn cầu" : "Our Global Markets Map"}
                  >
                    {/* Subtle Lat/Long Grid */}
                    <g stroke="rgba(255,255,255,0.05)" strokeWidth={europeZoom ? "0.3" : "1"}>
                      <line x1="80" y1="150" x2="920" y2="150" />
                      <line x1="80" y1="230" x2="920" y2="230" />
                      <line x1="80" y1="310" x2="920" y2="310" />
                      <line x1="250" y1="60" x2="250" y2="440" />
                      <line x1="500" y1="60" x2="500" y2="440" />
                      <line x1="750" y1="60" x2="750" y2="440" />
                    </g>

                    {/* Stylized Continental Landmasses */}
                    <g fill="#1F4736" stroke="rgba(255,255,255,0.12)" strokeWidth={europeZoom ? "0.4" : "1"}>
                      {/* North America */}
                      <path d="M120,95 L295,95 L310,165 L255,235 L185,230 L135,175 Z" />
                      {/* South America */}
                      <path d="M255,255 L345,275 L330,415 L275,425 L245,330 Z" />
                      {/* Europe */}
                      <path d="M455,105 L565,100 L575,185 L525,198 L458,192 Z" />
                      {/* Africa */}
                      <path d="M455,210 L575,215 L605,310 L555,400 L505,395 L475,305 Z" />
                      {/* Eurasia & Middle East & Asia */}
                      <path d="M568,90 L865,95 L885,245 L765,295 L665,275 L575,245 L555,185 Z" />
                      {/* Australia */}
                      <path d="M765,335 L865,335 L875,405 L775,405 Z" />
                    </g>

                    {/* Vietnam Manufacturing Origin Marker */}
                    {!europeZoom && (
                      <g>
                        <circle
                          cx="755"
                          cy="255"
                          r="6"
                          fill="#10B981"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <text
                          x="755"
                          y="272"
                          textAnchor="middle"
                          fill="#A7F3D0"
                          fontSize="10"
                          fontWeight="800"
                        >
                          {isVi ? "VIỆT NAM (DHT)" : "VIETNAM (DHT)"}
                        </text>
                      </g>
                    )}

                    {/* 29 Market Country Nodes */}
                    {ALL_MARKET_COUNTRIES.map((country) => {
                      const isRegionActive =
                        activeMarketRegion === "all" || activeMarketRegion === country.regionId;
                      const isHovered = hoveredCountry === country.name;
                      const radius = europeZoom
                        ? isHovered
                          ? 3.2
                          : 2.2
                        : isHovered
                          ? 8
                          : isRegionActive
                            ? 5.5
                            : 3.5;

                      return (
                        <g
                          key={country.name}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredCountry(country.name)}
                          onMouseLeave={() => setHoveredCountry(null)}
                          onClick={() => setHoveredCountry(country.name)}
                        >
                          <circle
                            cx={country.x}
                            cy={country.y}
                            r={radius}
                            fill={
                              isHovered
                                ? "#FFFFFF"
                                : isRegionActive
                                  ? "#F5CA7B"
                                  : "rgba(255,255,255,0.4)"
                            }
                            stroke="#0E241B"
                            strokeWidth={europeZoom ? "0.5" : "1.5"}
                          />
                          {(isHovered || (europeZoom && country.regionId === "eu")) && (
                            <text
                              x={country.x}
                              y={country.y - (europeZoom ? 4 : 10)}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize={europeZoom ? "3.4" : "10"}
                              fontWeight="700"
                            >
                              {isVi ? country.nameVi : country.name}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/90">
                  <span>
                    {isVi
                      ? "Di chuột hoặc chạm vào điểm đánh dấu quốc gia hoặc tên trong danh sách để xem vị trí."
                      : "Hover or tap any country marker or name in the list to highlight its location."}
                  </span>
                  <span className="text-[#F5CA7B] font-semibold">
                    {isVi ? "4 Khu vực · 29 Quốc gia Xuất khẩu" : "4 Regions · 29 Export Countries"}
                  </span>
                </div>
              </div>

              {/* 30% COUNTRY LIST BY 4 REGIONS (29 COUNTRIES) */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                {GLOBAL_MARKETS_REGIONS.map((region) => {
                  const isActive =
                    activeMarketRegion === "all" || activeMarketRegion === region.id;
                  return (
                    <div
                      key={region.id}
                      className={`p-4 rounded-xl border transition-all ${isActive
                        ? "bg-[#F8F6F0] border-[#173C2C]/20"
                        : "bg-gray-50/60 border-black/5 opacity-85"
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMarketRegion(
                              activeMarketRegion === region.id ? "all" : region.id
                            );
                            if (region.id === "eu") setEuropeZoom(true);
                            else setEuropeZoom(false);
                          }}
                          className="text-xs font-bold uppercase tracking-wider text-[#173C2C] hover:text-[#9A5B2A] transition-colors flex items-center gap-1.5 text-left"
                        >
                          <Globe2 size={13} className="text-[#9A5B2A]" />
                          {isVi ? region.nameVi : region.name}
                        </button>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#173C2C] text-white">
                          {region.count}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {region.countries.map((c) => {
                          const isHovered = hoveredCountry === c.name;
                          return (
                            <button
                              type="button"
                              key={c.name}
                              onMouseEnter={() => setHoveredCountry(c.name)}
                              onMouseLeave={() => setHoveredCountry(null)}
                              onClick={() => {
                                setHoveredCountry(c.name);
                                if (c.regionId === "eu") setEuropeZoom(true);
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded border transition-colors ${isHovered
                                ? "bg-[#A45E2F] text-white border-[#A45E2F] font-semibold"
                                : "bg-white text-gray-800 border-black/15 hover:border-[#9A5B2A]"
                                }`}
                            >
                              {isVi ? c.nameVi : c.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 07 — DHT CONTACT / OEM DISCUSSION / COMPANY PROFILE */}
        <section className="container mx-auto px-6 py-10 max-w-4xl text-center">
          <div className="bg-[#173C2C] text-white p-8 md:p-10 rounded-2xl shadow-md">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {isVi
                ? "Trao Đổi Yêu Cầu Sản Xuất & Gia Công OEM."
                : "Discuss Your Manufacturing Requirements."}
            </h3>
            <p className="text-sm text-white/95 mb-7 leading-relaxed max-w-2xl mx-auto">
              {isVi
                ? "Chia sẻ thông số sản phẩm, vật liệu mục tiêu và sản lượng dự kiến để đội ngũ điều phối thương mại DHT tư vấn cơ sở phù hợp và sắp xếp lịch tham quan nhà máy."
                : "Share your target product mix, material specifications, estimated container volume and timeline. Our commercial coordination team arranges OEM quotations and scheduled factory visits."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact?type=oem"
                className="inline-flex items-center gap-2 bg-[#A45E2F] text-white px-7 py-3.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
              >
                {isVi ? "Trao Đổi Dự Án OEM" : "Discuss Your OEM Project"}{" "}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/DHT_Company_Profile_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-transparent text-white border border-white/40 px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/15 transition-all"
              >
                {isVi ? "Tải Hồ Sơ Năng Lực (PDF)" : "Download Company Profile (PDF)"}
              </Link>
              <Link
                href="/contact?type=visit"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5CA7B] hover:underline px-2 py-2"
              >
                {isVi ? "Đặt Lịch Tham Quan Nhà Máy" : "Arrange a Factory Visit"}{" "}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
