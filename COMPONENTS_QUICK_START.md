# Components Quick Start Guide

**Date:** January 14, 2026  
**Status:** ✅ Ready to Use

---

## 🚀 Quick Setup

### 1. Add ToastProvider to Root Layout

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
```

### 2. Add SkipLinks to Main Layout

```tsx
// components/LayoutContent.tsx or main layout
import { SkipLinks } from '@/components';

export default function LayoutContent({ children }) {
  return (
    <>
      <SkipLinks />
      <main id="main-content">{children}</main>
      <nav id="navigation">...</nav>
    </>
  );
}
```

---

## 📦 Component Usage

### Skeleton Loaders

```tsx
import { Skeleton, SkeletonCard, SkeletonList } from '@/components';

// Basic skeleton
<Skeleton variant="text" size="md" />

// Card skeleton
<SkeletonCard showImage showTitle showDescription />

// List skeleton
<SkeletonList count={5} showAvatar />

// Multiple items
<Skeleton variant="card" count={6} />
```

**Use Cases:**
- Loading album grids
- Loading track lists
- Loading playlists
- Loading search results

---

### Toast Notifications

```tsx
import { useToast } from '@/components';

function MyComponent() {
  const { showToast } = useToast();

  const handleSuccess = () => {
    showToast({
      message: 'Playlist created successfully!',
      variant: 'success',
      duration: 4000,
    });
  };

  const handleError = () => {
    showToast({
      message: 'Failed to save changes',
      variant: 'error',
      action: {
        label: 'Retry',
        onClick: () => retrySave(),
      },
    });
  };

  return (
    <button onClick={handleSuccess}>Save</button>
  );
}
```

**Variants:** `success`, `error`, `warning`, `info`

---

### Select Dropdown

```tsx
import { Select } from '@/components';

function GenreSelector() {
  const [selected, setSelected] = useState('');

  const genres = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    { value: 'jazz', label: 'Jazz' },
  ];

  return (
    <Select
      label="Select Genre"
      placeholder="Choose a genre..."
      options={genres}
      value={selected}
      onChange={setSelected}
      searchable
      required
      helperText="Choose your favorite music genre"
    />
  );
}
```

---

### Tabs Component

```tsx
import { Tabs } from '@/components';

function ProfileTabs() {
  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
        <Tabs.Trigger value="playlists">Playlists</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      
      <Tabs.Content value="overview">
        <OverviewContent />
      </Tabs.Content>
      
      <Tabs.Content value="playlists">
        <PlaylistsContent />
      </Tabs.Content>
      
      <Tabs.Content value="settings">
        <SettingsContent />
      </Tabs.Content>
    </Tabs>
  );
}
```

**With URL Hash:**
```tsx
<Tabs defaultValue="tab1" hashSupport>
  {/* Tab changes update URL hash */}
</Tabs>
```

---

### LazyImage Component

```tsx
import { LazyImage } from '@/components';

// Lazy load below fold
<LazyImage
  src="/album-cover.jpg"
  alt="Album cover"
  width={300}
  height={300}
  placeholder="skeleton"
/>

// Priority load above fold
<LazyImage
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

**Placeholder Options:** `empty`, `blur`, `skeleton`

---

## 🛠️ Utility Functions

### Performance Utilities

```tsx
import { 
  debounce, 
  throttle, 
  useMemoized, 
  useStableCallback 
} from '@/lib/performance';

// Debounce search
const debouncedSearch = debounce((query) => {
  searchAPI(query);
}, 300);

// Memoize expensive calculation
const sortedTracks = useMemoized(() => {
  return tracks.sort((a, b) => a.title.localeCompare(b.title));
}, [tracks]);

// Stable callback
const handleClick = useStableCallback((id) => {
  onItemClick(id);
});
```

---

### Accessibility Utilities

```tsx
import { 
  trapFocus, 
  announce, 
  focusElement 
} from '@/lib/accessibility';

// Focus trap for modal
const cleanup = trapFocus(modalRef, {
  escapeCallback: () => closeModal(),
  returnFocus: previousButton,
});

// Announce to screen readers
announce('Playlist created successfully!');

// Focus element
focusElement('main-content');
```

---

## ✅ Testing Checklist

### Visual Testing
- [ ] Test all component variants (primary, secondary, etc.)
- [ ] Test all sizes (sm, md, lg)
- [ ] Test disabled states
- [ ] Test error states
- [ ] Test loading states (skeleton)
- [ ] Test responsive breakpoints (mobile, tablet, desktop)

### Accessibility Testing
- [ ] Tab through all interactive elements
- [ ] Test keyboard navigation (Arrow keys in Select, Tabs)
- [ ] Test skip links (Tab key on page load)
- [ ] Run screen reader (VoiceOver/NVDA)
- [ ] Test focus indicators (visible 4px ring)
- [ ] Test ARIA announcements (toast notifications)

### Performance Testing
- [ ] Check bundle size (should be smaller with lazy loading)
- [ ] Test lazy image loading (Intersection Observer)
- [ ] Test debounced search (no excessive API calls)
- [ ] Test skeleton loaders (perceived performance)
- [ ] Lighthouse audit (target 90+ score)

### Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🔍 Common Issues & Solutions

### Issue: Toast not showing
**Solution:** Ensure `ToastProvider` wraps your app in root layout

### Issue: Select dropdown not closing
**Solution:** Check z-index conflicts, ensure container ref is set

### Issue: Skeleton not animating
**Solution:** Check `animate` prop (defaults to `true`), verify CSS animations

### Issue: LazyImage not loading
**Solution:** Check `src` is valid, verify Intersection Observer support

### Issue: Tabs keyboard nav not working
**Solution:** Ensure `Tabs.List` wraps `Tabs.Trigger` components

---

## 📚 Additional Resources

- **Component Examples:** `components/Button.examples.tsx`
- **Performance Guide:** `PERFORMANCE_OPTIMIZATIONS.md`
- **Gap Analysis:** `UI_GAP_ANALYSIS_REPORT.md`
- **Completion Summary:** `UI_ENHANCEMENTS_COMPLETE.md`

---

## 🎯 Migration Guide

### Replace Custom Toast with New Toast

```tsx
// Before
<div className="error-toast">Error message</div>

// After
const { showToast } = useToast();
showToast({ message: 'Error message', variant: 'error' });
```

### Replace Native Select with New Select

```tsx
// Before
<select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="1">Option 1</option>
</select>

// After
<Select 
  options={[{ value: '1', label: 'Option 1' }]}
  value={value}
  onChange={setValue}
/>
```

### Replace Loading Spinner with Skeleton

```tsx
// Before
{loading ? <Spinner /> : <Content />}

// After
{loading ? <Skeleton variant="card" /> : <Content />}
```

---

**Ready to start using!** 🚀
