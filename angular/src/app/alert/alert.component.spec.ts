import { AlertComponent } from './alert.component';


import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Message } from '@app/models/lists';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";

import {AlertService} from '../services/alert.service';

@Injectable()
class MockAlertService {
   
    getAlert(){
        return of({type:'success',text:"alertmsg"});   
    }
}

describe('CreateRiderComponent', () => {
    let app: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;
  
    beforeEach( async(() => {
          //const alertService= jasmine.createSpyObj('AlertService',['clear']);
          
           TestBed.configureTestingModule({
            declarations: [
              AlertComponent
            ],
            providers:    [ 
               { provide: AlertService, useClass: MockAlertService },
          ]
          });
    
         fixture = TestBed.createComponent(AlertComponent);
         app = fixture.componentInstance;
         
         })
    );
      
    it('should create the app', () => {
      expect(app).toBeTruthy();
    });
      
    it('should read alert service', () => {
        app.ngOnInit();
        expect(app.message.type).toEqual('success');
        expect(app.message.text).toEqual('alertmsg');
    });
   
});