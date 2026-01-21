# GitOps Quick Start Guide

## Bootstrap Flux (One-Time Setup)

### Option 1: Bootstrap with GitHub Token

```bash
export GITHUB_TOKEN=<your-github-token>
export GITHUB_USER=NextElevenDev
export GITHUB_REPO=gitops-repo

flux bootstrap github \
  --owner=$GITHUB_USER \
  --repository=$GITHUB_REPO \
  --branch=main \
  --path=./clusters/prod \
  --token-auth
```

### Option 2: Bootstrap with SSH

```bash
flux bootstrap git \
  --url=git@github.com:NextElevenDev/gitops-repo.git \
  --branch=main \
  --path=./clusters/prod \
  --ssh-hostname=github.com
```

## Verify Installation

```bash
# Check Flux components
flux check

# Verify Flux pods are running
kubectl get pods -n flux-system

# List GitRepository sources
flux get sources git

# List Kustomizations
flux get kustomizations
```

## Common Commands

### Check Deployment Status

```bash
# Check if Flux is reconciling
flux get kustomizations -A

# Check deployment status
kubectl get deployment empulse-music -n empulse-music

# Check pod status
kubectl get pods -n empulse-music -l app=empulse-music

# View logs
kubectl logs -n empulse-music -l app=empulse-music --tail=50 -f
```

### Force Reconciliation

```bash
# Reconcile specific Kustomization
flux reconcile kustomization flux-system --with-source

# Reconcile GitRepository
flux reconcile source git flux-system
```

### Update Deployment

1. Edit the deployment manifest in Git
2. Commit and push changes
3. Flux will automatically reconcile (within **5 minutes** per 2025 best practices)
4. Or force immediate reconciliation: `flux reconcile kustomization flux-system --with-source`

**Note**: With GitHub Actions CI/CD (`.github/workflows/gitops-deploy.yml`), deployments are automated:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- Push to `main` → CI builds image → Updates Git manifest → Flux reconciles automatically

### Rollback

```bash
# View Git history
git log --oneline --graph clusters/prod/apps/

# Revert to previous commit
git revert <commit-hash>
git push

# Flux will automatically apply the rollback
```

## Troubleshooting Quick Reference

### Flux not working?

```bash
# Check Flux logs
kubectl logs -n flux-system -l app=kustomize-controller --tail=100

# Restart Flux components
kubectl rollout restart deployment -n flux-system
```

### Deployment stuck?

```bash
# Describe deployment
kubectl describe deployment empulse-music -n empulse-music

# Check events
kubectl get events -n empulse-music --sort-by='.lastTimestamp'

# Delete and let Flux recreate
kubectl delete deployment empulse-music -n empulse-music
```

### Image pull errors?

```bash
# Verify image pull secret
kubectl get secret ghcr-secret -n empulse-music

# Test image manually
kubectl run test --image=ghcr.io/nexteleven/empulse-music:latest --rm -it --restart=Never -- /bin/sh
```

## Additional Setup Steps

### 1. Infrastructure Provisioning (Terraform)

If you need to provision a new cluster:

```bash
cd gitops/terraform
terraform init
terraform plan -var="cluster_name=nexteleven-prod"
terraform apply
aws eks update-kubeconfig --region us-west-2 --name nexteleven-prod
```

**See**: `terraform/README.md` for detailed instructions

### 2. Image Pull Secret

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_USERNAME \
  --docker-password=YOUR_TOKEN \
  -n empulse-music
```

### 3. Secrets Management (SOPS)

For encrypted secrets in Git:

```bash
# Install SOPS
brew install sops

# Encrypt a secret
sops -e -i secrets/prod/empulse-music-secrets.yaml
```

**See**: `secrets/README.md` for SOPS setup

### 4. Monitoring (Prometheus/Grafana)

```bash
# Apply Prometheus configuration
kubectl apply -f monitoring/prometheus-config.yaml

# Access Prometheus UI
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090
```

**See**: `monitoring/README.md` for complete setup

### 5. CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/gitops-deploy.yml`) is ready:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- ✅ Automated Docker builds
- ✅ Staging deployment (automatic)
- ✅ Production deployment (manual approval)
- ✅ Slack notifications on failure

**Configure GitHub Secrets**:
<<<<<<< HEAD

=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
- `GITHUB_TOKEN` (automatically provided)
- `SLACK_WEBHOOK_URL` (optional, for notifications)

### 6. Ingress & TLS

Install ingress controller and cert-manager:

```bash
# Install nginx-ingress
helm install ingress-nginx ingress-nginx/ingress-nginx

# Install cert-manager
helm install cert-manager jetstack/cert-manager --set installCRDs=true
```

## Quick Reference

- **Terraform**: `gitops/terraform/` - Infrastructure provisioning
- **SOPS Secrets**: `gitops/secrets/` - Encrypted secrets management
- **Monitoring**: `gitops/monitoring/` - Prometheus/Grafana configs
- **CI/CD**: `.github/workflows/gitops-deploy.yml` - GitHub Actions pipeline
