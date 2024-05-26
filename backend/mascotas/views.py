from .serializers import MascotaSerializer
from .models import Mascota
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
import json
from datetime import date

#Change the adopted status of a pet
@api_view(['PATCH'])
def toggle_adoption(request, pk):
    try:
        # Get the pet from the database
        mascota = Mascota.objects.get(pk=pk)
    except Mascota.DoesNotExist:
        return Response({'error': 'Mascota no encontrada'}, status=status.HTTP_404_NOT_FOUND)
    # Change the adopted status of the pet
    mascota.adopted = not mascota.adopted
    # Save the changes in the database
    mascota.save()
    return Response({'id': mascota.id, 'name':mascota.name, 'adopted': mascota.adopted}, status=status.HTTP_200_OK)

# Calculate the age of the pet in years
def calculate_age(birth_date):
    today = date.today()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    return age
@api_view(['POST'])
def filter_pet_by_age(request):

    # Extraer datos del cuerpo de la solicitud JSON
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
    
    age_min = data.get('age_min')
    age_max = data.get('age_max')

    # Filtrar las mascotas que no han sido adoptadas
    mascotas = Mascota.objects.filter(adopted=False)
    mascotas_filtradas = []

    for mascota in mascotas:
        # Calcular la edad de la mascota en años
        pet_age = calculate_age(mascota.birth_date)


        # Verificar si la mascota está en el rango de edad especificado
        if (age_min is None or int(age_min) <= pet_age) and (age_max is None or int(age_max) >= pet_age):
            # Agregar la mascota a la lista filtrada
            mascotas_filtradas.append(mascota)

    # Serializar la lista de mascotas filtradas
    serializer = MascotaSerializer(mascotas_filtradas, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def mascota_list_admin(request):
    # Extraer datos del cuerpo de la solicitud JSON
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
    
    especie = data.get('especie')
    breed = data.get('breed')

    # Filtrar todas las mascotas
    mascotas = Mascota.objects.all()

    if especie:
        mascotas = mascotas.filter(especie=especie)
    if breed:
        mascotas = mascotas.filter(breed=breed)

    serializer = MascotaSerializer(mascotas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def mascota_list(request):
    # Extraer datos del cuerpo de la solicitud JSON
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
    
    especie = data.get('especie')
    breed = data.get('breed')

    # Filtrar las mascotas que no han sido adoptadas
    mascotas = Mascota.objects.filter(adopted=False)

    if especie:
        mascotas = mascotas.filter(especie=especie)
    if breed:
        mascotas = mascotas.filter(breed=breed)

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

@api_view(['PUT'])
def update_pet(request, pk):
    try:
        mascota = Mascota.objects.get(pk=pk)
    except Mascota.DoesNotExist:
        return Response({'error': 'Mascota no encontrada'}, status=status.HTTP_404_NOT_FOUND)

    # Convertir el cuerpo de la solicitud en un objeto Python
    request_data = json.loads(request.body)
    # Crear una instancia del serializador con la mascota existente y los datos modificados
    serializer = MascotaSerializer(mascota, data=request_data, partial=True)  # partial=True permite actualizar solo algunos campos

    # Verificar si los datos son válidos
    if serializer.is_valid():
        # Guardar los datos actualizados en la base de datos
        serializer.save()
        return JsonResponse({'message': 'Mascota actualizada exitosamente'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)