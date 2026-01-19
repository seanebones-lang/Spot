# 🚂 Railway Deployment Guide - Spot Music App

## Quick Start (5 minutes)

### 1. Install Railway CLI

```bash
npm i -g @railway/cli
# OR
brew install railway
```

### 2. Authenticate

```bash
railway login
```

### 3. Initialize Project

```bash
# Option A: Link to existing project
railway link

# Option B: Create new project
railway init --name spot-music-api
```

### 4. Add PostgreSQL Database

```bash
railway add postgresql
# Service name: spot-db
```

### 5. Deploy Application

```bash
railway up --detach
```

### 6. Verify Deployment

```bash
# Check status
railway status

# View logs
railway logs

# Open in browser
railway open

# Test health endpoint
curl $(railway domain)/api/health
```

## Configuration

### railway.toml

- ✅ Build command: `prisma generate && npm run build`
- ✅ Start command: `npm start`
- ✅ Health check: `/api/health`
- ✅ Auto-restart on failure

### Environment Variables

Railway automatically sets:

- `DATABASE_URL` (from PostgreSQL service)
- `PORT` (default: 3000)
- `NODE_ENV` (from environment)

### Manual Variables (if needed)

```bash
railway variables set NODE_ENV=production
railway variables set NEXT_PUBLIC_API_URL=https://your-api.railway.app
```

## Database Setup

### Run Migrations

```bash
railway run npx prisma migrate deploy
```

### Connect to Database

```bash
railway connect postgresql
```

### Sync DATABASE_URL to Vercel

After Railway deployment:

1. Get DATABASE_URL from Railway:
   ```bash
   railway variables | grep DATABASE_URL
   ```
2. Add to Vercel dashboard:
   - Settings → Environment Variables
   - Add: `DATABASE_URL` = (Railway value)

## Service Architecture

```
Railway:
  ├── spot-db (PostgreSQL)
  │   └── DATABASE_URL (auto-generated)
  │
  └── spot-music-api (Next.js API)
      ├── /api/health
      ├── /api/auth/*
      ├── /api/tracks/*
      └── Prisma Client (binary engine)
```

## Troubleshooting

### "Unauthorized" Error

```bash
railway login  # Re-authenticate
```

### Database Connection Issues

- Verify PostgreSQL service is running: `railway status`
- Check DATABASE_URL: `railway variables`
- Test connection: `railway connect postgresql`

### Build Failures

- Check logs: `railway logs`
- Verify railway.toml build command
- Ensure Prisma is configured: `prisma generate`

## Next Steps

1. ✅ Railway deployment complete
2. ⏭️ Mobile app (Flutter/React Native)
3. ⏭️ AI/ML enhancements
4. ⏭️ Monitoring (Sentry)
5. ⏭️ Scale (Redis, CDN)

---

**Status**: Ready for deployment 🚀
