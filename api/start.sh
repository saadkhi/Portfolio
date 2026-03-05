#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# Ensure we are in the api directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$DIR"

echo "Environment Check:"
echo "PORT: $PORT"
echo "PYTHON_PATH: $(which python)"
echo "Current directory: $(pwd)"

echo "Checking for frontend_dist..."
if [ -d "frontend_dist" ]; then
    echo "✅ frontend_dist found."
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

echo "🔥 Starting Gunicorn..."
exec /opt/venv/bin/gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:${PORT:-8080} \
  --workers 2 \
  --worker-class sync \
  --preload \
  --timeout 120 \
  --log-level debug \
  --access-logfile - \
  --error-logfile - \
  --forwarded-allow-ips="*"
