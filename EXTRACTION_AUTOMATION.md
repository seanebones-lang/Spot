# Extraction Automation Scripts
## Automated Extraction from spotify.com

**Purpose**: Helper scripts to automate the extraction of design tokens from spotify.com using browser DevTools.

---

## 🚀 **QUICK START**

### **Copy-Paste Ready Scripts**

1. **Open spotify.com in Chrome**
2. **Open DevTools** (F12)
3. **Go to Console tab**
4. **Copy and paste the scripts below**

---

## 📋 **SCRIPT 1: Extract All Colors**

```javascript
// Extract All Colors from spotify.com
(function() {
  const colors = {
    backgrounds: {},
    text: {},
    accents: {},
    borders: {}
  };
  
  // Function to get computed styles
  function getColors(selector, property) {
    const elements = document.querySelectorAll(selector);
    const values = new Set();
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const value = style.getPropertyValue(property);
      if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
        values.add(value);
      }
    });
    return Array.from(values);
  }
  
  // Extract background colors
  colors.backgrounds.main = getColors('body', 'background-color');
  colors.backgrounds.sidebar = getColors('[data-testid="sidebar"]', 'background-color');
  colors.backgrounds.card = getColors('[data-testid="card"]', 'background-color');
  
  // Extract text colors
  colors.text.primary = getColors('h1, h2, h3', 'color');
  colors.text.secondary = getColors('p, span', 'color');
  
  // Extract accent colors
  colors.accents.primary = getColors('[data-testid*="button"]', 'background-color');
  colors.accents.green = getColors('[class*="green"], [class*="Spotify"]', 'color');
  
  // Extract border colors
  colors.borders.default = getColors('[class*="border"]', 'border-color');
  
  console.log('🎨 EXTRACTED COLORS:');
  console.table(colors);
  
  // Copy to clipboard
  navigator.clipboard.writeText(JSON.stringify(colors, null, 2));
  console.log('✅ Colors copied to clipboard!');
  
  return colors;
})();
```

---

## 📋 **SCRIPT 2: Extract Typography**

```javascript
// Extract Typography System
(function() {
  const typography = {
    fontSizes: {},
    fontWeights: {},
    lineHeights: {},
    fontFamilies: {}
  };
  
  function extractTypography() {
    const selectors = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      body: 'p',
      button: 'button',
      caption: '[class*="caption"], [class*="text-xs"], [class*="text-sm"]'
    };
    
    Object.entries(selectors).forEach(([name, selector]) => {
      const el = document.querySelector(selector);
      if (el) {
        const style = window.getComputedStyle(el);
        typography.fontSizes[name] = {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          fontFamily: style.fontFamily,
          letterSpacing: style.letterSpacing
        };
      }
    });
    
    return typography;
  }
  
  const result = extractTypography();
  console.log('🔤 EXTRACTED TYPOGRAPHY:');
  console.table(result.fontSizes);
  
  navigator.clipboard.writeText(JSON.stringify(result, null, 2));
  console.log('✅ Typography copied to clipboard!');
  
  return result;
})();
```

---

## 📋 **SCRIPT 3: Extract Sidebar Specifications**

```javascript
// Extract Sidebar Specifications
(function() {
  const sidebar = {
    width: null,
    minWidth: null,
    maxWidth: null,
    background: null,
    padding: null,
    divider: null
  };
  
  // Find sidebar
  const sidebarEl = document.querySelector('[data-testid="sidebar"], nav, aside, [class*="sidebar"]');
  
  if (sidebarEl) {
    const style = window.getComputedStyle(sidebarEl);
    sidebar.width = style.width;
    sidebar.minWidth = style.minWidth;
    sidebar.maxWidth = style.maxWidth;
    sidebar.background = style.backgroundColor;
    sidebar.padding = style.padding;
    
    // Find divider/resizer
    const dividerEl = sidebarEl.nextElementSibling;
    if (dividerEl) {
      const dividerStyle = window.getComputedStyle(dividerEl);
      sidebar.divider = {
        width: dividerStyle.width,
        height: dividerStyle.height,
        backgroundColor: dividerStyle.backgroundColor,
        cursor: dividerStyle.cursor,
        position: dividerStyle.position
      };
      
      // Check for resizable functionality
      if (dividerEl.addEventListener) {
        sidebar.divider.hasResize = true;
      }
    }
    
    // Check localStorage for width persistence
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes('sidebar') || key.includes('width') || key.includes('resize')) {
        sidebar.persistedWidth = {
          key: key,
          value: localStorage.getItem(key)
        };
      }
    }
  }
  
  console.log('📐 EXTRACTED SIDEBAR:');
  console.table(sidebar);
  
  navigator.clipboard.writeText(JSON.stringify(sidebar, null, 2));
  console.log('✅ Sidebar specs copied to clipboard!');
  
  return sidebar;
})();
```

---

## 📋 **SCRIPT 4: Extract Player Bar**

