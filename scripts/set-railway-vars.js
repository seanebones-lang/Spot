#!/usr/bin/env node

const https = require('https');
const { execSync } = require('child_process');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';
const SERVICE_ID = 'fb25932e-07ec-4649-b819-1aaee6186d65';

// Generate JWT secret
const JWT_SECRET = execSync('openssl rand -base64 32', { encoding: 'utf8' }).trim();

// Get XAI_API_KEY from environment or use placeholder (user should update)
const XAI_API_KEY = process.env.XAI_API_KEY || 'xai-PLACEHOLDER-UPDATE-ME';

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

async function setVariables() {
  console.log('🔧 Setting Railway environment variables...\n');

  const variables = [
    { key: 'JWT_SECRET', value: JWT_SECRET },
    { key: 'XAI_API_KEY', value: XAI_API_KEY },
    { key: 'NODE_ENV', value: 'production' },
    { key: 'NEXT_TELEMETRY_DISABLED', value: '1' },
    { key: 'PORT', value: '3000' },
    { key: 'HOSTNAME', value: '0.0.0.0' }
  ];

  for (const env of variables) {
    try {
      console.log(`Setting ${env.key}...`);
      
      const mutation = `
        mutation UpsertVariable($input: VariableUpsertInput!) {
          variableUpsert(input: $input) {
            id
            key
            value
          }
        }
      `;

      const result = await graphqlRequest(mutation, {
        input: {
          serviceId: SERVICE_ID,
          key: env.key,
          value: env.value
        }
      });

      if (result.variableUpsert) {
        console.log(`✅ Set ${env.key}`);
      }
    } catch (error) {
      console.error(`❌ Failed to set ${env.key}:`, error.message);
      
      // Try alternative mutation format
      try {
        const altMutation = `
          mutation SetVariable($serviceId: ID!, $key: String!, $value: String!) {
            variableUpsert(serviceId: $serviceId, key: $key, value: $value) {
              id
              key
              value
            }
          }
        `;
        
        const altResult = await graphqlRequest(altMutation, {
          serviceId: SERVICE_ID,
          key: env.key,
          value: env.value
        });
        
        console.log(`✅ Set ${env.key} (alternative method)`);
      } catch (altError) {
        console.error(`❌ Both methods failed for ${env.key}`);
      }
    }
  }

  console.log('\n✅ Environment variables set!');
  console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}/service/${SERVICE_ID}`);
  console.log('\n⚠️  IMPORTANT: Update XAI_API_KEY with your actual key if placeholder was used');
}

setVariables().catch(console.error);
