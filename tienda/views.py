from django.shortcuts import render

# Create your views here.
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