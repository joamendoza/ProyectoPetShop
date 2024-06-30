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
from django.conf import settings
from django.conf.urls.static import static
from tienda.views import *
from tienda import views


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
    path('bandanas/wildebeest/', wildebeest),

    #Crud------------------------------------------------------------------------------
    #Para ingresar, necesita primero loggearse con las credenciales de admin:admin en el panel de django.
    path('producto/', views.producto_list, name='producto_list'),
    path('producto/<int:pk>/', views.producto_detail, name='producto_detail'),
    path('producto/new/', views.producto_create, name='producto_create'),
    path('producto/<int:pk>/edit/', views.producto_update, name='producto_update'),
    path('producto/<int:pk>/delete/', views.producto_delete, name='producto_delete'),


    path('api/productos_populares/', views.obtener_productos_populares, name='productos_populares'),

    path('api/productos_bandana/', views.obtener_productos_bandana, name='productos_bandana'),
    path('api/productos_bandana_theblackdog/', views.obtener_productos_bandana_theblackdog, name='productos_bandana_theblackdog'),
    path('api/productos_bandana_maxandmolly/', views.obtener_productos_bandana_maxandmolly, name='productos_bandana_maxandmolly'),
    path('api/productos_bandana_wildebeest/', views.obtener_productos_bandana_wildebeest, name='productos_bandana_wildebeest'),

    path('api/productos_correa/', views.obtener_productos_correa, name='productos_correa'),
    path('api/productos_correa_maxandmolly/', views.obtener_productos_correa_maxandmolly, name='productos_correa_maxandmolly'),
    path('api/productos_correa_wilderdog/', views.obtener_productos_correa_wilderdog, name='productos_correa_wilderdog')
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)