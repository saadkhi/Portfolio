from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from django.http import HttpResponse

def health_check(request):
    print("DEBUG: HEALTH CHECK HIT!")
    return HttpResponse("OK")

urlpatterns = [
    path('health/', health_check),
    path('admin/', admin.site.urls),
    path('api/', include('showcase.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
