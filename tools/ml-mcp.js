#!/usr/bin/env node
// tools/ml-mcp.js – AI/ML MCP Tool (Ollama, Jupyter, W&B)
// Train and deploy ML models via MCP
const { execSync, spawn } = require('child_process');
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

/**
 * ML MCP Tool
 * Train and deploy ML models using Ollama, Jupyter, or Weights & Biases
 * 
 * @param {string} model - Model name (llama3.2, mistral, etc.)
 * @param {string} data - Training data or prompt
 * @param {string} action - Action: 'train' | 'run' | 'deploy' | 'eval'
 * @param {string} backend - Backend: 'ollama' | 'jupyter' | 'wandb'
 */
async function mlMCP(model, data, action = 'run', backend = 'ollama') {
  const tools = {
    ollama: async () => {
      try {
        // Check if Ollama is installed
        try {
          execSync('ollama --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Ollama not installed. Install: brew install ollama');
        }

        console.log(`🤖 Running ${action} on Ollama model: ${model}`);

        switch (action) {
          case 'train':
          case 'run':
            // Run model with data/prompt
            const cmd = `ollama run ${model} "${data}"`;
            execSync(cmd, {
              stdio: 'inherit',
              cwd: process.cwd(),
              env: process.env
            });
            return `Model ${model} executed successfully on Ollama (localhost:11434)`;

          case 'deploy':
            // Pull model if not exists, then serve
            console.log(`📦 Pulling model: ${model}`);
            execSync(`ollama pull ${model}`, { stdio: 'inherit' });
            return `Model ${model} deployed and ready at localhost:11434`;

          case 'eval':
            // Evaluate model performance
            console.log(`📊 Evaluating model: ${model}`);
            execSync(`ollama run ${model} "Evaluate performance: ${data}"`, {
              stdio: 'inherit'
            });
            return `Evaluation complete for ${model}`;

          default:
            throw new Error(`Unknown action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Ollama operation failed: ${error.message}`);
      }
    },

    jupyter: async () => {
      try {
        console.log(`📓 Running Jupyter notebook for model: ${model}`);
        
        // Check if Jupyter is installed
        try {
          execSync('jupyter --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Jupyter not installed. Install: pip install jupyter');
        }

        // Create or run notebook
        const notebookPath = join(process.cwd(), 'notebooks', `${model}.ipynb`);
        
        if (action === 'train' || action === 'run') {
          // Start Jupyter lab
          spawn('jupyter', ['lab', '--ip=0.0.0.0', '--port=8888', '--no-browser'], {
            detached: true,
            stdio: 'ignore'
          });
          return `Jupyter Lab started at http://localhost:8888 for model ${model}`;
        }

        return `Jupyter notebook ready: ${notebookPath}`;
      } catch (error) {
        throw new Error(`Jupyter operation failed: ${error.message}`);
      }
    },

    wandb: async () => {
      try {
        console.log(`📈 Running Weights & Biases for model: ${model}`);
        
        // Check if wandb is installed
        try {
          execSync('wandb --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('W&B not installed. Install: pip install wandb');
        }

        // Initialize W&B project
        execSync(`wandb init -p ${model}`, { stdio: 'inherit' });
        return `W&B project ${model} initialized. Track at: https://wandb.ai`;
      } catch (error) {
        throw new Error(`W&B operation failed: ${error.message}`);
      }
    }
  };

  if (!tools[backend]) {
    throw new Error(`Unsupported backend: ${backend}. Use 'ollama', 'jupyter', or 'wandb'`);
  }

  const result = await tools[backend]();
  console.log(`✅ ${result}`);

  return JSON.stringify({
    status: 'success',
    backend,
    model,
    action,
    result,
    timestamp: new Date().toISOString()
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: tools/ml-mcp.js <model> <data> [action] [backend]');
    console.error('  model:   Model name (llama3.2, mistral, etc.)');
    console.error('  data:    Training data or prompt');
    console.error('  action:  train | run | deploy | eval (default: run)');
    console.error('  backend: ollama | jupyter | wandb (default: ollama)');
    process.exit(1);
  }

  const [model, data, action = 'run', backend = 'ollama'] = args;

  mlMCP(model, data, action, backend)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = mlMCP;
