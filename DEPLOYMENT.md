# Deployment Guide - EmPulse Music

## Quick Start

The app is ready for deployment. Here are the steps:

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment Options

### Railway (Recommended for Full-Stack Next.js)

Railway is ideal for deploying Next.js applications with full Docker support and easy database integration.

#### Prerequisites

1. **Railway Account:** Sign up at [railway.app](https://railway.app)
2. **Git Repository:** Push your code to GitHub, GitLab, or Bitbucket
3. **Railway CLI (Optional):** `npm i -g @railway/cli`

#### Deployment Steps

**Option 1: Deploy via Railway Dashboard (Recommended)**

1. **Create New Project:**
   - Log in to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository and branch

2. **Configure Project:**
   - Railway will automatically detect Next.js
   - If using Docker: Railway will use the `Dockerfile`
   - If using Nixpacks: Railway will auto-detect and use `railway.toml`

3. **Environment Variables (if needed):**
   - Go to your service settings
   - Click "Variables" tab
   - Add any required environment variables:
     ```
     NODE_ENV=production
     PORT=3000
     # Add your API keys here when backend is integrated
     ```

4. **Configure Port:**
   - Railway sets `PORT` automatically
   - Next.js will use this via `process.env.PORT`
   - No additional configuration needed

5. **Deploy:**
   - Railway will automatically build and deploy on every push to main branch
   - Check deployment logs in the Railway dashboard

**Option 2: Deploy via Railway CLI**

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Link to existing project (optional)
railway link

# Deploy
railway up
```

#### Railway Configuration Files

The project includes:

- **`railway.toml`** - Railway-specific configuration
- **`.railwayignore`** - Files to exclude from deployment
- **`Dockerfile`** - Docker build configuration (if using Docker)

#### Custom Domain Setup

1. In Railway dashboard, go to your service
2. Click "Settings" → "Networking"
3. Click "Generate Domain" or add your custom domain
4. Railway provides SSL certificates automatically

#### Environment Variables

Add these in Railway dashboard under Service → Variables:

```bash
# Required
NODE_ENV=production

# Optional (Railway sets automatically)
PORT=3000
RAILWAY_ENVIRONMENT=production

# Add your API keys when backend is integrated
# API_URL=https://api.yourapp.com
# DATABASE_URL=postgresql://...
```

#### Monitoring & Logs

- **View Logs:** Railway dashboard → Your service → Deployments → View logs
- **Metrics:** Dashboard shows CPU, Memory, and Network usage
- **Alerts:** Configure alerts in settings for downtime or errors

#### Automatic Deployments

Railway automatically deploys when you push to your connected branch:

- Connect your GitHub repository
- Select branch (usually `main` or `master`)
- Every push triggers a new deployment

#### Rollback

If deployment fails:

1. Go to your service in Railway dashboard
2. Click "Deployments"
3. Find previous successful deployment
4. Click "Redeploy"

#### Docker vs Nixpacks

- **Docker:** Uses the provided `Dockerfile` (recommended for full control)
- **Nixpacks:** Railway auto-detects and builds (faster, less control)

Both work - Docker is already configured in this project.

#### Troubleshooting

**Build Fails:**

- Check build logs in Railway dashboard
- Verify `package.json` scripts are correct
- Ensure all dependencies are listed

**App Crashes:**

- Check runtime logs
- Verify `PORT` environment variable is set
- Ensure `next.config.js` has `output: 'standalone'`

**Static Files Not Loading:**

- Verify `public/` folder is included
- Check `next.config.js` image domains
- Ensure build completes successfully

### Vercel (Recommended for Next.js)

1. **Connect Repository:**
   - Push code to GitHub/GitLab/Bitbucket
   - Import project in Vercel dashboard

2. **Environment Variables (if needed):**
   - No environment variables required for current mock data setup
   - Add API keys when backend is integrated

3. **Build Settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy:**
   - Vercel automatically detects Next.js and deploys
   - Custom domain can be added in settings

### Netlify

1. **Connect Repository:**
   - Import from Git provider

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables:**
   - Add any required environment variables

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t empulse-music .
docker run -p 3000:3000 empulse-music
```

## Pre-Deployment Checklist

### General Checklist

- [ ] All environment variables configured
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors
- [ ] All routes accessible
- [ ] Images optimized (consider using Next.js Image component)
- [ ] Analytics configured (if needed)
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Domain configured
- [ ] SSL certificate active

### Railway-Specific Checklist

- [ ] `railway.toml` configured (already done)
- [ ] `.railwayignore` file created (already done)
- [ ] `Dockerfile` tested locally (optional)
- [ ] Environment variables set in Railway dashboard
- [ ] Repository connected to Railway
- [ ] Branch selected for auto-deployments
- [ ] Health check endpoint configured (`/` route)
- [ ] Custom domain added (optional)

## Backend Integration

When ready to integrate backend:

1. **API Configuration:**
   - Update `lib/data.ts` to use API calls instead of mock data
   - Add API base URL to environment variables

2. **Authentication:**
   - Implement OAuth/JWT authentication
   - Protect artist routes (`/upload`, `/dashboard/artist`)

3. **File Upload:**
   - Configure S3 or CDN for audio file storage
   - Update upload component to use real API

4. **Real-time Features:**
   - WebSocket for live stream stats
   - Real-time notifications

## Performance Optimization

- Enable Next.js Image Optimization
- Implement CDN for static assets
- Enable compression (gzip/brotli)
- Set up caching headers
- Consider ISR (Incremental Static Regeneration) for static content

## Monitoring

- Set up error tracking (Sentry)
- Configure analytics (Google Analytics, Plausible)
- Monitor API response times
- Track user engagement metrics

## Security

- Enable HTTPS only
- Implement CSP headers
- Sanitize user inputs
- Rate limiting on API routes
- Regular dependency updates
