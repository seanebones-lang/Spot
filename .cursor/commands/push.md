# Seamless Push Command

## Quick Push

Simply run:
```bash
npm run push
```

Or directly:
```bash
./scripts/push.sh
```

## What It Does

The push script automatically:
1. ✅ Checks if there are commits to push
2. ✅ Tries SSH authentication (seamless if configured)
3. ✅ Falls back to GitHub CLI (if installed)
4. ✅ Falls back to HTTPS with credential helper
5. ✅ Provides clear instructions if authentication needed

## Setup (One-Time)

### Option 1: GitHub CLI (Recommended - Easiest)
```bash
brew install gh
gh auth login
```

### Option 2: SSH Key (Most Seamless)
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys
# Click "New SSH key", paste, save

# Test
ssh -T git@github.com
```

### Option 3: Personal Access Token
```bash
# 1. Go to: https://github.com/settings/tokens
# 2. Generate new token (classic)
# 3. Select "repo" scope
# 4. Copy token
# 5. Use token as password when git prompts
```

## Usage

After setup, just run:
```bash
npm run push
```

That's it! 🚀
