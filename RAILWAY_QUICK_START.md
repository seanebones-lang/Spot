# Railway Quick Start Deployment

## 🚀 Fastest Way to Deploy

### Step 1: Connect GitHub (Recommended)

1. **Go to Railway Dashboard**: https://railway.app/project/109bb4f8-7620-422c-8360-3b0298f9fb90
2. **Click "+ Create"** or **"Add a Service"**
3. **Select "GitHub Repo"**
4. **Authorize Railway** to access your GitHub
5. **Select your repository** (the one containing this code)
6. **Railway auto-detects** Next.js and starts deploying!

### Step 2: Set Environment Variables

Once the service is created:

1. Click on your **service name**
2. Go to **"Variables"** tab
3. Add these variables:

```
JWT_SECRET=<generate with: openssl rand -base64 32>
XAI_API_KEY=<your-xai-api-key>
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Step 3: Wait for Deployment

Railway will:

- ✅ Install dependencies
- ✅ Build your Next.js app
- ✅ Deploy to production
- ✅ Provide a `.railway.app` domain

## 📋 Project Details

- **Project ID**: `109bb4f8-7620-422c-8360-3b0298f9fb90`
- **Workspace ID**: `16b963d0-f37c-49bc-baa9-efb2eb901503`
- **Token**: `0be18ca8-43bf-4a21-ae29-b0a5f7903b08`

## 🔧 Alternative: Railway CLI

If you prefer CLI:

```bash
# 1. Install Railway CLI (if not installed)
npm i -g @railway/cli

# 2. Login (opens browser)
railway login

# 3. Link to project
railway link --project 109bb4f8-7620-422c-8360-3b0298f9fb90

# 4. Deploy
railway up
```

## ✅ What's Already Configured

- ✅ `Dockerfile` - Multi-stage build for Next.js
- ✅ `railway.toml` - Railway configuration
- ✅ `.railwayignore` - Files to exclude
- ✅ `next.config.js` - Standalone output enabled

## 🎯 After Deployment

1. **Get your URL**: Railway provides a `.railway.app` domain
2. **Test your API**: Visit `https://your-app.railway.app/api/health` (if you add one)
3. **Set custom domain** (optional): In service settings → Networking

## 📊 Monitor Deployment

- **Logs**: Railway dashboard → Service → Logs
- **Metrics**: Railway dashboard → Observability
- **Status**: Railway dashboard → Deployments

## 🆘 Troubleshooting

**Build fails?**

- Check logs in Railway dashboard
- Verify all dependencies in `package.json`

**Service won't start?**

- Check environment variables are set
- Verify `JWT_SECRET` and `XAI_API_KEY` are configured

**Need help?**

- Railway Docs: https://docs.railway.app
- Railway Support: support@railway.app
