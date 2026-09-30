const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function updateContactMaster() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Thiếu MONGODB_URI trong file .env.local");
    process.exit(1);
  }

  console.log("Đang kết nối tới MongoDB...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const canonicalFields = [
    {
      id: "f_name",
      key: "name",
      label: {
        us: "<p>Full Name</p>",
        uk: "<p>Full Name</p>",
        vi: "<p>Họ và tên</p>"
      },
      type: "text",
      required: true,
      width: "half",
      isDeletable: false,
      options: []
    },
    {
      id: "f_email",
      key: "email",
      label: {
        us: "<p>Business Email</p>",
        uk: "<p>Business Email</p>",
        vi: "<p>Email doanh nghiệp</p>"
      },
      type: "email",
      required: true,
      width: "half",
      isDeletable: false,
      options: []
    },
    {
      id: "f_company",
      key: "company",
      label: {
        us: "<p>Company</p>",
        uk: "<p>Company</p>",
        vi: "<p>Tên công ty / Doanh nghiệp</p>"
      },
      type: "text",
      required: true,
      width: "half",
      isDeletable: false,
      options: []
    },
    {
      id: "f_phone",
      key: "phone",
      label: {
        us: "<p>Phone / WhatsApp</p>",
        uk: "<p>Phone / WhatsApp</p>",
        vi: "<p>Số điện thoại / WhatsApp (Tùy chọn)</p>"
      },
      type: "tel",
      required: false,
      width: "half",
      isDeletable: false,
      options: []
    },
    {
      id: "f_category",
      key: "category",
      label: {
        us: "<p>Inquiry Type</p>",
        uk: "<p>Inquiry Type</p>",
        vi: "<p>Loại yêu cầu / Danh mục</p>"
      },
      type: "select",
      required: true,
      width: "full",
      isDeletable: false,
      options: [
        {
          key: "outdoor",
          label: {
            us: "Outdoor Furniture Programme",
            uk: "Outdoor Furniture Programme",
            vi: "Chương trình Ngoại thất Outdoor"
          }
        },
        {
          key: "indoor",
          label: {
            us: "Indoor Furniture Programme",
            uk: "Indoor Furniture Programme",
            vi: "Chương trình Nội thất Indoor"
          }
        },
        {
          key: "project",
          label: {
            us: "Custom Project & Contract / Hospitality",
            uk: "Custom Project & Contract / Hospitality",
            vi: "Dự án Khách sạn & Công trình (Project & Hospitality)"
          }
        },
        {
          key: "oem",
          label: {
            us: "OEM / ODM Manufacturing & Sampling",
            uk: "OEM / ODM Manufacturing & Sampling",
            vi: "Sản xuất Gia công OEM/ODM & Mẫu thử"
          }
        },
        {
          key: "other",
          label: {
            us: "Other Commercial Inquiry",
            uk: "Other Commercial Inquiry",
            vi: "Yêu cầu thương mại khác"
          }
        }
      ]
    },
    {
      id: "f_subject",
      key: "subject",
      label: {
        us: "<p>Subject</p>",
        uk: "<p>Subject</p>",
        vi: "<p>Tiêu đề yêu cầu</p>"
      },
      type: "text",
      required: true,
      width: "full",
      isDeletable: false,
      options: []
    },
    {
      id: "f_message",
      key: "message",
      label: {
        us: "<p>Message</p>",
        uk: "<p>Message</p>",
        vi: "<p>Nội dung yêu cầu chi tiết</p>"
      },
      type: "textarea",
      required: true,
      width: "full",
      isDeletable: false,
      options: []
    }
  ];

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

  const updateDoc = {
    hero: {
      title: {
        us: "<p>Contact DHT Furniture Vietnam</p>",
        uk: "<p>Contact DHT Furniture Vietnam</p>",
        vi: "<p>Liên hệ DHT Furniture Vietnam</p>"
      },
      subtitle: {
        us: "<p>Tell us about your product requirements, target market and estimated order volume. Our team will help you identify the next steps for product selection, sampling or an OEM programme.</p>",
        uk: "<p>Tell us about your product requirements, target market and estimated order volume. Our team will help you identify the next steps for product selection, sampling or an OEM programme.</p>",
        vi: "<p>Chia sẻ với chúng tôi về yêu cầu sản phẩm, thị trường mục tiêu và số lượng đơn hàng dự kiến. Đội ngũ DHT sẽ hỗ trợ các bước tiếp theo về lựa chọn mẫu, phát triển sản phẩm mẫu hoặc chương trình sản xuất OEM.</p>"
      }
    },
    formSection: {
      title: {
        us: "<p>Send an Inquiry</p>",
        uk: "<p>Send an Inquiry</p>",
        vi: "<p>Gửi Yêu Cầu Dự Án</p>"
      },
      subtitle: {
        us: "<p>Tell us about your product requirements, target market and estimated order volume. Our team aims to respond within one business day.</p>",
        uk: "<p>Tell us about your product requirements, target market and estimated order volume. Our team aims to respond within one business day.</p>",
        vi: "<p>Chia sẻ yêu cầu kỹ thuật, thị trường mục tiêu và sản lượng ước tính. Đội ngũ DHT phản hồi trong vòng 1 ngày làm việc.</p>"
      },
      fields: canonicalFields,
      successTitle: {
        us: "<p>Thank You!</p>",
        uk: "<p>Thank You!</p>",
        vi: "<p>Cảm ơn bạn!</p>"
      },
      successDesc: {
        us: "<p>Your inquiry has been received. Our team aims to respond within one business day.</p>",
        uk: "<p>Your inquiry has been received. Our team aims to respond within one business day.</p>",
        vi: "<p>Yêu cầu của bạn đã được tiếp nhận. Đội ngũ DHT sẽ phản hồi trong vòng 1 ngày làm việc.</p>"
      },
      sendAnotherBtn: {
        us: "Send another inquiry",
        uk: "Send another inquiry",
        vi: "Gửi yêu cầu khác"
      }
    },
    locations: {
      heading: {
        us: "<p>Our Office, Showroom & Manufacturing Locations</p>",
        uk: "<p>Our Office, Showroom & Manufacturing Locations</p>",
        vi: "<p>Địa Điểm Văn Phòng, Showroom & Mạng Lưới Sản Xuất</p>"
      },
      items: cleanLocations
    },
    seo: {
      title: {
        us: "Contact DHT Furniture Vietnam — Outdoor • Indoor • Project Furniture",
        uk: "Contact DHT Furniture Vietnam — Outdoor • Indoor • Project Furniture",
        vi: "Liên hệ DHT Furniture Vietnam — Nội thất Ngoài trời • Trong nhà • Dự án"
      },
      description: {
        us: "Contact DHT Furniture Vietnam for scalable outdoor, indoor, and contract project programmes. 11 manufacturing facilities across Vietnam.",
        uk: "Contact DHT Furniture Vietnam for scalable outdoor, indoor, and contract project programmes. 11 manufacturing facilities across Vietnam.",
        vi: "Liên hệ DHT Furniture Vietnam cho các chương trình nội ngoại thất và dự án thương mại quy mô lớn. 11 cơ sở sản xuất trên toàn quốc."
      }
    },
    updatedAt: new Date()
  };

  const res = await db.collection("contactcontents").updateOne({}, { $set: updateDoc }, { upsert: true });
  console.log("Updated contactcontents in MongoDB:", res.matchedCount, res.modifiedCount, res.upsertedId);
  await mongoose.disconnect();
}

updateContactMaster().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
