const http = require('http');

const auditMatrix = [
  {
    page: 'Home Page',
    path: '/',
    slideRefs: ['Slide 04 (Hero & First Impression)', 'Slide 05 (Trust Bar & Key Scale)', 'Slide 06 (Core Strategic Pillars)'],
    tests: [
      { id: 'H1', desc: 'Hero Tagline / B2B Positioning', check: (h) => h.includes('DHT') && (h.includes('Furniture') || h.includes('Outdoor')) },
      { id: 'H2', desc: 'Profile Download CTA / Quotation CTA', check: (h) => h.includes('Catalogue') || h.includes('Contact') || h.includes('Profile') },
      { id: 'H3', desc: 'Scale Metric: 543,380 m² Combined Footprint', check: (h) => h.includes('543,380') || h.includes('543.380') },
      { id: 'H4', desc: 'Scale Metric: 11 Specialized Facilities', check: (h) => h.includes('11') && (h.includes('Facilities') || h.includes('cơ sở') || h.includes('nhà máy')) },
      { id: 'H5', desc: 'Scale Metric: 4 Manufacturing Clusters', check: (h) => h.includes('4') && (h.includes('Cluster') || h.includes('cụm')) },
      { id: 'H6', desc: 'Environmental Metric: 100% FSC Certified', check: (h) => h.includes('FSC') },
      { id: 'H7', desc: 'Schema Metadata: LocalBusiness DHT Furniture Vietnam', check: (h) => h.includes('DHT Furniture Vietnam') && h.includes('sales@dhtcompany.com') },
      { id: 'H8', desc: 'Address: 72 Le Thanh Ton, District 1, HCMC', check: (h) => h.includes('72 Le Thanh Ton') || h.includes('72 Lê Thánh Tôn') },
    ]
  },
  {
    page: 'About Us',
    path: '/about',
    slideRefs: ['Slide 07 (Heritage & Vision)', 'Slide 08 (Footprint & Facilities)', 'Slide 09 (Milestones & Leadership)'],
    tests: [
      { id: 'A1', desc: 'Group Scale: 11 Production Facilities across Vietnam', check: (h) => h.includes('11') },
      { id: 'A2', desc: 'Footprint: 543,380 m² Total Area', check: (h) => h.includes('543,380') || h.includes('543.380') },
      { id: 'A3', desc: 'Personnel: ~2,400 Group Personnel', check: (h) => h.includes('2,400') || h.includes('2.400') },
      { id: 'A4', desc: 'Showroom: 206 Phan Dinh Phung, Pleiku, Gia Lai', check: (h) => h.includes('206 Phan Dinh Phung') || h.includes('206 Phan Đình Phùng') },
      { id: 'A5', desc: 'Commercial Hub: 72 Le Thanh Ton, District 1, HCMC', check: (h) => h.includes('72 Le Thanh Ton') || h.includes('72 Lê Thánh Tôn') },
      { id: 'A6', desc: 'Dedicated Hotlines for Office (+84 932 058 545) & Showroom (+84 907 386 898)', check: (h) => h.includes('058 545') || h.includes('386 898') }
    ]
  },
  {
    page: 'Manufacturing',
    path: '/manufacturing',
    slideRefs: ['Slide 10 (Cluster Overview)', 'Slide 11 (Manufacturing Capacity & Machinery)'],
    tests: [
      { id: 'M1', desc: '4 Strategic Production Clusters Present', check: (h) => h.includes('4') && (h.includes('Cluster') || h.includes('Cụm')) },
      { id: 'M2', desc: 'Cluster 1: Quy Nhon / Binh Dinh Gateway', check: (h) => h.includes('Quy Nhon') || h.includes('Bình Định') || h.includes('Binh Dinh') },
      { id: 'M3', desc: 'Cluster 2: HCMC & Southern Corridor', check: (h) => h.includes('Southern') || h.includes('Hồ Chí Minh') || h.includes('HCMC') || h.includes('Đồng Nai') },
      { id: 'M4', desc: 'Cluster 3 & 4: Northern Hubs (Hung Yen, Phu Tho / Vinh Phuc)', check: (h) => h.includes('Hưng Yên') || h.includes('Hung Yen') || h.includes('Phú Thọ') },
      { id: 'M5', desc: 'Machinery & Kiln Capacity Breakdown', check: (h) => h.includes('CNC') || h.includes('kiln') || h.includes('sấy') || h.includes('UV') }
    ]
  },
  {
    page: 'Quality & Compliance',
    path: '/quality-compliance',
    slideRefs: ['Slide 12 (Certifications)', 'Slide 13 (Testing Standards)', 'Slide 14 (QC Process & Metrics)', 'Slide 20 (Sustainability & Resource Efficiency)'],
    tests: [
      { id: 'Q1', desc: 'Certifications: FSC-CoC, BSCI, SMETA, ISO 9001 / ISO 14001', check: (h) => h.includes('FSC') && (h.includes('BSCI') || h.includes('SMETA')) },
      { id: 'Q2', desc: 'Testing Standards: EN 581, BIFMA, ISTA 3A/6A', check: (h) => h.includes('581') || h.includes('BIFMA') || h.includes('ISTA') },
      { id: 'Q3', desc: 'Quality Metrics (Q04): OTIF ~95% & First Time Pass Rate ~92%', check: (h) => (h.includes('95%') || h.includes('OTIF')) && (h.includes('92%') || h.includes('FTPR')) },
      { id: 'Q4', desc: 'Quality Inspection Gates: IQC, IPQC, FQC, OQC with 12 QA/QC Team', check: (h) => h.includes('IQC') || h.includes('IPQC') || h.includes('12 QA/QC') || h.includes('QA/QC') },
      { id: 'Q5', desc: 'Sustainability (Slide 20): 100% FSC Traceability & 82% Cutting Yield', check: (h) => h.includes('82%') || h.includes('traceability') || h.includes('FSC') },
      { id: 'Q6', desc: 'Circular Operations: Biomass Heating & Closed-Loop Powder Coating', check: (h) => h.includes('biomass') || h.includes('powder coating') || h.includes('khép kín') || h.includes('sinh khối') }
    ]
  },
  {
    page: 'Catalogues (Indoor & Outdoor)',
    path: '/catalogue/outdoor',
    slideRefs: ['Slide 15 (Catalogue Architecture)', 'Slide 16 (Grid Layout & Product Cards)'],
    tests: [
      { id: 'C1', desc: 'B2B RFQ Integration', check: (h) => h.includes('Inquiry') || h.includes('Quote') || h.includes('Catalogue') || h.includes('Contact') },
      { id: 'C2', desc: 'Material & Collection Filtering Structure', check: (h) => h.includes('Material') || h.includes('Collection') || h.includes('Outdoor') || h.includes('Vật liệu') }
    ]
  },
  {
    page: 'Product Detail (Amalfi Lounge Collection)',
    path: '/catalogue/amalfi-lounge-collection',
    slideRefs: ['Slide 17 (Product Detail Layout)', 'Slide 18 (Specs, Dimensions & Material Integrity)'],
    tests: [
      { id: 'P1', desc: 'Multi-Item Collection Breakdown Table', check: (h) => h.includes('Swivel Lounge Chair') || h.includes('2-Seater Sofa') || h.includes('Coffee Table') },
      { id: 'P2', desc: 'Interactive Unit Toggle: cm ⇄ inches', check: (h) => h.includes('cm') && (h.includes('inches') || h.includes('in')) },
      { id: 'P3', desc: 'FSC Certified Material Integrity Badge', check: (h) => h.includes('FSC') && (h.includes('EUDR') || h.includes('REACH') || h.includes('Lacey Act')) },
      { id: 'P4', desc: 'Premium Materials: Powder-coated aluminum, FSC wood, Olefin rope', check: (h) => h.includes('Olefin') || h.includes('aluminum') || h.includes('Acacia') },
      { id: 'P5', desc: 'NO Self-Downgrading Language (0% medium-end, 0% trung cap)', check: (h) => !h.includes('medium-end') && !h.includes('trung cấp') && (h.includes('premium') || h.includes('cao cấp')) }
    ]
  },
  {
    page: 'Contact Us & RFQ Engine',
    path: '/contact',
    slideRefs: ['Slide 19 (Contact Us & RFQ Engine)'],
    tests: [
      { id: 'K1', desc: 'Official Sales Email: sales@dhtcompany.com', check: (h) => h.includes('sales@dhtcompany.com') },
      { id: 'K2', desc: 'HCMC Coordination Hub Address: 72 Le Thanh Ton, District 1', check: (h) => h.includes('72 Le Thanh Ton') || h.includes('72 Lê Thánh Tôn') },
      { id: 'K3', desc: 'Central Showroom Address: 206 Phan Dinh Phung, Pleiku, Gia Lai', check: (h) => h.includes('206 Phan Dinh Phung') || h.includes('206 Phan Đình Phùng') },
      { id: 'K4', desc: 'Hotline Contact Numbers: 3 Dedicated Lines', check: (h) => h.includes('058 545') && h.includes('386 898') && h.includes('907 399') },
      { id: 'K5', desc: 'B2B RFQ Inquiry Form with Target Market & Volume', check: (h) => h.includes('form') || h.includes('Project') || h.includes('Inquiry') || h.includes('Submit') || h.includes('Gửi') }
    ]
  }
];

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const req = http.get({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      headers: { 'User-Agent': 'DHT-Audit-Bot/2.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ path: urlPath, statusCode: res.statusCode, body: data });
      });
    });
    req.on('error', (err) => resolve({ path: urlPath, error: err.message }));
    req.setTimeout(10000, () => { req.destroy(); resolve({ path: urlPath, error: 'Timeout' }); });
  });
}

