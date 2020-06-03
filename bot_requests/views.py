from django.http import HttpResponse
from django.http.response import JsonResponse

#from django.urls import reverse
from django.views import generic
from rest_framework.parsers import JSONParser 
from rest_framework import status
from django.utils import timezone

from django.core.files.storage import FileSystemStorage

#testing only
from django.views.decorators.csrf import csrf_exempt

from .serializers import CreateRiderRequestSerializer, ImportClassificationRequestSerializer

from .models import CreateRiderRequest, BotRequest, ImportClassificationRequest

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes, api_view

from ratelimit.decorators import ratelimit

from .run import run_bot

import json

RATELIMRQ='200000/h'

#@csrf_exempt   
def index(request):
   return HttpResponse("<p>bot_requests index</p>")

class DetailView(generic.DetailView):
    model = BotRequest
    template_name = 'bot_requests/detail.html'
  
#@csrf_exempt
@api_view(['DELETE'])       
def create_rider_request_delete(request, pk):
    try:
        if request.method == 'DELETE':
            authorisation=True
            if authorisation and pk is not None:
                rq =CreateRiderRequest.objects.get(pk=pk)
                rq.delete()
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({"delete":"failed"},status=status.HTTP_400_BAD_REQUEST)
    except:
        print("plantage")
        return JsonResponse({"delete":"failed"},status=status.HTTP_400_BAD_REQUEST)

#@csrf_exempt
@api_view(['DELETE'])       
def import_classification_request_delete(request, pk):
    try:
        if request.method == 'DELETE':
            authorisation=True
            if authorisation and pk is not None:
                rq = ImportClassificationRequest.objects.get(pk=pk)
                rq.delete()
                return HttpResponse(status=status.HTTP_204_NO_CONTENT)
            else:
                return JsonResponse({"delete":"failed"},status=status.HTTP_400_BAD_REQUEST)
    except:
        print("plantage")
        return JsonResponse({"delete":"failed"},status=status.HTTP_400_BAD_REQUEST)

#@csrf_exempt
@api_view(['GET'])    
def create_rider_request_list(request, userid):
    if request.method == 'GET':
        bot_requests = CreateRiderRequest.objects.filter(author=userid)
        requests_serializer = CreateRiderRequestSerializer(bot_requests, many=True)
        return JsonResponse(requests_serializer.data, safe=False)   
    else:
        return JsonResponse({'error':'no GET request'}, status=status.HTTP_400_BAD_REQUEST)   

#@csrf_exempt
@api_view(['GET'])    
def import_classification_request_list(request, userid):
    if request.method == 'GET':
        bot_requests = ImportClassificationRequest.objects.filter(author=userid)
        requests_serializer =ImportClassificationRequestSerializer(bot_requests, many=True)
        return JsonResponse(requests_serializer.data, safe=False)   
    else:
        return JsonResponse({'error':'no GET request'}, status=status.HTTP_400_BAD_REQUEST)   

#@csrf_exempt
@api_view(['GET'])    
@permission_classes((IsAdminUser,))
def all_create_rider_request_list(request, userid):
    if request.method == 'GET':
            bot_requests = CreateRiderRequest.objects.all()
            requests_serializer = CreateRiderRequestSerializer(bot_requests, many=True)
            return JsonResponse(requests_serializer.data, safe=False)   
    else:
        return JsonResponse({'error':'no GET request'}, status=status.HTTP_400_BAD_REQUEST)   

#@csrf_exempt
@api_view(['GET'])   
@permission_classes((IsAdminUser,)) 
def all_import_classification_request_list(request, userid):
    if request.method == 'GET':
        bot_requests = ImportClassificationRequest.objects.all()
        requests_serializer =ImportClassificationRequestSerializer(bot_requests, many=True)
        return JsonResponse(requests_serializer.data, safe=False)   
    else:
        return JsonResponse({'error':'no GET request'}, status=status.HTTP_400_BAD_REQUEST)   


##### POST RQ #####
@ratelimit(key='ip', rate=RATELIMRQ)
#@csrf_exempt
@api_view(['POST'])    
def create_rider_request(request):
    if request.method == 'POST':
        rider_data=JSONParser().parse(request)
        rider_data.update(entry_time=timezone.now() ) 
        rider_data.update(routine="create_rider")
        rider_data.update(item_id="Q1")
        request_serializer =CreateRiderRequestSerializer(data=rider_data)

        if request_serializer.is_valid():
            request_serializer.save()
            return JsonResponse(request_serializer.data, status=status.HTTP_201_CREATED) 
        else:
            print('serializer error: ')
            print(request_serializer.errors)
            return JsonResponse(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   

@ratelimit(key='ip', rate=RATELIMRQ)
#@csrf_exempt
@api_view(['POST','GET'])    
def import_classification_request(request):
    if request.method == 'POST':
        if request.FILES:
            try:
                #upload file
                uploaded_file=request.FILES['file']
                fs = FileSystemStorage()
                name = fs.save(uploaded_file.name, uploaded_file)
                rq_data= (json.loads(request.POST['botrequest'] ))
                rq_data.update(entry_time=timezone.now() ) 
                rq_data.update(routine="import_classification")
                rq_data.update(result_file_name=name)

                request_serializer =ImportClassificationRequestSerializer(data=rq_data)
                if request_serializer.is_valid():
                    request_serializer.save()
                    return JsonResponse(request_serializer.data, status=status.HTTP_201_CREATED) 
                else:
                    print('serializer error: ')
                    print(request_serializer.errors)
                    return JsonResponse(request_serializer.errors, status=status.HTTP_400_BAD_REQUEST)   
            except:
                print("plantage by file")  
                return JsonResponse({'file':'failed'}, status=status.HTTP_400_BAD_REQUEST) 
                
        else:
            print('import classification request')
            print(request)
            rider_data=JSONParser().parse(request)
            rider_data.update(entry_time=timezone.now() ) 
            rider_data.update(routine="import_classification")
            rider_data.update(item_id="Q1")
            print(rider_data)
            
            return JsonResponse({'ras':'ras'}, status=status.HTTP_200_OK) 
 
#@csrf_exempt    
@api_view(['POST'])    
@permission_classes((IsAdminUser,))
def run(request):
    if request.method == 'POST':
        run_data=JSONParser().parse(request)
            
        if run_data["routine"]:
            if run_data["id"]:
                run_error=run_bot(run_data["id"],run_data["routine"])
                if run_error==0:
                    return JsonResponse({'ras':'ras'}, status=status.HTTP_200_OK) 
                else:
                    return JsonResponse({'error':'bot run not successful'}, status=status.HTTP_417_EXPECTATION_FAILED)  
            else:
                return JsonResponse({'error':'no request id defined'}, status=status.HTTP_400_BAD_REQUEST)  
        else:
            return JsonResponse({'error':'no routine defined'}, status=status.HTTP_400_BAD_REQUEST)  
    else:
        return JsonResponse({'error':'no POST request'}, status=status.HTTP_400_BAD_REQUEST)   


        
    

