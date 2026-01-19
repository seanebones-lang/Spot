# Production Fixes Action Plan

## Prioritized Implementation Guide

**Date**: January 14, 2026  
**Based on**: PRODUCTION_READINESS_AUDIT_2026-01-14.md

---

## 🔴 Priority P0: Critical Security & Reliability Fixes

### Fix 1: Content Security Policy (CSP) Hardening

**File**: `middleware.ts`  
**Severity**: Critical  
**Estimated Time**: 2 hours

**Current Issue** (Line 112):

```typescript
"script-src 'self' 'unsafe-inline' 'unsafe-eval'", // ⚠️ VULNERABLE
```

**Fix**:

```typescript
// Generate nonces for inline scripts
const nonce = crypto.randomBytes(16).toString("base64");
response.headers.set("X-Nonce", nonce);

const csp = [
  "default-src 'self'",
  `script-src 'self' 'nonce-${nonce}'`, // Remove unsafe-eval
  "style-src 'self' 'unsafe-inline'", // Keep unsafe-inline for Tailwind
  // ... rest of CSP
].join("; ");
```

**Action Items**:

- [ ] Generate nonce per request in middleware
- [ ] Pass nonce to React via `next/script` component
- [ ] Remove all inline `<script>` tags (move to separate files)
- [ ] Test: Verify no console CSP violations

---

### Fix 2: Add Error Boundaries (Frontend)

**File**: `components/ErrorBoundary.tsx` (NEW)  
**Severity**: Critical  
**Estimated Time**: 3 hours

**Implementation**:

```typescript
'use client';

import React from 'react';
import { logger } from '@/lib/logger';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React Error Boundary caught error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Update `app/layout.tsx`**:

```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

**Action Items**:

- [ ] Create `components/ErrorBoundary.tsx`
- [ ] Wrap root layout with ErrorBoundary
- [ ] Add per-route error boundaries for critical pages
- [ ] Test: Trigger error in component, verify graceful handling

---

### Fix 3: Remove CSRF Exclusions for Admin Endpoints

**File**: `middleware.ts` (Line 81)  
**Severity**: High  
**Estimated Time**: 1 hour

**Current Issue**:

```typescript
const skipCsrfPaths = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/admin/delete-all-album-art",
];
```

**Fix**:

```typescript
const skipCsrfPaths = ["/api/auth/login", "/api/auth/register"]; // Remove admin path

// In admin route, require role + CSRF:
// app/api/admin/delete-all-album-art/route.ts
export async function DELETE(request: NextRequest) {
  requireCsrfToken(request); // Add this
  const user = requireRole(request, ["ADMIN"]); // Ensure role check
  // ... rest of handler
}
```

**Action Items**:

- [ ] Remove `/api/admin/*` from skipCsrfPaths
- [ ] Add CSRF validation in admin route handlers
- [ ] Ensure role-based auth checks in admin routes
- [ ] Test: Verify admin endpoints reject requests without CSRF token

---

### Fix 4: Environment Variable Validation at Startup

**File**: `lib/startup-validation.ts` (UPDATE)  
**Severity**: Critical  
**Estimated Time**: 1 hour

**Current Issue**: Neo4j and Pinecone may be undefined in production, causing silent failures.

**Fix** - Update `lib/env.ts`:

```typescript
export function validateEnv(): EnvSchema {
  const errors: string[] = [];
  // ... existing validation ...

  // NEW: Validate production dependencies
  if (process.env.NODE_ENV === "production") {
    if (
      !process.env.NEO4J_URI &&
      !process.env.NEO4J_URI?.startsWith("neo4j://")
    ) {
      errors.push(
        "NEO4J_URI is required in production. Format: neo4j://host:port",
      );
    }
    if (!process.env.NEO4J_USER) {
      errors.push("NEO4J_USER is required in production");
    }
    if (!process.env.NEO4J_PASSWORD) {
      errors.push("NEO4J_PASSWORD is required in production");
    }
    if (
      !process.env.PINECONE_API_KEY &&
      !process.env.PINECONE_API_KEY?.startsWith("pcsk")
    ) {
      errors.push("PINECONE_API_KEY is required in production");
    }
  }

  // ... rest of validation ...
}
```

**Update `next.config.js`** - Remove Pinecone stub in production:

```javascript
webpack: (config, { dev }) => {
  // Only stub in development
  if (dev && !process.env.PINECONE_API_KEY) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
    };
  }
  return config;
},
```

**Action Items**:

- [ ] Add Neo4j env var validation to `lib/env.ts`
- [ ] Add Pinecone env var validation
- [ ] Update `next.config.js` to only stub in dev
- [ ] Test: Start app without env vars, verify clear error messages

---

## 🟡 Priority P1: Testing & Reliability

### Fix 5: Add E2E Tests to CI/CD

**File**: `.github/workflows/e2e-tests.yml` (NEW)  
**Severity**: High  
**Estimated Time**: 4 hours

**Create new workflow**:

