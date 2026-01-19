# Spotify UI Verification Checklist
## Component-by-Component Exact Measurements

**Purpose:** Verify every component matches Spotify's exact specifications  
**Method:** Side-by-side comparison, pixel measurements, functional testing

---

## 🔍 TopBar Verification

### Container
- [ ] Height: `56px` (exact)
- [ ] Background: `#000000` (pure black)
- [ ] z-index: `2`
- [ ] Position: `fixed top-0 left-0 right-0`
- [ ] Padding: `16px` all sides

### Logo
- [ ] Position: `left: 16px, top: 16px`
- [ ] Size: `88px × 24px` (or verify actual logo dimensions)
- [ ] Hover opacity: `0.7`
- [ ] Transition: `200ms ease-out`

### Back/Forward Buttons
- [ ] Size: `32px × 32px`
- [ ] Background: `rgba(0,0,0,0.7)`
- [ ] Border radius: `50%` (circular)
- [ ] Disabled state: `opacity: 0.5`
- [ ] Hover: `background: rgba(0,0,0,0.9)`

### Navigation Links
- [ ] Font size: `14px`
- [ ] Font weight: `700` (bold)
- [ ] Line height: `16px`
- [ ] Color (active): `#FFFFFF`
- [ ] Color (inactive): `#B3B3B3`
- [ ] Hover color: `#FFFFFF`
- [ ] Active underline: `text-decoration: underline`
- [ ] Underline offset: `2px`
- [ ] Gap between links: `32px`

### Search Bar
- [ ] Max width: `364px`
- [ ] Height: `40px`
- [ ] Background: `#FFFFFF`
- [ ] Border radius: `500px` (full pill)
- [ ] Padding left: `40px` (for icon)
- [ ] Padding right: `16px`
- [ ] Font size: `14px`
- [ ] Placeholder color: `#121212` at `60% opacity`
- [ ] Icon position: `left: 12px, top: 50%, transform: translateY(-50%)`
- [ ] Icon size: `20px × 20px`
- [ ] Icon color: `#121212`
- [ ] Focus state: Slight scale increase (verify)

### Right Controls (Premium, Downloads, etc.)
- [ ] Size: `32px × 32px`
- [ ] Border radius: `50%` (circular)
- [ ] Color (inactive): `#B3B3B3`
- [ ] Color (active): `#FFFFFF`
- [ ] Background (hover): `rgba(255,255,255,0.1)`
- [ ] Transition: `200ms ease-out`

---

## 🔍 Sidebar Verification

### Container
- [ ] Default width: `256px`
- [ ] Min width: `200px`
- [ ] Max width: `50% viewport`
- [ ] Background: `#000000`
- [ ] Border right: `1px solid #000000`
- [ ] Position: `fixed left-0 top-0 bottom-[90px]`
- [ ] z-index: `40`

### Logo Section
- [ ] Padding: `20px 24px`
- [ ] Font size: `24px`
- [ ] Font weight: `700`
- [ ] Color: `#FFFFFF`

### Navigation Items
- [ ] Container padding: `0 8px`
- [ ] Item padding: `12px 16px`
- [ ] Gap (icon to text): `16px`
- [ ] Font size: `14px`
- [ ] Font weight (active): `700`
- [ ] Font weight (inactive): `400`
- [ ] Color (active): `#FFFFFF`
- [ ] Color (inactive): `#B3B3B3`
- [ ] Icon size: `24px × 24px`
- [ ] Icon color (active): `#FFFFFF`
- [ ] Icon color (inactive): `#535353`
- [ ] Background (active): `#282828`
- [ ] Background (hover): `rgba(255,255,255,0.1)`
- [ ] Border radius: `4px`
- [ ] Margin bottom: `4px`

### Playlists Section
- [ ] Header font size: `11px`
- [ ] Header font weight: `700`
- [ ] Header letter spacing: `0.1em`
- [ ] Header color: `#B3B3B3`
- [ ] Header text transform: `uppercase`
- [ ] Header padding: `0 8px`
- [ ] Header margin bottom: `8px`
- [ ] Item padding: `6px 8px`
- [ ] Item gap: `8px`
- [ ] Item font size: `14px`
- [ ] Item font weight (active): `700`
- [ ] Item font weight (inactive): `400`
- [ ] Item color (active): `#FFFFFF`
- [ ] Item color (inactive): `#B3B3B3`
- [ ] Cover art size: `16px × 16px`
- [ ] Cover art border radius: `2px`
- [ ] Pin button size: `14px × 14px`
- [ ] Pin button opacity (hover): `0 → 1`
- [ ] Pin button color (pinned): `#1DB954`

