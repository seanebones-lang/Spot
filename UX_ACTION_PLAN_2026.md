# UX Action Plan - Immediate Implementation Guide
**Date:** January 14, 2026  
**Priority:** Critical (P0) → High (P1) → Medium (P2) → Low (P3)

---

## 🚨 P0 - Critical Fixes (Implement First)

### 1. Onboarding System
**Files to Modify:**
- `app/page.tsx` - Add welcome modal logic
- `components/OnboardingTour.tsx` - **NEW FILE** - Create tour component
- `stores/onboardingStore.ts` - **NEW FILE** - Track onboarding completion

**Implementation Steps:**
```tsx
// 1. Create OnboardingTour component
// Location: components/OnboardingTour.tsx
// Features:
//   - Welcome modal (first visit only)
//   - 4-step interactive tour (dismissible)
//   - Tooltips for key features
//   - LocalStorage tracking (onboarding_completed: true)

// 2. Add to app/page.tsx
import { useEffect, useState } from 'react';
import OnboardingTour from '@/components/OnboardingTour';

export default function HomePage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed) setShowOnboarding(true);
  }, []);
  
  return (
    <>
      {showOnboarding && <OnboardingTour onComplete={() => setShowOnboarding(false)} />}
      {/* ... rest of page ... */}
    </>
  );
}
```

**A/B Test Setup:**
- Control: No onboarding
- Variant: Welcome modal + tour
- Metric: Day 7 retention

---

### 2. Accessibility - ARIA Labels
**Files to Modify:**
- `components/TopBar.tsx` - Lines 252-329 (Icon buttons)

**Quick Fixes:**
```tsx
// BEFORE:
<Download size={20} />

// AFTER:
<button
  aria-label="Your Downloads"
  title="Your Downloads"
>
  <Download size={20} aria-hidden="true" />
</button>
```

**Buttons Needing ARIA Labels:**
1. Downloads button (Line 253)
2. Notifications button (Line 281)
3. Settings button (Line 304)
4. Right sidebar toggle (Line 402)

**Skip Link:**
```tsx
// Add to components/LayoutContent.tsx (after <TopBar />)
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:px-4 focus:py-2 focus:bg-spotify-green focus:text-black"
>
  Skip to main content
</a>

// Add id to main content
<main id="main-content" className="flex-1 flex flex-col ...">
```

---

### 3. Error Handling - User-Facing Messages
**Files to Modify:**
- `app/page.tsx` - Lines 17-39 (handlePlayTrack error handling)
- `components/ErrorBoundary.tsx` - Enhance error display
- `components/ErrorToast.tsx` - **NEW FILE** - Create toast component

**Implementation:**
```tsx
// components/ErrorToast.tsx
'use client';

interface ErrorToastProps {
  message: string;
  onRetry?: () => void;
  onDismiss: () => void;
}

export default function ErrorToast({ message, onRetry, onDismiss }: ErrorToastProps) {
  return (
    <div 
      role="alert"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-4"
    >
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="underline">
          Retry
        </button>
      )}
      <button onClick={onDismiss} aria-label="Dismiss error">×</button>
    </div>
  );
}

// Usage in app/page.tsx:
const [error, setError] = useState<string | null>(null);

const handlePlayTrack = async (track: Track, e?: React.MouseEvent) => {
  try {
    // ... existing code ...
  } catch (error) {
    setError('Failed to play track. Please try again.');
    console.error('❌ Error in handlePlayTrack:', error);
  }
};

{error && (
  <ErrorToast 
    message={error} 
    onRetry={() => handlePlayTrack(currentTrack)}
    onDismiss={() => setError(null)}
  />
)}
```

---

## ⚡ P1 - High Impact Improvements

### 4. Mood Discovery - Home Page Promotion
**Files to Modify:**
- `app/page.tsx` - Add "Mood Matcher" card after Daily Check-in

**Implementation:**
```tsx
// Add after Daily Check-in Card (around line 67)
{/* Mood Matcher Card */}
<div className="mb-8 bg-gradient-to-r from-empulse-purple/20 to-empulse-blue/20 rounded-lg p-6 border border-empulse-purple/30">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold mb-2">Mood Matcher</h2>
      <p className="text-spotify-text-gray mb-4">
        Not sure what to listen to? Find music that matches your current mood.
      </p>
      <Link 
        href="/mood" 
        className="px-6 py-3 bg-empulse-purple hover:bg-empulse-purple/80 text-white rounded-full font-semibold transition-all duration-300 inline-block"
      >
        Find My Mood →
      </Link>
    </div>
    <Heart size={64} className="opacity-30" />
  </div>
</div>
```

