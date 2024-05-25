from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone

class Mascota(models.Model):
    name = models.CharField(max_length=100,  default='Sin nombre')
    birth_date = models.DateField(default=timezone.now)
    especie = models.CharField(max_length=100, default='Desconocida')
    breed = models.CharField(max_length=100, default='Desconocido')
    urls_images = ArrayField(
        models.URLField(blank=True),  # Tipo de datos URL
        blank=True,  # Permite que el campo esté vacío
        default=list  # Valor predeterminado es una lista vacía
    ) # Campo para almacenar varias URLs de imagenes
    description = models.TextField(default='Sin descripción')
    creation_date = models.DateTimeField(auto_now_add=True)
    adopted = models.BooleanField(default=False) #Campo para indicar si la mascota esta adoptada

    def __str__(self):
        return self.name

