# GitHub Actions Workflow Monitoring Guide

## How to Monitor Workflows

### 1. Check GitHub Actions Dashboard

**URL**: `https://github.com/seanebones-lang/Spot/actions`

**Steps**:
1. Go to your repository on GitHub
2. Click on "Actions" tab
3. You'll see all workflow runs
4. Click on a specific run to see detailed logs

### 2. Workflow Status Indicators

- ✅ **Green checkmark**: Workflow/job passed
- ❌ **Red X**: Workflow/job failed
- 🟡 **Yellow circle**: Workflow/job in progress
- ⚪ **Gray circle**: Workflow/job pending

### 3. Expected Workflows After Push

When you push to `fix-all-complete-v1` or `main`, these workflows should trigger:

#### **Pre-Deployment Validation**
- File: `.github/workflows/pre-deployment-validation.yml`
- Checks: TypeScript, ESLint, Tests, Build
- Duration: ~3-5 minutes

#### **Comprehensive CI**
- File: `.github/workflows/comprehensive-ci.yml`
- Checks: Code quality, Tests, Build, Security
- Duration: ~5-7 minutes

#### **Error-Free Deploy** (Only if validation passes)
- File: `.github/workflows/error-free-deploy.yml`
- Stages: Validate → Build → Deploy Railway → Deploy Vercel
- Duration: ~10-15 minutes

#### **Deploy All** (Only if validation passes)
- File: `.github/workflows/deploy-all.yml`
- Deploys: Railway + Vercel in parallel
- Duration: ~8-12 minutes

### 4. Monitoring Individual Jobs

Click on a workflow run to see:
- **Jobs list**: All jobs in the workflow
- **Job status**: Pass/fail/pending for each job
- **Job logs**: Click on a job to see detailed logs
- **Artifacts**: Build outputs (if any)

### 5. Key Metrics to Monitor

#### **Pre-Deployment Validation**
- ✅ TypeScript: `npx tsc --noEmit`
- ✅ ESLint: `npm run lint`
- ✅ Tests: `npm test`
- ✅ Build: `npm run build`

#### **Deployment**
- ✅ Railway deployment status
- ✅ Vercel deployment status
- ✅ Post-deployment verification

### 6. Common Issues & Solutions

#### **Workflow Not Triggering**
- ✅ Check branch name matches trigger (`main` or `fix-all-complete-v1`)
- ✅ Verify files changed match path filters
- ✅ Check workflow file syntax

#### **Validation Failing**
- ✅ Check TypeScript errors in logs
- ✅ Review ESLint warnings/errors
- ✅ Verify tests are passing
- ✅ Check build errors

#### **Deployment Failing**
- ✅ Verify GitHub secrets are set:
  - Railway: `RAILWAY_TOKEN`, `RAILWAY_SERVICE_ID`
  - Vercel: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
- ✅ Check deployment logs for specific errors
- ✅ Verify Railway/Vercel dashboards

### 7. GitHub CLI Monitoring (Optional)

```bash
# List recent workflow runs
gh run list

# View specific workflow run
gh run view [run-id]

# Watch workflow in real-time
gh run watch [run-id]

# View workflow logs
gh run view [run-id] --log
```

### 8. Email Notifications

GitHub can send email notifications when:
- Workflow fails
- Workflow succeeds
- Workflow is cancelled

Configure in: Repository Settings → Notifications

### 9. Status Badges

Add to README.md to show workflow status:

```markdown
![CI](https://github.com/seanebones-lang/Spot/workflows/Comprehensive%20CI%20Pipeline/badge.svg)
![Deploy](https://github.com/seanebones-lang/Spot/workflows/Error-Free%20Deployment%20Pipeline/badge.svg)
```

### 10. Real-Time Monitoring

**GitHub Actions Tab**:
- Updates in real-time
- Shows live job progress
- Displays logs as they're generated

**Third-Party Tools** (Optional):
- GitHub Mobile App (notifications)
- GitHub Desktop (status in app)
- Browser extensions for GitHub

---

## Quick Check Commands

```bash
# Check if workflows exist
ls -la .github/workflows/

# View workflow files
cat .github/workflows/*.yml

# Check git status
git status

# View recent commits
git log --oneline -5

# Check GitHub Actions status (requires gh CLI)
gh run list --limit 5
```

---

**Last Updated**: January 2026  
**Repository**: seanebones-lang/Spot  
**Branch**: fix-all-complete-v1
