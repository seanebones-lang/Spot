# 🚂 Railway Deployment - Execution Steps

## Phase 6: Railway Deploy Live

### Step 1: CLI Setup & Authentication

```bash
# Install Railway CLI (if not installed)
npm i -g @railway/cli

# Authenticate (opens browser)
railway login
```

### Step 2: Initialize Project & Database

```bash
# Initialize new Railway project
railway init spot-music-api

# Add PostgreSQL database service
railway add postgresql spot-db
```

### Step 3: Environment Variables Setup

```bash
# Option A: Set variables from .env.local
railway variables set-all .env.local

# Option B: Set individually
railway variables set NODE_ENV=production
railway variables set DATABASE_URL=$(railway db connection)

# Get database connection string
railway db connection
# Copy output and add to Vercel dashboard as DATABASE_URL
```

### Step 4: Deploy Application

```bash
# Deploy full stack
railway up

# Or deploy in background
railway up --detach

# View deployment status
railway status

# View logs
railway logs

# Open in browser
railway open
```

### Step 5: Verify Deployment

```bash
# Get Railway domain
railway domain

# Test health endpoint
curl https://spot-music-api.up.railway.app/api/health

# Expected response:
# {"status":"ok","timestamp":"...","service":"empulse-music-api","version":"0.1.0","environment":"production"}
```

### Step 6: Sync DATABASE_URL to Vercel

```bash
# Get DATABASE_URL from Railway
railway variables | grep DATABASE_URL

# Add to Vercel dashboard:
# 1. Go to: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/settings/environment-variables
# 2. Add: DATABASE_URL = (value from Railway)
# 3. Redeploy Vercel
```

## Service Architecture

```
Railway:
  ├── spot-db (PostgreSQL)
  │   └── DATABASE_URL (auto-generated)
  │
  └── spot-music-api (Next.js API)
      ├── /api/health ✅
      ├── /api/auth/*
      ├── /api/tracks/*
      └── Prisma Client (binary engine)
```

## Troubleshooting

### Authentication Issues

```bash
railway login  # Re-authenticate
railway logout && railway login  # Fresh login
```

### Database Connection

```bash
# Verify PostgreSQL service
railway status

# Test connection
railway connect postgresql

# Run migrations
railway run npx prisma migrate deploy
```

### Build Failures

```bash
# Check logs
railway logs

# Verify railway.toml
cat railway.toml

# Test build locally
npm run build
```

---

**Status**: Ready for execution 🚀
