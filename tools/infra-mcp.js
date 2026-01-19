#!/usr/bin/env node
// tools/infra-mcp.js – Infrastructure MCP Tool (Terraform, ArgoCD, AWS/GCP/Azure)
// Infrastructure-as-code and GitOps deployment
const { execSync } = require('child_process');
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

/**
 * Infrastructure MCP Tool
 * Manage infrastructure via Terraform and ArgoCD
 * 
 * @param {string} action - Action: 'plan' | 'apply' | 'destroy' | 'sync' | 'status'
 * @param {string} provider - Provider: 'terraform' | 'argocd' | 'aws' | 'gcp' | 'azure'
 * @param {string} target - Target: 'spot-cluster' | 'vpc' | 'ecs' | 'all'
 * @param {string} env - Environment: 'dev' | 'staging' | 'prod'
 */
async function infraMCP(action, provider = 'terraform', target = 'all', env = 'dev') {
  const tools = {
    terraform: async () => {
      try {
        // Check if Terraform is installed
        try {
          execSync('terraform --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Terraform not installed. Install: https://www.terraform.io/downloads');
        }

        const terraformDir = join(process.cwd(), 'terraform', env);
        
        if (!existsSync(terraformDir)) {
          throw new Error(`Terraform directory not found: ${terraformDir}`);
        }

        console.log(`🏗️  Running Terraform ${action} for ${target} in ${env}...`);

        switch (action) {
          case 'plan':
            execSync('terraform plan -out=tfplan', {
              stdio: 'inherit',
              cwd: terraformDir
            });
            return `Terraform plan complete for ${target}`;

          case 'apply':
            execSync('terraform apply -auto-approve tfplan', {
              stdio: 'inherit',
              cwd: terraformDir
            });
            return `Terraform apply complete for ${target}`;

          case 'destroy':
            execSync('terraform destroy -auto-approve', {
              stdio: 'inherit',
              cwd: terraformDir
            });
            return `Terraform destroy complete for ${target}`;

          case 'init':
            execSync('terraform init', {
              stdio: 'inherit',
              cwd: terraformDir
            });
            return `Terraform initialized for ${env}`;

          default:
            throw new Error(`Unknown Terraform action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Terraform operation failed: ${error.message}`);
      }
    },

    argocd: async () => {
      try {
        // Check if ArgoCD CLI is installed
        try {
          execSync('argocd version --client', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('ArgoCD CLI not installed. Install: https://argo-cd.readthedocs.io/en/stable/cli_installation/');
        }

        console.log(`🚢 Running ArgoCD ${action} for ${target}...`);

        switch (action) {
          case 'sync':
            execSync(`argocd app sync ${target}`, {
              stdio: 'inherit',
              cwd: process.cwd()
            });
            return `ArgoCD sync complete for ${target}`;

          case 'status':
            execSync(`argocd app get ${target}`, {
              stdio: 'inherit',
              cwd: process.cwd()
            });
            return `ArgoCD status retrieved for ${target}`;

          case 'create':
            const appManifest = join(process.cwd(), 'gitops', 'applications', `${target}.yaml`);
            if (existsSync(appManifest)) {
              execSync(`argocd app create -f ${appManifest}`, {
                stdio: 'inherit'
              });
              return `ArgoCD app ${target} created`;
            }
            throw new Error(`ArgoCD manifest not found: ${appManifest}`);

          default:
            throw new Error(`Unknown ArgoCD action: ${action}`);
        }
      } catch (error) {
        throw new Error(`ArgoCD operation failed: ${error.message}`);
      }
    },

    aws: async () => {
      try {
        console.log(`☁️  Running AWS ${action} for ${target}...`);
        
        // Check AWS CLI
        try {
          execSync('aws --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('AWS CLI not installed. Install: https://aws.amazon.com/cli/');
        }

        switch (action) {
          case 'deploy':
            // Deploy to ECS
            execSync(`aws ecs update-service --cluster ${target} --service spot-app --force-new-deployment`, {
              stdio: 'inherit'
            });
            return `AWS ECS deployment triggered for ${target}`;

          case 'status':
            execSync(`aws ecs describe-services --cluster ${target} --services spot-app`, {
              stdio: 'inherit'
            });
            return `AWS ECS status retrieved`;

          default:
            throw new Error(`Unknown AWS action: ${action}`);
        }
      } catch (error) {
        throw new Error(`AWS operation failed: ${error.message}`);
      }
    },

    gcp: async () => {
      try {
        console.log(`☁️  Running GCP ${action} for ${target}...`);
        
        // Check gcloud CLI
        try {
          execSync('gcloud --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('gcloud CLI not installed. Install: https://cloud.google.com/sdk/docs/install');
        }

        switch (action) {
          case 'deploy':
            execSync(`gcloud run deploy ${target} --source .`, {
              stdio: 'inherit',
              cwd: process.cwd()
            });
            return `GCP Cloud Run deployment complete for ${target}`;

          default:
            throw new Error(`Unknown GCP action: ${action}`);
        }
      } catch (error) {
        throw new Error(`GCP operation failed: ${error.message}`);
      }
    },

    azure: async () => {
      try {
        console.log(`☁️  Running Azure ${action} for ${target}...`);
        
        // Check Azure CLI
        try {
          execSync('az --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Azure CLI not installed. Install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli');
        }

        switch (action) {
          case 'deploy':
            execSync(`az webapp deploy --name ${target} --resource-group spot-rg --src-path .`, {
              stdio: 'inherit',
              cwd: process.cwd()
            });
            return `Azure Web App deployment complete for ${target}`;

          default:
            throw new Error(`Unknown Azure action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Azure operation failed: ${error.message}`);
      }
    }
  };

  if (!tools[provider]) {
    throw new Error(`Unsupported provider: ${provider}. Use 'terraform', 'argocd', 'aws', 'gcp', or 'azure'`);
  }

  const result = await tools[provider]();
  console.log(`✅ ${result}`);

  return JSON.stringify({
    status: 'success',
    provider,
    action,
    target,
    env,
    result,
    timestamp: new Date().toISOString()
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: tools/infra-mcp.js <action> [provider] [target] [env]');
    console.error('  action:   plan | apply | destroy | sync | status | deploy');
    console.error('  provider: terraform | argocd | aws | gcp | azure (default: terraform)');
    console.error('  target:   spot-cluster | vpc | ecs | all (default: all)');
    console.error('  env:      dev | staging | prod (default: dev)');
    process.exit(1);
  }

  const [action, provider = 'terraform', target = 'all', env = 'dev'] = args;

  infraMCP(action, provider, target, env)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = infraMCP;
