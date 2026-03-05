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
/opt/venv/bin/python manage.py collectstatic --noinput --clear

echo "🔥 Starting Gunicorn..."
exec /opt/venv/bin/gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:${PORT:-8080} \
  --workers 1 \
  --threads 1 \
  --worker-class sync \
  --timeout 60 \
  --log-level info \
  --forwarded-allow-ips="*"
