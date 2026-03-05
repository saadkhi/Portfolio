"""
WSGI config for portfolio_core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

print("DEBUG: wsgi.py starting...")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_core.settings')

print("DEBUG: Fetching WSGI application...")
application = get_wsgi_application()
app = application
print("DEBUG: WSGI application loaded.")
