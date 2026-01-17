# Reverse Engineering Extraction - Helper Scripts & Commands
## DevTools Commands for Spotify.com Extraction

**Date**: January 16, 2026  
**Purpose**: Quick copy-paste commands for Chrome DevTools console

---

## 🎨 **COLOR EXTRACTION**

### **Extract All Background Colors:**
```javascript
// Run in DevTools Console on spotify.com
const elements = document.querySelectorAll('*');
const backgrounds = new Set();
elements.forEach(el => {
  const bg = window.getComputedStyle(el).backgroundColor;
  if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
    backgrounds.add(bg);
  }
});
console.log('Background Colors:', Array.from(backgrounds).sort());
```

### **Extract All Text Colors:**
```javascript
const elements = document.querySelectorAll('*');
const textColors = new Set();
elements.forEach(el => {
  const color = window.getComputedStyle(el).color;
  if (color) textColors.add(color);
});
console.log('Text Colors:', Array.from(textColors).sort());
```

### **Extract Hover State Colors:**
```javascript
// Hover over element, then run:
const hovered = document.querySelector(':hover');
if (hovered) {
  const bg = window.getComputedStyle(hovered).backgroundColor;
  const color = window.getComputedStyle(hovered).color;
  console.log('Hovered Element:', hovered, 'BG:', bg, 'Text:', color);
}
```

---

## 📐 **DIMENSION EXTRACTION**

### **Extract Sidebar Dimensions:**
```javascript
const sidebar = document.querySelector('[class*="sidebar"], [class*="Sidebar"], [data-testid*="sidebar"]');
if (sidebar) {
  const styles = window.getComputedStyle(sidebar);
  console.log({
    width: styles.width,
    minWidth: styles.minWidth,
    maxWidth: styles.maxWidth,
    padding: styles.padding,
    backgroundColor: styles.backgroundColor,
  });
}
```

### **Extract Player Bar Dimensions:**
```javascript
const player = document.querySelector('[class*="player"], [class*="Player"], [data-testid*="player"]');
if (player) {
  const styles = window.getComputedStyle(player);
  console.log({
    height: styles.height,
    backgroundColor: styles.backgroundColor,
    borderTop: styles.borderTop,
    padding: styles.padding,
  });
}
```

### **Extract Divider Line (Resizable Sidebar):**
```javascript
// Find divider between sidebar and main content
const mainContainer = document.querySelector('main, [class*="main"], [class*="Main"]');
const sidebar = document.querySelector('[class*="sidebar"], [class*="Sidebar"]');
if (mainContainer && sidebar) {
  const sidebarRect = sidebar.getBoundingClientRect();
  const mainRect = mainContainer.getBoundingClientRect();
  const dividerX = sidebarRect.right;
  console.log('Divider position:', dividerX);
  
  // Check for resize handle
  const resizeHandle = document.elementFromPoint(dividerX, window.innerHeight / 2);
  if (resizeHandle) {
    const styles = window.getComputedStyle(resizeHandle);
    console.log('Resize Handle:', {
      width: styles.width,
      cursor: styles.cursor,
      backgroundColor: styles.backgroundColor,
    });
  }
}
```

---

## 🔤 **TYPOGRAPHY EXTRACTION**

### **Extract All Font Sizes:**
```javascript
const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, button, a');
const fontSizes = new Set();
elements.forEach(el => {
  const size = window.getComputedStyle(el).fontSize;
  fontSizes.add(size);
});
console.log('Font Sizes:', Array.from(fontSizes).sort());
```

### **Extract Font Family:**
```javascript
const body = document.body;
const fontFamily = window.getComputedStyle(body).fontFamily;
console.log('Font Family:', fontFamily);
```

### **Extract Typography for Specific Elements:**
```javascript
function extractTypography(selector) {
  const el = document.querySelector(selector);
  if (el) {
    const styles = window.getComputedStyle(el);
    return {
      fontFamily: styles.fontFamily,
      fontSize: styles.fontSize,
      fontWeight: styles.fontWeight,
      lineHeight: styles.lineHeight,
      letterSpacing: styles.letterSpacing,
    };
  }
}

console.log('H1:', extractTypography('h1'));
console.log('H2:', extractTypography('h2'));
console.log('Body:', extractTypography('p'));
console.log('Button:', extractTypography('button'));
```

---

## 📏 **SPACING EXTRACTION**

