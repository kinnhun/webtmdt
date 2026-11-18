/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://dhtcompany.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  i18n: {
    locales: ['en-US', 'en-GB', 'vi-VN'],
    defaultLocale: 'en-US',
  },
  exclude: ['/admin', '/admin/*', '/api/*', '/workspace', '/workspace/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/', '/api/sitemap.xml'],
        disallow: ['/admin', '/api/', '/workspace'],
      },
    ],
    additionalSitemaps: [
      'https://dhtcompany.com/sitemap.xml',
      'https://dhtcompany.com/api/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/' || path === '') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/catalogue')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog') || path.startsWith('/materials')) {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/about' || path === '/contact') {
      priority = 0.7;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    const result = [];

    // Blog post slugs
    const blogSlugs = [
      'choosing-the-right-outdoor-furniture-material',
      'inside-our-factory-how-luxury-furniture-is-made',
      'how-to-maintain-teak-outdoor-furniture',
      'furnishing-a-boutique-hotel-case-study',
      'sustainable-furniture-manufacturing',
    ];

    for (const slug of blogSlugs) {
      result.push(await config.transform(config, `/blog/${slug}`));
    }

    // Material article slugs
    const materialSlugs = [
      'acacia-wood-outdoor-furniture',
      'outdoor-fabric-performance-comfort',
      'powder-coated-aluminum-modern-scalable',
      'teak-wood-premium-outdoor-durability',
    ];

    for (const slug of materialSlugs) {
      result.push(await config.transform(config, `/materials/${slug}`));
    }

    // Try fetching products from MongoDB during build
    try {
      require('dotenv').config({ path: '.env.local' });
      const uri = process.env.MONGODB_URI;
      if (uri) {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
        }
        const products = await mongoose.connection
          .collection('products')
          .find({}, { projection: { slug: 1, updatedAt: 1 } })
          .toArray();

        for (const p of products) {
          if (p.slug) {
            const transformed = await config.transform(config, `/catalogue/${p.slug}`);
            if (p.updatedAt) {
              transformed.lastmod = new Date(p.updatedAt).toISOString();
            }
            result.push(transformed);
          }
        }
        console.log(`[next-sitemap] Successfully added ${products.length} product URLs to sitemap.`);
      }
    } catch (err) {
      console.warn('[next-sitemap] Notice: Could not connect to DB for dynamic products during sitemap generation:', err.message);
    } finally {
      try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState !== 0) {
          await mongoose.disconnect();
        }
      } catch (_) {}
    }

    return result;
  },
};

