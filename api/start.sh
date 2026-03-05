#!/bin/bash
set -e

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building React app..."
npm run build
cd ..

echo "Running database migrations..."
python3 manage.py migrate --noinput

echo "Collecting static files..."
python3 manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn portfolio_core.wsgi:application \
  --bind 0.0.0.0:$PORT \
  --workers 1 \
  --threads 2 \
  --timeout 60
