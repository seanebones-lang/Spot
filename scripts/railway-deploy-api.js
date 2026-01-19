#!/usr/bin/env node

/**
 * Railway Deployment via API
 * Creates a service and triggers deployment
 */

const https = require('https');
const { execSync } = require('child_process');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';
const WORKSPACE_ID = '16b963d0-f37c-49bc-baa9-efb2eb901503';

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.railway.app',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${RAILWAY_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = jsonData.length;
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${JSON.stringify(parsed)}`));
          }
        } catch (e) {
          resolve({ raw: body, statusCode: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function deploy() {
  console.log('🚂 Deploying to Railway via API...\n');

  try {
    // Get project info
    console.log('📡 Checking project...');
    const projectInfo = await makeRequest('GET', `/v1/projects/${PROJECT_ID}`);
    console.log(`✅ Project: ${projectInfo.name || PROJECT_ID}\n`);

    // Get services
    console.log('📦 Checking existing services...');
    const services = await makeRequest('GET', `/v1/projects/${PROJECT_ID}/services`);
    
    let serviceId;
    if (services && services.length > 0) {
      serviceId = services[0].id;
      console.log(`✅ Found existing service: ${services[0].name} (${serviceId})`);
    } else {
      console.log('📦 Creating new service...');
      const newService = await makeRequest('POST', `/v1/projects/${PROJECT_ID}/services`, {
        name: 'empulse-music-backend',
        source: {
          repo: 'seanebones-lang/Spot',
          branch: 'main'
        }
      });
      serviceId = newService.id;
      console.log(`✅ Created service: ${newService.name} (${serviceId})`);
    }

    console.log('\n✅ Deployment configuration complete!');
    console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
    console.log(`🔗 Service: https://railway.app/project/${PROJECT_ID}/service/${serviceId}`);
    
    console.log('\n💡 Next steps:');
    console.log('   1. Go to Railway dashboard and connect GitHub repo');
    console.log('   2. Set environment variables (JWT_SECRET, XAI_API_KEY)');
    console.log('   3. Railway will auto-deploy on push');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Alternative: Use Railway Dashboard');
    console.log('   1. Visit: https://railway.app/project/' + PROJECT_ID);
    console.log('   2. Click "+ Create" → "GitHub Repo"');
    console.log('   3. Connect: seanebones-lang/Spot');
    console.log('   4. Railway will auto-detect and deploy');
  }
}

deploy();
