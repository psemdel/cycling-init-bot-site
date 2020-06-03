from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class BotRequest(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    entry_time=models.DateTimeField(null=False,blank=False)
    process_start_time=models.DateTimeField(null=True, blank=True)
    process_end_time=models.DateTimeField(null=True, blank=True)
    status=models.CharField(max_length=70, null=False,blank=False, default='pending')
    routine = models.CharField(max_length=100,null=False, blank=False)
    item_id= models.CharField(max_length=70, null=False, blank=False)
  #  request_text= models.CharField(mx_length=1000,blank=False, default='')
    class Meta:
        abstract = True
        
class CreateRiderRequest(BotRequest):
     ##--Create rider--
    nationality = models.CharField(max_length=3, blank=True)
    name = models.CharField(max_length=70, blank=True)
    gender =models.CharField(max_length=1, blank=True)   
    
    def __str__(self):
        return self.routine + " "+ self.name   
   
class ImportClassificationRequest(BotRequest):
   classificationtype= models.IntegerField(blank=False)
   result_file_name = models.CharField(max_length=100,null=False, blank=False)
     
   def __str__(self):
        return self.routine + " "+ self.item_id
    
