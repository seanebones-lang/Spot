# Production Setup Guide

This guide will help you configure and deploy EmPulse Music to production.

## 🚀 Quick Start

### 1. Environment Variables Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` and set all required variables (see below).

### 2. Generate JWT Secret

**CRITICAL**: Generate a secure JWT secret before deploying:

```bash
# Generate a secure 32+ character random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and set it as `JWT_SECRET` in your `.env.local` file.

### 3. Verify Configuration

Test your configuration:

```bash
# Start the development server
npm run dev

# In another terminal, check startup validation
curl http://localhost:3001/api/startup-check

# Check health endpoint
curl http://localhost:3001/api/health
```

Both endpoints should return `200 OK` if configuration is correct.

## 📋 Required Environment Variables

### Critical (App won't start without these)

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT tokens (min 32 chars) | `a1b2c3d4e5f6...` (generated) |
| `NODE_ENV` | Environment mode | `production` |

### Recommended for Production

| Variable | Description | Example |
|----------|-------------|---------|
| `XAI_API_KEY` | xAI Grok API key for AI features | `xai-...` |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins | `https://yourdomain.com` |
| `NEXT_PUBLIC_API_URL` | Public API URL (if different from app URL) | `https://api.yourdomain.com` |
| `API_URL` | Internal API URL | `https://api.yourdomain.com` |

## 🔒 Security Checklist

Before deploying to production:

- [ ] `JWT_SECRET` is set and is 32+ characters
- [ ] `JWT_SECRET` is NOT the default value
- [ ] `NODE_ENV` is set to `production`
- [ ] `ALLOWED_ORIGINS` includes only your domain(s)
- [ ] All API keys are set and valid
- [ ] `.env.local` is in `.gitignore` (never commit secrets)
- [ ] Secrets are stored securely in your deployment platform

## 🏗️ Deployment Platforms

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all variables from `.env.example`
4. Deploy

### Railway

1. Connect your GitHub repository
2. Add environment variables:
   ```bash
   railway variables set JWT_SECRET=your-secret-here
   railway variables set NODE_ENV=production
   # ... etc
   ```
3. Deploy

### Docker

1. Build the image:
   ```bash
   docker build -t empulse-music .
   ```

2. Run with environment variables:
   ```bash
   docker run -p 3000:3000 \
     -e JWT_SECRET=your-secret \
     -e NODE_ENV=production \
     empulse-music
   ```

   Or use a `.env` file:
   ```bash
   docker run -p 3000:3000 --env-file .env.local empulse-music
   ```

## ✅ Post-Deployment Verification

After deploying, verify everything works:

1. **Health Check**:
   ```bash
   curl https://yourdomain.com/api/health
   ```
   Should return `200 OK` with health status.

2. **Startup Check**:
   ```bash
   curl https://yourdomain.com/api/startup-check
   ```
   Should return `200 OK` if configuration is valid.

3. **Security Headers**:
   ```bash
   curl -I https://yourdomain.com
   ```
   Verify these headers are present:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Content-Security-Policy: ...`

4. **CORS**:
   Test from your frontend domain - should work.
   Test from unauthorized domain - should be blocked.

5. **Rate Limiting**:
   Make multiple rapid requests to `/api/auth/login` - should get `429` after limit.

## 🐛 Troubleshooting

### "JWT_SECRET is not configured"

- Ensure `JWT_SECRET` is set in your environment variables
- Check that it's at least 32 characters long
- Verify it's not the default value `your-secret-key-change-in-production`

### "CORS policy: Origin not allowed"

- Add your domain to `ALLOWED_ORIGINS` environment variable
- Format: `https://yourdomain.com,https://www.yourdomain.com` (comma-separated)
- Restart your application after changing

### Health check returns 503

- Check the health endpoint response for specific error messages
- Verify all required environment variables are set
- Check application logs for detailed error information

### Rate limiting not working

- Rate limiting is in-memory (single instance)
- For multi-instance deployments, consider Redis-based rate limiting
- See `lib/rateLimit.ts` for configuration

## 📊 Monitoring

### Health Monitoring

Set up monitoring to check:
- `/api/health` endpoint (should return 200)
- Response time should be < 100ms
- Memory usage should be < 90%

### Error Tracking

Consider integrating:
- **Sentry** for error tracking
- **Datadog** or **New Relic** for APM
- **LogRocket** for session replay

### Logs

All API routes now include structured logging with:
- Correlation IDs for request tracking
- Request/response logging
- Error logging with stack traces

## 🔄 Next Steps

1. **Database Integration**: Implement database connections (see comments in API routes)
2. **Cloud Storage**: Migrate file uploads to S3/Cloudflare R2
3. **Redis Rate Limiting**: For distributed deployments
4. **Error Tracking**: Integrate Sentry or similar
5. **Monitoring**: Set up APM and alerting

## 📚 Additional Resources

- [Production Readiness Audit](./PRODUCTION_READINESS_AUDIT.md) - Full audit report
- [Production Fixes Complete](./PRODUCTION_FIXES_COMPLETE.md) - List of all fixes
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

---

**Need Help?** Check the logs or review the error messages - they're designed to be helpful!
