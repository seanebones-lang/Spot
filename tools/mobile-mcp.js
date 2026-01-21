#!/usr/bin/env node

/**
 * Mobile MCP Tool
 * Mobile app testing (Flutter, Swift, iOS, Android)
 * 
 * Usage:
 *   node tools/mobile-mcp.js [platform] [action] [app]
 * 
 * Platforms:
 *   - flutter: Flutter mobile apps
 *   - swift: Swift/iOS apps
 *   - ios: iOS platform
 *   - android: Android platform
 * 
 * Actions:
 *   - test: Run tests
 *   - build: Build app
 *   - run: Run app
 *   - doctor: Check environment
 * 
 * Examples:
 *   node tools/mobile-mcp.js flutter test
 *   node tools/mobile-mcp.js flutter build ios
 *   node tools/mobile-mcp.js android run
 *   npm run mobile flutter test
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PLATFORMS = {
  flutter: {
    test: 'flutter test',
    build: 'flutter build',
    run: 'flutter run',
    doctor: 'flutter doctor',
  },
  swift: {
    test: 'swift test',
    build: 'swift build',
    run: 'swift run',
    doctor: 'swift --version',
  },
  ios: {
    test: 'xcodebuild test -scheme Spot -destination platform=iOS Simulator,name=iPhone 14',
    build: 'xcodebuild build -scheme Spot -destination platform=iOS Simulator,name=iPhone 14',
    run: 'xcodebuild run -scheme Spot -destination platform=iOS Simulator,name=iPhone 14',
    doctor: 'xcodebuild -version',
  },
  android: {
    test: './gradlew test',
    build: './gradlew build',
    run: './gradlew installDebug',
    doctor: 'gradle --version',
  },
};

function runMobile(platform, action, app = 'spot') {
  const platformConfig = PLATFORMS[platform];
  
  if (!platformConfig) {
    console.error(`❌ Unknown platform: ${platform}`);
    console.log('\nAvailable platforms: flutter, swift, ios, android');
    process.exit(1);
  }

  const command = platformConfig[action];
  if (!command) {
    console.error(`❌ Unknown action: ${action}`);
    console.log('\nAvailable actions: test, build, run, doctor');
    process.exit(1);
  }

  try {
    console.log(`📱 Running ${platform} ${action} for ${app}...`);
    console.log(`📋 Command: ${command}\n`);

    // Navigate to mobile directory if it exists
    const mobileDir = path.join(process.cwd(), 'mobile');
    const workingDir = fs.existsSync(mobileDir) ? mobileDir : process.cwd();

    execSync(command, {
      stdio: 'inherit',
      cwd: workingDir,
      env: {
        ...process.env,
        MOBILE_APP: app,
        MOBILE_PLATFORM: platform,
      },
    });

    console.log(`\n✅ ${platform} ${action} completed successfully`);
  } catch (error) {
    console.error(`\n❌ ${platform} ${action} failed: ${error.message}`);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const platform = args[0];
  const action = args[1];
  const app = args[2] || 'spot';

  if (!platform) {
    console.error('❌ Error: Platform is required');
    console.log('\nUsage: node tools/mobile-mcp.js [platform] [action] [app]');
    console.log('\nPlatforms: flutter, swift, ios, android');
    console.log('Actions: test, build, run, doctor');
    console.log('\nExamples:');
    console.log('  node tools/mobile-mcp.js flutter test');
    console.log('  node tools/mobile-mcp.js flutter build ios');
    console.log('  node tools/mobile-mcp.js android run');
    console.log('  npm run mobile flutter test');
    process.exit(1);
  }

  if (!action) {
    console.error('❌ Error: Action is required');
    console.log('\nActions: test, build, run, doctor');
    process.exit(1);
  }

  runMobile(platform, action, app);
}

module.exports = { runMobile, PLATFORMS };
