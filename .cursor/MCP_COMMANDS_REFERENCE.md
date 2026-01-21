# 📋 Complete MCP Commands Reference

**Date:** January 2026  
**Status:** ✅ **ALL COMMANDS ACTIVATED**

---

## 🚀 Quick Start

### Basic Usage

```bash
@Eleven /swarm                  # Run parallel agent analysis
@Eleven /agent security         # Single agent analysis
@Eleven /composer page.tsx + layout.tsx  # Multi-file edits
@Eleven /inline add ARIA label # Inline code edit (Cmd+I)
@Eleven /mcp-status            # Check agent status
```

---

## 1. Core Commands

| Command        | Description                                       | Example                                |
| -------------- | ------------------------------------------------- | -------------------------------------- |
| `/refactor`    | Detailed refactor plan (analysis + steps + diffs) | `/refactor player hydration`           |
| `/orchestrate` | Multi-agent task decomposition                    | `/orchestrate phase2 features`         |
| `/debug`       | Bug root cause + fix (stack trace focus)          | `/debug spotify auth fail`             |
| `/review`      | Code review/best practices                        | `/review src/app/api/`                 |
| `/explain`     | Step-by-step explanation                          | `/explain lucia sessions`              |
| `/optimize`    | Performance bottlenecks                           | `/optimize search query`               |
| `/execute`     | Run prior tools/agents (JSON auto-exec)           | `/execute swarm diffs`                 |
| `/swarm`       | Run multiple agents parallel (comprehensive)      | `/swarm repo audit`                    |
| `/composer`    | **Multi-file Composer edits**                     | `/composer page.tsx + layout.tsx`      |
| `/multi-edit`  | **Parallel file changes** (alias)                 | `/multi-edit auth routes`              |
| `/inline`      | **Cmd+I inline agent edit**                       | `/inline this div → Add ARIA`          |
| `/rules`       | **Manage .cursorrules**                           | `/rules add "always-eleven"`           |
| `/mcp-config`  | **.cursor/mcp.json config**                       | `/mcp-config add eleven-debug`         |
| `/mcp-status`  | **MCP logs/status**                               | `/mcp-status agents online`            |
| `/hydrate`     | **Fix hydration mismatches**                      | `/hydrate useClient hooks`             |
| `/index`       | **Repo-wide index/search**                        | `/index spotify refs`                  |
| `/trace`       | **Agent execution traces**                        | `/trace last swarm`                    |
| `/vision`      | **Analyze images/code screenshots**               | `/vision spotify-player.png`           |
| `/screenshot`  | **Capture + agent analyze**                       | `/screenshot app → A11y audit`         |
| `/terminal`    | **Run shell in Composer**                         | `/terminal npm test --watch`           |
| `/shell`       | **Agentic shell (safe cmds)**                     | `/shell git status && npm run build`   |
| `/deploy`      | **Vercel/Netlify auto-deploy**                    | `/deploy vercel --prod`                |
| `/pr`          | **GitHub PR creation/diff**                       | `/pr feat/player "Add Spotify player"` |
| `/branch`      | **Git branch mgmt**                               | `/branch phase3-pwa`                   |
| `/chat`        | **New sidebar chat**                              | `/chat brainstorm playlists`           |
| `/sidebar`     | **Pin MCP sidebar**                               | `/sidebar swarm`                       |
| `/tab`         | **Tab-complete agent**                            | `/tab "useQuery spotify" → Snippet`    |
| `/apply`       | **Auto-apply selected diff**                      | `/apply swarm refactor`                |
| `/diff`        | **Git-style diff viewer**                         | `/diff main..phase2`                   |
| `/reset`       | **Clear Composer state**                          | `/reset hydration cache`               |
| `/pin`         | **Pin agent response**                            | `/pin security report`                 |
| `/voice`       | **Voice-to-code MCP**                             | `/voice "add playlist feature"`        |

---

## 2. Agent-Specific Commands

