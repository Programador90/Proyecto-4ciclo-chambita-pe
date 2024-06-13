from django.urls import include, path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'datos_postulantes', DatosPostulantesViewSet)
router.register(r'sectores', SectorViewSet)
router.register(r'empresas', EmpresaViewSet)
router.register(r'ofertas_trabajo', OfertaTrabajoViewSet)
router.register(r'postulaciones', PostulacionViewSet)
router.register(r'contrataciones', ContratacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('ofertas_trabajo/<int:pk>/change_state/', OfertaTrabajoViewSet.as_view({'patch': 'change_state'}), name='change_state'),
]