### Resize Handle
- [ ] Width: `1px`
- [ ] Background: `transparent`
- [ ] Hover background: `#1DB954` at `60% opacity`
- [ ] Cursor: `col-resize`
- [ ] Position: `fixed` at right edge

### Collapsed State
- [ ] Width: `64px`
- [ ] Icon only display
- [ ] Text hidden or very small
- [ ] Centered icons

---

## 🔍 Main Content Area Verification

### Container
- [ ] Background: `#121212`
- [ ] Padding: `32px`
- [ ] Padding bottom: `24px`
- [ ] Margin top: `56px` (for TopBar)

### Section Headers
- [ ] Font size: `20px`
- [ ] Font weight: `700`
- [ ] Line height: `24px`
- [ ] Height: `24px`
- [ ] Color: `#FFFFFF`
- [ ] Text decoration: `underline`
- [ ] Margin bottom: `16px`
- [ ] Cursor: `pointer`
- [ ] Transition: `color 0.05s cubic-bezier(0.3, 0, 1)`

### "See All" Links
- [ ] Font size: `14px`
- [ ] Font weight: `700`
- [ ] Line height: `20px`
- [ ] Color: `#B3B3B3`
- [ ] Hover color: `#FFFFFF`
- [ ] Hover text decoration: `underline`
- [ ] Transition: `200ms ease-out`

### Card Components
- [ ] Width: `168px`
- [ ] Height: `220px`
- [ ] Background: `#181818`
- [ ] Border radius: `8px`
- [ ] Padding: `16px`
- [ ] Gap between cards: `16px`
- [ ] Hover transform: `scale(1.05)`
- [ ] Hover z-index: `1`
- [ ] Transition: `all 0.2s ease`

### Card Image
- [ ] Size: `168px × 168px`
- [ ] Border radius: `4px`
- [ ] Object fit: `cover`
- [ ] Margin bottom: `12px`

### Card Title
- [ ] Font size: `14px`
- [ ] Font weight: `600`
- [ ] Line height: `20px`
- [ ] Color: `#FFFFFF`
- [ ] Margin bottom: `4px`
- [ ] Truncate: `ellipsis`

### Card Description
- [ ] Font size: `13px`
- [ ] Line height: `16px`
- [ ] Color: `#B3B3B3`
- [ ] Line clamp: `2`
- [ ] Height: `32px`

### Play Button Overlay
- [ ] Position: `absolute bottom-2 right-2`
- [ ] Opacity (default): `0`
- [ ] Opacity (hover): `1`
- [ ] Transition: `opacity 200ms ease-out`
- [ ] Size: `32px × 32px` (sm)

### Horizontal Scroll
- [ ] Gap: `16px`
- [ ] Overflow: `auto`
- [ ] Scroll behavior: `smooth`
- [ ] Padding bottom: `8px`

---

## 🔍 Player Component Verification

### Container
- [ ] Height: `90px`
- [ ] Background: `#181818`
- [ ] Border top: `1px solid #282828`
- [ ] Padding: `0 16px`
- [ ] Position: `fixed bottom-0 left-0 right-0`
- [ ] z-index: `50`
- [ ] Max width: `screen-2xl` (1536px)
- [ ] Margin: `0 auto`

### Now Playing Section
- [ ] Flex basis: `30%`
- [ ] Min width: `0`
- [ ] Gap: `16px`
- [ ] Image size: `56px × 56px`
- [ ] Image border radius: `4px`
- [ ] Image background: `#282828`
- [ ] Title font size: `14px`
- [ ] Title font weight: `400`
- [ ] Title line height: `20px`
- [ ] Title color: `#FFFFFF`
- [ ] Artist font size: `13px`
- [ ] Artist line height: `16px`
- [ ] Artist color: `#B3B3B3`
- [ ] Gap between title/artist: `8px`

### Controls Section
- [ ] Flex basis: `40%`
- [ ] Max width: `722px`
- [ ] Gap: `8px` (vertical)
- [ ] Gap: `16px` (horizontal buttons)
- [ ] Button size: `32px × 32px` (shuffle/repeat)
- [ ] Button size: `20px × 20px` (skip icons)
- [ ] Button color (inactive): `#B3B3B3`
- [ ] Button color (active): `#1DB954`
- [ ] Button hover: `#FFFFFF`
- [ ] Button padding: `4px`
- [ ] Play button size: `48px × 48px`
- [ ] Play button background: `#1DB954`
- [ ] Play button hover: `scale(1.05)`

