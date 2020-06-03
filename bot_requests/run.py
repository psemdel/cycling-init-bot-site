#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 23 18:03:01 2020

@author: maxime
"""
import pywikibot #avoid confusion
from bot_requests.Bot import nation_team_table
import time

from .models import CreateRiderRequest

site = pywikibot.Site("wikidata", "wikidata")
repo = site.data_repository()

#required as BotRequest is abstract
def load_request(request_id, request_routine):
    if request_routine=="create_rider":
        rq =CreateRiderRequest.objects.get(pk=request_id)
        rq.status = "started"
        rq.save()
        return rq
    
def run_bot(request_id, request_routine):
    #code 10: already there
    #code 11: general crash
    try:
        rq=load_request(request_id, request_routine)
        print("request loaded")
        nation_table= nation_team_table.load()
        if request_routine=="create_rider":
            #load request
            print("create")
            from bot_requests.Bot import rider_fast_init
            print("bot")
            name=rq.name
            countryCIO=rq.nationality 
            gender=rq.gender
            if True:
                rider_fast_init.f(pywikibot,site,repo,time,nation_table, name,countryCIO)
            rq.status = "completed"
            rq.save() 
            return 0
        elif request_routine=="import_classification":
             from bot_requests.Bot import classification_importer
             id_race=rq.item_id
             stage_or_general=rq.classificationtype
             final=False
             maxkk=10
             startliston=True
             test=False
             file=rq.result_file_name
             classification_importer.f(pywikibot,site,repo,stage_or_general,id_race,final,
                               maxkk,test,startliston=startliston,file=file)
        else:
            print("routine not managed")
    except Exception as msg:
        print(msg)
        rq.status = "failed"
        rq.save() 
        return 10    
    except:
        rq.status = "failed"
        rq.save() 
        return 11
    
