from django.contrib import admin
from .models import Recette

@admin.register(Recette)
class RecetteAdmin(admin.ModelAdmin):
    list_display = ('name',)