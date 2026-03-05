from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def health_check(request):
    return HttpResponse("OK")

from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('health/', health_check),
    path('admin/', admin.site.urls),
    path('api/', include('showcase.urls')),
    # SPA Fallback: Serve index.html for any other route
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
else:
    # In production, WhiteNoise handles static files, 
    # but we still want to handle media if not using S3
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
