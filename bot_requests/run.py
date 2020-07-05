#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr 23 18:03:01 2020

@author: maxime
"""
import pywikibot #avoid confusion
from bot_requests.src import nation_team_table
import time

from .dic import routine_to_model

site = pywikibot.Site("wikidata", "wikidata")
repo = site.data_repository()

#required as BotRequest is abstract
def load_request(request_id, routine):
    table=routine_to_model(routine)
    rq=table.objects.get(pk=request_id)
    rq.status = "started"
    rq.save()
    return rq 

def run_bot(request_id, rq_routine):
    #code 10: already there
    #code 11: general crash
    try:
        rq=load_request(request_id, rq_routine)
        print("request loaded")
        nation_table= nation_team_table.load()
        test=False #run the functions but make no change to wikidata
        test_site=True #don't run the functions
        
        if rq_routine=="create_rider":
            #load request
            print("create rider")
            from bot_requests.src import rider_fast_init
            gender=rq.gender
            if not test_site:
                rider_fast_init.f(pywikibot,site,repo,time,nation_table, rq.name,rq.nationality )
        elif rq_routine=="import_classification":
             from bot_requests.src import classification_importer
             id_race=rq.item_id
             stage_or_general=rq.classificationtype
             final=False
             maxkk=10
             startliston=True
             
             file=rq.result_file_name
             if not test_site:
                 classification_importer.f(pywikibot,site,repo,stage_or_general,id_race,final,
                                   maxkk,test,startliston=startliston,file=file)
             return 0
        elif rq_routine=="race":
            print("race")
            from bot_requests.src import race_creator
            
            if rq.race_type: #stage race
                single_race=False
                
                if rq.prologue:
                   first_stage=0
                else:
                   first_stage=1 
                
                if not test_site:
                    race_creator.f(pywikibot,site,repo,time,
                                  nation_table,
                                  rq.name,
                                  single_race,
                                  id_race_master=rq.item_id,
                                  race_begin=rq.time_of_race,
                                  countryCIO=rq.nationality,
                                  classe=rq.race_class,
                                  edition_nr=rq.edition_nr,
                                  end_date=rq.end_of_race,
                                  only_stages=False,
                                  create_stages=rq.create_stages, 
                                  first_stage=first_stage,
                                  last_stage=rq.last_stage)
            else:
                single_race=True
                
                if not test_site:
                    race_creator.f(pywikibot,site,repo,time,
                                  nation_table,
                                  rq.name,
                                  single_race,
                                  id_race_master=rq.item_id,
                                  race_begin=rq.time_of_race,
                                  countryCIO=rq.nationality,
                                  classe=rq.race_class,
                                  edition_nr=rq.edition_nr,
                                  )
                    
        elif rq_routine=="stages":
            print("stages")
            
            from bot_requests.src import race_creator

            single_race=False
            if rq.prologue:
                first_stage=0
            else:
                first_stage=1 

            if not test_site:
                race_creator.f(pywikibot,site,repo,time,
                                  nation_table,
                                  rq.name,
                                  single_race,
                                  stage_race_id=rq.item_id, 
                                  only_stages=True,
                                  first_stage=first_stage,
                                  last_stage=rq.last_stage)

        elif rq_routine=="team":
            print("team")
            from bot_requests.src import team_creator
            from bot_requests.src import pro_team_table
            
            team_table = [[0 for x in range(7)] for y in range(2)]
            team_table[1][1] = rq.name
            team_table[1][2] = rq.item_id
            team_table[1][3] = rq.nationality
            team_table[1][4] = rq.UCIcode
            team_table[1][5] = 2 
            team_table[1][6] = 1 
            [_, team_dic]=pro_team_table.load()
            
            if not test_site:
                team_creator.f(pywikibot,site,repo,time,team_table,nation_table,
                                   team_dic,rq.year)
                
        elif rq_routine=="sort_date":
            print("sort_date")
            
            from bot_requests.src import sorter
            
            if not test_site:
                sorter.date_sorter(pywikibot,site,repo,time,rq.item_id,rq.prop,test )

        elif rq_routine=="sort_name":
            print("sort_name")
            from bot_requests.src import sorter
            
            if not test_site:
                sorter.name_sorter( pywikibot,site,repo,time,rq.item_id, rq.prop, test)
            
        elif rq_routine=="UCIranking":
            print("UCI ranking") 
        elif rq_routine=="start_list":
            print("start_list")
        elif rq_routine=="national_all_champs":
            print("national all champs")
        elif rq_routine=="national_one_champ":
            print("national one champ")
        else:
            print("routine not managed")
            return 1
       
        rq.status = "completed"
        rq.save() 
        return 0    
            
            
    except Exception as msg:
        print(msg)
        rq.status = "failed"
        rq.save() 
        return 10    
    except:
        rq.status = "failed"
        rq.save() 
        return 11
    
