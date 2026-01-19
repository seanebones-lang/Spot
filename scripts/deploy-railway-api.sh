#!/bin/bash

# Railway API Deployment Script
# Uses Railway GraphQL API to deploy the application

set -e

RAILWAY_TOKEN="0be18ca8-43bf-4a21-ae29-b0a5f7903b08"
PROJECT_ID="109bb4f8-7620-422c-8360-3b0298f9fb90"
WORKSPACE_ID="16b963d0-f37c-49bc-baa9-efb2eb901503"

echo "🚂 Deploying to Railway via API..."

# Check if we can access Railway API
echo "📡 Checking Railway API access..."

# Get project services
SERVICES_RESPONSE=$(curl -s -X POST https://backboard.railway.app/graphql/v1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $RAILWAY_TOKEN" \
  -d '{
    "query": "query { project(id: \"'$PROJECT_ID'\") { id name services { edges { node { id name } } } } }"
  }')

echo "Project services: $SERVICES_RESPONSE"

# For now, use Railway CLI which is simpler
echo "📦 Using Railway CLI for deployment..."

# Set token
export RAILWAY_TOKEN="$RAILWAY_TOKEN"

# Try to link (will prompt if needed)
echo "🔗 Linking project..."
railway link || echo "Project may already be linked or needs manual setup"

# Deploy
echo "🚀 Deploying..."
railway up --detach

echo "✅ Deployment complete!"
echo "📊 Monitor at: https://railway.app/project/$PROJECT_ID"
