# Generated by Django 5.0.4 on 2024-04-21 22:47

import django.contrib.postgres.fields
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mascota',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Sin nombre', max_length=100)),
                ('birth_date', models.DateField(default=django.utils.timezone.now)),
                ('especie', models.CharField(default='Desconocida', max_length=100)),
                ('breed', models.CharField(default='Desconocido', max_length=100)),
                ('urls_images', django.contrib.postgres.fields.ArrayField(base_field=models.URLField(blank=True), blank=True, default=list, size=None)),
                ('description', models.TextField(default='Sin descripción')),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
