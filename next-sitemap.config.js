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
        allow: '/',
        disallow: ['/admin', '/api/', '/workspace'],
      },
    ],
  },
};