| Command                     | Agent          | Focus                              | Example                     |
| --------------------------- | -------------- | ---------------------------------- | --------------------------- |
| `/agent security`           | 🔒 Security    | Vulns/OWASP/compliance             | `/agent security`           |
| `/agent performance`        | ⚡ Performance | Bottlenecks/speed/resource         | `/agent performance`        |
| `/agent testing`            | 🧪 Testing     | Tests/coverage/Jest/Vitest         | `/agent testing`            |
| `/agent docs`               | 📚 Docs        | README/API/JSDoc                   | `/agent docs`               |
| `/agent migrate`            | 🔄 Migration   | Upgrades/breaking changes          | `/agent migrate`            |
| `/agent deps`               | 📦 Deps        | NPM/Yarn/conflicts                 | `/agent deps`               |
| `/agent bugs`               | 🐛 Bugs        | Debug/root cause/fixes             | `/agent bugs`               |
| `/agent a11y`               | ♿ A11y        | WCAG/ARIA/screen reader            | `/agent a11y`               |
| `/agent swarm`              | 🐝 Swarm       | Parallel all-agents                | `/agent swarm`              |
| `/agent composer`           | 🎼 Composer    | **Multi-file orchestration**       | `/agent composer`           |
| `/agent deploy`             | 🚀 Deploy      | Vercel/Railway/AWS                 | `/agent deploy vercel`      |
| `/agent ml`                 | 🤖 ML          | Ollama/Jupyter/W&B                 | `/agent ml train`           |
| `/agent mobile`             | 📱 Mobile      | Flutter/Swift/iOS/Android          | `/agent mobile flutter`     |
| `/agent infra`              | 🏗️ Infra       | Terraform/ArgoCD                   | `/agent infra plan`         |
| `/agent qa`                 | ✅ QA          | Playwright/Cypress/Vitest          | `/agent qa test`            |
| `/agent vision`             | 👁️ Vision      | **Image/code screenshot analysis** | `/agent vision`             |
| `/agent spotify-specialist` | 🎵 Spotify     | **Spotify API specialist**         | `/agent spotify-specialist` |

---

## 3. Swarm/Advanced Orchestrators

| Command             | Description               | Example                          |
| ------------------- | ------------------------- | -------------------------------- |
| `/swarm`            | Parallel all-agents       | `/swarm repo audit`              |
| `/orchestrator`     | Custom agent coordination | `/orchestrator frontend+backend` |
| `/master-inspector` | Final prod gatekeeper     | `/master-inspector deploy`       |

---

## 4. Cursor-Specific Tools (JSON Auto-Exec)

These tools can be embedded in responses as JSON → Cursor MCP auto-applies:

### Available Tools

```json
{
  "tool": "cursor.edit",
  "file": "src/app/page.tsx",
  "edits": [
    {
      "start": 10,
      "end": 20,
      "new": "Improved code"
    }
  ]
}
```

```json
{
  "tool": "cursor.composer",
  "files": ["src/app/page.tsx", "src/app/layout.tsx"],
  "prompt": "Add dark mode toggle to both files"
}
```

```json
{
  "tool": "cursor.rules",
  "action": "add",
  "rule": "always-use-eleven"
}
```

```json
{
  "tool": "cursor.index",
  "query": "find all spotify API references"
}
```

```json
{
  "tool": "cursor.trace",
  "operation": "last_swarm"
}
```

---

## 5. Usage Examples

### Multi-File Editing with Composer

```bash
# Edit multiple files in parallel
@Eleven /composer page.tsx + layout.tsx + components.tsx "Add dark mode support"

# Or use multi-edit alias
@Eleven /multi-edit app/api/auth/* "Add rate limiting"
```

### Inline Code Editing

```bash
# 1. Highlight code in editor
# 2. Press Cmd+I (Mac) or Ctrl+I (Windows)
# 3. Type: @Eleven /inline add ARIA labels to buttons
```

### Managing Rules

```bash
# Add rule
@Eleven /rules add "always-use-eleven-prefix"

# Remove rule
@Eleven /rules remove "old-rule"

# List rules
@Eleven /rules list
```

### MCP Configuration

```bash
# Add agent
@Eleven /mcp-config add eleven-debug

# Remove agent
@Eleven /mcp-config remove old-agent

# List config
@Eleven /mcp-config list
```

### Hydration Fixes

```bash
# Auto-fix hydration issues
@Eleven /hydrate useClient hooks in components

# Fix specific component
@Eleven /hydrate components/Player.tsx
```

