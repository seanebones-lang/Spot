#!/usr/bin/env node

const https = require('https');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';

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
  console.log('🚂 Deploying to Railway via GraphQL API...\n');

  try {
    // Create service with GitHub repo - using correct mutation format
    console.log('📦 Creating service from GitHub repo...');
    const createMutation = `
      mutation CreateService($input: ServiceCreateInput!) {
        serviceCreate(input: $input) {
          id
          name
        }
      }
    `;

    const createResult = await graphqlRequest(createMutation, {
      input: {
        projectId: PROJECT_ID,
        name: 'empulse-music-backend',
        source: {
          repo: 'seanebones-lang/Spot',
          branch: 'main'
        }
      }
    });

    const service = createResult.serviceCreate;
    console.log(`✅ Service created: ${service.name} (${service.id})`);

    // Set environment variables
    console.log('\n🔧 Setting environment variables...');
    const envVars = [
      { key: 'NODE_ENV', value: 'production' },
      { key: 'NEXT_TELEMETRY_DISABLED', value: '1' }
    ];

    for (const env of envVars) {
      try {
        const envMutation = `
          mutation SetVariable($input: VariableUpsertInput!) {
            variableUpsert(input: $input) {
              id
              key
              value
            }
          }
        `;
        await graphqlRequest(envMutation, {
          input: {
            serviceId: service.id,
            key: env.key,
            value: env.value
          }
        });
        console.log(`✅ Set ${env.key}=${env.value}`);
      } catch (e) {
        console.log(`⚠️  Could not set ${env.key}: ${e.message}`);
      }
    }

    console.log('\n✅ DEPLOYMENT INITIATED!');
    console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
    console.log(`🔗 Service: https://railway.app/project/${PROJECT_ID}/service/${service.id}`);
    console.log('\n⚠️  IMPORTANT: Set these in Railway dashboard → Variables:');
    console.log('   - JWT_SECRET (generate: openssl rand -base64 32)');
    console.log('   - XAI_API_KEY (your xAI API key)');
    console.log('\n🚀 Railway is now building and deploying your app!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    
    // Try to get project info to verify token works
    try {
      console.log('\n🔍 Verifying token and project access...');
      const projectQuery = `
        query GetProject($projectId: ID!) {
          project(id: $projectId) {
            id
            name
          }
        }
      `;
      const projectData = await graphqlRequest(projectQuery, { projectId: PROJECT_ID });
      console.log(`✅ Token works! Project: ${projectData.project.name}`);
      console.log('\n💡 The service creation may require GitHub app installation.');
      console.log('   Please check: https://railway.app/project/' + PROJECT_ID);
    } catch (verifyError) {
      console.error('❌ Token verification failed:', verifyError.message);
      console.log('\n💡 The token may need different permissions or format.');
    }
  }
}

deploy().catch(console.error);
