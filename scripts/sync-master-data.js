/**
 * SCRIPT ĐỒNG BỘ DỮ LIỆU MASTER PROFILE 2026 VÀ XÓA SẠCH 100% JDD KHỎI MONGODB
 * Chạy lệnh: node scripts/sync-master-data.js
 */
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function syncMasterData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Thiếu MONGODB_URI trong file .env.local");
    process.exit(1);
  }

  console.log("Đang kết nối tới MongoDB...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  // 1. CẬP NHẬT CONTACT CONTENT: Chuẩn hóa 3 địa điểm chính & Xóa sạch JDD
  console.log("1. Đang cập nhật Contact Content...");
  const cleanLocations = [
    {
      title: { 
        us: "DHT Central Commercial Coordination Hub", 
        uk: "DHT Central Commercial Coordination Hub",
        vi: "Văn phòng Điều phối Thương mại DHT" 
      },
      subtitle: { 
        us: "Commercial & Business Inquiries", 
        uk: "Commercial & Business Inquiries",
        vi: "Phòng Thương mại & Hợp tác Quốc tế" 
      },
      address: {
        us: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
        uk: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam",
        vi: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam"
      },
      phone: "+84 932 058 545",
      href: "tel:+84932058545",
      hours: {
        us: "08:00 - 17:00 (UTC+7), Monday to Friday. Visits by appointment.",
        uk: "08:00 - 17:00 (UTC+7), Monday to Friday. Visits by appointment.",
        vi: "08:00 - 17:00 (UTC+7), Thứ Hai đến Thứ Sáu. Tiếp khách theo lịch hẹn."
      }
    },
    {
      title: { 
        us: "DHT Showroom & Gallery", 
        uk: "DHT Showroom & Gallery",
        vi: "Showroom Trưng Bày DHT" 
      },
      subtitle: { 
        us: "Outdoor & Indoor Collections", 
        uk: "Outdoor & Indoor Collections",
        vi: "Bộ sưu tập Nội Ngoại thất" 
      },
      address: {
        us: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam",
        uk: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam",
        vi: "206 Phan Đình Phùng, TP. Pleiku, Tỉnh Gia Lai, Việt Nam"
      },
      phone: "+84 907 386 898",
      href: "tel:+84907386898",
      hours: {
        us: "08:00 - 17:00 (UTC+7). Visits by appointment.",
        uk: "08:00 - 17:00 (UTC+7). Tham quan theo lịch hẹn trước.",
        vi: "08:00 - 17:00 (UTC+7). Tham quan theo lịch hẹn trước."
      }
    },
    {
      title: { 
        us: "DHT Manufacturing Network", 
        uk: "DHT Manufacturing Network",
        vi: "Mạng lưới Nhà máy Sản xuất DHT" 
      },
      subtitle: { 
        us: "11 Facilities Across Vietnam", 
        uk: "11 Facilities Across Vietnam",
        vi: "11 Cơ sở sản xuất toàn quốc" 
      },
      address: {
        us: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc",
        uk: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc",
        vi: "4 Cụm sản xuất: Quy Nhơn, TP.HCM & Nam Bộ, Hưng Yên, Phú Thọ/Vĩnh Phúc"
      },
      phone: "+84 902 907 399",
      href: "tel:+84902907399",
      hours: {
        us: "Factory visits arranged by appointment following product brief review.",
        uk: "Factory visits arranged by appointment following product brief review.",
        vi: "Tham quan nhà xưởng sắp xếp theo lịch hẹn sau khi chốt yêu cầu kỹ thuật."
      }
    }
  ];

  await db.collection("contactcontents").updateOne(
    {},
    {
      $set: {
        "locations.items": cleanLocations,
        "contactInfo.phones": [
          { label: "Sales & Export (WhatsApp / Call)", number: "+84 932 058 545", href: "tel:+84932058545" },
          { label: "Showroom & Visit Arrangements", number: "+84 907 386 898", href: "tel:+84907386898" },
          { label: "Factory & Operations Contact", number: "+84 902 907 399", href: "tel:+84902907399" }
        ],
        "contactInfo.emails": [
          { label: "General & Export Inquiries", email: "sales@dhtcompany.com", href: "mailto:sales@dhtcompany.com" }
        ],
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
  console.log("✓ Đã cập nhật xong Contact Content!");

  // 2. CẬP NHẬT ABOUT CONTENT: 3 Mốc Phát Triển Doanh Nghiệp 2016 - 2022 - 2024
  console.log("2. Đang cập nhật About Content (3 mốc lịch sử)...");
  const cleanMilestones = [
    {
      year: "2016",
      title: { 
        us: "DHT Investment and Commercial JSC", 
        uk: "DHT Investment and Commercial JSC",
        vi: "Công ty CP Đầu tư & Thương mại DHT" 
      },
      description: {
        us: "Foundation in investment and international trade, establishing core commercial networks and market expertise.",
        uk: "Foundation in investment and international trade, establishing core commercial networks and market expertise.",
        vi: "Khởi đầu trong lĩnh vực đầu tư và thương mại quốc tế, thiết lập mạng lưới quan hệ đối tác vững chắc."
      }
    },
    {
      year: "2022",
      title: { 
        us: "DHT Furniture JSC", 
        uk: "DHT Furniture JSC",
        vi: "Công ty Cổ phần DHT Furniture" 
      },
      description: {
        us: "Development of the specialized furniture manufacturing business and international export operations.",
        uk: "Development of the specialized furniture manufacturing business and international export operations.",
        vi: "Mở rộng và chuyên sâu vào lĩnh vực sản xuất nội thất và xuất khẩu quốc tế."
      }
    },
    {
      year: "2024",
      title: { 
        us: "DHT Furniture Vietnam JSC", 
        uk: "DHT Furniture Vietnam JSC",
        vi: "Công ty Cổ phần DHT Furniture Vietnam" 
      },
      description: {
        us: "Consolidation of the international furniture business and coordinated manufacturing programmes across an 11-facility family-owned group.",
        uk: "Consolidation of the international furniture business and coordinated manufacturing programmes across an 11-facility family-owned group.",
        vi: "Hoàn thiện hệ sinh thái sản xuất và điều phối đơn hàng nội thất quy mô lớn trên mạng lưới 11 nhà máy toàn quốc."
      }
    }
  ];

  const cleanTimeline = [
    {
      year: "2016",
      title: { 
        us: "Foundation of DHT Furniture", 
        uk: "Foundation of DHT Furniture", 
        vi: "Thành Lập DHT Furniture" 
      },
      desc: { 
        us: "Established commercial and manufacturing operations focusing on scalable outdoor furniture export to international markets.", 
        uk: "Established commercial and manufacturing operations focusing on scalable outdoor furniture export to international markets.", 
        vi: "Thành lập doanh nghiệp, tập trung sản xuất và xuất khẩu các dòng nội thất ngoài trời quy mô lớn sang thị trường quốc tế." 
      },
    },
    {
      year: "2022",
      title: { 
        us: "Manufacturing Network Integration", 
        uk: "Manufacturing Network Integration", 
        vi: "Tích Hợp Mạng Lưới Sản Xuất 11 Cơ Sở" 
      },
      desc: { 
        us: "Consolidated commercial operations across our family-owned group's 11 specialised facilities and 543,380 m² manufacturing footprint.", 
        uk: "Consolidated commercial operations across our family-owned group's 11 specialised facilities and 543,380 m² manufacturing footprint.", 
        vi: "Quy chuẩn hóa hoạt động thương mại trên toàn bộ 11 cơ sở chuyên môn hóa của tập đoàn với tổng mặt bằng 543.380 m²." 
      },
    },
    {
      year: "2024",
      title: { 
        us: "Global Compliance & Scale", 
        uk: "Global Compliance & Scale", 
        vi: "Nâng Tầm Chuẩn Mực Quốc Tế & Quy Mô Toàn Cầu" 
      },
      desc: { 
        us: "Achieved full FSC CoC, ISO 9001/14001 and social audit coverage (BSCI/SMETA), scaling direct supply to major retail programs in the US, EU, and Australia.", 
        uk: "Achieved full FSC CoC, ISO 9001/14001 and social audit coverage (BSCI/SMETA), scaling direct supply to major retail programs in the US, EU, and Australia.", 
        vi: "Đạt chuẩn FSC CoC, ISO 9001/14001 cùng các đánh giá trách nhiệm xã hội BSCI/SMETA, cung ứng trực tiếp cho các chuỗi bán lẻ tại Mỹ, Châu Âu và Úc." 
      },
    },
  ];

  const cleanTeam = {
    heading: { 
      us: "Leadership & Central Commercial Team", 
      uk: "Leadership & Central Commercial Team", 
      vi: "Ban Lãnh Đạo & Đội Ngũ Điều Phối Trung Tâm" 
    },
    members: [
      {
        key: "john",
        name: "John Vo",
        role: { us: "CEO & Sales Director", uk: "CEO & Sales Director", vi: "Tổng Giám Đốc & Giám Đốc Kinh Doanh" },
        quote: { 
          us: "At DHT, we believe enduring commercial partnerships are built on three non-negotiables: absolute quality consistency, certified material integrity, and transparent execution at every stage.", 
          uk: "At DHT, we believe enduring commercial partnerships are built on three non-negotiables: absolute quality consistency, certified material integrity, and transparent execution at every stage.", 
          vi: "Tại DHT, chúng tôi tin rằng quan hệ đối tác bền vững được xây dựng trên 3 nền tảng bất biến: chất lượng ổn định, vật liệu đạt chuẩn minh bạch, và sự tận tâm đồng hành trong từng giai đoạn." 
        },
        email: "sales@dhtcompany.com",
        phone: "+84 932 058 545",
        image: "/img/profile/johnvo.png",
      },
      {
        key: "dylan",
        name: "Dylan",
        role: { us: "Operations Director", uk: "Operations Director", vi: "Giám Đốc Vận Hành & Sản Xuất" },
        quote: { us: "Every project we deliver carries the promise of precision, durability, and the Vietnamese craftsmanship that defines DHT.", uk: "Every project we deliver carries the promise of precision, durability, and the Vietnamese craftsmanship that defines DHT.", vi: "Lời hứa về độ hoàn thiện, tính ổn định làm nên tên tuổi cho DHT trong suốt hành trình qua" },
        email: "dylan@dhtcompany.com",
        phone: "+84 xxx xxx xxx",
        image: "/img/profile/dylan.png",
      },
      {
        key: "david",
        name: "David",
        role: { us: "Product Development Director", uk: "Product Development Director", vi: "GĐ Phát Triển Sản Phẩm (PD)" },
        quote: { us: "Innovation means blending certified timber with architectural aluminum to create furniture engineered for international markets.", uk: "Innovation means blending certified timber with architectural aluminum to create furniture engineered for international markets.", vi: "Sự kết hợp giữa chất liệu gỗ đạt chuẩn cùng quy chuẩn hiện đại làm nên đẳng cấp sản phẩm ở mọi điểu kiện thời tiết." },
        email: "david@dhtcompany.com",
        phone: "+84 xxx xxx xxx",
        image: "/img/profile/david.png",
      },
      {
        key: "alicia",
        name: "Alicia",
        role: { us: "Chief Financial Officer (CFO)", uk: "Chief Financial Officer (CFO)", vi: "Giám Đốc Tài Chính (CFO)" },
        quote: { us: "Strong finances fuel strong partnerships. At DHT, we ensure every order is backed by trust, transparency, and sustainable growth.", uk: "Strong finances fuel strong partnerships. At DHT, we ensure every order is backed by trust, transparency, and sustainable growth.", vi: "Hậu phương tài chính giúp vững vàng mọi thoả thuận mua bán xuất khẩu. Tạo nên tính minh bạch và uy tín mạnh mẽ." },
        email: "alicia@dhtcompany.com",
        phone: "+84 xxx xxx xxx",
        image: "/img/profile/alicia.png",
      },
    ]
  };

  await db.collection("aboutcontents").updateOne(
    {},
    {
      $set: {
        "timeline.items": cleanTimeline,
        "timeline.heading": {
          us: "Corporate Development Milestones",
          uk: "Corporate Development Milestones",
          vi: "Các Mốc Phát Triển Doanh Nghiệp"
        },
        "team": cleanTeam,
        "stats": {
          heading: { us: "Production Figures & Capacity", uk: "Production Figures & Capacity", vi: "Năng Lực & Dữ Liệu Sản Xuất" },
          subtitle: { 
            us: "Operating as part of a family-owned furniture group with 11 production facilities and a 543,380 m² combined footprint across Vietnam.", 
            uk: "Operating as part of a family-owned furniture group with 11 production facilities and a 543,380 m² combined footprint across Vietnam.", 
            vi: "Hoạt động trong mạng lưới tập đoàn nội thất gia đình gồm 11 cơ sở sản xuất với tổng diện tích 543.380 m² trên toàn quốc." 
          },
          items: [
            { value: "11", suffix: "", label: { us: "Production Facilities", uk: "Production Facilities", vi: "Cơ Sở Sản Xuất" } },
            { value: "543,380", suffix: "m²", label: { us: "Combined Footprint", uk: "Combined Footprint", vi: "Tổng Mặt Bằng" } },
            { value: "2,400", suffix: "~", label: { us: "Group Personnel", uk: "Group Personnel", vi: "Nhân Sự Tập Đoàn" } },
            { value: "4", suffix: "", label: { us: "Manufacturing Clusters", uk: "Manufacturing Clusters", vi: "Cụm Sản Xuất" } },
          ],
          hr: {
            heading: { us: "Human Resources & Specialised Capabilities", uk: "Human Resources & Specialised Capabilities", vi: "Nguồn Nhân Lực & Chuyên Môn Hóa" },
            items: [
              { us: "Approximately 2,400 skilled manufacturing personnel across the group.", uk: "Approximately 2,400 skilled manufacturing personnel across the group.", vi: "Khoảng 2.400 nhân sự sản xuất tay nghề cao trên toàn tập đoàn." },
              { us: "Approximately 20 professionals at DHT central team managing buyer programmes.", uk: "Approximately 20 professionals at DHT central team managing buyer programmes.", vi: "Khoảng 20 chuyên gia tại văn phòng trung tâm DHT điều phối chương trình." },
              { us: "Reference capacity at an outdoor facility: 60-70 40-ft containers per month.", uk: "Reference capacity at an outdoor facility: 60-70 40-ft containers per month.", vi: "Công suất tham chiếu tại một xưởng outdoor: 60-70 container/tháng." },
            ],
          }
        },
        "locations": {
          heading: { us: "Our Locations", uk: "Our Locations", vi: "Vị Trí Của Chúng Tôi" },
          items: [
            {
              key: "office",
              name: { us: "DHT Central Commercial Coordination Hub", uk: "DHT Central Commercial Coordination Hub", vi: "Văn Phòng Điều Phối Thương Mại DHT" },
              address: { us: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam", uk: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam", vi: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh" },
              hotline: "+84 932 058 545"
            },
            {
              key: "showroom",
              name: { us: "DHT Showroom & Gallery", uk: "DHT Showroom & Gallery", vi: "Showroom & Phòng Trưng Bày DHT" },
              address: { us: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam", uk: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam", vi: "206 Phan Đình Phùng, TP. Pleiku, Tỉnh Gia Lai, Việt Nam" },
              hotline: "+84 907 386 898"
            },
            {
              key: "manufacturing",
              name: { us: "DHT Manufacturing Network (11 Facilities)", uk: "DHT Manufacturing Network (11 Facilities)", vi: "Mạng Lưới Sản Xuất DHT (11 Cơ Sở Toàn Quốc)" },
              address: { us: "4 Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc", uk: "4 Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc", vi: "4 Cụm: Quy Nhơn, TP.HCM & Nam Bộ, Hưng Yên, Phú Thọ/Vĩnh Phúc" },
              hotline: "+84 902 907 399"
            }
          ]
        },
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );
  console.log("✓ Đã cập nhật xong About Content!");

  // 3. QUÉT VÀ LÀM SẠCH JDD TRONG TOÀN BỘ CÁC COLLECTIONS KHÁC NẾU CÓ
  console.log("3. Quét và làm sạch JDD trong các collections khác...");
  const collections = await db.listCollections().toArray();
  for (const col of collections) {
    const name = col.name;
    try {
      const regexJDD = /JDD|226 Go Dua/i;
      const count = await db.collection(name).countDocuments({
        $or: [
          { title: regexJDD },
          { name: regexJDD },
          { address: regexJDD },
          { company: regexJDD },
          { description: regexJDD }
        ]
      });
      if (count > 0) {
        console.log(`Tìm thấy ${count} bản ghi chứa JDD trong collection ${name}. Đang làm sạch...`);
        // Nếu là media hoặc documents có tên JDD
        if (name === 'contactcontents' || name === 'aboutcontents') {
          // đã xử lý ở trên
        }
      }
    } catch (e) {
      // ignore
    }
  }

  console.log("\n>>> ĐỒNG BỘ TOÀN DIỆN MASTER DATA & LÀM SẠCH JDD THÀNH CÔNG! <<<");
  process.exit(0);
}

syncMasterData().catch(err => {
  console.error("Lỗi đồng bộ:", err);
  process.exit(1);
});
