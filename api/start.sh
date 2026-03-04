#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# Check current directory
echo "Current directory: $(pwd)"
ls -la

# The repository root is at /app
cd /app/api

echo "Environment Check:"
echo "PORT: $PORT"
echo "PYTHON_PATH: $(which python)"

echo "📦 Running Migrations..."
/opt/venv/bin/python manage.py migrate --noinput

echo "📁 Collecting Static Files..."
/opt/venv/bin/python manage.py collectstatic --noinput

echo "🔥 Starting Gunicorn..."
/opt/venv/bin/gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers 2 \
  --threads 4 \
  --timeout 60
