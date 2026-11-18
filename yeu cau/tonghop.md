# BÁO CÁO TỔNG HỢP VÀ PHÂN TÍCH Ý KIẾN KHÁCH HÀNG (ANH THÀNH - DHT)
**Nguồn dữ liệu:** Video ghi hình cuộc họp ngày 10/10/2026 (`Bản sao Phần 2 ghi.mov` - 01:51:09), kết hợp tài liệu `DHT_Home_Layout_Huong_Dan_Chinh_Sua_10-10-2026.pdf` (16 trang) và `Phần 2.pdf` (Master Brand Architecture & Website Manufacturing Brief).

---

## PHẦN I: TÂM LÝ & NGUYÊN NHÂN BỨC XÚC CỐT LÕI ("KHÁCH BỊ GÌ?")

Qua phân tích toàn bộ 111 phút trao đổi trực tiếp, khách hàng (anh Thành – đại diện Ban Lãnh Đạo DHT) phản ứng rất gay gắt và bức xúc vì 3 nhóm vấn đề cốt lõi sau:

### 1. Bức xúc tột độ về quy trình làm việc của Developer ("Cắm đầu làm một mạch")
- **Nguyên nhân:** Developer nhận brief xong không giao tiếp, không xác nhận từng bước, mà "cắm đầu làm một mạch" từ đầu đến cuối theo ý hiểu chủ quan.
- **Hậu quả:** Đến khi khách review thì phát hiện sai lệch nghiêm trọng về cấu trúc và định vị, dẫn đến việc phải đập đi sửa lại 2 - 3 lần. Tiến độ bị kéo dài, dây dưa ("lầy nhầy", "quá lâu đi").
- **Lời khách phản ánh trực tiếp trong video:**
  > *"Anh với mày cực một lần cho nó xong luôn, chứ mày cắm đầu làm một mạch anh coi lại sửa một đống... lầy nhầy 2-3 lần rồi... quá lâu đi."*
  > *"Làm tới đâu chụp màn hình gửi xác nhận tới đó, duyệt OK mới làm tiếp, không tự ý làm tràn lan."*

### 2. Định vị thương hiệu bị sai lệch hoàn toàn (B2B OEM vs. B2C Bán lẻ Online)
- **Sai lầm của website cũ:** Web đang được dựng giống như một trang web thương mại điện tử bán lẻ nội thất (có filter phức tạp, showroom, giỏ hàng, bảng giá...).
- **Bản chất thực tế của DHT:** DHT là **Hệ thống liên minh sản xuất & gia công nội thất xuất khẩu quy mô lớn (B2B / OEM / ODM Manufacturing Partner)** cho các tập đoàn quốc tế tại Mỹ, Châu Âu, Úc. Khách hàng mục tiêu là các nhà mua hàng dự án, kiến trúc sư, chuỗi bán lẻ quốc tế, chứ không phải khách mua lẻ từng chiếc ghế.
- **Sai sót nghiêm trọng về nhận diện:**
  - Nhầm lẫn logo cũ *"DHT Outdoor"* thay vì thương hiệu chuẩn quốc tế **"DHT Furniture"**.
  - Gán ghép cấu trúc pháp lý sai sự thật: Web tự ý ghi các xưởng liên kết là "subsidiaries" (công ty con) hay "family-owned group" (tập đoàn gia đình) – điều này vi phạm pháp lý và sai cấu trúc hợp tác kinh doanh.
  - Còn sót các tàn dư thương hiệu cũ như *"JDD"* trong dữ liệu sản phẩm.

### 3. Giao diện thiết kế luộm thuộm, thiếu tính thực tế và thiếu chuyên nghiệp
- **Nội dung trùng lặp thừa thãi:** Khối xưởng sản xuất (Craftsmanship + video 11 facilities) bị nhét cả ở trang Home lẫn trang Manufacturing, khiến trang Home dài lê thê và loãng thông điệp.
- **Râu ông nọ cắm cằm bà kia:** Danh mục ghi bàn ghế ăn ngoài trời (Dining / Chair) nhưng hình ảnh lại để giường tắm nắng nằm (Sunlounger / Daybed).
- **Lỗi thẩm mỹ làm giảm độ tin cậy:** Sử dụng hiệu ứng mờ (backdrop blur) cẩu thả, chữ trắng đè lên nền ảnh mờ tối khiến mắt đọc rất khó chịu, trông không giống một tập đoàn sản xuất triệu đô.
- **Ngôn ngữ lộn xộn:** Trộn lẫn tiếng Anh và tiếng Việt trong cùng một thành phần (ví dụ: phần bản đồ vừa có nút tiếng Anh vừa có chú thích tiếng Việt).

