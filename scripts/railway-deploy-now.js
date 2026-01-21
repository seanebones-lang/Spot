#!/usr/bin/env node

<<<<<<< HEAD
const https = require("https");

const RAILWAY_TOKEN = "0be18ca8-43bf-4a21-ae29-b0a5f7903b08";
const PROJECT_ID = "109bb4f8-7620-422c-8360-3b0298f9fb90";
const WORKSPACE_ID = "16b963d0-f37c-49bc-baa9-efb2eb901503";
=======
const https = require('https');

const RAILWAY_TOKEN = '0be18ca8-43bf-4a21-ae29-b0a5f7903b08';
const PROJECT_ID = '109bb4f8-7620-422c-8360-3b0298f9fb90';
const WORKSPACE_ID = '16b963d0-f37c-49bc-baa9-efb2eb901503';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

function graphqlRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });
<<<<<<< HEAD

    const options = {
      hostname: "backboard.railway.app",
      path: "/graphql/v1",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RAILWAY_TOKEN}`,
        "Content-Length": data.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
=======
    
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        try {
          const parsed = JSON.parse(body);
          if (parsed.errors) {
            reject(new Error(JSON.stringify(parsed.errors, null, 2)));
          } else {
            resolve(parsed.data);
          }
        } catch (e) {
<<<<<<< HEAD
          reject(
            new Error(
              `Parse error: ${e.message}\nResponse: ${body.substring(0, 500)}`,
            ),
          );
=======
          reject(new Error(`Parse error: ${e.message}\nResponse: ${body.substring(0, 500)}`));
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        }
      });
    });

<<<<<<< HEAD
    req.on("error", reject);
=======
    req.on('error', reject);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    req.write(data);
    req.end();
  });
}

async function deploy() {
<<<<<<< HEAD
  console.log("🚂 Deploying to Railway via API...\n");

  try {
    // First, get project info
    console.log("📡 Fetching project...");
=======
  console.log('🚂 Deploying to Railway via API...\n');

  try {
    // First, get project info
    console.log('📡 Fetching project...');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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

<<<<<<< HEAD
    const projectData = await graphqlRequest(projectQuery, {
      projectId: PROJECT_ID,
    });
    const project = projectData.project;
    console.log(`✅ Project: ${project.name || PROJECT_ID}\n`);

    const services = project.services.edges.map((e) => e.node);
=======
    const projectData = await graphqlRequest(projectQuery, { projectId: PROJECT_ID });
    const project = projectData.project;
    console.log(`✅ Project: ${project.name || PROJECT_ID}\n`);

    const services = project.services.edges.map(e => e.node);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    console.log(`📦 Found ${services.length} existing service(s)`);

    let serviceId = null;
    if (services.length > 0) {
      serviceId = services[0].node.id;
<<<<<<< HEAD
      console.log(
        `✅ Using existing service: ${services[0].node.name} (${serviceId})`,
      );
    } else {
      // Create new service
      console.log("📦 Creating new service...");
=======
      console.log(`✅ Using existing service: ${services[0].node.name} (${serviceId})`);
    } else {
      // Create new service
      console.log('📦 Creating new service...');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const createMutation = `
        mutation CreateService($projectId: ID!, $name: String!) {
          serviceCreate(projectId: $projectId, name: $name) {
            id
            name
          }
        }
      `;
<<<<<<< HEAD

      const createResult = await graphqlRequest(createMutation, {
        projectId: PROJECT_ID,
        name: "empulse-music-backend",
      });

      serviceId = createResult.serviceCreate.id;
      console.log(
        `✅ Created service: ${createResult.serviceCreate.name} (${serviceId})`,
      );
    }

    // Connect GitHub repo
    console.log("\n🔗 Connecting GitHub repository...");
=======
      
      const createResult = await graphqlRequest(createMutation, {
        projectId: PROJECT_ID,
        name: 'empulse-music-backend'
      });
      
      serviceId = createResult.serviceCreate.id;
      console.log(`✅ Created service: ${createResult.serviceCreate.name} (${serviceId})`);
    }

    // Connect GitHub repo
    console.log('\n🔗 Connecting GitHub repository...');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
        repo: "seanebones-lang/Spot",
        branch: "main",
=======
        repo: 'seanebones-lang/Spot',
        branch: 'main'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      });
      console.log(`✅ Connected GitHub repo: seanebones-lang/Spot`);
    } catch (e) {
      console.log(`⚠️  GitHub connection: ${e.message}`);
<<<<<<< HEAD
      console.log("💡 You may need to authorize Railway in GitHub first");
    }

    // Trigger deployment
    console.log("\n🚀 Triggering deployment...");
=======
      console.log('💡 You may need to authorize Railway in GitHub first');
    }

    // Trigger deployment
    console.log('\n🚀 Triggering deployment...');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
        serviceId: serviceId,
      });
      console.log(
        `✅ Deployment triggered: ${deployResult.deploymentCreate.id}`,
      );
      console.log(`   Status: ${deployResult.deploymentCreate.status}`);
    } catch (e) {
      console.log(`⚠️  Deployment trigger: ${e.message}`);
      console.log(
        "💡 Deployment will start automatically when GitHub is connected",
      );
    }

    // Set environment variables
    console.log("\n🔧 Setting environment variables...");
    const envVars = [
      { key: "NODE_ENV", value: "production" },
      { key: "NEXT_TELEMETRY_DISABLED", value: "1" },
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
          value: env.value,
=======
          value: env.value
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        });
        console.log(`✅ Set ${env.key}=${env.value}`);
      } catch (e) {
        console.log(`⚠️  Could not set ${env.key}: ${e.message}`);
      }
    }

<<<<<<< HEAD
    console.log("\n✅ DEPLOYMENT INITIATED!");
    console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
    console.log(
      `🔗 Service: https://railway.app/project/${PROJECT_ID}/service/${serviceId}`,
    );
    console.log(
      "\n⚠️  IMPORTANT: Set these environment variables in Railway dashboard:",
    );
    console.log("   - JWT_SECRET (generate with: openssl rand -base64 32)");
    console.log("   - XAI_API_KEY (your xAI API key)");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.log("\n💡 Trying alternative deployment method...");

    // Try REST API
    try {
      const restOptions = {
        hostname: "api.railway.app",
        path: `/v1/projects/${PROJECT_ID}/services`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${RAILWAY_TOKEN}`,
          "Content-Type": "application/json",
        },
      };

      const restData = JSON.stringify({
        name: "empulse-music-backend",
        source: {
          repo: "seanebones-lang/Spot",
          branch: "main",
        },
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      });

      await new Promise((resolve, reject) => {
        const req = https.request(restOptions, (res) => {
<<<<<<< HEAD
          let body = "";
          res.on("data", (chunk) => {
            body += chunk;
          });
          res.on("end", () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log("✅ Service created via REST API");
=======
          let body = '';
          res.on('data', (chunk) => { body += chunk; });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              console.log('✅ Service created via REST API');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              resolve(JSON.parse(body));
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${body}`));
            }
          });
        });
<<<<<<< HEAD
        req.on("error", reject);
=======
        req.on('error', reject);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        req.write(restData);
        req.end();
      });
    } catch (restError) {
<<<<<<< HEAD
      console.error("REST API also failed:", restError.message);
=======
      console.error('REST API also failed:', restError.message);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      throw error;
    }
  }
}

deploy().catch(console.error);
