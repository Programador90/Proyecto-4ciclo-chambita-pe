import datetime
from .models import OfertaTrabajo

def deactivate_old_offers():
    one_week_ago = datetime.datetime.now() - datetime.timedelta(days=7)
    OfertaTrabajo.objects.filter(fecha_publicacion__lt=one_week_ago, estado='activa').update(estado='inactiva')
