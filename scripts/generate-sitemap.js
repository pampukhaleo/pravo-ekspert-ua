import fs from 'fs'
import path from 'path'

// Import data directly from TypeScript files
const expertiseDataPath = 'src/data/expertiseData.ts'
const servicesDataPath = 'src/components/home/ServicesSection.tsx'

const baseUrl = 'https://expertise.com.ua'
const currentDate = new Date().toISOString().split('T')[0]

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Parse TypeScript export
function parseTypeScriptExport(filePath, exportName) {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    // Allow optional TS type annotation between name and `=`
    const exportRegex = new RegExp(`(?:export\\s+)?const\\s+${exportName}\\b[^=]*=\\s*([\\s\\S]*?)(?=\\n(?:export|const)\\b|$)`)
    const match = content.match(exportRegex)
    if (!match) {
      console.log(`Could not find export ${exportName} in ${filePath}`)
      return null
    }
    let exportData = match[1].trim().replace(/;$/, '')

    if (exportName === 'expertiseData') {
      const categories = []
      const catRegex = /["']([\w-]+)["']\s*:\s*\{[\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?backgroundImage:\s*expertiseImages\[["']([^"']+)["']\]/g
      let m
      while ((m = catRegex.exec(exportData)) !== null) {
        categories.push({ slug: m[1], title: m[2], imageFile: m[3] })
      }
      const allSlugs = []
      const slugRegex = /slug:\s*['"]([\w-]+)['"]/g
      let sm
      while ((sm = slugRegex.exec(exportData)) !== null) allSlugs.push(sm[1])
      const catSet = new Set(categories.map(c => c.slug))
      const directionSlugs = allSlugs.filter(s => !catSet.has(s))
      return { categories, directionSlugs }
    }

    if (exportName === 'services') {
      const slugs = []
      const slugRegex = /slug:\s*['"]([\w-]+)['"]/g
      let m
      while ((m = slugRegex.exec(exportData)) !== null) slugs.push(m[1])
      return slugs
    }

    return null
  } catch (error) {
    console.log(`Error parsing ${filePath}:`, error.message)
    return null
  }
}

// Map expertise source filename -> hashed Vite output path under /assets/.
// Vite emits files like `budivelno-tehnichna-XXXX.png` in dist/assets/.
function buildExpertiseImageMap() {
  const map = {}
  try {
    const distAssets = path.resolve(process.cwd(), 'dist/assets')
    if (!fs.existsSync(distAssets)) return map
    const built = fs.readdirSync(distAssets)
    const srcAssets = path.resolve(process.cwd(), 'src/assets')
    if (!fs.existsSync(srcAssets)) return map
    for (const f of fs.readdirSync(srcAssets)) {
      if (!/\.(png|jpe?g|svg|webp)$/i.test(f)) continue
      const base = f.replace(/\.[^.]+$/, '')
      const ext = f.match(/\.[^.]+$/)?.[0] ?? ''
      // Vite pattern: <base>-<hash><ext>
      const hashed = built.find(x => x.startsWith(base + '-') && x.endsWith(ext))
      if (hashed) map[f] = `/assets/${hashed}`
    }
  } catch (e) {
    console.log('Could not read dist/assets:', e.message)
  }
  return map
}

const staticRoutes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/ekspertyzy', priority: '0.9', changefreq: 'weekly' },
  { url: '/kontakty', priority: '0.8', changefreq: 'monthly' },
  { url: '/pro-nas', priority: '0.7', changefreq: 'monthly' },
  { url: '/tsiny', priority: '0.8', changefreq: 'monthly' },
  { url: '/posluhy/ekspertyza-za-ukhvaloiu-sudu', priority: '0.7', changefreq: 'monthly' },
  { url: '/posluhy/ekspertne-doslidzhennia-za-zaiavoiu', priority: '0.7', changefreq: 'monthly' },
  { url: '/posluhy/shcho-vkhodyt-u-vartist', priority: '0.7', changefreq: 'monthly' },
]

let sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

staticRoutes.forEach(route => {
  sitemapXML += `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`
})

const expertiseData = parseTypeScriptExport(expertiseDataPath, 'expertiseData')
const expertiseImageMap = buildExpertiseImageMap()
if (expertiseData) {
  expertiseData.categories.forEach(cat => {
    const imgPath = expertiseImageMap[cat.imageFile]
    const imageBlock = imgPath
      ? `    <image:image>
      <image:loc>${baseUrl}${imgPath}</image:loc>
      <image:title>${xmlEscape(cat.title)}</image:title>
    </image:image>
`
      : ''
    sitemapXML += `  <url>
    <loc>${baseUrl}/ekspertyzy/${cat.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
${imageBlock}  </url>
`
  })

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

const serviceSlugs = parseTypeScriptExport(servicesDataPath, 'services')
if (serviceSlugs) {
  serviceSlugs.forEach(slug => {
    sitemapXML += `  <url>
    <loc>${baseUrl}/posluhy/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })
}

sitemapXML += '</urlset>'

const distDir = path.resolve(process.cwd(), 'dist')
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true })

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXML)
console.log('Generated dynamic sitemap.xml in', distDir)

const publicDir = path.resolve(process.cwd(), 'public')
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true })
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML)
console.log('Generated dynamic sitemap.xml in', publicDir)
console.log(`Generated ${staticRoutes.length} static routes, ${expertiseData?.categories?.length || 0} expertise categories, ${expertiseData?.directionSlugs?.length || 0} expertise directions, and ${serviceSlugs?.length || 0} service pages`)
