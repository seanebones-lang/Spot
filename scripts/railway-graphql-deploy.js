#!/usr/bin/env node

const https = require("https");

const RAILWAY_TOKEN = "0be18ca8-43bf-4a21-ae29-b0a5f7903b08";
const PROJECT_ID = "109bb4f8-7620-422c-8360-3b0298f9fb90";

function graphqlRequest(query, variables = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ query, variables });

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
        try {
          const parsed = JSON.parse(body);
          if (parsed.errors) {
            reject(new Error(JSON.stringify(parsed.errors)));
          } else {
            resolve(parsed.data);
          }
        } catch (e) {
          reject(
            new Error(
              `Parse error: ${e.message}\nBody: ${body.substring(0, 200)}`,
            ),
          );
        }
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function deploy() {
  console.log("🚂 Deploying to Railway via GraphQL API...\n");

  try {
    // Get project and services
    const query = `
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

    console.log("📡 Fetching project information...");
    const result = await graphqlRequest(query, { projectId: PROJECT_ID });

    const project = result.project;
    console.log(`✅ Project: ${project.name || PROJECT_ID}`);

    const services = project.services.edges.map((e) => e.node);
    console.log(`📦 Found ${services.length} service(s)\n`);

    if (services.length > 0) {
      console.log("Existing services:");
      services.forEach((s, i) => {
        console.log(`  ${i + 1}. ${s.name} (${s.id})`);
      });
      console.log("\n✅ Service already exists!");
      console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
      console.log("\n💡 To deploy:");
      console.log("   1. Push code to GitHub: git push origin main");
      console.log("   2. Railway will auto-deploy if GitHub is connected");
      console.log("   3. Or trigger manual deploy in Railway dashboard");
    } else {
      // Create service via GraphQL
      console.log("📦 Creating new service...");
      const createMutation = `
        mutation CreateService($projectId: String!, $name: String!) {
          serviceCreate(projectId: $projectId, name: $name) {
            id
            name
          }
        }
      `;

      try {
        const createResult = await graphqlRequest(createMutation, {
          projectId: PROJECT_ID,
          name: "empulse-music-backend",
        });

        const service = createResult.serviceCreate;
        console.log(`✅ Created service: ${service.name} (${service.id})`);
        console.log(`📊 Dashboard: https://railway.app/project/${PROJECT_ID}`);
      } catch (e) {
        console.log("⚠️  Could not create service via API");
        console.log("💡 Please create service manually:");
        console.log(`   1. Visit: https://railway.app/project/${PROJECT_ID}`);
        console.log('   2. Click "+ Create" → "GitHub Repo"');
        console.log("   3. Connect: seanebones-lang/Spot");
      }
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n💡 Using Railway Dashboard (Recommended):");
    console.log(`   1. Visit: https://railway.app/project/${PROJECT_ID}`);
    console.log('   2. Click "+ Create" or "Add a Service"');
    console.log('   3. Select "GitHub Repo"');
    console.log("   4. Connect repository: seanebones-lang/Spot");
    console.log("   5. Railway will auto-detect Next.js and deploy");
  }
}

deploy();
