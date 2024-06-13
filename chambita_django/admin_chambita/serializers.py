from rest_framework import serializers
from .models import *

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'

class DatosPostulantesSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosPostulantes
        fields = '__all__'
        extra_kwargs = {
            'foto_perfil': {'required': False, 'allow_null': True},
            'cv': {'required': False, 'allow_null': True},
        }

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = '__all__'

class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'

class OfertaTrabajoSerializer(serializers.ModelSerializer):
    empresa = EmpresaSerializer(read_only=True)
    class Meta:
        model = OfertaTrabajo
        fields = '__all__'
        extra_kwargs = {
            'estado': {'required': False}
        }


class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'

class ContratacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contratacion
        fields = '__all__'
