# GitHub Codespaces Setup

## Overview

GitHub Codespaces provides a cloud-based development environment for your EmPulse Music project. This allows you to:
- Develop from anywhere with just a browser
- Share consistent development environments with your team
- Skip local setup - everything is pre-configured
- Access powerful cloud machines for faster builds

## What's Configured

### Development Container (`.devcontainer/`)

**devcontainer.json:**
- Node.js 20 environment
- Port forwarding (3001, 3000, 5173)
- VS Code extensions pre-installed
- Terraform support
- Vim keybindings
- Auto-formatting and linting

**Extensions Included:**
- ESLint & Prettier (code quality)
- Tailwind CSS IntelliSense
- Terraform (Infrastructure as Code)
- Vim (keybindings)
- TypeScript (language support)
- Error Lens (enhanced error display)
- Playwright & Jest (testing)

**Post-Create Setup:**
- Automatically installs npm dependencies
- Builds the project to verify setup
- Configures environment variables

## How to Use

### Option 1: Create Codespace from GitHub

1. **Via GitHub Web:**
   - Go to your repository: https://github.com/seanebones-lang/Spot
   - Click the green "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main" (or your branch)
   - Wait for Codespace to start (~2-3 minutes)

2. **Via GitHub CLI:**
   ```bash
   gh codespace create --repo seanebones-lang/Spot
   ```

### Option 2: Open in VS Code

1. Install [GitHub Codespaces Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.codespaces) in VS Code
2. Command Palette (`Cmd+Shift+P`): `Codespaces: Create New Codespace`
3. Select your repository and branch
4. Choose machine size (Basic Linux 32GB recommended)

### Starting Your App

Once your Codespace is running:

```bash
# Dependencies are already installed (post-create script)
npm run dev

# Or if you need to reinstall:
npm install
npm run dev
```

Your app will be available at:
- **Local URL**: `http://localhost:3001`
- **Public URL**: Automatically forwarded by Codespaces
  - Look for the port notification in VS Code
  - Or check the "Ports" tab in Terminal panel

## Features

### Port Forwarding
- **3001**: Next.js development server (primary)
- **3000**: Alternative port
- **5173**: Vite dev server (if needed)

Ports are automatically forwarded with notifications.

### Pre-installed Tools

- **Node.js 20**: Latest LTS version
- **npm**: Package manager
- **Git**: Version control
- **Terraform**: Infrastructure management
- **Build tools**: gcc, make, python3
- **Editors**: vim, nano

### Environment Variables

Set these in Codespace secrets or `.devcontainer/devcontainer.json`:
- `NODE_ENV=development`
- Add your API keys via Codespace secrets (Settings → Secrets)

## Machine Sizes

The configuration uses **Basic Linux 32GB** which includes:
- 2 vCPUs
- 32 GB RAM
- 32 GB storage

For larger builds, upgrade to:
- **Premium** (4 vCPUs, 8 GB RAM)
- **Premium Plus** (8 vCPUs, 16 GB RAM)

Change in `.codespaces/settings.json` or when creating.

## Cost Considerations

- **Free tier**: 60 hours/month for personal accounts
- **Paid**: ~$0.18/hour for Basic Linux
- Codespaces auto-stop after 30 minutes of inactivity
- Can configure auto-stop time in settings

## Troubleshooting

### Port Not Accessing
1. Check "Ports" tab in Terminal panel
2. Right-click port → "Port Visibility" → "Public"
3. Click the globe icon to open in browser

### Build Fails
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Extensions Not Loading
- Extensions install automatically on first start
- Check Extensions panel if missing
- Reload window: `Cmd+Shift+P` → "Reload Window"

### Out of Space
```bash
# Check disk usage
df -h

# Clean npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## Advantages for This Project

✅ **Consistent Environment**: Everyone uses the same setup  
✅ **No Local Installation**: Skip Node.js, dependencies, etc.  
✅ **Fast Machines**: Cloud hardware is powerful  
✅ **Easy Sharing**: Share Codespace URL for collaboration  
✅ **Pre-configured**: All extensions and settings ready  

## Next Steps

1. **Create your first Codespace** from GitHub
2. **Test the setup** by running `npm run dev`
3. **Customize** `.devcontainer/devcontainer.json` if needed
4. **Add secrets** for API keys in Codespace settings

Your development environment is now cloud-ready! 🚀
