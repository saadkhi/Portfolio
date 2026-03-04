#!/bin/bash
set -e

echo "🚀 Starting Railway Deployment Script..."

# 1. Run Migrations
echo "📦 Running Migrations..."
python3 manage.py migrate --noinput

# 2. Collect Static Files
# We do this here to ensure all Django static files are ready
echo "📁 Collecting Static Files..."
python3 manage.py collectstatic --noinput

# 3. Start Gunicorn
# Bind to the port provided by Railway ($PORT)
echo "🔥 Starting Gunicorn..."
gunicorn portfolio_core.wsgi:application --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 60
