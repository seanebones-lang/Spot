#!/usr/bin/env node

const https = require('https');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';
const WORKSPACE_ID = '16b963d0-f37c-49bc-baa9-efb2eb901503';

function graphqlRequest(query, variables = {}) {
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
          const parsed = JSON.parse(body);
          if (parsed.errors) {
            reject(new Error(JSON.stringify(parsed.errors, null, 2)));
          } else {
            resolve(parsed.data);
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}\nResponse: ${body.substring(0, 500)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function deploy() {
  console.log('🚂 Deploying to Railway via API...\n');

  try {
    // First, get project info
    console.log('📡 Fetching project...');
    const projectQuery = `
      query GetProject($projectId: ID!) {
        project(id: $projectId) {
          id
          name
          services {
            edges {
              node {
                id
                name
                source {
                  ... on GitHubSource {
                    repo
                    branch
                  }
                }
              }
            }
          }
        }
      }
    `;

    const projectData = await graphqlRequest(projectQuery, { projectId: PROJECT_ID });
    const project = projectData.project;
    console.log(`✅ Project: ${project.name || PROJECT_ID}\n`);

    const services = project.services.edges.map(e => e.node);
    console.log(`📦 Found ${services.length} existing service(s)`);

    let serviceId = null;
    if (services.length > 0) {
      serviceId = services[0].node.id;
      console.log(`✅ Using existing service: ${services[0].node.name} (${serviceId})`);
    } else {
      // Create new service
      console.log('📦 Creating new service...');
      const createMutation = `
        mutation CreateService($projectId: ID!, $name: String!) {
          serviceCreate(projectId: $projectId, name: $name) {
            id
            name
          }
        }
      `;
      
      const createResult = await graphqlRequest(createMutation, {
        projectId: PROJECT_ID,
        name: 'empulse-music-backend'
      });
      
      serviceId = createResult.serviceCreate.id;
      console.log(`✅ Created service: ${createResult.serviceCreate.name} (${serviceId})`);
    }

    // Connect GitHub repo
    console.log('\n🔗 Connecting GitHub repository...');
    const connectMutation = `
      mutation ConnectGitHub($serviceId: ID!, $repo: String!, $branch: String!) {
        serviceConnectRepo(serviceId: $serviceId, repo: $repo, branch: $branch) {
          id
          name
        }
      }
    `;

    try {
      const connectResult = await graphqlRequest(connectMutation, {
        serviceId: serviceId,
        repo: 'seanebones-lang/Spot',
        branch: 'main'
      });
      console.log(`✅ Connected GitHub repo: seanebones-lang/Spot`);
    } catch (e) {
      console.log(`⚠️  GitHub connection: ${e.message}`);
      console.log('💡 You may need to authorize Railway in GitHub first');
    }

    // Trigger deployment
    console.log('\n🚀 Triggering deployment...');
    const deployMutation = `
      mutation DeployService($serviceId: ID!) {
        deploymentCreate(serviceId: $serviceId) {
          id
          status
        }
      }
    `;

    try {
      const deployResult = await graphqlRequest(deployMutation, {
        serviceId: serviceId
      });
      console.log(`✅ Deployment triggered: ${deployResult.deploymentCreate.id}`);
      console.log(`   Status: ${deployResult.deploymentCreate.status}`);
    } catch (e) {
      console.log(`⚠️  Deployment trigger: ${e.message}`);
      console.log('💡 Deployment will start automatically when GitHub is connected');
    }

    // Set environment variables
    console.log('\n🔧 Setting environment variables...');
    const envVars = [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'NEXT_TELEMETRY_DISABLED', value: '1' }
    ];

    for (const env of envVars) {
      try {
        const envMutation = `
          mutation SetVariable($serviceId: ID!, $key: String!, $value: String!) {
            variableUpsert(serviceId: $serviceId, key: $key, value: $value) {
              id
              key
              value
            }
          }
        `;
        await graphqlRequest(envMutation, {
          serviceId: serviceId,
          key: env.key,
          value: env.value
        });
        console.log(`✅ Set ${env.key}=${env.value}`);
      } catch (e) {
        console.log(`⚠️  Could not set ${env.key}: ${e.message}`);
      }
    }

    console.log('\n✅ DEPLOYMENT INITIATED!');
    console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
    console.log(`🔗 Service: https://railway.app/project/${PROJECT_ID}/service/${serviceId}`);
    console.log('\n⚠️  IMPORTANT: Set these environment variables in Railway dashboard:');
    console.log('   - JWT_SECRET (generate with: openssl rand -base64 32)');
    console.log('   - XAI_API_KEY (your xAI API key)');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.log('\n💡 Trying alternative deployment method...');
    
    // Try REST API
    try {
      const restOptions = {
        hostname: 'api.railway.app',
        path: `/v1/projects/${PROJECT_ID}/services`,
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RAILWAY_TOKEN}`,
          'Content-Type': 'application/json'
        }
      };

      const restData = JSON.stringify({
        name: 'empulse-music-backend',
        source: {
          repo: 'seanebones-lang/Spot',
          branch: 'main'
        }
      });

      await new Promise((resolve, reject) => {
        const req = https.request(restOptions, (res) => {
          let body = '';
          res.on('data', (chunk) => { body += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log('✅ Service created via REST API');
              resolve(JSON.parse(body));
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${body}`));
            }
          });
        });
        req.on('error', reject);
        req.write(restData);
        req.end();
      });
    } catch (restError) {
      console.error('REST API also failed:', restError.message);
      throw error;
    }
  }
}

deploy().catch(console.error);
