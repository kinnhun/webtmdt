const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>DHT Furniture Vietnam - Master SEO & Brand Playbook 2026</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

    @page {
      size: A4 portrait;
      margin: 14mm 14mm 14mm 14mm;
      @bottom-right {
        content: counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        color: #718096;
      }
      @bottom-left {
        content: "DHT Furniture Vietnam • Master SEO & Brand Playbook 2026 • dhtcompany.com";
        font-family: 'Inter', sans-serif;
        font-size: 8pt;
        color: #718096;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 9pt;
      line-height: 1.5;
      color: #1a202c;
      background: #ffffff;
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
    }

    .doc-page {
      height: 269mm;
      max-height: 269mm;
      overflow: hidden;
      page-break-after: always;
      break-after: page;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;
    }

    /* COVER PAGE */
    .cover-page {
      height: 269mm;
      max-height: 269mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 22mm 16mm 14mm 16mm;
      background: linear-gradient(145deg, #0b1d15 0%, #173C2C 60%, #1f4e39 100%);
      color: #ffffff;
      border-radius: 6px;
      page-break-after: always;
      break-after: page;
    }

    .cover-top {
      border-bottom: 2px solid rgba(185, 120, 70, 0.4);
      padding-bottom: 12mm;
    }

    .cover-tag {
      display: inline-block;
      padding: 3.5px 12px;
      background: rgba(185, 120, 70, 0.25);
      border: 1px solid #B97846;
      border-radius: 30px;
      font-size: 8pt;
      font-weight: 600;
      color: #f7d794;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10mm;
    }

    .cover-title {
      font-family: 'Playfair Display', serif;
      font-size: 25pt;
      line-height: 1.25;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 4mm;
    }

    .cover-subtitle {
      font-size: 11.5pt;
      font-weight: 400;
      color: #cbd5e0;
      line-height: 1.45;
      max-width: 95%;
    }

    .cover-mid {
      padding: 6mm 0;
    }

    .cover-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4.5mm;
    }

    .cover-card {
      background: rgba(255, 255, 255, 0.08);
      border-left: 3px solid #B97846;
      padding: 3.5mm 4.5mm;
      border-radius: 3px;
    }

    .cover-card-label {
      font-size: 7pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #a0aec0;
      margin-bottom: 1mm;
    }

    .cover-card-val {
      font-size: 9.5pt;
      font-weight: 600;
      color: #ffffff;
    }

    .cover-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      padding-top: 6mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 8pt;
      color: #a0aec0;
    }

    /* HEADER BAR */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 1.8mm;
      margin-bottom: 3.5mm;
      font-size: 7.5pt;
      color: #718096;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    /* TYPOGRAPHY */
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 16pt;
      line-height: 1.25;
      color: #173C2C;
      font-weight: 700;
      margin-bottom: 2.5mm;
      border-bottom: 2px solid #173C2C;
      padding-bottom: 1.5mm;
    }

    h2 {
      font-size: 11pt;
      line-height: 1.3;
      color: #173C2C;
      font-weight: 700;
      margin-top: 3mm;
      margin-bottom: 1.8mm;
      display: flex;
      align-items: center;
      gap: 1.5mm;
    }

    h2::before {
      content: "";
      display: inline-block;
      width: 3.5px;
      height: 13px;
      background: #B97846;
      border-radius: 2px;
    }

    p {
      margin-bottom: 2mm;
      text-align: justify;
      font-size: 8.8pt;
    }

    ul, ol {
      margin-left: 4.5mm;
      margin-bottom: 2mm;
      font-size: 8.8pt;
    }

    li {
      margin-bottom: 1mm;
    }

    /* CALLOUT BOXES */
    .callout {
      padding: 3mm 4mm;
      border-radius: 4px;
      margin: 2.5mm 0;
      font-size: 8.5pt;
      line-height: 1.45;
    }

    .callout-gold {
      background: #fdfaf3;
      border-left: 3.5px solid #B97846;
      color: #744210;
    }

    .callout-green {
      background: #f0f7f3;
      border-left: 3.5px solid #173C2C;
      color: #133827;
    }

    .callout-red {
      background: #fff5f5;
      border-left: 3.5px solid #e53e3e;
      color: #9b2c2c;
    }

    .callout-title {
      font-weight: 700;
      font-size: 8.8pt;
      margin-bottom: 1mm;
      display: flex;
      align-items: center;
      gap: 1.5mm;
    }

    /* TABLES */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2mm 0;
      font-size: 8.2pt;
      line-height: 1.35;
    }

    th, td {
      border: 1px solid #e2e8f0;
      padding: 1.8mm 2.2mm;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #173C2C;
      color: #ffffff;
      font-weight: 600;
      font-size: 8pt;
    }

    tr:nth-child(even) td {
      background: #f8fafc;
    }

    /* BADGES */
    .badge {
      display: inline-block;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 7pt;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }

    .badge-p0 { background: #fee2e2; color: #991b1b; border: 1px solid #f87171; }
    .badge-p1 { background: #fef3c7; color: #92400e; border: 1px solid #fcd34d; }
    .badge-green { background: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .badge-blue { background: #e0f2fe; color: #075985; border: 1px solid #7dd3fc; }

    /* CODE & URL */
    code, .url-text {
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 7.8pt;
      background: #edf2f7;
      padding: 1px 3px;
      border-radius: 3px;
      color: #2b6cb0;
    }

    /* KEY METRICS GRID */
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2.5mm;
      margin: 2.5mm 0;
    }

    .metric-box {
      background: #f8fbf9;
      border: 1px solid #c6e2d3;
      padding: 2.5mm;
      text-align: center;
      border-radius: 4px;
    }

    .metric-val {
      font-size: 12pt;
      font-weight: 800;
      color: #173C2C;
      margin-bottom: 0.5mm;
    }

    .metric-lbl {
      font-size: 7pt;
      font-weight: 500;
      color: #4a5568;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* TOC */
    .toc-item {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px dotted #cbd5e0;
      padding: 1.6mm 0;
      font-size: 8.6pt;
    }
    .toc-title { font-weight: 600; color: #2d3748; }
    .toc-page { color: #718096; font-family: 'JetBrains Mono', monospace; font-size: 8pt; }
  </style>
</head>
<body>

  <!-- TRANG 1: COVER -->
  <div class="cover-page">
    <div class="cover-top">
      <div class="cover-tag">DHT FURNITURE VIETNAM • MASTER SEO & BRAND PLAYBOOK 2026</div>
      <div class="cover-title">CẨM NANG TOÀN DIỆN VỀ THƯƠNG HIỆU, SẢN PHẨM & CHIẾN LƯỢC SEO QUỐC TẾ</div>
      <div class="cover-subtitle">Tài liệu định hướng chuẩn mực kỹ thuật SEO, cấu trúc website, danh mục sản phẩm và quy chuẩn truyền thông B2B Export cho dhtcompany.com</div>
    </div>

    <div class="cover-mid">
      <div class="cover-grid">
        <div class="cover-card">
          <div class="cover-card-label">Đối Tượng Sử Dụng</div>
          <div class="cover-card-val">SEO Specialist, Content Lead, Agency & Marketing Team</div>
        </div>
        <div class="cover-card">
          <div class="cover-card-label">Mô Hình Doanh Nghiệp</div>
          <div class="cover-card-val">B2B Furniture Manufacturer & Exporter (Family Group)</div>
        </div>
        <div class="cover-card">
          <div class="cover-card-label">Hạ Tầng Sản Xuất</div>
          <div class="cover-card-val">11 Nhà Máy • 543.800 m² Mặt Bằng • ~2.400 Nhân Sự</div>
        </div>
        <div class="cover-card">
          <div class="cover-card-label">Thị Trường Trọng Điểm</div>
          <div class="cover-card-val">USA, UK, European Union, Canada, Australia, Middle East</div>
        </div>
      </div>
    </div>

    <div class="cover-bottom">
      <div>
        <strong>DHT FURNITURE VIETNAM JOINT STOCK COMPANY</strong><br>
        Commercial Hub: Vincom Center, 72 Le Thanh Ton, District 1, Ho Chi Minh City<br>
        Web: <code>https://dhtcompany.com</code> | Contact: <code>sales@dhtcompany.com</code>
      </div>
      <div style="text-align: right;">
        <strong>Phiên bản:</strong> Master 2026.1<br>
        <strong>Căn cứ:</strong> Profile 2026 & Website Audit Directive
      </div>
    </div>
  </div>

  <!-- TRANG 2: MỤC LỤC & ĐỊNH HƯỚNG B2B -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Mục Lục & Tổng Quan Tài Liệu</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>MỤC LỤC TÀI LIỆU</h1>
    <p>Tài liệu này được biên soạn chuyên biệt cho <strong>chuyên viên SEO (SEO Specialist / Agency)</strong> và đội ngũ phụ trách phát triển nội dung, kỹ thuật web nhằm cung cấp hiểu biết thấu đáo, chính xác 100% về bản chất doanh nghiệp, năng lực sản xuất, danh mục sản phẩm và chiến lược từ khóa B2B xuất khẩu toàn cầu.</p>

    <div style="margin: 4mm 0;">
      <div class="toc-item">
        <span class="toc-title">PHẦN 1: BẢN CHẤT DOANH NGHIỆP & THƯƠNG HIỆU DHT FURNITURE VIETNAM</span>
        <span class="toc-page">Trang 03</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 2: CHÂN DUNG KHÁCH HÀNG MỤC TIÊU & Ý ĐỊNH TÌM KIẾM B2B (SEARCH INTENT)</span>
        <span class="toc-page">Trang 04</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 3: HỆ THỐNG 11 NHÀ MÁY & 4 CỤM SẢN XUẤT (543.800 M²)</span>
        <span class="toc-page">Trang 05</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 4: KIẾN TRÚC WEBSITE & CẤU TRÚC URL ĐA NGÔN NGỮ (IA & SITEMAP)</span>
        <span class="toc-page">Trang 06</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 5: DANH MỤC SẢN PHẨM & CÁC BỘ SƯU TẬP TIÊU BIỂU (OUTDOOR & INDOOR)</span>
        <span class="toc-page">Trang 07</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 6: CHIẾN LƯỢC VẬT LIỆU & CAM KẾT GỖ 100% FSC (CONTENT CLUSTERS)</span>
        <span class="toc-page">Trang 09</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 7: MA TRẬN TỪ KHÓA B2B XUẤT KHẨU (KEYWORD UNIVERSE & CLUSTERS)</span>
        <span class="toc-page">Trang 10</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 8: QUY CHUẨN ON-PAGE SEO, METADATA & SCHEMA.ORG (TECHNICAL RULES)</span>
        <span class="toc-page">Trang 11</span>
      </div>
      <div class="toc-item">
        <span class="toc-title">PHẦN 9: 4 ĐIỀU CẤM KỴ TUYỆT ĐỐI & QUY TẮC NGHIỆM THU SEO TỪ CEO</span>
        <span class="toc-page">Trang 12</span>
      </div>
    </div>

    <div class="callout callout-green" style="margin-top: 3mm;">
      <div class="callout-title">💡 NGUYÊN LÝ CỐT LÕI DÀNH CHO SEO SPECIALIST:</div>
      <strong>DHT Furniture Vietnam là nhà sản xuất & xuất khẩu B2B theo chương trình quy mô lớn (FOB/CIF), hoàn toàn KHÔNG PHẢI là showroom bán lẻ nội thất B2C nội địa.</strong> Mọi chiến dịch từ khóa, content angle, landing page và meta tag phải hướng tới các Buyer quốc tế (nhà nhập khẩu, chuỗi bán lẻ, nhà thầu dự án resort/khách sạn, brand owners) chứ không nhắm tới người tiêu dùng cá nhân mua lẻ từng chiếc ghế.
    </div>

    <div class="callout callout-gold" style="margin-top: 2mm;">
      <div class="callout-title">🎯 MỤC TIÊU CHUYỂN ĐỔI (CONVERSION GOALS) CỦA WEBSITE:</div>
      Người dùng mục tiêu của website không tìm nút "Add to Cart". Website được tối ưu để thu về:
      <ul style="margin-top: 1mm; margin-bottom: 0;">
        <li><strong>Inquiry gửi báo giá (Request a Quote / Request a Product Proposal)</strong> từ các Buyer quốc tế.</li>
        <li><strong>Tải tài liệu Company Profile 2026 chính thức (PDF)</strong> về máy để trình ban giám đốc đối tác.</li>
        <li><strong>Đăng ký lịch khảo sát nhà xưởng (Schedule a Factory Visit)</strong> trực tiếp tại Việt Nam.</li>
      </ul>
    </div>
  </div>

  <!-- TRANG 3: PHẦN 1 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 1: Bản Chất Doanh Nghiệp & Thương Hiệu</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 1: BẢN CHẤT DOANH NGHIỆP & THƯƠNG HIỆU DHT</h1>

    <h2>1.1. Thông Tin Nhận Diện Pháp Nhân & Thương Hiệu</h2>
    <table>
      <tr>
        <th style="width: 28%;">Hạng Mục</th>
        <th style="width: 72%;">Nội Dung Chuẩn Xác (Bắt Buộc Sử Dụng)</th>
      </tr>
      <tr>
        <td><strong>Brand Name (Tiếng Anh)</strong></td>
        <td><strong>DHT Furniture Vietnam</strong> (hoặc rút gọn: <strong>DHT Furniture</strong>)</td>
      </tr>
      <tr>
        <td><strong>Full Legal Entity</strong></td>
        <td><strong>DHT Furniture Vietnam Joint Stock Company</strong> (Viết tắt: <em>DHT Furniture Vietnam JSC</em>; Tiếng Việt: <em>Công ty Cổ phần DHT Furniture Vietnam</em>)</td>
      </tr>
      <tr>
        <td><strong>Website Chính Thức</strong></td>
        <td><code class="url-text">https://dhtcompany.com</code> (Domain quốc tế, HTTPS, có phiên bản đa ngôn ngữ en-US, en-GB, vi-VN)</td>
      </tr>
      <tr>
        <td><strong>Văn Phòng Thương Mại</strong></td>
        <td>L17-11, Tầng 17, Tòa nhà Vincom Center, 72 Lê Thánh Tôn, Phường Sài Gòn (Bến Nghé), Quận 1, TP. Hồ Chí Minh, Việt Nam</td>
      </tr>
      <tr>
        <td><strong>Showroom & Gallery</strong></td>
        <td>206 Phan Đình Phùng, Phường Tây Sơn, TP. Pleiku, Tỉnh Gia Lai, Việt Nam</td>
      </tr>
      <tr>
        <td><strong>Email & Hotline Liên Hệ</strong></td>
        <td>Email: <code>sales@dhtcompany.com</code> | Phone / WhatsApp: <code>+84 932 058 545</code> (Kênh tiếp nhận inquiry chính)</td>
      </tr>
    </table>

    <h2>1.2. Mô Hình Hoạt Động 3 Tầng Độc Đáo (The 3-Tier Operating Model)</h2>
    <p>Một lỗi phổ biến của người làm SEO là chỉ mô tả DHT như một xưởng gỗ nhỏ lẻ tại Bình Định. Thực tế, mô hình của DHT mang tính tập đoàn với năng lực quản lý chuỗi cung ứng toàn diện:</p>

    <div style="background: #f8fafc; border: 1px solid #cbd5e0; border-radius: 4px; padding: 3mm 4mm; margin: 2mm 0; font-size: 8.2pt; line-height: 1.45;">
      <strong>TẦNG 1: INTERNATIONAL BUYERS (Khách Hàng Quốc Tế)</strong>: Chuỗi bán lẻ (Target, Walmart, John Lewis...), Wholesalers, Chủ đầu tư resort/khách sạn.<br>
      <div style="text-align: center; color: #B97846; font-weight: bold; margin: 0.5mm 0;">▼ Tiếp xúc, đàm phán hợp đồng, bảo mật thương mại, quản lý chương trình ▼</div>
      <strong>TẦNG 2: DHT FURNITURE VIETNAM (Pháp Nhân Điều Phối Trung Tâm)</strong>: ~20 chuyên gia tại TP.HCM quản lý R&D, thiết kế kỹ thuật (BOM), làm mẫu (7–14 ngày), giám sát 6 cửa QC độc lập, thủ tục xuất khẩu.<br>
      <div style="text-align: center; color: #B97846; font-weight: bold; margin: 0.5mm 0;">▼ Phân bổ đơn hàng theo chuyên môn hóa xưởng & giám sát tại chỗ ▼</div>
      <strong>TẦNG 3: FAMILY'S MANUFACTURING BASE (11 Nhà Máy Gia Đình)</strong>: 543.800 m² mặt bằng, ~2.400 công nhân lành nghề và kỹ sư chế tác trên toàn quốc.
    </div>

    <h2>1.3. Lịch Sử Phát Triển Doanh Nghiệp (Corporate Milestones)</h2>
    <ul>
      <li><strong>2016 – Foundation (Thành lập)</strong>: <em>DHT Investment and Commercial Joint Stock Company</em>, hoạt động ban đầu trong lĩnh vực đầu tư thương mại quốc tế.</li>
      <li><strong>2022 – Expansion (Mở rộng quy mô)</strong>: <em>DHT Furniture Joint Stock Company</em>, mở rộng quy mô sản xuất gỗ và đẩy mạnh xuất khẩu toàn cầu.</li>
      <li><strong>2024 đến nay – Scale & Today (Vươn tầm quốc tế)</strong>: <em>DHT Furniture Vietnam Joint Stock Company</em> – Tích hợp toàn diện chuỗi cung ứng sản xuất 11 nhà máy, phục vụ các chương trình nội ngoại thất quy mô lớn cho đối tác toàn cầu.</li>
    </ul>

    <div class="metric-grid">
      <div class="metric-box">
        <div class="metric-val">11</div>
        <div class="metric-lbl">Cơ Sở Sản Xuất</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">543.800 m²</div>
        <div class="metric-lbl">Mặt Bằng Nhà Máy</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">~2.400</div>
        <div class="metric-lbl">Nhân Sự Tập Đoàn</div>
      </div>
      <div class="metric-box">
        <div class="metric-val">100% FSC</div>
        <div class="metric-lbl">Gỗ Rừng Trồng Có Chứng Chỉ</div>
      </div>
    </div>
  </div>

  <!-- TRANG 4: PHẦN 2 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 2: Khách Hàng Mục Tiêu & Search Intent</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 2: CHÂN DUNG KHÁCH HÀNG MỤC TIÊU & SEARCH INTENT B2B</h1>

    <h2>2.1. Chân Dung Nhà Mua Hàng Quốc Tế (B2B Buyer Personas)</h2>
    <p>Mỗi nội dung SEO, bài blog phân tích hoặc trang danh mục cần phải trả lời chính xác các mối bận tâm (Pain Points & Buying Triggers) của 4 nhóm đối tượng người mua sau:</p>

    <table>
      <tr>
        <th style="width: 22%;">Nhóm Khách Hàng</th>
        <th style="width: 38%;">Mục Tiêu & Mối Quan Tâm Cốt Lõi</th>
        <th style="width: 40%;">Ý Định Tìm Kiếm (Search Intent & Queries)</th>
      </tr>
      <tr>
        <td><strong>1. Retail Chains & Department Stores</strong><br><span class="badge badge-blue">USA, UK, EU, AU</span></td>
        <td>
          • Tìm nhà máy gia công quy mô lớn, giao hàng đúng hạn (OTIF).<br>
          • Đóng gói chuẩn bán lẻ (Retail-ready packaging, ISTA 3A drop test).<br>
          • Thiết kế tháo lắp (KD / Flat-pack) tối ưu số lượng xếp công (CBM).<br>
          • Giá FOB cạnh tranh tại cảng Cát Lái/Quy Nhơn/Hải Phòng.
        </td>
        <td>
          <code>vietnam outdoor furniture supplier for retail chains</code><br>
          <code>high volume acacia garden furniture manufacturer</code><br>
          <code>flat pack patio furniture factory vietnam</code><br>
          <code>fob vietnam furniture wholesale suppliers</code>
        </td>
      </tr>
      <tr>
        <td><strong>2. Wholesalers & Brand Importers</strong><br><span class="badge badge-green">Nhà Bán Buôn & Chủ Brand</span></td>
        <td>
          • Hỗ trợ ODM/OEM: Tùy biến thiết kế độc quyền từ bản vẽ.<br>
          • Khả năng mix nhiều SKU trong cùng 1 container (tối đa 3 SKU/40'HC).<br>
          • Tốc độ ra mẫu nhanh (Sampling 7–14 ngày) để kịp mùa bán hàng.<br>
          • Độ ổn định chất lượng qua từng lô hàng xuất khẩu (FTPR).
        </td>
        <td>
          <code>oem outdoor furniture manufacturer vietnam</code><br>
          <code>custom teak patio dining set supplier</code><br>
          <code>vietnam mixed material furniture factory low moq</code><br>
          <code>furniture prototype development factory vietnam</code>
        </td>
      </tr>
      <tr>
        <td><strong>3. Hospitality & Commercial Contractors</strong><br><span class="badge badge-p1">Resort / Khách Sạn / Dự Án</span></td>
        <td>
          • Độ bền chịu thời tiết khắc nghiệt (nắng gắt, gió biển muối mặn).<br>
          • Nhôm sơn tĩnh điện cao cấp (AkzoNobel/Tiger), gỗ Teak chống ẩm.<br>
          • Nệm vải ngoài trời kháng UV, mút thoát nước nhanh (Quick-dry foam).<br>
          • Đáp ứng tiêu chuẩn an toàn công cộng (EN 581, CA TB117, BS 5852).
        </td>
        <td>
          <code>commercial grade outdoor furniture vietnam</code><br>
          <code>hotel resort poolside sunlounger manufacturer</code><br>
          <code>contract furniture supplier for hospitality projects</code><br>
          <code>weather resistant restaurant patio chairs wholesale</code>
        </td>
      </tr>
      <tr>
        <td><strong>4. Sourcing Agents & Compliance Officers</strong><br><span class="badge badge-p0">Đơn Vị Kiểm Định & Cung Ứng</span></td>
        <td>
          • Bằng chứng nguồn gốc gỗ hợp pháp 100% (EUDR, US Lacey Act).<br>
          • Trách nhiệm xã hội & đạo đức lao động (SMETA, BSCI, ISO 9001).<br>
          • Kiểm định formaldehyde khắt khe (CARB P2, TSCA Title VI).<br>
          • Khử trùng sinh học, hun trùng chuẩn xuất khẩu (ISPM 15, BMSB).
        </td>
        <td>
          <code>eudr compliant furniture manufacturer vietnam</code><br>
          <code>fsc certified timber garden furniture factory</code><br>
          <code>vietnam audited furniture factory bsci smeta</code><br>
          <code>tsca title vi compliant wood furniture supplier</code>
        </td>
      </tr>
    </table>

    <h2>2.2. Sự Khác Biệt Giữa SEO B2B Xuất Khẩu và SEO B2C Nội Địa</h2>
    <div class="callout callout-gold">
      <div class="callout-title">⚠️ ĐIỀU CHỈNH TƯ DUY TỪ KHÓA CHO CHIẾN DỊCH SEO:</div>
      <ul style="margin-bottom: 0;">
        <li><strong>KHÔNG target từ khóa người dùng cá nhân</strong>: Tránh các từ khóa như <em>"mua ghế sofa giá rẻ", "bàn ăn gia đình đẹp", "cửa hàng nội thất tphcm", "free shipping furniture"</em>.</li>
        <li><strong>TẬP TRUNG vào từ khóa B2B Purchasing</strong>: Luôn kết hợp các thuật ngữ thương mại như: <em>Manufacturer, Supplier, Exporter, Factory, Wholesale, OEM/ODM, Contract, Bulk order, Container load, FOB Vietnam, Trade discount, Product specifications</em>.</li>
        <li><strong>Call To Action (CTA) chuyển đổi</strong>: Không có nút <em>"Thêm vào giỏ hàng"</em> hay <em>"Mua ngay"</em>. Mục tiêu tối thượng của SEO là chuyển đổi organic traffic thành: <strong>Request a Product Proposal</strong>, <strong>Request Quote for this Collection</strong>, <strong>Download Company Profile 2026 (PDF)</strong>, hoặc <strong>Schedule Factory Visit</strong>.</li>
      </ul>
    </div>
  </div>

  <!-- TRANG 5: PHẦN 3 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 3: Hạ Tầng 11 Nhà Máy & 4 Cụm Sản Xuất</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 3: HỆ THỐNG 11 NHÀ MÁY & 4 CỤM SẢN XUẤT (543.800 M²)</h1>
    <p>Hạ tầng sản xuất là một trong những <strong>tín hiệu E-E-A-T (Chuyên môn, Thẩm quyền và Độ tin cậy)</strong> mạnh mẽ nhất trên website DHT. Khi xây dựng trang <code class="url-text">/manufacturing</code> và các bài viết về năng lực xưởng, chuyên viên SEO phải dẫn chứng chi tiết 11 cơ sở thuộc 4 cụm sau:</p>

    <table>
      <tr>
        <th style="width: 14%;">Cụm</th>
        <th style="width: 11%;">Cơ Sở</th>
        <th style="width: 25%;">Vị Trí & Khu Công Nghiệp</th>
        <th style="width: 13%;">Mặt Bằng</th>
        <th style="width: 37%;">Năng Lực Kỹ Thuật & Chuyên Môn Hóa</th>
      </tr>
      <tr>
        <td rowspan="1"><strong>1. Quy Nhơn (Miền Trung)</strong></td>
        <td><strong>Facility 01</strong></td>
        <td>KCN Phú Tài, Quy Nhơn, Vùng Gia Lai / Bình Định</td>
        <td><strong>30.000 m²</strong></td>
        <td><strong>Sản phẩm ngoài trời cốt lõi</strong>: Chuyên sâu bàn ghế gỗ tự nhiên (Acacia, Teak) kết hợp kim loại và dây đan xuất khẩu.</td>
      </tr>
      <tr>
        <td rowspan="4"><strong>2. TP.HCM & Nam Bộ</strong></td>
        <td><strong>Facility 02</strong></td>
        <td>KCN Tân Đông Hiệp B, Dĩ An, Bình Dương / TP.HCM</td>
        <td><strong>30.000 m²</strong></td>
        <td>Nội thất dự án cao cấp (High-end indoor & turnkey interior completion), lắp đặt trọn gói khách sạn, resort.</td>
      </tr>
      <tr>
        <td><strong>Facility 03</strong></td>
        <td>KCN Đại Đăng, Thủ Dầu Một, Bình Dương</td>
        <td><strong>51.360 m²</strong></td>
        <td>Chế tác đồ gỗ và gia công khung nhôm định hình (*Wood & aluminium furniture*).</td>
      </tr>
      <tr>
        <td><strong>Facility 04</strong></td>
        <td>KCN Đại Đăng, Thủ Dầu Một, Bình Dương</td>
        <td><strong>30.720 m²</strong></td>
        <td>Sản xuất đồ gỗ và chi tiết nhôm tiêu chuẩn xuất khẩu.</td>
      </tr>
      <tr>
        <td><strong>Facility 05</strong></td>
        <td>KCN Đại Đăng, Thủ Dầu Một, Bình Dương</td>
        <td><strong>31.000 m²</strong></td>
        <td>Nội thất vật liệu kết hợp: Gỗ, nhôm sơn tĩnh điện và dây bện thủ công (*Mixed-material*).</td>
      </tr>
      <tr>
        <td rowspan="4"><strong>3. Hưng Yên (Miền Bắc)</strong></td>
        <td><strong>Facility 06</strong></td>
        <td>KCN Phố Nối A, Huyện Văn Lâm, Tỉnh Hưng Yên</td>
        <td><strong>24.800 m²</strong></td>
        <td>Chế biến và lắp ráp đồ gỗ nội thất phòng khách, phòng ăn.</td>
      </tr>
      <tr>
        <td><strong>Facility 07</strong></td>
        <td>KCN Phố Nối A, Huyện Văn Lâm, Tỉnh Hưng Yên</td>
        <td><strong>35.000 m²</strong></td>
        <td>Gia công cơ khí kim loại, uốn ống, hàn robot và sơn tĩnh điện (*Mechanical & metal furniture*).</td>
      </tr>
      <tr>
        <td><strong>Facility 08</strong></td>
        <td>KCN Phố Nối A, Huyện Văn Lâm, Tỉnh Hưng Yên</td>
        <td><strong>25.000 m²</strong></td>
        <td>Sofa bọc nệm (Upholstery), ghế văn phòng, ghế bành và đệm mút cao cấp.</td>
      </tr>
      <tr>
        <td><strong>Facility 09</strong></td>
        <td>KCN Phố Nối A, Huyện Văn Lâm, Tỉnh Hưng Yên</td>
        <td><strong>13.500 m²</strong></td>
        <td>Tủ sắt lưu trữ, két sắt, giá kệ và nội thất kim loại chuyên dụng.</td>
      </tr>
      <tr>
        <td rowspan="2"><strong>4. Phú Thọ / Vĩnh Phúc</strong></td>
        <td><strong>Facility 10</strong></td>
        <td>KCN Bình Xuyên, Tỉnh Phú Thọ / Vĩnh Phúc</td>
        <td><strong>12.000 m²</strong></td>
        <td>Nội thất hợp đồng dự án (Contract furniture): Trường học, bệnh viện, văn phòng công cộng và chung cư.</td>
      </tr>
      <tr>
        <td><strong>Facility 11</strong></td>
        <td>KCN Cẩm Khê, Huyện Cẩm Khê, Tỉnh Phú Thọ</td>
        <td><strong>260.000 m²</strong></td>
        <td><strong>Sơ chế gỗ nguyên liệu & ván công nghiệp</strong>: Plywood, MDF, xẻ sấy quy mô lớn, cung ứng cốt ván cho toàn bộ hệ thống.</td>
      </tr>
    </table>

    <div class="callout callout-green">
      <div class="callout-title">📌 BÓC TÁCH DIỆN TÍCH BẮT BUỘC TRONG NỘI DUNG SEO:</div>
      Tổng diện tích là <strong>543.800 m²</strong>, nhưng khi mô tả phải tách bạch:
      <ul style="margin-bottom: 0;">
        <li><strong>283.380 m²</strong>: Dành riêng cho 10 nhà máy sản xuất đồ nội thất hoàn thiện (Furniture-only).</li>
        <li><strong>260.000 m²</strong>: Thuộc cơ sở Facility 11 chuyên sơ chế gỗ và sản xuất ván ép công nghiệp (Panels & primary processing).</li>
        <li><em>Tuyệt đối không gọi 543.800 m² là diện tích của một nhà xưởng đơn lẻ.</em></li>
      </ul>
    </div>
  </div>

  <!-- TRANG 6: PHẦN 4 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 4: Kiến Trúc Website & Cấu Trúc URL</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 4: KIẾN TRÚC WEBSITE & CẤU TRÚC URL ĐA NGÔN NGỮ</h1>

    <h2>4.1. Sơ Đồ Cây Website (Site Information Architecture)</h2>
    <p>Website <code class="url-text">dhtcompany.com</code> được xây dựng trên nền tảng Next.js hiện đại, cấu trúc chuẩn hóa cho cả Googlebot và trải nghiệm người mua hàng quốc tế:</p>

    <div style="font-family: 'JetBrains Mono', monospace; font-size: 7.6pt; background: #2d3748; color: #e2e8f0; padding: 3mm 4mm; border-radius: 4px; line-height: 1.4;">
      https://dhtcompany.com/ (Home - Trang chủ tiếng Anh chuẩn)<br>
      ├── /about (Giới thiệu, lịch sử 2016-2022-2024, ban lãnh đạo, 5 giá trị cốt lõi)<br>
      ├── /manufacturing (Hạ tầng 11 cơ sở, 4 cụm, máy móc công nghệ, logistics & cảng xuất)<br>
      ├── /quality-compliance (Hệ thống 6 cửa kiểm soát QC, tiêu chuẩn EN 581, EUDR, Lacey Act, FSC)<br>
      ├── /materials (Hub thông tin vật liệu chế tác)<br>
      │   ├── /materials/acacia-wood-outdoor-furniture (Chuyên sâu gỗ keo lai Việt Nam)<br>
      │   ├── /materials/teak-wood-premium-outdoor-durability (Gỗ Teak Mato Grosso cao cấp)<br>
      │   ├── /materials/eucalyptus-wood-sustainable-strength (Gỗ bạch đàn Uruguay)<br>
      │   ├── /materials/powder-coated-aluminum-modern-scalable (Khung nhôm sơn tĩnh điện)<br>
      │   └── /materials/outdoor-fabric-performance-comfort (Vải nệm ngoài trời & đệm mút)<br>
      ├── /catalogue (Tổng quan sản phẩm)<br>
      │   ├── /catalogue/outdoor (Danh mục nội thất ngoài trời: Lounge, Dining, Sunloungers...)<br>
      │   ├── /catalogue/indoor (Nội thất trong nhà & Dự án thương mại theo đơn)<br>
      │   └── /catalogue/[slug] (19+ trang chi tiết bộ sưu tập: amalfi, benson, bondi, mobley...)<br>
      ├── /blog (Hub tin tức kỹ thuật, xu hướng ngoại thất, case study dự án)<br>
      └── /contact (Form gửi yêu cầu báo giá, thông tin văn phòng Vincom & showroom Gia Lai)
    </div>

    <h2>4.2. Cấu Trúc Đa Ngôn Ngữ & Thẻ Hreflang Chuẩn Quốc Tế</h2>
    <p>Hệ thống hỗ trợ 3 locale chính thức cấu hình trong <code>next.config.ts</code>:</p>
    <ul>
      <li><code>en-US</code> (Mặc định): Thị trường Bắc Mỹ & Quốc tế. URL không có tiền tố (<code class="url-text">https://dhtcompany.com/catalogue/outdoor</code>). Thẻ <code>hreflang="x-default"</code> trỏ về phiên bản này.</li>
      <li><code>en-GB</code>: Thị trường Vương quốc Anh & Khối thịnh vượng chung. URL có tiền tố <code class="url-text">/en-GB/...</code>.</li>
      <li><code>vi-VN</code>: Thị trường nội địa Việt Nam. URL có tiền tố <code class="url-text">/vi-VN/...</code>.</li>
    </ul>

    <h2>4.3. Bảng Redirect 301 Ngăn Ngừa Lỗi 404 (Đã Cấu Hình Trong Codebase)</h2>
    <table>
      <tr>
        <th style="width: 48%;">URL Cũ / Lỗi Chính Tả (Đã Bị Thay Thế)</th>
        <th style="width: 52%;">URL Đích Chính Thức (Dùng Cho SEO & Link Building)</th>
      </tr>
      <tr>
        <td><code>/catalogue/bondi-lougne-collection</code></td>
        <td><code>/catalogue/bondi-lounge-collection</code></td>
      </tr>
      <tr>
        <td><code>/catalogue/mobley-dinning-collection</code></td>
        <td><code>/catalogue/mobley-dining-collection</code></td>
      </tr>
      <tr>
        <td><code>/catalogue/wesley-dinning-collection</code></td>
        <td><code>/catalogue/wesley-dining-collection</code></td>
      </tr>
      <tr>
        <td><code>/catalogue/retangle-table</code> hoặc <code>/catalogue/rectangle-table</code></td>
        <td><code>/catalogue/rectangular-table</code></td>
      </tr>
      <tr>
        <td><code>/catalogue/balmora-lounge-collection</code></td>
        <td><code>/catalogue/balemora-lounge-collection</code></td>
      </tr>
      <tr>
        <td><code>/catalogue/siena-table</code> hoặc <code>/catalogue/seina</code></td>
        <td><code>/catalogue/seina-table</code></td>
      </tr>
      <tr>
        <td><code>/profile</code> hoặc <code>/company-profile</code></td>
        <td><code>/DHT_Company_Profile_2026.pdf</code> (Mở trực tiếp file PDF chính thức)</td>
      </tr>
    </table>
  </div>

  <!-- TRANG 7: PHẦN 5 (TRANG 1) -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 5: Danh Mục Sản Phẩm (Trang 1/2)</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 5: DANH MỤC SẢN PHẨM & CÁC BỘ SƯU TẬP TIÊU BIỂU</h1>

    <h2>5.1. Phân Loại Danh Mục Ngoại Thất (Outdoor Furniture Taxonomy)</h2>
    <p>Dòng sản phẩm ngoài trời là mũi nhọn dẫn dắt lượng truy cập tìm kiếm của website, được chia thành 6 phân nhóm chuyên môn:</p>
    <ul>
      <li><strong>Lounge & Sofas</strong>: Sofa văng 2-3 chỗ, ghế bành đơn xoay (swivel chair), đôn ngồi (ottoman), bàn trà phối đồng bộ.</li>
      <li><strong>Dining Sets</strong>: Bàn ăn gỗ keo/teak dài từ 1m6 đến 2m4, bàn mở rộng (extension table), ghế ăn có tay vịn đan dây rope.</li>
      <li><strong>Sunloungers & Daybeds</strong>: Ghế nằm tựa lưng tùy chỉnh góc độ, có bánh xe di chuyển tiện lợi, daybed đôi mái che cho resort.</li>
      <li><strong>Chairs & Benches</strong>: Ghế cafe ngoài trời xếp chồng (stackable), băng ghế công viên bằng gỗ teak nguyên khối.</li>
      <li><strong>Tables</strong>: Bàn tròn mặt nan gỗ, bàn chữ nhật chân nhôm sơn tĩnh điện.</li>
      <li><strong>Balcony & Folding</strong>: Giải pháp tối ưu diện tích cho căn hộ đô thị, dễ dàng xếp phẳng để đóng thùng.</li>
    </ul>

    <h2>5.2. Danh Sách Các Bộ Sưu Tập Tiêu Biểu (1/2)</h2>
    <table>
      <tr>
        <th style="width: 28%;">Tên Bộ Sưu Tập & URL</th>
        <th style="width: 32%;">Đặc Điểm Kỹ Thuật & Cấu Thành</th>
        <th style="width: 40%;">Từ Khóa SEO Mục Tiêu (Target Keywords)</th>
      </tr>
      <tr>
        <td><strong>Amalfi Lounge Collection</strong><br><code class="url-text">/catalogue/amalfi-lounge-collection</code></td>
        <td>Khung nhôm sơn tĩnh điện, tay vịn ốp gỗ acacia, đệm bọc vải olefin, ghế xoay Swivel Chair và bàn phụ.</td>
        <td><code>amalfi outdoor lounge collection</code>, <code>aluminium rope patio sofa set</code>, <code>swivel outdoor club chair manufacturer</code></td>
      </tr>
      <tr>
        <td><strong>Benson Lounge Collection</strong><br><code class="url-text">/catalogue/benson-lounge-collection</code></td>
        <td>Bộ sofa góc sân vườn 5-8 chỗ ngồi kèm bàn trà gỗ, phù hợp cho khuôn viên biệt thự và sảnh resort.</td>
        <td><code>benson outdoor lounge set</code>, <code>modular patio sectional sofa</code>, <code>luxury wooden outdoor seating wholesale</code></td>
      </tr>
      <tr>
        <td><strong>Bondi Lounge Collection</strong><br><code class="url-text">/catalogue/bondi-lounge-collection</code></td>
        <td>Phong cách ven biển Úc (Coastal vibe), khung gỗ keo kết hợp đan mây nhân tạo chống nước biển.</td>
        <td><code>bondi coastal outdoor furniture</code>, <code>australian style patio lounge</code>, <code>acacia outdoor sofa manufacturer vietnam</code></td>
      </tr>
      <tr>
        <td><strong>Mobley Dining Collection</strong><br><code class="url-text">/catalogue/mobley-dining-collection</code></td>
        <td>Bộ bàn ăn 6–8 ghế ngoài trời, khung kim loại tối giản kết hợp mặt bàn gỗ dày dặn chống cong vênh.</td>
        <td><code>mobley outdoor dining set wholesale</code>, <code>commercial garden dining table 8 seater</code>, <code>patio dining set supplier</code></td>
      </tr>
      <tr>
        <td><strong>Wesley Dining Collection</strong><br><code class="url-text">/catalogue/wesley-dining-collection</code></td>
        <td>Bàn ăn sân vườn cổ điển, mặt bàn nan thoát nước, ghế ăn tựa cao êm ái cho gia đình.</td>
        <td><code>wesley garden dining table and chairs</code>, <code>slatted wooden outdoor dining set</code>, <code>fsc acacia dining table factory</code></td>
      </tr>
      <tr>
        <td><strong>Westley Lounge Collection</strong><br><code class="url-text">/catalogue/westley-lounge-collection</code></td>
        <td>Sofa thư giãn ngoài trời, thiết kế chân chữ U hiện đại, lớp đệm dày 12cm quick-dry foam.</td>
        <td><code>westley patio conversation set</code>, <code>deep seating outdoor sofa supplier</code>, <code>modern garden furniture manufacturer</code></td>
      </tr>
      <tr>
        <td><strong>Ashton Lounge Collection</strong><br><code class="url-text">/catalogue/ashton-lounge-collection</code></td>
        <td>Đường nét thanh lịch, khung nhôm nhẹ bền bỉ, phối dây dù đan chéo mắt cáo độc đáo.</td>
        <td><code>ashton woven rope outdoor sofa</code>, <code>lightweight aluminium patio set</code>, <code>resort poolside lounge chairs wholesale</code></td>
      </tr>
      <tr>
        <td><strong>Bali Lounge Collection</strong><br><code class="url-text">/catalogue/bali-lounge-collection</code></td>
        <td>Cảm hứng nhiệt đới nghỉ dưỡng, chất liệu gỗ teak tự nhiên phối mây đan thủ công.</td>
        <td><code>bali tropical outdoor furniture</code>, <code>teak patio furniture manufacturer vietnam</code>, <code>hotel resort outdoor daybed supplier</code></td>
      </tr>
    </table>
  </div>

  <!-- TRANG 8: PHẦN 5 (TRANG 2) -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 5: Danh Mục Sản Phẩm (Trang 2/2)</span>
      <span>dhtcompany.com</span>
    </div>

    <h2>5.2. Danh Sách Các Bộ Sưu Tập Tiêu Biểu (Tiếp theo 2/2)</h2>
    <table>
      <tr>
        <th style="width: 28%;">Tên Bộ Sưu Tập & URL</th>
        <th style="width: 32%;">Đặc Điểm Kỹ Thuật & Cấu Thành</th>
        <th style="width: 40%;">Từ Khóa SEO Mục Tiêu (Target Keywords)</th>
      </tr>
      <tr>
        <td><strong>Balemora Lounge Collection</strong><br><code class="url-text">/catalogue/balemora-lounge-collection</code></td>
        <td>Sofa module linh hoạt biến đổi cấu hình, lớp sơn tĩnh điện chống trầy xước cao cấp.</td>
        <td><code>balemora modular patio seating</code>, <code>outdoor sectional furniture factory</code>, <code>commercial terrace sofa set</code></td>
      </tr>
      <tr>
        <td><strong>Santos Collections</strong><br><code class="url-text">/catalogue/santos-lounge-collection</code><br><em>(Mã DHT17-141 & DHT17-F096)</em></td>
        <td>Dòng sofa dự án xuất khẩu chuyên cho các chuỗi bán lẻ lớn tại Châu Âu và Mỹ. Thiết kế KD đóng gói phẳng.</td>
        <td><code>santos patio collection vietnam</code>, <code>kd flat pack outdoor furniture supplier</code>, <code>high volume contract furniture factory</code></td>
      </tr>
      <tr>
        <td><strong>Casper Lounge Collection</strong><br><code class="url-text">/catalogue/casper-lounge-collection</code></td>
        <td>Phong cách Scandinavia tối giản, khung mảnh nhưng chịu lực cao, đệm màu trung tính.</td>
        <td><code>casper scandinavian outdoor sofa</code>, <code>minimalist garden furniture wholesale</code>, <code>nordic patio set manufacturer</code></td>
      </tr>
      <tr>
        <td><strong>Stark Lounge Collection</strong><br><code class="url-text">/catalogue/stark-lounge-collection</code></td>
        <td>Thiết kế vững chãi, khung thép/nhôm hộp dày dặn, kiểu dáng công nghiệp hiện đại (Industrial).</td>
        <td><code>stark industrial outdoor lounge</code>, <code>heavy duty metal patio furniture</code>, <code>commercial outdoor furniture supplier</code></td>
      </tr>
      <tr>
        <td><strong>Các Mẫu Bàn Sân Vườn:</strong><br>• Seina Table (<code class="url-text">/seina-table</code>)<br>• Haymont Table (<code class="url-text">/haymont-table</code>)<br>• Rectangular Table (<code class="url-text">/rectangular-table</code>)<br>• Sun Round Table (<code class="url-text">/sun-round-table</code>)</td>
        <td>Bàn ăn chữ nhật, bàn cafe tròn, bàn mở rộng bằng gỗ Teak/Acacia hoặc khung nhôm kết hợp mặt kính cường lực/đá gốm.</td>
        <td><code>solid teak outdoor dining table wholesale</code>, <code>rectangular wooden patio table supplier</code>, <code>round garden coffee table factory vietnam</code></td>
      </tr>
      <tr>
        <td><strong>Timor Losil Collection</strong><br><code class="url-text">/catalogue/timor-losil-collection</code></td>
        <td>Thiết kế đường nét thanh thoát, khung gỗ keo tuyển chọn, hoàn thiện sơn phủ bảo vệ ngoài trời.</td>
        <td><code>timor outdoor wooden furniture</code>, <code>minimalist patio bench and table set</code>, <code>fsc acacia garden furniture manufacturer</code></td>
      </tr>
    </table>

    <h2>5.3. Danh Mục Nội Thất Trong Nhà & Hợp Đồng Dự Án (Indoor & Contract)</h2>
    <p>Tại trang <code class="url-text">/catalogue/indoor</code>, DHT tập trung vào năng lực gia công theo bản vẽ dự án (Made-to-order & Turnkey Contract):</p>
    <ul>
      <li><strong>Living & Storage</strong>: Hệ kệ tivi, tủ ngăn kéo, tủ quần áo, giá sách bằng gỗ kỹ thuật phủ Melamine/Veneer hoặc gỗ tự nhiên.</li>
      <li><strong>Dining & Chairs</strong>: Bàn ăn gia đình, ghế bọc vải/da, ghế nhà hàng khách sạn.</li>
      <li><strong>Upholstered Furniture (Sofa & Nệm - Facility 08)</strong>: Ghế văn phòng công thái học, sofa góc bọc nỉ/da cho sảnh chờ resort.</li>
      <li><strong>Hospitality & Institutional Projects (Facility 10)</strong>: Cung cấp trọn gói nội thất cho trường học, bệnh viện, khách sạn 3–5 sao và căn hộ dịch vụ cao cấp.</li>
    </ul>

    <div class="callout callout-green" style="margin-top: 2.5mm;">
      <div class="callout-title">💼 LƯU Ý KHI LÀM SEO CHO TRANG SẢN PHẨM:</div>
      Mỗi trang sản phẩm phải làm nổi bật: <strong>100% FSC-certified wood</strong>, <strong>KD/Flat-pack</strong> (tiết kiệm CBM), <strong>Retail-ready packaging</strong> (thùng carton đạt chuẩn ISTA 3A) và nút CTA mở form <strong>"Request a Quote for this Collection"</strong> có kèm mã sản phẩm tự động.
    </div>
  </div>

  <!-- TRANG 9: PHẦN 6 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 6: Chiến Lược Vật Liệu & Cam Kết Gỗ FSC</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 6: CHIẾN LƯỢC VẬT LIỆU & CAM KẾT GỖ 100% FSC</h1>

    <h2>6.1. Mỏ Vàng SEO Content: Material Knowledge Hub</h2>
    <p>Phần <code class="url-text">/materials</code> của DHT là một tài nguyên SEO tuyệt vời (Top & Middle of Funnel) để thu hút lượng tìm kiếm của các kỹ sư sản phẩm, buyer và chuyên viên thu mua quốc tế khi tìm hiểu đặc tính vật liệu trước khi đặt đơn:</p>

    <table>
      <tr>
        <th style="width: 25%;">Trang Vật Liệu & URL</th>
        <th style="width: 35%;">Nguồn Gốc & Thông Số Kỹ Thuật Đã Duyệt</th>
        <th style="width: 40%;">Chiến Lược Nội Dung & Từ Khóa SEO</th>
      </tr>
      <tr>
        <td><strong>Acacia Hybrid</strong><br><code class="url-text">/materials/acacia-wood-outdoor-furniture</code></td>
        <td>
          • <strong>Nguồn gốc</strong>: Rừng trồng Quy Nhơn / Miền Trung Việt Nam.<br>
          • <strong>Chứng chỉ</strong>: 100% FSC Plantation-grown.<br>
          • <strong>Đặc tính</strong>: Độ ẩm sấy lò 8–12%, thớ gỗ đan xen tự nhiên, khả năng bám sơn và dầu hoàn thiện tốt.
        </td>
        <td>
          Target: <code>vietnam acacia outdoor furniture manufacturer</code>, <code>acacia hybrid wood properties</code>, <code>cost effective hardwood patio furniture</code>.<br>
          <em>Angle: Giải pháp gỗ cứng bền bỉ, tối ưu chi phí cho các chuỗi bán lẻ quốc tế lớn.</em>
        </td>
      </tr>
      <tr>
        <td><strong>Teak Wood (Tectona Grandis)</strong><br><code class="url-text">/materials/teak-wood-premium-outdoor-durability</code></td>
        <td>
          • <strong>Nguồn gốc</strong>: Rừng trồng bang Mato Grosso, Brazil.<br>
          • <strong>Chứng chỉ</strong>: FSC 100% Certified.<br>
          • <strong>Đặc tính</strong>: Hàm lượng dầu tự nhiên cực cao, kháng sâu bọ, mối mọt, chống thấm nước tuyệt hảo.
        </td>
        <td>
          Target: <code>fsc certified teak outdoor furniture supplier</code>, <code>brazilian plantation teak manufacturer</code>, <code>luxury teak garden bench factory</code>.<br>
          <em>Angle: Vật liệu thượng hạng cho resort cao cấp và phân khúc biệt thự sang trọng.</em>
        </td>
      </tr>
      <tr>
        <td><strong>Eucalyptus Grandis</strong><br><code class="url-text">/materials/eucalyptus-wood-sustainable-strength</code></td>
        <td>
          • <strong>Nguồn gốc</strong>: Rừng trồng được quản lý bền vững tại Uruguay.<br>
          • <strong>Chứng chỉ</strong>: FSC 100% Plantation timber.<br>
          • <strong>Đặc tính</strong>: Thớ gỗ thẳng, mật độ vân đồng đều, độ ổn định kích thước cao, ít cong vênh.
        </td>
        <td>
          Target: <code>eucalyptus wood patio furniture manufacturer</code>, <code>uruguay plantation eucalyptus furniture factory</code>.<br>
          <em>Angle: Giải pháp thay thế Teak hoàn hảo với độ bền cao và vân gỗ tuyệt đẹp.</em>
        </td>
      </tr>
      <tr>
        <td><strong>Powder-Coated Aluminium</strong><br><code class="url-text">/materials/powder-coated-aluminum-modern-scalable</code></td>
        <td>
          • Khung hợp kim nhôm đúc hoặc hộp gia cường.<br>
          • Hàn TIG/MIG chính xác, xử lý tiền sơn chống oxy hóa.<br>
          • Sơn tĩnh điện ngoài trời chống trầy, kháng muối biển.
        </td>
        <td>
          Target: <code>powder coated aluminum outdoor furniture factory</code>, <code>rust proof metal patio furniture wholesale</code>.<br>
          <em>Angle: Nội thất nhẹ, không gỉ sét, màu sắc hiện đại cho không gian mở.</em>
        </td>
      </tr>
      <tr>
        <td><strong>Outdoor Performance Fabric</strong><br><code class="url-text">/materials/outdoor-fabric-performance-comfort</code></td>
        <td>
          • Vải sợi Olefin cao cấp, nhuộm dung dịch (Solution-dyed).<br>
          • Độ bền màu kháng tia cực tím UV Grade 7/8.<br>
          • Đệm mút xốp thoát nước nhanh (Quick-dry reticulated foam).
        </td>
        <td>
          Target: <code>outdoor cushion manufacturer vietnam</code>, <code>solution dyed olefin fabric patio furniture</code>, <code>quick dry foam outdoor cushions supplier</code>.<br>
          <em>Angle: Thoáng khí, không tích nước, chống nấm mốc trong môi trường mưa ẩm.</em>
        </td>
      </tr>
    </table>

    <h2>6.2. Cam Kết Gỗ FSC Bắt Buộc (CEO FSC Mandate)</h2>
    <div class="callout callout-red">
      <div class="callout-title">🚨 NGUYÊN TẮC TUYỆT ĐỐI VỀ CHỨNG CHỈ FSC:</div>
      <p>Theo chỉ đạo trực tiếp của CEO John Vo, <strong>mọi cây gỗ được đưa vào sản xuất tại DHT đều là gỗ có chứng chỉ FSC</strong>. Khi viết nội dung SEO, bài PR hoặc metadata:</p>
      <ul style="margin-bottom: 0;">
        <li><strong>Câu chuẩn mực bắt buộc</strong>: <em>"All wood used in DHT furniture is FSC-certified."</em></li>
        <li><strong>TUYỆT ĐỐI KHÔNG VIẾT</strong>: <em>"FSC available upon request"</em> (FSC theo yêu cầu) hoặc chào bán các option gỗ non-FSC.</li>
        <li><strong>Phân định rõ ràng</strong>: Tuyên bố chung là gỗ FSC, còn claim cụ thể khi giao dịch từng lô (FSC 100% hay FSC Mix) sẽ căn cứ theo chứng từ chuỗi hành trình sản phẩm (CoC) của lô hàng đó.</li>
      </ul>
    </div>
  </div>

  <!-- TRANG 10: PHẦN 7 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 7: Ma Trận Từ Khóa B2B Xuất Khẩu</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 7: MA TRẬN TỪ KHÓA B2B XUẤT KHẨU (KEYWORD UNIVERSE)</h1>
    <p>Dưới đây là bộ từ khóa B2B đã được phân cụm (Topic Clusters) phục vụ việc triển khai On-Page SEO, viết bài blog, tối ưu tiêu đề sản phẩm và xây dựng backlink quốc tế:</p>

    <table>
      <tr>
        <th style="width: 25%;">Cụm Từ Khóa (Cluster)</th>
        <th style="width: 45%;">Danh Sách Từ Khóa Trọng Tâm (Primary & Secondary Keywords)</th>
        <th style="width: 30%;">Trang Đích Phù Hợp (Target URL)</th>
      </tr>
      <tr>
        <td><strong>Cluster 1: Brand & Entity</strong><br><em>(Nhận diện thương hiệu)</em></td>
        <td>
          <code>DHT Furniture Vietnam</code>, <code>DHT Furniture</code>, <code>dhtcompany.com</code>, <code>DHT furniture joint stock company</code>, <code>DHT furniture manufacturer</code>, <code>DHT factory vietnam</code>
        </td>
        <td>
          <code>/</code> (Home)<br>
          <code>/about</code><br>
          <code>/contact</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 2: Industry & Export Core</strong><br><em>(Năng lực xuất khẩu cốt lõi)</em></td>
        <td>
          <code>vietnam furniture manufacturer</code>, <code>furniture factory in vietnam</code>, <code>vietnam furniture supplier</code>, <code>b2b furniture exporter vietnam</code>, <code>custom furniture manufacturer vietnam</code>, <code>oem odm furniture factory vietnam</code>, <code>bulk furniture suppliers vietnam</code>, <code>fob furniture vietnam</code>
        </td>
        <td>
          <code>/</code> (Home)<br>
          <code>/about</code><br>
          <code>/manufacturing</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 3: Outdoor Furniture B2B</strong><br><em>(Nội thất ngoài trời)</em></td>
        <td>
          <code>vietnam outdoor furniture manufacturer</code>, <code>outdoor furniture factory in vietnam</code>, <code>patio furniture wholesale suppliers</code>, <code>garden furniture exporter vietnam</code>, <code>outdoor lounge sofa set manufacturer</code>, <code>patio dining set wholesale</code>, <code>poolside sunlounger manufacturer</code>, <code>commercial outdoor furniture vietnam</code>
        </td>
        <td>
          <code>/catalogue/outdoor</code><br>
          <code>/catalogue/[slug]</code><br>
          <code>/blog/...</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 4: Materials & Sustainability</strong><br><em>(Vật liệu & Bền vững)</em></td>
        <td>
          <code>fsc certified wood furniture manufacturer</code>, <code>acacia outdoor furniture vietnam</code>, <code>teak garden furniture factory</code>, <code>eucalyptus patio furniture supplier</code>, <code>powder coated aluminum furniture manufacturer</code>, <code>weather resistant outdoor furniture wholesale</code>, <code>quick dry foam outdoor cushion factory</code>
        </td>
        <td>
          <code>/materials</code><br>
          <code>/materials/[slug]</code><br>
          <code>/quality-compliance</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 5: Contract & Indoor</strong><br><em>(Nội thất dự án & trong nhà)</em></td>
        <td>
          <code>contract furniture manufacturer vietnam</code>, <code>hospitality furniture supplier vietnam</code>, <code>hotel outdoor furniture factory</code>, <code>resort patio furniture wholesale</code>, <code>commercial project furniture manufacturer</code>, <code>made to order indoor furniture vietnam</code>
        </td>
        <td>
          <code>/catalogue/indoor</code><br>
          <code>/manufacturing</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 6: Compliance & Standards</strong><br><em>(Tiêu chuẩn & Pháp lý xuất khẩu)</em></td>
        <td>
          <code>eudr compliant furniture manufacturer</code>, <code>us lacey act compliant wood supplier</code>, <code>en 581 outdoor furniture factory</code>, <code>tsca title vi compliant furniture vietnam</code>, <code>bsci audited furniture factory vietnam</code>, <code>smeta audited furniture manufacturer</code>
        </td>
        <td>
          <code>/quality-compliance</code>
        </td>
      </tr>
      <tr>
        <td><strong>Cluster 7: Geo-Targeted B2B</strong><br><em>(Thị trường quốc tế đích)</em></td>
        <td>
          <code>vietnam furniture manufacturer for us market</code>, <code>vietnam outdoor furniture supplier to uk</code>, <code>furniture factory vietnam shipping to europe</code>, <code>commercial furniture manufacturer for australia</code>, <code>middle east hotel furniture supplier vietnam</code>
        </td>
        <td>
          <code>/</code><br>
          <code>/quality-compliance</code><br>
          <code>/manufacturing</code>
        </td>
      </tr>
    </table>
  </div>

  <!-- TRANG 11: PHẦN 8 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 8: Quy Chuẩn On-Page SEO, Metadata & Schema</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 8: QUY CHUẨN ON-PAGE SEO, METADATA & SCHEMA.ORG</h1>

    <h2>8.1. Công Thức Viết Thẻ Title & Meta Description Chuẩn Quốc Tế</h2>
    <table>
      <tr>
        <th style="width: 20%;">Loại Trang</th>
        <th style="width: 40%;">Công Thức Tiêu Đề (Title Formula)</th>
        <th style="width: 40%;">Mẫu Meta Description Chuẩn (145–155 Ký Tự)</th>
      </tr>
      <tr>
        <td><strong>Trang Chủ (Home)</strong></td>
        <td><code>DHT Furniture Vietnam | B2B Furniture Manufacturer & Exporter</code></td>
        <td>DHT Furniture Vietnam is a premier B2B manufacturer & exporter of outdoor, indoor and contract furniture operating across 11 facilities in Vietnam.</td>
      </tr>
      <tr>
        <td><strong>Giới Thiệu (About Us)</strong></td>
        <td><code>About DHT | Family-Owned Furniture Manufacturing Group Vietnam</code></td>
        <td>Discover DHT Furniture Vietnam: Over 543,800 m² manufacturing footprint across 11 facilities, supplying certified furniture to global retailers and brands.</td>
      </tr>
      <tr>
        <td><strong>Nhà Máy (Manufacturing)</strong></td>
        <td><code>Manufacturing Facilities & Capacity | DHT Furniture Vietnam</code></td>
        <td>Explore DHT's 11 specialised production facilities across 4 manufacturing clusters in Vietnam, spanning 543,800 m² with ~2,400 skilled personnel.</td>
      </tr>
      <tr>
        <td><strong>Chất Lượng (Quality)</strong></td>
        <td><code>Quality & Compliance | 6-Stage QC & Testing Standards | DHT</code></td>
        <td>Rigorous quality control from raw timber to container loading. EUDR, FSC-certified wood, EN 581, ASTM and TSCA Title VI compliance support.</td>
      </tr>
      <tr>
        <td><strong>Danh Mục Ngoại Thất</strong></td>
        <td><code>Outdoor Furniture Collections | Wholesale & OEM | DHT Vietnam</code></td>
        <td>Browse commercial outdoor furniture in FSC-certified acacia, teak, aluminium, and rope. Designed for global retailers, hotels, and resorts.</td>
      </tr>
      <tr>
        <td><strong>Chi Tiết Bộ Sưu Tập</strong></td>
        <td><code>[Collection Name] | Outdoor [Category] | DHT Furniture Vietnam</code></td>
        <td>Explore the [Collection Name], featuring [Materials], weather-resistant finishes and flat-pack KD options. Request wholesale OEM quotation today.</td>
      </tr>
      <tr>
        <td><strong>Trang Vật Liệu</strong></td>
        <td><code>[Material Name] for Outdoor Furniture Programmes | DHT Vietnam</code></td>
        <td>Technical guide on [Material Name]: Sourcing, moisture control, durability testing and finishing options for international B2B furniture programmes.</td>
      </tr>
    </table>

    <h2>8.2. Cấu Trúc Headings (H1, H2, H3) Chuẩn</h2>
    <ul>
      <li><strong>Chỉ có DUY NHẤT một thẻ <code>&lt;h1&gt;</code></strong> trên mỗi trang, chứa từ khóa chính và định danh rõ thực thể trang (ví dụ: Trang Outdoor phải có H1 rõ ràng là <em>Outdoor Furniture Collections</em>).</li>
      <li><strong>Các thẻ <code>&lt;h2&gt;</code></strong> đại diện cho các trụ cột nội dung chính (ví dụ: <em>Key Collections, Materials & Craftsmanship, OEM Specifications, Packaging & Loading</em>).</li>
      <li><strong>Các thẻ <code>&lt;h3&gt;</code></strong> dùng cho từng món trong set hoặc chi tiết kỹ thuật (ví dụ: <em>Swivel Chair, Coffee Table, Dimensions Breakdown</em>).</li>
    </ul>

    <h2>8.3. Quy Định Tối Ưu Hình Ảnh (Image SEO)</h2>
    <ul>
      <li><strong>Tên file ảnh (Filename)</strong>: Bắt buộc đặt tên tiếng Anh có nghĩa, chứa mã sản phẩm hoặc mô tả vật liệu (ví dụ: <code>amalfi-swivel-chair-outdoor-acacia-dht.webp</code>; tuyệt đối KHÔNG dùng <code>image_1.jpg</code>, <code>IMG_2026.png</code>).</li>
      <li><strong>Thẻ Alt Text</strong>: Mô tả trung thực sản phẩm kèm tên thương hiệu: <code>Amalfi Outdoor Swivel Lounge Chair in Acacia Wood and Powder-coated Aluminium by DHT Furniture Vietnam</code>.</li>
      <li><strong>Định dạng</strong>: Ưu tiên chuyển đổi sang định dạng <code>.webp</code> để giảm dung lượng file, cải thiện điểm Core Web Vitals (LCP/CLS).</li>
    </ul>

    <h2>8.4. Dữ Liệu Có Cấu Trúc (Structured Data / Schema.org)</h2>
    <ul>
      <li><strong>Schema Organization & Corporation</strong> (Trang Home, About, Contact): Khai báo tên công ty, logo, địa chỉ Vincom Center Q1, hotline, tọa độ và mạng lưới nhà máy.</li>
      <li><strong>Schema Product</strong> (Trang chi tiết <code class="url-text">/catalogue/[slug]</code>): Khai báo tên bộ sưu tập, SKU, thương hiệu (DHT Furniture Vietnam), vật liệu, tình trạng hàng (InStock / PreOrder theo dạng B2B contract).</li>
      <li><strong>Schema BreadcrumbList</strong>: Hỗ trợ thanh điều hướng rõ ràng: <code>Home > Catalogue > Outdoor > Amalfi Lounge Collection</code>.</li>
    </ul>
  </div>

  <!-- TRANG 12: PHẦN 9 -->
  <div class="doc-page">
    <div class="header-bar">
      <span>Phần 9: 4 Điều Cấm Kỵ Tuyệt Đối & Checklist</span>
      <span>dhtcompany.com</span>
    </div>

    <h1>PHẦN 9: 4 ĐIỀU CẤM KỴ TUYỆT ĐỐI & QUY TẮC NGHIỆM THU SEO</h1>

    <div class="callout callout-red">
      <div class="callout-title">⛔ 4 NGUYÊN TẮC BẤT DI BẤT DỊCH (CEO STRICT DIRECTIVES):</div>
      <div style="font-size: 8.5pt; line-height: 1.55;">
        <strong>1. TUYỆT ĐỐI LOẠI BỎ 100% TỪ KHÓA & THƯƠNG HIỆU "JDD":</strong><br>
        Không được xuất hiện từ "JDD", "JDD Global Furnishing", địa chỉ "226 Gò Dưa" ở bất kỳ thẻ Title, Meta Description, URL, Alt ảnh, nội dung bài viết hay anchor text nào. Đây là thương hiệu cũ đã bị CEO quyết định khai trừ triệt để.<br><br>

        <strong>2. GỖ BẮT BUỘC 100% PHẢI LÀ GỖ FSC:</strong><br>
        Mọi bài viết về đồ gỗ của DHT phải khẳng định gỗ có chứng chỉ FSC (<em>"All wood used in DHT furniture is FSC-certified"</em>). Không bao giờ viết "FSC available upon request" (FSC theo yêu cầu) hoặc tạo cảm giác DHT có cung cấp gỗ không chứng chỉ.<br><br>

        <strong>3. KHÔNG SỬ DỤNG BỘ SỐ CŨ KHÔNG ĐƯỢC PHÊ DUYỆT:</strong><br>
        Cấm sử dụng các số liệu cũ chưa kiểm chứng như: <em>"18+ years experience", "50,000 units / month", "35+ export countries", "250 factory workers", "30 technical engineers"</em>. Bắt buộc dùng bộ số chuẩn: <strong>11 cơ sở sản xuất, 543.800 m² mặt bằng (283.380 m² furniture + 260.000 m² panels), ~2.400 nhân sự toàn hệ thống, 4 cụm nhà máy</strong>.<br><br>

        <strong>4. KHÔNG ĐƯỢC ĐỂ PHÁT SINH LỖI 404 KHI ĐỔI TÊN SLUG:</strong><br>
        Mọi điều chỉnh URL chính tả phải đi kèm Redirect 301 vĩnh viễn (như đã có trong <code>next.config.ts</code>). Tuyệt đối không xóa URL cũ làm mất thứ hạng Google hoặc đứt link khách hàng quốc tế đang truy cập.
      </div>
    </div>

    <h2>9.2. Checklist Nghiệm Thu Nội Dung SEO Trước Khi Xuất Bản (Sign-Off Checklist)</h2>
    <table>
      <tr>
        <th style="width: 8%;">STT</th>
        <th style="width: 32%;">Tiêu Chí Kiểm Tra (Criteria)</th>
        <th style="width: 60%;">Yêu Cầu Đạt Chuẩn Nghiệm Thu</th>
      </tr>
      <tr>
        <td>01</td>
        <td><strong>Brand & Legal Name</strong></td>
        <td>Đúng <em>DHT Furniture Vietnam</em>, không sai chính tả, không sót bất kỳ chữ JDD nào.</td>
      </tr>
      <tr>
        <td>02</td>
        <td><strong>Số Liệu Quy Mô</strong></td>
        <td>Đúng 11 cơ sở, 543.800 m², ~2.400 nhân sự. Không dùng số 18+ năm hay 50.000 units.</td>
      </tr>
      <tr>
        <td>03</td>
        <td><strong>Tuyên Bố Về Gỗ</strong></td>
        <td>Có tuyên bố chuẩn: <em>"All wood used in DHT furniture is FSC-certified."</em></td>
      </tr>
      <tr>
        <td>04</td>
        <td><strong>Địa Chỉ & Liên Hệ</strong></td>
        <td>Văn phòng: Vincom Center, 72 Lê Thánh Tôn, Q.1, TP.HCM. Email: <code>sales@dhtcompany.com</code>.</td>
      </tr>
      <tr>
        <td>05</td>
        <td><strong>URL & Slug</strong></td>
        <td>Đúng slug chuẩn (ví dụ: <code>bondi-lounge-collection</code>, <code>mobley-dining-collection</code>), không lỗi 404.</td>
      </tr>
      <tr>
        <td>06</td>
        <td><strong>Title & Meta Description</strong></td>
        <td>Chứa từ khóa B2B, có tên thương hiệu, độ dài Title 50–60 ký tự, Meta 145–155 ký tự.</td>
      </tr>
      <tr>
        <td>07</td>
        <td><strong>Internal Linking</strong></td>
        <td>Liên kết chéo mượt mà giữa Catalogue ↔ Materials Hub ↔ Manufacturing ↔ Contact.</td>
      </tr>
      <tr>
        <td>08</td>
        <td><strong>CTA B2B Hợp Chuẩn</strong></td>
        <td>Dẫn trực tiếp tới form liên hệ báo giá hoặc tải PDF Company Profile 2026 chính thức.</td>
      </tr>
    </table>

    <div style="margin-top: 4mm; padding-top: 3mm; border-top: 1px solid #cbd5e0; font-size: 7.5pt; color: #718096; display: flex; justify-content: space-between;">
      <div>DHT FURNITURE VIETNAM • TÀI LIỆU LƯU HÀNH NỘI BỘ DÀNH CHO SEO & MARKETING</div>
      <div>CẬP NHẬT THEO PROFILE 2026 & WEBSITE AUDIT</div>
    </div>
  </div>

</body>
</html>
`;

const htmlFilePath = path.join(__dirname, '..', 'public', 'DHT_Furniture_Vietnam_SEO_Master_Guide.html');
const pdfFilePath = path.join(__dirname, '..', 'public', 'DHT_Furniture_Vietnam_SEO_Master_Guide.pdf');

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('HTML written successfully to:', htmlFilePath);

const chromePath = 'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe';
const command = '"' + chromePath + '" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="' + pdfFilePath + '" "' + htmlFilePath + '"';

console.log('Executing:', command);
execSync(command);
console.log('PDF generated successfully at:', pdfFilePath);
