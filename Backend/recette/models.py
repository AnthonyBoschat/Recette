from django.db import models

# Create your models here.
class Recette(models.Model):
    name = models.CharField(max_length=255)
    materials = models.JSONField(default=list, blank=True)
    ingredients = models.JSONField(default=list, blank=True)
    instructions = models.JSONField(default=list, blank=True)
    
    def __str__(self):
        return self.name
    
