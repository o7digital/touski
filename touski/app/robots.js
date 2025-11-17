export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/supplier/', '/login/', '/api/'],
    },
    sitemap: 'https://touski.online/sitemap.xml',
  };
}
