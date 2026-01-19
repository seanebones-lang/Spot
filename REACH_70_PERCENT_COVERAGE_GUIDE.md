# Guide: Reaching 70% Test Coverage
## Remaining Work & Implementation Patterns
**Current**: 40-45% | **Target**: 70% | **Remaining**: 25-30%

---

## 📊 Current Coverage Breakdown

### ✅ Well Covered (Estimated Coverage):
- **Password utilities**: 100% (~2% of codebase)
- **CSRF protection**: 100% (~1% of codebase)
- **Rate limiting**: 100% (~1% of codebase)
- **Sanitization**: 100% (~3% of codebase)
- **Environment validation**: 100% (~1% of codebase)
- **Database utilities**: ~80% (~1% of codebase)

**Total Well Covered**: ~9-10% of codebase with high coverage

### ⚠️ Partially Covered (Estimated Coverage):
- **Health API**: ~60% (~1% of codebase)
- **Authentication utilities**: ~40% (~2% of codebase)

### 🔴 Not Covered (High Impact Targets):
- **API Routes**: ~5% (~30% of codebase) ⚠️ **HIGHEST IMPACT**
  - `/api/auth/login` - Login endpoint
  - `/api/auth/register` - Registration endpoint
  - `/api/auth/logout` - Logout endpoint
  - `/api/tracks/submit` - Track upload endpoint
  - `/api/artist/signup` - Artist signup endpoint

- **React Components**: ~0% (~25% of codebase) ⚠️ **HIGH IMPACT**
  - `components/Player.tsx` - Audio player
  - `components/ErrorBoundary.tsx` - Error handling
  - Critical UI components

- **State Management**: ~10% (~8% of codebase)
  - `stores/playerStore.ts` - Player state
  - `stores/authStore.ts` - Auth state

- **Middleware**: ~20% (~2% of codebase)
  - `middleware.ts` - Request handling

---

## 🎯 Strategy to Reach 70%

### Phase 1: API Route Tests (+20-25% coverage) - **HIGHEST PRIORITY**

#### Pattern for Testing Next.js API Routes:

```typescript
// __tests__/api/auth/login.test.ts
import { POST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';

// Mock all dependencies
jest.mock('@/lib/db');
jest.mock('@/lib/auth');
jest.mock('@/lib/password');
jest.mock('@/lib/rateLimit');
jest.mock('@/lib/logger');
jest.mock('@/lib/env');

describe('Login API Route', () => {
  let mockRequest: NextRequest;

  beforeEach(() => {
    // Setup mock request
    mockRequest = {
      json: jest.fn(),
      headers: new Headers(),
      nextUrl: new URL('http://localhost:3000/api/auth/login'),
    } as any;

    // Setup mocks...
  });

  it('should return 200 with tokens on successful login', async () => {
    // Arrange
    mockRequest.json.mockResolvedValue({
      email: 'test@example.com',
      password: 'TestPassword123',
    });

    // Mock Prisma user lookup
    const prisma = require('@/lib/db').default;
    prisma.user = {
      findUnique: jest.fn().mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        passwordHash: '$2a$12$hashed...',
        isActive: true,
        role: 'USER',
        failedLoginAttempts: 0,
        lockedUntil: null,
      }),
      update: jest.fn().mockResolvedValue({}),
    };

    // Mock password verification
    const { verifyPassword } = require('@/lib/password');
    verifyPassword.mockResolvedValue(true);

    // Mock token generation
    const { generateTokenPair } = require('@/lib/auth');
    generateTokenPair.mockResolvedValue({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    // Act
    const response = await POST(mockRequest);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.accessToken).toBeDefined();
  });
});
```

#### Priority API Routes to Test:

1. **`app/api/auth/login/route.ts`** (High Priority)
   - Test cases:
     - ✅ Successful login
     - ✅ Invalid credentials
     - ✅ Account locked
     - ✅ Rate limiting
     - ✅ Missing email/password
     - ✅ Inactive account

2. **`app/api/auth/register/route.ts`** (High Priority)
   - Test cases:
     - ✅ Successful registration
     - ✅ Email already exists
     - ✅ Invalid email format
     - ✅ Weak password
     - ✅ Rate limiting

3. **`app/api/tracks/submit/route.ts`** (Medium Priority)
   - Test cases:
     - ✅ Valid track submission
     - ✅ Missing authentication
     - ✅ Invalid file types
     - ✅ File size limits
     - ✅ CSRF token validation

