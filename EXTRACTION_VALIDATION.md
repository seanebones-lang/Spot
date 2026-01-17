# Extraction Validation Guide
## How to Validate Extracted Design Tokens

**Purpose**: Ensure extracted values from spotify.com match our implementation  
**Date**: January 16, 2026

---

## ✅ **VALIDATION CHECKLIST**

### **1. Color Validation**

#### **Verify Color Values**:
```javascript
// Run on spotify.com
function validateColors() {
  const extracted = {
    backgroundPrimary: '#121212',
    backgroundSecondary: '#181818',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    accentPrimary: '#1DB954'
  };
  
  const body = document.body;
  const computed = window.getComputedStyle(body);
  
  console.log('Validation Results:');
  console.log('Background Primary:', computed.backgroundColor === extracted.backgroundPrimary);
  console.log('Text Primary:', computed.color === extracted.textPrimary);
  
  return {
    backgroundColor: computed.backgroundColor,
    textColor: computed.color
  };
}

validateColors();
```

#### **Validate Hover States**:
1. Hover over a navigation item
2. Run color extraction script
3. Compare with extracted hover colors
4. Verify consistency across all hover states

---

### **2. Typography Validation**

#### **Verify Font Sizes**:
```javascript
function validateTypography() {
  const selectors = {
    h1: 'h1',
    h2: 'h2',
    body: 'p',
    button: 'button'
  };
  
  const results = {};
  
  Object.entries(selectors).forEach(([name, selector]) => {
    const el = document.querySelector(selector);
    if (el) {
      const style = window.getComputedStyle(el);
      results[name] = {
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        fontFamily: style.fontFamily
      };
    }
  });
  
  console.table(results);
  return results;
}

validateTypography();
```

#### **Cross-Reference**:
- Compare extracted values with `design-tokens.json`
- Verify all typography scales are captured
- Check for missing font weights

---

### **3. Spacing Validation**

#### **Verify Spacing Scale**:
```javascript
function validateSpacing() {
  const commonSpacings = ['4px', '8px', '12px', '16px', '20px', '24px', '32px'];
  const foundSpacings = new Set();
  
  document.querySelectorAll('*').forEach(el => {
    const style = window.getComputedStyle(el);
    ['padding', 'margin', 'gap'].forEach(prop => {
      const value = style.getPropertyValue(prop);
      if (value && value.includes('px')) {
        foundSpacings.add(value);
      }
    });
  });
  
  console.log('Found Spacings:', Array.from(foundSpacings).sort());
  console.log('Common Spacings Match:', 
    commonSpacings.every(s => Array.from(foundSpacings).some(f => f.includes(s)))
  );
  
  return Array.from(foundSpacings);
}

validateSpacing();
```

---

### **4. Sidebar Validation**

#### **Verify Sidebar Dimensions**:
```javascript
function validateSidebar() {
  const sidebar = document.querySelector('[class*="sidebar"], nav, aside');
  
  if (!sidebar) {
    console.error('Sidebar not found');
    return null;
  }
  
  const style = window.getComputedStyle(sidebar);
  const rect = sidebar.getBoundingClientRect();
  
  const result = {
    width: style.width,
    actualWidth: rect.width + 'px',
    minWidth: style.minWidth,
    maxWidth: style.maxWidth,
    backgroundColor: style.backgroundColor,
    padding: style.padding
  };
  
  console.table(result);
  
  // Verify resizable divider
  const divider = sidebar.nextElementSibling;
  if (divider) {
    const dividerStyle = window.getComputedStyle(divider);
    console.log('Divider Found:', {
      width: dividerStyle.width,
      cursor: dividerStyle.cursor,
      position: dividerStyle.position
    });
  } else {
    console.warn('⚠️ Resizable divider not found');
  }
  
  return result;
}

validateSidebar();
```

---

### **5. Player Bar Validation**

#### **Verify Player Bar**:
```javascript
function validatePlayerBar() {
  const player = document.querySelector('[data-testid="now-playing-bar"], footer, [class*="player"]');
  
  if (!player) {
    console.error('Player bar not found');
    return null;
  }
  
  const style = window.getComputedStyle(player);
  const rect = player.getBoundingClientRect();
  
  const result = {
    height: style.height,
    actualHeight: rect.height + 'px',
    expectedHeight: '90px',
    matches: rect.height === 90,
    backgroundColor: style.backgroundColor,
    borderTop: style.borderTop
  };
  
  console.table(result);
  
  if (!result.matches) {
    console.warn(`⚠️ Height mismatch: Expected 90px, got ${rect.height}px`);
  }
  
  return result;
}

validatePlayerBar();
```

---

### **6. Border Radius Validation**

