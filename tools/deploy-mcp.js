#!/usr/bin/env node
// tools/deploy-mcp.js – MCP Deploy Tool (Vercel/Railway)
// Persisted in repo for always-accessible deployment
const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

// Try to use node-fetch if available, otherwise use native fetch (Node 18+)
let fetch;
try {
  fetch = require('node-fetch');
} catch (e) {
  fetch = globalThis.fetch;
}

/**
 * MCP Deploy Tool for Vercel and Railway
 * Usage: node tools/deploy-mcp.js <platform> <project> <token> [branch]
 * 
 * @param {string} platform - 'vercel' or 'railway'
 * @param {string} project - Project ID or name
 * @param {string} token - API token
 * @param {string} branch - Git branch (default: 'main')
 */
async function deployMCP(platform, project, token, branch = 'main') {
  const tools = {
    vercel: async () => {
      try {
        console.log('🚀 Deploying to Vercel...');
        
        // Check if vercel.json exists and read project name
        let vercelProject = project;
        try {
          const vercelJson = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'));
          vercelProject = vercelProject || vercelJson.name;
        } catch (e) {
          // vercel.json not found, use provided project
        }

        // Deploy using Vercel CLI
        execSync(`vercel --prod --token ${token} --yes`, { 
          stdio: 'inherit',
          cwd: process.cwd(),
          env: { ...process.env, VERCEL_TOKEN: token }
        });

        // Get deployment URL from Vercel API
        try {
          const res = await fetch(`https://api.vercel.com/v6/deployments?limit=1`, {
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (res.ok) {
            const data = await res.json();
            const deployment = data.deployments?.[0];
            if (deployment) {
              return `https://${deployment.url}`;
            }
          }
        } catch (apiError) {
          console.warn('⚠️  Could not fetch deployment URL from API, check Vercel dashboard');
        }

        return 'https://vercel.com/dashboard'; // Fallback
      } catch (error) {
        throw new Error(`Vercel deployment failed: ${error.message}`);
      }
    },

    railway: async () => {
      try {
        console.log('🚂 Deploying to Railway...');
        
        // Railway uses Railway CLI or API
        // Check if Railway CLI is available
        try {
          execSync('railway --version', { stdio: 'ignore' });
          
          // Use Railway CLI
          execSync(`railway up --service ${project}`, {
            stdio: 'inherit',
            cwd: process.cwd(),
            env: { ...process.env, RAILWAY_TOKEN: token }
          });
          
          // Railway CLI returns URL in output, try to extract
          return `https://${project}.railway.app`; // Approximate URL
        } catch (cliError) {
          // Fallback to API
          const res = await fetch(`https://backboard.railway.app/api/v1/deployments`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              projectId: project,
              source: 'github',
              branch: branch
            })
          });

          if (!res.ok) {
            throw new Error(`Railway API error: ${res.statusText}`);
          }

          const data = await res.json();
          return data.url || `https://${project}.railway.app`;
        }
      } catch (error) {
        throw new Error(`Railway deployment failed: ${error.message}`);
      }
    }
  };

  if (!tools[platform]) {
    throw new Error(`Unsupported platform: ${platform}. Use 'vercel' or 'railway'`);
  }

  const url = await tools[platform]();
  console.log(`✅ Deployed successfully: ${url}`);
  
  return JSON.stringify({ 
    status: 'success', 
    url,
    platform,
    project,
    timestamp: new Date().toISOString()
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.error('Usage: tools/deploy-mcp.js <platform> <project> <token> [branch]');
    console.error('  platform: vercel | railway');
    console.error('  project:  Project ID or name');
    console.error('  token:    API token (or use env var VERCEL_TOKEN/RAILWAY_TOKEN)');
    console.error('  branch:   Git branch (default: main)');
    process.exit(1);
  }

  const [platform, project, tokenArg, branch = 'main'] = args;
  
  // Use token from arg or env var
  const token = tokenArg || 
    (platform === 'vercel' ? process.env.VERCEL_TOKEN : process.env.RAILWAY_TOKEN);

  if (!token) {
    console.error(`❌ Token required. Set ${platform === 'vercel' ? 'VERCEL_TOKEN' : 'RAILWAY_TOKEN'} env var or pass as argument`);
    process.exit(1);
  }

  deployMCP(platform, project, token, branch)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = deployMCP;
