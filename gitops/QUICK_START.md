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
3. Flux will automatically reconcile (within 10 minutes)
4. Or force immediate reconciliation: `flux reconcile kustomization flux-system --with-source`

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

## Next Steps

1. Set up image pull secret: `kubectl create secret docker-registry ghcr-secret --docker-server=ghcr.io --docker-username=YOUR_USERNAME --docker-password=YOUR_TOKEN -n empulse-music`
2. Configure ingress controller (nginx-ingress)
3. Set up cert-manager for TLS certificates
4. Configure monitoring with Prometheus/Grafana
5. Set up CI/CD pipeline to build and push Docker images
