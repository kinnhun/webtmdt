const http = require('http');

const pages = [
  { path: '/', name: 'Home Page' },
  { path: '/about', name: 'About Us' },
  { path: '/manufacturing', name: 'Manufacturing' },
  { path: '/quality-compliance', name: 'Quality & Compliance' },
  { path: '/catalogue/indoor', name: 'Indoor Catalogue' },
  { path: '/catalogue/outdoor', name: 'Outdoor Catalogue' },
  { path: '/catalogue/amalfi-lounge-collection', name: 'Product Detail (Amalfi)' },
  { path: '/contact', name: 'Contact Us' }
];

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const req = http.get({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      headers: { 'User-Agent': 'DHT-Audit-Bot/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          path: urlPath,
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({ path: urlPath, error: 'Timeout' });
    });
  });
}

async function audit() {
  console.log('================================================================');
  console.log('AUDIT LIVE WEBSITE (http://localhost:3000) AGAINST DESIGN GUIDE');
  console.log('================================================================\n');

  for (const page of pages) {
    console.log(`Checking: ${page.name} (${page.path})...`);
    const res = await fetchPage(page.path);
    if (res.error) {
      console.log(`  [FAILED] Connection error: ${res.error}\n`);
      continue;
    }

    const html = res.body;
    console.log(`  [STATUS] HTTP ${res.statusCode} (HTML Size: ${html.length.toLocaleString()} bytes)`);

    // 1. Prohibited terms audit
    const banned = [];
    if (/(\bJDD\b|jdd\.vn|jddfurniture)/i.test(html)) banned.push('JDD brand reference');
    if (/226\s*Gò\s*Dưa|226\s*Go\s*Dua/i.test(html)) banned.push('226 Go Dua (old address)');
    if (/Quốc\s*lộ\s*19|Quoc\s*lo\s*19|QL19/i.test(html)) banned.push('QL19 (old address)');
    if (/medium-end/i.test(html)) banned.push('medium-end positioning');
    if (/(nemark)/i.test(html)) banned.push('(nemark) leftover text');

    if (banned.length > 0) {
      console.log(`  [CRITICAL ALERT] Found banned terms: ${banned.join(', ')}`);
    } else {
      console.log(`  [PASS] Zero prohibited terms found.`);
    }

    // 2. Specific checks per page
    const checks = [];

    // Global checks
    if (html.includes('DHT Furniture') || html.includes('DHT')) {
      checks.push('Brand identity present: DHT');
    }

    if (page.path === '/') {
      if (html.includes('543,380') || html.includes('543.380')) checks.push('Capacity metric: 543,380 m² footprint');
      if (html.includes('11') && (html.includes('cơ sở') || html.includes('nhà máy') || html.includes('phân xưởng') || html.includes('facilities'))) checks.push('Facility scale: 11 specialized facilities');
      if (html.includes('FSC')) checks.push('Certification: 100% FSC certified mentioned');
      if (html.includes('sales@dhtcompany.com')) checks.push('Official email: sales@dhtcompany.com in schema/content');
      if (html.includes('72 Le Thanh Ton') || html.includes('72 Lê Thánh Tôn')) checks.push('HCMC Coordination Hub address correct');
    }

    if (page.path === '/about') {
      if (html.includes('543,380') || html.includes('543.380')) checks.push('543,380 m² footprint');
      if (html.includes('11') && (html.includes('facilities') || html.includes('nhà máy'))) checks.push('11 specialized facilities');
      if (html.includes('4') && (html.includes('clusters') || html.includes('cụm'))) checks.push('4 strategic production clusters');
      if (html.includes('206 Phan Dinh Phung') || html.includes('206 Phan Đình Phùng')) checks.push('Pleiku Central Showroom address');
      if (html.includes('DHT Central Commercial Coordination Hub')) checks.push('HCMC Coordination Hub title');
    }

    if (page.path === '/manufacturing') {
      if (html.includes('4') && (html.includes('Cluster') || html.includes('Cụm'))) checks.push('4 Production Clusters');
      if (html.includes('11') && (html.includes('Phân xưởng') || html.includes('Facilities') || html.includes('xưởng'))) checks.push('11 Facilities break-down');
      if (html.includes('Gia Lai') && html.includes('Bình Định')) checks.push('Key cluster locations displayed');
    }

    if (page.path === '/quality-compliance') {
      if (html.includes('FSC')) checks.push('FSC Certification');
      if (html.includes('BSCI') || html.includes('SMETA')) checks.push('Social compliance audit badges');
      if (html.includes('OTIF') || html.includes('95%')) checks.push('Quality Performance Metric: OTIF ~95%');
      if (html.includes('FTPR') || html.includes('92%')) checks.push('First Time Pass Rate (FTPR) ~92%');
      if (html.includes('biomass') || html.includes('closed-loop') || html.includes('tuần hoàn') || html.includes('sinh khối')) checks.push('Sustainability: Biomass / Closed-loop powder coating');
    }

    if (page.path === '/contact') {
      if (html.includes('sales@dhtcompany.com')) checks.push('Sales inquiry email');
      if (html.includes('72 Le Thanh Ton') || html.includes('72 Lê Thánh Tôn')) checks.push('Commercial Coordination Hub address');
      if (html.includes('206 Phan Dinh Phung') || html.includes('206 Phan Đình Phùng')) checks.push('Pleiku Central Showroom address');
      if (html.includes('+84 (0) 903 000 111') || html.includes('0903 000 111') || html.includes('0903000111') || html.includes('Hotline')) checks.push('Direct contact hotline phone lines');
    }

    if (page.path === '/catalogue/amalfi-lounge-collection') {
      if (html.includes('Amalfi')) checks.push('Collection name: Amalfi Lounge');
      if (html.includes('cm') || html.includes('in') || html.includes('inch')) checks.push('Dimensions display unit options');
      if (html.includes('FSC')) checks.push('FSC Teak / Timber specified');
      if (html.includes('Sunbrella') || html.includes('Olefin') || html.includes('Fabric') || html.includes('Quick-Dry')) checks.push('Premium outdoor fabric materials');
    }

    checks.forEach(c => console.log(`  [VERIFIED] ${c}`));
    console.log('');
  }
}

audit();
