#!/usr/bin/env node
// tools/mobile-mcp.js – Mobile Testing MCP Tool (Flutter/Swift/Xcode)
// Test mobile apps via MCP
const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

/**
 * Mobile MCP Tool
 * Test mobile apps (Flutter/Swift/Xcode)
 * 
 * @param {string} platform - Platform: 'flutter' | 'swift' | 'ios' | 'android'
 * @param {string} action - Action: 'test' | 'build' | 'run' | 'doctor'
 * @param {string} app - App name or path
 */
async function mobileMCP(platform, action = 'test', app = '') {
  const tools = {
    flutter: async () => {
      try {
        // Check if Flutter is installed
        try {
          execSync('flutter --version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Flutter not installed. Install: https://flutter.dev/docs/get-started/install');
        }

        console.log(`📱 Running Flutter ${action}...`);

        switch (action) {
          case 'test':
            execSync('flutter test', {
              stdio: 'inherit',
              cwd: app || process.cwd()
            });
            return 'Flutter tests passed';

          case 'build':
            const target = app || 'apk';
            execSync(`flutter build ${target}`, {
              stdio: 'inherit',
              cwd: process.cwd()
            });
            return `Flutter ${target} build complete`;

          case 'run':
            execSync('flutter run', {
              stdio: 'inherit',
              cwd: app || process.cwd()
            });
            return 'Flutter app running';

          case 'doctor':
            execSync('flutter doctor -v', {
              stdio: 'inherit'
            });
            return 'Flutter environment check complete';

          default:
            throw new Error(`Unknown Flutter action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Flutter operation failed: ${error.message}`);
      }
    },

    swift: async () => {
      try {
        console.log(`🍎 Running Swift/Xcode ${action}...`);

        // Check if xcodebuild is available
        try {
          execSync('xcodebuild -version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Xcode not installed. Install from App Store');
        }

        const projectPath = app || join(process.cwd(), 'ios');
        
        switch (action) {
          case 'test':
            execSync('xcodebuild test -scheme Runner -destination "platform=iOS Simulator,name=iPhone 15"', {
              stdio: 'inherit',
              cwd: projectPath
            });
            return 'iOS tests passed';

          case 'build':
            execSync('xcodebuild build -scheme Runner -configuration Release', {
              stdio: 'inherit',
              cwd: projectPath
            });
            return 'iOS build complete';

          case 'run':
            execSync('xcodebuild run -scheme Runner', {
              stdio: 'inherit',
              cwd: projectPath
            });
            return 'iOS app running';

          default:
            throw new Error(`Unknown Swift/Xcode action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Swift/Xcode operation failed: ${error.message}`);
      }
    },

    ios: async () => {
      return await tools.swift();
    },

    android: async () => {
      try {
        console.log(`🤖 Running Android ${action}...`);

        // Check if ADB is available
        try {
          execSync('adb version', { stdio: 'ignore' });
        } catch (e) {
          throw new Error('Android SDK/ADB not installed. Install Android Studio');
        }

        switch (action) {
          case 'test':
            execSync('./gradlew test', {
              stdio: 'inherit',
              cwd: app || join(process.cwd(), 'android')
            });
            return 'Android tests passed';

          case 'build':
            execSync('./gradlew assembleRelease', {
              stdio: 'inherit',
              cwd: app || join(process.cwd(), 'android')
            });
            return 'Android build complete';

          case 'run':
            execSync('adb install app-release.apk && adb shell am start -n com.empulse.music/.MainActivity', {
              stdio: 'inherit'
            });
            return 'Android app running';

          default:
            throw new Error(`Unknown Android action: ${action}`);
        }
      } catch (error) {
        throw new Error(`Android operation failed: ${error.message}`);
      }
    }
  };

  // Normalize platform name
  const normalizedPlatform = platform.toLowerCase();
  
  if (!tools[normalizedPlatform]) {
    throw new Error(`Unsupported platform: ${platform}. Use 'flutter', 'swift', 'ios', or 'android'`);
  }

  const result = await tools[normalizedPlatform]();
  console.log(`✅ ${result}`);

  return JSON.stringify({
    status: 'success',
    platform: normalizedPlatform,
    action,
    app,
    result,
    timestamp: new Date().toISOString()
  });
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: tools/mobile-mcp.js <platform> [action] [app]');
    console.error('  platform: flutter | swift | ios | android');
    console.error('  action:   test | build | run | doctor (default: test)');
    console.error('  app:      App name or path (optional)');
    process.exit(1);
  }

  const [platform, action = 'test', app = ''] = args;

  mobileMCP(platform, action, app)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => {
      console.error(`❌ ${error.message}`);
      process.exit(1);
    });
}

module.exports = mobileMCP;
