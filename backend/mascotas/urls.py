from django.urls import path
from .views import mascota_list, create_pet, get_pet, update_pet,filter_pet_by_age,toggle_adoption

urlpatterns = [
    path('mascotas/', mascota_list, name='mascota_list'),
    path('mascotas/crear/', create_pet, name='create_pet'),
    path('mascotas/<int:pk>/', get_pet, name='get_pet'),
    path('mascotas/<int:pk>/actualizar/', update_pet, name='update_pet'),
    path('mascotas/filtrar/', filter_pet_by_age, name='filter_pet_by_age'),
    path('mascotas/<int:pk>/toggle_adoption/', toggle_adoption, name='toggle_adoption')
]

