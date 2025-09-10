import fs from 'fs'
import path from 'path'

// Import data files to generate dynamic sitemap
const expertiseData = JSON.parse(fs.readFileSync('src/data/expertiseData.ts', 'utf8'))
  .replace('export const expertiseData = ', '')
  .replace(/;$/, '')

const newsData = JSON.parse(fs.readFileSync('src/data/newsData.ts', 'utf8'))
  .replace('export const newsData = ', '')
  .replace(/;$/, '')

const baseUrl = 'https://expertise.com.ua'
const currentDate = new Date().toISOString().split('T')[0]

// Static routes
const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/ekspertyzy', priority: '0.9', changefreq: 'weekly' },
  { url: '/kontakty', priority: '0.8', changefreq: 'monthly' },
  { url: '/pro-nas', priority: '0.7', changefreq: 'monthly' },
  { url: '/tsiny', priority: '0.8', changefreq: 'monthly' },
  { url: '/novini', priority: '0.8', changefreq: 'daily' }
]

// Generate XML content
let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

// Add static routes
staticRoutes.forEach(route => {
  sitemapXML += `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
})

// Add expertise routes (if data exists)
try {
  const expertise = JSON.parse(expertiseData)
  expertise.forEach(item => {
    if (item.slug) {
      sitemapXML += `  <url>
    <loc>${baseUrl}/ekspertyzy/${item.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
    }
  })
} catch (e) {
  console.log('Could not parse expertise data, skipping dynamic expertise URLs')
}

// Add news routes (if data exists)
try {
  const news = JSON.parse(newsData)
  news.forEach(item => {
    if (item.slug) {
      const articleDate = item.date || currentDate
      sitemapXML += `  <url>
    <loc>${baseUrl}/novini/${item.slug}</loc>
    <lastmod>${articleDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
`
    }
  })
} catch (e) {
  console.log('Could not parse news data, skipping dynamic news URLs')
}

sitemapXML += '</urlset>'

// Write to dist folder
const distDir = path.resolve(process.cwd(), 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXML)
console.log('Generated dynamic sitemap.xml in', distDir)