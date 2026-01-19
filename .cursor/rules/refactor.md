# Refactoring Rules

## Refactoring Workflow

When refactoring code, use the following pattern:

```
/refactor → MCP[git_review]
```

## Refactoring Steps

### 1. Pre-Refactor Analysis
- Use `MCP[query_agent]` to analyze code complexity
- Identify refactoring opportunities
- Plan refactoring strategy

### 2. Execute Refactor
- Make changes incrementally
- Run tests after each change
- Use `MCP[tester]` to verify

### 3. Post-Refactor Review
- `MCP[git_review_and_commit]` for code review
- Ensure all tests pass
- Verify no performance regressions

## Refactoring Patterns

### Extract Function
```javascript
// Before: Inline logic
const result = data.filter(x => x.active).map(x => x.id);

// After: Extracted function
const getActiveIds = (data) => data.filter(x => x.active).map(x => x.id);
const result = getActiveIds(data);
```

### Component Refactoring
```typescript
// Extract reusable hooks
const usePlayerControls = () => {
  // Player logic
};

// Extract sub-components
const PlayerControls = ({ player }) => {
  // Control UI
};
```

## MCP Integration

### Code Analysis
```
MCP[query_agent] /swarm analyze components/Player.tsx for refactoring opportunities
```

### Test Coverage
```
MCP[tester] "npm test -- components/Player.test.tsx"
```

### Git Review
```
MCP[git_review_and_commit] components/Player.tsx
```

## Refactoring Checklist

- [ ] Tests written/updated
- [ ] All tests pass
- [ ] No performance regression
- [ ] Code reviewed via MCP
- [ ] Documentation updated
- [ ] Committed with clear message
