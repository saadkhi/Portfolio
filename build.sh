#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo "Build completed"