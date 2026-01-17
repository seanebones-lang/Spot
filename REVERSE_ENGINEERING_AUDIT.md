# Spotify.com Reverse Engineering Audit Report
## Complete Design System Extraction - January 16, 2026

**Status**: 🟡 **IN PROGRESS**  
**Auditor**: Reverse Engineering Specialist Agent  
**Target**: spotify.com (web player) - January 16, 2026  
**Objective**: Pixel-perfect replication (<1% difference target)

---

## 📋 **AUDIT SCOPE**

### Pages to Audit:
- [ ] Home/Library page
- [ ] Search page
- [ ] Playlist detail page
- [ ] Album detail page
- [ ] Artist detail page
- [ ] User profile/settings
- [ ] Player bar (bottom fixed)
- [ ] Sidebar navigation
- [ ] TopBar (search, user menu)

### Components to Extract:
- [ ] Buttons (all variants)
- [ ] Input fields (search, forms)
- [ ] Cards (track, album, playlist, artist)
- [ ] Modals/Dialogs
- [ ] Dropdowns/Menus
- [ ] Tooltips
- [ ] Progress bars
- [ ] Sliders (volume, seek)
- [ ] Context menus
- [ ] Loading states
- [ ] Empty states

---

## 🎨 **DESIGN TOKENS EXTRACTION**

### **1. COLOR SYSTEM**

#### Current Implementation (tailwind.config.js):
```javascript
'spotify-green': '#1DB954',
'spotify-black': '#000000',
'spotify-dark': '#121212',
'spotify-dark-gray': '#181818',
'spotify-light-gray': '#282828',
'spotify-text': '#FFFFFF',
'spotify-text-gray': '#B3B3B3',
```

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Background Colors**:
  - Primary background: `#121212` (verify)
  - Secondary background: `#181818` (verify)
  - Tertiary background: `#282828` (verify)
  - Card background: `#1a1a1a` (verify)
  - Hover background: `#2a2a2a` (verify)
  - Active background: `#333333` (verify)
  
- [ ] **Text Colors**:
  - Primary text: `#FFFFFF` (verify)
  - Secondary text: `#B3B3B3` (verify)
  - Tertiary text: `#727272` (verify)
  - Disabled text: `#535353` (verify)
  - Link text: `#1DB954` (verify)
  - Link hover: `#1ed760` (verify)
  
- [ ] **Accent Colors**:
  - Primary accent: `#1DB954` (Spotify Green - verify)
  - Accent hover: `#1ed760` (verify)
  - Accent active: `#1aa34a` (verify)
  - Error: `#e91429` (verify)
  - Warning: `#f59e0b` (verify)
  
- [ ] **Border Colors**:
  - Border default: `#2a2a2a` (verify)
  - Border hover: `#3a3a3a` (verify)
  - Border focus: `#1DB954` (verify)

**Verification Method**: Chrome DevTools → Computed Styles → extract all color values

---

### **2. TYPOGRAPHY SYSTEM**

#### Current Implementation:
```javascript
fontFamily: {
  'circular': ['var(--font-circular)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
}
```

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Font Families**:
  - Primary: Circular (verify exact font files/weights)
  - Fallback: Helvetica Neue, Helvetica, Arial, sans-serif (verify)
  - Font source: Verify if using Spotify's font files or web-safe fallback
  
- [ ] **Font Sizes** (extract all):
  - [ ] Heading 1 (page titles): `___px` / `___rem`
  - [ ] Heading 2 (section titles): `___px` / `___rem`
  - [ ] Heading 3 (card titles): `___px` / `___rem`
  - [ ] Body large: `___px` / `___rem`
  - [ ] Body medium: `___px` / `___rem`
  - [ ] Body small: `___px` / `___rem`
  - [ ] Caption: `___px` / `___rem`
  - [ ] Button text: `___px` / `___rem`
  
- [ ] **Font Weights**:
  - [ ] Light: `300` (verify)
  - [ ] Regular: `400` (verify)
  - [ ] Medium: `500` (verify)
  - [ ] Bold: `700` (verify)
  - [ ] Black: `900` (verify)
  
- [ ] **Line Heights**:
  - [ ] Tight: `___` (verify)
  - [ ] Normal: `___` (verify)
  - [ ] Relaxed: `___` (verify)
  
- [ ] **Letter Spacing**:
  - [ ] Normal: `___` (verify)
  - [ ] Wide: `___` (verify)

