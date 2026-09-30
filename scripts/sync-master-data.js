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
        uk: "08:00 - 17:00 (UTC+7). Visits by appointment.",
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
        us: "DHT Investment and Commercial Joint Stock Company", 
        uk: "DHT Investment and Commercial Joint Stock Company", 
        vi: "Công ty Cổ phần Đầu tư và Thương mại DHT" 
      },
      description: {
        us: "Foundation in investment and international trade.",
        uk: "Foundation in investment and international trade.",
        vi: "Nền tảng đầu tư và thương mại quốc tế."
      }
    },
    {
      year: "2022",
      title: { 
        us: "DHT Furniture Joint Stock Company", 
        uk: "DHT Furniture Joint Stock Company", 
        vi: "Công ty Cổ phần DHT Furniture" 
      },
      description: {
        us: "Development of the furniture business and export activities.",
        uk: "Development of the furniture business and export activities.",
        vi: "Phát triển hoạt động kinh doanh và xuất khẩu nội thất."
      }
    },
    {
      year: "2024",
      title: { 
        us: "DHT Furniture Vietnam Joint Stock Company", 
        uk: "DHT Furniture Vietnam Joint Stock Company", 
        vi: "Công ty Cổ phần DHT Furniture Vietnam" 
      },
      description: {
        us: "Further development of the international furniture business and coordinated manufacturing programmes.",
        uk: "Further development of the international furniture business and coordinated manufacturing programmes.",
        vi: "Mở rộng phát triển kinh doanh nội thất quốc tế và các chương trình điều phối sản xuất."
      }
    }
  ];

  const cleanTimeline = [
    {
      year: "2016",
      title: { 
        us: "DHT Investment and Commercial Joint Stock Company", 
        uk: "DHT Investment and Commercial Joint Stock Company", 
        vi: "Công ty Cổ phần Đầu tư và Thương mại DHT" 
      },
      desc: { 
        us: "Foundation in investment and international trade.", 
        uk: "Foundation in investment and international trade.", 
        vi: "Nền tảng đầu tư và thương mại quốc tế." 
      },
    },
    {
      year: "2022",
      title: { 
        us: "DHT Furniture Joint Stock Company", 
        uk: "DHT Furniture Joint Stock Company", 
        vi: "Công ty Cổ phần DHT Furniture" 
      },
      desc: { 
        us: "Development of the furniture business and export activities.", 
        uk: "Development of the furniture business and export activities.", 
        vi: "Phát triển hoạt động kinh doanh và xuất khẩu nội thất." 
      },
    },
    {
      year: "2024",
      title: { 
        us: "DHT Furniture Vietnam Joint Stock Company", 
        uk: "DHT Furniture Vietnam Joint Stock Company", 
        vi: "Công ty Cổ phần DHT Furniture Vietnam" 
      },
      desc: { 
        us: "Further development of the international furniture business and coordinated manufacturing programmes.", 
        uk: "Further development of the international furniture business and coordinated manufacturing programmes.", 
        vi: "Mở rộng phát triển kinh doanh nội thất quốc tế và các chương trình điều phối sản xuất." 
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
        phone: "",
        image: "/img/profile/johnvo.png",
      },
      {
        key: "dylan",
        name: "Dylan",
        role: { us: "Operations & Production Coordination", uk: "Operations & Production Coordination", vi: "Vận Hành & Điều Phối Sản Xuất" },
        quote: { us: "Every project we deliver carries the promise of precision, durability, and the Vietnamese craftsmanship that defines DHT.", uk: "Every project we deliver carries the promise of precision, durability, and the Vietnamese craftsmanship that defines DHT.", vi: "Lời hứa về độ hoàn thiện, tính ổn định làm nên tên tuổi cho DHT trong suốt hành trình qua." },
        email: "sales@dhtcompany.com",
        phone: "",
        image: "/img/profile/dylan.png",
      },
      {
        key: "david",
        name: "David",
        role: { us: "Product Development & Engineering", uk: "Product Development & Engineering", vi: "Phát Triển Sản Phẩm & Kỹ Thuật" },
        quote: { us: "Innovation means blending certified timber with architectural aluminum to create furniture engineered for international markets.", uk: "Innovation means blending certified timber with architectural aluminum to create furniture engineered for international markets.", vi: "Sự kết hợp giữa chất liệu gỗ đạt chuẩn cùng quy chuẩn hiện đại làm nên đẳng cấp sản phẩm ở mọi điểu kiện thời tiết." },
        email: "sales@dhtcompany.com",
        phone: "",
        image: "/img/profile/david.png",
      },
      {
        key: "alicia",
        name: "Alicia",
        role: { us: "Finance & Commercial Operations", uk: "Finance & Commercial Operations", vi: "Tài Chính & Điều Phối Thương Mại" },
        quote: { us: "Strong finances fuel strong partnerships. At DHT, we ensure every order is backed by trust, transparency, and sustainable growth.", uk: "Strong finances fuel strong partnerships. At DHT, we ensure every order is backed by trust, transparency, and sustainable growth.", vi: "Hậu phương tài chính giúp vững vàng mọi thoả thuận mua bán xuất khẩu. Tạo nên tính minh bạch và uy tín mạnh mẽ." },
        email: "sales@dhtcompany.com",
        phone: "",
        image: "/img/profile/alicia.png",
      },
    ]
  };

  const cleanWelcome = {
    title: {
      us: "Why Global Buyers Choose DHT?",
      uk: "Why Global Buyers Choose DHT?",
      vi: "Tại Sao Khách Hàng Chọn DHT?"
    },
    description: {
      us: "<p>DHT supports retailers, distributors, and project buyers with reliable outdoor furniture production from Vietnam. We focus on stable quality, flexible production, and long-term partnerships.</p>",
      uk: "<p>DHT supports retailers, distributors, and project buyers with reliable outdoor furniture production from Vietnam. We focus on stable quality, flexible production, and long-term partnerships.</p>",
      vi: "<p>DHT hỗ trợ các nhà bán lẻ, nhà phân phối và nhà thầu với nguồn cung nội thất đáng tin cậy. Tập trung vào chất lượng ổn định, linh hoạt sản xuất và quan hệ đối tác dài hạn.</p>"
    },
    values: [
      {
        title: { us: "Production You Can Trust", uk: "Production You Can Trust", vi: "Sản Xuất Đáng Tin Cậy" },
        desc: { us: "Strict QC, stable quality across orders", uk: "Strict QC, stable quality across orders", vi: "Kiểm soát chất lượng nghiêm ngặt cho mọi đơn hàng" }
      },
      {
        title: { us: "Built for B2B Buyers", uk: "Built for B2B Buyers", vi: "Tối Ưu Cho Khách Hàng B2B" },
        desc: { us: "OEM / ODM, mixed container, scalable production", uk: "OEM / ODM, mixed container, scalable production", vi: "Hỗ trợ OEM/ODM, ghép container, năng lực sản xuất lớn" }
      },
      {
        title: { us: "Export Ready", uk: "Export Ready", vi: "Sẵn Sàng Xuất Khẩu" },
        desc: { us: "On-time delivery, global shipping experience", uk: "On-time delivery, global shipping experience", vi: "Giao hàng đúng hẹn, kinh nghiệm xuất khẩu dày dặn" }
      }
    ]
  };

  await db.collection("aboutcontents").updateOne(
    {},
    {
      $set: {
        "welcome": cleanWelcome,
        "story.milestones": cleanMilestones,
        "timeline.items": cleanTimeline,
        "timeline.heading": {
          us: "Corporate Development Milestones",
          uk: "Corporate Development Milestones",
          vi: "Các Mốc Phát Triển Doanh Nghiệp"
        },
        "marquee": {
          us: [
            "11 Production Facilities",
            "543,380 m² Combined Manufacturing Footprint",
            "Approximately 2,400 Group Personnel",
            "4 Manufacturing Clusters",
          ],
          uk: [
            "11 Production Facilities",
            "543,380 m² Combined Manufacturing Footprint",
            "Approximately 2,400 Group Personnel",
            "4 Manufacturing Clusters",
          ],
          vi: [
            "11 Cơ sở Sản xuất",
            "543.380 m² Tổng diện tích mặt bằng sản xuất",
            "Khoảng 2.400 Nhân sự tập đoàn",
            "4 Cụm sản xuất trọng điểm",
          ],
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
              name: { us: "DHT Central Commercial Coordination Hub", uk: "DHT Central Commercial Coordination Hub", vi: "Văn phòng Điều phối Thương mại DHT" },
              address: { us: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam", uk: "72 Le Thanh Ton Street, Ben Nghe Ward, District 1, Ho Chi Minh City, Vietnam", vi: "72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam" },
              hotline: "+84 932 058 545"
            },
            {
              key: "showroom",
              name: { us: "DHT Showroom & Gallery", uk: "DHT Showroom & Gallery", vi: "Showroom Trưng Bày DHT" },
              address: { us: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam", uk: "206 Phan Dinh Phung Street, Pleiku City, Gia Lai Province, Vietnam", vi: "206 Phan Đình Phùng, TP. Pleiku, Tỉnh Gia Lai, Việt Nam" },
              hotline: "+84 907 386 898"
            },
            {
              key: "manufacturing",
              name: { us: "DHT Manufacturing Network", uk: "DHT Manufacturing Network", vi: "Mạng lưới Nhà máy Sản xuất DHT" },
              address: { us: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc", uk: "4 Manufacturing Clusters: Quy Nhon, HCMC & Southern Corridor, Hung Yen, Phu Tho/Vinh Phuc", vi: "4 Cụm sản xuất: Quy Nhơn, TP.HCM & Nam Bộ, Hưng Yên, Phú Thọ/Vĩnh Phúc" },
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

  // 4. LÀM SẠCH KKK, BUYERSKK, TEST REVISIONS TRONG MONGODB
  console.log("4. Đang làm sạch các bản ghi nháp thử nghiệm...");
  try {
    const deletedRevs = await db.collection("aboutrevisions").deleteMany({
      $or: [
        { note: /kkk|buyerskk|test|sửa/i },
        { "data.welcome.description.uk": /kkk/i },
        { "data.welcome.description.vi": /kkk/i },
        { "data.welcome.values.title.uk": /buyerskk|kk/i }
      ]
    });
    console.log(`✓ Đã dọn sạch ${deletedRevs.deletedCount} bản nháp thử nghiệm trong aboutrevisions!`);
  } catch (err) {
    console.error("Lỗi dọn aboutrevisions:", err);
  }

  // 5. CHUẨN HÓA TÊN VÀ SLUG SẢN PHẨM MASTER (Audit Issue 19 & 20)
  console.log("5. Đang chuẩn hóa tên và slug sản phẩm theo Catalogue Master...");
  try {
    const prodCol = db.collection("products");
    await prodCol.updateOne(
      { $or: [{ productId: 'BLC-COL-0413-5801' }, { code: 'BLC-COL-0609' }, { slug: 'bondi-lougne-collection' }] },
      { $set: { 'name.us': 'BONDI LOUNGE COLLECTION', 'name.uk': 'BONDI LOUNGE COLLECTION', 'name.vi': 'BỘ SƯU TẬP BONDI LOUNGE', slug: 'bondi-lounge-collection' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'MC-COL-0414' }, { code: 'MDC-COL-0607' }, { slug: 'mobley-dinning-collection' }] },
      { $set: { 'name.us': 'MOBLEY DINING COLLECTION', 'name.uk': 'MOBLEY DINING COLLECTION', 'name.vi': 'BỘ SƯU TẬP BÀN ĂN MOBLEY', slug: 'mobley-dining-collection' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'WDC-COL-0413' }, { code: 'WDC-COL-0607' }, { slug: 'wesley-dinning-collection' }] },
      { $set: { 'name.us': 'WESLEY DINING COLLECTION', 'name.uk': 'WESLEY DINING COLLECTION', 'name.vi': 'BỘ SƯU TẬP BÀN ĂN WESLEY', slug: 'wesley-dining-collection' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'RT-TAB-0414' }, { code: 'RT-TAB-0607' }, { slug: 'retangle-table' }] },
      { $set: { 'name.us': 'RECTANGULAR TABLE', 'name.uk': 'RECTANGULAR TABLE', 'name.vi': 'BÀN CHỮ NHẬT NGOÀI TRỜI', slug: 'rectangular-table' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'ST-TAB-0414' }, { code: 'ST-TAB-0607' }] },
      { $set: { 'name.vi': 'BÀN NGOÀI TRỜI SEINA' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'HT-TAB-0414' }, { code: 'HT-TAB-0607' }] },
      { $set: { 'name.vi': 'BÀN NGOÀI TRỜI HAYMONT' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'ALC-COL-0413' }, { code: 'ALC-COL-0607' }] },
      { $set: { 'name.vi': 'BỘ SƯU TẬP ASHTON LOUNGE' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'TLC-COL-0416' }, { code: 'TLC-COL-0607' }] },
      { $set: { 'name.vi': 'BỘ SƯU TẬP TIMOR LOSIL' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'SD0-TAU-0413' }, { code: 'SLC-COL-0608' }] },
      { $set: { 'name.us': 'SANTOS LOUNGE COLLECTION', 'name.uk': 'SANTOS LOUNGE COLLECTION' } }
    );
    await prodCol.updateOne(
      { $or: [{ productId: 'SLC-COL-0413' }, { code: 'SLC-DHT-06012' }] },
      { $set: { 'name.us': 'SANTOS LOUNGE COLLECTION DHT17-141', 'name.uk': 'SANTOS LOUNGE COLLECTION DHT17-141' } }
    );
    console.log("✓ Đã chuẩn hóa tên và slug sản phẩm theo Catalogue Master!");
  } catch (err) {
    console.error("Lỗi chuẩn hóa sản phẩm:", err);
  }

  console.log("\n>>> ĐỒNG BỘ TOÀN DIỆN MASTER DATA & LÀM SẠCH JDD THÀNH CÔNG! <<<");
  process.exit(0);
}

syncMasterData().catch(err => {
  console.error("Lỗi đồng bộ:", err);
  process.exit(1);
});
