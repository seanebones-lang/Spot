# Eleven MCP Optimal Workflow for Spot Repository

## Quick Reference Commands

### Basic Usage

```bash
# Swarm analysis
@Eleven MCP /swarm comprehensive [component/task]

# Single agent
@Eleven MCP /agent [agent-type] [task]

# Orchestration
@Eleven MCP /orchestrate [complex-task]

# Debug
@Eleven MCP /debug [issue]
```

### Vim Keybindings

- `<leader>e` - Refactor selection with Eleven
- `<leader>s` - Swarm analyze selection
- `<leader>d` - Debug selection
- `<leader>t` - Terraform validate
- `<leader>p` - Terraform plan

## Common Workflows

### 1. Feature Development

```
1. @Eleven MCP /swarm fullstack [feature-name]
   → Frontend + Backend + Testing agents

2. Review agent outputs

3. @Eleven MCP /agent testing create tests

4. Test → Refine → Deploy
```

### 2. Bug Fixing

```
1. @Eleven MCP /debug [bug-description]

2. Security Agent + Testing Agent review

3. Apply fix → Test → Verify
```

### 3. Performance Optimization

```
1. @Eleven MCP /agent performance analyze [component]

2. Bundle analysis + Memory profiling

3. @Eleven MCP /agent frontend optimize [component]

4. Measure improvement
```

### 4. Infrastructure Deployment

```
1. @Eleven MCP /orchestrate Terraform deploy Spot ECS RDS S3

2. DevOps Agent plans deployment

3. Review → terraform apply

4. Verify → Monitor
```

## Spot-Specific Workflows

### Audiophile Player Enhancement

```
@Eleven MCP /swarm audiophile player
- Audio Agent: FLAC streaming
- Performance Agent: Web Audio optimization
- Frontend Agent: Shader visualizations
- Accessibility Agent: Keyboard controls
```

### Authentication System

```
@Eleven MCP /swarm auth system security
- Security Agent: Vulnerability scan
- Authentication Agent: Flow review
- Testing Agent: Security tests
- Accessibility Agent: Keyboard navigation
```

### Terraform Infrastructure

```
@Eleven MCP /orchestrate infrastructure
- DevOps Agent: Terraform plan
- Security Agent: Security groups
- Performance Agent: Resource sizing
```

## Iterative Refinement

### Loop Pattern

```
1. Generate: @Eleven MCP /swarm [task]
2. Test: npm test / npm run build
3. Refine: @Eleven MCP /optimize [issue]
4. Verify: Manual testing
5. Deploy: @Eleven MCP /orchestrate deploy
```

## Error Recovery

When tools fail:

```
1. @Eleven MCP /report tool failure: [error]
2. Eleven provides manual workaround
3. Execute manually
4. Continue workflow
```

## Telemetry & Feedback

```
@Eleven MCP /research bottlenecks Spot repo
→ Self-improvement analysis
→ Tool failure patterns
→ Optimization opportunities
```
