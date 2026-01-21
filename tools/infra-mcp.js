#!/usr/bin/env node

/**
 * Infrastructure MCP Tool
 * Infrastructure-as-code (Terraform, ArgoCD, AWS/GCP/Azure)
 *
 * Usage:
 *   node tools/infra-mcp.js [action] [provider] [target] [env]
 *
 * Providers:
 *   - terraform: Terraform IaC
 *   - argocd: ArgoCD GitOps
 *   - aws: AWS deployment
 *   - gcp: Google Cloud Platform
 *   - azure: Microsoft Azure
 *
 * Actions:
 *   - plan: Plan infrastructure changes
 *   - apply: Apply infrastructure changes
 *   - destroy: Destroy infrastructure
 *   - sync: Sync ArgoCD application
 *   - status: Check infrastructure status
 *   - deploy: Deploy infrastructure
 *
 * Environments:
 *   - dev: Development environment
 *   - staging: Staging environment
 *   - prod: Production environment
 *
 * Examples:
 *   node tools/infra-mcp.js plan terraform spot dev
 *   node tools/infra-mcp.js apply terraform spot prod
 *   node tools/infra-mcp.js sync argocd spot-app prod
 *   npm run infra plan terraform spot dev
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const PROVIDERS = {
  terraform: {
    init: "cd terraform/dev && terraform init",
    plan: "cd terraform/dev && terraform plan",
    apply: "cd terraform/dev && terraform apply -auto-approve",
    destroy: "cd terraform/dev && terraform destroy -auto-approve",
    status: "cd terraform/dev && terraform show",
  },
  argocd: {
    sync: "argocd app sync spot-app",
    status: "argocd app get spot-app",
    deploy: "argocd app sync spot-app --force",
  },
  aws: {
    plan: "aws cloudformation validate-template --template-body file://cloudformation.yaml",
    apply:
      "aws cloudformation deploy --template-file cloudformation.yaml --stack-name spot-app",
    status: "aws cloudformation describe-stacks --stack-name spot-app",
    deploy:
      "aws cloudformation deploy --template-file cloudformation.yaml --stack-name spot-app",
  },
  gcp: {
    plan: "gcloud deployment-manager deployments describe spot-app",
    apply:
      "gcloud deployment-manager deployments create spot-app --config config.yaml",
    status: "gcloud deployment-manager deployments describe spot-app",
    deploy:
      "gcloud deployment-manager deployments update spot-app --config config.yaml",
  },
  azure: {
    plan: "az deployment group validate --resource-group spot-app --template-file azuredeploy.json",
    apply:
      "az deployment group create --resource-group spot-app --template-file azuredeploy.json",
    status:
      "az deployment group show --resource-group spot-app --name spot-app",
    deploy:
      "az deployment group create --resource-group spot-app --template-file azuredeploy.json",
  },
};

function runInfra(action, provider, target = "spot", env = "dev") {
  const providerConfig = PROVIDERS[provider];

  if (!providerConfig) {
    console.error(`❌ Unknown provider: ${provider}`);
    console.log("\nAvailable providers: terraform, argocd, aws, gcp, azure");
    process.exit(1);
  }

  const command = providerConfig[action];
  if (!command) {
    console.error(`❌ Unknown action: ${action} for provider ${provider}`);
    console.log(
      "\nAvailable actions: plan, apply, destroy, sync, status, deploy",
    );
    process.exit(1);
  }

  try {
    console.log(`🏗️  Running ${provider} ${action} for ${target} (${env})...`);
    console.log(`📋 Command: ${command}\n`);

    // Set environment-specific variables
    const envVars = {
      ...process.env,
      TF_VAR_environment: env,
      ENVIRONMENT: env,
      TARGET: target,
    };

    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd(),
      env: envVars,
    });

    console.log(`\n✅ ${provider} ${action} completed successfully`);
  } catch (error) {
    console.error(`\n❌ ${provider} ${action} failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const action = args[0];
  const provider = args[1];
  const target = args[2] || "spot";
  const env = args[3] || "dev";

  if (!action) {
    console.error("❌ Error: Action is required");
    console.log(
      "\nUsage: node tools/infra-mcp.js [action] [provider] [target] [env]",
    );
    console.log("\nActions: plan, apply, destroy, sync, status, deploy");
    console.log("Providers: terraform, argocd, aws, gcp, azure");
    console.log("Environments: dev, staging, prod");
    console.log("\nExamples:");
    console.log("  node tools/infra-mcp.js plan terraform spot dev");
    console.log("  node tools/infra-mcp.js apply terraform spot prod");
    console.log("  node tools/infra-mcp.js sync argocd spot-app prod");
    console.log("  npm run infra plan terraform spot dev");
    process.exit(1);
  }

  if (!provider) {
    console.error("❌ Error: Provider is required");
    console.log("\nProviders: terraform, argocd, aws, gcp, azure");
    process.exit(1);
  }

  runInfra(action, provider, target, env);
}

module.exports = { runInfra, PROVIDERS };
