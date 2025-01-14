from django.urls import path
from .views import receta

urlpatterns = [
    path('api/recibir_mensaje/', receta, name='recibir_mensaje'),
]