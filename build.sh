#!/bin/bash
set -e

echo "🏗️ Starting Unified Monorepo Build..."

# 1. Build Frontend
echo "🎨 Building Frontend..."
cd frontend
npm install
npm run build
cd ..

# 2. Build Backend (handled by Railway, but we ensure static files are ready)
echo "🐍 Preparing Backend..."
# The actual pip install and migration happen in the start command or are handled by nixpacks
echo "✅ Build Complete!"
