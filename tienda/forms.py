from django import forms
from django.utils.safestring import mark_safe
from .models import Producto

class CustomClearableFileInput(forms.ClearableFileInput):
    template_name = 'custom_clearable_file_input.html'

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'tipo_producto', 'marca', 'precio', 'producto_popular', 'foto']
        widgets = {
            'foto': CustomClearableFileInput
        }
