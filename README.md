# 📚 The Lit Library

> *"Within pages, we vanish — and in their silence, rediscover who we are."*

A vintage-inspired digital bookshelf built for readers who appreciate timeless literature, thoughtful design, and the quiet magic of books. The Lit Library is a fully responsive, feature-rich frontend project combining a love for reading with clean web development.

---

## 🌐 Live Preview

**Repository:** [github.com/vandanacoder/The-Lit-Library](https://github.com/vandanacoder/The-Lit-Library)

> To view locally — just clone the repo and open `index.html` in your browser. No build tools or dependencies required.

---

## ✨ Features

### 🏠 Homepage
- Polished **hero section** with background image and animated intro text
- **Featured Book of the Week** section with cover, rating, and description
- **Trending Books** showcase with hover effects
- **Book Category** overview (Fiction, Non-Fiction, YA, Children's, eBooks)
- About Us and Contact snippets
- Fully revamped **footer** with logo, quick links, social icons, and scroll-to-top

### 📖 Books Page
- **Live search** — filter by title, author, or genre instantly as you type
- **Genre filter buttons** — Fiction, Fantasy, Romance, Mystery, Classics, Horror, Self Help, Poetry, Dystopian, Gothic, Philosophy
- **Enhanced book cards** with:
  - Cover image with hover zoom
  - Star ratings ★★★★★
  - Genre badge
  - Short description
  - Read More button → opens Book Details Modal
  - Add to Reading List button
  - ♡ Favorite heart icon

### 📋 Book Details Modal
Clicking any book opens a beautiful modal showing:
- Book cover, title, author, genre badge
- Star rating
- Full description
- Famous quote from the book
- *Why readers love this book*
- Add to Reading List / Favorite buttons

### 📚 Reading List
- Add or remove books with one click
- Slide-out panel accessible from the navbar
- **Persists across page refreshes** via Local Storage

### ❤️ Favorites
- Heart icon on every book card
- Toggle favorites on/off
- **Saved in Local Storage** — survives page refresh

### 🌙 Dark Mode
- Toggle between light and dark with one click
- Dark palette uses **warm browns, espresso, parchment, and gold** — keeps the vintage feel
- **Preference saved** in Local Storage

### 💬 Quote Generator
- 25+ curated literary quotes
- **Previous / Next / Random** navigation
- **Copy to clipboard** button
- **Share** button (uses Web Share API on supported devices)
- Smooth fade-in/out animation between quotes

### 📬 Contact Page
- **Form validation** with field-level error highlighting
- Success and error feedback messages
- Social media links (GitHub, LinkedIn, Email, Instagram, Goodreads)
- **FAQ accordion** — animated open/close
- Google Maps placeholder
- Back-to-top button

### ℹ️ About Page
- Mission, Vision, Community cards
- **Timeline** of the project's development
- **Fun facts** about books and reading
- Curated reading experience philosophy

### 🧭 Navigation
- **Sticky navbar** that shrinks on scroll
- **Active page indicator** on current link
- **Animated hamburger menu** for mobile
- Reading List panel toggle in the navbar
- Dark mode toggle in the navbar

### 🎬 Animations
- Scroll-triggered **fade-in** on all major sections
- Card **hover lift and zoom**
- **Button ripple** effect
- Quote container **fade transition**
- Modal **scale-in** animation
- Hamburger **morph animation** (☰ → ✕)

### ♿ Accessibility
- Semantic HTML5 throughout (`<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`)
- `aria-label`, `aria-current`, `aria-expanded`, `aria-live` attributes
- `:focus-visible` focus rings for keyboard navigation
- `alt` text on all images
- `role` attributes on interactive components

---

## 🗂️ Project Structure

```
The-Lit-Library/
│
├── index.html       # Homepage — hero, featured book, quotes, trending, categories
├── books.html       # Books page — search, filter, cards, modal
├── about.html       # About page — cards, timeline, fun facts
├── contact.html     # Contact page — form, FAQ, social links
├── style.css        # Single unified stylesheet (no duplicates)
└── script.js        # Single unified JavaScript file
```

> All CSS lives in one `style.css`. All JavaScript lives in one `script.js`. No external frameworks, no build tools.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **HTML5** | Semantic structure, accessibility |
| **CSS3** | Grid, Flexbox, custom properties, animations |
| **Vanilla JavaScript** | Search, filter, modal, dark mode, Local Storage |
| **Google Fonts** | Cormorant Garamond + Inter |
| **Local Storage API** | Reading list, favorites, dark mode preference |
| **Web Share API** | Share quotes on supported devices |
| **Intersection Observer API** | Scroll-triggered animations, lazy loading |
| **Clipboard API** | Copy quote to clipboard |

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Parchment | `#F9F3E6` | Page background |
| Aged Paper | `#EADBC6` | Cards, panels |
| Espresso | `#2A1B12` | Navigation, dark elements |
| Warm Taupe | `#8B6B4A` | Subtext, muted elements |
| Golden | `#B88B4A` | Accents, borders, stars |
| Golden Light | `#d4a574` | Hover states, highlights |
| Cream | `#efe2cf` | Section backgrounds |

Dark mode uses deep browns, warm parchment tones, and gold accents to maintain the vintage aesthetic.

### Typography
- **Headings:** Cormorant Garamond (serif) — elegant, literary feel
- **Body / UI:** Inter (sans-serif) — clean, readable

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/vandanacoder/The-Lit-Library.git
cd The-Lit-Library
```

### Run locally
No build tools needed. Just open `index.html` in any modern browser.

```bash
# Option 1 — open directly
open index.html

# Option 2 — use VS Code Live Server extension (recommended)
# Right-click index.html → "Open with Live Server"

# Option 3 — use Python's built-in server
python3 -m http.server 8000
# Then visit http://localhost:8000
```

---

## 📸 Pages Overview

| Page | Description |
|---|---|
| `index.html` | Homepage with hero, featured book, quote generator, trending reads |
| `books.html` | Full book collection with search, filter, modal, favorites & reading list |
| `about.html` | Project story, mission, vision, timeline, and fun book facts |
| `contact.html` | Contact form, FAQ accordion, social links, and map placeholder |

---

## 💾 Local Storage Keys

| Key | Contents |
|---|---|
| `litlibrary-rl` | Reading list (array of book objects) |
| `litlibrary-favs` | Favorite book IDs (array of numbers) |
| `litlibrary-dark` | Dark mode preference (boolean) |

---

## 🗺️ Roadmap

- [ ] Backend integration for the contact form
- [ ] User accounts with cloud-synced reading lists
- [ ] Reader reviews and community ratings
- [ ] More books across additional genres
- [ ] Dedicated genre collection pages
- [ ] Book-of-the-month archive
- [ ] Performance audit and image optimisation

---

## 🤝 Contributing

Contributions, suggestions, and book recommendations are always welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add: your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

**Vandana** — [@vandanacoder](https://github.com/vandanacoder)
✉️ litlibrary.contact@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with 📖 and ☕ by [vandanacoder](https://github.com/vandanacoder)**

*"A reader lives a thousand lives before they die. The one who never reads lives only one." — George R.R. Martin*

⭐ If you enjoyed this project, please consider giving it a star!

</div>