**Verification Method**: Chrome DevTools → Computed Styles → extract font-family, font-size, font-weight, line-height, letter-spacing

---

### **3. SPACING SYSTEM**

#### Current Implementation:
```javascript
spacing: {
  'player-height': '90px',
}
```

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Spacing Scale** (extract all used values):
  - [ ] `2px`, `4px`, `6px`, `8px`, `10px`, `12px`, `14px`, `16px`, `20px`, `24px`, `28px`, `32px`, `40px`, `48px`, `56px`, `64px`, `80px`, `96px`
  
- [ ] **Component Spacing**:
  - [ ] Button padding (horizontal/vertical): `___px`
  - [ ] Card padding: `___px`
  - [ ] Input padding: `___px`
  - [ ] List item spacing: `___px`
  - [ ] Section margins: `___px`
  - [ ] Container padding: `___px`
  
- [ ] **Layout Spacing**:
  - [ ] Sidebar width: `___px`
  - [ ] Sidebar item padding: `___px`
  - [ ] TopBar height: `___px`
  - [ ] Player bar height: `90px` (verify)
  - [ ] Player bar padding: `___px`
  - [ ] Grid gap: `___px`
  - [ ] Column gap: `___px`

**Verification Method**: Chrome DevTools → Computed Styles → extract padding, margin, gap values

---

### **4. BORDER RADIUS**

#### Current Implementation:
```javascript
borderRadius: {
  'spotify': '4px',
}
```

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Border Radius Values**:
  - [ ] Small (buttons, inputs): `4px` (verify)
  - [ ] Medium (cards): `8px` (verify)
  - [ ] Large (modals): `12px` (verify)
  - [ ] Pill (rounded buttons): `50%` or `9999px` (verify)
  - [ ] Circular (avatars, icons): `50%` (verify)
  
- [ ] **Component-Specific**:
  - [ ] Button radius: `___px`
  - [ ] Card radius: `___px`
  - [ ] Input radius: `___px`
  - [ ] Modal radius: `___px`
  - [ ] Image radius: `___px`

**Verification Method**: Chrome DevTools → Computed Styles → extract border-radius

---

### **5. SHADOWS**

#### Current Implementation:
- [ ] No shadows currently defined

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Box Shadows**:
  - [ ] Card shadow: `___` (verify)
  - [ ] Modal shadow: `___` (verify)
  - [ ] Dropdown shadow: `___` (verify)
  - [ ] Hover shadow: `___` (verify)
  
- [ ] **Text Shadows**:
  - [ ] Text shadow (if any): `___` (verify)

**Verification Method**: Chrome DevTools → Computed Styles → extract box-shadow, text-shadow

---

### **6. TRANSITIONS & ANIMATIONS**

#### Current Implementation (globals.css):
```css
.btn-primary {
  transition-transform;
}
.card-hover {
  transition-transform;
}
```

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Transition Durations**:
  - [ ] Fast: `___ms` (verify)
  - [ ] Normal: `___ms` (verify)
  - [ ] Slow: `___ms` (verify)
  
- [ ] **Easing Functions**:
  - [ ] Default: `ease` / `ease-in-out` / custom (verify)
  - [ ] Hover: `___` (verify)
  - [ ] Active: `___` (verify)
  
- [ ] **Animation Properties**:
  - [ ] Button hover scale: `scale(1.05)` / other (verify)
  - [ ] Card hover scale: `scale(1.05)` / other (verify)
  - [ ] Modal fade in: `___` (verify)
  - [ ] Dropdown slide: `___` (verify)
  - [ ] Loading spinner: `___` (verify)

**Verification Method**: Chrome DevTools → Computed Styles → extract transition, animation properties

---

## 🧩 **COMPONENT EXTRACTION**

### **BUTTONS**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Primary Button**:
  - [ ] Background: `#1DB954` (verify)
  - [ ] Text color: `#FFFFFF` (verify)
  - [ ] Padding: `___px ___px` (verify)
  - [ ] Border radius: `___px` (verify)
  - [ ] Font size: `___px` (verify)
  - [ ] Font weight: `___` (verify)
  - [ ] Hover state: Background `#1ed760`, scale `___` (verify)
  - [ ] Active state: Background `#1aa34a` (verify)
  - [ ] Disabled state: Background `#535353`, opacity `___` (verify)
  
