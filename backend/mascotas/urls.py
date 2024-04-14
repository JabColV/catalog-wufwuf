from django.urls import path
from .views import mascota_list, create_pet

urlpatterns = [
    path('mascotas/', mascota_list, name='mascota_list'),
    path('mascotas/crear/', create_pet, name='create_pet'),
]

