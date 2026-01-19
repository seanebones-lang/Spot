# 🚀 GitOps Setup - ArgoCD & Flux

## Phase 10: Enterprise Scale Deployment

### ArgoCD Configuration

#### 1. Install ArgoCD

```bash
# Install ArgoCD CLI
brew install argocd

# Or via kubectl
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

#### 2. Access ArgoCD UI

```bash
# Port forward
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Get admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Login
argocd login localhost:8080
```

#### 3. Create Application

```bash
# Apply ArgoCD application
kubectl apply -f gitops/argocd/applications/spot-music-prod.yaml

# Or via CLI
argocd app create spot-music-prod \
  --repo https://github.com/seanebones-lang/Spot.git \
  --path gitops/k8s/production \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace spot-music-prod \
  --sync-policy automated \
  --auto-prune \
  --self-heal
```

### Flux Configuration (Alternative)

#### 1. Install Flux

```bash
# Install Flux CLI
brew install fluxcd/tap/flux

# Bootstrap Flux
flux bootstrap github \
  --owner=seanebones-lang \
  --repository=Spot \
  --branch=main \
  --path=gitops/flux
```

#### 2. Create Flux Kustomization

```yaml
# gitops/flux/kustomization.yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: spot-music-prod
  namespace: flux-system
spec:
  interval: 5m
  path: ./gitops/k8s/production
  prune: true
  sourceRef:
    kind: GitRepository
    name: spot-music
```

### Multi-Environment Setup

#### Production

- **Namespace**: `spot-music-prod`
- **Replicas**: 3+
- **Resources**: 2Gi memory, 1000m CPU
- **Auto-scaling**: HPA configured

#### Staging

- **Namespace**: `spot-music-staging`
- **Replicas**: 1-2
- **Resources**: 1Gi memory, 500m CPU

### Kubernetes Migration (Railway → EKS/GKE)

#### From Railway to EKS

```bash
# Export Railway config
railway variables > railway-env.txt

# Create Kubernetes secrets
kubectl create secret generic spot-music-secrets \
  --from-env-file=railway-env.txt \
  -n spot-music-prod
```

#### GKE Setup

```bash
# Create GKE cluster
gcloud container clusters create spot-music-cluster \
  --num-nodes=3 \
  --machine-type=e2-standard-4 \
  --region=us-central1

# Connect
gcloud container clusters get-credentials spot-music-cluster
```

### Auto-Sync Configuration

**ArgoCD**:

- Automated sync enabled
- Self-healing enabled
- Auto-prune enabled
- Sync interval: 3 minutes

**Flux**:

- Reconciliation interval: 5 minutes
- Prune enabled
- Health checks configured

### Monitoring

- **ArgoCD**: Built-in UI for app status
- **Prometheus**: Metrics collection
- **Grafana**: Dashboards
- **AlertManager**: Alerts for failures

---

**Status**: GitOps configuration ready ✅
**Next**: Deploy to Kubernetes cluster
