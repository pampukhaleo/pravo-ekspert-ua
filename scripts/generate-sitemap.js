import fs from 'fs'
import path from 'path'

// Import data directly from TypeScript files
const expertiseDataPath = 'src/data/expertiseData.ts'
const newsDataPath = 'src/data/newsData.ts'

const baseUrl = 'https://expertise.com.ua'
const currentDate = new Date().toISOString().split('T')[0]

// Parse TypeScript export
function parseTypeScriptExport(filePath, exportName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    // Find the export statement
    const exportRegex = new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*([\\s\\S]*?)(?=\\nexport|\\n\\n|$)`)
    const match = content.match(exportRegex)
    
    if (!match) {
      console.log(`Could not find export ${exportName} in ${filePath}`)
      return null
    }

    let exportData = match[1].trim()
    // Remove semicolon at the end
    exportData = exportData.replace(/;$/, '')
    
    // For expertiseData, convert object to array format for sitemap
    if (exportName === 'expertiseData') {
      // This is an object, we need to extract keys and nested directions
      const keys = []
      const keyRegex = /(\w+):\s*{/g
      let keyMatch
      while ((keyMatch = keyRegex.exec(exportData)) !== null) {
        keys.push(keyMatch[1])
      }
      
      // Also extract direction slugs
      const directionSlugs = []
      const directionRegex = /slug:\s*['"]([\w-]+)['"]/g
      let directionMatch
      while ((directionMatch = directionRegex.exec(exportData)) !== null) {
        directionSlugs.push(directionMatch[1])
      }
      
      return { keys, directionSlugs }
    }
    
    // For newsItems, extract slugs
    if (exportName === 'newsItems') {
      const slugs = []
      const slugRegex = /slug:\s*['"]([\w-]+)['"]/g
      let slugMatch
      while ((slugMatch = slugRegex.exec(exportData)) !== null) {
        slugs.push(slugMatch[1])
      }
      return slugs
    }

    return null
  } catch (error) {
    console.log(`Error parsing ${filePath}:`, error.message)
    return null
  }
}

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

// Add expertise routes
const expertiseData = parseTypeScriptExport(expertiseDataPath, 'expertiseData')
if (expertiseData) {
  // Add main expertise categories
  expertiseData.keys.forEach(key => {
    sitemapXML += `  <url>
    <loc>${baseUrl}/ekspertyzy/${key}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`
  })
  
  // Add expertise direction pages
  expertiseData.directionSlugs.forEach(slug => {
    sitemapXML += `  <url>
    <loc>${baseUrl}/ekspertyzy/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })
}

// Add news routes
const newsSlugs = parseTypeScriptExport(newsDataPath, 'newsItems')
if (newsSlugs) {
  newsSlugs.forEach(slug => {
    sitemapXML += `  <url>
    <loc>${baseUrl}/novini/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })
}

sitemapXML += '</urlset>'

// Write to dist folder
const distDir = path.resolve(process.cwd(), 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXML)
console.log('Generated dynamic sitemap.xml in', distDir)
console.log(`Generated ${staticRoutes.length} static routes, ${expertiseData?.keys?.length || 0} expertise categories, ${expertiseData?.directionSlugs?.length || 0} expertise directions, and ${newsSlugs?.length || 0} news articles`)