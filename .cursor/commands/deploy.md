# Auto-Deploy Commands (MCP Deploy Tool)

## Quick Deploy

### Via NPM Scripts
```bash
# Deploy to Vercel
npm run deploy

# Deploy to Railway
npm run deploy:railway
```

### Via Direct Script
```bash
# Vercel
./scripts/deploy.sh vercel spot-music main

# Railway
./scripts/deploy.sh railway prj_xxxxxxxx main
```

### Via MCP Tool Direct
```bash
# Using deploy script
node ~/.cursor/tools/deploy-mcp.js vercel spot-music $VERCEL_TOKEN main

# Using Railway
node ~/.cursor/tools/deploy-mcp.js railway prj_xxxxxxxx $RAILWAY_TOKEN main
```

## Environment Setup

### Get Tokens

**Vercel:**
1. Go to https://vercel.com/account/tokens
2. Create new token: `v2_...`
3. Export: `export VERCEL_TOKEN=v2_your_token`

**Railway:**
1. Go to https://railway.app/settings
2. Create API token: `rlwy_...`
3. Export: `export RAILWAY_TOKEN=rlwy_your_token`

### Persist Tokens (zsh)
```bash
echo 'export VERCEL_TOKEN=v2_your_token' >> ~/.zshrc
echo 'export RAILWAY_TOKEN=rlwy_your_token' >> ~/.zshrc
source ~/.zshrc
```

## MCP Integration

### In Cursor Composer
```
@Eleven Deploy to Vercel using MCP tool
```

### Swarm + Deploy Chain
```
@Eleven MCP[git_review_and_commit] components/Player.tsx && npm run deploy
```

## Deployment Workflow

1. **Pre-deploy checks:**
   - ✅ Tests pass
   - ✅ Build succeeds
   - ✅ Git is clean (optional)

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Verify:**
   - Check deployment URL in output
   - Visit Vercel/Railway dashboard
   - Test live site

## Troubleshooting

### Token Issues
- Ensure token is exported: `echo $VERCEL_TOKEN`
- Token must have deployment permissions

### Build Failures
- Check `npm run build` locally
- Verify all dependencies installed

### Railway CLI
```bash
npm i -g @railway/cli
railway login
railway link
```

### Vercel CLI
```bash
npm i -g vercel
vercel login
vercel link
```
