# GitOps Configuration for EmPulse Music

This directory contains comprehensive GitOps configurations for deploying EmPulse Music to Kubernetes following **2025 best practices** with Flux (v2.3+), Terraform, CI/CD, and monitoring.

## Core GitOps Tenets (Refined for 2025)

- ✅ **Declarative Configurations**: All Kubernetes manifests and infrastructure configs stored in Git
- ✅ **Pull-Based Reconciliation**: Flux polls Git every 1-5 minutes and applies changes automatically
- ✅ **Observability and Rollbacks**: Prometheus/Grafana for monitoring, Git history for easy rollbacks
- ✅ **Security**: Branch protection, signed commits, SOPS for secrets, OPA for policy-as-code

## Repository Structure

```
gitops/
├── bootstrap/              # Flux bootstrap configuration
│   └── flux.yaml          # GitRepository and Kustomization for Flux (2025 best practices)
├── clusters/
│   ├── prod/              # Production cluster configurations
│   │   ├── namespaces.yaml
│   │   ├── kustomization.yaml
│   │   └── apps/
│   │       ├── empulse-music-deployment.yaml
│   │       ├── empulse-music-service.yaml
│   │       ├── empulse-music-ingress.yaml
│   │       └── kustomization.yaml
│   └── staging/           # Staging cluster configurations
│       ├── namespaces.yaml
│       ├── kustomization.yaml
│       └── apps/
│           ├── empulse-music-deployment.yaml
│           ├── empulse-music-service.yaml
│           └── kustomization.yaml
├── terraform/             # Infrastructure as Code (Example 2)
│   ├── main.tf            # AWS EKS cluster provisioning
│   ├── variables.tf       # Terraform variables
│   ├── outputs.tf         # Cluster outputs for Flux bootstrap
│   └── README.md          # Terraform setup guide
├── secrets/               # Secrets management with SOPS
│   ├── .sops.yaml         # SOPS configuration (KMS/Age encryption)
│   └── README.md          # SOPS setup and usage
├── monitoring/            # Observability configurations
│   ├── prometheus-config.yaml  # Prometheus scraping config
│   └── README.md          # Monitoring setup guide
├── GITOPS_SETUP.md        # Setup documentation
└── README.md              # This file
```

## Prerequisites

