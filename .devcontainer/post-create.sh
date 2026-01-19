#!/bin/bash

echo "🚀 Setting up EmPulse Music development environment..."

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# Verify Node.js version
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Check if Terraform is installed
if command -v terraform &> /dev/null; then
    echo "✅ Terraform version: $(terraform --version | head -n 1)"
    echo "🔧 Initializing Terraform (if terraform directory exists)..."
    if [ -d "terraform" ]; then
        cd terraform
        terraform init -upgrade || echo "⚠️  Terraform init skipped (no backend configured)"
        terraform validate || echo "⚠️  Terraform validation skipped (no tfvars)"
        cd ..
    fi
else
    echo "⚠️  Terraform not found"
fi

# Set up git hooks (if needed)
# echo "🔧 Setting up git hooks..."

# Build the project to verify everything works
echo "🔨 Building project..."
npm run build

echo "✅ Development environment setup complete!"
echo "🌐 Your Next.js app will be available at http://localhost:3001"
echo "💡 Run 'npm run dev' to start the development server"
