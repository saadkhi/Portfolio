#!/bin/bash
set -e
echo "🚀 Starting Railway Deployment..."

cd /app/api

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