### Progress Bar
- [ ] Height: `4px`
- [ ] Background: `rgba(255,255,255,0.3)`
- [ ] Fill color: `#FFFFFF`
- [ ] Hover fill: `#1DB954`
- [ ] Hover height: `6px`
- [ ] Thumb size: `12px × 12px`
- [ ] Thumb background: `#FFFFFF`
- [ ] Thumb shadow: `lg`
- [ ] Current time font size: `12px`
- [ ] Current time color: `#B3B3B3`
- [ ] Current time width: `40px`

### Volume Section
- [ ] Flex basis: `30%`
- [ ] Justify: `flex-end`
- [ ] Gap: `16px`
- [ ] Volume control width: `125px`
- [ ] Volume bar height: `4px`
- [ ] Volume bar background: `rgba(255,255,255,0.3)`
- [ ] Volume bar fill: `#FFFFFF`
- [ ] Volume bar hover fill: `#1DB954`
- [ ] Mute button size: `20px × 20px`

---

## 🔍 Animation Verification

### Hover Transitions
- [ ] Button color: `200ms ease-out`
- [ ] Card scale: `200ms ease`
- [ ] Background color: `200ms ease-out`
- [ ] Opacity: `200ms ease-out`
- [ ] Transform: `200ms ease`

### Active States
- [ ] Background change: `200ms ease-out`
- [ ] Color change: `200ms ease-out`
- [ ] Scale change: `200ms ease-out`

### Focus States
- [ ] Outline: `2px solid #1DB954`
- [ ] Outline offset: `2px`
- [ ] Transition: `200ms ease-out`

### Disabled States
- [ ] Opacity: `0.5`
- [ ] Cursor: `not-allowed`
- [ ] Pointer events: `none`

---

## 🔍 Functional Verification

### Keyboard Shortcuts
- [ ] `Space`: Play/Pause
- [ ] `Arrow Left`: Seek backward 10s
- [ ] `Arrow Right`: Seek forward 10s
- [ ] `Shift + Arrow Left`: Previous track
- [ ] `Shift + Arrow Right`: Next track
- [ ] `Arrow Up`: Volume up
- [ ] `Arrow Down`: Volume down
- [ ] `Ctrl+K` / `Cmd+K`: Focus search
- [ ] `Ctrl+/` / `Cmd+/`: Keyboard shortcuts panel

### Scroll Behavior
- [ ] Smooth scrolling enabled
- [ ] Horizontal scroll works
- [ ] Mouse wheel horizontal scroll
- [ ] Touch swipe support
- [ ] Scroll position persistence

### Drag Interactions
- [ ] Sidebar resize drag
- [ ] Progress bar seek drag
- [ ] Volume control drag
- [ ] Queue reorder drag

### Focus Management
- [ ] Tab navigation works
- [ ] Focus visible on all interactive elements
- [ ] Focus trap in modals
- [ ] Skip to main content link

---

## 📊 Measurement Tools

### Browser DevTools
- Use element inspector for exact pixel values
- Use computed styles for final values
- Use layout panel for spacing

### Comparison Method
1. Open Spotify in browser
2. Open EmPulse in browser
3. Side-by-side comparison
4. Measure each element
5. Document differences
6. Fix to match exactly

### Verification Script
```javascript
// Run in browser console to verify measurements
const verifyComponent = (selector, expected) => {
  const el = document.querySelector(selector);
  if (!el) return { error: 'Element not found' };
  
  const computed = window.getComputedStyle(el);
  const actual = {};
  
  Object.keys(expected).forEach(prop => {
    actual[prop] = computed[prop];
  });
  
  return { expected, actual, match: JSON.stringify(expected) === JSON.stringify(actual) };
};
```

---

## ✅ Completion Criteria

A component is verified when:
- [ ] All measurements match exactly
- [ ] All colors match exactly
- [ ] All fonts match exactly
- [ ] All spacing matches exactly
- [ ] All animations match exactly
- [ ] All interactions work identically
- [ ] All states (hover, active, focus, disabled) work correctly
- [ ] Performance is smooth (60fps)
- [ ] Responsive behavior matches

---

**Status:** 🟡 In Progress  
**Next:** Start systematic verification of each component