- [ ] **Secondary Button**:
  - [ ] Background: `transparent` / `#181818` (verify)
  - [ ] Border: `1px solid #2a2a2a` (verify)
  - [ ] Text color: `#FFFFFF` (verify)
  - [ ] Padding: `___px ___px` (verify)
  - [ ] Hover state: Border `#3a3a3a`, background `___` (verify)
  
- [ ] **Icon Button**:
  - [ ] Size: `___px × ___px` (verify)
  - [ ] Background: `transparent` (verify)
  - [ ] Hover background: `#2a2a2a` (verify)
  - [ ] Icon size: `___px` (verify)

**Verification Method**: Inspect button elements, capture all states (default, hover, active, disabled, focused)

---

### **INPUTS**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Search Input**:
  - [ ] Background: `#2a2a2a` / `#181818` (verify)
  - [ ] Border: `___px solid #2a2a2a` (verify)
  - [ ] Border radius: `___px` (verify)
  - [ ] Padding: `___px ___px` (verify)
  - [ ] Font size: `___px` (verify)
  - [ ] Placeholder color: `#727272` (verify)
  - [ ] Focus state: Border `#1DB954` / outline `___` (verify)
  - [ ] Height: `___px` (verify)

**Verification Method**: Inspect input elements, test focus states

---

### **CARDS**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Track Card**:
  - [ ] Background: `#181818` (verify)
  - [ ] Padding: `___px` (verify)
  - [ ] Border radius: `___px` (verify)
  - [ ] Hover background: `#2a2a2a` (verify)
  - [ ] Image size: `___px × ___px` (verify)
  - [ ] Image radius: `___px` (verify)
  - [ ] Title font size: `___px` (verify)
  - [ ] Artist font size: `___px` (verify)
  - [ ] Spacing between elements: `___px` (verify)
  
- [ ] **Album/Playlist Card**:
  - [ ] Background: `#181818` (verify)
  - [ ] Image size: `___px × ___px` (verify)
  - [ ] Border radius: `___px` (verify)
  - [ ] Hover scale: `scale(1.05)` / other (verify)
  - [ ] Shadow on hover: `___` (verify)

**Verification Method**: Inspect card elements, capture hover states

---

### **PLAYER BAR**

#### Current Implementation:
- Player height: `90px` (claimed)

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Player Bar Dimensions**:
  - [ ] Height: `90px` (verify exact)
  - [ ] Background: `#181818` (verify)
  - [ ] Border top: `1px solid #2a2a2a` (verify)
  - [ ] Padding: `___px` (verify)
  
- [ ] **Now Playing Section** (left):
  - [ ] Width: `___px` / `___%` (verify)
  - [ ] Image size: `___px × ___px` (verify)
  - [ ] Text spacing: `___px` (verify)
  - [ ] Title font size: `___px` (verify)
  - [ ] Artist font size: `___px` (verify)
  
- [ ] **Controls Section** (center):
  - [ ] Width: `___px` / `___%` (verify)
  - [ ] Button size: `___px × ___px` (verify)
  - [ ] Button spacing: `___px` (verify)
  - [ ] Play button size: `___px × ___px` (verify)
  - [ ] Icon sizes: `___px` (verify)
  
- [ ] **Volume/Options Section** (right):
  - [ ] Width: `___px` / `___%` (verify)
  - [ ] Volume slider width: `___px` (verify)
  - [ ] Volume slider height: `___px` (verify)
  - [ ] Icon size: `___px` (verify)

**Verification Method**: Inspect player bar element, measure all dimensions

---

### **SIDEBAR**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Sidebar Dimensions**:
  - [ ] Width: `240px` / `___px` (verify)
  - [ ] Min width: `___px` (verify)
  - [ ] Max width: `___px` (verify)
  - [ ] Background: `#000000` / `#121212` (verify)
  - [ ] Padding: `___px` (verify)
  
- [ ] **Resizable Sidebar Feature** (CRITICAL - User Observation):
  - [ ] **Horizontal divider line** between sidebar and main content: Moves left/right
  - [ ] Divider line styling: Width `___px`, color `#2a2a2a` / `___`, height `100%` (verify)
  - [ ] Drag handle on divider: Visible on hover / always visible (verify)
  - [ ] Cursor on hover: `col-resize` / `ew-resize` (verify)
  - [ ] Resize interaction: Click and drag to resize sidebar width (verify)
  - [ ] Width persistence: Stores width in localStorage / cookie (verify)
  - [ ] Animation: Smooth transition when resizing (verify duration/easing)
  - [ ] Min/max constraints: Sidebar collapses at `___px`, expands to `___px` (verify)
  