```yaml
name: E2E Tests

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          JWT_SECRET: ${{ secrets.JWT_SECRET_TEST }}
          DATABASE_URL: ${{ secrets.DATABASE_URL_TEST }}
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

**Action Items**:

- [ ] Create `.github/workflows/e2e-tests.yml`
- [ ] Add test environment secrets to GitHub
- [ ] Update `playwright.config.ts` to use test database
- [ ] Test: Run workflow on PR, verify tests pass

---

### Fix 6: Increase Test Coverage

**Files**: `__tests__/**/*.test.ts` (NEW FILES)  
**Severity**: High  
**Estimated Time**: 20 hours

**Priority test files to create**:

1. `__tests__/api/auth/login.test.ts`
   - Test: Successful login
   - Test: Invalid credentials
   - Test: Rate limiting
   - Test: Account lockout

2. `__tests__/api/tracks/submit.test.ts`
   - Test: File upload validation
   - Test: MIME type validation
   - Test: File size limits
   - Test: CSRF token requirement

3. `__tests__/lib/db.test.ts`
   - Test: Connection timeout
   - Test: Query error handling
   - Test: Transaction rollback

4. `__tests__/components/Player.test.tsx`
   - Test: Play/pause functionality
   - Test: Queue management
   - Test: Progress updates

**Target**: 70% code coverage minimum

**Action Items**:

- [ ] Create API route test suite (10 test files)
- [ ] Create component test suite (5 test files)
- [ ] Add coverage reporting: `jest --coverage`
- [ ] Set coverage threshold in `jest.config.js`: `coverageThreshold: { global: { lines: 70 } }`

---

### Fix 7: Add Docker Health Check

**File**: `Dockerfile`  
**Severity**: Medium  
**Estimated Time**: 1 hour

**Add to Dockerfile** (before CMD):

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); })"
```

**Action Items**:

- [ ] Add HEALTHCHECK instruction to Dockerfile
- [ ] Test: `docker run` and verify `docker ps` shows healthy status
- [ ] Update deployment to use health check for rolling updates

---

## 🟢 Priority P2: Infrastructure & Monitoring

### Fix 8: Database Backup Strategy

**File**: `scripts/backup-database.sh` (NEW)  
**Severity**: High  
**Estimated Time**: 4 hours

**Create backup script**:

```bash
#!/bin/bash
# scripts/backup-database.sh

set -e
DATABASE_URL="${DATABASE_URL}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Generate backup filename with timestamp
BACKUP_FILE="$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).sql"

# Run pg_dump (PostgreSQL)
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_FILE"

# Remove old backups
find "$BACKUP_DIR" -name "backup-*.sql.gz" -mtime +$RETENTION_DAYS -delete

echo "Backup completed: $BACKUP_FILE.gz"
```

**Add to cron/GitHub Actions**:

```yaml
# .github/workflows/daily-backup.yml
name: Daily Database Backup
on:
  schedule:
    - cron: "0 2 * * *" # 2 AM UTC daily
```

**Action Items**:

- [ ] Create `scripts/backup-database.sh`
- [ ] Add GitHub Actions workflow for automated backups
- [ ] Configure S3/Cloud Storage for backup storage
- [ ] Test restore procedure: Restore from backup to test database

---

### Fix 9: Track Submission Moderation Queue

**File**: `app/api/tracks/submit/route.ts` (Line 435)  
**Severity**: Medium  
**Estimated Time**: 2 hours

**Change**:

```typescript
// BEFORE:
status: 'PUBLISHED',
publishedAt: new Date(),

// AFTER:
status: 'PENDING_REVIEW', // Require admin approval
publishedAt: null, // Set on approval
```

**Create admin approval endpoint**:

```typescript
// app/api/admin/tracks/[id]/approve/route.ts
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  requireCsrfToken(request);
  const user = requireRole(request, ["ADMIN"]);

  await prisma.trackSubmission.update({
    where: { submissionId: params.id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
      reviewedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true });
}
```

**Action Items**:

- [ ] Change default status to `PENDING_REVIEW`
- [ ] Create admin approval API endpoint
- [ ] Add admin UI for track moderation
- [ ] Test: Submit track, verify it requires approval

---

### Fix 10: Remove Pinecone Stub in Production

**File**: `next.config.js` (Already addressed in Fix 4)  
**Status**: ✅ Covered in Fix 4

---

## Summary Checklist

### Before Staging Deployment:

- [ ] Fix 1: CSP hardening (2h)
- [ ] Fix 2: Error boundaries (3h)
- [ ] Fix 3: CSRF on admin endpoints (1h)
- [ ] Fix 4: Env var validation (1h)

**Total: 7 hours** ✅ Ready for staging

### Before Production Deployment:

- [ ] Fix 5: E2E tests in CI (4h)
- [ ] Fix 6: Test coverage to 70% (20h)
- [ ] Fix 7: Docker health check (1h)
- [ ] Fix 8: Database backups (4h)
- [ ] Fix 9: Track moderation queue (2h)

**Total: 31 hours** ✅ Ready for production

### Post-Launch Optimizations:

- [ ] Fix 10: Monitoring integration (6h)
- [ ] Implement caching layer (8h)
- [ ] CDN configuration (4h)

**Total: 18 hours** (Can be done after launch with monitoring)

---

**Total Estimated Time**: 56 hours (7 days with 1 engineer full-time)

**Recommended Timeline**:

- **Week 1**: P0 fixes (7h) → Deploy to staging
- **Week 2**: P1 fixes (27h) → Deploy to production
- **Week 3**: P2 fixes (18h) → Monitor and optimize

---

**Next Steps**:

1. Review this plan with team
2. Assign owners to each fix
3. Create GitHub issues for each fix
4. Schedule daily standups to track progress
5. Re-run audit after fixes are complete
