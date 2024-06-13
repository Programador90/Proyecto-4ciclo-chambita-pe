from django.db import models

class Rol(models.Model):
    tipo = models.CharField(max_length=45)

    def __str__(self):
        return self.tipo

class Usuario(models.Model):
    nombre = models.CharField(max_length=255)
    apellidos = models.CharField(max_length=255)
    email = models.CharField(max_length=50)
    contrasena = models.CharField(max_length=255)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombre} {self.apellidos}"

class DatosPostulantes(models.Model):
    foto_perfil = models.ImageField(upload_to='fotos_perfil/')
    cv = models.FileField(upload_to='cvs/')
    descripcion_profesional = models.CharField(max_length=500)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return self.descripcion_profesional

class Sector(models.Model):
    nombre = models.CharField(max_length=45)

    def __str__(self):
        return self.nombre

class Empresa(models.Model):
    telefono = models.IntegerField()
    ruc = models.IntegerField()
    nombre_comercial = models.CharField(max_length=255)
    distrito = models.CharField(max_length=45)
    direccion = models.CharField(max_length=255)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre_comercial

class OfertaTrabajo(models.Model):
    ESTADO_CHOICES = [
        ('activa', 'Activa'),
        ('inactiva', 'Inactiva'),
    ]

    titulo = models.CharField(max_length=255)
    descripcion = models.CharField(max_length=255)
    salario = models.FloatField()
    requerimientos = models.CharField(max_length=255)
    fecha_publicacion = models.DateTimeField()
    estado = models.CharField(max_length=10, choices=ESTADO_CHOICES, default='activa')
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo 

class Postulacion(models.Model):
    fecha_inicio = models.DateTimeField()
    oferta_trabajo = models.ForeignKey(OfertaTrabajo, on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.usuario} - {self.oferta_trabajo}"

class Contratacion(models.Model):
    oferta_trabajo = models.ForeignKey(OfertaTrabajo, on_delete=models.CASCADE)

    def __str__(self):
        return f"Contratación {self.oferta_trabajo}"
