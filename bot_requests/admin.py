from django.contrib import admin
from .models import CreateRiderRequest, ImportClassificationRequest

# Register your models here.

admin.site.register(CreateRiderRequest)  #abstract?
admin.site.register(ImportClassificationRequest)