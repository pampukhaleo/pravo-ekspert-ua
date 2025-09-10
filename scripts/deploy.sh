#!/bin/bash
# Deploy script for GitHub Pages with SEO optimizations

echo "🚀 Starting deployment process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Build the application
echo "🏗️ Building application..."
npm run build

# Run post-build optimizations
echo "📁 Organizing HTML routes..."
node scripts/organize-dist.js

# Create 404.html for SPA routing fallback
echo "🔄 Creating 404.html fallback..."
cp dist/index.html dist/404.html

# Generate dynamic sitemap
echo "🗺️ Generating sitemap..."
node scripts/generate-sitemap.js

# Deploy to GitHub Pages
echo "📤 Deploying to GitHub Pages..."
npx gh-pages -d dist

echo "✅ Deployment completed!"