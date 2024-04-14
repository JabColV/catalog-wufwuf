from rest_framework import serializers
from .models import Mascota

class MascotaSerializer(serializers.ModelSerializer):
    imagen_url = serializers.URLField()

    class Meta:
        model = Mascota
        fields = ['nombre', 'descripcion', 'imagen_url', 'fecha_creacion']

    def create(self, validated_data):
        return Mascota.objects.create(**validated_data)
