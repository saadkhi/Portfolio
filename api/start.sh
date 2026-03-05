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

echo "Environment Check:"
echo "PORT: $PORT"
echo "PYTHON_PATH: $(which python)"
echo "Current directory: $(pwd)"

echo "📦 Preparing environment..."
mkdir -p staticfiles media
/opt/venv/bin/python manage.py migrate --noinput
/opt/venv/bin/python manage.py collectstatic --noinput

echo "🔥 Starting Gunicorn..."
exec /opt/venv/bin/gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers 2 \
  --worker-class sync \
  --preload \
  --timeout 120 \
  --log-level debug \
  --access-logfile - \
  --error-logfile - \
  --forwarded-allow-ips="*"
