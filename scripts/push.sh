#!/bin/bash
# Seamless push script for Spot repository
# Handles authentication automatically

set -e

cd "$(dirname "$0")/.."
REPO_DIR=$(pwd)

echo "🚀 Pushing to GitHub..."

# Check if we're in the right directory
if [ ! -d ".git" ]; then
  echo "❌ Not a git repository"
  exit 1
fi

# Fetch latest from remote
echo "📥 Fetching latest from remote..."
git fetch origin main 2>&1 | grep -v "Permission denied" || true

# Check if we need to pull first
BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "0")
if [ "$BEHIND" != "0" ]; then
  echo "⚠️  Local branch is $BEHIND commit(s) behind remote"
  echo "📥 Pulling latest changes..."
  git pull origin main --no-edit || {
    echo "❌ Pull failed due to conflicts. Please resolve manually."
    exit 1
  }
fi

# Check if there are commits to push
AHEAD=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
if [ "$AHEAD" = "0" ]; then
  echo "✅ Nothing to push - already up to date"
  exit 0
fi

echo "📦 $AHEAD commit(s) ready to push"

# Try SSH first (most seamless)
if ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
  echo "🔐 Using SSH authentication"
  git remote set-url origin git@github.com:seanebones-lang/Spot.git 2>/dev/null || true
  git push origin main
  echo "✅ Push complete!"
  exit 0
fi

# Try GitHub CLI (most seamless)
if command -v gh &> /dev/null; then
  echo "🔐 Using GitHub CLI"
  if gh auth status &> /dev/null; then
    # Configure git to use GitHub CLI for credentials
    git config --global credential.helper "" 2>/dev/null || true
    git config --global credential.helper "!gh auth git-credential" 2>/dev/null || true
    git push origin main
    echo "✅ Push complete!"
    exit 0
  else
    echo "📝 Authenticating with GitHub CLI..."
    gh auth login --git-protocol https
    git config --global credential.helper "" 2>/dev/null || true
    git config --global credential.helper "!gh auth git-credential" 2>/dev/null || true
    git push origin main
    echo "✅ Push complete!"
    exit 0
  fi
fi

# Fallback: HTTPS with credential helper
echo "🔐 Using HTTPS (will prompt for credentials)"
git remote set-url origin https://github.com/seanebones-lang/Spot.git 2>/dev/null || true

# Try push (will prompt if needed)
if git push origin main; then
  echo "✅ Push complete!"
else
  echo ""
  echo "❌ Push failed. Please authenticate:"
  echo ""
  echo "Option 1: Use GitHub CLI"
  echo "  brew install gh"
  echo "  gh auth login"
  echo "  ./scripts/push.sh"
  echo ""
  echo "Option 2: Use Personal Access Token"
  echo "  1. Go to: https://github.com/settings/tokens"
  echo "  2. Generate new token (repo scope)"
  echo "  3. Use token as password when prompted"
  echo ""
  echo "Option 3: Set up SSH key"
  echo "  ssh-keygen -t ed25519 -C 'your_email@example.com'"
  echo "  cat ~/.ssh/id_ed25519.pub"
  echo "  Add to: https://github.com/settings/keys"
  echo ""
  exit 1
fi
