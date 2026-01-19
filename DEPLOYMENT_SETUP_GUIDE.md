# Deployment Setup Guide - Railway & Vercel

## ✅ Complete Deployment Configuration

This repository is now fully configured for deployment to both **Railway** and **Vercel** with GitHub Actions automation.

---

## 🚂 Railway Deployment

### Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Secrets**: Add these secrets to your repository:
   - `RAILWAY_TOKEN` - Get from Railway dashboard → Account Settings → Tokens
   - `RAILWAY_SERVICE_ID` - Get from your Railway service → Settings → Service ID
   - `RAILWAY_PROJECT_ID` (optional) - Get from Railway project → Settings

### Setup Steps

1. **Create Railway Project**:
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

2. **Configure Environment Variables** (in Railway dashboard):

   ```
   NODE_ENV=production
   PORT=3000 (automatically set by Railway)
   NEXT_TELEMETRY_DISABLED=1
   ```

3. **Get Service ID**:
   - In Railway dashboard, go to your service
   - Settings → Copy "Service ID"

4. **Add GitHub Secrets**:
   - Repository → Settings → Secrets and variables → Actions
   - Add `RAILWAY_TOKEN`
   - Add `RAILWAY_SERVICE_ID`
   - (Optional) Add `RAILWAY_PROJECT_ID`

5. **Automatic Deployment**:
   - Pushes to `main` or `fix-all-complete-v1` will trigger deployment
   - Check GitHub Actions tab for deployment status

### Files Configured

- ✅ `.github/workflows/railway-deploy.yml` - Railway deployment workflow
- ✅ `.github/workflows/deploy-all.yml` - Combined Railway + Vercel deployment
- ✅ `railway.toml` - Railway configuration
- ✅ `.railwayignore` - Files to exclude from deployment
- ✅ `Dockerfile` - Updated to Node 20

---

## ▲ Vercel Deployment

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Secrets**: Add these secrets to your repository:
   - `VERCEL_TOKEN` - Get from Vercel dashboard → Settings → Tokens
   - `VERCEL_ORG_ID` - Get from Vercel dashboard → Settings → General
   - `VERCEL_PROJECT_ID` - Get from your project → Settings → General

### Setup Steps

1. **Initial Project Setup** (One-time):
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import this GitHub repository
   - Vercel will auto-detect Next.js configuration
   - Deploy (this creates the project)

2. **Get Project IDs**:
   - Project Settings → General
   - Copy "Organization ID" (`VERCEL_ORG_ID`)
   - Copy "Project ID" (`VERCEL_PROJECT_ID`)

3. **Get API Token**:
   - Account Settings → Tokens
   - Create new token → Copy (`VERCEL_TOKEN`)

4. **Add GitHub Secrets**:
   - Repository → Settings → Secrets and variables → Actions
   - Add `VERCEL_TOKEN`
   - Add `VERCEL_ORG_ID`
   - Add `VERCEL_PROJECT_ID`

5. **Automatic Deployment**:
   - Pushes to `main` or `fix-all-complete-v1` will trigger deployment
   - Check GitHub Actions tab for deployment status

### Files Configured

- ✅ `.github/workflows/vercel-deploy.yml` - Vercel deployment workflow
- ✅ `.github/workflows/deploy-all.yml` - Combined Railway + Vercel deployment
- ✅ `vercel.json` - Vercel configuration with security headers
- ✅ `next.config.js` - Updated for Vercel compatibility

---

## 🔄 Combined Deployment Workflow

The `.github/workflows/deploy-all.yml` workflow deploys to both platforms simultaneously.

**To use:**

1. Ensure all secrets are configured (Railway + Vercel)
2. Push to `main` or manually trigger via GitHub Actions
3. Both deployments run in parallel

---

## 🔧 Configuration Files

### `railway.toml`

- Build configuration for Railway
- Health check settings
- Restart policies

### `vercel.json`

- Next.js framework detection
- Security headers
- Function timeouts
- Region configuration

### `Dockerfile`

- Updated to Node 20 (matches package.json)
- Multi-stage build for optimization
- Standalone output for Railway

### `next.config.js`

- Standalone output mode (required for Railway)
- Image optimization configured
- Remote patterns for Vercel
- Port handling for both platforms

---

## 🚀 Manual Deployment (If GitHub Actions Fails)

### Railway

```bash
# Install Railway CLI
curl -fsSL https://railway.app/install.sh | sh

# Login
railway login

# Link project (if not already linked)
railway link

# Deploy
railway up
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## ✅ Verification Checklist

### Railway

- [ ] Railway project created and connected to GitHub
- [ ] `RAILWAY_TOKEN` secret added to GitHub
- [ ] `RAILWAY_SERVICE_ID` secret added to GitHub
- [ ] Environment variables set in Railway dashboard
- [ ] Deployment successful in Railway dashboard
- [ ] App accessible at Railway-provided domain

### Vercel

- [ ] Vercel project created and connected to GitHub
- [ ] `VERCEL_TOKEN` secret added to GitHub
- [ ] `VERCEL_ORG_ID` secret added to GitHub
- [ ] `VERCEL_PROJECT_ID` secret added to GitHub
- [ ] Deployment successful in Vercel dashboard
- [ ] App accessible at Vercel-provided domain

---

## 🐛 Troubleshooting

### Railway Deployment Fails

1. **Check Railway CLI is installed in workflow**
   - Workflow installs it automatically

2. **Verify secrets are set**
   - Repository → Settings → Secrets → Check all Railway secrets exist

3. **Check Railway logs**
   - Railway dashboard → Deployments → View logs

4. **Verify build succeeds locally**
   ```bash
   npm run build
   ```

### Vercel Deployment Fails

1. **Check Vercel CLI token is valid**
   - Verify token in Vercel dashboard → Settings → Tokens

2. **Verify project IDs are correct**
   - Double-check `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`

3. **Check Vercel logs**
   - Vercel dashboard → Deployments → View logs

4. **Verify build succeeds locally**
   ```bash
   npm run build
   ```

### Both Deployments Fail

1. **Check GitHub Actions logs**
   - Repository → Actions → View failed workflow → Check logs

2. **Verify secrets are correctly named**
   - Must match exactly: `RAILWAY_TOKEN`, `VERCEL_TOKEN`, etc.

3. **Check branch name**
   - Workflows trigger on `main` and `fix-all-complete-v1`

4. **Verify repository permissions**
   - Ensure GitHub Actions has write permissions

---

## 📊 Deployment Status

After pushing, check:

1. **GitHub Actions**: Repository → Actions tab
2. **Railway**: Railway dashboard → Deployments
3. **Vercel**: Vercel dashboard → Deployments

---

## 🔐 Security Notes

- Never commit secrets to repository
- Use GitHub Secrets for all sensitive values
- Railway and Vercel tokens should be read-only when possible
- Review deployment logs regularly

---

## 📝 Next Steps

1. **Set up secrets** (see prerequisites above)
2. **Push to trigger deployment** or use workflow_dispatch
3. **Monitor first deployment** in both dashboards
4. **Configure custom domains** (optional)
5. **Set up monitoring** and alerts

---

**Status**: ✅ All deployment configurations complete and ready for use!
