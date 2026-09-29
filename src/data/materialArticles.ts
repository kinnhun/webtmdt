export type MaterialArticle = {
  slug: string;
  key: string;
  image: string;
  hoverImage: string;
  badge: string;
  badgeVi?: string;
  title: string;
  titleVi?: string;
  headline: string;
  headlineVi?: string;
  intro: string;
  introVi?: string;
  layout: "editorial" | "premium" | "technical" | "comfort";
  stats: string[];
  statsVi?: string[];
  policyBox?: {
    title: string;
    titleVi?: string;
    text: string;
    textVi?: string;
  };
  sections: {
    title: string;
    titleVi?: string;
    body?: string;
    bodyVi?: string;
    bullets?: string[];
    bulletsVi?: string[];
    image?: string;
  }[];
};

const version = "20260608-5";

export const materialArticles: MaterialArticle[] = [
  {
    slug: "acacia-wood-outdoor-furniture",
    key: "solidOak",
    image: `/img/materials/AcaciaWood1.png?v=${version}`,
    hoverImage: `/img/materials/AcaciaWood2.png?v=${version}`,
    badge: "FSC-CERTIFIED ACACIA",
    badgeVi: "GỖ TRÀM CHỨNG NHẬN FSC",
    title: "Cost-Effective Outdoor Solution",
    titleVi: "Giải Pháp Ngoại Thất Hiệu Quả Chi Phí",
    headline: "Acacia for Outdoor Furniture Programmes",
    headlineVi: "Gỗ Tràm Cho Các Chương Trình Nội Thất Ngoại Thất",
    intro: "When sourcing outdoor furniture for high-volume retail programmes across the US, EU, and UK, cost efficiency must pair with verified sustainability. DHT utilizes FSC-certified Acacia hybrid grown in Vietnam, combining attractive natural grain with dependable outdoor durability under recommended maintenance.",
    introVi: "Khi phát triển các chương trình nội thất ngoại thất quy mô lớn cho thị trường Mỹ, EU và Anh, hiệu quả chi phí cần đi đôi với nguồn gốc bền vững. DHT sử dụng gỗ keo lai (Acacia hybrid) có chứng nhận FSC trồng tại Việt Nam, mang lại vân gỗ đẹp và độ bền tin cậy khi được bảo dưỡng đúng cách.",
    layout: "editorial",
    stats: ["FSC-Certified Wood", "Acacia hybrid (Vietnam)", "Kiln-dried (8-12% target MC per spec)"],
    statsVi: ["Gỗ Chứng Nhận FSC", "Gỗ keo lai (Việt Nam)", "Sấy lò (Độ ẩm mục tiêu 8-12% theo spec)"],
    policyBox: {
      title: "Material Specification & Sourcing Standard",
      titleVi: "Quy Chuẩn Vật Liệu & Cam Kết Kỹ Thuật",
      text: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme.",
      textVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng.",
    },
    sections: [
      {
        title: "Why Acacia Hybrid Works for International Retailers",
        titleVi: "Ưu Thế Của Gỗ Tràm Lai Cho Chuỗi Bán Lẻ Quốc Tế",
        body: "Acacia hybrid is widely recognized as one of the most reliable and cost-efficient hardwoods for outdoor furniture. All wood used in DHT furniture is FSC-certified. Supporting documentation is maintained for the applicable FSC claim, while EUDR and Lacey Act due diligence dossiers are provided per buyer specification.",
        bodyVi: "Gỗ keo lai được công nhận rộng rãi là một trong những loại gỗ cứng hiệu quả chi phí và ổn định cho nội thất ngoài trời. Toàn bộ gỗ sử dụng trong sản phẩm DHT đều có chứng nhận FSC. Hồ sơ chứng minh được lưu trữ tương ứng với từng công bố FSC áp dụng, đồng thời hồ sơ giải trình EUDR và Lacey Act được cung cấp theo đặc tả của người mua.",
        bullets: [
          "Controlled kiln drying to target 8-12% moisture content according to product specification and regional climate requirements to stabilize wood movement",
          "Attractive natural grain suitable for oiled, brushed, polyurethane, or tinted exterior finishes",
          "Care & Maintenance: Periodic cleaning and reapplication of outdoor timber oil recommended according to finish type and weather exposure",
          "Stable supply chain from certified plantations supporting volume seasonal rollouts",
        ],
        bulletsVi: [
          "Quy trình sấy lò kiểm soát độ ẩm mục tiêu 8-12% theo đặc tả kỹ thuật và khí hậu vùng xuất khẩu nhằm ổn định sự co giãn tự nhiên của gỗ",
          "Vân gỗ tự nhiên trang nhã, phù hợp với các hệ hoàn thiện lau dầu, chải xước hoặc phủ màu bảo vệ ngoài trời",
          "Hướng dẫn bảo quản: Khuyến nghị lau sạch định kỳ và quét bổ sung dầu dưỡng gỗ ngoài trời tùy theo loại bề mặt hoàn thiện và mức độ tiếp xúc thời tiết",
          "Chuỗi cung ứng ổn định từ rừng trồng có chứng chỉ, đáp ứng các đợt giao hàng lớn theo mùa vụ",
        ],
        image: `/img/materials/AcaciaWood2.png?v=${version}`,
      },
      {
        title: "Built for Mass Retail & Drop-Ship Optimization",
        titleVi: "Tối Ưu Cho Bán Lẻ Quy Mô Lớn & Thương Mại Điện Tử",
        body: "DHT develops acacia programmes tailored for mass retail chains, e-commerce distributors, and private label brands, developing construction and packaging around agreed buyer criteria.",
        bodyVi: "DHT phát triển các chương trình gỗ tràm được tinh chỉnh cho chuỗi bán lẻ, nhà phân phối thương mại điện tử và nhãn hàng riêng, thiết kế kết cấu và đóng gói xoay quanh tiêu chí đã thống nhất.",
        bullets: [
          "Mixed SKU container loading to optimize ocean freight efficiency and container utilization",
          "Packaging engineered to meet agreed drop-test standards (e.g. ISTA 1A / 3A criteria where specified by buyer)",
          "Automated CNC joinery ensuring repeatable structural precision across production batches",
          "Exterior finishing systems formulated for exterior exposure and buyer aesthetic requirements",
        ],
        bulletsVi: [
          "Đóng hàng container ghép linh hoạt giúp tối ưu hóa chi phí vận chuyển đường biển và thể tích xếp hàng",
          "Quy cách bao bì được thiết kế đáp ứng các tiêu chuẩn thả rơi đã thỏa thuận (như ISTA 1A / 3A khi người mua yêu cầu)",
          "Gia công mộng liên kết bằng máy CNC tự động, bảo đảm độ chính xác lặp lại đồng đều qua các lô hàng",
          "Hệ thống sơn phủ ngoài trời được pha chế phù hợp với điều kiện thời tiết và yêu cầu thẩm mỹ của khách hàng",
        ],
        image: `/img/materials/AcaciaWood1.png?v=${version}`,
      },
      {
        title: "Commercial Execution & Order Parameters",
        titleVi: "Thực Thi Thương Mại & Tiến Độ Sản Xuất",
        body: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme (typical baseline: 60-90 days for initial production, 45-60 days for repeat orders following confirmed specifications and material availability). DHT does not issue generic blanket lead time or price guarantees without verified program scope.",
        bodyVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng (mốc tham chiếu thông thường: 60-90 ngày cho đơn sản xuất mới, 45-60 ngày cho đơn lặp lại sau khi chốt bản vẽ kỹ thuật và sẵn sàng vật tư). DHT không cam kết thời gian giao hàng hay giá cố định chung cho mọi trường hợp khi chưa chốt phạm vi chương trình.",
        bullets: [
          "Color and finish matching against approved physical master control swatches",
          "Full traceability documentation from certified plantation concessions",
          "Dedicated commercial and technical project management for seasonal rollouts",
        ],
        bulletsVi: [
          "So màu và đối chuẩn bề mặt hoàn thiện theo mẫu gốc (master swatch) đã được phê duyệt",
          "Hồ sơ truy xuất nguồn gốc đầy đủ từ các lâm trường rừng trồng có chứng chỉ hợp lệ",
          "Đội ngũ quản lý dự án thương mại và kỹ thuật theo sát từng đợt giao hàng mùa vụ",
        ],
      },
    ],
  },
  {
    slug: "teak-wood-premium-outdoor-durability",
    key: "premiumTeak",
    image: `/img/materials/TeakWood1.png?v=${version}`,
    hoverImage: `/img/materials/TeakWood2.png?v=${version}`,
    badge: "FSC-CERTIFIED TEAK",
    badgeVi: "GỖ TEAK CHỨNG NHẬN FSC",
    title: "Premium Outdoor Collections",
    titleVi: "Bộ Sưu Tập Ngoài Trời Cao Cấp",
    headline: "Teak for Premium Outdoor Collections",
    headlineVi: "Gỗ Teak Cho Các Bộ Sưu Tập Ngoại Thất Cao Cấp",
    intro: "In the premium outdoor sector across North America, Europe, and Australia, teak remains the global benchmark for outdoor resilience. DHT sources FSC-certified Tectona grandis from sustainably managed plantations in Mato Grosso, Brazil.",
    introVi: "Trong phân khúc ngoại thất cao cấp tại Bắc Mỹ, Châu Âu và Úc, gỗ teak luôn là chuẩn mực về độ bền tự nhiên. DHT cung ứng gỗ Tectona grandis có chứng nhận FSC từ các khu rừng trồng được quản lý bền vững tại bang Mato Grosso, Brazil.",
    layout: "premium",
    stats: ["FSC-Certified Wood", "Tectona grandis (Mato Grosso)", "Natural Patina Aging"],
    statsVi: ["Gỗ Chứng Nhận FSC", "Tectona grandis (Mato Grosso, Brazil)", "Lên màu xám bạc tự nhiên"],
    policyBox: {
      title: "Material Specification & Sourcing Standard",
      titleVi: "Quy Chuẩn Vật Liệu & Cam Kết Kỹ Thuật",
      text: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme.",
      textVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng.",
    },
    sections: [
      {
        title: "Natural Chemistry & Weather Resistance",
        titleVi: "Đặc Tính Tự Nhiên & Khả Năng Kháng Thời Tiết",
        body: "Teak wood possesses high natural oil content and tight grain density, providing outstanding natural resistance against moisture, rot, and insects without chemical pressure-treatment.",
        bodyVi: "Gỗ teak chứa hàm lượng dầu tự nhiên cao và mật độ thớ gỗ chặt, mang lại khả năng chống ẩm, mục rữa và côn trùng vượt trội mà không cần xử lý ngâm tẩm hóa chất áp lực.",
        bullets: [
          "Naturally develops a distinguished silver-grey patina over time when exposed to outdoor elements, reflecting the authentic character of untreated solid teak",
          "High natural dimensional stability under wide temperature and humidity fluctuations",
          "Care & Maintenance: Low-maintenance performance requiring periodic gentle cleaning with mild soapy water; teak sealer may optionally be applied if preserving warm golden-brown tones is preferred",
          "Ideal for premium residential terraces, luxury hospitality resorts, and contract dining",
        ],
        bulletsVi: [
          "Tự nhiên chuyển dần sang lớp màu xám bạc (silver-grey patina) sang trọng theo thời gian khi tiếp xúc với nắng mưa ngoài trời, thể hiện đặc tính nguyên bản của gỗ teak tự nhiên",
          "Độ ổn định kích thước tự nhiên cao dưới biên độ dao động nhiệt độ và độ ẩm lớn",
          "Hướng dẫn bảo quản: Vệ sinh định kỳ bằng nước xà phòng loãng và bàn chải mềm; có thể tùy chọn quét thêm dầu bảo quản/sealer nếu muốn lưu giữ sắc vàng nâu ấm ban đầu",
          "Lựa chọn lý tưởng cho ban công biệt thự cao cấp, khu nghỉ dưỡng sang trọng và dự án khách sạn",
        ],
        image: `/img/materials/TeakWood2.png?v=${version}`,
      },
      {
        title: "Precision Processing & Moisture Equilibrium",
        titleVi: "Gia Công Chuẩn Xác & Cân Bằng Độ Ẩm",
        body: "Executing premium teak collections requires disciplined timber conditioning. DHT operates computerized kiln drying systems to achieve target moisture equilibrium suited to the destination market, stabilizing timber movement while respecting the natural characteristics of solid hardwood.",
        bodyVi: "Chế tác các bộ sưu tập teak cao cấp đòi hỏi sự kiểm soát sấy gỗ nghiêm ngặt. DHT vận hành hệ thống lò sấy điều khiển số nhằm đạt độ ẩm cân bằng phù hợp với thị trường đích, giảm thiểu ứng suất bên trong và ổn định độ co ngót tự nhiên của gỗ cứng.",
        bullets: [
          "Computerized kiln drying calibrated to destination market equilibrium moisture content (EMC)",
          "Traditional mortise and tenon joinery reinforced with exterior-grade stainless steel hardware where specified by technical drawings",
          "FSC Chain of Custody (CoC) certification supporting transparent due diligence documentation",
          "Precision multi-stage sanding providing smooth tactile surface quality",
        ],
        bulletsVi: [
          "Lò sấy vi tính điều chỉnh theo độ ẩm cân bằng (EMC) của thị trường đích nhằm hạn chế biến dạng",
          "Kết cấu mộng ghép truyền thống gia cố bằng phụ kiện ốc vít inox ngoài trời theo bản vẽ kỹ thuật đã duyệt",
          "Chứng chỉ FSC CoC hỗ trợ hồ sơ giải trình nguồn gốc gỗ minh bạch cho các đơn hàng xuất khẩu",
          "Quy trình chà nhám tinh nhiều cấp tạo độ mịn màng và cảm giác tiếp xúc cao cấp trên bề mặt gỗ",
        ],
        image: `/img/materials/TeakWood1.png?v=${version}`,
      },
      {
        title: "Designed for Long-Term Value & Programme Execution",
        titleVi: "Giá Trị Bền Vững & Thực Thi Chương Trình",
        body: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme. Durability translates into long product lifecycles when paired with proper care and agreed structural design.",
        bodyVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng. Độ bền vượt trội mang lại vòng đời sử dụng lâu dài khi kết hợp bảo dưỡng phù hợp và thiết kế kết cấu đã thống nhất.",
        bullets: [
          "Sourced exclusively from certified plantation concessions in Mato Grosso, Brazil",
          "Care instructions provided per finish configuration (natural untreated teak vs. protective exterior sealer)",
          "Batch consistency and custom hardware integration aligned with buyer technical packs",
        ],
        bulletsVi: [
          "Khai thác có trách nhiệm từ các lâm trường rừng trồng có chứng chỉ FSC tại bang Mato Grosso, Brazil",
          "Tài liệu hướng dẫn bảo quản chi tiết theo từng cấu hình hoàn thiện (để mộc tự nhiên hoặc quét phủ bảo vệ)",
          "Đồng nhất chất lượng theo lô và tích hợp phụ kiện cơ khí theo đúng hồ sơ kỹ thuật của khách hàng",
        ],
      },
    ],
  },
  {
    slug: "powder-coated-aluminum-modern-scalable",
    key: "aluminium",
    image: `/img/materials/Powder-CoatedAluminum1.png?v=${version}`,
    hoverImage: `/img/materials/Powder-CoatedAluminum2.png?v=${version}`,
    badge: "POWDER-COATED ALUMINUM",
    badgeVi: "NHÔM SƠN TĨNH ĐIỆN",
    title: "Aluminium & Mixed-Material",
    titleVi: "Nhôm & Vật Liệu Hỗn Hợp",
    headline: "Aluminium & Mixed-Material Outdoor Furniture",
    headlineVi: "Nội Thất Ngoại Thất Nhôm & Vật Liệu Hỗn Hợp",
    intro: "Lightweight, corrosion-resistant, and visually sleek — architectural powder-coated aluminium enables brands to scale modern outdoor programmes with efficient logistics handling and dependable exterior performance.",
    introVi: "Trọng lượng nhẹ, chống ăn mòn hiệu quả và đường nét kiến trúc tinh tế — nhôm sơn tĩnh điện giúp các thương hiệu phát triển danh mục ngoại thất hiện đại với chi phí vận chuyển tối ưu và chất lượng bền bỉ.",
    layout: "technical",
    stats: ["Architectural Alloy", "Pre-treated & Coated", "CBM & Freight Efficient"],
    statsVi: ["Hợp kim tiêu chuẩn", "Tiền xử lý & Sơn phủ", "Tối ưu thể tích CBM"],
    policyBox: {
      title: "Material Specification & Technical Standard",
      titleVi: "Quy Chuẩn Kỹ Thuật & Cấu Hình Vật Liệu",
      text: "Frame construction, welding, surface preparation, coating and hardware are specified for the intended application. Fabric, filling and cushion construction are selected according to the product design and target market. Branded fabrics and specialised cushion systems are quoted separately where available.",
      textVi: "Kết cấu khung, hàn, tiền xử lý bề mặt, sơn phủ và phụ kiện kim khí được xác định theo mục đích ứng dụng. Vải bọc, vật liệu nhồi và kết cấu đệm được lựa chọn theo thiết kế sản phẩm và thị trường mục tiêu. Vải có thương hiệu và các hệ đệm chuyên dụng được báo giá riêng theo khả năng cung ứng.",
    },
    sections: [
      {
        title: "Engineered Surface Protection",
        titleVi: "Quy Trình Tiền Xử Lý & Bảo Vệ Bề Mặt",
        body: "To prepare raw metal for exterior exposure, DHT applies multi-stage surface pre-treatment (chemical cleaning, degreasing, and anti-oxidation conversion) before electrostatically applying exterior-grade polyester powder coatings.",
        bodyVi: "Để chuẩn bị bề mặt kim loại trước điều kiện ngoại cảnh khắc nghiệt, DHT áp dụng quy trình tiền xử lý nhiều giai đoạn (tẩy dầu, làm sạch hóa chất và chuyển hóa chống oxy hóa) trước khi phun sơn tĩnh điện bột polyester chuyên dụng ngoài trời.",
        bullets: [
          "Multi-stage anti-corrosion pre-treatment suitable for patio, poolside, and outdoor residential environments",
          "Exterior-grade polyester powder coatings tested for exterior adhesion and UV color stability",
          "Lightweight structural aluminium profile reducing freight weight and facilitating container handling",
          "Precision TIG and MIG welding ensuring structural frame integrity and clean, consistent joint lines",
        ],
        bulletsVi: [
          "Quy trình tiền xử lý chống ăn mòn đa cấp phù hợp với ban công, khu vực hồ bơi và không gian ngoài trời",
          "Lớp phủ sơn tĩnh điện bột chuyên dụng ngoài trời được kiểm tra độ bám dính và độ bền màu dưới tia UV",
          "Biên dạng thanh nhôm nhẹ giúp giảm trọng tải vận chuyển và dễ dàng xếp dỡ container",
          "Kỹ thuật hàn TIG và MIG chuẩn xác bảo đảm độ vững chắc của khung và đường hàn thẩm mỹ, đồng đều",
        ],
        image: `/img/materials/Powder-CoatedAluminum2.png?v=${version}`,
      },
      {
        title: "Mixed-Material Integration",
        titleVi: "Tích Hợp Vật Liệu Hỗn Hợp & Kết Cấu",
        body: "Aluminium frames serve as a stable structural backbone for contemporary mixed-material collections, pairing with FSC timber accents, hand-woven all-weather ropes, and custom cushion configurations.",
        bodyVi: "Khung nhôm đóng vai trò là khung chịu lực ổn định cho các bộ sưu tập vật liệu hỗn hợp hiện đại, kết hợp hài hòa cùng các chi tiết gỗ FSC, dây đan kháng thời tiết và các cấu hình đệm ngồi theo yêu cầu.",
        bullets: [
          "Precision tube bending and custom-engineered cast corner joints for clean design profiles",
          "Knockdown (KD) and nestable configurations engineered to optimize packaging volume and container utilization per product specification",
          "Integration compatibility with exterior Olefin webbing, outdoor rope weaving, and specified performance textiles",
        ],
        bulletsVi: [
          "Uốn ống chính xác và khớp nối đúc định hình tạo phom dáng thiết kế thanh thoát, hiện đại",
          "Kết cấu tháo rời lắp ráp (KD) và chồng xếp tối ưu hóa thể tích đóng gói và hệ số đóng container theo đặc tả sản phẩm",
          "Khả năng kết hợp đồng bộ với dây đai Olefin ngoài trời, dây thừng dệt và các dòng vải bọc chuyên dụng",
        ],
        image: `/img/materials/Powder-CoatedAluminum1.png?v=${version}`,
      },
      {
        title: "Commercial Execution & Technical Sampling",
        titleVi: "Triển Khai Thương Mại & Quy Trình Mẫu Thử",
        body: "Frame construction, welding, surface preparation, coating and hardware are specified for the intended application. Sample development and production scheduling are initiated following signed technical drawings, BOM sign-off, and master color swatch approval.",
        bodyVi: "Kết cấu khung, hàn, tiền xử lý bề mặt, sơn phủ và phụ kiện kim khí được xác định theo mục đích ứng dụng. Quá trình làm mẫu thử và lập tiến độ sản xuất được kích hoạt sau khi ký duyệt bản vẽ kỹ thuật, chốt định mức vật tư BOM và duyệt mẫu màu gốc.",
        bullets: [
          "Custom extrusion profiles and hardware integration developed around buyer technical packs",
          "Powder coating finish matching against physical color targets (matte, textured, or satin sheens)",
          "Structured sampling workflow with milestones confirmed against approved technical specifications",
        ],
        bulletsVi: [
          "Biên dạng đùn nhôm và phụ kiện kim khí được phát triển theo hồ sơ kỹ thuật của khách hàng",
          "Đối chuẩn màu sơn tĩnh điện theo mẫu chuẩn thực tế (độ mờ, sần hạt hoặc độ bóng satin)",
          "Quy trình phát triển mẫu có mốc kiểm soát rõ ràng sau khi thống nhất thông số kỹ thuật",
        ],
      },
    ],
  },
  {
    slug: "outdoor-fabric-performance-comfort",
    key: "linenVelvet",
    image: `/img/materials/OutdoorFabric1.png?v=${version}`,
    hoverImage: `/img/materials/OutdoorFabric2.png?v=${version}`,
    badge: "PERFORMANCE FABRICS",
    badgeVi: "VẢI & ĐỆM NGOẠI THẤT",
    title: "Fabrics & Cushion Systems",
    titleVi: "Hệ Vải & Đệm Ngồi Chuyên Dụng",
    headline: "Fabrics & Cushion Systems",
    headlineVi: "Hệ Vải Bọc & Đệm Ngồi Chuyên Dụng Ngoại Thất",
    intro: "In outdoor seating, aesthetic appeal works hand-in-hand with functional comfort. DHT integrates certified solution-dyed textiles and resilient cushioning systems selected to suit the product design, target market, and exposure requirements.",
    introVi: "Trong nội thất ngoại thất, tính thẩm mỹ luôn đồng hành cùng sự êm ái và tiện nghi. DHT kết hợp các dòng vải sợi nhuộm dung dịch và hệ nệm mút được lựa chọn phù hợp với thiết kế, thị trường mục tiêu và yêu cầu thời tiết.",
    layout: "comfort",
    stats: ["Solution-Dyed Olefin", "Water-Repellent Coating", "Configured Cushion Options"],
    statsVi: ["Vải sợi Olefin", "Xử lý trượt nước", "Tùy chọn đệm theo cấu hình"],
    policyBox: {
      title: "Material Specification & Technical Standard",
      titleVi: "Quy Chuẩn Kỹ Thuật & Cấu Hình Vật Liệu",
      text: "Frame construction, welding, surface preparation, coating and hardware are specified for the intended application. Fabric, filling and cushion construction are selected according to the product design and target market. Branded fabrics and specialised cushion systems are quoted separately where available.",
      textVi: "Kết cấu khung, hàn, tiền xử lý bề mặt, sơn phủ và phụ kiện kim khí được xác định theo mục đích ứng dụng. Vải bọc, vật liệu nhồi và kết cấu đệm được lựa chọn theo thiết kế sản phẩm và thị trường mục tiêu. Vải có thương hiệu và các hệ đệm chuyên dụng được báo giá riêng theo khả năng cung ứng.",
    },
    sections: [
      {
        title: "Exterior Textile Standards",
        titleVi: "Tiêu Chuẩn Vải Bọc Ngoại Thất",
        body: "Standard collections utilize durable solution-dyed Olefin fabrics offering high UV resistance and outdoor color stability for residential and commercial hospitality settings.",
        bodyVi: "Các bộ sưu tập tiêu chuẩn sử dụng vải sợi nhuộm dung dịch Olefin có độ bền màu cao dưới ánh nắng và khả năng chống tia UV, phù hợp cho cả mục đích dân dụng lẫn dự án khách sạn.",
        bullets: [
          "Solution-dyed Olefin fabrics offering high UV resistance and outdoor color stability",
          "Water-repellent surface finishes engineered for exterior residential and hospitality use",
          "Mildew-resistant properties and easy spot cleaning for low-maintenance outdoor living",
          "Removable zippered covers engineered for straightforward laundering and seasonal commercial maintenance",
        ],
        bulletsVi: [
          "Vải sợi Olefin nhuộm dung dịch mang lại khả năng kháng tia cực tím và độ bền màu cao ngoài trời",
          "Lớp xử lý trượt nước bề mặt được thiết kế cho nhu cầu sử dụng sân vườn và khu nghỉ dưỡng",
          "Đặc tính kháng nấm mốc và dễ dàng làm sạch vết bẩn tại chỗ, giảm thiểu công bảo dưỡng",
          "Vỏ đệm có khóa kéo tháo rời thuận tiện cho việc giặt tẩy và bảo trì định kỳ theo mùa",
        ],
        image: `/img/materials/OutdoorFabric2.png?v=${version}`,
      },
      {
        title: "Cushion Fillings & Drainage Options",
        titleVi: "Vật Liệu Nhồi & Các Tùy Chọn Thoát Nước",
        body: "Standard seat and back cushions feature high-resilience polyurethane foam cores wrapped in protective polyester fiber. Where specified by the buyer programme, reticulated quick-dry foam cores and breathable mesh drainage panels are available as configured upgrades.",
        bodyVi: "Đệm ngồi và đệm tựa lưng tiêu chuẩn sử dụng mút polyurethane đàn hồi cao bọc sợi polyester bảo vệ. Khi có yêu cầu trong chương trình đơn hàng, lõi mút xốp thoát nước nhanh (quick-dry foam) và đáy lưới thoáng khí được cung cấp dưới dạng tùy chọn nâng cấp.",
        bullets: [
          "High-resilience foam cores engineered to maintain structural shape over repeated seating cycles",
          "Optional quick-dry reticulated foam and breathable mesh base panels quoted separately for exposed outdoor applications",
          "Branded textiles (such as Sunbrella, Agora) and fire-retardant foam certifications (CA TB117, BS 5852) quoted per project specification and market availability",
        ],
        bulletsVi: [
          "Lõi mút có độ phục hồi cao, giữ phom dáng ổn định qua chu kỳ sử dụng lặp lại",
          "Tùy chọn mút xốp thoát nước nhanh (quick-dry) và lưới đáy thoáng khí được báo giá riêng cho các vị trí trực tiếp tiếp xúc mưa nắng",
          "Vải có thương hiệu (như Sunbrella, Agora) và chứng nhận mút chống cháy (CA TB117, BS 5852) được báo giá riêng theo hồ sơ dự án và nguồn cung",
        ],
        image: `/img/materials/OutdoorFabric1.png?v=${version}`,
      },
      {
        title: "Quality Inspection & Programme Alignment",
        titleVi: "Kiểm Soát Chất Lượng & Phù Hợp Đơn Hàng",
        body: "Frame construction, welding, surface preparation, coating and hardware are specified for the intended application. Fabric, filling and cushion construction are selected according to the product design and target market. Branded fabrics and specialised cushion systems are quoted separately where available.",
        bodyVi: "Kết cấu khung, hàn, tiền xử lý bề mặt, sơn phủ và phụ kiện kim khí được xác định theo mục đích ứng dụng. Vải bọc, vật liệu nhồi và kết cấu đệm được lựa chọn theo thiết kế sản phẩm và thị trường mục tiêu. Vải có thương hiệu và các hệ đệm chuyên dụng được báo giá riêng theo khả năng cung ứng.",
        bullets: [
          "Batch-to-batch seam tension, zipper durability, and dimensional fit inspection",
          "Fabric swatches and filling densities verified against approved buyer purchase specifications",
          "Care guidance and seasonal storage recommendations provided per textile configuration",
        ],
        bulletsVi: [
          "Kiểm tra ngẫu nhiên theo lô về độ căng đường may, độ bền khóa kéo và độ khít kích thước đệm",
          "Kiểm tra đối chiếu mẫu vải và mật độ mút với đặc tả kỹ thuật đơn hàng đã duyệt",
          "Cung cấp tài liệu hướng dẫn chăm sóc và lưu kho bảo quản theo từng cấu hình vải",
        ],
      },
    ],
  },
  {
    slug: "eucalyptus-wood-sustainable-strength",
    key: "eucalyptusWood",
    image: `/img/materials/AcaciaWood1.png?v=${version}`,
    hoverImage: `/img/materials/AcaciaWood2.png?v=${version}`,
    badge: "FSC-CERTIFIED EUCALYPTUS",
    badgeVi: "GỖ BẠCH ĐÀN CHỨNG NHẬN FSC",
    title: "Sustainable Hardwood Solutions",
    titleVi: "Giải Pháp Gỗ Cứng Bền Vững",
    headline: "Eucalyptus for Scalable Furniture Programmes",
    headlineVi: "Gỗ Bạch Đàn Cho Các Chương Trình Nội Thất Quy Mô",
    intro: "Eucalyptus grandis sourced from certified plantation forests in Uruguay offers high structural density, uniform grain texture, and dependable mechanical performance — serving as a proven timber for scalable, commercial-grade outdoor furniture programmes.",
    introVi: "Gỗ bạch đàn Eucalyptus grandis từ rừng trồng có chứng chỉ FSC tại Uruguay có mật độ thớ gỗ cao, thớ vân đồng đều và độ chịu lực tốt — là loại gỗ cứng tin cậy cho các chương trình nội thất ngoại thất quy mô thương mại.",
    layout: "technical",
    stats: ["FSC-Certified Wood", "Eucalyptus grandis (Uruguay)", "Dense Hardwood (8–12% MC Target)"],
    statsVi: ["Gỗ Chứng Nhận FSC", "Eucalyptus grandis (Uruguay)", "Gỗ cứng mật độ cao (Mục tiêu 8–12% MC)"],
    policyBox: {
      title: "Material Specification & Sourcing Standard",
      titleVi: "Quy Chuẩn Vật Liệu & Cam Kết Kỹ Thuật",
      text: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme.",
      textVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng.",
    },
    sections: [
      {
        title: "Material Attributes of Plantation Eucalyptus",
        titleVi: "Đặc Tính Kỹ Thuật Gỗ Bạch Đàn Rừng Trồng",
        body: "All wood used in DHT furniture is FSC-certified. Supporting documentation is maintained for the applicable FSC claim. Selected for its dense fiber structure and uniform grain, plantation Eucalyptus achieves high strength when seasoned according to destination climate requirements.",
        bodyVi: "Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Hồ sơ chứng minh được lưu trữ tương ứng với từng công bố FSC áp dụng. Được lựa chọn nhờ cấu trúc sợi gỗ đặc và thớ vân đồng đều, bạch đàn rừng trồng đạt độ bền cơ lý cao khi được sấy dưỡng phù hợp với khí hậu thị trường đến.",
        bullets: [
          "Controlled kiln drying to target 8-12% moisture content (per approved specification) to moderate timber movement and surface checking",
          "High bending and compressive strength suitable for load-bearing dining chairs, benches, and tables",
          "Rich reddish-brown timber tone that readily accepts protective exterior oils or polyurethane stains",
          "Care & Maintenance: Regular wiping and reapplication of exterior timber care oil recommended based on exposure level and specific finish applied",
          "Documented FSC supply chain with due diligence records maintained per market and programme specification",
        ],
        bulletsVi: [
          "Sấy lò kiểm soát độ ẩm mục tiêu 8-12% (theo tiêu chuẩn kỹ thuật đã duyệt) nhằm tiết chế độ co ngót và nứt chân chim bề mặt",
          "Khả năng chịu uốn và chịu nén cao, phù hợp cho kết cấu chịu lực của ghế ăn, băng ghế và bàn ngoài trời",
          "Sắc gỗ nâu đỏ ấm áp, dễ dàng thẩm thấu các hệ sơn dầu bảo vệ hoặc sơn gốc nước ngoài trời",
          "Hướng dẫn bảo quản: Lau sạch bụi bẩn và định kỳ quét lại dầu dưỡng gỗ ngoài trời tùy theo vị trí đặt sản phẩm và loại sơn phủ",
          "Chuỗi cung ứng gỗ FSC có tài liệu giải trình đầy đủ theo đặc tả của từng thị trường và chương trình",
        ],
        image: `/img/materials/AcaciaWood2.png?v=${version}`,
      },
      {
        title: "Industrial Processing & Technical Execution",
        titleVi: "Gia Công Công Nghiệp & Tiêu Chuẩn Kỹ Thuật",
        body: "Processed through specialized drying schedules and precision CNC machining, Eucalyptus components are manufactured to tight tolerances for efficient assembly and structural reliability.",
        bodyVi: "Được xử lý qua chu trình sấy chuyên biệt và gia công CNC độ chính xác cao, các chi tiết gỗ bạch đàn được chế tác với dung sai chặt chẽ, tối ưu cho việc lắp ráp và độ ổn định kết cấu.",
        bullets: [
          "Engineered tenon and dowel joints utilizing exterior-grade polyurethane D4 adhesives where specified by customer technical drawings and outdoor exposure grade",
          "Structural load testing and transit drop testing conducted in accordance with buyer-nominated standards (such as EN 581 outdoor furniture requirements or ASTM criteria where applicable)",
          "Optimized flat-pack (KD) and carton packaging configurations to maximize container load efficiency",
        ],
        bulletsVi: [
          "Kết cấu mộng và chốt liên kết sử dụng keo D4 tiêu chuẩn ngoài trời khi có yêu cầu trong bản vẽ kỹ thuật và cấp độ chịu thời tiết",
          "Thử nghiệm tải trọng kết cấu và thử nghiệm thả rơi bao bì được thực hiện theo tiêu chuẩn do người mua chỉ định (như EN 581 hoặc ASTM khi áp dụng)",
          "Quy cách đóng gói phẳng (KD) và thùng carton tối ưu hóa thể tích xếp dỡ container",
        ],
      },
      {
        title: "Commercial Supply & Programme Terms",
        titleVi: "Nguồn Cung Ổn Định & Điều Khoản Thương Mại",
        body: "Material selection, drying, construction and finishing are developed around the product specification and intended outdoor use. All wood used in DHT furniture is FSC-certified. Packaging, relevant testing and production timing are agreed for each buyer programme. Sustainable plantation stewardship supports consistent seasonal supply, with commercial pricing and production schedules contracted per individual customer programme.",
        bodyVi: "Lựa chọn vật liệu, sấy gỗ, kết cấu và hoàn thiện được phát triển xoay quanh đặc tả sản phẩm và điều kiện sử dụng ngoài trời dự kiến. Toàn bộ gỗ sử dụng trong sản phẩm nội thất DHT đều có chứng nhận FSC. Quy cách đóng gói, thử nghiệm liên quan và tiến độ sản xuất được thống nhất cho từng chương trình của khách hàng. Quy trình trồng rừng bền vững hỗ trợ nguồn cung ổn định theo mùa vụ; giá thương mại và tiến độ sản xuất được ký kết theo hợp đồng cụ thể của từng chương trình.",
        bullets: [
          "Certified plantation timber with transparent Chain of Custody documentation",
          "Technical support and finish matching based on approved master samples",
          "Flexible programme planning with lead times and capacity allocation scheduled upon purchase order confirmation",
        ],
        bulletsVi: [
          "Gỗ rừng trồng có chứng chỉ với hồ sơ chuỗi hành trình sản phẩm (CoC) minh bạch",
          "Hỗ trợ kỹ thuật và phối chuẩn màu hoàn thiện theo mẫu gốc đã được phê duyệt",
          "Lập kế hoạch sản xuất linh hoạt với tiến độ giao hàng và công suất nhà máy được phân bổ sau khi xác nhận đơn đặt hàng",
        ],
      },
    ],
  },
];

export const getMaterialArticle = (slug: string) => materialArticles.find((article) => article.slug === slug);
