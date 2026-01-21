# Quick Setup Guide - Performance Optimizations

## 🚀 Installation

### 1. Install New Dependencies

```bash
cd /Users/nexteleven/Spot
npm install react-window react-virtualized-auto-sizer
npm install -D @types/react-window
```

### 2. Verify Installation

```bash
npm list react-window react-virtualized-auto-sizer
```

### 3. Build and Test

```bash
# Development
npm run dev

# Production build with bundle analysis
ANALYZE=true npm run build

# Production server
npm start
```

## 📋 What Was Implemented

### ✅ High-Impact Optimizations

1. **List Virtualization** (`components/VirtualizedTrackList.tsx`)
   - Use for any list with 50+ items
   - Automatically used in QueuePanel for large queues

2. **React 19 Suspense** (`app/mood/[mood]/page.example.tsx`)
   - Example pattern for async data fetching
   - Copy pattern to other pages as needed

3. **Image Optimization** (`components/ImageWithFallback.tsx`)
   - Now uses Next.js `Image` component
   - Add `priority={true}` for LCP images
   - Add `sizes` prop for responsive images

4. **Service Worker** (`public/sw.js`)
   - Automatically registered in production
   - Provides offline support and caching

## 🎯 Usage Examples

### Using VirtualizedTrackList

```tsx
import { VirtualizedTrackList } from "@/components/VirtualizedTrackList";

// In your component
<VirtualizedTrackList
  tracks={tracks}
  onPlay={(track) => handlePlay(track)}
  height={600}
  currentTrackId={currentTrack?.id}
  isPlaying={isPlaying}
/>;
```

### Using Optimized Images

```tsx
import ImageWithFallback from '@/components/ImageWithFallback';

// For LCP images (above the fold)
<ImageWithFallback
  src={track.coverArt}
  alt={track.name}
  width={200}
  height={200}
  priority={true} // Add for hero images
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// For below-the-fold images
<ImageWithFallback
  src={track.coverArt}
  alt={track.name}
  width={200}
  height={200}
  sizes="(max-width: 768px) 100vw, 25vw"
/>
```

### Using React 19 Suspense

```tsx
import { Suspense } from "react";
import { use } from "react";

async function fetchData() {
  const res = await fetch("/api/data", { next: { revalidate: 3600 } });
  return res.json();
}

function DataComponent() {
  const data = use(fetchData()); // Suspense-friendly
  return <div>{/* render data */}</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  );
}
```

## 🧪 Testing Performance

### Lighthouse

```bash
# Build production
npm run build
npm start

# In another terminal, run Lighthouse
npx lighthouse http://localhost:3000 --view
```

### Bundle Analysis

```bash
ANALYZE=true npm run build
# Opens bundle analyzer in browser
```

### Chrome DevTools

1. Open Chrome DevTools
2. Go to Performance tab
3. Record while using the app
4. Check for:
   - Long tasks (>50ms)
   - Layout shifts
   - Memory leaks

## 📊 Expected Results

- **Lighthouse Performance**: 95+
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 2.5s

## 🐛 Troubleshooting

### Service Worker Not Registering

- Check browser console for errors
- Ensure you're in production mode (`NODE_ENV=production`)
- Clear browser cache and reload

### Virtualization Not Working

- Verify `react-window` is installed
- Check that list has `height` prop set
- Ensure parent container has defined height

### Images Not Optimizing

- Verify Next.js Image component is being used
- Check that `width` and `height` are provided (or `fill`)
- Ensure images are in `public/` or using absolute URLs

## 📚 Documentation

- **Full Details**: See `PERFORMANCE_OPTIMIZATIONS.md`
- **Summary**: See `OPTIMIZATION_SUMMARY.md`
- **Example Code**: See `app/mood/[mood]/page.example.tsx`

---

**Ready to go!** All optimizations are implemented and ready to use. 🚀
