#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Mar 30 17:40:03 2020

@author: maxime
"""
#rest
from rest_framework import serializers 

#app
from bot_requests.models import BotRequest, CreateRiderRequest, ImportClassificationRequest

class BotRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BotRequest
        fields = ('name')

class CreateRiderRequestSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = CreateRiderRequest
        fields ='__all__'

class ImportClassificationRequestSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    
    class Meta:
        model = ImportClassificationRequest
        fields ='__all__'