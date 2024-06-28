"""
URL configuration for PetShop project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from tienda.views import *

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', index, name='index'),
    path('index/', index),
    path('carrito/', carrito),
    path('participa/', participa),
    path('ubicacion/', ubicacion),

    path('correas/', correas),
    path('correas/max-and-molly/', max_and_molly2),
    path('correas/wilderdog/', wilderdog),

    path('bandanas/', bandanas),
    path('bandanas/max-and-molly/', max_and_molly),
    path('bandanas/the-black-dog/', the_black_dog),
    path('bandanas/wildebeest/', wildebeest)
]
