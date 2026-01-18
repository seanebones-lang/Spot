#!/bin/bash
# Trigger Railway deployment

export RAILWAY_TOKEN="0be18ca8-43bf-4a21-ae29-b0a5f7903b08"

echo "🚂 Triggering Railway deployment..."

# Try to deploy
railway up --detach 2>&1 | head -20

echo ""
echo "📊 Check deployment status:"
echo "   https://railway.app/project/109bb4f8-7620-422c-8360-3b0298f9fb90"
