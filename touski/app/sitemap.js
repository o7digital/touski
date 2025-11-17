export default function sitemap() {
  const baseUrl = 'https://touski.online';
  
  const routes = [
    // Pages françaises
    '',
    '/about',
    '/contact',
    '/shop-1',
    
    // Pages anglaises
    '/en',
    '/en/about',
    '/en/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' || route === '/en' ? 1 : 0.8,
  }));
}
