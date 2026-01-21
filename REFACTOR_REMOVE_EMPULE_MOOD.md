# Refactor: Remove Empule/Mood Functionality

**Date:** January 2026  
**Status:** In Progress

---

## Analysis

### Files with Mood References

1. **components/AdBanner.tsx**
   - Has `mood?: string` prop
   - Uses mood for contextual ads

2. **stores/journalStore.ts**
   - Has `moodTags?: {}` field

3. **stores/checkInStore.ts**
   - Has `mood?: {}` field in state
   - Uses mood in check-in functionality

---

## Refactoring Plan

### 1. Remove Mood from AdBanner

- Remove `mood` prop from interface
- Remove mood-based ad logic
- Keep contextual ads (can use other context)

### 2. Clean Up Stores

- Remove mood-related fields from journalStore
- Remove mood-related fields from checkInStore
- Update check-in functionality to work without mood

### 3. Remove Any Mood Components

- Check for mood-related components (already deleted per git status)
- Verify no imports remain

---

## Implementation

Starting refactoring now...
