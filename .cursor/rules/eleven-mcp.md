# Eleven MCP Rules

## Core Principle
**Prefix MCP[tool]. Swarm always.**

When working with Eleven, always use MCP tools with explicit prefixes. This ensures proper delegation and tracking.

## MCP Tool Prefix Pattern
- `MCP[tool_name]` - Explicitly call MCP tools
- Swarm operations should always delegate via MCP
- Agent collaboration uses MCP query_agent

## Examples

### Swarm Delegation
```
@Eleven MCP[query_agent] /swarm optimize player performance
```

### Git Operations
```
@Eleven MCP[git_review_and_commit] components/Player.tsx
```

### Testing
```
@Eleven MCP[tester] "npm run test:e2e"
```

### Deployment
```
@Eleven MCP[deploy] vercel spot-music $VERCEL_TOKEN
```

## Best Practices

1. **Always prefix**: Makes tool usage explicit and traceable
2. **Swarm first**: Use swarm for complex multi-step tasks
3. **Chain tools**: Combine MCP tools for workflows
4. **Document results**: Log MCP tool outputs for debugging

## Error Handling

If MCP tool fails:
1. Check tool registration in `.cursor/mcp.json`
2. Verify tool script exists and is executable
3. Check environment variables/tokens
4. Fall back to direct execution if needed
