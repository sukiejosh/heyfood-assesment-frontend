# HeyFood Frontend

A Next.js application that clones the HeyFood restaurant discovery platform with Material-UI components and advanced animations.

## 🚀 Features

- **Pixel-perfect clone** of https://heyfood.africa/stores
- **Advanced search functionality** with animated overlays
- **Dynamic filtering** by food tags (Rice, Chicken, Shawarma, etc.)
- **Restaurant sorting** by rating, delivery time, and delivery fee
- **Mobile-responsive design** with touch-friendly interactions
- **Real-time API integration** with the backend service

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.2 with Turbopack
- **UI Library**: Material-UI (MUI) v6
- **Language**: TypeScript
- **Styling**: Material-UI's sx prop system + Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **API Client**: Custom fetch-based API client

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and fonts
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Main page component
├── components/            # Reusable UI components
│   ├── Banner.tsx         # Banner carousel component
│   ├── FilterTags.tsx     # Food category filter tags
│   ├── Header.tsx         # Main header with search functionality
│   ├── SearchOverlay.tsx  # Unified search categories and results
│   └── SideBar.tsx       # Restaurant sorting sidebar
└── lib/
    └── api.ts            # API client and TypeScript interfaces
```

## 🎨 Key Components

### Header Component
- **Animated search bar** with focus/blur transitions
- **Mobile navigation drawer** with slide animations
- **Search overlay integration** with category selection
- **Responsive breakpoints** for desktop/mobile layouts

### SearchOverlay Component
- **Unified component** handling both categories and results
- **Smooth transitions** between category and result views
- **Real-time API calls** for restaurant filtering
- **Dynamic content loading** with loading states

### FilterTags Component
- **Horizontal scrolling** tag selection
- **Multiple tag selection** with visual feedback
- **Icon mapping system** for food categories
- **Responsive spacing** (mobile: gap, desktop: space-between)

### Banner Component
- **Auto-rotating carousel** with smooth transitions
- **Static banner images** as specified in requirements
- **Touch-friendly** navigation controls

## 🎭 Animations & UX

### Search Interface Animations
- **Slide transitions** with cubic-bezier easing
- **Opacity animations** from transparent to visible
- **Staggered timing** for smooth visual flow
- **Mobile-optimized** touch interactions

### Visual Design
- **Poppins font family** matching original design
- **Material Design principles** with custom theming
- **Consistent color scheme** (#4CAF50 primary green)
- **Responsive typography** scaling across devices

## 🔌 API Integration

### Endpoints Used
```typescript
GET /api/restaurants       # Fetch restaurants with filtering/sorting
GET /api/tags             # Fetch food category tags
GET /api/restaurants?tags=Rice&limit=20  # Tag-based filtering
```

### TypeScript Interfaces
```typescript
interface Restaurant {
  id: number;
  name: string;
  rating: string;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  tags: string[];
  // ... more fields
}

interface Tag {
  id: number;
  name: string;
  restaurantCount: number;
  // ... more fields
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Running backend service on port 5001

### Installation

1. **Clone and navigate**:
```bash
cd heyfood-frontend
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Environment setup**:
```bash
cp .env.example .env.local
# Edit .env.local if backend runs on different port
```

4. **Start development server**:
```bash
pnpm dev
```

5. **Open application**:
```
http://localhost:3000
```

## 📱 Responsive Design

### Desktop (1024px+)
- **Full header layout** with search and navigation
- **Multi-column restaurant grid** with sidebar
- **Horizontal tag scrolling** with space-between layout
- **Desktop-optimized** search overlay

### Mobile (< 768px)
- **Collapsible hamburger menu** with slide drawer
- **Stack layout** with full-width components
- **Touch-friendly** tag selection with gap spacing
- **Mobile-first** search overlay with fullscreen view

## 🎯 Performance Optimizations

- **Next.js 15** with Turbopack for fast development
- **Code splitting** with dynamic imports
- **Optimized images** with Next.js Image component
- **Efficient re-renders** with React.memo and useMemo
- **API caching** with built-in fetch caching

## 📋 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## 🌐 Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api  # Backend API URL
```

## 🔧 Development Notes

### Font Loading
- Uses **Google Fonts** (Poppins) loaded via CSS @import
- Fallback to Arial and sans-serif for reliability

### Animation Timing
- **Search transitions**: 400ms with cubic-bezier easing
- **Component slides**: Staggered timing for smooth flow
- **Mobile interactions**: Optimized for 60fps performance

### Component Architecture
- **Modular design** with clear separation of concerns
- **TypeScript interfaces** for type safety
- **Reusable patterns** across components
- **Props-based customization** for flexibility

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Build for production:
```bash
pnpm build
```

### Environment setup for production:
- Set `NEXT_PUBLIC_API_URL` to your production backend URL
- Ensure backend API is accessible from the frontend domain

---

Built with ❤️ using Next.js, Material-UI, and modern web technologies.