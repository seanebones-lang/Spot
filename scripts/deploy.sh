#!/bin/bash
set -e

echo "🚂 Deploying to Railway..."

# Set Railway token
export RAILWAY_TOKEN="0be18ca8-43bf-4a21-ae29-b0a5f7903b08"

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Link to project
echo "📦 Linking to Railway project..."
railway link --project 109bb4f8-7620-422c-8360-3b0298f9fb90 --non-interactive || {
    echo "⚠️  Project may already be linked or needs manual setup"
}

# Deploy
echo "🚀 Deploying application..."
railway up --detach

echo "✅ Deployment initiated!"
echo "📊 Check status at: https://railway.app/project/109bb4f8-7620-422c-8360-3b0298f9fb90"
