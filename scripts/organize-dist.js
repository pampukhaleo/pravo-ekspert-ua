import fs from 'fs'
import path from 'path'

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      // skip asset and Vite cache folders
      if (entry.name === 'assets' || entry.name === '.vite' || entry.name === 'node_modules') continue
      processDir(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      if (entry.name === 'index.html' || entry.name === '404.html') continue
      const baseName = entry.name.slice(0, -5) // remove '.html'
      const targetDir = path.join(dir, baseName)
      fs.mkdirSync(targetDir, { recursive: true })
      fs.renameSync(
        fullPath,
        path.join(targetDir, 'index.html')
      )
    }
  }
}

// Entry point
const distRoot = path.resolve(process.cwd(), 'dist')
processDir(distRoot)

console.log('Organized HTML routes into directory-based structure in', distRoot)
