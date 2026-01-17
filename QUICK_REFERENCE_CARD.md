# Reverse Engineering - Quick Reference Card
## One-Page Quick Start Guide

**Date**: January 16, 2026

---

## 🚀 **START HERE (3 Steps)**

### **Step 1: Setup** (2 min)
```
1. Open Chrome → https://open.spotify.com
2. Log in (if needed)
3. Press F12 (open DevTools)
4. Go to Console tab
```

### **Step 2: Extract** (4-6 hours)
```
1. Open: EXTRACTION_AUTOMATION.md
2. Copy Script 1 → Paste in Console → Enter
3. Copy results → Paste into REVERSE_ENGINEERING_FINDINGS.md
4. Repeat for Scripts 2-7
5. Update design-tokens.json with values
```

### **Step 3: Validate** (1 hour)
```
1. Open: EXTRACTION_VALIDATION.md
2. Run validation scripts
3. Take screenshots
4. Compare pixel differences
```

---

## 📋 **PRIORITY ORDER**

### **🔴 Do First**:
1. **Script 3**: Sidebar + Resizable Divider ⭐
2. **Script 1**: All Colors (hover/active)
3. **Script 2**: Typography System

### **🟡 Do Next**:
4. **Script 6**: Border Radius (fix 4px vs 6px)
5. **Script 5**: Spacing Scale
6. **Script 4**: Player Bar

### **🟢 Complete**:
7. **Script 7**: All-in-One (final check)

---

## 📁 **KEY FILES**

| Need | File |
|------|------|
| Start extraction | `EXTRACTION_READY.md` |
| Get scripts | `EXTRACTION_AUTOMATION.md` |
| Document findings | `REVERSE_ENGINEERING_FINDINGS.md` |
| Checklist | `REVERSE_ENGINEERING_AUDIT.md` |
| Track progress | `AUDIT_STATUS.md` |
| Master guide | `REVERSE_ENGINEERING_MASTER_GUIDE.md` |

---

## ✅ **QUICK CHECKLIST**

- [ ] Opened spotify.com in Chrome
- [ ] DevTools Console open
- [ ] Scripts ready (EXTRACTION_AUTOMATION.md)
- [ ] Findings template ready (REVERSE_ENGINEERING_FINDINGS.md)
- [ ] Design tokens ready (design-tokens.json)

---

## 🎯 **SUCCESS CRITERIA**

- ✅ Resizable sidebar documented
- ✅ All colors extracted (including hover/active)
- ✅ Typography complete
- ✅ Border radius fixed
- ✅ <1% pixel difference

---

**Time Estimate**: 4-6 hours  
**Status**: Ready to begin
