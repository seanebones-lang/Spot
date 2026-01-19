# Spotify UI Clone - Quick Reference Guide

## Key Features Fixed

### 🔒 Security
- **XSS Prevention**: All user content sanitized using safe DOM API
- **Safe Storage**: localStorage quota handling with sessionStorage fallback

### ⌨️ Keyboard Shortcuts
- `Space`: Play/Pause
- `Left Arrow`: Seek backward 10s
- `Right Arrow`: Seek forward 10s
- `Up Arrow`: Volume up (+5%)
- `Down Arrow`: Volume down (-5%)
- `Ctrl/Cmd+K`: Focus search
- `Ctrl/Cmd+/`: Show keyboard shortcuts
- `Ctrl/Cmd+→`: Next track
- `Ctrl/Cmd+←`: Previous track

### 🎨 Visual Design
- **Sidebar**: Icon-only by default (72px), expands to show text (>240px)
- **TopBar**: Clean, minimal (Back/Forward, Search, Install App, Notifications, Friends, User)
- **Player**: Square album art (56px), correct proportions (30% | 40% | 30%)
- **Home**: Clean card grid, no widgets

### ♿ Accessibility
- All interactive elements have ARIA labels
- Full keyboard navigation support
- Screen reader compatible
- Focus indicators visible

## File Structure

### Components
- `components/Player.tsx` - Main player bar (bottom)
- `components/Sidebar.tsx` - Left sidebar navigation
- `components/TopBar.tsx` - Top navigation bar
- `components/PictureInPicturePlayer.tsx` - PiP window player
- `components/ProgressBar.tsx` - Audio progress bar
- `components/VolumeControl.tsx` - Volume slider

### Stores (Zustand)
- `stores/playerStore.ts` - Audio player state
- `stores/uiStore.ts` - UI state (sidebars, etc.)
- `stores/libraryStore.ts` - Library/collection state
- `stores/searchStore.ts` - Search state
- `stores/*.ts` - Other feature stores

### Utilities
- `lib/safeStorage.ts` - Safe localStorage wrapper
- `lib/keyboardShortcuts.ts` - Keyboard shortcut handlers
- `lib/player.ts` - Audio player logic

## Default Values

### Sidebar
- Default width: **72px** (icon-only)
- Expand threshold: **240px** (shows text labels)
- Min width: **200px**
- Max width: **50% viewport**

### Player
- Height: **90px**
- Album art: **56px × 56px** (square)
- Layout: **30% | 40% | 30%**

### Colors (Spotify Match)
- Background: `#121212` (main), `#181818` (cards), `#000000` (top bar)
- Text: `#FFFFFF` (primary), `#B3B3B3` (secondary), `#535353` (tertiary)
- Accent: `#1DB954` (green)
- Hover: `rgba(255, 255, 255, 0.1)`

## Common Issues & Solutions

### Issue: Audio not seeking with keyboard
**Solution**: Already fixed - `audioPlayer.seek()` now called in keyboard shortcuts

### Issue: localStorage quota exceeded
**Solution**: Already fixed - All stores use `createSafeStorage()` with fallback

### Issue: Sidebar too wide
**Solution**: Default changed to 72px - resize to expand if needed

### Issue: Images not loading
**Solution**: Already fixed - Fallback placeholders implemented

### Issue: Form validation not working
**Solution**: Already fixed - Validation added to Artist Signup form

## Testing Commands

```bash
# Build
npm run build

# Lint
npm run lint

# Test
npm run test

# E2E Tests
npm run test:e2e

# Dev Server
npm run dev
```

## Deployment

```bash
# Production build
npm run build

# Deploy (platform-specific)
npm run deploy
```

## Support

For issues or questions:
1. Check `COMPREHENSIVE_FIXES_SUMMARY.md` for detailed fix information
2. Check `DEPLOYMENT_CHECKLIST.md` for deployment steps
3. Review component documentation in code comments

---

*Last Updated: 2026-01-XX*
