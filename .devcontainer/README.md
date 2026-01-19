# Development Container Configuration

This directory contains the configuration for GitHub Codespaces and VS Code Dev Containers.

## What This Provides

- **Pre-configured environment**: Node.js 20, npm, Terraform, and all tools ready to go
- **Auto-installed extensions**: ESLint, Prettier, Tailwind, Terraform, Vim, and more
- **Port forwarding**: Automatic forwarding of ports 3001, 3000, and 5173
- **Auto-setup**: Runs `npm install` and builds the project on first start

## Files

- `devcontainer.json` - Main configuration file
- `Dockerfile` - Custom container image with additional tools
- `post-create.sh` - Setup script that runs after container creation

## Quick Start

1. Open in GitHub Codespaces (via GitHub web UI)
2. Or open in VS Code with Dev Containers extension
3. Wait ~2-3 minutes for initial setup
4. Run `npm run dev` to start the development server

## Customization

Edit `devcontainer.json` to:
- Add more VS Code extensions
- Change port forwarding
- Modify environment variables
- Add additional tools

Edit `post-create.sh` to:
- Add custom setup commands
- Install additional dependencies
- Configure tools
