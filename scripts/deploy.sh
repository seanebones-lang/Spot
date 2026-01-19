#!/bin/bash
# Auto-deploy script for Spot - Vercel/Railway
# Usage: ./scripts/deploy.sh [platform] [project] [branch]

set -e

PLATFORM=${1:-vercel}
PROJECT=${2:-spot-music}
BRANCH=${3:-main}
DEPLOY_SCRIPT="$HOME/.cursor/tools/deploy-mcp.js"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting deployment to ${PLATFORM}...${NC}"

# Check if deploy script exists
if [ ! -f "$DEPLOY_SCRIPT" ]; then
  echo -e "${RED}❌ Deploy script not found at $DEPLOY_SCRIPT${NC}"
  exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
  echo -e "${RED}❌ Node.js not found${NC}"
  exit 1
fi

# Load .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Get token from environment
if [ "$PLATFORM" == "vercel" ]; then
  TOKEN=${VERCEL_TOKEN:-""}
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ VERCEL_TOKEN not set. Add it to .env.local or export it${NC}"
    echo -e "${BLUE}💡 Add to .env.local: VERCEL_TOKEN=your_token${NC}"
    exit 1
  fi
elif [ "$PLATFORM" == "railway" ]; then
  TOKEN=${RAILWAY_TOKEN:-""}
  if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ RAILWAY_TOKEN not set. Add it to .env.local or export it${NC}"
    echo -e "${BLUE}💡 Add to .env.local: RAILWAY_TOKEN=your_token${NC}"
    exit 1
  fi
else
  echo -e "${RED}❌ Invalid platform: $PLATFORM. Use 'vercel' or 'railway'${NC}"
  exit 1
fi

# Run tests before deploying (optional)
echo -e "${BLUE}📋 Running tests...${NC}"
if npm test -- --passWithNoTests 2>/dev/null; then
  echo -e "${GREEN}✅ Tests passed${NC}"
else
  echo -e "${RED}⚠️  Tests failed, but continuing deployment...${NC}"
fi

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build || {
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
}

# Deploy using MCP tool
echo -e "${BLUE}🚀 Deploying to ${PLATFORM}...${NC}"
node "$DEPLOY_SCRIPT" "$PLATFORM" "$PROJECT" "$TOKEN" "$BRANCH" || {
  echo -e "${RED}❌ Deployment failed${NC}"
  exit 1
}

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
