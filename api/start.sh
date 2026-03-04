#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# Change to the api directory where manage.py is located
cd "$(dirname "$0")"

# 1. Run Migrations
echo "📦 Running Migrations..."
python manage.py migrate --noinput

# 2. Collect Static Files
echo "📁 Collecting Static Files..."
python manage.py collectstatic --noinput

# 3. Start Gunicorn
echo "🔥 Starting Gunicorn..."
gunicorn portfolio_core.wsgi:application --bind 0.0.0.0:${PORT:-8000} --workers 2 --threads 4 --timeout 60

