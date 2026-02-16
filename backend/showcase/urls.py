from django.urls import path
from . import views, api

urlpatterns = [
    path('', views.index, name='index'),
    path('api/portfolio/', api.get_portfolio_data, name='api_portfolio'),
]
