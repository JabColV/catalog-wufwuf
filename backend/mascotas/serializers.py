from rest_framework import serializers
from .models import Mascota

class MascotaSerializer(serializers.ModelSerializer):
    urls_images = serializers.ListField(
        child=serializers.URLField(),
        allow_empty=True
    )

    class Meta:
        model = Mascota
        fields = '__all__'

    def create(self, validated_data):
        return Mascota.objects.create(**validated_data)


