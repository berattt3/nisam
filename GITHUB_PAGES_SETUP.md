# 🚀 GitHub Pages Deployment Rehberi - afyonlu

## 📋 Hazır Dosyalar

✅ **dist/public/** klasörü tamamen hazır!
✅ SPA routing için 404.html oluşturuldu
✅ Relative paths yapılandırıldı
✅ .nojekyll dosyası eklendi
✅ GitHub Pages SPA redirect kodu aktif
✅ Loading screen ve error handling mevcut

## 🔄 Otomatik Deployment (Önerilen)

1. **GitHub Repository'nizde Settings > Pages bölümüne gidin**
2. **Source olarak "GitHub Actions" seçin**
3. **`.github/workflows/deploy.yml` dosyası hazır**
4. **Main/master branch'e push yaptığınızda otomatik deploy olacak**

## 📁 Manuel Deployment

1. **Build scripti çalıştırın:**
   ```bash
   chmod +x build-frontend.sh
   ./build-frontend.sh
   ```

2. **dist/public/ klasörünün içeriğini repository'nizin root'una kopyalayın**
3. **GitHub Settings > Pages > Source: "Deploy from a branch" seçin**
4. **Branch: main/master seçin**

## 🔧 Dosya Yapısı

GitHub Pages için gerekli dosyalar:
```
dist/public/
├── index.html          # Ana sayfa
├── 404.html           # SPA routing için
├── .nojekyll          # Jekyll devre dışı
├── vite.svg           # Favicon
└── assets/            # CSS ve JS dosyaları
    ├── index-*.css
    └── index-*.js
```

## 🌐 Test Etme

Local test için:
```bash
cd dist/public
python -m http.server 8000
# Tarayıcıda: http://localhost:8000
```

## 🐛 Sorun Giderme

**404 Hataları için:**
1. Repository Settings > Pages'da doğru branch seçili mi?
2. Actions sekmesinde build başarılı mı?
3. Browser cache temizleyin (Ctrl+F5)
4. URL'de https:// kullanın

**Asset Yüklenmiyor:**
- Relative paths doğru yapılandırıldı
- dist/public/assets/ klasörü tam olarak yüklendi mi?

## 📍 URL Formatı

Site erişim adresi:
`https://[username].github.io/[repository-name]/`

## 🎯 Final Checklist

- [ ] Repository oluşturuldu
- [ ] dist/public içeriği yüklendi
- [ ] GitHub Pages aktif edildi
- [ ] Site linki çalışıyor
- [ ] Tüm sayfalar yükleniyor
- [ ] Oyunlar çalışıyor