**Mood Widget Tooltip:**
```tsx
// components/mood/MoodWidget.tsx - Add tooltip
import { Tooltip } from '@/components/Tooltip'; // Create if doesn't exist

<Tooltip text="Click to find similar tracks matching this mood">
  <MoodWidget track={currentTrack} />
</Tooltip>
```

---

### 5. Search - Autocomplete Enhancement
**Files to Modify:**
- `components/SearchDropdown.tsx` - Add autocomplete while typing
- `components/TopBar.tsx` - Lines 182-192 (Search dropdown logic)

**Implementation:**
```tsx
// components/TopBar.tsx - Update search state
const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

useEffect(() => {
  if (searchQuery.trim().length > 2) {
    // Fetch autocomplete results
    const results = mockData.search(searchQuery);
    setSearchResults(results.slice(0, 5));
  } else {
    setSearchResults([]);
  }
}, [searchQuery]);

// Update SearchDropdown props
<SearchDropdown
  query={searchQuery}
  results={searchResults}
  isOpen={showSearchDropdown && (searchQuery.length > 2 || !searchQuery)}
  onClose={() => setShowSearchDropdown(false)}
  onSelect={(query) => {
    setSearchQuery(query);
    addSearch(query);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setShowSearchDropdown(false);
  }}
/>
```

**Search Filters (Future):**
```tsx
// Add filter chips in SearchDropdown
<div className="flex gap-2 px-4 pb-2 border-b">
  {['All', 'Tracks', 'Artists', 'Playlists', 'Albums'].map((filter) => (
    <button
      key={filter}
      className={`px-3 py-1 rounded-full text-sm ${
        activeFilter === filter
          ? 'bg-spotify-green text-black'
          : 'bg-spotify-light-gray text-white hover:bg-spotify-light-gray/80'
      }`}
      onClick={() => setActiveFilter(filter)}
    >
      {filter}
    </button>
  ))}
</div>
```

---

### 6. Help & Documentation - Discoverability
**Files to Modify:**
- `components/UserMenu.tsx` - Add Help link
- `components/TopBar.tsx` - Add keyboard shortcuts button/indicator

**Implementation:**
```tsx
// components/UserMenu.tsx - Add Help link
<Link href="/help" className="px-4 py-2 hover:bg-spotify-light-gray/50">
  <HelpCircle size={20} />
  Help & Support
</Link>

// components/TopBar.tsx - Add keyboard shortcuts indicator
<button
  onClick={() => setShortcutsOpen(true)}
  className="flex items-center gap-2 px-2 py-1 rounded text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/50"
  title="Keyboard Shortcuts (Ctrl+/)"
>
  <Keyboard size={16} />
  <span className="text-xs">Ctrl+/</span>
</button>
```

---

## 📊 P2 - Engagement Optimization

### 7. Check-In - Gamification Enhancement
**Files to Modify:**
- `app/check-in/page.tsx` - Add point breakdown visualization

**Implementation:**
```tsx
// Add point breakdown card
<div className="mb-6 bg-spotify-light-gray rounded-lg p-4">
  <h3 className="text-lg font-bold mb-3">Points You'll Earn</h3>
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="text-spotify-text-gray">Daily Check-in</span>
      <span className="text-spotify-green font-semibold">+10 points</span>
    </div>
    {streak > 0 && (
      <div className="flex items-center justify-between">
        <span className="text-spotify-text-gray">Streak Bonus ({streak} days)</span>
        <span className="text-orange-500 font-semibold">+25 points</span>
      </div>
    )}
    <div className="pt-2 border-t border-spotify-dark-gray">
      <div className="flex items-center justify-between">
        <span className="font-bold">Total</span>
        <span className="text-spotify-green font-bold text-xl">
          +{10 + (streak > 0 ? 25 : 0)} points
        </span>
      </div>
    </div>
  </div>
</div>
```

---

### 8. Playlist Management - Create Button
**Files to Modify:**
- `components/Sidebar.tsx` - Lines 154-165 (Playlists section header)

