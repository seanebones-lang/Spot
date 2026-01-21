#!/usr/bin/env node

/**
 * Security MCP Tool
 * Security scanning (npm audit, Snyk, SonarQube)
 *
 * Usage:
 *   node tools/security-mcp.js [scanner] [action]
 *
 * Scanners:
 *   - npm: npm audit
 *   - snyk: Snyk security scan
 *   - sonarqube: SonarQube analysis
 *   - all: Run all scanners
 *
 * Actions:
 *   - scan: Run security scan
 *   - fix: Auto-fix vulnerabilities
 *   - report: Generate security report
 *
 * Examples:
 *   node tools/security-mcp.js npm scan
 *   node tools/security-mcp.js snyk fix
 *   node tools/security-mcp.js all scan
 *   npm run security npm scan
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const SCANNERS = {
  npm: {
    scan: "npm audit",
    fix: "npm audit fix",
    report: "npm audit --json > security-report.json",
  },
  snyk: {
    scan: "npx snyk test",
    fix: "npx snyk wizard",
    report: "npx snyk test --json > snyk-report.json",
  },
  sonarqube: {
    scan: "npx sonar-scanner",
    fix: "npx sonar-scanner -Dsonar.analysis.mode=preview",
    report: "npx sonar-scanner -Dsonar.report.path=sonar-report.json",
  },
  all: {
    scan: "npm audit && npx snyk test && npx sonar-scanner",
    fix: "npm audit fix && npx snyk wizard",
    report:
      "npm audit --json > security-report.json && npx snyk test --json > snyk-report.json",
  },
};

function runSecurityScan(scanner, action = "scan") {
  const scannerConfig = SCANNERS[scanner];

  if (!scannerConfig) {
    console.error(`❌ Unknown scanner: ${scanner}`);
    console.log("\nAvailable scanners: npm, snyk, sonarqube, all");
    process.exit(1);
  }

  const command = scannerConfig[action];
  if (!command) {
    console.error(`❌ Unknown action: ${action}`);
    console.log("\nAvailable actions: scan, fix, report");
    process.exit(1);
  }

  try {
    console.log(`🔒 Running ${scanner} security ${action}...`);
    console.log(`📋 Command: ${command}\n`);

    execSync(command, {
      stdio: "inherit",
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: "production",
      },
    });

    console.log(`\n✅ ${scanner} security ${action} completed`);
  } catch (error) {
    // Security scans may fail if vulnerabilities are found - that's okay
    console.warn(`\n⚠️ ${scanner} security ${action} found issues`);
    if (action === "scan" || action === "report") {
      // For scan/report, don't exit on errors - we want to see the report
      console.log("📋 Review the output above for security issues");
    } else {
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const scanner = args[0];
  const action = args[1] || "scan";

  if (!scanner) {
    console.error("❌ Error: Scanner is required");
    console.log("\nUsage: node tools/security-mcp.js [scanner] [action]");
    console.log("\nScanners: npm, snyk, sonarqube, all");
    console.log("Actions: scan, fix, report");
    console.log("\nExamples:");
    console.log("  node tools/security-mcp.js npm scan");
    console.log("  node tools/security-mcp.js snyk fix");
    console.log("  node tools/security-mcp.js all scan");
    console.log("  npm run security npm scan");
    process.exit(1);
  }

  runSecurityScan(scanner, action);
}

module.exports = { runSecurityScan, SCANNERS };
