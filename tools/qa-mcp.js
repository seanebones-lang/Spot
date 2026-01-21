#!/usr/bin/env node

/**
 * QA MCP Tool
 * QA automation (Playwright, Cypress, Vitest, Load Testing)
 *
 * Usage:
 *   node tools/qa-mcp.js [framework] [action] [target]
 *
 * Frameworks:
 *   - playwright: Playwright E2E testing
 *   - cypress: Cypress E2E testing
 *   - vitest: Vitest unit/integration testing
 *   - load: Load/performance testing
 *
 * Actions:
 *   - test: Run tests
 *   - ui: Open test UI
 *   - headed: Run in headed mode
 *   - debug: Debug mode
 *   - report: Generate test report
 *
 * Examples:
 *   node tools/qa-mcp.js playwright test
 *   node tools/qa-mcp.js cypress ui
 *   node tools/qa-mcp.js vitest test --coverage
 *   node tools/qa-mcp.js load test --duration 60
 */

const { execSync } = require("child_process");
const path = require("path");

const FRAMEWORKS = {
  playwright: {
    test: "npx playwright test",
    ui: "npx playwright test --ui",
    headed: "npx playwright test --headed",
    debug: "npx playwright test --debug",
    report: "npx playwright show-report",
  },
  cypress: {
    test: "npx cypress run",
    ui: "npx cypress open",
    headed: "npx cypress run --headed",
    debug: "npx cypress run --browser chrome --headed",
    report: "npx cypress run --reporter mochawesome",
  },
  vitest: {
    test: "npm test",
    ui: "npm run test:ui",
    headed: "npm test",
    debug: "npm run test:debug",
    report: "npm run test:coverage",
  },
  load: {
    test: "npx k6 run load-tests/script.js",
    ui: "npx k6 cloud script.js",
    headed: "npx k6 run --http-debug load-tests/script.js",
    debug: "npx k6 run --http-debug load-tests/script.js",
    report: "npx k6 run --out json=load-report.json load-tests/script.js",
  },
};

function getFrameworkCommand(framework, action, target = "") {
  const commands = FRAMEWORKS[framework];
  if (!commands) {
    throw new Error(
      `Unknown framework: ${framework}. Available: ${Object.keys(FRAMEWORKS).join(", ")}`,
    );
  }

  const command = commands[action];
  if (!command) {
    throw new Error(
      `Unknown action: ${action}. Available: ${Object.keys(commands).join(", ")}`,
    );
  }

  // Add target if specified
  if (target && framework !== "load") {
    return `${command} ${target}`;
  }

  return command;
}

function runQA(args) {
  const [framework, action, ...targetParts] = args;
  const target = targetParts.join(" ");

  if (!framework) {
    console.error("❌ Error: Framework is required");
    console.log("\nUsage: node tools/qa-mcp.js [framework] [action] [target]");
    console.log("\nFrameworks: playwright, cypress, vitest, load");
    console.log("Actions: test, ui, headed, debug, report");
    console.log("\nExamples:");
    console.log("  node tools/qa-mcp.js playwright test");
    console.log("  node tools/qa-mcp.js cypress ui");
    console.log("  node tools/qa-mcp.js vitest test --coverage");
    console.log("  node tools/qa-mcp.js load test");
    process.exit(1);
  }

  if (!action) {
    console.error("❌ Error: Action is required");
    console.log("\nActions: test, ui, headed, debug, report");
    process.exit(1);
  }

  try {
    console.log(
      `🧪 Running QA: ${framework} ${action}${target ? ` ${target}` : ""}`,
    );

    const command = getFrameworkCommand(framework, action, target);
    console.log(`📋 Command: ${command}\n`);

    // Execute the command
    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: "test",
      },
    });

    console.log("\n✅ QA execution completed successfully");
  } catch (error) {
    console.error(`\n❌ QA execution failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  runQA(args);
}

module.exports = { runQA, FRAMEWORKS };