- [ ] **Logo Section**:
  - [ ] Height: `___px` (verify)
  - [ ] Logo size: `___px × ___px` (verify)
  - [ ] Padding: `___px` (verify)
  
- [ ] **Navigation Items**:
  - [ ] Item height: `___px` (verify)
  - [ ] Item padding: `___px` (verify)
  - [ ] Icon size: `___px` (verify)
  - [ ] Text font size: `___px` (verify)
  - [ ] Active background: `#1a1a1a` (verify)
  - [ ] Hover background: `#1a1a1a` (verify)
  - [ ] Active text color: `#FFFFFF` (verify)
  - [ ] Inactive text color: `#B3B3B3` (verify)

**Verification Method**: Inspect sidebar element, test active/hover states

---

### **PROGRESS BAR / SEEK BAR**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Progress Bar**:
  - [ ] Height: `4px` / `___px` (verify)
  - [ ] Background: `#535353` (verify)
  - [ ] Progress fill: `#B3B3B3` / `#FFFFFF` (verify)
  - [ ] Hover height: `___px` (verify)
  - [ ] Thumb size (on hover): `___px × ___px` (verify)
  - [ ] Thumb color: `#FFFFFF` (verify)
  - [ ] Border radius: `___px` (verify)

**Verification Method**: Inspect progress bar, test hover interaction

---

### **VOLUME SLIDER**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Volume Slider**:
  - [ ] Width: `93px` / `___px` (verify)
  - [ ] Height: `4px` / `___px` (verify)
  - [ ] Background: `#535353` (verify)
  - [ ] Fill color: `#FFFFFF` (verify)
  - [ ] Thumb size: `___px × ___px` (verify)
  - [ ] Thumb color: `#FFFFFF` (verify)
  - [ ] Hover height: `___px` (verify)

**Verification Method**: Inspect volume slider, test interaction

---

## 📐 **LAYOUT & RESPONSIVE SYSTEM**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Breakpoints**:
  - [ ] Mobile: `___px` (verify)
  - [ ] Tablet: `___px` (verify)
  - [ ] Desktop: `___px` (verify)
  - [ ] Large desktop: `___px` (verify)
  
- [ ] **Grid System**:
  - [ ] Columns (desktop): `___` columns (verify)
  - [ ] Gutter width: `___px` (verify)
  - [ ] Container max-width: `___px` (verify)
  - [ ] Container padding: `___px` (verify)
  
- [ ] **Responsive Behavior**:
  - [ ] Sidebar collapse at: `___px` (verify)
  - [ ] Player bar behavior on mobile: `___` (verify)
  - [ ] Card grid columns: Mobile `___`, Tablet `___`, Desktop `___` (verify)

**Verification Method**: Test at various viewport widths, inspect layout changes

---

## 🎭 **INTERACTION STATES**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Hover States** (all interactive elements):
  - [ ] Background color changes: `___` (verify)
  - [ ] Text color changes: `___` (verify)
  - [ ] Scale transforms: `___` (verify)
  - [ ] Opacity changes: `___` (verify)
  - [ ] Border changes: `___` (verify)
  
- [ ] **Active States**:
  - [ ] Background: `___` (verify)
  - [ ] Scale: `___` (verify)
  
- [ ] **Focus States**:
  - [ ] Outline: `___` (verify)
  - [ ] Border: `___` (verify)
  
- [ ] **Selected/Active Navigation**:
  - [ ] Background: `#1a1a1a` (verify)
  - [ ] Text color: `#FFFFFF` (verify)
  - [ ] Icon color: `#FFFFFF` (verify)

**Verification Method**: Test all interactive elements, capture states

---

## 📊 **LOADING & EMPTY STATES**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Loading Spinner**:
  - [ ] Size: `___px × ___px` (verify)
  - [ ] Color: `#1DB954` / `#FFFFFF` (verify)
  - [ ] Animation: `___` (verify)
  
- [ ] **Skeleton Loaders**:
  - [ ] Background: `#2a2a2a` (verify)
  - [ ] Animation: `___` (verify)
  - [ ] Border radius: `___px` (verify)
  
- [ ] **Empty States**:
  - [ ] Icon size: `___px` (verify)
  - [ ] Text color: `#B3B3B3` (verify)
  - [ ] CTA button styling: `___` (verify)

