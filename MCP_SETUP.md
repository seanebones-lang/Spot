# MCP Tools & Agents Setup

## Overview

Your MCP (Model Context Protocol) tools and agents are configured separately from VS Code extensions. They work through Cursor's MCP integration, not VS Code extensions.

## Current MCP Configuration

Your MCP servers are configured in `~/.cursor/mcp.json`:

### Configured Servers:

1. **grok-agent-mcp** - Custom Grok agent for code suggestions and debugging
2. **eleven-agent-mcp** - Custom Eleven agent for code suggestions and debugging

### MCP Server Location:

- Server script: `/Users/nexteleven/cursor-mcp-integration/server/local-mcp-server.js`
- Working directory: `/Users/nexteleven/cursor-mcp-integration`

## MCP Tools Available

### Grok Agent MCP:

- `query_agent` - Query custom agent for code suggestions, debugging, or planning
- `git_review_and_commit` - Generate smart commit messages from git diff
- `process_browser_content` - Process browser content for analysis or summarization

### Eleven Agent MCP:

- `query_agent` - Query custom agent for code suggestions, debugging, or planning
- `git_review_and_commit` - Generate smart commit messages from git diff
- `process_browser_content` - Process browser content for analysis or summarization

### Browser Extension MCP:

- Navigation tools (navigate, back, resize, snapshot)
- Interaction tools (click, hover, type, drag)
- Evaluation tools (execute JavaScript, fill forms)
- Screenshot tools

## VS Code Extensions vs MCP

**Important:** VS Code extensions (Terraform, Vim) are **separate** from MCP tools:

- **VS Code Extensions**: Work within VS Code/Cursor editor (Terraform syntax highlighting, Vim keybindings)
- **MCP Tools**: Work through Cursor's AI agent system (custom agents, browser automation, git tools)

They don't directly integrate, but they can work together:

- Terraform extension provides syntax highlighting for `.tf` files
- MCP tools can help with Terraform code suggestions through the agent
- Vim extension provides keybindings
- MCP tools provide AI-powered assistance

## Verification

To verify your MCP setup is working:

1. **Check MCP Server Status:**

   ```bash
   # Verify server file exists
   ls -la /Users/nexteleven/cursor-mcp-integration/server/local-mcp-server.js

   # Verify Node.js is available
   which node
   node --version
   ```

2. **Test MCP Tools in Cursor:**
   - The MCP tools are available when you use Cursor's AI chat
   - Tools will automatically be called when needed
   - Check Cursor's MCP status in settings or logs

3. **Check Environment Variables:**
   - `API_KEY` - For grok-agent-mcp
   - `ELEVEN_API_KEY` - For eleven-agent-mcp
   - These should be set in your shell environment

## Setup Status

✅ **MCP Configuration:** Found and configured in `~/.cursor/mcp.json`  
✅ **Server Script:** Located at configured path  
✅ **Extensions:** Separate setup (Terraform & Vim)

## Next Steps

1. **Restart Cursor** to ensure MCP servers load properly
2. **Verify MCP Tools** are working by asking Cursor AI to use them
3. **Test Extensions** by opening Terraform files and using Vim mode

Both systems work independently and complement each other!
