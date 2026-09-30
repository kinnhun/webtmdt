const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function updateTimor() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("Thiếu MONGODB_URI trong file .env.local");
    process.exit(1);
  }

  console.log("Đang kết nối tới MongoDB...");
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const result = await db.collection("products").updateOne(
    { slug: "timor-losil-collection" },
    {
      $set: {
        name: {
          us: "TIMOR LOSIL COLLECTION",
          uk: "TIMOR LOSIL COLLECTION",
          vi: "BỘ SƯU TẬP TIMOR LOSIL"
        },
        code: "TLC-COL-0607",
        category: {
          us: "Lounge & Daybeds",
          uk: "Lounge & Daybeds",
          vi: "Lounge & Daybeds"
        },
        material: {
          us: "FSC-Certified Acacia or FSC-Certified Teak",
          uk: "FSC-Certified Acacia or FSC-Certified Teak",
          vi: "Gỗ Keo FSC hoặc Gỗ Tếch FSC"
        },
        fabric: {
          us: "Weather-Resistant Outdoor Fabric",
          uk: "Weather-Resistant Outdoor Fabric",
          vi: "Vải Chuyên Dụng Ngoài Trời Chống Thời Tiết"
        },
        dimensions: "58.66 x 33.07 x 27.76",
        description: {
          us: "The Timor Losil Outdoor Daybed is crafted from solid FSC-certified wood with weather-resistant cushions, offering a clean, contemporary aesthetic for outdoor hospitality and residential programmes.",
          uk: "The Timor Losil Outdoor Daybed is crafted from solid FSC-certified wood with weather-resistant cushions, offering a clean, contemporary aesthetic for outdoor hospitality and residential programmes.",
          vi: "Giường nằm ngoài trời Timor Losil được chế tác từ gỗ tự nhiên có chứng nhận FSC với đệm chuyên dụng ngoài trời, mang lại vẻ đẹp hiện đại, tinh tế cho các dự án nghỉ dưỡng và dân cư cao cấp."
        },
        attributes: [
          {
            icon: "ProfileOutlined",
            titleUS: "TIMOR LOSIL DAYBED WITH CUSHION",
            titleVI: "Giường nằm ngoài trời Timor Losil có đệm",
            titleUK: "TIMOR LOSIL DAYBED WITH CUSHION",
            valueUS: "58.66 x 33.07 x 27.76",
            valueVI: "58.66 x 33.07 x 27.76",
            valueUK: "58.66 x 33.07 x 27.76"
          }
        ],
        specifications: [],
        careInstructions: {
          us: [
            "Clean wood surfaces periodically with a soft damp cloth and mild neutral soap.",
            "Store cushions in a dry protected environment or use breathable protective covers during wet or extreme weather.",
            "Periodically treat with exterior timber oil as recommended to nourish the wood grain."
          ],
          uk: [
            "Clean wood surfaces periodically with a soft damp cloth and mild neutral soap.",
            "Store cushions in a dry protected environment or use breathable protective covers during wet or extreme weather.",
            "Periodically treat with exterior timber oil as recommended to nourish the wood grain."
          ],
          vi: [
            "Vệ sinh bề mặt gỗ định kỳ bằng khăn mềm ẩm và xà phòng trung tính nhẹ.",
            "Bảo quản đệm nệm tại nơi khô thoáng hoặc sử dụng bạt che thoáng khí khi thời tiết xấu.",
            "Thoa dầu dưỡng gỗ chuyên dụng ngoài trời định kỳ để bảo vệ vân gỗ tự nhiên."
          ]
        },
        usageSettings: {
          us: ["Resorts & Hotels", "Poolside Terraces", "Private Patios", "Outdoor Hospitality"],
          uk: ["Resorts & Hotels", "Poolside Terraces", "Private Patios", "Outdoor Hospitality"],
          vi: ["Khu nghỉ dưỡng & Khách sạn", "Sân thượng hồ bơi", "Ban công sân vườn", "Không gian dịch vụ cao cấp"]
        },
        longDescription: {
          us: "<p>The Timor Losil Outdoor Daybed combines structural durability and contemporary design for outdoor hospitality and residential living. Available in solid FSC-certified Acacia or FSC-certified Teak, the frame provides strength and dependable performance across varied climates.</p><p>Its low-profile silhouette with slatted armrests delivers a light, modern aesthetic, while thick outdoor-grade cushions ensure comfort and straightforward maintenance. Wood species selection (FSC Acacia or FSC Teak), surface finishes, fabric options and set composition are confirmed for each quotation.</p>",
          uk: "<p>The Timor Losil Outdoor Daybed combines structural durability and contemporary design for outdoor hospitality and residential living. Available in solid FSC-certified Acacia or FSC-certified Teak, the frame provides strength and dependable performance across varied climates.</p><p>Its low-profile silhouette with slatted armrests delivers a light, modern aesthetic, while thick outdoor-grade cushions ensure comfort and straightforward maintenance. Wood species selection (FSC Acacia or FSC Teak), surface finishes, fabric options and set composition are confirmed for each quotation.</p>",
          vi: "<p>Giường nằm ngoài trời Timor Losil kết hợp độ bền kết cấu và thiết kế đương đại cho không gian mở nghỉ dưỡng và dân cư. Khung sản phẩm được sản xuất từ gỗ Keo hoặc gỗ Tếch có chứng chỉ FSC, đảm bảo độ vững chắc và khả năng thích ứng thời tiết bền bỉ.</p><p>Kiểu dáng dạng thấp với tay vịn nan gỗ mang lại vẻ đẹp thanh lịch, hiện đại, kết hợp cùng lớp đệm dày chuyên dụng ngoài trời êm ái và dễ bảo dưỡng. Tùy chọn loài gỗ (Keo FSC hoặc Tếch FSC), hoàn thiện bề mặt, thông số vải đệm và cấu hình thành phần được xác nhận cụ thể theo từng báo giá.</p>"
        }
      }
    }
  );

  console.log("Updated Timor Losil product:", result.matchedCount, result.modifiedCount);
  await mongoose.disconnect();
}

updateTimor().catch(err => {
  console.error("Lỗi:", err);
  process.exit(1);
});
