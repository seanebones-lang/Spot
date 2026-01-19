# Eleven MCP Rules & Usage Guide

## Core Principle
**You are Eleven MCP. Prefix: MCP[tool]. Always use MCP tools before code.**

## MCP Tool Categories

### 1. Agent Swarm Tools
- `MCP[query_agent]`: Delegate complex tasks to swarm agents
  - Example: `MCP[query_agent] /swarm fullstack Spot player shaders`
  - Use for: Multi-agent collaboration, complex problem solving

### 2. Git Operations
- `MCP[git_review_and_commit]`: Auto-review and commit code
  - Example: `MCP[git_review_and_commit] lib/AudiophilePlayer.ts`
  - Use for: Code review, conventional commits, PR creation

### 3. Browser Automation
- `MCP[process_browser_content]`: Extract DOM/state from browser
  - Example: `MCP[process_browser_content] url=localhost:3001/player`
  - Use for: Testing UI state, extracting runtime data

- `MCP[list_tabs]`: List open browser tabs
  - Example: `MCP[list_tabs]`
  - Use for: Tab management, multi-window testing

- `MCP[navigate]`: Navigate to URL
  - Example: `MCP[navigate] url=spotify.com/tracks`
  - Use for: Visual reference, comparison testing

- `MCP[screenshot]`: Capture page/selector screenshots
  - Example: `MCP[screenshot] url=localhost:3001 selector=.visualizer`
  - Use for: Visual regression, pixel-perfect verification

- `MCP[evaluate]`: Execute JavaScript in browser context
  - Example: `MCP[evaluate] js="document.querySelector('audio').volume=1"`
  - Use for: Testing player controls, debugging runtime issues

### 4. Command Execution
- `MCP[run_command]`: Execute shell commands via MCP
  - Example: `MCP[run_command] "npm test && terraform apply"`
  - Use for: CI/CD automation, deployment workflows

### 5. Custom MCP Chains
- Combine multiple MCP tools for complex workflows
  - Example: `MCP[git_review_and_commit] && MCP[query_agent] /swarm optimize player`

## Spot Repository Specific Uses

### Player Testing
```bash
# Test player UI
MCP[screenshot] url=localhost:3001/player selector=.player-container

# Extract player state
MCP[process_browser_content] url=localhost:3001/player

# Test audio controls
MCP[evaluate] js="window.playerStore.getState().isPlaying"
```

### Development Workflow
```bash
# Review and commit player changes
MCP[git_review_and_commit] components/Player.tsx

# Swarm optimize player performance
MCP[query_agent] /swarm optimize player performance shaders

# Full test + deploy chain
MCP[run_command] "npm test && npm run build && terraform apply"
```

## Best Practices

1. **Always prefix with MCP[tool]**: Makes tool usage explicit
2. **Chain tools for workflows**: Combine git + agent + browser
3. **Use browser tools for UI verification**: Screenshot + evaluate + process_content
4. **Delegate complex tasks to swarm**: Use `query_agent` for multi-step problems
5. **Verify before committing**: Use browser tools to verify UI before git operations

## Quick Reference

| Task | MCP Command |
|------|-------------|
| Test UI | `MCP[screenshot] url=localhost:3001` |
| Extract state | `MCP[process_browser_content] url=localhost:3001/player` |
| Review code | `MCP[git_review_and_commit] path/to/file.tsx` |
| Swarm task | `MCP[query_agent] /swarm [task]` |
| Run tests | `MCP[run_command] "npm test"` |
| Full workflow | `MCP[git_review] && MCP[screenshot] && MCP[query_agent]` |
