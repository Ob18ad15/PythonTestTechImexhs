from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import ImageResult
from .serializers import ImageResultSerializer
import logging

logger = logging.getLogger(__name__)

class ImageResultViewSet(viewsets.ModelViewSet):
    queryset = ImageResult.objects.all()
    serializer_class = ImageResultSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = {
        'created_at': ['gte', 'lte'],
        'updated_at': ['gte', 'lte'],
        'average_before': ['gte', 'lte'],
        'average_after': ['gte', 'lte'],
        'data_size': ['gte', 'lte'],
    }

    def create(self, request, *args, **kwargs):
        logger.info(f"POST payload: {request.data}")

        if not isinstance(request.data, dict):
            return Response({"error": "Payload must be a dictionary of objects."}, status=400)

        created = []
        for key, value in request.data.items():
            # 🧠 Mapeo de campos JSON → modelo
            if "id" in value:
                value["image_result_id"] = value.pop("id")

            if "deviceName" in value:
                value["device_name"] = value.pop("deviceName")

            serializer = self.get_serializer(data=value)
            if serializer.is_valid():
                instance = serializer.save()
                created.append(self.get_serializer(instance).data)
            else:
                logger.error(f"Validation error at key {key}: {serializer.errors}")
                return Response({key: serializer.errors}, status=400)

        return Response(created, status=201)
