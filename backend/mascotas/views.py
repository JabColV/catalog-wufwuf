from .serializers import MascotaSerializer
from .models import Mascota
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import status
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse


@api_view(['GET'])
def mascota_list(request):
    #Obtener los parametros de consulta
    especie= request.GET.get('especie')
    breed = request.GET.get('breed')
    # Filtrar las mascotas según los parámetros de consulta	
    mascotas = Mascota.objects.all()
    
    if especie:
        mascotas = mascotas.filter(especie=especie)
    if breed:
        mascotas = mascotas.filter(breed=breed)


    serializer = MascotaSerializer(mascotas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_pet(request):
    if request.method == 'POST': 
        # Lista para almacenar los nombres de los archivos guardados
        uploaded_file_names = []
        # Lista para almacenar las URLs de los archivos guardados
        urls_images = [] 
        # Verificar si hay archivos adjuntos
        if request.FILES:
            # Iterar sobre los archivos adjuntos
            for key, uploaded_file in request.FILES.items():
                # Ubicación donde se guardará el archivo
                fs = FileSystemStorage(location='./mascotas/static/')
                # nombre del archivo
                filename = fs.save(uploaded_file.name, uploaded_file)
                # Añadir el nombre del archivo a la lista de nombres de archivos guardados
                uploaded_file_names.append(filename)
                # Ruta del archivo guardado
                saved_file_path = fs.url(filename)
        # Verificar si se enviaron datos simples en el request        
        if request.POST:
            # Convertir los datos simples a un diccionario
            modified_data = request.POST.dict()
            # iterar sobre los nombres de los archivos guardados
            for file in uploaded_file_names:
                # Construir la URL para el archivo guardado
                file_url = f'http://127.0.0.1:8000/static/{file}'
                # Añadir la URL a la lista de URLs de archivos guardados
                urls_images.append(file_url)
            # Añadir la lista de URLs de archivos guardados al diccionario de datos
            modified_data['urls_images'] = urls_images
            # Crear una instancia del serializador con los datos modificados
            serializer = MascotaSerializer(data=modified_data)
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