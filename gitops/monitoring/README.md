# Monitoring and Observability for GitOps

This directory contains Prometheus and Grafana configurations for monitoring GitOps deployments following observability best practices.

## Overview

Following GitOps principles, we integrate Prometheus and Grafana for:

- **Flux reconciliation status** and sync duration
- **Application health** (deployments, pods, services)
- **Resource utilization** (CPU, memory, network)
- **Alerting** for deployment failures and anomalies

## Prerequisites

1. **Prometheus Operator** or standalone Prometheus installed
2. **Grafana** installed (optional, for visualization)
3. **Alertmanager** for alert routing (optional)

## Quick Start

### 1. Install Prometheus Operator (if not using Flux Helm)

```bash
# Using Helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace
```

### 2. Apply Prometheus Configuration

```bash
kubectl apply -f monitoring/prometheus-config.yaml
```

### 3. Verify Prometheus is Scraping Flux Metrics

```bash
# Port-forward to Prometheus
kubectl port-forward -n monitoring svc/prometheus-operated 9090:9090

# Check Flux metrics
curl http://localhost:9090/api/v1/query?query=flux_kustomization_condition
```

## Metrics Exposed

### Flux Metrics (GitOps Toolkit)

- `flux_kustomization_condition`: Kustomization reconciliation status
- `flux_gitrepository_condition`: GitRepository sync status
- `flux_kustomization_reconcile_duration_seconds`: Reconciliation duration
- `flux_helmrelease_condition`: HelmRelease status (if using Helm)

### Application Metrics

- `kube_deployment_status_replicas_ready`: Number of ready replicas
- `kube_pod_container_status_restarts_total`: Container restart count
- `container_memory_working_set_bytes`: Memory usage
- `container_cpu_usage_seconds_total`: CPU usage

### Kubernetes Metrics

- `kube_node_status_condition`: Node conditions
- `kube_pod_status_phase`: Pod phases
- `kube_service_status_load_balancer_ingress`: Service ingress status

## Grafana Dashboards

### Recommended Dashboards

1. **Flux GitOps Dashboard** (Import dashboard ID: 15584)
   - Shows Flux reconciliation status
   - Sync duration and errors
   - GitRepository health

2. **Kubernetes Cluster Monitoring** (Import dashboard ID: 7249)
   - Node metrics
   - Pod metrics
   - Resource usage

3. **Custom EmPulse Music Dashboard**
   - Application-specific metrics
   - Request rates
   - Error rates

### Import Dashboard

```bash
# In Grafana UI: Configuration → Import → Paste dashboard JSON or ID
```

## Alerting

The Prometheus configuration includes alert rules for:

- **FluxReconciliationFailed**: When Flux Kustomization fails to reconcile
- **FluxGitRepositorySyncFailed**: When Git repository sync fails
- **DeploymentNotReady**: When deployments don't have all replicas ready
- **PodCrashLooping**: When pods are restarting frequently
- **HighMemoryUsage**: When containers exceed 90% memory limit
- **HighCPUUsage**: When containers have high CPU usage

### Configure Alertmanager

1. Create Alertmanager configuration
2. Add notification channels (Slack, email, PagerDuty)
3. Apply to cluster:

```bash
kubectl apply -f alertmanager-config.yaml
```

## Integration with Flux

Flux automatically exposes metrics on port 8080. The Prometheus configuration scrapes these metrics from the `flux-system` namespace.

To verify Flux metrics are being scraped:

```bash
# Check Flux pod metrics endpoint
kubectl port-forward -n flux-system deployment/kustomize-controller 8080:8080
curl http://localhost:8080/metrics
```

## Best Practices

1. **Monitor reconciliation intervals**: Ensure Flux reconciles within expected timeframes
2. **Alert on failures**: Set up alerts for reconciliation failures
3. **Track deployment velocity**: Monitor how often deployments succeed/fail
4. **Resource monitoring**: Track CPU/memory usage to optimize resource requests
5. **Retention policy**: Configure Prometheus retention (30 days recommended)

## Rollback Monitoring

Prometheus can track deployment rollbacks:

```promql
# Track deployment replicas over time
kube_deployment_spec_replicas - kube_deployment_status_replicas_ready

# Track deployment status changes
changes(kube_deployment_status_condition[1h])
```

## References

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Flux Metrics Documentation](https://fluxcd.io/docs/monitoring/metrics/)
- [Grafana Dashboard Library](https://grafana.com/grafana/dashboards/)
