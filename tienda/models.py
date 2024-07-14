from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)

    def __str__(self):
        return self.user.username

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
        popularidad = "✔" if self.producto_popular else "❌"
        return f"Producto {self.id} | {self.get_tipo_producto_display()} {self.get_marca_display()}: {self.nombre} | Popular: {popularidad}"

    class Meta:
        verbose_name_plural = "Productos"

class PurchaseProduct(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    purchase = models.ForeignKey('Purchase', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        self.total_price = self.producto.precio * self.cantidad
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.producto.nombre} - Cantidad: {self.cantidad} - Total: {self.total_price}"

class Purchase(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='purchases')
    productos = models.ManyToManyField(Producto, through='PurchaseProduct')
    purchase_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  # Añadimos el precio total

    def __str__(self):
        return f"Compra {self.id} - Usuario: {self.user_profile.user.username} - Fecha: {self.purchase_date} - Total: ${self.total_price}"