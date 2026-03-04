#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# The repository root is at /app
cd /app/api

echo "Environment Check:"
echo "PORT: $PORT"
echo "PYTHON_PATH: $(which python)"
echo "Current directory: $(pwd)"

echo "Checking for frontend_dist..."
if [ -d "frontend_dist" ]; then
    echo "✅ frontend_dist found."
    ls -la frontend_dist
    if [ -f "frontend_dist/index.html" ]; then
        echo "✅ index.html found."
    else
        echo "❌ index.html NOT found in frontend_dist!"
    fi
else
    echo "❌ frontend_dist NOT found!"
fi

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