**Estimated Impact**: +20-25% coverage

---

### Phase 2: Component Tests (+10% coverage) - **SECOND PRIORITY**

#### Pattern for Testing React Components:

```typescript
// __tests__/components/ErrorBoundary.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import React from 'react';

// Component that throws error
const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('should catch and display error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('should allow retry on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText(/try again/i);
    fireEvent.click(retryButton);
    
    // Should reset error state
  });
});
```

#### Priority Components to Test:

1. **`components/ErrorBoundary.tsx`** - Already exists, needs tests
2. **`components/Player.tsx`** - Audio player core functionality
3. **`components/Modal.tsx`** - Modal interactions
4. **Critical UI components** - Button, Input, Select

**Estimated Impact**: +10% coverage

---

### Phase 3: State Management Tests (+5% coverage)

#### Pattern for Testing Zustand Stores:

```typescript
// __tests__/stores/playerStore.test.ts
import { renderHook, act } from '@testing-library/react';
import { usePlayerStore } from '@/stores/playerStore';
import { Track } from '@/types/track';

describe('Player Store', () => {
  beforeEach(() => {
    // Reset store state
    usePlayerStore.setState({
      currentTrack: null,
      isPlaying: false,
      queue: [],
    });
  });

  it('should set current track', () => {
    const { result } = renderHook(() => usePlayerStore());
    const track: Track = {
      id: '1',
      name: 'Test Track',
      // ... other fields
    };

    act(() => {
      result.current.setCurrentTrack(track);
    });

    expect(result.current.currentTrack).toEqual(track);
  });
});
```

**Estimated Impact**: +5% coverage

---

## 📋 Implementation Checklist

### API Route Tests:
- [ ] `__tests__/api/auth/login.test.ts` - Login endpoint
- [ ] `__tests__/api/auth/register.test.ts` - Registration endpoint
- [ ] `__tests__/api/auth/logout.test.ts` - Logout endpoint
- [ ] `__tests__/api/tracks/submit.test.ts` - Track upload (complex)
- [ ] `__tests__/api/artist/signup.test.ts` - Artist signup

### Component Tests:
- [ ] `__tests__/components/ErrorBoundary.test.tsx` - Error boundary
- [ ] `__tests__/components/Player.test.tsx` - Audio player
- [ ] `__tests__/components/Modal.test.tsx` - Modal component

### State Management Tests:
- [ ] `__tests__/stores/playerStore.test.ts` - Player state
- [ ] `__tests__/stores/authStore.test.ts` - Auth state

---

## 🔧 Setup Required

### Install Testing Dependencies (if not already):

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Update `jest.config.js`:

```javascript
module.exports = {
  // ... existing config
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom', // For React component tests
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
```

### Update `jest.setup.js`:

```javascript
import '@testing-library/jest-dom';
// ... existing setup
```

---

## 📈 Coverage Tracking

### Run Coverage Report:

```bash
npm run test:coverage
```

### Check Coverage by File:

```bash
npm run test:coverage -- --verbose
```

### Target Metrics for 70%:

- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

---

## 🎯 Quick Wins (Low Effort, High Impact)

1. **Add simple API route tests** (2-3 hours)
   - Login endpoint (most critical)
   - Register endpoint (similar pattern)

2. **Test error cases** (1-2 hours)
   - Invalid inputs
   - Missing parameters
   - Rate limiting

3. **Test utility functions** (1 hour)
   - Any remaining untested utility functions

---

## 📝 Example: Complete Login API Test

See `__tests__/api/auth/login.test.ts.example` for a complete working example (would need to be created).

---

## 🚀 Estimated Time to 70%

| Phase | Effort | Coverage Gain |
|-------|--------|---------------|
| API Route Tests | 15-20 hours | +20-25% |
| Component Tests | 8-10 hours | +10% |
| State Management | 4-5 hours | +5% |
| **Total** | **27-35 hours** | **+35-40%** |

**Current**: 40-45%  
**After**: 75-85% ✅ (exceeds 70% target)

---

## 💡 Tips for Success

1. **Start with Login API** - Most critical, highest impact
2. **Mock thoroughly** - Use Jest mocks for all dependencies
3. **Test error cases** - Often missed but important
4. **Follow existing patterns** - Use health.test.ts as reference
5. **Run coverage frequently** - Track progress as you go

---

**Next Action**: Create `__tests__/api/auth/login.test.ts` following the pattern above.
