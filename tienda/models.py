from django.db import models

# Create your models here.
class Producto(models.Model):
    TIPOS_PRODUCTOS = [
        ('bandana', 'Bandana'),
        ('correa', 'Correa')
    ]
    MARCAS = [
        ('max_and_molly', 'Max & Molly'),
        ('the_black_dog', 'The Black Dog'),
        ('wildebeest', 'Wildebeest'),
        ('wilderdog', 'Wilderdog')
    ]
        
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    tipo_producto = models.CharField(max_length=20, choices=TIPOS_PRODUCTOS, default='bandana')
    marca = models.CharField(max_length=20, choices=MARCAS, default='max_and_molly')
    precio = models.IntegerField()
    producto_popular = models.BooleanField(default=False)
    foto = models.ImageField(upload_to='productos/')

    def __str__(self):
        return f"Producto {self.id} | {self.tipo_producto} {self.marca}: {self.nombre} | Popular: {self.producto_popular}"

# Pequeña adición que corrige el plural de Django al generar la tabla
class Meta:
    verbose_name_plural = "Productos"