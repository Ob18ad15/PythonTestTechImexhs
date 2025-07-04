from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ImageResultViewSet

router = DefaultRouter()
router.register(r'elements', ImageResultViewSet, basename='image-result')

urlpatterns = [
    path('api/', include(router.urls)),
]