#### **Verify Border Radius**:
```javascript
function validateBorderRadius() {
  const borderRadius = new Set();
  
  document.querySelectorAll('button, [class*="card"], [class*="Card"]').forEach(el => {
    const style = window.getComputedStyle(el);
    const br = style.borderRadius;
    
    if (br && br !== '0px') {
      borderRadius.add(br);
    }
  });
  
  const radiusArray = Array.from(borderRadius).sort();
  console.log('Found Border Radius Values:', radiusArray);
  
  // Check for discrepancy (4px vs 6px)
  const has4px = radiusArray.some(r => r.includes('4px'));
  const has6px = radiusArray.some(r => r.includes('6px'));
  
  if (has4px && has6px) {
    console.warn('⚠️ Both 4px and 6px found - need to verify correct value');
  }
  
  return radiusArray;
}

validateBorderRadius();
```

---

## 📊 **PIXEL-PERFECT VALIDATION**

### **Screenshot Comparison Method**:

1. **Take Screenshot of Spotify**:
   - Open spotify.com
   - Navigate to main page
   - Cmd+Shift+P → "Capture full size screenshot"
   - Save as `spotify_reference.png`

2. **Take Screenshot of EmPulse**:
   - Open local EmPulse application
   - Same view/page
   - Cmd+Shift+P → "Capture full size screenshot"
   - Save as `empulse_current.png`

3. **Compare Screenshots**:
```bash
# Using ImageMagick
compare -metric AE spotify_reference.png empulse_current.png diff.png

# Using Python PIL
python3 -c "
from PIL import Image, ImageChops
spotify = Image.open('spotify_reference.png')
empulse = Image.open('empulse_current.png')
diff = ImageChops.difference(spotify, empulse)
diff.save('diff.png')
print(f'Difference: {diff.getbbox()}')
"
```

4. **Calculate Difference Percentage**:
```javascript
// Run in browser console after loading both images
function calculatePixelDiff(img1, img2) {
  const canvas1 = document.createElement('canvas');
  const ctx1 = canvas1.getContext('2d');
  const canvas2 = document.createElement('canvas');
  const ctx2 = canvas2.getContext('2d');
  
  // Load and compare images
  // Calculate difference percentage
  // Return result
}
```

---

## ✅ **VALIDATION REPORT TEMPLATE**

### **Create Validation Report**:
```markdown
# Validation Report - [Date]

## Colors
- [ ] Background colors verified
- [ ] Text colors verified
- [ ] Hover states verified
- [ ] Active states verified

## Typography
- [ ] Font sizes verified
- [ ] Font weights verified
- [ ] Line heights verified
- [ ] Font families verified

## Spacing
- [ ] Spacing scale verified
- [ ] Component spacing verified

## Components
- [ ] Sidebar verified
- [ ] Resizable divider verified
- [ ] Player bar verified
- [ ] Border radius verified

## Pixel-Perfect
- [ ] Screenshot comparison <1% difference
- [ ] All discrepancies documented

## Notes
[Any issues or observations]
```

---

## 🎯 **VALIDATION SUCCESS CRITERIA**

### **Acceptable Differences**:
- ✅ **<1% pixel difference** (screenshot comparison)
- ✅ **Color values exact match** (hex codes)
- ✅ **Typography exact match** (±0.1px acceptable)
- ✅ **Spacing exact match** (±1px acceptable)

### **Must Fix**:
- ❌ **>1% pixel difference**
- ❌ **Color mismatch** (any difference)
- ❌ **Typography mismatch** (>1px difference)
- ❌ **Missing features** (resizable sidebar, etc.)

---

## 🚀 **AUTOMATED VALIDATION SCRIPT**

### **Complete Validation Runner**:
```javascript
// Run all validations
async function runAllValidations() {
  console.log('🚀 Starting Complete Validation...\n');
  
  const results = {
    timestamp: new Date().toISOString(),
    colors: null,
    typography: null,
    spacing: null,
    sidebar: null,
    player: null,
    borderRadius: null
  };
  
  try {
    results.colors = validateColors();
    results.typography = validateTypography();
    results.spacing = validateSpacing();
    results.sidebar = validateSidebar();
    results.player = validatePlayerBar();
    results.borderRadius = validateBorderRadius();
    
    console.log('\n✅ Validation Complete!');
    console.log(JSON.stringify(results, null, 2));
    
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    console.log('✅ Results copied to clipboard!');
    
  } catch (error) {
    console.error('❌ Validation Error:', error);
  }
  
  return results;
}

// Run it
runAllValidations();
```

---

## 📋 **POST-VALIDATION ACTIONS**

### **After Validation**:

1. **Update `design-tokens.json`**:
   - Replace "TBD" with verified values
   - Update status flags to "verified"
   - Remove "needs-verification" tags

2. **Update `tailwind.config.js`**:
   - Update color values
   - Update spacing scale
   - Update border radius values
   - Update typography values

3. **Update Components**:
   - Apply verified design tokens
   - Fix any discrepancies
   - Implement missing features

4. **Create Validation Report**:
   - Document all findings
   - List discrepancies
   - Note any issues

---

**Status**: ✅ **READY TO USE FOR VALIDATION**
