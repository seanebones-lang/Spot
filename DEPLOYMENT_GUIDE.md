# Production Deployment Guide
**EmPulse Music Backend**  
**Version:** 1.0.0  
**Date:** January 14, 2026

---

## 📋 Pre-Deployment Checklist

### ✅ Code Complete
- [x] Database schema defined
- [x] All API endpoints implemented
- [x] Security measures in place
- [x] Error handling implemented
- [x] Logging configured

### ⚙️ Infrastructure Setup Required

#### 1. Database (PostgreSQL)
- [ ] Create PostgreSQL database (Supabase, Neon, AWS RDS, or self-hosted)
- [ ] Get connection string
- [ ] Set `DATABASE_URL` environment variable

#### 2. Email Service (Resend)
- [ ] Create account at [resend.com](https://resend.com)
- [ ] Verify domain (optional but recommended)
- [ ] Get API key
- [ ] Set `RESEND_API_KEY` environment variable

#### 3. Cloud Storage (S3 or R2)
**Option A: AWS S3**
- [ ] Create S3 bucket
- [ ] Configure CORS policy
- [ ] Create IAM user with S3 permissions
- [ ] Set AWS environment variables

**Option B: Cloudflare R2 (Recommended - Cheaper)**
- [ ] Create R2 bucket
- [ ] Get account ID and credentials
- [ ] Set up custom domain (optional)
- [ ] Set R2 environment variables

#### 4. Redis (Upstash)
- [ ] Create account at [upstash.com](https://upstash.com)
- [ ] Create Redis database
- [ ] Get REST URL and token
- [ ] Set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

---

## 🚀 Deployment Steps

### Step 1: Environment Setup

Create `.env.production` or set environment variables in your hosting platform:

```bash
# ============================================
# REQUIRED
# ============================================
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:password@host:5432/database?connection_limit=10&pool_timeout=20

# Authentication
JWT_SECRET=your-64-character-secret-key-minimum-32-chars
# Generate with: openssl rand -base64 32

# Application URLs
NEXT_PUBLIC_APP_URL=https://yourdomain.com
API_URL=https://yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# ============================================
# EMAIL (Resend)
# ============================================
RESEND_API_KEY=re_your_api_key_here
EMAIL_FROM=noreply@yourdomain.com
EMAIL_FROM_NAME=EmPulse Music

# ============================================
# STORAGE (Choose S3 or R2)
# ============================================

# Option 1: AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=empulse-uploads

# Option 2: Cloudflare R2 (Recommended)
R2_ACCOUNT_ID=your_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=empulse-uploads
R2_ENDPOINT=https://xxx.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://cdn.yourdomain.com

# ============================================
# RATE LIMITING (Upstash Redis)
# ============================================
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token

# ============================================
# OPTIONAL BUT RECOMMENDED
# ============================================

# Encryption (for sensitive data like W-9 forms)
# Generate with: openssl rand -hex 32
ENCRYPTION_KEY=your_64_character_hex_key

# xAI Grok API (for AI features)
XAI_API_KEY=xai_your_key_here

# File Upload Limits
MAX_FILE_SIZE_MB=50
MAX_AUDIO_SIZE_MB=50
```

### Step 2: Database Migration

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations to create database schema
npx prisma migrate deploy

# (Optional) Seed initial data if you have a seed script
npm run db:seed
```

### Step 3: Build Application

```bash
# Build Next.js application
npm run build

# Test production build locally (optional)
npm start
```

### Step 4: Deploy to Hosting Platform

#### Option A: Vercel (Recommended for Next.js)

1. Connect your GitHub repository to Vercel
2. Add all environment variables in Vercel dashboard
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Deploy!

#### Option B: Railway

1. Create new project on Railway
2. Connect GitHub repository
3. Add environment variables
4. Railway auto-detects Next.js and deploys

#### Option C: Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Step 5: Post-Deployment Verification

#### 1. Health Check
```bash
curl https://yourdomain.com/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-14T...",
  "uptime": 123.45,
  "checks": {
    "environment": { "status": "ok" },
    "database": { "status": "ok" },
    "memory": { "status": "ok", "message": "Memory usage: 45.23%" },
    "responseTime": { "status": "ok", "message": "15ms" }
  }
}
```

#### 2. Startup Check
```bash
curl https://yourdomain.com/api/startup-check
```

#### 3. Test Authentication Flow
```bash
# Register user
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","name":"Test User"}'

# Login
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'
```

#### 4. Test CSRF Protection
```bash
# Get CSRF token
curl https://yourdomain.com/api/csrf-token

# Use token in subsequent requests
curl -X POST https://yourdomain.com/api/tracks/submit \
  -H "Content-Type: application/json" \
  -H "X-CSRF-Token: YOUR_TOKEN_HERE" \
  -H "Cookie: csrf-token=YOUR_TOKEN_HERE"
```

---

## 🔒 Security Checklist

- [ ] `JWT_SECRET` is at least 32 characters (64+ recommended)
- [ ] `ENCRYPTION_KEY` is set (64 hex characters)
- [ ] `ALLOWED_ORIGINS` only includes your domains
- [ ] Database uses SSL/TLS connection
- [ ] HTTPS enabled for all traffic
- [ ] Security headers are present (check with securityheaders.com)
- [ ] Rate limiting is working (test with multiple requests)
- [ ] CSRF protection is working (test without token)

---

## 📊 Monitoring Setup

### 1. Health Check Monitoring

Set up uptime monitoring (e.g., UptimeRobot, Pingdom) to check:
- `/api/health` endpoint
- Expected status: 200 with `"status": "healthy"`

### 2. Error Tracking

Consider integrating:
- **Sentry** - Error tracking
- **Datadog** - Full APM
- **CloudWatch** - AWS native monitoring

### 3. Log Aggregation

Forward logs to:
- **Datadog** - Structured logs
- **CloudWatch** - AWS logs
- **Logtail** - Simple log aggregation

---

## 🔧 Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# Check Prisma connection
npx prisma db pull
```

### Email Not Sending

1. Check `RESEND_API_KEY` is set
2. Verify domain in Resend dashboard
3. Check email logs in Resend dashboard
4. Verify `EMAIL_FROM` matches verified domain

### File Upload Issues

1. Check S3/R2 credentials
2. Verify bucket exists and is accessible
3. Check CORS configuration on bucket
4. Verify environment variables are set

### Rate Limiting Not Working

1. Check Redis connection:
```bash
curl $UPSTASH_REDIS_REST_URL/ping -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

2. Verify environment variables
3. Check logs for Redis connection errors

---

## 📈 Performance Optimization

### 1. Database Indexing

Ensure indexes are created:
```sql
-- Check indexes
SELECT tablename, indexname FROM pg_indexes WHERE schemaname = 'public';
```

### 2. Connection Pooling

Already configured in Prisma. Adjust in `DATABASE_URL`:
```
?connection_limit=10&pool_timeout=20
```

### 3. CDN Setup

For Cloudflare R2:
1. Set up Cloudflare CDN
2. Point custom domain to R2 bucket
3. Enable caching headers

---

## 🔄 Rollback Procedure

If deployment fails:

1. **Database Rollback:**
```bash
npx prisma migrate resolve --rolled-back <migration_name>
```

2. **Revert Deployment:**
   - Vercel: Use deployment history to rollback
   - Railway: Use deployment history
   - Docker: Deploy previous image tag

3. **Environment Variables:**
   - Keep previous values in backup
   - Restore if needed

---

## 📞 Support

### Common Issues:

**Error: "Database connection failed"**
- Check `DATABASE_URL` format
- Verify database is accessible
- Check firewall rules

**Error: "CSRF token validation failed"**
- Ensure client includes token in header
- Check cookie is set
- Verify same-origin policy

**Error: "Cloud storage not configured"**
- Set S3 or R2 environment variables
- Verify credentials are correct

---

## ✅ Post-Deployment Checklist

- [ ] Health check endpoint returns 200
- [ ] Database migrations completed
- [ ] User registration works
- [ ] Email verification emails sent
- [ ] Login works
- [ ] File upload works
- [ ] Rate limiting works
- [ ] CSRF protection works
- [ ] Logs are being collected
- [ ] Monitoring alerts configured
- [ ] Backup strategy in place

---

**Last Updated:** January 14, 2026  
**Maintained By:** Backend Team