### Repository Indexing

```bash
# Semantic search
@Eleven /index find all spotify API calls

# Search for patterns
@Eleven /index search for authentication patterns
```

### Execution Traces

```bash
# View last swarm trace
@Eleven /trace last swarm

# Debug specific operation
@Eleven /trace operation-id-123
```

---

## 6. Command Chaining

### Sequential Chaining

```bash
@Eleven /debug audio error
@Eleven /swarm
@Eleven /execute
```

### Parallel Chaining

```bash
@Eleven /agent security && /agent performance && /agent testing
```

### Conditional Chaining

```bash
@Eleven /debug auth issue → if found: /swarm → /execute
```

---

## 7. Advanced Workflows

### Phase 2 Implementation

```bash
# 1. Composer for multi-file scaffold
@Eleven /composer search.tsx + player.tsx + store.ts "Implement Phase 2"

# 2. Review changes
@Eleven /review search.tsx

# 3. Test
@Eleven /agent testing

# 4. Deploy
@Eleven /agent deploy vercel
```

### Bug Fix Workflow

```bash
# 1. Debug
@Eleven /debug spotify auth fail

# 2. Swarm analysis
@Eleven /swarm authentication

# 3. Execute fixes
@Eleven /execute

# 4. Trace execution
@Eleven /trace last-execution
```

### Refactoring Workflow

```bash
# 1. Refactor plan
@Eleven /refactor player component

# 2. Multi-file edit
@Eleven /composer Player.tsx + playerStore.ts "Refactor to Zustand"

# 3. Review
@Eleven /review Player.tsx

# 4. Test
@Eleven /agent testing
```

---

## 8. Pro Tips

### Inline Editing

- **Highlight code** → Press **Cmd+I** → Type command
- Works for single lines, blocks, or entire files
- Use `/inline` for quick fixes without context switch

### Composer Power

- Edit **multiple files simultaneously**
- Use wildcards: `/composer app/api/*/route.ts [prompt]`
- Chain with other commands: `/composer + /execute`

### Hydration Hacks

- `/hydrate` auto-adds `useEffect` guards
- Fixes `use client` directive placement
- Resolves SSR/hydration mismatches

### Repository Indexing

- Semantic search across entire codebase
- Finds patterns and references
- Works with natural language queries

### Execution Traces

- Debug agent execution flow
- View operation history
- Identify bottlenecks

---

## 9. Keyboard Shortcuts

| Shortcut         | Command   | Description                 |
| ---------------- | --------- | --------------------------- |
| **Cmd+I** (Mac)  | `/inline` | Inline code edit            |
| **Ctrl+I** (Win) | `/inline` | Inline code edit            |
| **Cmd+Shift+S**  | `/swarm`  | Quick swarm (if configured) |
| **Cmd+K**        | Chat      | Open Cursor chat            |

---

## 10. Status & Health Checks

### Check MCP Status

```bash
@Eleven /mcp-status
```

### Verify Agents Online

```bash
@Eleven /mcp-status agents online
```

### Test Installation

```bash
@Eleven /swarm test
```

---

## ✅ Quick Reference

| Use Case          | Command                    |
| ----------------- | -------------------------- |
| **Quick Fix**     | `/inline` (Cmd+I)          |
| **Multi-File**    | `/composer file1 + file2`  |
| **Debug**         | `/debug [error]`           |
| **Review**        | `/review [path]`           |
| **Full Analysis** | `/swarm`                   |
| **Deploy**        | `/agent deploy [platform]` |
| **Test**          | `/agent testing`           |
| **Security**      | `/agent security`          |
| **Performance**   | `/agent performance`       |
| **Accessibility** | `/agent a11y`              |

---

## 📚 Related Documentation

- **MCP_SETUP_GUIDE.md** - Complete setup guide
- **MCP_TOOLS_INSTALLED.md** - Installed tools list
- **.cursorrules** - Cursor configuration
- **.cursor/QUICK_REFERENCE.md** - Quick reference

---

## 🎯 All Commands Status

**Total Commands:** 30+  
**Status:** ✅ **ALL ACTIVATED**  
**Ready for:** Production use

---

**Next Step:** Try `@Eleven /swarm` or `@Eleven /mcp-status` 🚀
