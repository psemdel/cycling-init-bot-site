#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 30 17:39:43 2020

@author: maxime
"""

#from django.conf.urls import url 
from bot_requests import views 
from django.urls import path

app_name = 'botrequests'

urlpatterns = [ 
    path('', views.index, name='index'),
   #Consult for the back office
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('run/', views.run, name='run'),
    path('create_rider/', views.create_rider_request),
    path('create_rider/delete/<int:pk>', views.create_rider_request_delete, name='delete'),
    path('create_rider/<int:userid>', views.create_rider_request_list),
    path('create_rider/all/<int:userid>', views.all_create_rider_request_list),
    path('import_classification/', views.import_classification_request),
    path('import_classification/delete/<int:pk>', views.import_classification_request_delete),
    path('import_classification/<int:userid>', views.import_classification_request_list),
    path('import_classification/all/<int:userid>', views.all_import_classification_request_list),
]