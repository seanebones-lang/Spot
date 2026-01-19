# Eleven MCP Command Shortcuts

## Core Commands

### `/swarm`

Multi-agent comprehensive analysis

**Usage**: `@Eleven MCP /swarm [task/component]`

**Example**:

```
@Eleven MCP /swarm comprehensive Player.tsx optimization
```

### `/agent [type]`

Single agent focused analysis

**Available Agents**:

- `frontend` - React/Next.js UI
- `backend` - API/server logic
- `security` - Security audit
- `performance` - Optimization
- `accessibility` - WCAG compliance
- `testing` - Test creation
- `devops` - Infrastructure
- `typescript` - Type safety
- `audio` - Audio/Web Audio API
- `auth` - Authentication flows

**Example**:

```
@Eleven MCP /agent performance analyze Player.tsx
```

### `/orchestrate`

Coordinate multiple agents for complex tasks

**Usage**: `@Eleven MCP /orchestrate [complex-task]`

**Example**:

```
@Eleven MCP /orchestrate deploy Spot ECS RDS S3 CloudFront
```

### `/debug`

Debug issues with multiple agents

**Usage**: `@Eleven MCP /debug [issue-description]`

**Example**:

```
@Eleven MCP /debug autoplay not working in Player component
```

### `/refactor`

Code refactoring with quality checks

**Usage**: `@Eleven MCP /refactor [file/component]`

**Example**:

```
@Eleven MCP /refactor Player.tsx remove inline styles
```

### `/comprehensive`

All agents analyze (maximum coverage)

**Usage**: `@Eleven MCP /comprehensive [target]`

**Example**:

```
@Eleven MCP /comprehensive authentication system
```

### `/fullstack`

Frontend + Backend agents

**Usage**: `@Eleven MCP /fullstack [feature]`

**Example**:

```
@Eleven MCP /fullstack audio upload feature
```

### `/optimize`

Performance optimization focus

**Usage**: `@Eleven MCP /optimize [component/metric]`

**Example**:

```
@Eleven MCP /optimize bundle size reduce by 30%
```

### `/research`

Research and analysis mode

**Usage**: `@Eleven MCP /research [topic]`

**Example**:

```
@Eleven MCP /research bottlenecks in Spot repository
```

### `/testing`

Testing-focused analysis

**Usage**: `@Eleven MCP /testing [component/system]`

**Example**:

```
@Eleven MCP /testing create E2E tests for auth flows
```

## Command Combinations

### Multiple Agents

```
@Eleven MCP /agent frontend optimize Player.tsx
@Eleven MCP /agent performance bundle analysis
@Eleven MCP /agent accessibility keyboard navigation
```

### Sequential Workflow

```
1. @Eleven MCP /swarm analyze [component]
2. @Eleven MCP /refactor [component] based on analysis
3. @Eleven MCP /testing create tests for [component]
4. @Eleven MCP /optimize [component] performance
```

## Quick Access

Add to Cursor Composer for quick access:

- Type `@Eleven` then tab for autocomplete
- Use `/swarm` for complex tasks
- Use `/agent [type]` for focused work
- Use `/orchestrate` for multi-step deployments