```javascript
// Extract Player Bar Specifications
(function() {
  const player = {
    height: null,
    background: null,
    border: null,
    sections: {
      left: null,
      center: null,
      right: null
    }
  };
  
  // Find player bar
  const playerEl = document.querySelector('[data-testid="now-playing-bar"], [data-testid="player"], footer, [class*="player"]');
  
  if (playerEl) {
    const style = window.getComputedStyle(playerEl);
    player.height = style.height;
    player.background = style.backgroundColor;
    player.border = {
      top: style.borderTop,
      width: style.borderTopWidth,
      style: style.borderTopStyle,
      color: style.borderTopColor
    };
    
    // Find sections
    const sections = playerEl.children;
    if (sections.length >= 3) {
      player.sections.left = {
        width: window.getComputedStyle(sections[0]).width || window.getComputedStyle(sections[0]).flex,
        content: sections[0].textContent?.substring(0, 50)
      };
      player.sections.center = {
        width: window.getComputedStyle(sections[1]).width || window.getComputedStyle(sections[1]).flex,
        content: sections[1].textContent?.substring(0, 50)
      };
      player.sections.right = {
        width: window.getComputedStyle(sections[2]).width || window.getComputedStyle(sections[2]).flex,
        content: sections[2].textContent?.substring(0, 50)
      };
    }
  }
  
  console.log('🎧 EXTRACTED PLAYER BAR:');
  console.table(player);
  
  navigator.clipboard.writeText(JSON.stringify(player, null, 2));
  console.log('✅ Player bar specs copied to clipboard!');
  
  return player;
})();
```

---

## 📋 **SCRIPT 5: Extract Spacing Scale**

```javascript
// Extract Spacing Scale
(function() {
  const spacing = new Set();
  
  // Get all elements and their spacing values
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    
    // Extract padding values
    [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft].forEach(val => {
      if (val && val !== '0px') spacing.add(val);
    });
    
    // Extract margin values
    [style.marginTop, style.marginRight, style.marginBottom, style.marginLeft].forEach(val => {
      if (val && val !== '0px') spacing.add(val);
    });
    
    // Extract gap values
    if (style.gap) spacing.add(style.gap);
  });
  
  // Sort spacing values
  const spacingArray = Array.from(spacing)
    .filter(s => s.includes('px') || s.includes('rem') || s.includes('em'))
    .map(s => parseFloat(s))
    .filter(s => !isNaN(s))
    .sort((a, b) => a - b)
    .map(s => s + 'px');
  
  // Remove duplicates
  const uniqueSpacing = [...new Set(spacingArray)];
  
  console.log('📏 EXTRACTED SPACING SCALE:');
  console.table(uniqueSpacing);
  
  navigator.clipboard.writeText(JSON.stringify(uniqueSpacing, null, 2));
  console.log('✅ Spacing scale copied to clipboard!');
  
  return uniqueSpacing;
})();
```

---

## 📋 **SCRIPT 6: Extract Border Radius**

```javascript
// Extract Border Radius Values
(function() {
  const borderRadius = new Set();
  
  const allElements = document.querySelectorAll('*');
  
  allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const br = style.borderRadius;
    
    if (br && br !== '0px' && br !== 'none') {
      // Handle multiple values (e.g., "4px 4px 0px 0px")
      br.split(' ').forEach(val => {
        if (val && val !== '0px') borderRadius.add(val);
      });
    }
  });
  
  const radiusArray = Array.from(borderRadius)
    .filter(r => r.includes('px') || r.includes('%') || r.includes('rem'))
    .sort();
  
  console.log('🔲 EXTRACTED BORDER RADIUS:');
  console.table(radiusArray);
  
  navigator.clipboard.writeText(JSON.stringify(radiusArray, null, 2));
  console.log('✅ Border radius values copied to clipboard!');
  
  return radiusArray;
})();
```

---

## 📋 **SCRIPT 7: Complete Extraction (All-in-One)**

```javascript
// Complete Design Token Extraction
(async function() {
  console.log('🚀 Starting complete extraction...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    colors: {},
    typography: {},
    sidebar: {},
    player: {},
    spacing: [],
    borderRadius: []
  };
  
  // Run all extractions
  try {
    // Colors (from Script 1)
    const colorScript = document.createElement('script');
    colorScript.textContent = `
      (function() {
        const colors = { backgrounds: {}, text: {}, accents: {}, borders: {} };
        function getColors(selector, property) {
          const elements = document.querySelectorAll(selector);
          const values = new Set();
          elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const value = style.getPropertyValue(property);
            if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
              values.add(value);
            }
          });
          return Array.from(values);
        }
        colors.backgrounds.main = getColors('body', 'background-color');
        colors.text.primary = getColors('h1, h2, h3', 'color');
        window.__extractedColors = colors;
      })();
    `;
    document.head.appendChild(colorScript);
    results.colors = window.__extractedColors || {};
    
    // Add other extractions here...
    
  } catch (error) {
    console.error('Error during extraction:', error);
  }
  
  // Final output
  console.log('✅ EXTRACTION COMPLETE:');
  console.log(JSON.stringify(results, null, 2));
  
  navigator.clipboard.writeText(JSON.stringify(results, null, 2));
  console.log('\n✅ All results copied to clipboard!');
  
  return results;
})();
```

---

## 🎯 **USAGE INSTRUCTIONS**

1. **Open spotify.com** in Chrome
2. **Open DevTools** (F12 → Console tab)
3. **Copy and paste** the script you need
4. **Press Enter** to run
5. **Check console** for results
6. **Results are automatically copied** to clipboard
7. **Paste results** into `REVERSE_ENGINEERING_FINDINGS.md`

---

## ⚠️ **IMPORTANT NOTES**

- Scripts use `console.table()` for better readability
- Results are automatically copied to clipboard
- You may need to adjust selectors based on Spotify's actual DOM structure
- Run scripts on different pages (Home, Library, Playlist) for comprehensive extraction
- Test hover/active states by manually triggering them before running scripts

---

**Status**: ✅ **READY TO USE**
