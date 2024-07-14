from django import forms
from django.utils.safestring import mark_safe
from .models import Producto, UserProfile
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm
from django.contrib.auth.models import User


class CustomClearableFileInput(forms.ClearableFileInput):
    template_name = 'custom_clearable_file_input.html'

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['nombre', 'tipo_producto', 'marca', 'precio', 'producto_popular', 'foto']
        widgets = {
            'foto': CustomClearableFileInput
        }

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField()
    profile_picture = forms.ImageField(required=False)  # Campo para la imagen de perfil

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2', 'profile_picture']

class CustomAuthenticationForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Username'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password'}))

class CambiarFotoForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['profile_image']
        labels = {'profile_image': 'Selecciona una nueva foto de perfil'}

class CambiarContrasenaForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['old_password'].label = 'Contraseña actual'
        self.fields['new_password1'].label = 'Nueva contraseña'
        self.fields['new_password2'].label = 'Confirmar nueva contraseña'

class CambiarEmailForm(forms.Form):
    nuevo_email = forms.EmailField(label='Nuevo correo electrónico', max_length=254)