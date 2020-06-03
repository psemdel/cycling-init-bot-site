#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Apr 27 21:12:07 2020

@author: maxime
"""
from django.urls import path, include
from . import views

app_name = 'users'

urlpatterns = [ 
    path('', views.users),
    path('logout/', views.mylogout),
    path('activate/<str:uid>/<str:token>/', views.ActivateUserByGet),
    ]