# GitOps Configuration for EmPulse Music

This directory contains the GitOps configurations for deploying EmPulse Music to Kubernetes using Flux (v2.3+).

## Repository Structure

```
gitops/
├── bootstrap/              # Flux bootstrap configuration
│   └── flux.yaml          # GitRepository and Kustomization for Flux
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
└── README.md
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

## Deployment Workflow

### Push-Based Deployment (CI/CD)

1. **Build Docker Image**: CI/CD pipeline builds and pushes image to `ghcr.io/nexteleven/empulse-music:latest`
2. **Update Git**: Commit changes to Git repository
3. **Flux Reconciliation**: Flux automatically detects changes and applies them (every 10 minutes by default)

### Manual Deployment

1. Update the deployment manifest with new image tag
2. Commit and push to Git
3. Flux will reconcile within the interval (10m0s)

### Rollback

Use Git history to rollback:

```bash
# View recent commits
git log --oneline clusters/prod/apps/

# Rollback to a specific commit
git revert <commit-hash>
git push
```

Flux will automatically reconcile and rollback the deployment.

## Configuration Details

### Production Cluster (`clusters/prod/`)

- **Replicas**: 3
- **Resources**: 
  - Requests: 100m CPU, 256Mi memory
  - Limits: 500m CPU, 512Mi memory
- **Ingress**: Configured with TLS (Let's Encrypt)
- **Health Checks**: Liveness and readiness probes enabled

### Staging Cluster (`clusters/staging/`)

- **Replicas**: 2
- **Resources**: Same as production
- **No Ingress**: Access via port-forward or LoadBalancer (if needed)

## Security Best Practices

1. **Branch Protection**: Enable branch protection on main branch
2. **Signed Commits**: Use GPG or SSH signing for commits
3. **Policy as Code**: Integrate OPA (Open Policy Agent) for policy enforcement
4. **Secret Management**: Use SOPS or external secrets operator for sensitive data
5. **RBAC**: Restrict access to Flux namespaces

## Monitoring and Observability

### Flux Status

```bash
# Check Flux components
flux check

# List all GitRepository resources
flux get sources git

# List all Kustomizations
flux get kustomizations

# Get detailed status
flux get kustomizations empulse-music -n flux-system
```

### Prometheus Integration

Flux exposes metrics on port 8080. Configure Prometheus to scrape:

```yaml
scrape_configs:
  - job_name: flux
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names:
            - flux-system
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app_kubernetes_io_name]
        action: keep
        regex: flux
```

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

## Next Steps

1. Set up CI/CD pipeline for automated Docker builds
2. Configure Prometheus and Grafana for monitoring
3. Integrate OPA for policy enforcement
4. Set up automated backups for Git repository
5. Configure alerting for deployment failures

## References

- [Flux Documentation](https://fluxcd.io/docs/)
- [Kustomize Documentation](https://kustomize.io/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
