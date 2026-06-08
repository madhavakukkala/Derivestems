# DeriveStems — Agency Website

> **Content. Design. Branding. Built for Growth.**

A premium, Apple-style minimalist agency website for **DeriveStems**, a creative content and branding studio. Built with Vite, Vanilla JS, and custom CSS — no frameworks, no bloat.

---

## Live Preview

🌐 **[derivestems.inboxtales.com](https://derivestems.inboxtales.com)**

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| Vanilla JS (ES Modules) | All interactivity & animations |
| Vanilla CSS | Full design system — no Tailwind |
| [Lenis](https://github.com/darkroomengineering/lenis) | Smooth scroll |
| SVG | Logo, favicon, and brand icon |

---

## Features

- **Apple-style minimalist design** — white backgrounds, thin borders, no gratuitous color
- **Brand color restricted** — `#3b5724` (forest green) used *only* in the logo icon and logo text
- **Dotted matrix background** — subtle brand-tinted radial dot pattern on body
- **Floating pill navbar** — frosted glass center menu, logo left, CTA right; collapses to hamburger on mobile
- **Hero section** — large typographic reveal with animated line-by-line entrance
- **Marquee brand strip** — auto-scrolling horizontal brand logos section
- **Services grid** — 4-column image cards with hover zoom effect
- **"The Struggle" section** — 4 pain-point cards identifying common content problems
- **Minimalist pricing cards** — Starter / Growth / Premium with feature lists
- **About section** — Founder quote card with circular CEO photo
- **Why Choose Us** — 5-card horizontal grid
- **Process timeline** — vertical stem art timeline with 5 steps
- **Testimonials carousel** — auto-rotating cards with swipe support
- **FAQ chat UI** — conversational chat interface with suggestion buttons and typing indicator animation
- **Contact form → WhatsApp redirect** — form data is encoded and pre-filled into a `wa.me` link so leads land directly in WhatsApp
- **Footer** — logo, links, contact info, copyright

---

## Project Structure

```
Derivestems/
├── public/
│   ├── favicon.svg          # Brand favicon (forest green #3b5724)
│   ├── madhav.jpg           # Founder photo
│   ├── process-branch.png   # Watermark art for process section
│   ├── hero-leaves.png      # Hero background art asset
│   └── ...
├── src/
│   ├── main.js              # All JS — scroll, nav, animations, FAQ chatbot, form handler
│   └── style.css            # Full design system (2000+ lines, well-commented)
├── index.html               # Single-page app entry point
├── package.json
└── vite.config.js (auto)
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173/` with hot module replacement.

### 3. Build for production

```bash
npm run build
```

Output goes to `/dist`. Upload this folder to any static host.

### 4. Preview the production build locally

```bash
npm run preview
```

---

## Contact Form → WhatsApp

When a visitor fills out the contact form and clicks **Send Message**, the site:

1. Reads all four fields: Name, Email, Service, and Project Details
2. Formats them into a structured WhatsApp message:

```
Hi DeriveStems! I would like to get in touch.

*Details:*
• *Name:* Alice
• *Email:* alice@example.com
• *Service:* Branding
• *Project Details:* We need a full brand identity.
```

3. URL-encodes the text and opens:

```
https://wa.me/919573823328?text=...
```

No backend required. No API keys. No data storage.

---

## Design Tokens

All design variables are defined in `:root` inside `src/style.css`:

```css
--brand-blue: #3b5724;    /* Forest green — logo ONLY */
--black:      #1D1D1F;
--dark-grey:  #424245;
--grey:       #86868B;
--light-grey: #F5F5F7;
--border:     #D2D2D7;
--white:      #FFFFFF;
```

Typography:
- **Headings** — Satoshi (via Fontshare CDN)
- **Body** — Inter (via Google Fonts)
- **Letter spacing** — `-1px` across the board

---

## Customization

| Thing to change | Where |
|----------------|-------|
| Brand color | `--brand-blue` in `:root` in `style.css` |
| WhatsApp number | `wa.me/91XXXXXXXXXX` in `src/main.js` (line ~470) |
| Founder photo | Replace `public/madhav.jpg` |
| Favicon color | Edit stroke color in `public/favicon.svg` |
| FAQ answers | Edit `faqDatabase` object in `src/main.js` (line ~384) |
| Pricing | Edit pricing cards in `index.html` |
| Cal.com link | Find `cal.com/derivestems` in `index.html` and update |

---

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

Drag and drop the `/dist` folder at [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages

Use the `vite-plugin-static-copy` or simply push `/dist` to a `gh-pages` branch.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Safari 15+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile Safari (iOS 15+) | ✅ Full |

---

## License

This project is **private** and proprietary to DeriveStems. Not licensed for redistribution or resale.

---

## Contact

**DeriveStems**
- 📧 contact@derivestems.com
- 📱 +91 9573823328
- 📍 Hyderabad, India
