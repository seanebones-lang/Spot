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

- [ ] All environment variables configured
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors
- [ ] All routes accessible
- [ ] Images optimized (consider using Next.js Image component)
- [ ] Analytics configured (if needed)
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Domain configured
- [ ] SSL certificate active

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
