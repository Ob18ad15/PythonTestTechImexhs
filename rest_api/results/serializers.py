from rest_framework import serializers
from .models import ImageResult, Device
import numpy as np

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name']


class ImageResultSerializer(serializers.ModelSerializer):
    device_name = serializers.CharField(write_only=True)
    

    class Meta:
        model = ImageResult
        fields = [
            'image_result_id',      # el campo en el modelo
            'device_name',
            'device',
            'data',
            'data_size',
            'average_before',
            'average_after',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'device',
            'data_size',
            'average_before',
            'average_after',
            'created_at',
            'updated_at',
        ]

    def validate_data(self, value):
        try:
            flat = [int(n) for row in value for n in row.strip().split()]
        except ValueError:
            raise serializers.ValidationError("Todos los números en 'data' deben ser válidos.")
        return value

    def create(self, validated_data):
        raw_data = validated_data.pop("data")
        device_name = validated_data.pop("device_name")
        image_id = validated_data["image_result_id"]


        # Dispositivo: crear o reutilizar
        device, _ = Device.objects.get_or_create(name=device_name)

        flat = [int(n) for row in raw_data for n in row.strip().split()]
        max_val = max(flat) if flat else 1
        norm = [round(n / max_val, 5) for n in flat]

        avg_before = round(sum(flat) / len(flat), 3) if flat else 0.0
        avg_after = round(sum(norm) / len(norm), 3)

        result = ImageResult.objects.create(
            data=raw_data,
            data_size=len(flat),
            average_before=avg_before,
            average_after=avg_after,
            device=device,
            image_result_id=image_id,         # 👈 aquí se asigna correctamente
        )

        return result