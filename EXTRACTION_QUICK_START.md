# Reverse Engineering Extraction - Quick Start Guide
## For Reverse Engineering Specialist Agent

**Date**: January 16, 2026  
**Target**: spotify.com (web player)  
**Goal**: Extract all design tokens and component specifications

---

## 🚀 **GETTING STARTED (5 MINUTES)**

### **Step 1: Setup**
1. Open Chrome/Chromium browser
2. Navigate to `https://open.spotify.com`
3. Log in (if needed for full access)
4. Open DevTools (F12 or Right-click → Inspect)

### **Step 2: Start with Sidebar (Highest Priority)**
1. Inspect the sidebar element
2. Check computed styles for:
   - Width (look for `width` in Computed tab)
   - Background color (`background-color`)
   - Padding values (`padding-left`, `padding-top`, etc.)
3. **CRITICAL**: Look for resizable divider line
   - Inspect the line between sidebar and main content
   - Check if it has drag/resize functionality
   - Document cursor style on hover

### **Step 3: Extract Colors**
1. Inspect any colored element
2. In Styles panel, click the color swatch
3. Copy exact hex code
4. Check hover/active states by:
   - Hovering over element
   - Checking Styles panel for `:hover` rule
   - Inspecting computed styles

---

## 📋 **EXTRACTION CHECKLIST (PRIORITY ORDER)**

### **🔴 CRITICAL (Do First)**

#### **1. Colors** (30 minutes)
- [ ] Primary backgrounds (`#121212`, `#181818`, `#282828`)
- [ ] Text colors (`#FFFFFF`, `#B3B3B3`)
- [ ] Accent colors (`#1DB954` - verify exact shade)
- [ ] Hover state colors
- [ ] Active state colors
- [ ] Border colors
- [ ] Disabled state colors

**Method**: Inspect multiple elements, use color picker, check hover states

#### **2. Sidebar** (45 minutes)
- [ ] Width (currently `256px` - verify)
- [ ] Background color
- [ ] All padding values
- [ ] Navigation item styling (active, hover, inactive)
- [ ] **RESIZABLE DIVIDER** (user-requested):
  - [ ] Divider line styling (width, color, height)
  - [ ] Cursor style (`col-resize` or `ew-resize`)
  - [ ] Hover behavior
  - [ ] Min/max width constraints
  - [ ] Animation during resize

**Method**: Inspect sidebar element, test resizing, check computed styles

#### **3. Typography** (30 minutes)
- [ ] Font family (Circular - verify exact name/fallback)
- [ ] Font sizes for:
  - [ ] Page titles
  - [ ] Section headings
  - [ ] Card titles
  - [ ] Body text
  - [ ] Button text
  - [ ] Captions
- [ ] Font weights (300, 400, 500, 700, 900)
- [ ] Line heights
- [ ] Letter spacing

**Method**: Inspect text elements, check computed `font-size`, `font-weight`, `line-height`

#### **4. Player Bar** (30 minutes)
- [ ] Height (currently `90px` - verify exact)
- [ ] Background color
- [ ] Border top (width, color)
- [ ] Padding values
- [ ] Section widths (left/center/right)
- [ ] Control button sizes
- [ ] Icon sizes

**Method**: Inspect player bar, measure sections, check computed dimensions

---

### **🟡 HIGH PRIORITY (Do Second)**

#### **5. Spacing** (45 minutes)
- [ ] Extract all padding values used (4px, 8px, 12px, 16px, 24px, etc.)
- [ ] Extract all margin values
- [ ] Extract all gap values
- [ ] Component-specific spacing (buttons, cards, inputs)

**Method**: Inspect multiple components, check computed `padding`, `margin`, `gap`

#### **6. Border Radius** (15 minutes)
- [ ] Button radius (currently discrepancy: 6px vs 4px)
- [ ] Card radius
- [ ] Input radius
- [ ] Modal radius
- [ ] Image radius

**Method**: Inspect elements, check computed `border-radius`

#### **7. Buttons** (30 minutes)
- [ ] Primary button (all states)
- [ ] Secondary button (all states)
- [ ] Icon buttons (all states)
- [ ] Hover effects (scale, color change)
- [ ] Active states

**Method**: Inspect buttons, test hover/active/disabled states

---

### **🟢 MEDIUM PRIORITY (Do Third)**

#### **8. Transitions & Animations** (30 minutes)
- [ ] Transition durations
- [ ] Easing functions
- [ ] Which properties animate
- [ ] Hover scale values

**Method**: Inspect elements, check `transition` property in computed styles

#### **9. Shadows** (15 minutes)
- [ ] Box shadows (cards, modals)
- [ ] Text shadows (if any)

**Method**: Inspect elevated elements, check computed `box-shadow`, `text-shadow`

#### **10. Cards** (30 minutes)
- [ ] Track cards
- [ ] Album/playlist cards
- [ ] Hover states
- [ ] Image sizes
- [ ] Text styling

**Method**: Inspect card elements, test hover states

---

## 🔧 **DEVTOOLS TIPS**

### **Quick Color Extraction:**
1. Right-click element → Inspect
2. In Styles panel, find color property
3. Click color swatch → Copy hex code
4. For hover states: Toggle `:hover` in Styles panel

### **Quick Dimension Extraction:**
1. Inspect element
2. In Computed tab, find `width`, `height`, `padding`, `margin`
3. For gaps: Check parent's `gap` property in CSS Grid/Flexbox

### **Quick Font Extraction:**
1. Inspect text element
2. In Computed tab, find:
   - `font-family`
   - `font-size`
   - `font-weight`
   - `line-height`
   - `letter-spacing`

### **Testing Hover States:**
1. Inspect element
2. In Styles panel, find `:hover` rule
3. Or manually add `:hover` in Elements panel
4. Check computed styles for changes

---

## 📝 **DOCUMENTATION FORMAT**

### **Update REVERSE_ENGINEERING_AUDIT.md:**

**When you extract a value, update like this:**

```markdown
- [x] Width: `240px` (verified January 16, 2026)
- [x] Background: `#181818` (verified January 16, 2026)
- [x] Padding: `12px 16px` (verified January 16, 2026)
```

**Add notes for special cases:**

```markdown
- [x] Divider line: `1px solid #2a2a2a`, cursor: `col-resize` on hover
  - **Note**: User can drag to resize sidebar, width stored in localStorage
```

---

## ⚡ **TIME ESTIMATES**

- **Total Extraction Time**: 6-8 hours (full-time)
- **Critical Items**: 2-3 hours
- **High Priority**: 2-3 hours
- **Medium Priority**: 2 hours

**Recommendation**: Do critical items first, then validate with visual comparison

---

## 🎯 **VALIDATION CHECKLIST**

After extraction, verify:
- [ ] All checkboxes in `REVERSE_ENGINEERING_AUDIT.md` marked complete
- [ ] All values have verification date
- [ ] Resizable sidebar divider fully documented
- [ ] No "needs verification" items remaining
- [ ] Ready to update `tailwind.config.js`

---

## 🚨 **CRITICAL ITEMS (Don't Miss)**

1. ✅ **Resizable Sidebar Divider** - User specifically requested this
2. ✅ **Color Hover States** - Currently missing, critical for UX
3. ✅ **Border Radius Fix** - Current discrepancy (6px vs 4px)
4. ✅ **Complete Typography** - Font sizes, weights, line heights

---

**Status**: 🟡 **READY TO BEGIN**  
**Start Here**: Open spotify.com → Inspect Sidebar → Begin extraction