---

## PHẦN II: CHI TIẾT CÁC YÊU CẦU CHỈNH SỬA TỪNG TRANG & MODULE

---

### A. TRANG CHỦ (HOME PAGE)
*(Đối chiếu theo tài liệu hướng dẫn 16 trang `DHT_Home_Layout_Huong_Dan_Chinh_Sua_10-10-2026.pdf` và chỉ đạo trực tiếp trong video)*

| STT | Khối chức năng (Section) | Hiện trạng lỗi / Khách phàn nàn | Yêu cầu chỉnh sửa cụ thể |
| :--- | :--- | :--- | :--- |
| **01** | **Header & Navigation** | Menu có các trang thừa thãi (`About`, `Showroom & Gallery`). | - **Xóa bỏ hoàn toàn link `About`** và `Showroom & Gallery`.<br>- Menu tinh gọn chỉ tập trung: `Home`, `Manufacturing`, `Collections`, `Contact`.<br>- Chuẩn hóa logo: Dùng logo chuẩn **DHT Furniture**. |
| **02** | **Hero Banner** | Thông điệp chưa toát lên tầm vóc OEM quốc tế; CTA mờ nhạt. | - Tiêu đề & phụ đề khẳng định vị thế sản xuất nội thất quy mô lớn tại Việt Nam.<br>- Nút CTA chính: *"Explore Outdoor Collection"* và *"Discuss your OEM project"*. |
| **03** | **Brand Statement / About Intro** | Viết dài dòng theo văn phong bán lẻ, nhầm lẫn thương hiệu. | - Rút ngắn thành 1 đoạn tuyên ngôn súc tích về năng lực sản xuất chuẩn quốc tế.<br>- Khẳng định DHT Furniture là đơn vị tiên phong trong xuất khẩu nội thất toàn cầu. |
| **04** | **Section Craftsmanship / Factory** | Bị trùng lặp 100% với trang Manufacturing; video và danh sách 11 cơ sở làm trang Home quá dài. | - **XÓA BỎ HOÀN TOÀN KHỐI NÀY KHỎI TRANG HOME**.<br>- Toàn bộ video nhà xưởng và danh sách 11 cơ sở chuyển về đúng vị trí tại trang `Manufacturing`. |
| **05** | **4 Nhóm Năng Lực (4 Divisions)** | Đặt sai ảnh đại diện từng nhóm năng lực (nhãn một đằng, ảnh một nẻo). | Chuẩn hóa chính xác 4 nhóm năng lực liên minh:<br>1. **Outdoor Furniture:** DHT Furniture (Quy Nhơn - Bình Định).<br>2. **Modern Interior Wood:** JAGER (Mê Linh - Hà Nội).<br>3. **Commercial & Metal Furniture:** THE ONE (Hưng Yên & Bình Dương).<br>4. **Traditional Wood Furniture:** MEKONG (Đồng Nai).<br>*Bắt buộc thay ảnh đúng thực tế từng dòng sản phẩm.* |
| **06** | **Selected Collections (Bộ sưu tập nổi bật)** | Có các tab lọc (*All, Sofa, Lounge, Dining*), khi bấm vào danh mục ít hàng làm layout bị hụt, trống trải rất xấu. | - **BỎ TOÀN BỘ CÁC TAB FILTER (Bộ lọc)**.<br>- Cố định hiển thị đúng **8 bộ sưu tập tiêu biểu hoàn thiện** do anh Thành duyệt trực tiếp.<br>- Trình bày dạng lưới cao cấp, hiển thị rõ tên bộ sưu tập, chất liệu chủ đạo, không để giá bán lẻ. |
| **07** | **Materials & Finishes (Nguyên vật liệu)** | Chữ đè lên nền ảnh bị mờ (blur), ảnh tối màu, cực kỳ khó đọc. | - **BỎ LỚP PHỦ MỜ (Blur) VÀ NỀN TỐI**.<br>- Tách bạch rõ ràng: Hình ảnh mẫu vật liệu thực tế sắc nét + Text mô tả riêng biệt, độ tương phản cao.<br>- Chuẩn hóa đúng 6 nhóm vật liệu: Gỗ tự nhiên (Teak/Acacia chuẩn FSC), Khung nhôm sơn tĩnh điện (Powder-coated Aluminum), Mây đan nhựa (All-weather Wicker/Rattan), Vải ngoài trời chống nước (Sunbrella/Olefin), Mặt đá nung kết (Ceramic/Sintered Stone), Thép không gỉ & phụ kiện Inox 304. |
| **08** | **Section CTA Dự Án (OEM Consultation)** | Form dài dòng hoặc dùng câu từ kiểu "mua hàng". | - Đổi tiêu đề chuẩn B2B: *"Let's discuss your furniture requirement"* hoặc *"Start Your Custom OEM / ODM Project"*.<br>- Rút ngắn form: Họ tên, Email công ty, Quốc gia, Loại dự án/Sản lượng dự kiến, Ghi chú. |
| **09** | **Footer** | Cấu trúc cũ rối rắm, 4-5 cột nhiều liên kết rác (`Quick Links`, `Showroom`, `Company`...). | - **ĐẬP BỎ VÀ RÚT GỌN CÒN ĐÚNG 2 KHỐI**:<br>  + **Khối 1 (Trái):** Logo DHT Furniture + Giới thiệu ngắn về năng lực gia công OEM/ODM xuất khẩu.<br>  + **Khối 2 (Phải):** Contact DHT (Địa chỉ Head Office, Hotline dự án, Email liên hệ quốc tế, Cảng xuất khẩu chính: Quy Nhơn, Cát Lái, Hải Phòng). |

