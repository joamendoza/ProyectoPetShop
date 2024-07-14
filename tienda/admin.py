from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile, Purchase, Producto, PurchaseProduct
from django.contrib.auth.models import User

class CustomUserAdmin(UserAdmin):
    pass  # Puedes personalizar el admin de User si lo necesitas

admin.site.unregister(User)  # Desregistras el UserAdmin por defecto
admin.site.register(User, CustomUserAdmin)  # Registras tu UserAdmin personalizado
admin.site.register(UserProfile)  # Registras el UserProfile si deseas administrarlo
admin.site.register(Purchase)
admin.site.register(Producto)
admin.site.register(PurchaseProduct)