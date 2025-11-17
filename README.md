# Luxury Real Estate Website

An ultra-premium real estate website with smart home automation features, featuring a sophisticated white-gold-champagne color palette and cutting-edge UI/UX design.

## Features

### 🔐 Authentication System
- **User Registration** - Create accounts with email, password, and profile information
- **Login/Logout** - Secure authentication with session persistence
- **Protected Routes** - Dashboard and premium features require authentication
- **User Dashboard** - Manage profile, favorites, saved searches, and settings
- **Favorites System** - Save and manage favorite properties
- **Local Storage** - User data persists across sessions

### 🏛️ Premium Design System
- **Color Palette**: White, Gold, Champagne with matte-black accents
- **Typography**: Playfair Display (serif) + Inter/Neue Montreal (sans-serif)
- **Animations**: Luxury easing curves (Bezier 0.22, 1, 0.36, 1)
- **Glassmorphism**: Premium frosted glass effects
- **Shadows**: Cinematic soft shadows with gold tints

### 🎯 Key Components

1. **Hero Section**
   - Cinematic 3D architectural renders
   - Slow parallax scrolling effects
   - Floating gold-tinted property cards
   - Premium editorial typography with gold emboss

2. **Interactive 3D Property Explorer**
   - Rotatable 3D house model (Three.js)
   - Time-of-day lighting simulation
   - Interactive zone highlighting
   - Dynamic shadow rendering

3. **Luxury Property Carousel**
   - High-resolution image galleries
   - Ultra-smooth inertia scrolling
   - Gold micro-interactions
   - Glassmorphism overlays
   - Auto-play with cinematic transitions

4. **Smart Home Automation Dashboard**
   - Real-time device controls
   - Energy consumption graphs
   - Floor plan heatmaps
   - Live status cards
   - Elegant control dials and sliders

5. **AI Property Match Engine**
   - Personality-based matching
   - Animated compatibility score rings
   - Dynamic property recommendations
   - Algorithm visualization

6. **Property Details Page**
   - Magazine-style layout
   - Property blueprints with gold outlines
   - Interactive mortgage calculator
   - 360° virtual tour frames
   - Image gallery with smooth transitions

7. **Floating Navigation**
   - Gold thin-line icons
   - Smooth fade-in on scroll
   - Polished metal reflection animations

8. **Luxury Footer**
   - Marble texture with gold veins
   - Premium monoline social icons
   - Minimal gold dividers

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** + React Three Fiber for 3D
- **React Router** for navigation
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

### Using the Website

1. **Create an Account**: Click "Sign In" in the navigation, then "Create Account"
   - Fill in your name, email, password, and optional phone number
   - Password must be at least 8 characters with uppercase, lowercase, and numbers

2. **Login**: Use your email and password to access your account

3. **Dashboard**: After logging in, access your dashboard to:
   - View your profile and account settings
   - See your favorite properties
   - Track your property viewing history
   - Manage saved searches

4. **Browse Properties**: Explore properties on the homepage
   - Click "Explore Property" to view details
   - Add properties to favorites (requires login)
   - Use the interactive 3D explorer
   - Check out the smart home automation features

5. **Property Details**: View full property information
   - Use the mortgage calculator
   - View floor plans
   - Schedule viewings
   - Add to favorites

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Floating navigation bar
│   ├── ProtectedRoute.tsx      # Route protection wrapper
│   ├── HeroSection.tsx         # Hero with parallax
│   ├── PropertyExplorer.tsx    # 3D interactive explorer
│   ├── PropertyCarousel.tsx    # Luxury image carousel
│   ├── SmartHomeDashboard.tsx  # Home automation UI
│   ├── AIPropertyMatch.tsx     # AI matching engine
│   ├── PropertyDetails.tsx     # Property detail page
│   └── Footer.tsx              # Luxury footer
├── context/
│   └── AuthContext.tsx         # Authentication context & state
├── pages/
│   ├── Login.tsx               # Login page
│   ├── Signup.tsx               # Registration page
│   └── Dashboard.tsx            # User dashboard
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## Design Philosophy

This website combines:
- **Sotheby's International Realty** elegance
- **Apple** product design language
- **Tesla** interface minimalism
- **Luxury smart-living** dashboards

Every interaction, animation, and visual element is crafted to convey wealth, architectural precision, and futuristic living.

## Customization

### Colors
Edit `tailwind.config.js` to modify the luxury color palette:
- `luxury-white`: #FAFAF8
- `luxury-gold`: #D4AF37
- `luxury-champagne`: #F7E7CE
- `luxury-black`: #1A1A1A

### Typography
Fonts are loaded from Google Fonts. Modify `index.html` to change font families.

### Animations
Animation curves and timings can be adjusted in `tailwind.config.js` and component files using Framer Motion.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.

---

Built with ❤️ for luxury real estate and smart home automation.