**Verification Method**: Trigger loading states, inspect skeleton elements

---

## 🎨 **MODALS & DIALOGS**

#### Spotify.com Extraction (January 16, 2026) - TODO:
- [ ] **Modal**:
  - [ ] Background overlay: `rgba(0, 0, 0, 0.8)` / `___` (verify)
  - [ ] Modal background: `#282828` / `#181818` (verify)
  - [ ] Border radius: `___px` (verify)
  - [ ] Padding: `___px` (verify)
  - [ ] Max width: `___px` (verify)
  - [ ] Animation: Fade in / Slide up / `___` (verify)
  - [ ] Shadow: `___` (verify)

**Verification Method**: Trigger modals, inspect styling

---

## ✅ **VALIDATION CHECKLIST**

### **Visual Comparison**:
- [ ] Screenshot Home page (Spotify vs EmPulse)
- [ ] Screenshot Playlist page (Spotify vs EmPulse)
- [ ] Screenshot Player bar (Spotify vs EmPulse)
- [ ] Screenshot Sidebar (Spotify vs EmPulse)
- [ ] Pixel-diff analysis (<1% difference target)

### **Design Token Validation**:
- [ ] All colors extracted and verified
- [ ] All typography values extracted and verified
- [ ] All spacing values extracted and verified
- [ ] All border radius values extracted and verified
- [ ] All shadows extracted and verified
- [ ] All transitions extracted and verified

### **Component Validation**:
- [ ] All buttons match (all states)
- [ ] All inputs match (all states)
- [ ] All cards match (all states)
- [ ] Player bar matches (exact dimensions)
- [ ] Sidebar matches (exact dimensions)
- [ ] All modals match

---

## 📝 **DELIVERABLES**

### **1. Updated tailwind.config.js**
- [ ] Complete color system
- [ ] Complete typography system
- [ ] Complete spacing system
- [ ] Complete border radius system
- [ ] Complete shadow system
- [ ] Complete animation/transition system

### **2. design-tokens.json**
- [ ] W3C standard format
- [ ] All extracted tokens
- [ ] Organized by category

### **3. Component Specification Document**
- [ ] All component measurements
- [ ] All state variations
- [ ] Component mapping (Spotify → EmPulse)

### **4. Pixel-Perfect Validation Report**
- [ ] Screenshot comparisons
- [ ] Pixel-diff analysis
- [ ] Discrepancy list
- [ ] Fix recommendations

---

## 🚀 **NEXT STEPS**

1. **Access spotify.com** (January 16, 2026)
2. **Begin systematic extraction** (use this checklist)
3. **Document all findings** in this file
4. **Update tailwind.config.js** with verified values
5. **Create design-tokens.json**
6. **Run visual comparisons**
7. **Generate validation report**
8. **Handoff to Orchestrator** → Assign best agents for each implementation task

---

## 🎯 **POST-AUDIT: ORCHESTRATOR ASSIGNMENTS**

### **After Audit Completion, Orchestrator Must:**

1. **Review Complete Audit Report**
   - Verify all design tokens extracted
   - Confirm all components documented
   - Validate pixel-perfect specifications

2. **Assign Best Agents for Each Implementation Task:**

   **Sidebar Resizable Feature (NEW)**:
   - **Agent**: Front-End Specialist + UX Specialist
   - **Task**: Implement resizable sidebar with horizontal divider line
   - **Specification**: Divider moves left/right, stores width, smooth animation
   - **Priority**: 🔴 CRITICAL (user-requested feature)

   **Design Token Implementation**:
   - **Agent**: Front-End Specialist
   - **Task**: Update `tailwind.config.js` with all verified tokens
   - **Priority**: 🔴 CRITICAL (blocks all UI work)

   **Component Implementation**:
   - **Agent**: Front-End Specialist
   - **Task**: Update all components to match extracted specifications
   - **Priority**: 🔴 CRITICAL

   **Pixel-Perfect Validation**:
   - **Agent**: Reverse Engineering Specialist (final validation)
   - **Task**: Run screenshot comparisons, verify <1% difference
   - **Priority**: 🔴 CRITICAL (before launch)

3. **Update Master Todo List** with agent assignments
4. **Unblock all paused agents** once audit deliverables complete

---

**Status**: 🟡 **AUDIT IN PROGRESS**  
**Last Updated**: January 16, 2026  
**Next Update**: After systematic extraction complete
