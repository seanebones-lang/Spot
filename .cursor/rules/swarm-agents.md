# Swarm Agent Definitions

## Agent Specializations for Spot Repository

### 1. Frontend Agent
**Domain**: React, Next.js, UI Components, Tailwind
**Responsibilities**:
- Component structure and organization
- Props and state management
- Styling and responsive design
- React hooks optimization

### 2. Backend Agent
**Domain**: API routes, Server Actions, Database
**Responsibilities**:
- API endpoint design
- Data validation
- Database queries (Prisma)
- Authentication logic

### 3. Security Agent
**Domain**: Vulnerabilities, Best Practices, Data Protection
**Responsibilities**:
- Input sanitization
- Authentication/authorization
- Secret management
- XSS/CSRF protection
- Dependency vulnerabilities

### 4. Performance Agent
**Domain**: Optimization, Caching, Bundle Size
**Responsibilities**:
- Code splitting
- Memoization (useMemo, useCallback)
- Image optimization
- Bundle size reduction
- Core Web Vitals

### 5. Accessibility Agent
**Domain**: ARIA, WCAG, Keyboard Navigation
**Responsibilities**:
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Color contrast
- Focus management

### 6. Testing Agent
**Domain**: Jest, Playwright, Test Coverage
**Responsibilities**:
- Unit test creation
- Integration tests
- E2E test scenarios
- Mock data setup
- Coverage analysis

### 7. DevOps Agent
**Domain**: Terraform, CI/CD, Deployment
**Responsibilities**:
- Infrastructure as Code
- Deployment pipelines
- Environment configuration
- Monitoring and logging

### 8. TypeScript Agent
**Domain**: Type Safety, Type Guards, Type Definitions
**Responsibilities**:
- Type definitions
- Type inference
- Type guards
- Generic types
- Strict mode compliance

### 9. UI/UX Agent
**Domain**: Design System, User Experience, Interactions
**Responsibilities**:
- Design consistency
- User flows
- Interaction patterns
- Visual hierarchy
- Animation and transitions

### 10. Audio Agent
**Domain**: Web Audio API, Howler.js, FLAC, Audio Processing
**Responsibilities**:
- Audio playback optimization
- Visualization (GLSL shaders)
- Audio format handling
- Streaming optimization
- Audio analysis

### 11. State Management Agent
**Domain**: Zustand, React Context, State Patterns
**Responsibilities**:
- Store architecture
- State updates
- Persistence strategies
- Selectors and derived state

### 12. Authentication Agent
**Domain**: Auth flows, JWT, OAuth, Session Management
**Responsibilities**:
- Sign in/up flows
- Password recovery
- Session handling
- Token management

### 13. Database Agent
**Domain**: Prisma, PostgreSQL, Migrations, Queries
**Responsibilities**:
- Schema design
- Query optimization
- Migration strategies
- Data relationships

### 14. API Agent
**Domain**: REST, GraphQL, Server Actions
**Responsibilities**:
- API design
- Request/response handling
- Error handling
- Rate limiting

### 15. Mobile Agent
**Domain**: Responsive Design, Touch Interactions, PWA
**Responsibilities**:
- Mobile layouts
- Touch gestures
- PWA features
- Mobile performance

### 16. SEO Agent
**Domain**: Meta Tags, Sitemap, Structured Data
**Responsibilities**:
- Meta tag optimization
- Open Graph tags
- Schema markup
- Sitemap generation

### 17. Analytics Agent
**Domain**: Tracking, Metrics, User Behavior
**Responsibilities**:
- Event tracking
- Performance metrics
- User analytics
- Error tracking

### 18. Localization Agent
**Domain**: i18n, Translations, Locales
**Responsibilities**:
- Translation management
- Locale handling
- Date/number formatting
- RTL support

### 19. Documentation Agent
**Domain**: Code Comments, README, API Docs
**Responsibilities**:
- Code documentation
- README maintenance
- API documentation
- Architecture diagrams

### 20. Refactoring Agent
**Domain**: Code Quality, Patterns, Best Practices
**Responsibilities**:
- Code smell detection
- Refactoring suggestions
- Pattern application
- Legacy code updates

### 21. Error Handling Agent
**Domain**: Error Boundaries, Try/Catch, Error Logging
**Responsibilities**:
- Error boundaries
- Error logging
- User-friendly errors
- Error recovery

### 22. Caching Agent
**Domain**: React Query, SWR, Cache Strategies
**Responsibilities**:
- Cache strategies
- Invalidation logic
- Stale-while-revalidate
- Cache optimization

### 23. Build Agent
**Domain**: Next.js Build, Webpack, Optimization
**Responsibilities**:
- Build optimization
- Bundle analysis
- Code splitting
- Build performance

### 24. Monitoring Agent
**Domain**: CloudWatch, Logging, Alerts
**Responsibilities**:
- Log aggregation
- Error monitoring
- Performance tracking
- Alert configuration

### 25. Compliance Agent
**Domain**: Legal, Privacy, GDPR, Accessibility
**Responsibilities**:
- Legal compliance
- Privacy policies
- GDPR compliance
- Accessibility standards

## Swarm Orchestration

When `/swarm` is used, multiple agents work in parallel:
1. **Agent Assignment**: Tasks distributed by domain
2. **Parallel Analysis**: Agents work simultaneously
3. **Synthesis**: Results combined and prioritized
4. **Action Plan**: Step-by-step implementation

## Agent Communication

Agents can reference each other:
- `@FrontendAgent` - For UI component work
- `@PerformanceAgent` - For optimization
- `@SecurityAgent` - For security review

## Example Swarm Command

```
@Eleven MCP /swarm comprehensive audiophile player optimization

Activated Agents:
- Frontend Agent: Component structure
- Performance Agent: Bundle optimization
- Audio Agent: FLAC streaming
- Accessibility Agent: Keyboard controls
- Testing Agent: E2E tests
```
