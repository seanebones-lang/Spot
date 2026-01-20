# Deployment Guide - Spot Music

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Spotify app created and redirect URIs set
- [ ] Database migrations run
- [ ] Tests passing
- [ ] Build successful
- [ ] Lighthouse score > 90

## Environment Variables

### Required for Production

```bash
# Spotify OAuth
SPOTIFY_CLIENT_ID=your_production_client_id
SPOTIFY_CLIENT_SECRET=your_production_client_secret
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_production_secret

# Database
DATABASE_URL=your_production_database_url

# Optional but Recommended
SENTRY_DSN=your_sentry_dsn
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## Vercel Deployment

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository

### 2. Configure Environment Variables
1. Go to Project Settings → Environment Variables
2. Add all required variables from `.env.local.example`
3. Set for Production, Preview, and Development

### 3. Configure Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 4. Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Update Spotify redirect URI to production URL

## Manual Deployment

### Using PM2

```bash
# Install PM2
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "spot-music" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Using Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t spot-music .
docker run -p 3000:3000 --env-file .env.local spot-music
```

## Post-Deployment

### 1. Verify Deployment
- [ ] Homepage loads
- [ ] Search works
- [ ] Spotify login works
- [ ] PWA installable
- [ ] Service worker active

### 2. Monitor Performance
- Check Vercel Analytics dashboard
- Review Web Vitals
- Monitor error rates

### 3. Set Up Monitoring
- Configure Sentry (if using)
- Set up uptime monitoring
- Configure alerts

## Troubleshooting

### Build Fails
- Check Node.js version (requires 20.x)
- Verify all dependencies installed
- Check for TypeScript errors

### OAuth Not Working
- Verify redirect URI in Spotify dashboard
- Check `NEXTAUTH_URL` matches production URL
- Ensure `NEXTAUTH_SECRET` is set

### API Errors
- Check Spotify API credentials
- Verify rate limits not exceeded
- Check network connectivity
