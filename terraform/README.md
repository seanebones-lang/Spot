# Terraform Infrastructure for EmPulse Music (Spot)

Complete Infrastructure as Code (IaC) for deploying the Spot application to AWS.

## Architecture

- **VPC**: Multi-AZ VPC with public, private, and database subnets
- **ECS Fargate**: Containerized application hosting
- **RDS PostgreSQL**: Managed database with Prisma ORM
- **S3**: Audio file storage (FLAC, WAV, MP3)
- **CloudFront CDN**: Global content delivery
- **Application Load Balancer**: Traffic distribution and SSL termination

## Quick Start

### Prerequisites

1. **AWS CLI configured** with credentials
2. **Terraform >= 1.9** installed
3. **GitHub Codespaces** or local development environment

### Initial Setup

```bash
cd terraform

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
# IMPORTANT: Set a secure db_password!

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Plan deployment (dry-run)
terraform plan

# Apply infrastructure
terraform apply
```

## Usage with Vim Keybindings

When using VSCodeVim extension, use these shortcuts:

- `<leader>t` - Validate Terraform
- `<leader>p` - Run terraform plan
- `<leader>a` - Run terraform apply
- `gt` - Show Terraform state
- `K` - Hover for Terraform documentation

Default leader key is `\` (backslash).

## Project Structure

```
terraform/
├── main.tf                    # Main infrastructure
├── variables.tf               # Variable definitions
├── outputs.tf                 # Output values
├── versions.tf                # Provider versions
├── terraform.tfvars.example   # Example variables (copy to terraform.tfvars)
└── modules/
    ├── vpc/                   # VPC module (subnets, security groups)
    ├── ecs/                   # ECS module (cluster, service, ALB)
    └── rds/                   # RDS module (PostgreSQL database)
```

## Variables

See `terraform.tfvars.example` for all configurable variables:

- `aws_region`: AWS region (default: us-east-1)
- `environment`: Environment name (dev, staging, prod)
- `db_password`: **REQUIRED** - Secure database password
- `container_cpu`: Fargate CPU units (256, 512, 1024, etc.)
- `container_memory`: Fargate memory in MB
- `desired_count`: Number of ECS tasks
- `enable_cloudfront`: Enable CloudFront CDN (default: true)

## Outputs

After deployment, Terraform outputs:

- `app_url`: Application URL (CloudFront or ALB)
- `cloudfront_domain_name`: CloudFront distribution domain
- `alb_dns_name`: Load balancer DNS name
- `rds_endpoint`: Database endpoint (sensitive)
- `s3_audio_bucket_name`: S3 bucket for audio files
- `ecs_cluster_name`: ECS cluster name

## Deployment Workflow

### 1. Development Environment

```bash
# Set environment
export TF_VAR_environment=dev
export TF_VAR_db_password=your_secure_password

# Deploy
terraform init
terraform plan
terraform apply
```

### 2. Production Environment

```bash
# Configure backend (S3 remote state)
# Edit versions.tf and uncomment backend block

# Deploy
terraform init -backend-config=backend.hcl
terraform plan -var-file=production.tfvars
terraform apply -var-file=production.tfvars
```

### 3. Updates

```bash
# Make changes to Terraform files
# Plan and apply
terraform plan
terraform apply
```

### 4. Cleanup

```bash
# Destroy all infrastructure
terraform destroy
```

## Module Details

### VPC Module

Creates:
<<<<<<< HEAD

=======

> > > > > > > 460cde8a4456665eaca40b34f2a2a146c789ce1e

- VPC with public/private/database subnets across 3 AZs
- Internet Gateway and NAT Gateways
- Route tables and associations
- Security groups for ALB, ECS, and RDS

### ECS Module

Creates:
<<<<<<< HEAD

=======

> > > > > > > 460cde8a4456665eaca40b34f2a2a146c789ce1e

- ECS Fargate cluster
- Application Load Balancer
- ECS service with auto-scaling
- IAM roles for task execution and tasks
- CloudWatch log groups

### RDS Module

Creates:
<<<<<<< HEAD

=======

> > > > > > > 460cde8a4456665eaca40b34f2a2a146c789ce1e

- PostgreSQL 15.4 database instance
- DB subnet group
- Parameter group with performance settings
- Automated backups
- Performance Insights (production)

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Terraform Plan
  run: |
    cd terraform
    terraform init
    terraform plan

- name: Terraform Apply
  if: github.ref == 'refs/heads/main'
  run: terraform apply -auto-approve
```

## State Management

For production, use S3 backend:

```hcl
terraform {
  backend "s3" {
    bucket         = "spot-terraform-state"
    key            = "spot/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

## Security Best Practices

1. **Never commit `terraform.tfvars`** - Contains sensitive values
2. **Use AWS Secrets Manager** for production passwords
3. **Enable encryption** for RDS and S3 (already configured)
4. **Use least privilege** IAM roles (already configured)
5. **Enable CloudWatch monitoring** (already configured)

## Troubleshooting

### Port Forwarding in Codespaces

If you need to access services:

```bash
# In Codespace terminal
codespace ports forward 3001
codespace ports forward 8080  # For Terraform GUI tools
```

### Validate Before Apply

Always validate:

```bash
terraform validate
terraform fmt -check
terraform plan
```

### Common Issues

1. **Invalid credentials**: Check AWS CLI configuration
2. **Resource limits**: Check AWS account limits
3. **State lock**: Check DynamoDB table if using remote state
4. **Module errors**: Run `terraform init -upgrade`

## Next Steps

1. Configure ECR for container images
2. Set up CI/CD pipeline
3. Add custom domain with ACM certificate
4. Configure CloudWatch alarms
5. Set up AWS WAF for security
6. Configure S3 bucket policies for audio files

## Resources

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/)
- [RDS PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)

---

**Created**: January 2026  
**Terraform Version**: >= 1.9  
**AWS Provider**: ~> 6.0
