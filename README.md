# afyonlu - Personal Web Application

Berat ve Nisa'nın özel hikayesi için oluşturulmuş interaktif web uygulaması.

## Özellikler

🎮 **Kompleks Labirent Oyunu** - Hareket eden canavarlarla zorlu labirent
🎯 **Platform Oyunu** - Zıplama ve engel aşma mücadelesi
💜 **Romantik Tema** - Özel tasarım ve kalp animasyonları
📱 **Mobil Uyumlu** - Tüm cihazlarda mükemmel görünüm
🔄 **SPA Routing** - Sorunsuz sayfa geçişleri

## Teknoloji Stack

- **Frontend:** React 18 + TypeScript + Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI)
- **Routing:** Wouter
- **State Management:** TanStack React Query
- **Build Tool:** Vite

## Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Development server başlat
npm run dev

# Production build
./build-frontend.sh
```

## GitHub Pages Deployment

Detaylı deployment rehberi için `GITHUB_PAGES_SETUP.md` dosyasına bakın.

```bash
# Frontend build oluştur
./build-frontend.sh

# dist/public/ içeriğini GitHub repository'nizde yayınlayın
```

## Proje Yapısı

```
├── client/           # React frontend
├── server/           # Express backend
├── shared/           # Ortak TypeScript türleri
├── dist/public/      # Build çıktıları (GitHub Pages hazır)
└── afyonlu.md        # Proje dokümantasyonu
```

## Oyun Kontrolleri

**Labirent Oyunu:**
- WASD veya Ok tuşları ile hareket
- Kırmızı kalbe ulaşmaya çalışın
- Canavarlardan kaçının

**Platform Oyunu:**
- WASD veya Ok tuşları
- W/↑ ile zıplama
- Prenses karakteri ile prense ulaşın

---

Made with 💜 by afyonlu