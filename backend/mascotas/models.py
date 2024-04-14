from django.db import models

class Mascota(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    imagen_url = models.URLField(blank=True)  # Campo para almacenar la URL de la imagen
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
