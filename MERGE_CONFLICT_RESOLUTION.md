# Merge Conflict Resolution Guide

**Date**: January 2026  
**Branches**: `main` ← `fix-all-complete-v1`  
**Status**: Resolving conflicts

## Conflicted Files

### High Priority (Core Functionality):
1. `package.json` - Dependencies
2. `next.config.js` - Next.js configuration
3. `components/Player.tsx` - Audio player
4. `components/TopBar.tsx` - Navigation
5. `components/UserMenu.tsx` - User interface

### Medium Priority:
6. `components/Sidebar.tsx`
7. `components/PlayButton.tsx`
8. `components/AudioVisualizer.tsx`
9. `app/page.tsx` - Home page
10. `app/dashboard/artist/page.tsx`
11. `app/upload/page.tsx`

### Configuration:
12. `.gitignore`
13. `jest.config.js`
14. `jest.setup.js`
15. `railway.toml`
16. `vercel.json`
17. `package-lock.json`
18. `data/mock/tracks.json`

## Resolution Strategy

1. **Accept our changes** (fix-all-complete-v1) for:
   - New deployment workflows
   - Eleven MCP configuration
   - Terraform setup
   - Deployment configurations

2. **Merge both** for:
   - package.json (combine dependencies)
   - next.config.js (merge configurations)
   - Components (merge functionality)

3. **Prefer main** for:
   - Core app functionality that's been tested
   - Established patterns

## Resolution Steps

```bash
# For each conflicted file:
git checkout --ours [file]    # Keep fix-all-complete-v1 version
git checkout --theirs [file]  # Keep main version
git checkout --ours --theirs [file]  # Try to merge both

# After resolving each file:
git add [file]

# After all conflicts resolved:
git commit -m "Merge main into fix-all-complete-v1 - conflicts resolved"
```
