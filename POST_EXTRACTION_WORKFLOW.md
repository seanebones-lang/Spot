# Post-Extraction Workflow
## What to Do After Completing Extraction

**Purpose**: Guide for updating implementation after design token extraction  
**Date**: January 16, 2026

---

## ✅ **STEP-BY-STEP WORKFLOW**

### **Phase 1: Update Design Tokens** ✅

#### **1.1 Update `design-tokens.json`**
- [ ] Replace all "TBD" values with extracted values
- [ ] Update status flags from "needs-extraction" to "verified"
- [ ] Remove "needs-verification" tags
- [ ] Add notes for any unexpected findings
- [ ] Commit changes: `git commit -m "Update design-tokens.json with extracted values"`

#### **1.2 Validate Design Tokens**
```bash
# Verify JSON is valid
cat design-tokens.json | jq '.'

# Check for any remaining TBD values
grep -n "TBD" design-tokens.json
```

---

### **Phase 2: Update Tailwind Configuration** ✅

#### **2.1 Update `tailwind.config.js`**
- [ ] Update color values from `design-tokens.json`
- [ ] Update spacing scale
- [ ] Update border radius values
- [ ] Update typography (if using Tailwind typography plugin)
- [ ] Add any missing custom values

#### **Example Update**:
```javascript
// Before
'spotify-green': '#1DB954',
'borderRadius': { 'spotify': '4px' },

// After (from extracted values)
'spotify-green': '#1DB954',
'spotify-green-hover': '#1ed760', // Extracted hover state
'borderRadius': { 'spotify': '4px' }, // Verified value
```

#### **2.2 Verify Tailwind Config**
```bash
# Check if Tailwind can parse the config
npx tailwindcss --help

# Test build
npm run build
```

---

### **Phase 3: Update Components** ✅

#### **3.1 Update Sidebar Component**
- [ ] Update width from extracted value
- [ ] Update background color
- [ ] Update padding/spacing
- [ ] **Implement resizable divider** (user-requested)
  - Add divider element
  - Implement drag functionality
  - Add width persistence (localStorage)
  - Add min/max constraints

#### **3.2 Update Player Bar Component**
- [ ] Verify height matches extracted value (90px)
- [ ] Update background color
- [ ] Update border styling
- [ ] Adjust section widths if needed

#### **3.3 Update Button Components**
- [ ] Update border radius (fix 4px vs 6px discrepancy)
- [ ] Update hover state colors
- [ ] Update active state colors
- [ ] Update typography

#### **3.4 Update Card Components**
- [ ] Update border radius
- [ ] Update background colors
- [ ] Update hover states
- [ ] Update spacing

---

### **Phase 4: Implement Missing Features** ✅

#### **4.1 Resizable Sidebar (User-Requested)** ⭐
- [ ] Create divider component
- [ ] Implement drag-to-resize functionality
- [ ] Add localStorage persistence
- [ ] Add min/max width constraints
- [ ] Add smooth animations
- [ ] Test on all breakpoints

#### **Implementation Guide**:
```typescript
// Sidebar Resizer Component
const SidebarResizer = () => {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Store initial width and mouse position
  };
  
  const handleMouseMove = (e) => {
    if (isDragging) {
      // Calculate new width
      // Update sidebar width
      // Persist to localStorage
    }
  };
  
  return (
    <div
      className="w-1 bg-spotify-light-gray cursor-col-resize hover:bg-spotify-text-gray"
      onMouseDown={handleMouseDown}
    />
  );
};
```

---

### **Phase 5: Validation** ✅

#### **5.1 Run Validation Scripts**
- [ ] Run all validation scripts from `EXTRACTION_VALIDATION.md`
- [ ] Take screenshots of key pages
- [ ] Compare with Spotify screenshots
- [ ] Calculate pixel difference
- [ ] Document any discrepancies

#### **5.2 Visual Review**
- [ ] Review all pages visually
- [ ] Test all interactive states (hover, active, focus)
- [ ] Test resizable sidebar functionality
- [ ] Check responsive breakpoints
- [ ] Verify accessibility

---

### **Phase 6: Update Documentation** ✅

#### **6.1 Update Audit Status**
- [ ] Update `AUDIT_STATUS.md` to 100%
- [ ] Mark all extraction items as complete
- [ ] Update progress metrics

#### **6.2 Create Implementation Report**
- [ ] Document all changes made
- [ ] List implemented features
- [ ] Note any discrepancies that remain
- [ ] Provide before/after comparisons

#### **6.3 Update Master Todo List**
- [ ] Mark Reverse Engineering tasks as complete
- [ ] Unblock other agents (Front-End, UI)
- [ ] Assign next tasks via Orchestrator

---

## 📋 **CHECKLIST SUMMARY**

### **Immediate Actions**:
- [ ] Update `design-tokens.json` with extracted values
- [ ] Update `tailwind.config.js` with verified tokens
- [ ] Implement resizable sidebar divider
- [ ] Fix border radius discrepancy
- [ ] Update all hover/active state colors

### **Component Updates**:
- [ ] Update Sidebar component
- [ ] Update Player Bar component
- [ ] Update Button components
- [ ] Update Card components
- [ ] Update all form inputs

### **Validation**:
- [ ] Run validation scripts
- [ ] Perform screenshot comparison
- [ ] Visual review all pages
- [ ] Test all interactive states

### **Documentation**:
- [ ] Update audit status
- [ ] Create implementation report
- [ ] Update master todo list
- [ ] Handoff to Orchestrator

---

## 🎯 **SUCCESS CRITERIA**

### **Design Tokens**:
- ✅ All values extracted and verified
- ✅ No "TBD" values remaining
- ✅ All status flags updated

### **Implementation**:
- ✅ All components updated
- ✅ Resizable sidebar implemented
- ✅ All hover/active states working
- ✅ Border radius discrepancy fixed

### **Validation**:
- ✅ Pixel difference <1%
- ✅ All colors match exactly
- ✅ Typography matches exactly
- ✅ All features working

---

## 🚀 **HANDOFF TO ORCHESTRATOR**

### **After All Updates**:

1. **Update `MASTER_TODO_LIST.md`**:
   - Mark Reverse Engineering as complete
   - Update orchestrator assignment section
   - Unblock Front-End and UI agents

2. **Create Handoff Report**:
   - Summary of extraction findings
   - List of implemented changes
   - Remaining tasks for other agents
   - Priority recommendations

3. **Notify Orchestrator**:
   - Extraction complete
   - Ready for agent assignments
   - Next phase can begin

---

**Status**: ✅ **READY TO USE AFTER EXTRACTION**
