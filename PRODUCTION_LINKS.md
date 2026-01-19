# 🌐 Spot Music - Production Links

## Live Environments

### Web Application

- **Production**: https://empulse-music.vercel.app
- **Custom Domain**: https://spot-music.com (pending DNS)
- **Status**: ✅ Live

### API & Backend

- **Railway API**: https://spot-music-api.railway.app
- **Health Check**: https://spot-music-api.railway.app/api/health
- **Status**: ⏭️ Ready to deploy

### Mobile Applications

- **Android APK**: `mobile/spot_music_mobile/build/app/outputs/flutter-apk/app-release.apk`
- **iOS TestFlight**: Available after build
- **Status**: ⏭️ Ready to build

### Documentation

- **GitHub Wiki**: https://github.com/seanebones-lang/Spot/wiki
- **API Docs**: `/api` endpoints documented
- **User Guide**: `USER_GUIDE.md`

## Monitoring & Analytics

### Vercel Dashboard

- **Analytics**: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/analytics
- **Deployments**: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/deployments
- **Settings**: https://vercel.com/sean-mcdonnells-projects-4fbf31ab/empulse-music/settings

### Railway Dashboard

- **Projects**: https://railway.app/dashboard
- **Logs**: `railway logs`
- **Metrics**: Railway dashboard

### Sentry

- **Error Tracking**: Configured
- **Performance**: Monitoring enabled
- **Dashboard**: Sentry.io

## GitOps

### ArgoCD

- **UI**: `kubectl port-forward svc/argocd-server -n argocd 8080:443`
- **Applications**: `gitops/argocd/applications/`
- **Status**: ⏭️ Ready to deploy

### Kubernetes

- **Production**: `gitops/k8s/production/`
- **Staging**: `gitops/k8s/staging/`
- **Status**: ✅ Manifests ready

## Quick Access

### Development

```bash
# Local dev server
npm run dev  # Port 3001

# Mobile dev
cd mobile/spot_music_mobile
flutter run
```

### Production

```bash
# Web: Auto-deployed on git push
# API: railway up
# Mobile: npm run mobile:build:android/ios
```

---

**All Links**: Production-ready ✅
