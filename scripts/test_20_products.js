const http = require('http');

const URLS = [
  // 1. Amalfi
  { name: 'Amalfi', url: 'http://localhost:3000/en-GB/catalogue/amalfi-lounge-collection', check: ['AMALFI', 'Swivel', 'FSC-Certified Wood'] },
  // 2. Ashton
  { name: 'Ashton', url: 'http://localhost:3000/en-GB/catalogue/ashton-lounge-collection', check: ['ASHTON', 'Collection Items', 'Dimensions', 'FSC-Certified Wood'] },
  // 3. Balemora
  { name: 'Balemora', url: 'http://localhost:3000/en-GB/catalogue/balemora-lounge-collection', check: ['BALEMORA', 'FSC-Certified Wood'], forbidden: ['Balmora', 'SAVANNAH'] },
  // 4. Bali
  { name: 'Bali', url: 'http://localhost:3000/en-GB/catalogue/bali-lounge-collection', check: ['BALI', 'FSC-Certified Wood'], forbidden: ['Patras'] },
  // 5. Benson
  { name: 'Benson', url: 'http://localhost:3000/en-GB/catalogue/benson-lounge-collection', check: ['BENSON LOUNGE COLLECTION', 'FSC-Certified Wood'], forbidden: ['Benson Dining Set', 'up to 8 seats'] },
  // 6. Bondi
  { name: 'Bondi (target)', url: 'http://localhost:3000/en-GB/catalogue/bondi-lounge-collection', check: ['BONDI LOUNGE COLLECTION', 'BONDI SINGLE LOUNGE', 'FSC-Certified Wood'] },
  { name: 'Bondi (redirect)', url: 'http://localhost:3000/en-GB/catalogue/bondi-lougne-collection', isRedirect: true, dest: 'bondi-lounge-collection' },
  // 7. BROOKSC
  { name: 'BROOKSC', url: 'http://localhost:3000/en-GB/catalogue/brooksc-lounge-collection', check: ['BROOKSC LOUNGE COLLECTION', 'Brooks Double Lounge Chair', 'FSC-Certified Wood'] },
  // 8. Casper
  { name: 'Casper', url: 'http://localhost:3000/en-GB/catalogue/casper-lounge-collection', check: ['CASPER LOUNGE COLLECTION', 'FSC-Certified Wood'] },
  // 9. Haymont
  { name: 'Haymont (table)', url: 'http://localhost:3000/en-GB/catalogue/haymont-table', check: ['HAYMONT TABLE', 'FSC-Certified Wood'] },
  { name: 'Haymont (redirect)', url: 'http://localhost:3000/en-GB/catalogue/haymont-dining-collection', isRedirect: true, dest: 'haymont-table' },
  // 10. Mobley
  { name: 'Mobley (target)', url: 'http://localhost:3000/en-GB/catalogue/mobley-dining-collection', check: ['MOBLEY DINING COLLECTION', 'FSC-Certified Wood'] },
  { name: 'Mobley (redirect)', url: 'http://localhost:3000/en-GB/catalogue/mobley-dinning-collection', isRedirect: true, dest: 'mobley-dining-collection' },
  // 11. Retangle / Rectangular
  { name: 'Rectangular (target)', url: 'http://localhost:3000/en-GB/catalogue/rectangular-table', check: ['RECTANGULAR TABLE', 'FSC-Certified Wood'] },
  { name: 'Retangle (redirect)', url: 'http://localhost:3000/en-GB/catalogue/retangle-table', isRedirect: true, dest: 'rectangular-table' },
  // 12. Santos
  { name: 'Santos (target)', url: 'http://localhost:3000/en-GB/catalogue/santos-lounge-collection', check: ['SANTOS LOUNGE COLLECTION', 'SLC-COL-0608', 'FSC-Certified Wood'] },
  // 13. Santos DHT17-141
  { name: 'Santos DHT17-141 (target)', url: 'http://localhost:3000/en-GB/catalogue/santos-lounge-collection-dht17-141', check: ['SANTOS LOUNGE COLLECTION DHT17-141', 'SLC-DHT-06012', 'FSC-Certified Wood'] },
  { name: 'Santos DHT17-141 (redirect)', url: 'http://localhost:3000/en-GB/catalogue/santos-dht17-141', isRedirect: true, dest: 'santos-lounge-collection-dht17-141' },
  // 14. Santos DHT17-F096
  { name: 'Santos DHT17-F096 (target)', url: 'http://localhost:3000/en-GB/catalogue/santos-lounge-collection-dht17-f096', check: ['SANTOS LOUNGE COLLECTION DHT17-F096', 'SLC-DHT-06011', 'FSC-Certified Wood'] },
  { name: 'Santos DHT17-F096 (redirect)', url: 'http://localhost:3000/en-GB/catalogue/santos-dht17-f096', isRedirect: true, dest: 'santos-lounge-collection-dht17-f096' },
  // 15. Seina
  { name: 'Seina (target)', url: 'http://localhost:3000/en-GB/catalogue/seina-table', check: ['SEINA TABLE', 'FSC-Certified Wood'] },
  { name: 'Seina (redirect siena)', url: 'http://localhost:3000/en-GB/catalogue/siena-table', isRedirect: true, dest: 'seina-table' },
  // 16. Stark
  { name: 'Stark (target)', url: 'http://localhost:3000/en-GB/catalogue/stark-lounge-collection', check: ['STARK LOUNGE COLLECTION', 'FSC-Certified Wood'] },
  { name: 'Stark (redirect)', url: 'http://localhost:3000/en-GB/catalogue/stark-dining-collection', isRedirect: true, dest: 'stark-lounge-collection' },
  // 17. Sun Round Table
  { name: 'Sun Round Table', url: 'http://localhost:3000/en-GB/catalogue/sun-round-table', check: ['SUN ROUND TABLE', 'FSC-Certified Wood', 'Item Specifications'] },
  // 18. Timor Losil
  { name: 'Timor Losil', url: 'http://localhost:3000/en-GB/catalogue/timor-losil-collection', check: ['TIMOR LOSIL', 'FSC Acacia or FSC Teak', 'FSC-Certified Wood'], forbidden: ['THIS PRODUCT IS ONLY FOR TESTING', 'FSC 100% / 100%'] },
  // 19. Wesley Dining
  { name: 'Wesley Dining', url: 'http://localhost:3000/en-GB/catalogue/wesley-dining-collection', check: ['WESLEY DINING COLLECTION', 'WESLEY DINING TABLE', 'FSC-Certified Wood'], forbidden: ['WESLEY DINNING'] },
  // 20. Westley Lounge
  { name: 'Westley Lounge', url: 'http://localhost:3000/en-GB/catalogue/westley-lounge-collection', check: ['WESTLEY LOUNGE COLLECTION', 'FSC-Certified Wood'] },
  { name: 'Westley Lounge (redirect wesley)', url: 'http://localhost:3000/en-GB/catalogue/wesley-lounge-collection', isRedirect: true, dest: 'westley-lounge-collection' },
];

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    http.get(targetUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('=== RUNNING 20-PRODUCT AUDIT & REDIRECT VERIFICATION ===');
  let passed = 0;
  let failed = 0;

  for (const item of URLS) {
    try {
      const res = await fetchUrl(item.url);
      if (item.isRedirect) {
        if ((res.statusCode === 301 || res.statusCode === 307 || res.statusCode === 308) && res.headers.location.includes(item.dest)) {
          console.log(`[PASS] ${item.name}: Redirects (${res.statusCode}) -> ${res.headers.location}`);
          passed++;
        } else {
          console.error(`[FAIL] ${item.name}: Expected redirect to ${item.dest}, got ${res.statusCode} Location: ${res.headers.location}`);
          failed++;
        }
      } else {
        if (res.statusCode === 200) {
          let ok = true;
          if (item.check) {
            for (const chk of item.check) {
              if (!res.body.includes(chk)) {
                console.error(`[FAIL] ${item.name}: Missing check '${chk}'`);
                ok = false;
              }
            }
          }
          if (item.forbidden) {
            for (const f of item.forbidden) {
              if (res.body.includes(f)) {
                console.error(`[FAIL] ${item.name}: Found forbidden string '${f}'`);
                ok = false;
              }
            }
          }
          if (res.body.includes('nav.catalogue')) {
            console.error(`[FAIL] ${item.name}: Leaking breadcrumb key 'nav.catalogue'`);
            ok = false;
          }
          if (ok) {
            console.log(`[PASS] ${item.name}: HTTP 200, all checks passed, zero forbidden strings`);
            passed++;
          } else {
            failed++;
          }
        } else {
          console.error(`[FAIL] ${item.name}: Expected 200, got ${res.statusCode}`);
          failed++;
        }
      }
    } catch (e) {
      console.error(`[ERROR] ${item.name}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
}

runTests();
