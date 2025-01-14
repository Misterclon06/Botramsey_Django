#from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import bot.src.scraping.scraper as sp

#@api_view(['GET'])
#def api_home(request):
#    return Response({"message": "¡Hola desde Django!", "test": "hfgjasf"})

@csrf_exempt
def receta(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        mensaje = data.get('mensaje')
        receta = sp.buscar_receta(mensaje)
        # Procesar el mensaje
        return JsonResponse({'titulo': receta['titulo'], 'tipo': receta['tipo'], 'valoracion': receta['valoracion'], 'ingredientes': receta['ingredientes'], 'propiedades': receta['propiedades']})
    

    return JsonResponse({'error': 'Método no permitido'}, status=405)
