#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# Ensure we are in the api directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Running migrations..."
python3 manage.py migrate --noinput

echo "Collecting static files..."
python3 manage.py collectstatic --noinput --clear

echo "🔥 Starting Gunicorn..."
gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:${PORT:-8080} \
  --workers 1 \
  --threads 1 \
  --worker-class sync \
  --timeout 60 \
  --log-level info \
  --forwarded-allow-ips="*"
