from django.shortcuts import render
from django.http import JsonResponse
from .models import Producto

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