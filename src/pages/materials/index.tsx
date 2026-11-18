import Link from "next/link";
import Image from "next/image";
import SEO from "@/components/SEO";
import Schema from "@/components/Schema";
import { 
  ArrowRight, ShieldCheck, TreePine, Sparkles, Layers, 
  Wrench, CheckCircle2, FileText, Droplets, Sun, Flame, Box 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { materialArticles } from "@/data/materialArticles";

export default function MaterialsIndexPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const isVi = i18n.language?.startsWith("vi") || router.locale === "vi-VN";

  // Additional 4 profile capabilities required by Issue 15
  const additionalCapabilities = [
    {
      id: "steel",
      icon: Wrench,
      badge: isVi ? "KIM KHÍ & THÉP KẾT CẤU" : "STRUCTURAL STEEL & METALWORK",
      title: isVi ? "Gia Công Thép & Khung Kim Loại Chịu Lực" : "Steel Fabrication & Structural Metalwork",
      desc: isVi 
        ? "Bên cạnh nhôm thanh định hình nhẹ, DHT gia công thép carbon cường độ cao và thép không gỉ (Inox 304). Khung kim loại được xử lý qua dây chuyền tẩy dầu hoá chất đa tầng, sơn lót nhúng điện (E-coating) và sơn tĩnh điện bột polyester ngoài trời để chống chịu ăn mòn muối biển."
        : "Complementing lightweight architectural aluminium, DHT manufactures structural carbon steel and 304-grade stainless steel assemblies. Frames undergo multi-stage chemical degreasing, anti-corrosion electro-coating (E-coating), and exterior polyester powder coating to withstand marine salt-spray exposure.",
      highlights: isVi 
        ? ["Thép carbon định hình & Inox 304", "Sơn lót nhúng điện chống gỉ E-coating", "Hàn TIG/MIG liên kết ngàm chính xác", "Khả năng chịu tải trọng lớn cho dự án"]
        : ["Carbon steel tubing & 304 stainless steel", "Anti-corrosion E-coating pre-treatment", "Precision TIG/MIG welded joints", "Heavy-duty load bearing for hospitality"]
    },
    {
      id: "rope-wicker",
      icon: Layers,
      badge: isVi ? "DÂY ĐAN & MÂY NHỰA NGOẠI THẤT" : "ALL-WEATHER ROPE & WICKER",
      title: isVi ? "Dây Đan Kháng Tia UV & Mây Nhựa Đan Thủ Công" : "All-Weather Rope & Hand-Woven Wicker",
      desc: isVi 
        ? "Sử dụng sợi Olefin và Polypropylene nhuộm dung dịch, kháng tia cực tím, bền màu và giữ lực căng ổn định dưới thời tiết khắc nghiệt. Mây nhựa HDPE tổng hợp được nghệ nhân đan tay tỉ mỉ theo các hoa văn dệt phẳng, tròn hoặc đan chéo phức tạp."
        : "DHT incorporates solution-dyed Olefin and Polypropylene outdoor ropes offering superior UV stability, colourfastness, and tension retention under extreme weather. High-density polyethylene (HDPE) synthetic wicker is hand-woven by experienced artisans in flat, round, and open-weave motifs.",
      highlights: isVi 
        ? ["Sợi Olefin/Polypropylene kháng UV", "Mây nhựa HDPE chống giòn gãy", "Kỹ thuật đan thủ công đa dạng hoa văn", "Chịu được nhiệt độ cao và độ ẩm cao"]
        : ["High-UV solution-dyed Olefin & PP cords", "Weather-resistant HDPE synthetic wicker", "Artisanal hand-weaving craftsmanship", "High tensile retention in tropical climates"]
    },
    {
      id: "foam-cushion",
      icon: Droplets,
      badge: isVi ? "HỆ MÚT & ĐỆM THOÁT NƯỚC" : "CUSHION FOAM & DRAINAGE",
      title: isVi ? "Mút Đàn Hồi Cao & Mút Xốp Thoát Nước Nhanh" : "High-Resilience & Quick-Dry Foam Systems",
      desc: isVi 
        ? "Đệm ngồi sử dụng lõi mút polyurethane đàn hồi cao (High-Resilience) giữ phom dáng bền lâu. Đối với khu vực tiếp xúc trực tiếp với mưa nắng hoặc hồ bơi, DHT cung cấp mút xốp cấu trúc tế bào mở (Quick-Dry Reticulated Foam) kết hợp đáy lưới thoát nước thông thoáng."
        : "Standard seat cushions utilize high-resilience polyurethane foam cores engineered to maintain shape memory. For exposed pool and garden seating, DHT offers reticulated quick-dry open-cell foam systems paired with breathable mesh base panels for rapid moisture drainage.",
      highlights: isVi 
        ? ["Lõi mút High-Resilience giữ phom dáng", "Tùy chọn Quick-Dry Foam thoát nước nhanh", "Đáy đệm lót lưới thoáng khí", "Đạt chuẩn chống cháy CA TB117 / BS 5852 theo yêu cầu"]
        : ["Shape-memory high-resilience foam cores", "Optional reticulated quick-dry open-cell foam", "Breathable mesh base panels for drainage", "CA TB117 & BS 5852 flammability on request"]
    },
    {
      id: "finishes-hardware",
      icon: ShieldCheck,
      badge: isVi ? "HOÀN THIỆN & PHỤ KIỆN KIM KHÍ" : "FINISHES & HARDWARE",
      title: isVi ? "Hệ Hoàn Thiện Bảo Vệ & Phụ Kiện Inox 304" : "Protective Finishes & Marine Hardware",
      desc: isVi 
        ? "Toàn bộ phụ kiện ốc vít, bu lông và bản lề lắp ráp ngoài trời được tiêu chuẩn hóa bằng thép không gỉ Inox 304 hoặc thép mạ kẽm nhúng nóng. Bề mặt gỗ được hoàn thiện bằng dầu dưỡng gỗ tự nhiên hoặc sơn phủ PU gốc nước an toàn, tôn vinh vân gỗ và bảo vệ cốt lõi."
        : "All assembly hardware, screws, bolts, and hinges for exterior collections are standardized in 304-grade stainless steel or hot-dip galvanized steel. Timber surfaces receive exterior teak oils or certified water-based PU sealants formulated to enhance natural grain and resist weathering.",
      highlights: isVi 
        ? ["Ốc vít bu lông Inox 304 chống rỉ sét", "Dầu dưỡng gỗ ngoài trời & sơn PU gốc nước", "Sơn tĩnh điện bột ngoài trời chịu sương muối", "Phụ kiện lắp ráp Knock-Down (KD) chính xác"]
        : ["304-grade stainless steel exterior hardware", "Exterior timber oils & water-based PU coatings", "Salt-spray certified architectural powder coating", "Precision Knock-Down (KD) assembly hardware"]
    }
  ];

  return (
    <>
      <SEO
        title={isVi ? "Năng Lực Vật Liệu & Tiêu Chuẩn Kỹ Thuật | DHT Furniture Vietnam" : "Material Capabilities & Technical Standards | DHT Furniture Vietnam"}
        description={isVi 
          ? "Khám phá năng lực gia công vật liệu nội ngoại thất của DHT: Gỗ keo lai, Teak, Bạch đàn 100% chứng nhận FSC, nhôm sơn tĩnh điện, thép kết cấu, dây đan, mút thoát nước và phụ kiện Inox 304."
          : "Explore DHT Furniture Vietnam's comprehensive material capabilities: FSC-certified Acacia, Teak, and Eucalyptus timber, powder-coated aluminium, structural steel, all-weather rope, quick-dry foam, and 304 stainless hardware."}
        canonical="https://dhtcompany.com/materials"
      />
      <Schema
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: isVi ? "Trang chủ" : "Home", item: "https://dhtcompany.com" },
            { "@type": "ListItem", position: 2, name: isVi ? "Vật liệu" : "Materials", item: "https://dhtcompany.com/materials" }
          ]
        }}
      />

      <main className="bg-[#F3EFE7] min-h-screen text-[#1F2723] pt-28 pb-20">
        {/* HERO SECTION */}
        <section className="container mx-auto px-6 py-10 text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-[#B97846] bg-[#B97846]/10 rounded-full">
            <Sparkles size={13} /> {isVi ? "Vật Liệu Đạt Chuẩn Xuất Khẩu" : "Engineered Material Excellence"}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-[#173C2C] mb-6 leading-tight">
            {isVi ? "Năng Lực Vật Liệu & Tiêu Chuẩn Chế Tác" : "Material Capabilities & Technical Standards"}
          </h1>
          <p className="text-base md:text-lg text-[#1F2723]/80 leading-relaxed mb-6">
            {isVi 
              ? "Từ gỗ tự nhiên 100% có chứng chỉ FSC, nhôm sơn tĩnh điện, kết cấu thép kiên cố, cho đến dây đan kháng UV và vải bọc chuyên dụng — DHT làm chủ chuỗi cung ứng vật liệu để đáp ứng các tiêu chuẩn khắt khe nhất của thị trường quốc tế."
              : "From 100% FSC-certified hardwoods and powder-coated aluminium to structural steel, all-weather ropes, and high-performance textiles — DHT orchestrates disciplined material capabilities to meet international contract and retail standards."}
          </p>

          {/* FSC SOURCING POLICY MANDATE CARD */}
          <div className="bg-[#173C2C] text-white p-5 sm:p-6 rounded-2xl shadow-sm text-left max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#B97846] text-white flex items-center justify-center shrink-0 shadow-sm">
              <TreePine size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#B97846] bg-white/10 px-2 py-0.5 rounded">
                  {isVi ? "Chính Sách Bắt Buộc" : "Mandatory Sourcing Policy"}
                </span>
                <span className="text-xs text-white/70 font-semibold">
                  {isVi ? "Quyết định Ban Giám Đốc" : "Executive Governance"}
                </span>
              </div>
              <p className="text-sm font-semibold leading-relaxed">
                {isVi 
                  ? "Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Hồ sơ chứng minh được duy trì đầy đủ tương ứng với từng công bố FSC áp dụng (FSC 100% hoặc FSC Mix theo định mức BOM)."
                  : "All wood used in DHT furniture is FSC-certified. Supporting documentation is maintained for the applicable FSC claim (FSC 100% or FSC Mix per certified BOM)."}
              </p>
            </div>
          </div>
        </section>

        {/* 5 DEEP MATERIAL ARTICLES GRID */}
        <section className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-8 pb-4 border-b border-black/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                {isVi ? "Chuyên Đề Kỹ Thuật" : "In-Depth Guides"}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#173C2C] mt-1">
                {isVi ? "5 Chuyên Đề Vật Liệu Trọng Tâm" : "5 Core Material Specialisations"}
              </h2>
            </div>
            <p className="text-xs text-gray-500 max-w-md text-left sm:text-right">
              {isVi ? "Bấm vào từng bài viết để xem thông số sấy, gia công và điều kiện thương mại chi tiết" : "Click any material to explore technical drying profiles, joinery, and commercial parameters"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materialArticles.map((art) => {
              const badge = isVi ? (art.badgeVi || art.badge) : art.badge;
              const title = isVi ? (art.headlineVi || art.headline) : art.headline;
              const intro = isVi ? (art.introVi || art.intro) : art.intro;
              const stats = isVi ? (art.statsVi || art.stats) : art.stats;

              return (
                <Link
                  key={art.slug}
                  href={`/materials/${art.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:border-[#B97846]/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                      <Image
                        src={art.image.split("?")[0]}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#173C2C]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-xs">
                        {badge}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#173C2C] mb-2 leading-snug group-hover:text-[#B97846] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {intro}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-gray-100">
                        {stats.map((s, idx) => (
                          <span key={idx} className="text-[11px] bg-[#F8F6F0] text-[#173C2C] px-2 py-0.5 rounded font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B97846] group-hover:gap-2 transition-all">
                      <span>{isVi ? "Xem chi tiết thông số kỹ thuật" : "Read Full Technical Dossier"}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 4 COMPLEMENTARY MATERIAL CAPABILITIES (Item 15 Requirement) */}
        <section className="container mx-auto px-6 py-12 max-w-6xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-black/5 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B97846]">
                {isVi ? "Năng Lực Bổ Sung Theo Hồ Sơ 2026" : "Integrated Material Spectrum"}
              </span>
              <h2 className="text-2xl md:text-4xl font-bold text-[#173C2C] mt-1.5 mb-3">
                {isVi ? "Thép, Dây Đan, Mút Đệm & Phụ Kiện Kim Khí" : "Steel, Woven Rope, Cushion Foam & Marine Hardware"}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {isVi 
                  ? "Bên cạnh các dòng gỗ thế mạnh và nhôm đùn, DHT tích hợp toàn diện các vật liệu bổ trợ quan trọng để hoàn thiện các bộ sưu tập nội ngoại thất xuất khẩu đồng bộ."
                  : "Beyond core timber and extruded aluminium, DHT integrates essential auxiliary materials to deliver turn-key commercial collections with full specification compliance."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {additionalCapabilities.map((cap) => {
                const Icon = cap.icon;
                return (
                  <div 
                    key={cap.id} 
                    className="p-6 md:p-7 rounded-2xl bg-[#F8F6F0] border border-black/5 flex flex-col justify-between hover:border-[#B97846]/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#173C2C] text-white flex items-center justify-center shrink-0">
                          <Icon size={20} className="text-[#B97846]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#B97846] uppercase tracking-wider block">
                            {cap.badge}
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-[#173C2C]">
                            {cap.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-5">
                        {cap.desc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-gray-200/60">
                      {cap.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                          <CheckCircle2 size={14} className="text-[#173C2C] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* GENERAL MATERIAL GOVERNANCE STATEMENT */}
        <section className="container mx-auto px-6 py-6 max-w-4xl text-center">
          <div className="bg-[#F8F6F0] border border-black/5 p-6 rounded-2xl text-xs text-gray-600 leading-relaxed font-serif italic">
            &ldquo;{isVi 
              ? "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng."
              : "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme."}&rdquo;
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="container mx-auto px-6 py-8 text-center max-w-3xl">
          <div className="bg-[#173C2C] text-white p-8 md:p-10 rounded-2xl shadow">
            <h3 className="text-xl md:text-2xl font-bold mb-3">
              {isVi ? "Cần Mẫu Vật Liệu Hoặc Tư Vấn Kỹ Thuật?" : "Require Material Swatches or Technical Consultation?"}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-6 max-w-xl mx-auto">
              {isVi 
                ? "Liên hệ trực tiếp với bộ phận phát triển sản phẩm DHT để nhận bảng mẫu màu gỗ, swatch vải, bảng màu sơn tĩnh điện và giải trình hồ sơ kỹ thuật cho chương trình của bạn."
                : "Contact DHT's Product Development department to request physical timber swatches, outdoor textile binders, powder coating color chips, and technical dossiers."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact?type=material"
                className="inline-flex items-center gap-2 bg-[#B97846] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#B97846]/90 transition-all shadow-sm"
              >
                {isVi ? "Yêu Cầu Mẫu Thử Vật Liệu" : "Request Material Swatches"} <ArrowRight size={16} />
              </Link>
              <Link
                href="/quality-compliance"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-white/10 transition-all"
              >
                {isVi ? "Xem Tiêu Chuẩn Kiểm Định" : "View Compliance & Quality"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
