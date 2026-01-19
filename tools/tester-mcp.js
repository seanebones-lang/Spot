#!/usr/bin/env node
// tools/tester-mcp.js – MCP Testing Tool (Vitest/Playwright/Jest)
// Auto-run tests with MCP integration
const { execSync, spawn } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * MCP Testing Tool
 * Runs tests and returns results
 * 
 * @param {string} cmd - Test command to run (default: 'npm test')
 * @param {string} type - Test type: 'unit' | 'e2e' | 'integration' | 'all'
 */
async function testerMCP(cmd, type = 'all') {
  const testCommands = {
    unit: 'npm test',
    e2e: 'npm run test:e2e',
    integration: 'npm run test:infrastructure',
    all: 'npm test && npm run test:e2e'
  };

  const command = cmd || testCommands[type] || testCommands.all;

  console.log(`🧪 Running tests: ${command}`);

  try {
    // Check if package.json exists
    const packagePath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    
    // Verify test scripts exist
    if (!packageJson.scripts || !packageJson.scripts.test) {
      console.warn('⚠️  No test script found in package.json');
    }

    // Run the test command
    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env
    });

    console.log('✅ Tests passed');
    
    return JSON.stringify({
      status: 'success',
      command,
      type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error(`❌ Tests failed: ${error.message}`);
    
    return JSON.stringify({
      status: 'failed',
      command,
      type,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  const cmd = args[0] || null;
  const type = args[1] || 'all';

  testerMCP(cmd, type)
    .then(result => {
      const parsed = JSON.parse(result);
      if (parsed.status === 'failed') {
        process.exit(1);
      }
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = testerMCP;
