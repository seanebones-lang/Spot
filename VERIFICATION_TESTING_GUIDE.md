# Spotify UI Verification - Testing Guide
**Date:** January 14, 2026  
**Purpose:** Manual testing checklist for verifying UI fixes

---

## 🧪 Testing Checklist

### 1. Sidebar Verification

#### Navigation Icons
- [ ] **Home icon** - Click navigates to `/`
- [ ] **Search icon** - Click navigates to `/search`
- [ ] **Library icon** - Click navigates to `/collection`
- [ ] **Mood icon** - Click navigates to `/mood`
- [ ] **Radio icon** - Click navigates to `/radio`
- [ ] **No text labels visible** - Only icons shown
- [ ] **Hover tooltips** - Shows label text on hover (accessibility)

#### Logo
- [ ] **Music icon** - White icon displayed (not text)
- [ ] **Size** - 32px x 32px
- [ ] **Clickable** - Navigates to home page

#### Layout
- [ ] **Compact spacing** - 12px padding on nav items
- [ ] **Icon size** - 24px x 24px for navigation icons
- [ ] **Active state** - Highlighted with background color
- [ ] **Hover state** - Smooth color transition

#### Custom Sections (EmPulse Features)
- [ ] **Mental Health Hub** - Visible when sidebar width > 100px
- [ ] **Daily Check-in** - Visible when sidebar width > 100px
- [ ] **Playlists section** - Scrollable list of playlists
- [ ] **Resize functionality** - Sidebar resizes smoothly (200px min, 50% max)

---

### 2. TopBar Verification

#### Layout
- [ ] **Logo** - Left side, 113px x 24px
- [ ] **Back/Forward buttons** - Functional navigation
- [ ] **Search bar** - Centered, "What do you want to play?" placeholder
- [ ] **Right side** - Premium, Downloads, Notifications, Settings, Keyboard Shortcuts, Right Sidebar Toggle, User Menu

#### Removed Elements (Should NOT be present)
- [ ] ❌ **No duplicate nav links** (Home/Search/Library)
- [ ] ❌ **No Points counter badge**
- [ ] ❌ **No Streak badge**
- [ ] ❌ **No Affirmations button**

#### Interactions
- [ ] **Search focus** - Ctrl+K (Cmd+K) focuses search
- [ ] **Search dropdown** - Fades in smoothly on focus
- [ ] **Keyboard shortcuts** - Ctrl+/ (Cmd+/) opens shortcuts panel
- [ ] **Hover states** - All buttons show hover effects

---

### 3. Player Bar Verification

#### Left Section (Now Playing)
- [ ] **Album art** - Square 56px x 56px image
- [ ] **Track title** - White text, 14px, truncated if long
- [ ] **Artist name** - Gray text, 13px, truncated if long
- [ ] **No custom badges** - No Quality/Mood/Standard badges

#### Center Section (Controls)
- [ ] **Shuffle button** - 16px icon, purple when active
- [ ] **Previous button** - 20px icon
- [ ] **Play/Pause button** - Circular, smooth scale animation
- [ ] **Next button** - 20px icon
- [ ] **Repeat button** - 16px icon, purple when active
- [ ] **Progress bar** - Smooth dragging, optimized transitions

#### Right Section (Extras)
- [ ] **Queue button** - Opens queue panel
- [ ] **Full screen button** - Opens full screen player
- [ ] **Volume control** - Functional slider
- [ ] **No QualitySelector** - Should NOT be present

#### Removed Elements (Should NOT be present)
- [ ] ❌ **No AudioQualityBadge** (Standard/Lossless/HiFi)
- [ ] ❌ **No MoodWidget** (Mood: Melancholic)
- [ ] ❌ **No QualitySelector dropdown**

---

### 4. Home Page Verification

#### Layout
- [ ] **No Wellness Dashboard widget** - Should NOT be present at top
- [ ] **Recently Played section** - Grid of track cards
- [ ] **Made for You section** - Horizontal scrollable playlists
- [ ] **Trending Songs** - Horizontal scrollable tracks
- [ ] **Popular Artists** - Horizontal scrollable artist cards
- [ ] **Clean grid layout** - No breaking widgets

#### Card Interactions
- [ ] **Hover effect** - Cards scale to 1.05x with smooth transition
- [ ] **Play button** - Appears on hover (bottom-right of image)
- [ ] **Smooth animations** - Uses `cubic-bezier(0.3, 0, 0.1, 1)`
- [ ] **Click to play** - Cards play tracks on click

---

### 5. Animation & Transition Verification

#### Hover Transitions
- [ ] **Card hovers** - Smooth scale with `cubic-bezier(0.3, 0, 0.1, 1)`
- [ ] **Button hovers** - Color transitions smooth
- [ ] **Icon hovers** - Color changes smooth

#### Loading States
- [ ] **Search dropdown** - Fades in with translateY animation
- [ ] **Modal** - Fades in with scale animation
- [ ] **Context menu** - Smooth fade-in

#### Interactions
- [ ] **Progress bar drag** - No stutter, 60fps smooth
- [ ] **Sidebar resize** - Smooth during drag
- [ ] **Scroll** - Smooth momentum scrolling

---

### 6. Responsive & Edge Cases

#### Breakpoints
- [ ] **Narrow sidebar** - Icons remain visible and functional
- [ ] **Wide sidebar** - Layout maintains proportions
- [ ] **Mobile view** - Verify responsive behavior

#### Edge Cases
- [ ] **Empty states** - No track selected, empty playlists
- [ ] **Long text** - Track/artist names truncate properly
- [ ] **Rapid clicks** - No animation stutter
- [ ] **Keyboard navigation** - Tab order logical

---

### 7. Accessibility Verification

#### Keyboard
- [ ] **Tab navigation** - All interactive elements accessible
- [ ] **Ctrl+K** - Focuses search
- [ ] **Ctrl+/** - Opens shortcuts panel
- [ ] **ESC** - Closes modals/dropdowns

#### Screen Readers
- [ ] **Icon buttons** - Have `aria-label` attributes
- [ ] **Navigation links** - Have `title` attributes
- [ ] **Interactive elements** - Proper ARIA roles

#### Visual
- [ ] **Color contrast** - Text readable on backgrounds
- [ ] **Focus indicators** - Visible on keyboard navigation
- [ ] **Tooltips** - Appear on hover for icon-only elements

---

## 🐛 Common Issues to Watch For

### ❌ Issues That Should NOT Exist

1. **Text labels in sidebar navigation** - Should be icon-only
2. **Points/Streak/Affirmations badges in top bar** - Should be removed
3. **Quality/Mood badges in player** - Should be removed
4. **Wellness dashboard widget on home page** - Should be removed
5. **Janky animations** - All should be smooth 60fps
6. **Missing tooltips** - Icon-only elements should have tooltips
7. **Broken hover states** - All should work smoothly

---

## ✅ Verification Results Template

```
Date: ___________
Tester: ___________

Sidebar: [ ] Pass [ ] Fail
TopBar: [ ] Pass [ ] Fail  
Player: [ ] Pass [ ] Fail
Home Page: [ ] Pass [ ] Fail
Animations: [ ] Pass [ ] Fail
Accessibility: [ ] Pass [ ] Fail

Issues Found:
1. 
2. 
3. 

Overall Status: [ ] Ready [ ] Needs Fixes
```

---

## 🎯 Success Criteria

**✅ All checks pass = Ready for Production**

If any critical check fails, document the issue and fix before deployment.

---

*Testing Guide - SpotifyUIVerifier Agent*  
*Date: January 14, 2026*
