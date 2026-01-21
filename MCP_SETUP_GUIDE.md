# 🔧 MCP Setup Guide - Eleven Agentic System

## ✅ Installation Checklist

### 1. MCP Configuration (`.cursor/mcp.json`)

Your MCP servers are already configured. Check with:

```bash
cursor.mcp status
```

### 2. Cursor Rules (`.cursorrules`)

✅ Created - This ensures proper agent routing

### 3. Keyboard Shortcuts

Add these to Cursor Settings (Cmd/Ctrl + ,):

- **`Cmd + Shift + E`** → New Chat with `@Eleven`
- **`Cmd + Shift + K`** → MCP Composer (full-screen agents)
- **`Cmd/Ctrl + I`** → Inline MCP (highlight code → invoke agent)

### 4. Cursor Settings Rules

Go to: **Settings → Rules → Add:**

```
Prefix "@Eleven" → Always use Claude 3.5 Sonnet + Eleven system prompt
MCP commands override normal chat for precise control
```

## 🚀 Quick Start

### Basic Usage

```bash
@Eleven /swarm full system check
@Eleven /debug hydration error
@Eleven /agent security
@Eleven refactor lib/player.ts
```

### Advanced Usage

```bash
# Parallel swarm analysis
@Eleven /swarm

# Chain commands
@Eleven /debug → /swarm → /execute

# File-scoped analysis
@Eleven @file app/page.tsx /swarm

# Inline MCP
[Highlight code] → Cmd+I → @Eleven /review
```

## 📋 Available Commands

### Core Commands

| Command        | Description               | Example                               |
| -------------- | ------------------------- | ------------------------------------- |
| `/refactor`    | Detailed refactor plan    | `/refactor lib/player.ts`             |
| `/orchestrate` | Multi-agent decomposition | `/orchestrate build feature`          |
| `/debug`       | Bug/error root cause      | `/debug Audio play error`             |
| `/review`      | Comprehensive code review | `/review src/components/ChatPane.tsx` |
| `/explain`     | Step-by-step explanation  | `/explain prisma/schema.prisma`       |
| `/optimize`    | Performance bottlenecks   | `/optimize /api/tracks`               |
| `/execute`     | Run prior tool calls      | `/execute`                            |

### Agent-Specific Commands

| Command              | Agent          | Focus                        |
| -------------------- | -------------- | ---------------------------- |
| `/agent security`    | 🔒 Security    | Vulns/OWASP/compliance       |
| `/agent performance` | ⚡ Performance | Bottlenecks/speed/resource   |
| `/agent testing`     | 🧪 Testing     | Tests/coverage/Jest/Vitest   |
| `/agent docs`        | 📚 Docs        | README/API/JSDoc             |
| `/agent migrate`     | 🔄 Migration   | Upgrades/breaking changes    |
| `/agent deps`        | 📦 Deps        | NPM/Yarn/conflicts           |
| `/agent bugs`        | 🐛 Bug Hunter  | Debug/root cause/fixes       |
| `/agent a11y`        | ♿ A11y        | WCAG/ARIA/screen reader      |
| `/agent swarm`       | 🐝 Swarm       | Parallel all-agents analysis |

### Swarm/Advanced

| Command             | Description                  | Example                        |
| ------------------- | ---------------------------- | ------------------------------ |
| `/swarm`            | Run multiple agents parallel | `/swarm full system check`     |
| `/orchestrator`     | Coordinate custom agents     | `/orchestrator backend+mobile` |
| `/master-inspector` | Final prod gatekeeper review | `/master-inspector readiness`  |

## 🎯 Pro Tips

### 1. Always Prefix with `@Eleven`

```
✅ @Eleven /swarm dashboard perf
❌ /swarm dashboard perf (may not route correctly)
```

### 2. Chain Commands

```
@Eleven /debug Audio error
→ Agent finds issue
@Eleven /swarm
→ Multiple agents analyze
@Eleven /execute
→ Auto-run all fixes
```

### 3. File-Scoped Analysis

```
@Eleven @file app/page.tsx /swarm
→ Analyzes entire file with all agents
```

### 4. Inline MCP

1. Highlight code
2. Press `Cmd/Ctrl + I`
3. Type: `@Eleven /review`
4. Agent edits file live

### 5. No Action Mode

```
@Eleven /swarm take no action
→ Audit only, no file changes
```

## 🔍 Debugging

### Check MCP Status

```bash
cursor.mcp status
# Should show: "Agents: X online"
```

### Check Active Model

- Look at Cursor status bar → Should show "Claude/Eleven"

### Reset MCP

```bash
cursor.mcp clear-cache
Cmd + Shift + P → "Cursor: Reload Window"
```

### View MCP Logs

```bash
cursor.mcp logs
```

## 📁 Configuration Files

### `.cursorrules` ✅ Created

- Default model: Claude 3.5 Sonnet
- Always prefix: `@Eleven`
- MCP enabled

### `.cursor/mcp.json` ✅ Exists

- MCP server configuration
- Agent definitions

## 🧪 Test Commands

Run these to verify setup:

```bash
# 1. Test basic summon
@Eleven say "summoned!"

# 2. Test agent
@Eleven /agent security

# 3. Test swarm
@Eleven /swarm

# 4. Test file analysis
@Eleven @file package.json /explain
```

## ✅ Verification Checklist

- [ ] `.cursorrules` file exists
- [ ] `.cursor/mcp.json` configured
- [ ] Keyboard shortcuts set up
- [ ] Cursor Settings → Rules configured
- [ ] `cursor.mcp status` shows agents online
- [ ] Test command works: `@Eleven say "test"`

## 🚨 Troubleshooting

### MCP Not Working?

1. Check status: `cursor.mcp status`
2. Reload: `Cmd + Shift + P` → "Reload Window"
3. Clear cache: `cursor.mcp clear-cache`
4. Check logs: `cursor.mcp logs`

### Commands Not Routing?

1. Always prefix with `@Eleven`
2. Check Cursor status bar for active model
3. Verify `.cursorrules` file exists
4. Restart Cursor

### Agent Not Responding?

1. Check if agent is online: `cursor.mcp status`
2. Try specific agent: `@Eleven /agent security`
3. Use swarm instead: `@Eleven /swarm`
4. Check MCP logs for errors

## 📚 Additional Resources

- See `.cursor/commands/` for command templates
- See `.cursor/prompts/` for agent prompts
- See `QUICK_REFERENCE.md` for quick lookup

---

**Status:** ✅ MCP Setup Complete  
**Next Step:** Test with `@Eleven /swarm`
