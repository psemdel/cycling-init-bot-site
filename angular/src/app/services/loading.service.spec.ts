import { TestBed } from '@angular/core/testing';

//import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';
import {LoadingService} from './loading.service';

describe('Loading service', () => {
    beforeEach(
        TestBed.configureTestingModule({ providers: [LoadingService]});
        service = TestBed.inject(LoadingService);
      );
    
    it('initial value', () =>{
        expect(service.loading$).toBe(true);
    });
    
    it('start loading'), () => {
        service.startLoading();
        expect(service.loading$).toBe(true);
    });
    
    it('stop loading'), () => {
        service.stopLoading();
        expect(service.loading$).toBe(false);
    });   
    
    }
         
