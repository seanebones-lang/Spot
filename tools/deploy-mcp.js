#!/usr/bin/env node

/**
 * Deploy MCP Tool
 * Deploy to Vercel, Railway, AWS, GCP, Azure
 * 
 * Usage:
 *   node tools/deploy-mcp.js [platform] [action] [options]
 * 
 * Platforms:
 *   - vercel: Vercel deployment
 *   - railway: Railway deployment
 *   - aws: AWS deployment
 *   - gcp: Google Cloud Platform
 *   - azure: Microsoft Azure
 * 
 * Examples:
 *   node tools/deploy-mcp.js vercel
 *   node tools/deploy-mcp.js railway production
 *   npm run deploy:mcp vercel
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLATFORMS = {
  vercel: {
    command: 'vercel --prod',
    check: 'vercel --version',
    script: 'npm run deploy:vercel',
  },
  railway: {
    command: 'railway up',
    check: 'railway version',
    script: 'npm run deploy:railway',
  },
  aws: {
    command: 'aws s3 sync . s3://bucket',
    check: 'aws --version',
    script: 'bash scripts/deploy.sh aws',
  },
  gcp: {
    command: 'gcloud app deploy',
    check: 'gcloud --version',
    script: 'bash scripts/deploy.sh gcp',
  },
  azure: {
    command: 'az webapp deployment',
    check: 'az --version',
    script: 'bash scripts/deploy.sh azure',
  },
};

function deploy(platform, env = 'production') {
  const config = PLATFORMS[platform];
  
  if (!config) {
    console.error(`❌ Unknown platform: ${platform}`);
    console.log('\nAvailable platforms: vercel, railway, aws, gcp, azure');
    process.exit(1);
  }

  try {
    console.log(`🚀 Deploying to ${platform} (${env})...`);
    
    // Check if platform CLI is installed
    try {
      execSync(config.check, { stdio: 'pipe' });
    } catch (error) {
      console.error(`❌ ${platform} CLI not found. Please install it first.`);
      process.exit(1);
    }

    // Use npm script if available, otherwise use direct command
    const deployCommand = config.script || config.command;
    
    console.log(`📋 Running: ${deployCommand}\n`);
    
    execSync(deployCommand, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: env,
      },
    });

    console.log(`\n✅ Successfully deployed to ${platform}`);
  } catch (error) {
    console.error(`\n❌ Deployment failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const platform = args[0];
  const env = args[1] || 'production';

  if (!platform) {
    console.error('❌ Error: Platform is required');
    console.log('\nUsage: node tools/deploy-mcp.js [platform] [env]');
    console.log('\nPlatforms: vercel, railway, aws, gcp, azure');
    console.log('\nExamples:');
    console.log('  node tools/deploy-mcp.js vercel');
    console.log('  node tools/deploy-mcp.js railway production');
    console.log('  npm run deploy:mcp vercel');
    process.exit(1);
  }

  deploy(platform, env);
}

module.exports = { deploy, PLATFORMS };