**Implementation:**
```tsx
// Update Playlists Section Header
<div className="flex items-center justify-between mb-2 px-2">
  <h3 className="text-xs font-bold text-spotify-text-gray uppercase tracking-wider">
    Playlists
  </h3>
  <div className="flex items-center gap-2">
    <button
      onClick={() => router.push('/collection?action=create')}
      className="text-spotify-text-gray hover:text-white transition-colors text-xs flex items-center gap-1"
      title="Create Playlist"
    >
      <Plus size={14} />
      Create
    </button>
    <Link
      href="/collection"
      className="text-spotify-text-gray hover:text-white transition-colors text-xs"
    >
      Show all
    </Link>
  </div>
</div>
```

---

### 9. Home Page - Recently Played Section
**Files to Modify:**
- `app/page.tsx` - Add Recently Played section
- `stores/playerStore.ts` - Track recently played tracks

**Implementation:**
```tsx
// Add to app/page.tsx (after Daily Check-in, before Made for You)
{/* Recently Played */}
{recentTracks.length > 0 && (
  <section className="mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold">Recently Played</h2>
      <Link href="/history" className="text-sm text-spotify-text-gray hover:underline">
        See all
      </Link>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {recentTracks.slice(0, 6).map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  </section>
)}

// In stores/playerStore.ts - Add recently played tracking
const recentlyPlayed = useState<Track[]>([]);

const addToRecentlyPlayed = (track: Track) => {
  const updated = [track, ...recentlyPlayed.filter(t => t.id !== track.id)].slice(0, 10);
  setRecentlyPlayed(updated);
  localStorage.setItem('recentlyPlayed', JSON.stringify(updated));
};
```

---

## 🧪 A/B Test Setup

### Test 1: Onboarding Impact
**Platform:** Google Optimize / Vercel Edge Config  
**Duration:** 2 weeks  
**Sample Size:** 1,000 new users per variant

```typescript
// lib/abTests.ts
export function getOnboardingVariant(userId: string): 'control' | 'variant' {
  // Deterministic assignment based on userId
  const hash = hashString(userId);
  return hash % 2 === 0 ? 'control' : 'variant';
}
```

### Test 2: Mood Discovery Prominence
**Duration:** 3 weeks  
**Sample Size:** 2,000 active users per variant

---

## 📈 Metrics Dashboard

### Track These Metrics:
1. **Onboarding Completion Rate:** % of users who complete tour
2. **Mood Page Visits:** Unique visits to `/mood` per user
3. **Search Success Rate:** Searches → Track plays
4. **Check-in Completion:** Daily check-in rate
5. **Keyboard Shortcut Usage:** % of users using Ctrl+K, Ctrl+/
6. **Accessibility Usage:** Screen reader / keyboard navigation sessions
7. **Error Recovery:** % of users who retry after error

---

## ✅ Implementation Checklist

### Week 1 (P0 Critical)
- [ ] Create OnboardingTour component
- [ ] Add welcome modal logic
- [ ] Add ARIA labels to icon buttons
- [ ] Implement skip-to-content link
- [ ] Create ErrorToast component
- [ ] Add error handling to track playback

### Week 2 (P0 + P1 Start)
- [ ] Verify color contrast ratios
- [ ] Enhance focus indicators
- [ ] Add Mood Matcher card to home page
- [ ] Add mood widget tooltip
- [ ] Create Help link in UserMenu

### Week 3 (P1 High Impact)
- [ ] Implement search autocomplete
- [ ] Add keyboard shortcuts button
- [ ] Add contextual tooltips
- [ ] Test accessibility with screen reader

### Week 4 (P2 Engagement)
- [ ] Add check-in point breakdown
- [ ] Add "Create Playlist" button
- [ ] Implement Recently Played section
- [ ] Set up A/B testing framework

---

## 🎯 Success Criteria

**Phase 1 (Week 1-2):**
- ✅ All P0 critical fixes implemented
- ✅ Accessibility compliance (WCAG 2.1 AA)
- ✅ Zero console errors in production

**Phase 2 (Week 3-4):**
- ✅ P1 high-impact improvements deployed
- ✅ A/B tests running
- ✅ 10% increase in mood page visits

**Phase 3 (Month 2):**
- ✅ 15% increase in Day 7 retention
- ✅ 20% increase in daily check-ins
- ✅ 30% increase in feature discovery

---

**Last Updated:** January 14, 2026  
**Next Review:** January 21, 2026 (Week 1 Progress Check)