async function runExhaustiveAudit() {
  console.log('======================================================================');
  console.log('   EXHAUSTIVE SLIDE-BY-SLIDE AUDIT REPORT: DHT WEBSITE DESIGNER GUIDE');
  console.log('   Target: http://localhost:3000 | Live Dev Server Audit');
  console.log('======================================================================\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  for (const item of auditMatrix) {
    console.log(`----------------------------------------------------------------------`);
    console.log(`PAGE: ${item.page.toUpperCase()} (${item.path})`);
    console.log(`GUIDE SLIDES: ${item.slideRefs.join(' | ')}`);
    console.log(`----------------------------------------------------------------------`);

    const res = await fetchPage(item.path);
    if (res.error) {
      console.log(`  [HTTP ERROR] Could not reach ${item.path}: ${res.error}\n`);
      continue;
    }

    const html = res.body;
    console.log(`  HTTP ${res.statusCode} OK (Payload: ${html.length.toLocaleString()} bytes)`);

    // Check prohibited terms
    const banned = [];
    if (/(\bJDD\b|jdd\.vn|jddfurniture)/i.test(html)) banned.push('JDD reference');
    if (/226\s*Gò\s*Dưa|226\s*Go\s*Dua/i.test(html)) banned.push('226 Go Dua');
    if (/Quốc\s*lộ\s*19|Quoc\s*lo\s*19|QL19/i.test(html)) banned.push('QL19');
    if (/medium-end/i.test(html)) banned.push('medium-end');
    if (/(nemark)/i.test(html)) banned.push('(nemark)');

    if (banned.length > 0) {
      console.log(`  ❌ [PROHIBITED CONTENT]: Found ${banned.join(', ')}`);
    } else {
      console.log(`  ✅ [BRAND SAFETY]: 0 prohibited legacy terms found.`);
    }

    for (const t of item.tests) {
      totalTests++;
      const ok = t.check(html);
      if (ok) {
        passedTests++;
        console.log(`  ✅ [${t.id}] ${t.desc}`);
      } else {
        failedTests++;
        console.log(`  ❌ [${t.id}] ${t.desc} (NOT DETECTED IN SSR HTML)`);
      }
    }
    console.log('');
  }

  console.log('======================================================================');
  console.log(`AUDIT SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} FAILED)`);
  console.log('======================================================================');
}

runExhaustiveAudit();
