# Terraform outputs for GitOps integration
# These outputs can be used by Flux or Argo CD

output "kubeconfig_command" {
  description = "Command to configure kubectl"
  value       = "aws eks update-kubeconfig --region ${var.aws_region} --name ${module.eks.cluster_name}"
}

output "flux_bootstrap_command" {
  description = "Command to bootstrap Flux on the cluster"
  value       = <<-EOT
    flux bootstrap github \
      --owner=NextElevenDev \
      --repository=gitops-repo \
      --branch=main \
      --path=./clusters/prod \
      --token-auth
  EOT
}
