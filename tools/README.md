# 🛠️ MCP Tools Directory

This directory contains custom MCP (Multi-Chat Protocol) tools for agent orchestration.

## Available Tools

### ✅ qa-mcp.js

**QA Automation Tool** - Playwright, Cypress, Vitest, Load Testing

```bash
# Usage
node tools/qa-mcp.js [framework] [action] [target]

# Frameworks
- playwright: Playwright E2E testing
- cypress: Cypress E2E testing
- vitest: Vitest unit/integration testing
- load: Load/performance testing (k6)

# Actions
- test: Run tests
- ui: Open test UI
- headed: Run in headed mode
- debug: Debug mode
- report: Generate test report

# Examples
npm run qa playwright test
npm run qa cypress ui
npm run qa vitest test --coverage
npm run qa load test
```

### ✅ soundcloud-mcp.js

**SoundCloud Integration Tool** - Download SoundCloud tracks

```bash
# Usage
npm run soundcloud:import [url]
```

## Package.json Scripts

All tools can be invoked via npm scripts:

- `npm run qa` - QA automation
- `npm run test:mcp` - Testing via MCP
- `npm run ml` - ML training/deployment
- `npm run mobile` - Mobile app testing
- `npm run security` - Security scanning
- `npm run infra` - Infrastructure-as-code
- `npm run deploy:mcp` - Deploy via MCP
- `npm run soundcloud:import` - SoundCloud import

## MCP Integration

These tools are configured in `.cursor/mcp.json` and accessible via:

```bash
@Eleven /agent qa
@Eleven /agent security
@Eleven /agent deploy
```

See `MCP_SETUP_GUIDE.md` for full documentation.
