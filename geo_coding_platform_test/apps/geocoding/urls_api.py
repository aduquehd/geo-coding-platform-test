# Django
from django.conf import settings
from django.urls import include, path

# Importing Django rest libraries.
from rest_framework.routers import DefaultRouter, SimpleRouter

# Views
from geo_coding_platform_test.apps.geocoding.api.views import GeoCodingViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("", GeoCodingViewSet, basename='geocoding')

urlpatterns = [
    path('', include(router.urls))
]
