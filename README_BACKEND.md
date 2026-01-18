# EmPulse Music Backend - Technical Documentation

## 🏗️ Architecture Overview

The EmPulse Music backend is built on **Next.js 15** with the App Router, providing a modern, scalable API architecture.

### Tech Stack

- **Framework:** Next.js 15.5.9 (App Router)
- **Language:** TypeScript 5.4.0
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** JWT + Refresh Tokens
- **Rate Limiting:** Upstash Redis (with in-memory fallback)
- **Storage:** AWS S3 / Cloudflare R2
- **Email:** Resend
- **Encryption:** AES-256-GCM

---

## 📁 Project Structure

```
├── app/
│   └── api/                 # API routes
│       ├── auth/           # Authentication endpoints
│       ├── tracks/         # Track management
│       ├── artist/         # Artist signup
│       ├── chat/           # AI chat integration
│       └── health/         # Health checks
├── lib/                     # Core utilities
│   ├── auth.ts             # Authentication utilities
│   ├── db.ts               # Database client
│   ├── email.ts            # Email service
│   ├── storage.ts          # Cloud storage
│   ├── rateLimit.ts        # Rate limiting (in-memory fallback)
│   ├── rateLimitRedis.ts   # Redis rate limiting
│   ├── csrf.ts             # CSRF protection
│   ├── encryption.ts       # Data encryption
│   └── ...
├── prisma/
│   └── schema.prisma       # Database schema
└── __tests__/              # Test files
```

---

## 🔐 Security Features

### Implemented
1. **CSRF Protection** - Double-submit cookie pattern
2. **Data Encryption** - AES-256-GCM for sensitive data
3. **Input Sanitization** - XSS and injection prevention
4. **Rate Limiting** - IP-based + per-user limits
5. **Account Lockout** - 5 failed attempts = 15 min lock
6. **Password Security** - Bcrypt hashing (12 rounds)
7. **JWT Security** - Short-lived tokens + refresh rotation
8. **Security Headers** - CSP, HSTS, X-Frame-Options

### Security Headers
- `Content-Security-Policy` - XSS protection
- `Strict-Transport-Security` - HTTPS enforcement
- `X-Frame-Options: DENY` - Clickjacking protection
- `X-Content-Type-Options: nosniff` - MIME sniffing prevention

---

## 🔌 API Endpoints

### Authentication

#### `POST /api/auth/register`
Register new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "..." },
  "accessToken": "...",
  "refreshToken": "...",
  "requiresVerification": true
}
```

#### `POST /api/auth/login`
Authenticate user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "user": { "id": "...", "email": "...", "name": "..." },
  "accessToken": "...",
  "refreshToken": "..."
}
```

#### `POST /api/auth/refresh`
Refresh access token.

**Request:**
```json
{
  "refreshToken": "..."
}
```

#### `POST /api/auth/logout`
Revoke refresh tokens.

#### `POST /api/auth/forgot-password`
Request password reset.

#### `POST /api/auth/reset-password`
Reset password with token.

#### `GET /api/auth/verify?token=...`
Verify email address.

#### `GET /api/auth/me`
Get current user (requires authentication).

---

### Track Management

#### `POST /api/tracks/submit`
Submit track for review.

**Headers:**
- `Authorization: Bearer <accessToken>`
- `X-CSRF-Token: <token>`

**Body:** FormData with:
- `payload` (JSON string) - Track metadata
- `audioFile` (File) - Audio file
- `coverArtFile` (File, optional) - Cover art

---

### Health & Monitoring

#### `GET /api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-14T...",
  "checks": {
    "environment": { "status": "ok" },
    "database": { "status": "ok" },
    "memory": { "status": "ok" }
  }
}
```

#### `GET /api/startup-check`
Environment validation check.

---

## 🗄️ Database Schema

### Models

- **User** - User accounts
- **RefreshToken** - JWT refresh tokens
- **Artist** - Artist profiles
- **Track** - Published tracks
- **Album** - Albums/EPs
- **TrackSubmission** - Track submissions awaiting review
- **ArtistApplication** - Artist signup applications
- **Playlist** - User playlists
- **PlaylistTrack** - Playlist-track relationships

See `prisma/schema.prisma` for complete schema.

---

## 🔄 Rate Limiting

### Limits

| Endpoint | Limit |
|----------|-------|
| `/api/auth/login` | 5 per minute |
| `/api/auth/register` | 3 per hour |
| `/api/auth/forgot-password` | 5 per hour |
| `/api/auth/reset-password` | 5 per hour |
| `/api/chat` | 20 per hour |
| `/api/tracks/submit` | 10 per day |
| `/api/artist/signup` | 5 per day |
| `/api/mood/validate` | 30 per minute |

### Implementation
- Uses Upstash Redis for distributed rate limiting
- Falls back to in-memory if Redis unavailable
- Supports per-user rate limiting (not just IP)

---

## 📧 Email Service

### Templates

1. **Email Verification** - Sent on registration
2. **Password Reset** - Sent on forgot password request
3. **Artist Application** - Confirmation email

### Configuration
Uses Resend service. Set `RESEND_API_KEY` environment variable.

---

## 🗂️ File Storage

### Supported Providers
- **AWS S3** - Full S3 API support
- **Cloudflare R2** - S3-compatible, cheaper alternative

### Features
- File integrity verification (SHA-256 checksums)
- Public/private file access
- Signed URLs for private files
- Automatic CDN integration (with Cloudflare)

### Configuration
Set either S3 or R2 environment variables (see `.env.example`).

---

## 🔒 Encryption

### Encrypted Data
- W-9 tax forms (SSN/EIN)
- Other sensitive user data

### Algorithm
- **AES-256-GCM** - Authenticated encryption
- Prevents tampering
- Includes authentication tag

### Key Management
- Primary: `ENCRYPTION_KEY` (64 hex characters)
- Fallback: Derived from `JWT_SECRET` (development only)

---

## 🧪 Testing

### Run Tests
```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # With coverage
```

### Test Files
- `__tests__/lib/*.test.ts` - Unit tests for utilities

### Coverage Goals
- 50% minimum coverage
- Focus on critical paths

---

## 🚀 Development

### Setup
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Database Management
```bash
# Generate Prisma Client
npm run db:generate

# Create migration
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

---

## 📝 Code Style

### TypeScript
- Strict mode enabled
- No `any` types (where possible)
- Explicit return types for functions

### Error Handling
- Always use try-catch for async operations
- Return appropriate HTTP status codes
- Log errors with correlation IDs

### Logging
- Use structured logging with `logger` utility
- Include correlation IDs for request tracking
- Never log sensitive data (passwords, tokens)

---

## 🔍 Debugging

### Check Database Connection
```bash
npx prisma db pull
```

### Check Redis Connection
```bash
curl $UPSTASH_REDIS_REST_URL/ping \
  -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

### View Logs
All logs include correlation IDs. Search logs by correlation ID to trace request flow.

---

## 📚 Additional Documentation

- `BACKEND_AUDIT_REPORT_2026-01-14.md` - Security audit
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `IMPLEMENTATION_COMPLETE.md` - Implementation status
- `.env.example` - Environment variables reference

---

**Last Updated:** January 14, 2026  
**Maintainer:** Backend Team
