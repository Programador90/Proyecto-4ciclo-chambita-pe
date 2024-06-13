from rest_framework import viewsets
from .models import *
from .serializers import *
from .permissions import IsAdminUser
from rest_framework.decorators import action
from rest_framework.response import Response

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer
    permission_classes = [IsAdminUser]

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAdminUser]

class DatosPostulantesViewSet(viewsets.ModelViewSet):
    queryset = DatosPostulantes.objects.all()
    serializer_class = DatosPostulantesSerializer
    permission_classes = [IsAdminUser]

class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [IsAdminUser]

class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer
    permission_classes = [IsAdminUser]

class OfertaTrabajoViewSet(viewsets.ModelViewSet):
    queryset = OfertaTrabajo.objects.all()
    serializer_class = OfertaTrabajoSerializer
    permission_classes = [IsAdminUser]

    @action(detail=True, methods=['patch'])
    def change_state(self, request, pk=None):
        oferta = self.get_object()
        oferta.estado = request.data.get('estado', oferta.estado)
        oferta.save()
        return Response(OfertaTrabajoSerializer(oferta).data)

class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer
    permission_classes = [IsAdminUser]

class ContratacionViewSet(viewsets.ModelViewSet):
    queryset = Contratacion.objects.all()
    serializer_class = ContratacionSerializer
    permission_classes = [IsAdminUser]
