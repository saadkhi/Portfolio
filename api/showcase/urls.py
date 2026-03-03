from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from . import views, api

router = DefaultRouter()
router.register(r'projects', api.ProjectViewSet)

urlpatterns = [
    path('api/portfolio/', api.get_portfolio_data, name='api_portfolio'),
    path('api/contact/', views.contact_form_submission, name='contact_api'),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
