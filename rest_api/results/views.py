from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import  ImageResult
from django.db import IntegrityError

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
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if not queryset.exists():
            return Response(
                {"detail": "No hay registros que coincidan con los filtros proporcionados."},
                status=200
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            instance.delete()
            return Response({"detail": "El registro fue eliminado exitosamente."}, status=204)
        except Exception:
            return Response({"detail": "No se pudo eliminar el registro. ID no válido."}, status=404)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Actualizar image_result_id
        new_result_id = request.data.get("id")
        if new_result_id:
            instance.image_result_id = new_result_id

        # Actualizar nombre del dispositivo
        new_device_name = request.data.get("device_name")
        if new_device_name:
            try:
                instance.device.name = new_device_name
                instance.device.save()
            except IntegrityError:
                return Response(
                    {"detail": (
                        f"No se pudo actualizar el nombre del dispositivo a '{new_device_name}' "
                        "porque ya existe otro dispositivo registrado con ese nombre. "
                        "Por favor, elige un nombre único."
                    )
},
                    status=400
                )

        instance.save()
        return Response({"detail": "Actualización realizada con éxito."}, status=200)