### **Extract All Padding Values:**
```javascript
const elements = document.querySelectorAll('*');
const paddings = new Set();
elements.forEach(el => {
  const padding = window.getComputedStyle(el).padding;
  if (padding && padding !== '0px') paddings.add(padding);
});
console.log('Padding Values:', Array.from(paddings).sort());
```

### **Extract All Margin Values:**
```javascript
const elements = document.querySelectorAll('*');
const margins = new Set();
elements.forEach(el => {
  const margin = window.getComputedStyle(el).margin;
  if (margin && margin !== '0px') margins.add(margin);
});
console.log('Margin Values:', Array.from(margins).sort());
```

---

## 🎭 **HOVER/ACTIVE STATE EXTRACTION**

### **Extract Hover State Styles:**
```javascript
// 1. Hover over element manually
// 2. Run this:
const hovered = document.querySelector(':hover');
if (hovered) {
  const styles = window.getComputedStyle(hovered);
  const stylesheet = Array.from(document.styleSheets)
    .find(sheet => {
      try {
        return Array.from(sheet.cssRules).some(rule => 
          rule.selectorText && hovered.matches(rule.selectorText)
        );
      } catch(e) { return false; }
    });
  console.log('Hovered Element Styles:', {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    transform: styles.transform,
    boxShadow: styles.boxShadow,
  });
}
```

---

## 🔍 **FIND RESIZABLE DIVIDER**

### **Check for Resizable Sidebar:**
```javascript
// Check for resize handle or divider
const allElements = document.querySelectorAll('*');
const resizeElements = [];
allElements.forEach(el => {
  const styles = window.getComputedStyle(el);
  const cursor = styles.cursor;
  if (cursor === 'col-resize' || cursor === 'ew-resize' || cursor === 'resize') {
    resizeElements.push({
      element: el,
      cursor: cursor,
      position: el.getBoundingClientRect(),
      classes: el.className,
    });
  }
});
console.log('Resize Handles Found:', resizeElements);

// Check for resize event listeners
const resizeListeners = [];
allElements.forEach(el => {
  const listeners = getEventListeners(el);
  if (listeners && (listeners.mousedown || listeners.mousemove || listeners.resize)) {
    resizeListeners.push({
      element: el,
      listeners: listeners,
    });
  }
});
console.log('Resize Event Listeners:', resizeListeners);
```

### **Check localStorage for Sidebar Width:**
```javascript
// Check localStorage for sidebar width persistence
Object.keys(localStorage).forEach(key => {
  if (key.toLowerCase().includes('sidebar') || key.toLowerCase().includes('width')) {
    console.log('Sidebar-related localStorage:', key, localStorage.getItem(key));
  }
});

// Check sessionStorage too
Object.keys(sessionStorage).forEach(key => {
  if (key.toLowerCase().includes('sidebar') || key.toLowerCase().includes('width')) {
    console.log('Sidebar-related sessionStorage:', key, sessionStorage.getItem(key));
  }
});
```

---

## 📊 **EXPORT ALL COMPUTED STYLES**

### **Extract Complete Style Data:**
```javascript
function extractAllStyles(selector) {
  const el = document.querySelector(selector);
  if (!el) return null;
  
  const styles = window.getComputedStyle(el);
  const allStyles = {};
  for (let i = 0; i < styles.length; i++) {
    const prop = styles[i];
    allStyles[prop] = styles.getPropertyValue(prop);
  }
  return allStyles;
}

// Usage:
console.log('Sidebar Styles:', extractAllStyles('[class*="sidebar"]'));
console.log('Player Styles:', extractAllStyles('[class*="player"]'));
```

---

## 📸 **SCREENSHOT COMPARISON**

### **Take Screenshot (Chrome DevTools):**
1. Open DevTools (F12)
2. Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows)
3. Type "screenshot"
4. Select "Capture node screenshot" or "Capture full size screenshot"

### **Pixel Diff Script (Run After Screenshots):**
```bash
# Using ImageMagick (install first: brew install imagemagick)
compare -metric AE spotify_screenshot.png empulse_screenshot.png diff.png
```

---

## 🎯 **QUICK EXTRACTION CHECKLIST**

### **Run These in Order:**
1. ✅ Extract background colors
2. ✅ Extract text colors
3. ✅ Extract sidebar dimensions
4. ✅ Find resizable divider
5. ✅ Extract player bar dimensions
6. ✅ Extract typography
7. ✅ Extract spacing
8. ✅ Extract hover/active states

---

**Copy-paste these commands into Chrome DevTools Console on spotify.com**
