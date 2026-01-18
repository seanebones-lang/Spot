# Railway Deployment Guide

## Project Information

- **Project ID**: `109bb4f8-7620-422c-8360-3b0298f9fb90`
- **Workspace ID**: `16b963d0-f37c-49bc-baa9-efb2eb901503`
- **Railway Token**: `0be18ca8-43bf-4a21-ae29-b0a5f7903b08`

## Quick Deploy

### Option 1: Railway Dashboard (Recommended)

1. Go to [Railway Dashboard](https://railway.app/project/109bb4f8-7620-422c-8360-3b0298f9fb90)
2. Click **"+ Create"** or **"Add a Service"**
3. Select **"GitHub Repo"** or **"Deploy from GitHub"**
4. Connect your GitHub repository
5. Railway will auto-detect Next.js and deploy automatically

### Option 2: Railway CLI

```bash
# Set Railway token
export RAILWAY_TOKEN="0be18ca8-43bf-4a21-ae29-b0a5f7903b08"

# Link to project
railway link --project 109bb4f8-7620-422c-8360-3b0298f9fb90

# Deploy
railway up
```

### Option 3: GitHub Integration (Auto-Deploy)

1. Push your code to GitHub
2. In Railway dashboard, connect your GitHub repository
3. Railway will automatically deploy on every push to `main` branch

## Configuration Files

### `railway.toml`
Already created with Dockerfile build configuration.

### `Dockerfile`
Multi-stage build optimized for Next.js production.

## Environment Variables

Set these in Railway dashboard under your service → Variables:

### Required
```env
# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-jwt-secret-key-change-in-production

# xAI Grok API Key
XAI_API_KEY=xai-your-api-key-here
```

### Optional
```env
# Node Environment
NODE_ENV=production

# Port (Railway sets this automatically)
PORT=3000

# Next.js Telemetry
NEXT_TELEMETRY_DISABLED=1
```

## Setting Environment Variables in Railway

1. Go to your service in Railway dashboard
2. Click on **"Variables"** tab
3. Click **"+ New Variable"**
4. Add each variable:
   - `JWT_SECRET` = (generate a secure random string)
   - `XAI_API_KEY` = (your xAI API key)
   - `NODE_ENV` = `production`
   - `NEXT_TELEMETRY_DISABLED` = `1`

## Build Configuration

Railway will automatically:
- Detect `Dockerfile` and use it for builds
- Run `npm ci` to install dependencies
- Run `npm run build` to build Next.js app
- Start with `node server.js` (from standalone output)

## Deployment Process

1. **Build**: Railway builds using Dockerfile
2. **Deploy**: Deploys the built container
3. **Health Check**: Automatically checks service health
4. **Domain**: Railway provides a `.railway.app` domain

## Custom Domain (Optional)

1. Go to service → **"Settings"** → **"Networking"**
2. Click **"Generate Domain"** for Railway domain
3. Or add custom domain in **"Custom Domains"** section

## Monitoring

- **Logs**: View in Railway dashboard → Service → **"Logs"**
- **Metrics**: View in **"Observability"** tab
- **Deployments**: View in **"Deployments"** tab

## Troubleshooting

### Build Fails
- Check logs in Railway dashboard
- Verify `Dockerfile` is correct
- Ensure `package.json` has all dependencies

### Service Won't Start
- Check environment variables are set
- Verify `PORT` is set (Railway sets automatically)
- Check logs for errors

### API Routes Not Working
- Verify `JWT_SECRET` is set
- Verify `XAI_API_KEY` is set
- Check API route logs

## Next Steps After Deployment

1. ✅ Set environment variables
2. ✅ Verify deployment is running
3. ✅ Test API endpoints
4. ✅ Set up custom domain (optional)
5. ✅ Configure auto-deploy from GitHub

## Useful Commands

```bash
# View logs
railway logs

# Open service in browser
railway open

# Check service status
railway status

# View environment variables
railway variables
```

## Support

- Railway Docs: https://docs.railway.app
- Railway Dashboard: https://railway.app/project/109bb4f8-7620-422c-8360-3b0298f9fb90
