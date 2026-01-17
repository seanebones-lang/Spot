# Spotify Logo Dimensions - Exact Specifications

## 🎯 Official Minimum Dimensions (Spotify Brand Guidelines)

### Digital Applications:
- **Full Logo (Icon + Wordmark)**: Minimum **70px wide**
- **Icon Only (Round with sound waves)**: Minimum **21px wide**

---

## 📐 Actual Dimensions Used on Spotify Web Player

### **Sidebar Logo** (Left Navigation):
- **Height**: ~32px (matches sidebar padding)
- **Width**: Variable based on text width (~140-180px when text visible)
- **Icon Size**: 24px × 24px (when collapsed shows icon only)
- **Padding**: 24px (p-6) on all sides
- **Font Size**: 20px (text-xl) for "Spotify" wordmark

### **TopBar Logo** (Header - if present):
- **Height**: 24px - 32px
- **Width**: Variable (~120-160px)
- Typically only shows on mobile or certain pages

### **Favicon**:
- **16px × 16px** (browser tab)
- **32px × 32px** (high-DPI displays)
- **192px × 192px** (web app manifest)
- **512px × 512px** (PWA icons)

### **Footer Logo** (if present):
- **Height**: 24px - 32px
- **Width**: Variable

---

## 🎨 Recommended Dimensions for EmPulse Logo

Based on Spotify's usage patterns, here are the recommended sizes:

### **Primary Logo (Sidebar)**:
- **Full Logo (Icon + "EmPulse Music")**: 
  - **Height**: 32px
  - **Width**: ~180px (or scalable)
  - **Icon**: 24px × 24px square
  - **Clear Space**: 8px minimum around logo

### **Icon Only (Collapsed Sidebar)**:
- **Size**: 24px × 24px
- **Clear Space**: 4px minimum

### **TopBar Logo** (if needed):
- **Height**: 28px
- **Width**: ~150px (scalable)

### **Favicon**:
- **16px × 16px** (primary)
- **32px × 32px** (@2x)
- **192px × 192px** (PWA)
- **512px × 512px** (PWA)

---

## 📏 SVG/Vector Recommendations

**Best Practice**: Create your logo as SVG (vector) for:
- ✅ Scalability at any size
- ✅ Crisp rendering at all resolutions
- ✅ Smaller file size
- ✅ Easy color changes (for themes)

**Dimensions to create**:
1. **Full Logo SVG**: 180px × 32px (viewBox)
2. **Icon Only SVG**: 24px × 24px (viewBox)
3. **Favicon PNG**: 16px, 32px, 192px, 512px

---

## 🔍 Current Implementation Notes

Currently in codebase:
- Sidebar logo uses text only: `text-xl` (20px font size)
- No logo image currently loaded
- Favicon: `empulseheart.png` (needs verification of size)

---

## ✅ Action Items

1. Create EmPulse logo at **180px × 32px** (full) and **24px × 24px** (icon)
2. Export as SVG (preferred) or PNG at 2x/3x resolution
3. Update `components/Sidebar.tsx` to use logo image
4. Update favicon sizes in `app/layout.tsx`
5. Add logo to TopBar if needed

---

**Reference**: Based on Spotify brand guidelines and reverse-engineered from web player interface.
