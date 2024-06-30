from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import user_passes_test
from django.http import JsonResponse
from .models import Producto
from .forms import ProductoForm


# Create your views here.

# html
def index(request):
    return render(request, 'index.html')

def correas(request):
    return render(request, 'correas.html')

def carrito(request):
    return render(request, 'carrito.html')

def bandanas(request):
    return render(request, 'bandanas.html')

def max_and_molly(request):
    return render(request, 'max&molly.html')

def max_and_molly2(request):
    return render(request, 'max&molly2.html')

def participa(request):
    return render(request, 'participa.html')

def the_black_dog(request):
    return render(request, 'theblackdog.html')

def ubicacion(request):
    return render(request, 'ubicacion.html')

def wildebeest(request):
    return render(request, 'wildebeest.html')

def wilderdog(request):
    return render(request, 'wilderdog.html')

# CRUD
def superusuario_requerido(user):
    return user.is_superuser

@user_passes_test(superusuario_requerido, login_url='index')
def producto_list(request):
    productos = Producto.objects.all()
    return render(request, 'producto_list.html', {'productos': productos})

@user_passes_test(superusuario_requerido, login_url='index')
def producto_detail(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    return render(request, 'producto_detail.html', {'producto': producto})

@user_passes_test(superusuario_requerido, login_url='index')
def producto_create(request):
    if request.method == "POST":
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            producto = form.save()
            return redirect('producto_detail', pk=producto.pk)
    else:
        form = ProductoForm()
    return render(request, 'producto_form.html', {'form': form})

@user_passes_test(superusuario_requerido, login_url='index')
def producto_update(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == "POST":
        form = ProductoForm(request.POST, request.FILES, instance=producto)
        if form.is_valid():
            producto = form.save()
            return redirect('producto_detail', pk=producto.pk)
    else:
        form = ProductoForm(instance=producto)
    return render(request, 'producto_form.html', {'form': form})

@user_passes_test(superusuario_requerido, login_url='index')
def producto_delete(request, pk):
    producto = get_object_or_404(Producto, pk=pk)
    if request.method == "POST":
        producto.delete()
        return redirect('producto_list')
    return render(request, 'producto_confirm_delete.html', {'producto': producto})

# ajax
def obtener_productos_populares(request):
    productos_populares = Producto.objects.filter(producto_popular=True).values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_populares)
    return JsonResponse(productos_list, safe=False)


def obtener_productos_bandana(request):
    productos_bandana = Producto.objects.filter(tipo_producto='bandana').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_bandana)
    return JsonResponse(productos_list, safe=False)

def obtener_productos_bandana_theblackdog(request):
    productos_bandana = Producto.objects.filter(tipo_producto='bandana', marca='the_black_dog').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_bandana)
    return JsonResponse(productos_list, safe=False)

def obtener_productos_bandana_maxandmolly(request):
    productos_bandana = Producto.objects.filter(tipo_producto='bandana', marca='max_and_molly').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_bandana)
    return JsonResponse(productos_list, safe=False)

def obtener_productos_bandana_wildebeest(request):
    productos_bandana = Producto.objects.filter(tipo_producto='bandana', marca='wildebeest').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_bandana)
    return JsonResponse(productos_list, safe=False)


def obtener_productos_correa(request):
    productos_correa = Producto.objects.filter(tipo_producto='correa').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_correa)
    return JsonResponse(productos_list, safe=False)

def obtener_productos_correa_maxandmolly(request):
    productos_correa = Producto.objects.filter(tipo_producto='correa', marca='max_and_molly').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_correa)
    return JsonResponse(productos_list, safe=False)

def obtener_productos_correa_wilderdog(request):
    productos_correa = Producto.objects.filter(tipo_producto='correa', marca='wilderdog').values('id', 'nombre', 'precio', 'foto')
    productos_list = list(productos_correa)
    return JsonResponse(productos_list, safe=False)