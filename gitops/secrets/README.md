# Secrets Management with SOPS

This directory demonstrates secret management using SOPS (Secrets Operations) following GitOps security best practices.

## Overview

SOPS allows you to encrypt secrets in Git while maintaining version control. Flux supports SOPS via the `--sops` flag or Flux's SOPS controller.

## Prerequisites

1. **SOPS** installed (`brew install sops` or see [SOPS Installation](https://github.com/getsops/sops#installation))
2. **AWS KMS** key (for production) or **Age** keys (for development)
3. **Flux with SOPS support** or `sops-secrets` controller

## Setup

### 1. Install SOPS

```bash
# macOS
brew install sops

# Linux
wget https://github.com/getsops/sops/releases/download/v3.8.0/sops-v3.8.0.linux
chmod +x sops-v3.8.0.linux
sudo mv sops-v3.8.0.linux /usr/local/bin/sops
```

### 2. Configure SOPS

Create `.sops.yaml` in your GitOps repository root (example provided in this directory).

### 3. Encrypt a Secret

```bash
# Create a Kubernetes secret
cat <<EOF > secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: empulse-music-secrets
  namespace: empulse-music
type: Opaque
data:
  database-url: <base64-encoded-value>
  api-key: <base64-encoded-value>
EOF

# Encrypt with SOPS
sops -e -i secret.yaml
```

### 4. Decrypt a Secret (for editing)

```bash
sops secret.yaml
# Edit the file, SOPS will re-encrypt on save
```

### 5. Integrate with Flux

Option A: Use Flux's SOPS controller (recommended)

```bash
flux create secret sops-gpg \
  --namespace=flux-system \
  --from-file=.sops.pub.asc

# Annotate GitRepository with SOPS
kubectl annotate gitrepository flux-system \
  sops.fluxcd.io/pubkey-secret-name=sops-gpg
```

Option B: Decrypt during CI/CD

```bash
# In GitHub Actions
- name: Install SOPS
  uses: mozilla/sops@v3.8.0

- name: Decrypt secrets
  run: |
    sops -d secrets/prod/secrets.yaml > secrets.yaml
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Example Secret Structure

```
secrets/
├── .sops.yaml              # SOPS configuration
├── prod/
│   └── empulse-music-secrets.enc.yaml  # Encrypted production secrets
└── staging/
    └── empulse-music-secrets.enc.yaml  # Encrypted staging secrets
```

## Security Best Practices

1. **Never commit unencrypted secrets** to Git
2. **Use different keys** for prod/staging/dev
3. **Rotate keys** periodically (every 90 days)
4. **Limit access** to KMS keys using IAM policies
5. **Audit** secret access with CloudTrail
6. **Use RBAC** to restrict who can decrypt secrets in Kubernetes

## Decrypt for Local Testing

```bash
# View decrypted content (don't commit this!)
sops -d secrets/prod/empulse-music-secrets.enc.yaml

# Edit encrypted file
sops secrets/prod/empulse-music-secrets.enc.yaml
```

## Flux Integration

Flux automatically decrypts SOPS-encrypted files when applying manifests. Ensure:

1. SOPS controller is installed in Flux
2. GitRepository is annotated with SOPS key
3. KMS keys are accessible from the cluster (via IAM roles)

## References

- [SOPS Documentation](https://github.com/getsops/sops)
- [Flux SOPS Integration](https://fluxcd.io/docs/guides/mozilla-sops/)
- [AWS KMS Documentation](https://docs.aws.amazon.com/kms/)
