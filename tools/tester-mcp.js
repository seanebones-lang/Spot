#!/usr/bin/env node

/**
 * Tester MCP Tool
 * Run tests via MCP (Unit, E2E, Integration, All)
 * 
 * Usage:
 *   node tools/tester-mcp.js [type] [options]
 * 
 * Types:
 *   - unit: Unit tests (Vitest/Jest)
 *   - e2e: End-to-end tests (Playwright)
 *   - integration: Integration tests
 *   - all: Run all tests
 * 
 * Examples:
 *   node tools/tester-mcp.js unit
 *   node tools/tester-mcp.js e2e --headed
 *   node tools/tester-mcp.js all
 *   npm run test:mcp unit
 */

const { execSync } = require('child_process');
const path = require('path');

const TEST_TYPES = {
  unit: {
    command: 'npm test',
    description: 'Run unit tests (Vitest)',
  },
  e2e: {
    command: 'npm run test:e2e',
    description: 'Run E2E tests (Playwright)',
  },
  integration: {
    command: 'npm run test:infrastructure',
    description: 'Run integration tests',
  },
  all: {
    command: 'npm test && npm run test:e2e && npm run test:infrastructure',
    description: 'Run all tests',
  },
};

function runTests(type, options = []) {
  const testConfig = TEST_TYPES[type];
  
  if (!testConfig) {
    console.error(`❌ Unknown test type: ${type}`);
    console.log('\nAvailable types: unit, e2e, integration, all');
    process.exit(1);
  }

  try {
    console.log(`🧪 Running ${type} tests...`);
    console.log(`📋 ${testConfig.description}\n`);

    // Build command with options
    let command = testConfig.command;
    if (options.length > 0) {
      command = `${command} ${options.join(' ')}`;
    }

    execSync(command, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: 'test',
      },
    });

    console.log(`\n✅ ${type} tests completed successfully`);
  } catch (error) {
    console.error(`\n❌ ${type} tests failed`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const type = args[0];
  const options = args.slice(1);

  if (!type) {
    console.error('❌ Error: Test type is required');
    console.log('\nUsage: node tools/tester-mcp.js [type] [options]');
    console.log('\nTypes: unit, e2e, integration, all');
    console.log('\nExamples:');
    console.log('  node tools/tester-mcp.js unit');
    console.log('  node tools/tester-mcp.js e2e --headed');
    console.log('  node tools/tester-mcp.js all');
    console.log('  npm run test:mcp unit');
    process.exit(1);
  }

  runTests(type, options);
}

module.exports = { runTests, TEST_TYPES };
