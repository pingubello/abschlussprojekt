# Agrargenossenschaft Finow - Website

Ein responsiver Internetauftritt für die Agrargenossenschaft Finow eG, erstellt entsprechend den MIB Akademie Prüfungsanforderungen.

## 🚀 Quick Start

1. **Repository klonen oder Dateien herunterladen**
2. **Lokalen Server starten** (empfohlen):

   ```bash
   # Mit Python
   python -m http.server 8000

   # Mit Node.js (http-server)
   npx http-server

   # Mit PHP
   php -S localhost:8000
   ```

3. **Browser öffnen**: `http://localhost:8000`

## 📱 Responsive Testing

### Desktop (≥ 1200px)

- Interaktive Aquaponik-SVG Grafik
- Vollständige Navigation
- Optimierte Slideshow

### Tablet (768px - 1199px)

- Angepasstes Layout
- Statische Aquaponik-Grafik
- Touch-optimierte Navigation

### Mobile (390px - 767px)

- Hamburger Menu
- Vertikale Layouts
- Touch-optimierte Bedienung

## 🎯 Hauptfunktionen

### ✅ Automatische Slideshow

- 5 Rezept-Teaser in Endlosschleife
- Manuelle Navigation möglich
- Keyboard-Navigation (Pfeiltasten)

### ✅ Interaktive Aquaponik-Grafik

- SVG-basierte Darstellung (nur Desktop ≥ 1200px)
- Hover/Click Tooltips
- Fallback für mobile Geräte

### ✅ Responsive Navigation

- Desktop: Horizontale Navigation
- Mobile: Hamburger Menu
- Smooth Scrolling zu Sektionen

## 📂 Dateistruktur

```
/
├── index.html                          # Haupt-HTML-Datei
├── styles.css                          # CSS-Styling
├── script.js                           # JavaScript-Funktionalität
├── logo.svg                            # SVG-Logo
├── README.md                           # Diese Datei
├── KONZEPT_UND_DOKUMENTATION.md        # Ausführliche Dokumentation
├── aufgabenstellung.md                 # Prüfungsanforderungen
├── website.txt                         # Original-Textinhalte
└── X_DATEN/                            # Bereitgestellte Assets
    ├── *.jpg                           # Produktbilder
    ├── Logo.pdf                        # Original-Logo
    └── Aquaponik-Kreislaufsystem.pdf   # Referenz-Dokument
```

## 🛠 Technische Details

### HTML5

- Semantische Struktur
- Accessibility-optimiert
- SEO-freundlich

### CSS3

- Mobile First Approach
- CSS Grid & Flexbox
- Custom Properties
- Smooth Animations

### JavaScript (ES6+)

- Slideshow-Automatik
- Interactive Tooltips
- Smooth Scrolling
- Performance-optimiert

## 🔧 Browser-Kompatibilität

- **Chrome/Edge**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Mobile**: iOS Safari, Chrome Mobile

## 📋 Erfüllte Prüfungsanforderungen

### ✅ Responsive Webdesign

- Smartphone (≥ 390px)
- PC (≥ 1200px)
- Progressive Enhancement

### ✅ Interaktive Darstellung

- Interaktive Vektorgrafik (Desktop)
- Rollover-Texte
- Mauszeiger-Interaktionen

### ✅ Slideshow

- 5 Kochrezept-Teaser
- Endlosschleife
- Automatische Wiedergabe

### ✅ Content-Integration

- Vollständiger Text aus website.txt
- Alle Bildmaterialien verwendet
- Logo integriert

## 🎨 Design-Konzept

### Farbschema

- **Primär**: #2C5282 (Dunkelblau)
- **Sekundär**: #4A90E2 (Hellblau)
- **Akzent**: #4CAF50 (Grün)

### Typografie

- **Schrift**: Open Sans (Google Fonts)
- **Mobile First**: Skalierbare Schriftgrößen
- **Accessibility**: Optimierte Kontraste

## 🧪 Testing

### Responsive Testing

```bash
# Browser DevTools verwenden:
# - F12 → Device Toolbar
# - Verschiedene Bildschirmgrößen testen
# - Touch-Simulation aktivieren
```

### Performance Testing

```bash
# Lighthouse Audit:
# - F12 → Lighthouse Tab
# - "Generate report" klicken
# - Performance, Accessibility, SEO prüfen
```

## 🔄 Entwicklung

### Setup für Entwicklung

```bash
# Live Server (VS Code Extension)
# oder Python Simple Server
python -m http.server 8000

# Änderungen automatisch im Browser aktualisieren
```

### Code-Struktur

- **Modularer CSS**: Komponenten-basiert
- **Vanilla JavaScript**: Keine Frameworks
- **Progressive Enhancement**: Funktioniert ohne JS

## 📸 Screenshots

### Desktop (≥ 1200px)

- Interaktive Aquaponik-Grafik
- Vollständige Slideshow
- Mehrspaltige Layouts

### Mobile (< 768px)

- Hamburger Navigation
- Vertikale Layouts
- Touch-optimierte Bedienung

## 🚦 Deployment

### Statisches Hosting

```bash
# Netlify, Vercel, GitHub Pages
# Einfach alle Dateien hochladen
```

### Performance-Optimierung (optional)

```bash
# CSS/JS Minification
# Bildkomprimierung
# CDN für Assets
```

## 📞 Support

Bei Fragen zur Implementation oder Prüfungsanforderungen:

- Dokumentation: `KONZEPT_UND_DOKUMENTATION.md`
- Code-Kommentare in den Dateien
- Browser DevTools für Debugging

## 📝 Lizenz

Dieses Projekt wurde als Prüfungsarbeit für die MIB Akademie erstellt.

---

**Viel Erfolg bei der Prüfung! 🍀**
