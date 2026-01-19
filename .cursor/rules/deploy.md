# Deployment Rules

## Auto-Deploy on Merge

When code is merged to main/master, automatically trigger deployment via MCP.

## Deployment Workflow

### Pre-Deploy Checks
1. ✅ All tests pass: `MCP[tester] "npm test"`
2. ✅ Build succeeds: `npm run build`
3. ✅ No lint errors: `npm run lint`

### Deploy Trigger
```
MCP[deploy] vercel spot-music $VERCEL_TOKEN
```

### Post-Deploy
1. Verify deployment URL
2. Run smoke tests
3. Notify team (if configured)

## Deployment Rules

### Automatic Deploy
- **Trigger**: Merge to `main` branch
- **Platform**: Vercel (production)
- **Railway**: Manual or staging only

### Manual Deploy
```bash
# Via npm script
npm run deploy

# Via MCP tool
node tools/deploy-mcp.js vercel spot-music $VERCEL_TOKEN
```

### Rollback
If deployment fails or issues detected:
1. Revert merge commit
2. Deploy previous version
3. Investigate issues
4. Re-deploy after fixes

## Environment Variables

- `VERCEL_TOKEN` - Required for Vercel deployments
- `RAILWAY_TOKEN` - Required for Railway deployments
- Store in `.env.local` (never commit)

## Deployment Gates

- ❌ Don't deploy if tests fail
- ❌ Don't deploy if build fails
- ❌ Don't deploy if lint errors
- ✅ Always deploy from clean git state
