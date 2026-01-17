# EmPulse Music - Agent-Specific Development Plan
## Organized by Specialist Roles

---

## 🎯 **AGENT MAPPING OVERVIEW**

This plan organizes all development tasks across 17 specialized agents, with clear dependencies, handoff points, and integration checkpoints.

---

## 1️⃣ **REVERSE ENGINEERING SPECIALIST AGENT**
**Role**: Pixel-perfect Spotify UI replication (Analysis & Design System Extraction)

### Tasks:
- **Phase 1.2**: Extract exact Spotify design tokens via Chrome DevTools
  - Colors (hex codes: #1DB954, #121212, etc.)
  - Typography (Spotify Circular font, sizes, weights)
  - Spacing, border-radius, shadows (exact pixel values)
  - Player bar dimensions (90px height, exact spacing)
- **Phase 12**: Pixel-perfect styling validation
  - Screenshot comparisons with Spotify
  - Pixel diff validation (<1% difference)
  - Component-level matching verification

### Deliverables:
- `tailwind.config.js` with exact Spotify theme
- Design token documentation (colors, spacing, typography)
- Pixel-perfect component specifications

### Handoff To:
- **UI Specialist Agent** (design implementation)
- **Front-End Specialist Agent** (code implementation)

---

## 2️⃣ **UI SPECIALIST AGENT**
**Role**: Visual interface design, component libraries, Figma design system

### Tasks:
- **Phase 1.2**: Create Figma design system from Reverse Engineering specs
  - Component library (buttons, inputs, cards)
  - State variations (default, hover, active, disabled)
  - Color palette with EmPulse accents (Red, Blue, Purple + Spotify Green)
  - Logo design ("ulse" heartbeat + equalizer)
- **Phase 12**: UI component design refinement
  - Responsive breakpoints (480px, 768px, 1024px)
  - Accessibility (WCAG 2.2 AA - color contrast >4.5:1)
  - Dark mode implementation (Spotify theme #121212)

### Deliverables:
- Figma design system with all components
- Design tokens export for developers
- Accessibility audit report

### Handoff To:
- **Front-End Specialist Agent** (implementation)
- **UX Specialist Agent** (user flow validation)

---

## 3️⃣ **UX SPECIALIST AGENT**
**Role**: User experience research, flows, testing, optimization

### Tasks:
- **Phase 2**: Navigation flow design
  - User journey mapping (listener, artist, admin)
  - Information architecture (sidebar, TopBar, player)
  - Task completion flow analysis
- **Phase 5**: Wellness features UX research
  - Daily check-in flow optimization
  - Mood selection UX testing
  - Journaling interaction patterns
- **Phase 14**: Advanced features UX
  - Context menu placement
  - Keyboard shortcut discoverability
  - Drag-and-drop feedback

### Deliverables:
- User journey maps (Miro)
- UX audit with heuristic analysis (Nielsen's 10 principles)
- A/B test recommendations for CTAs and conversions
- Accessibility user testing results

### Handoff To:
- **UI Specialist Agent** (design refinements)
- **Front-End Specialist Agent** (implementation)

---

## 4️⃣ **FRONT-END SPECIALIST AGENT**
**Role**: React/Next.js implementation, performance, accessibility, state management

### Tasks:
- **Phase 1.1**: Next.js project setup
  - TypeScript configuration
  - Path aliases (`@/components`, `@/lib`)
  - ESLint, Prettier setup
- **Phase 2**: Core layout components
  - `Sidebar.tsx` (navigation, playlists, check-in widget)
  - `TopBar.tsx` (search, points, streak badge, affirmation button)
  - `Player.tsx` (bottom player bar - pixel-perfect 90px height)
- **Phase 3**: Page implementations
  - Home page, Search, Library, Playlist, Album, Artist pages
  - All wellness pages (check-in, journal, affirmations, wellness hub)
- **Phase 4**: Mood selection system UI
  - Mood page components
  - Player bar mood widget
  - Similar tracks popover
- **Phase 6**: State management (Zustand stores)
- **Phase 9**: Enhanced upload UI (file upload, mandatory mood adjustment)
- **Phase 10**: Enhanced artist dashboard UI (live stats, publish/unpublish toggle)
- **Phase 12**: Pixel-perfect styling implementation

### Key Responsibilities:
- Code splitting (route-based, dynamic imports)
- Performance optimization (Lighthouse score >95)
- Accessibility (ARIA labels, keyboard navigation, screen readers)
- Responsive design (CSS Grid with breakpoints)

### Deliverables:
- All React/Next.js components
- Zustand stores for state management
- Performance optimization report
- Accessibility audit (WCAG 2.2 AA compliance)

### Dependencies:
- Receives design specs from **UI Specialist Agent**
- Receives UX flows from **UX Specialist Agent**
- Integrates with backend via **API Specialist Agent**

### Handoff To:
- **Master Engineer Inspector Agent** (code review)
- **Mobile Specialist Agent** (future mobile app)

---

## 5️⃣ **AV (AUDIO-VISUAL) SPECIALIST AGENT**
**Role**: Audio playback, lossless audio, player engine, Web Audio API

### Tasks:
- **Phase 1.4**: Custom audio player infrastructure
  - Web Audio API / Howler.js implementation
  - Audio element management
  - Progress tracking (60fps updates)
- **Phase 7**: Custom audio player implementation
  - Play/pause, seek, volume, shuffle, repeat
  - Queue management system
  - Crossfade between tracks (optional)
- **Phase 11**: Lossless audio playback
  - Format detection (WAV, FLAC, M4A, MP3, MP4)
  - Quality selector (Lossless/High/Standard/Data Saver)
  - Adaptive streaming based on subscription tier
  - Quality indicator badge (HD/Lossless) in player
- **Phase 6.4**: Picture-in-Picture pop-out player
  - `documentPictureInPicture` API integration
  - State sync between main app and PiP window

### Key Responsibilities:
- Low-latency audio playback (<200ms end-to-end)
- Lossless quality support (WAV, FLAC)
- Format validation on upload
- Audio buffering and error handling

### Deliverables:
- `lib/player.ts` - Custom audio player
- `lib/audioFormatDetector.ts` - Format detection
- `lib/losslessPlayback.ts` - Lossless playback handler
- `lib/pictureInPicture.ts` - PiP API wrapper

### Dependencies:
- Audio files from **Backend Specialist Agent** (CDN/storage)
- Player UI components from **Front-End Specialist Agent**

### Handoff To:
- **Front-End Specialist Agent** (UI integration)
- **Master Engineer Inspector Agent** (performance validation)

---

## 6️⃣ **BACKEND SPECIALIST AGENT**
**Role**: Server-side architecture, databases, APIs, data storage

### Tasks:
- **Phase 1.3**: Mock data structure setup
  - TypeScript types for tracks, artists, playlists, mood tags
  - JSON mock data files (ready for API replacement)
- **Database Schema Design**:
  - Users (id: UUID, email: VARCHAR unique, subscription_tier)
  - Artists (id: UUID, w9_status, approval_status, pro_registration)
  - Tracks (id: UUID, mood_tags: JSONB, file_format, quality)
  - Playlists, Journal entries, Check-ins, Points, Affirmations
- **File Storage System**:
  - Audio file storage (S3/Blob) with format validation
  - Lossless vs. compressed file handling
  - CDN integration for streaming
- **Data Processing**:
  - Track metadata processing
  - Mood tag storage and querying
  - Stream statistics aggregation (real-time)

### Key Responsibilities:
- PostgreSQL database with Prisma ORM
- File storage migration (S3/Blob)
- Data integrity and validation
- Performance optimization (indexing, query optimization)

### Deliverables:
- Database schema (Prisma)
- API endpoints (ready for Next.js API routes)
- File storage integration
- Data migration scripts

### Dependencies:
- Integrates with **API Specialist Agent** for endpoints
- Works with **RAG Specialist Agent** for AI mood analysis

### Handoff To:
- **API Specialist Agent** (endpoint implementation)
- **DevOps Specialist Agent** (database deployment)

---

## 7️⃣ **RAG AND GRAPH/PIPELINE SPECIALIST AGENT**
**Role**: AI mood analysis, data pipelines, knowledge graphs

### Tasks:
- **Phase 9**: AI mood tag pre-population
  - Audio analysis pipeline (Librosa, feature extraction)
  - Mood classification model (trained in-house)
  - Pre-population accuracy validation (>90% semantic search)
- **Mood Analysis Pipeline**:
  - Chunk audio into segments (512-token segments)
  - Extract embeddings (BERT variants, speaker embeddings)
  - Mood state prediction (Melancholic, Joyful, etc.)
  - Feeling tag extraction (Anxious, Great, etc.)
  - Vibe calculation (0-100 Calm ↔ Energetic)
  - Genre classification (multi-label)
- **Knowledge Graph** (Future):
  - Neo4j graph for track relationships
  - Mood-based similarity graphs
  - User preference graphs

### Key Responsibilities:
- AI model training (in-house, no external APIs)
- Retrieval accuracy (recall/precision >90%)
- Pipeline orchestration (Apache Airflow or Kubeflow)
- Real-time inference (<200ms latency)

### Deliverables:
- `lib/aiMoodAnalysis.ts` - AI mood pre-population
- Trained mood classification model
- Feature extraction pipeline
- Similarity matching algorithm

### Dependencies:
- Audio files from **Backend Specialist Agent**
- Integration with **Front-End Specialist Agent** (upload flow)

### Handoff To:
- **Front-End Specialist Agent** (UI integration)
- **Backend Specialist Agent** (model serving)

---

## 8️⃣ **API AND OAUTH SPECIALIST AGENT**
**Role**: API design, OAuth, authentication, security

### Tasks:
- **Phase 8**: Artist signup legal compliance integration
  - OAuth 2.0 / OpenID Connect implementation
  - Token validation (JWKS endpoint)
  - Digital signature workflow (JWT-based)
- **API Design**:
  - RESTful endpoints (Next.js API routes)
  - OpenAPI/Swagger documentation
  - Rate limiting (Redis-based, 100 req/min)
  - Input validation (Joi/Zod schemas)
- **Authentication Flows**:
  - User authentication (JWT, refresh tokens)
  - Artist authentication (enhanced with legal compliance)
  - Admin authentication
- **Security**:
  - CSRF protection
  - XSS prevention
  - SQL injection prevention
  - API gateway (Kong or similar)

### Key Responsibilities:
- OAuth 2.1/PKCE implementation
- API security (OWASP top 10 mitigation)
- Token refresh mechanisms
- Rate limiting and throttling

### Deliverables:
- Authentication middleware
- API route handlers (`/api/auth/*`, `/api/artists/*`, etc.)
- OpenAPI documentation
- Security audit report

### Dependencies:
- Database from **Backend Specialist Agent**
- Front-end integration with **Front-End Specialist Agent**

### Handoff To:
- **Front-End Specialist Agent** (client integration)
- **Master Engineer Inspector Agent** (security review)

---

## 9️⃣ **VOICE CLONE SPECIALIST AGENT** (Artist Voices for Affirmations)
**Role**: Voice cloning for artist voices in affirmations

### Tasks:
- **Phase 5.3**: Affirmations voice system
  - Voice cloning from artist audio samples (5+ minutes)
  - Preprocessing (normalize to -1 to 1, extract features with Librosa)
  - Tortoise TTS variant training (in-house)
  - Speaker embeddings (Resemblyzer encoder)
  - Artist opt-in consent verification
- **Voice Quality**:
  - Mean Opinion Score (MOS) >4.5
  - Similarity scores vs. original
  - Ethical safeguards (consent verification)

### Key Responsibilities:
- In-house voice cloning (no external APIs)
- High-fidelity voice replication
- Ethical consent workflows
- Integration with affirmations system

### Deliverables:
- Voice cloning pipeline
- Trained artist voice models
- Consent verification system
- Voice quality metrics

### Dependencies:
- Artist audio samples from **Backend Specialist Agent**
- Integration with **Text-to-Voice Specialist Agent**

### Handoff To:
- **Text-to-Voice Specialist Agent** (TTS integration)

---

## 🔟 **TEXT-TO-VOICE APP SPECIALIST AGENT** (Affirmations TTS)
**Role**: TTS system for affirmations playback

### Tasks:
- **Phase 5.3**: Affirmations audio generation
  - VITS model training (end-to-end, custom dataset)
  - Text preprocessing (grapheme-to-phoneme)
  - Prosody prediction (pitch, duration)
  - Waveform synthesis (Parallel WaveGAN vocoder)
  - Inference speed <50ms per second of audio
- **Affirmations Integration**:
  - Personalized affirmations (per subscriber)
  - Standard affirmations
  - Multiple voices (team + artist voices)

### Key Responsibilities:
- In-house TTS model (no external services)
- Natural prosody and expressiveness
- Multilingual support (future)
- Low-latency inference

### Deliverables:
- TTS model (VITS-based)
- Affirmations audio generation pipeline
- Prosody prediction module
- Integration with affirmations player

### Dependencies:
- Voice models from **Voice Clone Specialist Agent**
- Text input from **Front-End Specialist Agent**

### Handoff To:
- **AV Specialist Agent** (audio playback)
- **Front-End Specialist Agent** (UI integration)

---

## 1️⃣1️⃣ **DEVOPS AUTOMATION SPECIALIST AGENT**
**Role**: CI/CD pipelines, infrastructure automation, deployment

### Tasks:
- **CI/CD Pipeline Setup**:
  - GitHub Actions workflows
  - Unit tests (Jest)
  - Docker image builds
  - AWS ECS deployment (blue-green strategy)
- **Infrastructure as Code**:
  - Terraform modules (VPC, subnets, security groups)
  - State management (S3 backend)
  - Auto-scaling configuration
- **Monitoring & Logging**:
  - Prometheus metrics collection
  - Grafana dashboards
  - Alertmanager notifications (CPU >80%)
  - Structured logging (ELK Stack or Datadog)

### Key Responsibilities:
- Zero-downtime deployments
- Auto-scaling (pods based on CPU >70%)
- Secrets management (HashiCorp Vault)
- Disaster recovery procedures

### Deliverables:
- GitHub Actions workflows
- Terraform configurations
- Kubernetes manifests (if applicable)
- Monitoring dashboards

### Dependencies:
- Code from all development agents
- Infrastructure requirements from **Backend Specialist Agent**

### Handoff To:
- **GitOps Specialist Agent** (Git-based deployments)
- **Master Engineer Inspector Agent** (production readiness)

---

## 1️⃣2️⃣ **GITOPS SPECIALIST AGENT**
**Role**: Git-based deployments, Flux, Argo CD, declarative infrastructure

### Tasks:
- **GitOps Repository Setup**:
  - Flux-based deployments (CNCF-graduated, v2.3+)
  - Repository structure (clusters, namespaces, apps)
  - Bootstrap configuration
- **Application Deployment**:
  - Argo CD application manifests
  - Multi-environment support (dev/staging/prod)
  - Canary deployments (Argo Rollouts)
- **Infrastructure Management**:
  - Terraform + Argo CD integration
  - HashiCorp Vault integration for secrets
  - Git signing (GPG or SSH, mandatory in 2025)

### Key Responsibilities:
- Declarative configurations (YAML/JSON)
- Pull-based reconciliation (Flux polls Git)
- Observability and rollbacks (Git history)
- Security (branch protection, signed commits)

### Deliverables:
- GitOps repository structure
- Flux/Argo CD configurations
- Deployment pipelines
- Rollback procedures

### Dependencies:
- Infrastructure from **DevOps Specialist Agent**
- Application code from all development agents

### Handoff To:
- **Master Engineer Inspector Agent** (final deployment approval)

---

## 1️⃣3️⃣ **MARKETING/LANDING PAGE LAYOUT AGENT**
**Role**: Marketing pages, conversion optimization, user acquisition

### Tasks:
- **Landing Page Design**:
  - Hero section optimization (above-the-fold)
  - CTA placements (sticky footer, post-value-prop triggers)
  - Social proof (testimonials, user counts)
  - A/B testing setup (Google Optimize, Optimizely)
- **Conversion Optimization**:
  - Heatmapping analysis (Hotjar)
  - F-pattern reading optimization
  - Scarcity triggers (limited beta invites)
  - Mobile-first responsive layouts
- **Marketing Pages**:
  - Home page marketing sections
  - Pricing page (subscription tiers)
  - Artist signup landing page

### Key Responsibilities:
- Conversion rate optimization (30-50% improvement target)
- SEO/SEM for music discovery keywords
- Viral growth hacks (referral programs)
- Community building (Discord, Reddit integration)

### Deliverables:
- Landing page designs (Figma)
- A/B test recommendations
- Conversion optimization report
- Marketing copy and CTAs

### Dependencies:
- UI designs from **UI Specialist Agent**
- UX flows from **UX Specialist Agent**

### Handoff To:
- **Front-End Specialist Agent** (implementation)
- **Master Engineer Inspector Agent** (conversion validation)

---

## 1️⃣4️⃣ **AGENT AUDITOR & VERIFIER SPECIALIST AGENT**
**Role**: Quality assurance, agent output validation, tool usage verification

### Tasks:
- **Ongoing Audits** (Throughout Development):
  - Verify each agent used correct tools
  - Confirm all required actions completed
  - Flag incomplete builds or missing implementations
  - Suggest fixes or prompt enhancements
- **Phase 16**: Final testing & validation
  - Visual regression testing (pixel-perfect validation)
  - Functional testing (all features working)
  - Security audits (OWASP, penetration testing)
  - Performance testing (load, stress tests)

### Key Responsibilities:
- Cross-agent validation
- Tool usage verification
- Code quality checks
- Production readiness scoring

### Deliverables:
- Audit reports per agent
- Quality assurance checklist
- Production readiness scorecard
- Fix recommendations

### Dependencies:
- Outputs from all agents
- Access to code repositories
- Testing frameworks

### Handoff To:
- **Master Engineer Inspector Agent** (final approval)

---

## 1️⃣5️⃣ **MASTER ENGINEER INSPECTOR AGENT**
**Role**: Final gatekeeper, production readiness, holistic system review

### Tasks:
- **Final System Review**:
  - Collect outputs from all agents
  - Assess against criteria (performance, security, UX)
  - Score each component (0-100 scale)
  - Identify critical issues requiring revisions
- **Production Readiness Assessment**:
  - Security vulnerabilities (SQL injection, XSS, CSRF)
  - Performance bottlenecks (database queries, API latency)
  - UX/UI inconsistencies
  - Integration issues between agents
- **Deployment Approval**:
  - Approve or mandate revisions
  - Production deployment checklist
  - Monitoring setup verification

### Key Responsibilities:
- Holistic system engineering review
- Risk assessment
- Final quality gates
- Production deployment approval

### Deliverables:
- Production readiness report
- Component scores (Front-end: 85/100, Backend: 90/100, etc.)
- Issue assignments to specific agents
- Deployment approval/rejection

### Dependencies:
- All agent outputs
- Audit reports from **Agent Auditor**

### Handoff To:
- **DevOps/GitOps Specialists** (approved deployment)

---

## 1️⃣6️⃣ **MOBILE SPECIALIST AGENT** (Future Phase)
**Role**: iOS/Android app development (Post-MVP)

### Tasks:
- **Future Mobile App Development**:
  - React Native or Flutter app
  - Native iOS (SwiftUI) and Android (Kotlin) features
  - Offline playback support (SQLite sync)
  - Push notifications (Firebase Cloud Messaging)
  - Apple Watch integration (stress monitoring)

### Key Responsibilities:
- Cross-platform compatibility
- Performance optimization (battery usage)
- App store guidelines compliance
- Hardware integration (sensors, ARKit)

### Deliverables:
- Mobile app codebase
- App store submissions
- Device compatibility testing

### Dependencies:
- Web app from **Front-End Specialist Agent**
- Backend APIs from **Backend/API Specialists**

---

## 1️⃣7️⃣ **UPWORK PAPERWORK & PROPOSAL SPECIALIST AGENT**
**Role**: Business operations, proposal generation (Not Directly Code-Related)

### Tasks:
- **Business Documentation**:
  - Service proposals for EmPulse Music offerings
  - Contract templates for artist agreements
  - Milestone definitions for development projects
  - Pricing strategy benchmarking

### Note:
- Not directly involved in code development
- Supports business operations and client acquisition
- Can assist with artist onboarding documentation

---

## 🔄 **DEPENDENCY FLOW DIAGRAM**

```
┌─────────────────────────────────────────────────────────────┐
│ REVERSE ENGINEERING → UI SPECIALIST → FRONT-END SPECIALIST  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ UX SPECIALIST → FRONT-END SPECIALIST                        │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ BACKEND SPECIALIST → API SPECIALIST → FRONT-END SPECIALIST  │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ RAG SPECIALIST → BACKEND SPECIALIST                         │
│ VOICE CLONE → TTS SPECIALIST → AV SPECIALIST → FRONT-END    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ MARKETING SPECIALIST → FRONT-END SPECIALIST                 │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ ALL AGENTS → AGENT AUDITOR → MASTER INSPECTOR               │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ MASTER INSPECTOR → DEVOPS → GITOPS → DEPLOYMENT            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 **CRITICAL INTEGRATION CHECKPOINTS**

1. **Checkpoint 1: Design System Handoff**
   - **Reverse Engineering** → **UI Specialist** → **Front-End Specialist**
   - Deliverable: Pixel-perfect design system in Figma + Tailwind config

2. **Checkpoint 2: Backend API Integration**
   - **Backend Specialist** → **API Specialist** → **Front-End Specialist**
   - Deliverable: API endpoints with authentication

3. **Checkpoint 3: AI Mood Analysis Integration**
   - **RAG Specialist** → **Backend Specialist** → **Front-End Specialist**
   - Deliverable: AI mood pre-population in upload flow

4. **Checkpoint 4: Audio Playback Integration**
   - **AV Specialist** → **Front-End Specialist**
   - Deliverable: Lossless audio player with PiP support

5. **Checkpoint 5: Affirmations Voice Integration**
   - **Voice Clone Specialist** → **TTS Specialist** → **AV Specialist** → **Front-End Specialist**
   - Deliverable: Affirmations audio with artist voices

6. **Checkpoint 6: Production Readiness**
   - **All Agents** → **Agent Auditor** → **Master Inspector** → **DevOps/GitOps**
   - Deliverable: Production deployment approval

---

## 🎯 **AGENT PRIORITIZATION (MVP vs. Future)**

### **MVP Phase (Critical Agents for Launch):**
1. Reverse Engineering Specialist
2. UI Specialist
3. UX Specialist
4. Front-End Specialist
5. Backend Specialist
6. API/OAuth Specialist
7. AV Specialist
8. RAG Specialist (for AI mood analysis)
9. DevOps Specialist
10. Agent Auditor
11. Master Inspector

### **Post-MVP (Future Enhancements):**
12. Voice Clone Specialist (affirmations with artist voices)
13. TTS Specialist (full affirmations system)
14. Mobile Specialist (iOS/Android apps)
15. GitOps Specialist (advanced deployments)

### **Supporting (Non-Code):**
16. Marketing/Landing Page Agent
17. Upwork Specialist (business operations)

---

## 📝 **NEXT STEPS**

1. **Assign this plan to each agent** - Each agent receives their specific section
2. **Set up communication channels** - For handoffs and integration checkpoints
3. **Establish review cycles** - Weekly agent reviews with Master Inspector
4. **Track dependencies** - Use project management tools (Jira, Linear, etc.)
5. **Measure progress** - KPIs per agent (code coverage, test pass rates, etc.)

---

**Plan Version**: 1.0  
**Last Updated**: January 15, 2026  
**Total Agents**: 17  
**Critical Agents (MVP)**: 11
