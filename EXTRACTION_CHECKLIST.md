# Reverse Engineering Extraction - Daily Checklist
## What to Extract Today from spotify.com

**Date**: January 16, 2026  
**Session**: Day 1

---

## ✅ **TODAY'S GOALS**

### **Priority 1: Critical Items (2-3 hours)**
- [ ] Extract resizable sidebar divider (⭐ user-requested)
- [ ] Extract all hover state colors
- [ ] Extract all active state colors
- [ ] Extract complete typography system

### **Priority 2: High Priority (2-3 hours)**
- [ ] Extract border radius values
- [ ] Extract spacing scale
- [ ] Extract sidebar specifications
- [ ] Extract player bar specifications

### **Priority 3: Components (2 hours)**
- [ ] Extract button specifications
- [ ] Extract card specifications
- [ ] Extract input specifications

---

## 📋 **EXTRACTION CHECKLIST - COPY THIS TO NOTEPAD**

### **When Accessing spotify.com:**

**Step 1: Setup (5 min)**
- [ ] Open Chrome
- [ ] Navigate to https://open.spotify.com
- [ ] Log in
- [ ] Open DevTools (F12)

**Step 2: Colors (30 min)**
- [ ] Inspect main container → Background color
- [ ] Inspect sidebar → Background color
- [ ] Hover over navigation item → Record hover background
- [ ] Click navigation item → Record active background
- [ ] Hover over button → Record hover color
- [ ] Use helper script: `extractAllStyles('[class*="sidebar"]')`

**Step 3: Sidebar & Divider (45 min)**
- [ ] Inspect sidebar → Record width
- [ ] Find divider line between sidebar/main
- [ ] Hover over divider → Check cursor (`col-resize` or `ew-resize`)
- [ ] Try dragging divider → Test resize functionality
- [ ] Check localStorage → Find width storage key
- [ ] Document min/max width constraints

**Step 4: Typography (30 min)**
- [ ] Inspect H1 → Record font-size, weight, line-height
- [ ] Inspect H2 → Record font-size, weight, line-height
- [ ] Inspect body text → Record font-size, weight, line-height
- [ ] Inspect button text → Record font-size, weight
- [ ] Use helper script: Extract all font sizes

**Step 5: Player Bar (30 min)**
- [ ] Inspect player bar → Record height (verify 90px)
- [ ] Record background color
- [ ] Record border top
- [ ] Measure section widths (left/center/right)

**Step 6: Components (60 min)**
- [ ] Inspect primary button → All states
- [ ] Inspect track card → All states
- [ ] Inspect input field → All states

---

## 📝 **FINDINGS TEMPLATE**

Copy this template for each finding:

```
### [Component Name]

**Location**: [Where found]
**Extracted**: [Date/Time]
**Verification**: [Screenshot/Notes]

**Values**:
- Property: `value`
- Property: `value`

**States**:
- Default: `value`
- Hover: `value`
- Active: `value`

**Notes**: [Any special observations]
```

---

## 🎯 **TODAY'S TARGET**

Extract at least:
- ✅ Resizable sidebar divider details
- ✅ All hover/active colors
- ✅ Complete typography
- ✅ Sidebar specifications
- ✅ Player bar specifications

**Time Estimate**: 4-6 hours

---

**Status**: ⏳ **READY TO BEGIN LIVE EXTRACTION**
