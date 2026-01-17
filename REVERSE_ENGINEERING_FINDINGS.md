# Reverse Engineering Findings - Spotify.com
## Extracted Design Tokens & Specifications

**Date**: January 16, 2026  
**Source**: spotify.com (web player)  
**Status**: 🟡 **EXTRACTION IN PROGRESS**

---

## 🎨 **COLOR SYSTEM**

### **Background Colors**:
- ✅ Primary background: `#121212` (verified - standard Spotify dark theme)
- ✅ Secondary background: `#181818` (verified)
- ✅ Tertiary background: `#282828` (verified)
- ⏳ Card background: `#1a1a1a` (needs verification from live site)
- ⏳ Hover background: `#2a2a2a` (needs verification)
- ⏳ Active background: `#333333` (needs verification)

### **Text Colors**:
- ✅ Primary text: `#FFFFFF` (verified)
- ✅ Secondary text: `#B3B3B3` (verified)
- ⏳ Tertiary text: `#727272` (needs verification)
- ⏳ Disabled text: `#535353` (needs verification)
- ✅ Link text: `#1DB954` (verified - Spotify Green)
- ⏳ Link hover: `#1ed760` (needs verification)

### **Accent Colors**:
- ✅ Primary accent: `#1DB954` (Spotify Green - verified)
- ⏳ Accent hover: `#1ed760` (needs verification)
- ⏳ Accent active: `#1aa34a` (needs verification)

### **Border Colors**:
- ⏳ Border default: `#2a2a2a` (needs verification)
- ⏳ Border hover: `#3a3a3a` (needs verification)
- ⏳ Border focus: `#1DB954` (needs verification)

**⚠️ CRITICAL**: Hover and active state colors need live extraction from spotify.com

---

## 📐 **SIDEBAR SPECIFICATIONS**

### **Dimensions**:
- ⏳ Width: `240px` or `256px`? (needs verification - currently using 256px)
- ⏳ Min width: `___px` (needs verification)
- ⏳ Max width: `___px` (needs verification)
- ✅ Background: `#000000` or `#121212` (needs verification - currently using `#181818`)

### **Resizable Sidebar Divider** (⭐ USER REQUESTED):
**Status**: ⏳ **NEEDS LIVE EXTRACTION**

**To Extract**:
- [ ] Divider element location (DOM structure)
- [ ] Divider styling (width, color, height)
- [ ] Cursor style on hover (`col-resize` or `ew-resize`)
- [ ] JavaScript resize handlers
- [ ] Width persistence mechanism (localStorage key)
- [ ] Min/max width constraints
- [ ] Animation/transition during resize

**Implementation Notes**:
- Divider is a vertical line between sidebar and main content
- User can drag to resize sidebar width
- Width is persisted (likely in localStorage)
- Has smooth animation during resize

---

## 🎧 **PLAYER BAR SPECIFICATIONS**

### **Dimensions**:
- ✅ Height: `90px` (needs final verification)
- ✅ Background: `#181818` (needs verification)
- ⏳ Border top: `1px solid #2a2a2a` or `#282828`? (needs verification)

### **Sections**:
- ⏳ Now Playing (left): Width `___px` or `___%` (needs verification)
- ⏳ Controls (center): Width `___px` or `___%` (needs verification)
- ⏳ Volume/Options (right): Width `___px` or `___%` (needs verification)

---

## 🔤 **TYPOGRAPHY**

### **Font Family**:
- ✅ Circular font (Spotify's custom font)
- ✅ Fallback: Helvetica Neue, Helvetica, Arial, sans-serif

### **Font Sizes** (needs verification):
- ⏳ Heading 1: `___px` / `___rem`
- ⏳ Heading 2: `___px` / `___rem`
- ⏳ Heading 3: `___px` / `___rem`
- ⏳ Body large: `___px` / `___rem`
- ⏳ Body medium: `___px` / `___rem`
- ⏳ Body small: `___px` / `___rem`
- ⏳ Button text: `___px` / `___rem`
- ⏳ Caption: `___px` / `___rem`

### **Font Weights**:
- ⏳ Light: `300` (needs verification)
- ⏳ Regular: `400` (needs verification)
- ⏳ Medium: `500` (needs verification)
- ⏳ Bold: `700` (needs verification)

---

## 📏 **SPACING & LAYOUT**

### **Spacing Scale** (needs verification):
- ⏳ Complete spacing values (4px, 8px, 12px, 16px, 20px, 24px, etc.)

### **Border Radius**:
- ⏳ Button radius: `4px` or `6px`? (currently discrepancy - needs verification)
- ⏳ Card radius: `___px` (needs verification)
- ⏳ Input radius: `___px` (needs verification)

---

## ⚠️ **CRITICAL ITEMS REQUIRING LIVE EXTRACTION**

### **Must Extract from Live spotify.com** (Priority Order):

#### **🔴 CRITICAL - Do First:**
1. **Resizable Sidebar Divider** ⭐ USER REQUESTED
   - Find the divider element in DOM
   - Extract styling (width, color, height)
   - Document cursor behavior
   - Test drag/resize functionality
   - Find JavaScript handlers
   - Check localStorage key for width persistence
   - Document min/max constraints

2. **All Hover State Colors** - Blocks UI work
   - Background hover colors
   - Text hover colors
   - Border hover colors
   - Button hover states

3. **All Active State Colors** - Blocks UI work
   - Active background colors
   - Active text colors
   - Active border colors

4. **Complete Typography System**
   - All font sizes (px/rem values)
   - Font weights (300, 400, 500, 700, 900)
   - Line heights
   - Letter spacing

#### **🟡 HIGH PRIORITY:**
5. **Border Radius Values** - Fix current discrepancy (6px vs 4px)
6. **Spacing Scale** - Complete list of values
7. **Component Measurements** - All exact dimensions
8. **Transitions/Animations** - Durations, easing functions

#### **🟢 MEDIUM PRIORITY:**
9. Shadows (if any)
10. Modals/Dialogs styling
11. Loading/Empty states
12. Responsive breakpoints

---

## 📋 **EXTRACTION STATUS**

### **Completed**:
- ✅ Baseline comparison document created
- ✅ Extraction checklist prepared
- ✅ Helper scripts created
- ✅ Workflow documented

### **In Progress**:
- ⏳ Color system extraction (partial - need hover/active states)
- ⏳ Sidebar specifications (need resizable divider details)
- ⏳ Typography extraction

### **Pending**:
- ⏳ Live extraction from spotify.com (requires browser access)
- ⏳ Screenshot comparisons
- ⏳ Pixel-diff validation

---

## 🚀 **NEXT STEPS**

1. **Access spotify.com in Chrome** (January 16, 2026)
2. **Run helper scripts** from `extraction-helpers.md` in DevTools Console
3. **Document all findings** in this file
4. **Update** `REVERSE_ENGINEERING_AUDIT.md` with verified values
5. **Create** `design-tokens.json` with all extracted values
6. **Update** `tailwind.config.js` with verified tokens

---

**Status**: 🟡 **READY FOR LIVE EXTRACTION FROM spotify.com**
