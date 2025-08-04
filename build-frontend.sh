#!/bin/bash

# GitHub Pages için frontend build script
echo "Building frontend for GitHub Pages..."

# Dependencies yükle
npm install

# Frontend build
npx vite build

# GitHub Pages için 404.html oluştur (SPA routing için)
cp dist/public/index.html dist/public/404.html

# .nojekyll dosyası oluştur (GitHub Pages Jekyll'ı devre dışı bırak)
touch dist/public/.nojekyll

# Asset path'lerini relative yap (GitHub Pages için)
sed -i 's|="/assets/|="./assets/|g' dist/public/index.html
sed -i 's|="/assets/|="./assets/|g' dist/public/404.html

# Icon path'ini relative yap
sed -i 's|href="/vite.svg"|href="./vite.svg"|g' dist/public/index.html
sed -i 's|href="/vite.svg"|href="./vite.svg"|g' dist/public/404.html

echo "Frontend build completed! Files are in dist/public/"
echo "✅ SPA routing support added (404.html)"
echo "✅ Jekyll disabled (.nojekyll)"
echo "✅ Relative paths configured"
echo ""
echo "📁 Upload the contents of dist/public/ to your GitHub repository"
echo "⚙️  Enable GitHub Pages in repository settings"
echo "🌐 Your site will be available at: https://[username].github.io/[repository-name]/"