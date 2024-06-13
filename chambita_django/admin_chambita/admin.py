from django.contrib import admin
from .models import *

@admin.register(Rol)
class RolAdmin(admin.ModelAdmin):
    list_display = ('id', 'tipo')
    search_fields = ('tipo',)

@admin.register(Usuario)
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'apellidos', 'email', 'rol')
    search_fields = ('nombre', 'apellidos', 'email')
    list_filter = ('rol',)

@admin.register(DatosPostulantes)
class DatosPostulantesAdmin(admin.ModelAdmin):
    list_display = ('id', 'descripcion_profesional', 'usuario')
    search_fields = ('descripcion_profesional', 'usuario__nombre')
    list_filter = ('usuario',)

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre',)

@admin.register(Empresa)
class EmpresaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre_comercial', 'ruc', 'telefono', 'sector')
    search_fields = ('nombre_comercial', 'ruc')
    list_filter = ('sector',)

@admin.register(OfertaTrabajo)
class OfertaTrabajoAdmin(admin.ModelAdmin):
    list_display = ('id', 'titulo', 'empresa', 'fecha_publicacion', 'estado')
    search_fields = ('titulo', 'empresa__nombre_comercial')
    list_filter = ('estado', 'empresa')

@admin.register(Postulacion)
class PostulacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'oferta_trabajo', 'fecha_inicio')
    search_fields = ('usuario__nombre', 'oferta_trabajo__titulo')
    list_filter = ('usuario', 'oferta_trabajo')

@admin.register(Contratacion)
class ContratacionAdmin(admin.ModelAdmin):
    list_display = ('id', 'oferta_trabajo')
    search_fields = ('oferta_trabajo__titulo',)
    list_filter = ('oferta_trabajo',)
