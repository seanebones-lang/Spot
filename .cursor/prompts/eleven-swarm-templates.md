# Eleven MCP Swarm Prompt Templates

## Quick Copy-Paste Templates

### Full Stack Feature

```
@Eleven MCP /swarm fullstack [feature-name]

Agents: Frontend, Backend, Testing, Security, Performance
Scope: [component/feature description]
Requirements: [list requirements]
Timeline: [if needed]
```

### Component Optimization

```
@Eleven MCP /swarm comprehensive optimize [ComponentName.tsx]

Focus Areas:
- Performance (bundle size, render optimization)
- Accessibility (keyboard nav, screen readers)
- Type safety (TypeScript strict mode)
- Testing (unit + E2E coverage)
```

### Bug Investigation

```
@Eleven MCP /swarm debug [bug-description]

Agents:
- Security Agent: Check for vulnerabilities
- Frontend Agent: Component analysis
- Testing Agent: Reproduce issue
- Performance Agent: Memory leaks

Context: [error logs, steps to reproduce]
```

### Infrastructure Deployment

```
@Eleven MCP /orchestrate Terraform deploy Spot infrastructure

Components:
- VPC, ECS, RDS, S3, CloudFront
- Environment: [dev/staging/prod]
- Security review required
- Auto-scaling enabled
```

### Security Audit

```
@Eleven MCP /swarm security audit [component/system]

Agents:
- Security Agent: Vulnerability scan
- Authentication Agent: Auth flow review
- Database Agent: SQL injection checks
- API Agent: Input validation

Scope: [authentication, API routes, database]
```

### Performance Analysis

```
@Eleven MCP /agent performance analyze [component/page]

Metrics:
- Bundle size
- Render time
- Memory usage
- Core Web Vitals

Target: [Lighthouse score, bundle size limit]
```

### Accessibility Review

```
@Eleven MCP /agent accessibility audit [component/page]

Checklist:
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus management

WCAG Level: 2.2 AA
```

### Testing Coverage

```
@Eleven MCP /agent testing create tests [component]

Types:
- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)

Coverage Target: 90%+
```

### Code Refactoring

```
@Eleven MCP /refactor [component/file]

Issues to address:
- Code smells
- Type safety
- Performance
- Maintainability

Keep: [existing APIs, behavior]
```

### Documentation

```
@Eleven MCP /agent documentation generate [component/system]

Include:
- README updates
- API documentation
- Code comments
- Architecture diagrams
```

## Spot-Specific Templates

### Audiophile Player

```
@Eleven MCP /swarm audiophile player enhancement

Features:
- FLAC/WAV lossless playback
- GLSL shader visualizations
- Web Audio API optimization
- Haptic feedback
- Real-time audio analysis

Agents: Audio, Frontend, Performance, UI/UX
```

### Authentication System

```
@Eleven MCP /swarm auth system optimization

Areas:
- Sign in/up flows
- Password recovery
- Artist verification
- Session management
- OAuth integration

Agents: Security, Authentication, Testing, Accessibility
```

### Terraform Infrastructure

```
@Eleven MCP /orchestrate infrastructure deployment

Environment: [dev/staging/prod]
Components: VPC, ECS, RDS, S3, CloudFront
Review: Security groups, IAM roles, encryption
Deploy: terraform apply with approval
```

## Usage Tips

1. **Be Specific**: Include context, requirements, constraints
2. **Include Examples**: Show current code or patterns
3. **Define Scope**: What to include/exclude
4. **Set Targets**: Performance goals, test coverage, etc.
5. **Mention Dependencies**: Related components, libraries

## Response Format

Eleven will respond with:

1. **Agent Assignment**: Which agents will work on what
2. **Analysis**: Detailed findings from each agent
3. **Action Plan**: Step-by-step implementation
4. **Code**: Ready-to-use code snippets
5. **Testing**: Test cases and verification steps