1. **Kubernetes Cluster** (1.24+)
2. **kubectl** configured to access your cluster
3. **Flux CLI** installed (`brew install fluxcd/tap/flux` or see [Flux Installation](https://fluxcd.io/docs/installation/))
4. **GitHub Repository** for GitOps configs (or use this repo with a separate branch)

## Initial Setup

### 1. Install Flux on Your Cluster

Bootstrap Flux to your GitHub repository:

```bash
flux bootstrap github \
  --owner=NextElevenDev \
  --repository=gitops-repo \
  --branch=main \
  --path=./clusters/prod \
  --token-auth
```

Or if using a different Git provider:

```bash
flux bootstrap git \
  --url=https://github.com/NextElevenDev/gitops-repo \
  --branch=main \
  --path=./clusters/prod
```

### 2. Create Image Pull Secret

Create a secret for pulling images from GitHub Container Registry:

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=NextElevenDev \
  --docker-password=<GITHUB_TOKEN> \
  --namespace=empulse-music

kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=NextElevenDev \
  --docker-password=<GITHUB_TOKEN> \
  --namespace=empulse-music-staging
```

### 3. Verify Flux Installation

```bash
flux check
kubectl get pods -n flux-system
```

## Implementation Examples

This GitOps setup implements **three core examples** from GitOps best practices:

### Example 1: Kubernetes Cluster Management with Flux ✅

Following the pattern from GitOps principles, our deployment follows this structure:

```yaml
# Similar to nginx-deployment.yaml example from best practices
apiVersion: apps/v1
kind: Deployment
metadata:
  name: empulse-music
spec:
<<<<<<< HEAD
  replicas: 3 # 3 replicas (like nginx example)
=======
  replicas: 3                    # 3 replicas (like nginx example)
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  selector:
    matchLabels:
      app: empulse-music
  template:
    metadata:
      labels:
        app: empulse-music
    spec:
      containers:
<<<<<<< HEAD
        - name: empulse-music
          image: ghcr.io/nexteleven/empulse-music:latest
          ports:
            - containerPort: 3000 # Next.js default port
```

**Features:**

=======
      - name: empulse-music
        image: ghcr.io/nexteleven/empulse-music:latest
        ports:
        - containerPort: 3000     # Next.js default port
```

**Features:**
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Flux reconciles every 5 minutes (per 2025 best practices)
- Automatic scaling via Kustomize overlays for dev/staging/prod
- Health checks with healthChecks in Kustomization
- Git history for easy rollbacks

**See**: `bootstrap/flux.yaml` and `clusters/prod/apps/empulse-music-deployment.yaml`

### Example 2: Infrastructure as Code with Terraform ✅

Separate infrastructure provisioning from application deployments:

- **Terraform**: Provisions AWS EKS cluster (VPC, networking, nodes)
- **Flux**: Manages all Kubernetes application manifests

**Quick Start:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```bash
cd gitops/terraform
terraform init
terraform plan -var="cluster_name=nexteleven-prod"
terraform apply
```

**After cluster creation**, bootstrap Flux:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```bash
flux bootstrap github \
  --owner=NextElevenDev \
  --repository=gitops-repo \
  --branch=main \
  --path=./clusters/prod \
  --token-auth
```

**See**: `terraform/` directory for complete AWS EKS setup

### Example 3: CI/CD Pipeline with GitHub Actions ✅

GitHub Actions workflow for automated builds and deployments:

```yaml
# .github/workflows/gitops-deploy.yml
name: GitOps Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    # Build Docker image and push to GHCR
  deploy-staging:
    # Update Git manifests, Flux reconciles automatically
  deploy-production:
    # Manual approval required for production
```

**Workflow:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
1. **Build**: CI builds Docker image → pushes to GHCR
2. **Update Git**: Actions updates deployment manifest with new image tag
3. **Flux Reconciliation**: Flux detects change (within 5 minutes) → applies automatically
4. **Notifications**: Slack webhook on failure (optional)

**See**: `.github/workflows/gitops-deploy.yml` for complete workflow

## Deployment Workflows

### Automated CI/CD Deployment (Recommended)

The GitHub Actions workflow (`.github/workflows/gitops-deploy.yml`) automates the entire process:

1. **Code Push**: Developer pushes to `main` branch
2. **CI Build**: GitHub Actions builds Docker image and pushes to GHCR
3. **Git Update**: Actions commits updated image tag to deployment manifest
4. **Flux Reconciliation**: Flux detects change (within 5 minutes) → applies automatically
5. **Zero-Downtime**: Rolling update ensures no service interruption

**Intervals:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Flux GitRepository: Polls every **1 minute**
- Flux Kustomization: Reconciles every **5 minutes** (updated per 2025 best practices)

### Manual Deployment

1. Update the deployment manifest with new image tag:
   ```bash
   # Edit clusters/prod/apps/empulse-music-deployment.yaml
   # Change: image: ghcr.io/nexteleven/empulse-music:new-tag
   ```
2. Commit and push to Git:
   ```bash
   git add clusters/prod/apps/empulse-music-deployment.yaml
   git commit -m "chore: deploy new version"
   git push
   ```
3. Flux automatically reconciles within 5 minutes

### Rollback

Use Git history for easy rollbacks:

```bash
# View recent commits
git log --oneline clusters/prod/apps/

# Rollback to a specific commit
git revert <commit-hash>
git push
```

Flux will automatically reconcile and rollback the deployment to the previous state.

## Configuration Details

### Production Cluster (`clusters/prod/`)

- **Replicas**: 3
<<<<<<< HEAD
- **Resources**:
=======
- **Resources**: 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  - Requests: 100m CPU, 256Mi memory
  - Limits: 500m CPU, 512Mi memory
- **Ingress**: Configured with TLS (Let's Encrypt)
- **Health Checks**: Liveness and readiness probes enabled

### Staging Cluster (`clusters/staging/`)

- **Replicas**: 2
- **Resources**: Same as production
- **No Ingress**: Access via port-forward or LoadBalancer (if needed)

## Security Best Practices (2025 Standards)

Following enterprise security standards for GitOps:

### 1. Branch Protection & Signed Commits

**Mandatory in 2025 enterprise standards:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- ✅ Enable branch protection on `main` branch (require PR reviews)
- ✅ **Git signing**: Use GPG or SSH keys for commits (mandatory for production)
- ✅ Require status checks before merging

**Setup Git signing:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```bash
# GPG signing
git config --global user.signingkey <GPG_KEY_ID>
git config --global commit.gpgsign true

# Or SSH signing (newer, simpler)
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

### 2. Secrets Management with SOPS ✅

**Never commit unencrypted secrets.** Use SOPS for encrypted secrets in Git:

```bash
# Encrypt a secret
sops -e -i secrets/prod/empulse-music-secrets.yaml

# Edit encrypted file (auto-re-encrypts on save)
sops secrets/prod/empulse-music-secrets.yaml
```

**See**: `secrets/` directory for SOPS configuration and examples

### 3. Policy as Code with OPA

Integrate Open Policy Agent for policy enforcement:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Resource limits enforcement
- Image registry whitelist
- Namespace restrictions
- Security context requirements

**Setup** (example):
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```bash
kubectl apply -f https://raw.githubusercontent.com/open-policy-agent/gatekeeper/master/deploy/gatekeeper.yaml
```

### 4. RBAC and Access Control

- Restrict access to `flux-system` namespace
- Use Kubernetes RBAC for GitOps admins vs. developers
- Implement least-privilege access

### 5. Image Security

- Scan container images for vulnerabilities (GitHub Actions, Trivy)
- Use image digest instead of tags for production
- Sign container images with Cosign

## Monitoring and Observability

### Flux Status Monitoring

```bash
# Check Flux components
flux check

# List all GitRepository resources
flux get sources git

# List all Kustomizations
flux get kustomizations

# Get detailed status
flux get kustomizations empulse-music -n flux-system

# Watch reconciliation status
watch flux get kustomizations
```

### Prometheus & Grafana Integration ✅

**Complete monitoring setup** following GitOps observability principles:

**Metrics Tracked:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- ✅ Flux reconciliation status (`flux_kustomization_condition`)
- ✅ Sync duration (`flux_kustomization_reconcile_duration_seconds`)
- ✅ Application health (deployment replicas, pod status)
- ✅ Resource utilization (CPU, memory, network)
- ✅ Error rates and crash loops

**Quick Start:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
```bash
# Apply Prometheus configuration
kubectl apply -f monitoring/prometheus-config.yaml

# Access Prometheus UI
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
# Open http://localhost:9090
```

**Grafana Dashboards:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Flux GitOps Dashboard (ID: 15584)
- Kubernetes Cluster Monitoring (ID: 7249)
- Custom EmPulse Music dashboard

**Alerting Rules Included:**
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- FluxReconciliationFailed (critical)
- DeploymentNotReady (warning)
- PodCrashLooping (warning)
- HighMemoryUsage (warning)

**See**: `monitoring/` directory for complete Prometheus configuration and alert rules

## Troubleshooting

### Flux not reconciling

```bash
# Check Flux logs
kubectl logs -n flux-system -l app=kustomize-controller

# Force reconciliation
flux reconcile kustomization flux-system --with-source
```

### Deployment not updating

```bash
# Check deployment status
kubectl get deployment empulse-music -n empulse-music

# Check pod status
kubectl get pods -n empulse-music -l app=empulse-music

# View pod logs
kubectl logs -n empulse-music -l app=empulse-music --tail=100
```

### Image pull errors

```bash
# Verify secret exists
kubectl get secret ghcr-secret -n empulse-music

# Test image pull manually
kubectl run test-pull --image=ghcr.io/nexteleven/empulse-music:latest --dry-run=client -o yaml
```

## Quick Reference

### Bootstrap Commands

```bash
# 1. Provision infrastructure (Terraform)
cd gitops/terraform
terraform apply

# 2. Configure kubectl
aws eks update-kubeconfig --region us-west-2 --name nexteleven-prod

# 3. Bootstrap Flux
flux bootstrap github \
  --owner=NextElevenDev \
  --repository=gitops-repo \
  --branch=main \
  --path=./clusters/prod \
  --token-auth

# 4. Verify installation
flux check
kubectl get pods -n flux-system
```

### Common Operations

```bash
# Force reconciliation
flux reconcile kustomization flux-system --with-source

# Suspend reconciliation
flux suspend kustomization flux-system

# Resume reconciliation
flux resume kustomization flux-system

# View reconciliation events
flux get kustomizations empulse-music -n flux-system --watch
```

## Compliance with GitOps Principles

<<<<<<< HEAD
| Principle                  | Implementation                               | Status      |
| -------------------------- | -------------------------------------------- | ----------- |
| **Declarative Configs**    | YAML manifests in Git                        | ✅ Complete |
| **Pull-Based**             | Flux polls Git every 1m, reconciles every 5m | ✅ Complete |
| **Observability**          | Prometheus + Grafana with Flux metrics       | ✅ Complete |
| **Rollbacks**              | Git history + `git revert`                   | ✅ Complete |
| **Security**               | SOPS, signed commits, OPA-ready              | ✅ Complete |
| **Multi-Env**              | Prod + Staging with Kustomize                | ✅ Complete |
| **CI/CD Integration**      | GitHub Actions with GitOps                   | ✅ Complete |
| **Infrastructure as Code** | Terraform for AWS EKS                        | ✅ Complete |
=======
| Principle | Implementation | Status |
|-----------|---------------|--------|
| **Declarative Configs** | YAML manifests in Git | ✅ Complete |
| **Pull-Based** | Flux polls Git every 1m, reconciles every 5m | ✅ Complete |
| **Observability** | Prometheus + Grafana with Flux metrics | ✅ Complete |
| **Rollbacks** | Git history + `git revert` | ✅ Complete |
| **Security** | SOPS, signed commits, OPA-ready | ✅ Complete |
| **Multi-Env** | Prod + Staging with Kustomize | ✅ Complete |
| **CI/CD Integration** | GitHub Actions with GitOps | ✅ Complete |
| **Infrastructure as Code** | Terraform for AWS EKS | ✅ Complete |
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

## Recommendations for NextEleven

Based on 2025 GitOps best practices:

1. ✅ **Start with Flux** - Already implemented for Kubernetes-centric apps (simplicity wins)
2. ⚠️ **Adopt Git signing** - GPG or SSH (mandatory in 2025 enterprise standards)
3. ✅ **Monitor with Prometheus** - GitOps Toolkit metrics exporter configured
4. 📋 **Scale considerations** - Consider Weave GitOps Enterprise or Argo CD Enterprise for:
   - Advanced SSO integration
   - Multi-cluster management
   - Enhanced RBAC and audit logging

## Additional Resources

### Documentation Files
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `GITOPS_SETUP.md` - Detailed setup guide
- `GITOPS_EXAMPLES_ALIGNMENT.md` - **NEW**: Alignment with three core GitOps examples (2025)
- `IMPLEMENTATION_STATUS.md` - **NEW**: Implementation status and compliance checklist
- `QUICK_START.md` - Quick start guide
- `terraform/README.md` - Terraform infrastructure setup
- `secrets/README.md` - SOPS secrets management
- `monitoring/README.md` - Prometheus/Grafana setup

### Example Files
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `.github/workflows/gitops-deploy.yml` - GitHub Actions CI/CD pipeline
- `bootstrap/flux.yaml` - Flux bootstrap configuration (2025 best practices)
- `monitoring/prometheus-config.yaml` - Complete Prometheus scraping config

## References

- [Flux Documentation](https://fluxcd.io/docs/) - CNCF-graduated GitOps tool
- [Kustomize Documentation](https://kustomize.io/) - Kubernetes native config management
- [Terraform AWS EKS Module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/)
- [SOPS Documentation](https://github.com/getsops/sops) - Secrets encryption
- [Prometheus Documentation](https://prometheus.io/docs/)
- [GitOps Principles](https://www.weave.works/technologies/gitops/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)

---

**Last Updated**: January 2026  
**Flux Version**: v2.3+  
**Kubernetes Version**: 1.31+  
**Status**: ✅ Production-Ready