---

### B. TRANG NĂNG LỰC SẢN XUẤT (MANUFACTURING PAGE)
*(Khách ghi nhận trang này đã đi đúng hướng mỹ thuật, nhưng cần cải tiến công năng đọc nhanh và tính cô đọng)*

1. **Bản đồ sản xuất Việt Nam (Vietnam Production Map):**
   - **Tỉ lệ phân chia layout:** Bản đồ chiếm **45% (bên trái)**, 4 thẻ vùng sản xuất chiếm **55% (bên phải)**.
   - Hiện trạng bản đồ bị bé, anh Thành yêu cầu **phóng to bản đồ hơn** để khách quốc tế nhìn rõ vị trí chiến lược trải dài Bắc - Trung - Nam.
   - Thẻ vùng cần làm rõ:
     - Số lượng cơ sở tại vùng.
     - Tổng diện tích nhà xưởng ($m^2$).
     - Chuyên môn chính (Specialization: Outdoor, Indoor Wood, Metal, Office...).
     - Cảng xuất khẩu tương ứng (Hải Phòng Port, Quy Nhơn Port, Cát Lái Port).
   - **Lỗi ngôn ngữ:** Sửa dứt điểm lỗi trộn tiếng Anh/tiếng Việt (ví dụ dòng *"Click below on the map"* xen lẫn chữ Việt).

2. **Bảng tổng quan cơ sở sản xuất (Our Facilities at a Glance):**
   - **Vấn đề:** Dev trải dài toàn bộ 11 nhà máy ra màn hình khiến người xem phải cuộn chuột mỏi tay, web bị dài quá mức cần thiết.
   - **Giải pháp của anh Thành:**
     - Gom gọn bảng lại, chỉ hiển thị mặc định các thông tin tóm tắt cốt lõi.
     - Thiết kế nút bấm **"Xem thêm" (Expand / Dropdown / Accordion)** để khi khách cần xem chi tiết cơ sở nào thì mới bấm thả xuống.
     - Bảng mặc định chỉ giữ **4 cột hiển thị chính**:
       1. `Facility Name` (Tên cơ sở)
       2. `Location` (Địa phương/Tỉnh thành)
       3. `Area` (Diện tích $m^2$)
       4. `Specialization` (Chuyên môn sản xuất)
     - **Bổ sung chỉ số sản lượng:** Thêm cột/dòng thể hiện năng lực cung ứng theo số lượng container mỗi tháng (`Production Scale / Capacity in Containers`), lấy chuẩn số liệu theo file Master Data (ví dụ: Quy Nhơn 58 conts/tháng...).

