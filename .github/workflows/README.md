# GitHub Actions Workflows

This directory contains all GitHub Actions workflows for the Spot repository.

## Workflow Overview

### 1. **pre-deployment-validation.yml**
**Purpose**: Comprehensive validation before any deployment  
**Triggers**: PRs, pushes to main/fix-all-complete-v1  
**Duration**: ~3-5 minutes

**Checks**:
- TypeScript compilation
- ESLint validation
- Unit tests
- Build verification
- Security scanning
- Configuration validation

### 2. **error-free-deploy.yml**
**Purpose**: Complete deployment pipeline with quality gates  
**Triggers**: Pushes to main/fix-all-complete-v1  
**Duration**: ~10-15 minutes

**Stages**:
1. Pre-deployment validation (must pass)
2. Build application
3. Deploy to Railway
4. Deploy to Vercel
5. Post-deployment verification

### 3. **comprehensive-ci.yml**
**Purpose**: Full CI checks for code quality  
**Triggers**: PRs, pushes, manual dispatch  
**Duration**: ~5-7 minutes

**Includes**:
- Code quality checks
- Test execution with coverage
- Build verification
- Security scanning
- Deployment config validation

### 4. **deploy-all.yml**
**Purpose**: Quick deployment to Railway + Vercel  
**Triggers**: Pushes to main/fix-all-complete-v1  
**Duration**: ~8-12 minutes

**Features**:
- Pre-deployment validation
- Parallel Railway + Vercel deployment
- Status reporting

### 5. **railway-deploy.yml**
**Purpose**: Railway-specific deployment  
**Triggers**: Pushes to main/fix-all-complete-v1  
**Duration**: ~5-8 minutes

### 6. **vercel-deploy.yml**
**Purpose**: Vercel-specific deployment  
**Triggers**: Pushes to main/fix-all-complete-v1  
**Duration**: ~5-8 minutes

### 7. **deployment-status.yml**
**Purpose**: Monitor deployment status  
**Triggers**: After deployment workflows complete

### 8. **build-and-push.yml**
**Purpose**: Build and push Docker images to GitHub Container Registry  
**Triggers**: Pushes to main/develop, tags

### 9. **gitops-deploy.yml**
**Purpose**: GitOps deployment for Kubernetes  
**Triggers**: Pushes to main

## Workflow Dependencies

```
Push to main/fix-all-complete-v1
    ↓
Pre-Deployment Validation (must pass)
    ↓
    ├─→ Comprehensive CI
    ├─→ Error-Free Deploy → Railway + Vercel
    └─→ Deploy All → Railway + Vercel (parallel)
```

## Required Secrets

### Railway
- `RAILWAY_TOKEN` - Railway API token
- `RAILWAY_SERVICE_ID` - Service identifier

### Vercel
- `VERCEL_TOKEN` - Vercel API token
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project identifier

### Optional
- `SLACK_WEBHOOK_URL` - For failure notifications

## Monitoring

View workflows at: `https://github.com/seanebones-lang/Spot/actions`

Check individual run logs for detailed information about:
- Validation results
- Build status
- Deployment progress
- Error messages

## Troubleshooting

See `MONITOR_WORKFLOWS.md` in repository root for detailed troubleshooting guide.
