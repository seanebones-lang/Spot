#!/bin/bash

# Infrastructure Setup Script for RAG System
# This script helps set up Pinecone, Neo4j, and FAISS infrastructure

set -e

echo "🚀 Setting up RAG System Infrastructure..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📋 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Please edit .env.local with your actual credentials"
    echo ""
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js 18+ recommended (found v$NODE_VERSION)"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
echo "📁 Creating data directories..."
mkdir -p data/faiss
mkdir -p logs

# Check Pinecone setup (if configured)
if grep -q "PINECONE_API_KEY=your_pinecone_api_key_here" .env.local 2>/dev/null; then
    echo ""
    echo "⚠️  Pinecone not configured. To set up:"
    echo "   1. Sign up at https://www.pinecone.io/"
    echo "   2. Create an index named 'empulse-music-moods' with dimension 27"
    echo "   3. Add your API key to .env.local"
    echo ""
else
    echo "✅ Pinecone configuration found in .env.local"
fi

# Check Neo4j setup (if configured)
if grep -q "NEO4J_PASSWORD=your_neo4j_password_here" .env.local 2>/dev/null; then
    echo ""
    echo "⚠️  Neo4j not configured. To set up:"
    echo "   Option 1: Neo4j Desktop (Local)"
    echo "   1. Download from https://neo4j.com/download/"
    echo "   2. Create a new database"
    echo "   3. Update .env.local with connection details"
    echo ""
    echo "   Option 2: Neo4j AuraDB (Cloud)"
    echo "   1. Sign up at https://neo4j.com/cloud/aura/"
    echo "   2. Create a free database"
    echo "   3. Update .env.local with connection URI and credentials"
    echo ""
else
    echo "✅ Neo4j configuration found in .env.local"
fi

# Run database initialization tests
echo ""
echo "🧪 Running infrastructure tests..."
npm run test:infrastructure || echo "⚠️  Infrastructure tests not found. Run 'npm run test' after setup."

echo ""
echo "✅ Infrastructure setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit .env.local with your actual credentials"
echo "  2. Run 'npm run setup:databases' to initialize databases"
echo "  3. Run 'npm run test' to verify everything works"