#!/usr/bin/env node
// tools/security-mcp.js – Security MCP Tool (Snyk, SonarQube, npm audit)
// Security scanning and vulnerability detection
const { execSync } = require('child_process');
const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * Security MCP Tool
 * Run security scans (npm audit, Snyk, SonarQube)
 * 
 * @param {string} scanner - Scanner: 'npm' | 'snyk' | 'sonarqube' | 'all'
 * @param {string} action - Action: 'scan' | 'fix' | 'report'
 */
async function securityMCP(scanner = 'all', action = 'scan') {
  const tools = {
    npm: async () => {
      try {
        console.log('🔒 Running npm audit...');
        
        if (action === 'fix') {
          execSync('npm audit fix', {
            stdio: 'inherit',
            cwd: process.cwd()
          });
          return 'npm audit fix completed';
        }

        execSync('npm audit --json', {
          stdio: 'pipe',
          cwd: process.cwd()
        });
        return 'npm audit scan complete';
      } catch (error) {
        // npm audit returns non-zero if vulnerabilities found
        const output = error.stdout?.toString() || '';
        if (output.includes('vulnerabilities')) {
          return `⚠️  npm audit found vulnerabilities. Run 'npm audit fix'`;
        }
        throw new Error(`npm audit failed: ${error.message}`);
      }
    },

    snyk: async () => {
      try {
        // Check if Snyk is installed
        try {
          execSync('snyk --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Snyk not installed. Install: npm i -g snyk && snyk auth');
        }

        console.log('🛡️  Running Snyk security scan...');

        if (action === 'fix') {
          execSync('snyk wizard', {
            stdio: 'inherit',
            cwd: process.cwd()
          });
          return 'Snyk fix wizard completed';
        }

        execSync('snyk test', {
          stdio: 'inherit',
          cwd: process.cwd()
        });
        return 'Snyk security scan complete';
      } catch (error) {
        const output = error.stdout?.toString() || '';
        if (output.includes('vulnerabilities')) {
          return `⚠️  Snyk found vulnerabilities. Run 'snyk wizard'`;
        }
        throw new Error(`Snyk scan failed: ${error.message}`);
      }
    },

    sonarqube: async () => {
      try {
        console.log('🔍 Running SonarQube scan...');
        
        // Check if SonarQube Scanner is installed
        try {
          execSync('sonar-scanner --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('SonarQube Scanner not installed. Install: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/');
        }

        execSync('sonar-scanner', {
          stdio: 'inherit',
          cwd: process.cwd()
        });
        return 'SonarQube scan complete';
      } catch (error) {
        throw new Error(`SonarQube scan failed: ${error.message}`);
      }
    },

    all: async () => {
      const results = [];
      
      // Run npm audit
      try {
        results.push(await tools.npm());
      } catch (e) {
        results.push(`npm audit: ${e.message}`);
      }

      // Run Snyk if available
      try {
        results.push(await tools.snyk());
      } catch (e) {
        results.push(`Snyk: ${e.message}`);
      }

      return results.join('\n');
    }
  };

  if (!tools[scanner]) {
    throw new Error(`Unsupported scanner: ${scanner}. Use 'npm', 'snyk', 'sonarqube', or 'all'`);
  }

  const result = await tools[scanner]();
  console.log(`✅ ${result}`);

  return JSON.stringify({
    status: 'success',
    scanner,
    action,
    result,
    timestamp: new Date().toISOString()
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  const scanner = args[0] || 'all';
  const action = args[1] || 'scan';

  securityMCP(scanner, action)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = securityMCP;