---

### C. TRANG BỘ SƯU TẬP (COLLECTIONS PAGE)
*(Trao đổi ở mốc phút 105:00 trong video)*

1. **Hero Banner:**
   - Thay ảnh tĩnh bằng **video nền B2B Export** (cảnh nhà máy đóng thùng container, kiểm định chất lượng, không gian nghỉ dưỡng cao cấp sử dụng nội thất DHT).
   - Chữ tiêu đề lồng ghép trực tiếp lên video với lớp phủ nhẹ để tránh trống trải giao diện.
2. **Thanh công cụ Tìm kiếm & Bộ lọc:**
   - **Giữ lại ô Search (Tìm kiếm):** Cho phép gõ tìm nhanh theo chất liệu hoặc tên dòng sản phẩm (ví dụ: gõ *"Alu"* ra sản phẩm nhôm, *"Teak"* ra gỗ teak, *"Sofa"* ra các bộ sofa).
   - **BỎ CÁC TAB FILTER DANH MỤC:** Không dùng thanh tab chia nhỏ danh mục gây hụt dữ liệu.
   - Dàn đều lưới sản phẩm ra cho thoáng mắt (grid 3 hoặc 4 cột tùy độ phân giải màn hình), tập trung vào ảnh chất lượng cao và quy cách sản phẩm.

---

### D. CẤU TRÚC ĐIỀU HƯỚNG & CÁC TRANG CẦN LOẠI BỎ (SITE ARCHITECTURE)

1. **Xóa vĩnh viễn trang `About`:**
   - Khách khẳng định: DHT là nhà máy OEM xuất khẩu, không phải công ty dịch vụ hay bán lẻ cần kể chuyện lan man.
   - Mọi thông điệp về uy tín, năng lực cốt lõi đã được trình bày cô đọng tại `Home` và `Manufacturing`. Việc duy trì riêng trang About làm loãng web và phân tán sự chú ý của khách mua hàng B2B.
2. **Loại bỏ trang `Showroom & Gallery`:**
   - Không phù hợp với mô hình B2B xuất khẩu.
3. **Cân nhắc trang `Quality & Compliance`:**
   - Không nên tách thành một trang đơn lẻ nghèo nàn nội dung; tích hợp toàn bộ các chứng chỉ quốc tế (FSC, ISO, BSCI, SMETA) vào trang `Manufacturing`.

---

### E. QUY CHUẨN MASTER DATA & TÍNH PHÁP LÝ THƯƠNG HIỆU

1. **Chứng chỉ Gỗ (FSC Certification):**
   - Tất cả các dòng sản phẩm gỗ (Teak, Acacia, Bạch đàn) bắt buộc phải gắn nhãn/ghi chú chứng chỉ **FSC 100%** hoặc **FSC Mix Credit**. Đây là điều kiện tiên quyết để chào hàng vào thị trường Châu Âu và Mỹ.
2. **Xóa sổ hoàn toàn tàn dư "JDD":**
   - Rà soát toàn bộ source code, database, file text để xóa sạch chữ "JDD".
3. **Chuẩn hóa quan hệ thương hiệu:**
   - Không dùng từ "Subsidiaries" (Công ty con).
   - Không dùng từ "Family-owned group" (Tập đoàn gia đình).
   - Dùng định nghĩa chuẩn: **"Strategic Manufacturing Alliance"** (Liên minh sản xuất chiến lược) hoặc **"Consortium of Specialized Manufacturing Facilities"**.

---

## PHẦN III: QUY TẮC PHỐI HỢP & NGUYÊN TẮC LÀM VIỆC MỚI VỚI KHÁCH HÀNG

