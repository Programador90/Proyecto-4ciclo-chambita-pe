import schedule
import time
from datetime import datetime, timedelta
import os
import django

# Configurar el entorno de Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chambita_django.settings")
django.setup()

from django.utils import timezone
from admin_chambita.models import OfertaTrabajo

def desactivar_ofertas():
    print("Iniciando el proceso de desactivación de ofertas")
    now = timezone.now()
    one_week_ago = now - timedelta(weeks=1)
    print(f"Fecha actual: {now}")
    print(f"Fecha de corte: {one_week_ago}")
    ofertas = OfertaTrabajo.objects.filter(fecha_publicacion__lt=one_week_ago, estado='activa')
    print(f"Ofertas encontradas para desactivar: {ofertas.count()}")
    for oferta in ofertas:
        oferta.estado = 'inactiva'
        oferta.save()
        print(f"Oferta {oferta.id} desactivada")
    print("Proceso de desactivación completado")

# Programa la tarea para ejecutarse cada minuto
schedule.every(1).minutes.do(desactivar_ofertas)

if __name__ == "__main__":
    print("Iniciando el scheduler")
    while True:
        schedule.run_pending()
        print("Ejecutando tareas programadas")
        time.sleep(1)
