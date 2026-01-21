#!/usr/bin/env node

/**
 * ML MCP Tool
 * AI/ML training and deployment (Ollama, Jupyter, W&B)
 *
 * Usage:
 *   node tools/ml-mcp.js [model] [action] [data] [backend]
 *
 * Backends:
 *   - ollama: Ollama local models
 *   - jupyter: Jupyter notebooks
 *   - wandb: Weights & Biases
 *
 * Actions:
 *   - train: Train model
 *   - run: Run model inference
 *   - deploy: Deploy model
 *   - eval: Evaluate model
 *
 * Examples:
 *   node tools/ml-mcp.js mood-classifier train data.csv ollama
 *   node tools/ml-mcp.js mood-classifier run input.json ollama
 *   node tools/ml-mcp.js mood-classifier eval test.csv wandb
 *   npm run ml mood-classifier train data.csv ollama
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const BACKENDS = {
  ollama: {
    train: "ollama create model-name -f Modelfile",
    run: "ollama run model-name",
    deploy: "ollama serve",
    eval: "ollama eval model-name test-data.json",
  },
  jupyter: {
    train: "jupyter nbconvert --execute train.ipynb",
    run: "jupyter nbconvert --execute inference.ipynb",
    deploy: "jupyter notebook --ip=0.0.0.0",
    eval: "jupyter nbconvert --execute evaluate.ipynb",
  },
  wandb: {
    train: "wandb run train.py",
    run: "wandb run inference.py",
    deploy: "wandb deploy model-name",
    eval: "wandb run evaluate.py",
  },
};

function runML(model, action, data, backend = "ollama") {
  const backendConfig = BACKENDS[backend];

  if (!backendConfig) {
    console.error(`❌ Unknown backend: ${backend}`);
    console.log("\nAvailable backends: ollama, jupyter, wandb");
    process.exit(1);
  }

  const command = backendConfig[action];
  if (!command) {
    console.error(`❌ Unknown action: ${action}`);
    console.log("\nAvailable actions: train, run, deploy, eval");
    process.exit(1);
  }

  try {
    console.log(`🤖 Running ML ${action} for ${model} on ${backend}...`);
    console.log(`📋 Data: ${data || "default"}`);
    console.log(`📋 Command: ${command}\n`);

    // Build full command with model and data
    let fullCommand = command;
    if (model) {
      fullCommand = fullCommand.replace("model-name", model);
    }
    if (data) {
      fullCommand = `${fullCommand} ${data}`;
    }

    execSync(fullCommand, {
      stdio: "inherit",
      cwd: process.cwd(),
      env: {
        ...process.env,
        ML_MODEL: model || "default",
        ML_DATA: data || "",
        ML_BACKEND: backend,
      },
    });

    console.log(`\n✅ ML ${action} completed successfully`);
  } catch (error) {
    console.error(`\n❌ ML ${action} failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const model = args[0];
  const action = args[1];
  const data = args[2];
  const backend = args[3] || "ollama";

  if (!model) {
    console.error("❌ Error: Model name is required");
    console.log(
      "\nUsage: node tools/ml-mcp.js [model] [action] [data] [backend]",
    );
    console.log("\nActions: train, run, deploy, eval");
    console.log("Backends: ollama, jupyter, wandb");
    console.log("\nExamples:");
    console.log("  node tools/ml-mcp.js mood-classifier train data.csv ollama");
    console.log("  node tools/ml-mcp.js mood-classifier run input.json ollama");
    console.log("  node tools/ml-mcp.js mood-classifier eval test.csv wandb");
    console.log("  npm run ml mood-classifier train data.csv ollama");
    process.exit(1);
  }

  if (!action) {
    console.error("❌ Error: Action is required");
    console.log("\nActions: train, run, deploy, eval");
    process.exit(1);
  }

  runML(model, action, data, backend);
}

module.exports = { runML, BACKENDS };
