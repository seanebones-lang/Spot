# Terraform Quick Start Guide

## 🚀 5-Minute Setup

### Step 1: Configure Variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars - SET db_password!
```

### Step 2: Initialize

```bash
terraform init
```

### Step 3: Validate

```bash
terraform validate
```

### Step 4: Plan (See What Will Be Created)

```bash
terraform plan
```

### Step 5: Apply (Deploy Infrastructure)

```bash
terraform apply
# Type 'yes' when prompted
```

## 🎯 Vim Keybindings (VS Code)

When editing `.tf` files with VSCodeVim:

- `<leader>t` → Validate Terraform
- `<leader>p` → Run `terraform plan`
- `<leader>a` → Run `terraform apply`
- `gt` → Show Terraform state
- `K` → Hover for resource documentation
- `jj` → Exit insert mode (when typing)

Default leader is `\` (backslash).

## 📋 Common Commands

```bash
# Validate syntax
terraform validate

# Format code
terraform fmt

# Show current state
terraform show

# List resources
terraform state list

# Get outputs
terraform output

# Destroy everything
terraform destroy
```

## 🏗️ What Gets Created

- **VPC**: Multi-AZ network (3 public, 3 private, 2 database subnets)
- **ECS Cluster**: Fargate cluster with auto-scaling
- **Load Balancer**: Application Load Balancer (HTTP/HTTPS)
- **Database**: PostgreSQL RDS instance
- **S3 Bucket**: Audio file storage (encrypted)
- **CloudFront**: CDN for global delivery
- **Security Groups**: Properly configured network rules

## ⚠️ Important

1. **Never commit `terraform.tfvars`** - Contains sensitive passwords
2. **Set secure `db_password`** in terraform.tfvars
3. **Costs apply** - AWS resources will incur charges
4. **Use `terraform destroy`** to clean up when done testing

## 🔗 Next Steps

After deployment:

1. Get app URL: `terraform output app_url`
2. Configure ECR for container images
3. Build and push Docker image
4. Update ECS task definition with image URI

## 💡 Pro Tips

- Use `terraform plan` before every apply
- Enable S3 backend for production (see versions.tf)
- Use separate tfvars files per environment
- Monitor costs in AWS Cost Explorer
