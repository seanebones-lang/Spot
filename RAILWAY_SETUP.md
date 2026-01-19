# 🚂 Railway Deployment Setup Guide

## Prerequisites

1. Railway account: https://railway.app
2. Railway CLI installed: `brew install railway` (or `npm i -g @railway/cli`)

## Step-by-Step Setup

### 1. Authenticate Railway CLI

```bash
railway login
```

This will open your browser for authentication.

### 2. Create/Select Project

```bash
# Option A: Link to existing project
railway link

# Option B: Create new project
railway init
```

### 3. Add PostgreSQL Database

```bash
railway add postgresql
```

This creates a PostgreSQL service and sets up the database.

### 4. Get Database Connection String

```bash
# Get the connection string
railway variables

# Or use Railway dashboard:
# https://railway.app → Your Project → PostgreSQL → Variables → DATABASE_URL
```

### 5. Set Environment Variables

```bash
# Set DATABASE_URL (if not auto-set)
railway variables set DATABASE_URL="$(railway variables | grep DATABASE_URL)"

# Set other required variables
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

### 6. Deploy Application

```bash
# Deploy in detached mode (background)
railway up --detach

# Or deploy and watch logs
railway up
```

### 7. Verify Deployment

```bash
# Check status
railway status

# View logs
railway logs

# Open in browser
railway open
```

### 8. Database Schema Setup

```bash
# Run Prisma migrations
railway run npx prisma migrate deploy

# Or connect to database shell
railway connect postgresql
```

## Alternative: Railway Dashboard Setup

1. Go to https://railway.app
2. Create new project → "Deploy from GitHub repo"
3. Select your Spot repository
4. Add PostgreSQL service
5. Set environment variables:
   - `DATABASE_URL` (auto-set from PostgreSQL service)
   - `NODE_ENV=production`
   - `PORT=3000` (auto-set by Railway)
6. Deploy automatically on git push

## Troubleshooting

### "Unauthorized" Error

```bash
railway login  # Re-authenticate
```

### "No linked project found"

```bash
railway link  # Link to existing project
# OR
railway init  # Create new project
```

### Database Connection Issues

- Verify PostgreSQL service is running
- Check `DATABASE_URL` is set correctly
- Ensure Prisma migrations are deployed: `railway run npx prisma migrate deploy`

### Build Failures

- Check `railway.toml` build command: `prisma generate && npm run build`
- Verify all environment variables are set
- Check logs: `railway logs`

## Quick Reference

```bash
# Authentication
railway login

# Project Management
railway link          # Link to project
railway init          # Create new project
railway status        # Check deployment status

# Database
railway add postgresql           # Add PostgreSQL
railway connect postgresql       # Connect to DB shell
railway run npx prisma migrate deploy  # Run migrations

# Deployment
railway up --detach   # Deploy in background
railway logs          # View logs
railway open          # Open in browser

# Variables
railway variables              # List all variables
railway variables set KEY=VAL  # Set variable
```

---

**Note**: Railway CLI requires authentication before any commands can run.
Run `railway login` first, then proceed with the setup steps above.
