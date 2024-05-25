from .serializers import MascotaSerializer
from .models import Mascota
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
import json

@api_view(['GET'])
def mascota_list(request):
    mascotas = Mascota.objects.all()
    serializer = MascotaSerializer(mascotas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_pet(request):
    # Convertir el cuerpo de la solicitud en un objeto Python
    request_data = json.loads(request.body)   
    # Crear una instancia del serializador con los datos modificados
    serializer = MascotaSerializer(data=request_data)
    # Verificar si los datos son válidos
    if serializer.is_valid():
        # Guardar los datos en la base de datos
        serializer.save()
        return JsonResponse({'message': 'Datos y Archivos guardados exitosamente'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_pet(request, pk):
    try:
        mascota = Mascota.objects.get(pk=pk)
    except Mascota.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = MascotaSerializer(mascota)
    return Response(serializer.data)