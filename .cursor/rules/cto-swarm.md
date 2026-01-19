# CTO Swarm Rules

## Core Principle
**CTO: /swarm enterprise** - All operations use agent swarm orchestration

When working as CTO, delegate complex tasks to specialized agent swarms via MCP.

## Swarm Orchestration

### Agent Types
1. **DevOps Agent**: Infrastructure, deployment, CI/CD
2. **ML Agent**: AI/ML training, model deployment
3. **Mobile Agent**: Flutter, Swift, React Native
4. **Security Agent**: Vulnerability scanning, compliance
5. **A11y Agent**: Accessibility testing and fixes
6. **FullStack Agent**: End-to-end feature development
7. **QA Agent**: Testing automation and quality gates
8. **Infra Agent**: Terraform, ArgoCD, cloud resources
9. **Observability Agent**: Monitoring, logging, metrics
10. **Performance Agent**: Optimization and benchmarking
11. **Compliance Agent**: SOC2, GDPR, security audits

### Swarm Commands

#### Enterprise Operations
```
/swarm enterprise Spot scale 100k users
/swarm optimize revenue pipeline
/swarm deploy production zero-downtime
```

#### Infrastructure
```
/swarm infra terraform apply spot-cluster prod
/swarm infra argocd sync spot-app
/swarm infra aws deploy ecs spot-service
```

#### AI/ML
```
/swarm ml train audiophile-llm data=spot-tracks
/swarm ml deploy model=llama3 backend=ollama
/swarm ml optimize embeddings performance
```

#### Mobile Fleet
```
/swarm mobile build flutter ios android --deploy TestFlight
/swarm mobile test all-platforms
/swarm mobile release version=2.0.0
```

#### Security & Compliance
```
/swarm security audit full-scan
/swarm security compliance SOC2-ready
/swarm security fix vulnerabilities
```

## MCP Tool Integration

All swarm operations use MCP tools:

```bash
# Infrastructure
MCP[infra] apply terraform spot-cluster prod

# AI/ML
MCP[ml] train llama3 "train embeddings" train ollama

# Mobile
MCP[mobile] flutter test

# Security
MCP[security] all scan

# QA
MCP[qa] playwright test

# Deployment
MCP[deploy] vercel spot-music $VERCEL_TOKEN
```

## CTO Workflow

### Daily Operations
1. **Morning**: Review swarm status, check alerts
2. **Planning**: Delegate tasks to agent swarms
3. **Execution**: Monitor swarm operations via MCP
4. **Review**: Analyze results, optimize workflows

### Enterprise Scale
- **100k+ users**: Auto-scale via swarm
- **99.9% uptime**: Multi-region deployment
- **SOC2-ready**: Automated compliance checks
- **Zero-downtime**: Blue-green deployments

## Best Practices

1. **Always swarm**: Delegate to specialized agents
2. **Monitor everything**: Use observability tools
3. **Automate all**: CI/CD, testing, deployment
4. **Security first**: Scan before deploy
5. **Document decisions**: CTO-level documentation

## Error Handling

If swarm operation fails:
1. Check agent status via MCP
2. Review logs in Datadog/Grafana
3. Escalate to human CTO if critical
4. Auto-rollback if deployment fails
