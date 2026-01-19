# Terraform Infrastructure as Code for EmPulse Music

This directory contains Terraform configurations for provisioning AWS infrastructure following GitOps principles (Example 2 from best practices).

## Overview

This Terraform setup provisions:

- **AWS EKS Cluster**: Kubernetes 1.31 (latest as of Dec 2025)
- **VPC**: Multi-AZ VPC with public and private subnets
- **Node Groups**: EKS managed node groups with auto-scaling
- **Addons**: CoreDNS, kube-proxy, VPC CNI, EBS CSI driver

## Prerequisites

1. **Terraform** >= 1.6.0
2. **AWS CLI** configured with credentials
3. **kubectl** installed
4. **Flux CLI** for GitOps bootstrap

## Usage

### 1. Initialize Terraform

```bash
cd gitops/terraform
terraform init
```

### 2. Plan Infrastructure

```bash
terraform plan -var="cluster_name=nexteleven-prod" -var="environment=prod"
```

### 3. Apply Infrastructure

```bash
terraform apply -var="cluster_name=nexteleven-prod" -var="environment=prod"
```

### 4. Configure kubectl

```bash
aws eks update-kubeconfig --region us-west-2 --name nexteleven-prod
```

### 5. Bootstrap Flux

After the cluster is created, bootstrap Flux:

```bash
flux bootstrap github \
  --owner=NextElevenDev \
  --repository=gitops-repo \
  --branch=main \
  --path=./clusters/prod \
  --token-auth
```

## Integration with GitOps

Once Terraform creates the infrastructure, Flux will manage all application deployments declaratively through Git. This follows the separation of concerns:

- **Terraform**: Infrastructure provisioning (VPC, EKS, networking)
- **Flux**: Application deployments (Kubernetes manifests)

## Security Best Practices

1. Store Terraform state in S3 with encryption
2. Use AWS IAM roles for service accounts
3. Enable EKS control plane logging
4. Use private subnets for worker nodes
5. Enable encryption at rest for EBS volumes

## Variables

| Variable       | Description      | Default           |
| -------------- | ---------------- | ----------------- |
| `aws_region`   | AWS region       | `us-west-2`       |
| `cluster_name` | EKS cluster name | `nexteleven-prod` |
| `environment`  | Environment name | `prod`            |

## Outputs

After applying, Terraform outputs:

- `cluster_id`: EKS cluster ID
- `cluster_endpoint`: Kubernetes API endpoint
- `kubeconfig_command`: Command to configure kubectl
- `flux_bootstrap_command`: Command to bootstrap Flux

## Destroying Infrastructure

⚠️ **Warning**: This will destroy all resources including the cluster and data.

```bash
terraform destroy -var="cluster_name=nexteleven-prod" -var="environment=prod"
```

## References

- [Terraform AWS EKS Module](https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/)
- [AWS EKS Best Practices](https://aws.github.io/aws-eks-best-practices/)
- [Flux Documentation](https://fluxcd.io/docs/)
