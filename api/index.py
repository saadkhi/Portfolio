import os
import sys

# Add the current directory (api/) to sys.path so Django can find settings and apps
# In Vercel, the current working directory for the function is the directory containing the file.
current_dir = os.path.dirname(__file__)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_core.settings')

from django.core.wsgi import get_wsgi_application

# Vercel's @vercel/python builder looks for 'app' or 'handler' by default.
# For Django, we use the WSGI application.
app = get_wsgi_application()