Để chấm dứt hoàn toàn tình trạng "lầy nhầy", làm đi làm lại nhiều lần, Developer bắt buộc phải tuân thủ nghiêm ngặt quy trình làm việc sau:

```
[BƯỚC 1: XÁC NHẬN BRIEF]
       │
       ▼
[BƯỚC 2: CODE TỪNG COMPONENT / SECTION]
       │
       ▼
[BƯỚC 3: CHỤP MÀN HÌNH (SCREENSHOT) + DEMO URL GỬI KHÁCH DUYỆT]
       │
       ├─► [NẾU CHƯA ĐẠT]: Sửa ngay theo góp ý (không tự ý qua bước mới)
       │
       └─► [NẾU KHÁCH OK]: MỚI ĐƯỢC CHUYỂN SANG SECTION TIẾP THEO
```

### 3 Nguyên tắc "Sống còn":
1. **Làm tới đâu nghiệm thu tới đó:** Tuyệt đối không tự ý hoàn thiện cả trang mà không gửi hình ảnh xác nhận từng khối.
2. **Một ngôn ngữ thống nhất:** Vì đây là website B2B quốc tế, toàn bộ giao diện phía ngoài (Front-end) phải là **tiếng Anh chuẩn xác, chuyên nghiệp**. Tiếng Việt chỉ phục vụ tài liệu nội bộ trao đổi giữa dev và ban quản lý.
3. **Bảo toàn phong cách RIVR Design:** Giữ đúng tinh thần thiết kế tinh tế: nền sáng thanh lịch (`#f0f0f0`), kính mờ vừa phải, bo góc lớn sang trọng, font Helvetica trang nhã, chuyển động mượt mà không lòe loẹt.

---

## PHẦN IV: CHECKLIST NGHIỆM THU CHI TIẾT (ACTIONABLE CHECKLIST)

| Hạng mục | Công việc chi tiết | File liên quan | Trạng thái |
| :--- | :--- | :--- | :--- |
| **Nav & Header** | Xóa link `About`, `Showroom`; chuẩn hóa logo `DHT Furniture` | `src/components/Navbar.tsx` | Cần làm |
| **Home - Section 4** | Xóa hoàn toàn khối `Craftsmanship` / Video xưởng khỏi trang Home | `src/features/home/components/FactoryVideoSection.tsx` | Cần làm |
| **Home - Section 5** | Cập nhật đúng ảnh & tên 4 liên minh sản xuất (Outdoor, Modern Wood, Metal, Traditional Wood) | `src/features/home/components/...` | Cần làm |
| **Home - Section 6** | Bỏ toàn bộ tab filter; Cố định hiển thị 8 bộ sưu tập do anh Thành duyệt | `src/features/home/components/CollectionsPreview.tsx` | Cần làm |
| **Home - Section 7** | Xóa bỏ lớp blur nền tối; hiển thị sắc nét 6 nhóm nguyên vật liệu + text riêng | `src/features/home/components/MaterialsSection.tsx` | Cần làm |
| **Home - Section 8** | Tinh giản Footer thành đúng 2 khối: DHT Overview & Contact | `src/components/Footer.tsx` | Cần làm |
| **Manufacturing** | Chỉnh tỉ lệ Map (45% trái - 55% phải); sửa lỗi tiếng Anh/tiếng Việt | `src/components/maps/VietnamProductionMap.tsx` | Cần làm |
| **Manufacturing** | Thêm nút "Xem thêm" (dropdown/accordion) cho bảng 11 cơ sở; bổ sung cột container capacity | `src/pages/manufacturing.tsx` | Cần làm |
| **Collections** | Lồng video nền B2B; giữ ô search keyword, bỏ tab filter danh mục | `src/pages/collections.tsx` | Cần làm |
| **Master Data** | Quét sạch chữ "JDD"; kiểm tra nhãn chứng nhận FSC cho toàn bộ sản phẩm gỗ | Toàn bộ codebase & data | Cần làm |
| **Routes** | Ẩn/xóa route `/about` | `src/pages/about.tsx` / `src/app/about` | Cần làm |

