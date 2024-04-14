from .serializers import MascotaSerializer
from .models import Mascota
from rest_framework.response import Response
from rest_framework.decorators import api_view 
from rest_framework import status

# Create your views here.


@api_view(['GET'])
def mascota_list(request):
    mascotas = Mascota.objects.all()
    serializer = MascotaSerializer(mascotas, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_pet(request):
    if request.method == 'POST': 
        serializer = MascotaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)