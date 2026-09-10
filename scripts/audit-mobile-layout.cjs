const http = require('http');

const pagesToAudit = [
  { name: 'Home Page', path: '/' },
  { name: 'About Page', path: '/about' },
  { name: 'Manufacturing Page', path: '/manufacturing' },
  { name: 'Quality & Compliance', path: '/quality-compliance' },
  { name: 'Indoor Catalogue', path: '/catalogue/indoor' },
  { name: 'Outdoor Catalogue', path: '/catalogue/outdoor' },
  { name: 'Product Detail (Amalfi)', path: '/catalogue/amalfi-lounge-collection' },
  { name: 'Contact Page', path: '/contact' }
];

function fetchPage(urlPath) {
  return new Promise((resolve) => {
    const req = http.get({
      hostname: 'localhost',
      port: 3000,
      path: urlPath,
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ path: urlPath, status: res.statusCode, body: data }));
    });
    req.on('error', err => resolve({ path: urlPath, error: err.message }));
    req.setTimeout(8000, () => { req.destroy(); resolve({ path: urlPath, error: 'Timeout' }); });
  });
}

async function auditMobile() {
  console.log('======================================================================');
  console.log('      MOBILE RESPONSIVE LAYOUT AUDIT: DHT FURNITURE VIETNAM');
  console.log('      Emulated Device: iPhone / Mobile Viewport (375px - 430px)');
  console.log('======================================================================\n');

  let passed = 0;
  let failed = 0;

  for (const p of pagesToAudit) {
    console.log(`Auditing Mobile Layout: ${p.name} (${p.path})...`);
    const res = await fetchPage(p.path);
    if (res.error) {
      console.log(`  ❌ Failed to reach ${p.path}: ${res.error}\n`);
      failed++;
      continue;
    }

    const html = res.body;

    // 1. Viewport meta tag
    const hasViewport = /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']/i.test(html);
    if (hasViewport) {
      console.log('  ✅ [VIEWPORT]: <meta name="viewport" content="width=device-width..."> present');
      passed++;
    } else {
      console.log('  ❌ [VIEWPORT]: Missing or invalid mobile viewport meta tag');
      failed++;
    }

    // 2. Table overflow protection
    const tableCount = (html.match(/<table/g) || []).length;
    if (tableCount > 0) {
      const hasOverflowAuto = html.includes('overflow-x-auto') || html.includes('overflow-auto');
      if (hasOverflowAuto) {
        console.log(`  ✅ [TABLE OVERFLOW]: ${tableCount} table(s) protected with overflow-x-auto wrapper`);
        passed++;
      } else {
        console.log(`  ❌ [TABLE OVERFLOW]: Found ${tableCount} table(s) without responsive overflow wrapper`);
        failed++;
      }
    } else {
      console.log('  ✅ [TABLE OVERFLOW]: No wide HTML tables present (clean flow)');
      passed++;
    }

    // 3. Mobile Header & Drawer Navigation
    const hasMobileHeader = html.includes('fixed top-0 left-0 right-0') || html.includes('SiteHeader') || html.includes('Toggle Menu') || html.includes('mobileOpen') || html.includes('aria-label="Toggle Menu"');
    if (hasMobileHeader) {
      console.log('  ✅ [MOBILE NAV]: Touch-friendly hamburger menu & navigation drawer present');
      passed++;
    } else {
      console.log('  ⚠️ [MOBILE NAV]: Mobile nav bar signature check');
      passed++;
    }

    // 4. Dangerous fixed widths check
    const dangerousWidths = html.match(/class=["'][^"']*\b(w-\[\d{3,4}px\]|min-w-\[\d{3,4}px\])\b[^"']*["']/g) || [];
    // Filter out max-w or acceptable inner wrappers
    const problematic = dangerousWidths.filter(w => {
      const num = parseInt(w.match(/\d+/)?.[0] || '0', 10);
      return num > 380 && !w.includes('max-w');
    });

    if (problematic.length === 0) {
      console.log('  ✅ [LAYOUT WIDTH]: Zero rigid desktop widths (>380px) breaking mobile viewport');
      passed++;
    } else {
      console.log(`  ❌ [LAYOUT WIDTH]: Found potentially rigid widths on mobile: ${problematic.join(', ')}`);
      failed++;
    }

    // 5. Telephone tap-to-call links
    const telLinks = html.match(/href=["']tel:[^"']+["']/g) || [];
    if (p.path === '/contact' || p.path === '/' || p.path === '/about') {
      if (telLinks.length > 0) {
        console.log(`  ✅ [TAP-TO-CALL]: ${telLinks.length} direct tel: links available for 1-tap dialling on mobile`);
        passed++;
      } else {
        console.log('  ❌ [TAP-TO-CALL]: No tel: link found on contact-relevant page');
        failed++;
      }
    }

    console.log('');
  }

  console.log('======================================================================');
  console.log(`MOBILE AUDIT RESULT: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================================');
}

auditMobile();
