#!/bin/bash

# Railway Deployment Script
# This script deploys the application to Railway using the Railway API

set -e

RAILWAY_TOKEN="0be18ca8-43bf-4a21-ae29-b0a5f7903b08"
PROJECT_ID="109bb4f8-7620-422c-8360-3b0298f9fb90"
WORKSPACE_ID="16b963d0-f37c-49bc-baa9-efb2eb901503"

echo "🚂 Deploying to Railway..."

# Check if Railway CLI is available
if command -v railway &> /dev/null; then
    echo "✅ Railway CLI found"
    
    # Set Railway token as environment variable
    export RAILWAY_TOKEN="$RAILWAY_TOKEN"
    
    # Link to project
    echo "📦 Linking to project..."
    railway link "$PROJECT_ID" --non-interactive || true
    
    # Deploy
    echo "🚀 Deploying application..."
    railway up --detach
    
    echo "✅ Deployment initiated!"
    echo "📊 Check status at: https://railway.app/project/$PROJECT_ID"
else
    echo "❌ Railway CLI not found. Installing..."
    echo "Please install Railway CLI: npm i -g @railway/cli"
    exit 1
fi
