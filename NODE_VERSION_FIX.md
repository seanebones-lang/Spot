# Node.js Version Fix - Critical

**Date:** January 19, 2026  
**Issue:** Node.js v25.3.0 incompatible with Next.js 15 (semver check failure)  
**Fix Required:** Switch to Node.js 20 LTS

## Root Cause

Node.js v25.3.0 (unstable/nightly) breaks Next.js 15's internal semver validation in `node_modules/next/dist/bin/next`. The `_semver.default.satisfies` function fails due to module system changes in Node 25.

**Next.js 15 officially supports:**

- Node.js >= 18.18.0
- Node.js >= 20 LTS (recommended)
- Node.js >= 19.8.0

**Current Status:** Using Node.js v25.3.0 ❌

## Quick Fix (5 minutes)

### Step 1: Install NVM (if not installed)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

**Then restart your terminal or run:**

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### Step 2: Switch to Node 20 LTS

```bash
# Install Node 20 LTS
nvm install 20.18.0

# Use it for this session
nvm use 20.18.0

# Set as default (optional but recommended)
nvm alias default 20.18.0

# Verify
node --version  # Should show v20.18.0
```

### Step 3: Clean & Reinstall Dependencies

```bash
cd /Users/nexteleven/Desktop/spot/Spot

# Remove existing artifacts
rm -rf node_modules package-lock.json .next

# Reinstall with correct Node version
npm install

# Verify server starts
npm run dev
```

### Step 4: Verify Everything Works

```bash
# Check Node version
node --version  # Must be v20.x.x

# Check server starts
npm run dev  # Should start on http://localhost:3001

# Test the site loads
curl http://localhost:3001
```

## Package.json Lock Added

Added `engines` field to `package.json`:

```json
"engines": {
  "node": ">=20.0.0 <21.0.0",
  "npm": ">=10.0.0"
}
```

This ensures:

- ✅ Vercel/Railway deployments use Node 20
- ✅ Team members get warnings if using wrong Node version
- ✅ CI/CD pipelines enforce correct version

## Alternative: Using Homebrew (macOS)

If you prefer not to use NVM:

```bash
# Install Node 20 via Homebrew
brew install node@20

# Link it (if needed)
brew link node@20 --force --overwrite

# Verify
node --version
```

## Why This Matters

1. **Deployment Compatibility:** Vercel and Railway default to Node 20 LTS
2. **Stability:** Node 20 LTS is stable; Node 25 is experimental
3. **Package Compatibility:** Most packages (including Next.js) test on Node 20
4. **Team Alignment:** Ensures all developers use same Node version

## Verification Checklist

- [ ] Node version is v20.x.x (check: `node --version`)
- [ ] Dependencies install without errors (`npm install`)
- [ ] Server starts successfully (`npm run dev`)
- [ ] Site loads at http://localhost:3001
- [ ] Buttons/interactions work (from previous hydration fix)

## After Fixing

Once Node 20 is installed:

1. **Kill any running processes:**

   ```bash
   lsof -ti:3001 | xargs kill -9 2>/dev/null || true
   ```

2. **Clean and reinstall:**

   ```bash
   rm -rf node_modules package-lock.json .next
   npm install
   ```

3. **Start server:**

   ```bash
   npm run dev
   ```

4. **Test the site:**
   - Navigate to http://localhost:3001
   - Test buttons/interactions
   - Check console for errors

---

**Status:** `package.json` engines field added ✅  
**Action Required:** User must switch to Node 20 LTS manually
