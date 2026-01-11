# God's Wonderful Plan (Evange App)

A beautiful, mobile-friendly interactive slideshow app built with Vite and Swiper.js to share the message of God's love and the Gospel.

## ✨ Features

- **Responsive Design**: Optimized for mobile devices, including specific support for iPhone safe areas (notch/dynamic island).
- **Interactive Slideshow**: Smooth transitions between 16 thematic slides using Swiper.js.
- **Dynamic Content**: Combination of beautiful background imagery and clear, impactful typography.
- **Modern Tech Stack**: Fast development and building with Vite.

## 🛠 Tech Stack

- **Framework**: [Vite](https://vitejs.dev/)
- **Slider Library**: [Swiper.js](https://swiperjs.com/)
- **Styling**: Custom CSS3 with dynamic viewport units (`dvh`) and Safe Area Insets.
- **Language**: HTML5, JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shortdaddy0711/evange.git
   cd evange
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory, which can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 📱 Mobile Optimization

This app is specifically tuned for modern smartphones:
- Uses `viewport-fit=cover` for full-screen experience.
- Implements `env(safe-area-inset-top)` to avoid content being cut off by device notches.
- Uses `100dvh` for accurate full-screen height on mobile browsers.

## 📄 License

This project is for personal/church use. [Insert License Type if applicable, e.g., MIT]

---
Developed for Maranatha Vision Church.
