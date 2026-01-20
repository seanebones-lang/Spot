# Spot Music

## Pixel-Perfect Spotify Clone - Music Streaming Platform

**Status**: 🟢 **In Development**  
**Last Updated**: January 2026

---

## 🚀 Quick Start

### Development

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3001`

### Build

```bash
npm run build
npm start
```

---

## 🛠️ Technical Stack

- **Frontend**: Next.js 15+, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Audio**: Howler.js / Web Audio API
- **Database**: Prisma ORM (ready for implementation)
- **Authentication**: OAuth 2.0 / OpenID Connect (UI ready)
- **Storage**: S3/Blob Storage (ready for implementation)

---

## 🎯 Key Features

### Core Features

- ✅ Pixel-perfect Spotify UI replication (100% parity verified)
- ✅ Standard music streaming (playlists, search, tracks, albums)
- ✅ Wellness integration (check-ins, journaling, affirmations, points)
- ✅ Custom audio player with lossless support (WAV, FLAC)
- ✅ Queue management with drag-and-drop
- ✅ Picture-in-Picture pop-out player
- ✅ Responsive design with smooth animations

### Artist Features

- ✅ Artist dashboard with live stats
- ✅ Track upload with mandatory mood tag adjustment
- ✅ Legal signup & compliance (W-9, PRO, digital signatures)
- ✅ Publish/unpublish toggle for tracks

### Wellness Features

- ✅ Daily mood check-ins with points & streaks
- ✅ Journaling system with music association
- ✅ Affirmations system (audio, personalized)
- ✅ Mental health resource hub
- ✅ Points & gamification system

---

## 📁 Project Structure

```
spot/Spot/
├── app/                    # Next.js app directory (pages)
├── components/             # React components
├── lib/                    # Utilities and helpers
├── stores/                 # Zustand state management
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
├── gitops/                 # Infrastructure as Code
└── scripts/                # Utility scripts
```

---

## 📚 Documentation

### Essential Docs

- [`DEPLOYMENT.md`](./DEPLOYMENT.md) - Deployment instructions
- [`FEATURES.md`](./FEATURES.md) - Feature list
- [`QUICK_START.md`](./QUICK_START.md) - Quick start guide
- [`CHANGELOG.md`](./CHANGELOG.md) - Change log
- [`components/README.md`](./components/README.md) - Component documentation
- [`lib/RAG_SYSTEM_README.md`](./lib/RAG_SYSTEM_README.md) - RAG system docs

### Verification

- [`SPOTIFY_UI_VERIFICATION_REPORT_V3.json`](./SPOTIFY_UI_VERIFICATION_REPORT_V3.json) - Latest UI verification report

### Legal (Reference)

- [`LEGAL_DOCUMENTS_VERIFICATION.md`](./LEGAL_DOCUMENTS_VERIFICATION.md) - Legal pages verification
- [`LEGAL_UPLOAD_SYSTEM_REQUIREMENTS.md`](./LEGAL_UPLOAD_SYSTEM_REQUIREMENTS.md) - Upload system legal requirements

---

## 🎨 Design System

- **Colors**: Spotify palette (#1DB954 green, #121212 dark, etc.)
- **Typography**: Circular font family (Helvetica Neue fallback)
- **Spacing**: 4px base unit
- **Components**: Pixel-perfect Spotify replication
- **Design Tokens**: [`design-tokens.json`](./design-tokens.json)

---

## 🧪 Testing

```bash
npm test
npm run test:watch
npm run test:coverage
```

---

## 📦 Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed deployment instructions.

Infrastructure:

- Docker containerization
- CI/CD pipeline (GitHub Actions)
- Infrastructure as Code (Terraform)
- GitOps (Flux/Argo CD)

---

## 📝 License

See [`LICENSE`](./LICENSE) file for details.

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

---

**Project**: Spot Music  
**Status**: 🟢 In Development
