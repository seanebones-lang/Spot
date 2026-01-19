# MCP Deploy Tool Rules

## Usage Pattern
When user requests deployment, use the MCP deploy tool:

```
@Eleven Deploy Spot to production
```

Should execute:
1. Run tests: `npm test`
2. Build: `npm run build`
3. Deploy: `npm run deploy` (or `node ~/.cursor/tools/deploy-mcp.js vercel spot-music $VERCEL_TOKEN`)

## Auto-Deploy Workflow

### Standard Flow
```bash
# 1. Test
npm test

# 2. Build
npm run build

# 3. Deploy
npm run deploy
```

### With Git Commit
```bash
# 1. Review changes
git status

# 2. Commit
git add .
git commit -m "feat: update player component"

# 3. Deploy
npm run deploy
```

## Platform Selection

### Vercel (Default)
- Faster deployments
- Better Next.js integration
- Automatic preview deployments
- Use for: Frontend, static sites, Next.js apps

### Railway
- More control over infrastructure
- Better for full-stack apps
- Database hosting
- Use for: Backend APIs, databases, full-stack apps

## Error Handling

1. **Build fails**: Report error, don't deploy
2. **Tests fail**: Warn user, ask to proceed
3. **Deploy fails**: Report error, suggest manual deploy
4. **Token missing**: Prompt user to set env var

## Security

- Never commit tokens to git
- Always use environment variables
- Verify tokens have correct permissions
- Check deployment URLs before sharing
