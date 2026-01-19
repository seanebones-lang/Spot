#!/usr/bin/env node

/**
 * Railway Deployment Script
 * Deploys the application to Railway using the Railway GraphQL API
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';
const WORKSPACE_ID = '16b963d0-f37c-49bc-baa9-efb2eb901503';

async function makeRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
    
    const options = {
      hostname: 'backboard.railway.app',
      path: '/graphql/v1',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RAILWAY_TOKEN}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function deploy() {
  console.log('🚂 Deploying to Railway...\n');

  try {
    // Get project info
    console.log('📡 Fetching project information...');
    const projectQuery = `
      query GetProject($projectId: String!) {
        project(id: $projectId) {
          id
          name
          services {
            edges {
              node {
                id
                name
                createdAt
              }
            }
          }
        }
      }
    `;

    const projectResult = await makeRequest(projectQuery, { projectId: PROJECT_ID });
    
    if (projectResult.errors) {
      console.error('❌ Error fetching project:', projectResult.errors);
      process.exit(1);
    }

    const project = projectResult.data.project;
    console.log(`✅ Project: ${project.name} (${project.id})`);
    
    const services = project.services.edges.map(e => e.node);
    console.log(`📦 Found ${services.length} service(s)`);

    if (services.length === 0) {
      console.log('\n⚠️  No services found. You may need to create a service in the Railway dashboard first.');
      console.log(`   Visit: https://railway.app/project/${PROJECT_ID}`);
      console.log('\n💡 To create a service:');
      console.log('   1. Go to Railway dashboard');
      console.log('   2. Click "Add Service" or "+ Create"');
      console.log('   3. Select "GitHub Repo" or "Deploy from GitHub"');
      console.log('   4. Connect your repository');
      console.log('   5. Railway will auto-detect Next.js and deploy');
      return;
    }

    // List services
    services.forEach((service, i) => {
      console.log(`   ${i + 1}. ${service.name} (${service.id})`);
    });

    console.log('\n✅ Project is ready for deployment!');
    console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Push your code to GitHub (if not already)');
    console.log('   2. Connect the repository in Railway dashboard');
    console.log('   3. Railway will automatically deploy on push');
    console.log('\n   OR use Railway CLI:');
    console.log('   $ export RAILWAY_TOKEN="' + RAILWAY_TOKEN + '"');
    console.log('   $ railway link --project ' + PROJECT_ID);
    console.log('   $ railway up');

  } catch (error) {
    console.error('❌ Deployment error:', error.message);
    process.exit(1);
  }
}

deploy();
