import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Setup file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Your Startup's Live URL (CHANGE THIS)
const SITE_URL = 'https://www.pluggedin.tech'; 

async function generateSitemap() {
  console.log('🗺️  Generating Sitemap for PluggedIn...');

  // 3. Define your main pages
  const routes = [
    '',              // Home
    '/services',     // Your gamified services page
    '/elsa',         // The E.L.S.A. product showcase
    '/about',        // About the team
    '/contact',      // Contact/Founder info
    '/privacy',      // Privacy Policy (Good for trust)
  ];

  // 4. Generate the XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  // 5. Save to public folder
  const publicDir = path.resolve(__dirname, '../public');
  
  if (!fs.existsSync(publicDir)){
      fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('✅ Sitemap generated successfully at public/sitemap.xml');
}

generateSitemap();