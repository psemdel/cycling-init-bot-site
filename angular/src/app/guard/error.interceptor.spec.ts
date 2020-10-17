import {ErrorInterceptor} from './error.interceptor';

import { TestBed, fakeAsync, flush, async, ComponentFixture, tick } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BotRequestService} from '../services/bot-request.service';
import { BotRequest} from '@app/models/models';
import { AuthenticationService } from '../services/authentication.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '@env/environment';
  
describe('Error interceptor', () => {
    
    let botservice: BotRequestService;
    let mockAuthenticationService: AuthenticationService;
    let service: AuthenticationService;
    
    let httpClient: HttpClient;
    let baseUrl = environment.apiUrl +'bot_requests';
    let httpMock: HttpTestingController;
    
    let httpRequestSpy;
    let httpHandlerSpy;
    
    let errorInterceptor;
    let authenticationServiceSpy;
    let botrequest= new BotRequest();
    
    const routine="create_rider";
    let emsg ='deliberate error';

    mockAuthenticationService= jasmine.createSpyObj('AuthenticationService',['refreshToken']);

    beforeEach(() => {         
        TestBed.configureTestingModule({ 
        providers: [ 
           BotRequestService, //use to trigger only
           ErrorInterceptor,
           { provide: AuthenticationService, useValue: mockAuthenticationService},
           {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        ],
        imports: [HttpClientTestingModule]
        });
        
        service=TestBed.get(AuthenticationService);
        botservice = TestBed.get(BotRequestService);
        httpMock = TestBed.get(HttpTestingController);
        httpClient = TestBed.get(HttpClient);

        errorInterceptor = TestBed.get(ErrorInterceptor);
    });
    
    it('test error interception 401', fakeAsync(() => {

        httpClient.get(`${baseUrl}/create/${routine}/`).subscribe(
            res => fail('should have failed with the 401 error'),
            (error: HttpErrorResponse) => {
                console.log('ok');
            }
        );
     
        const req = httpMock.expectOne(`${baseUrl}/create/${routine}/`);
        req.flush(emsg, { status: 401, statusText: 'Unauthorized' });
        flush();
        expect(service.refreshToken).toHaveBeenCalledTimes(1);    
    }));    

    it('test error interception not 401', fakeAsync(() => {

        httpClient.get(`${baseUrl}/create/${routine}/`).subscribe(
            res => fail('should have failed with the 404 error'),
            (error: HttpErrorResponse) => {
                console.log('ok');
                //expect(error).toEqual(emsg);
            }
        );
     
        const req2 = httpMock.expectOne(`${baseUrl}/create/${routine}/`);
        req2.flush(emsg, { status: 404, statusText: 'Bad request' });
        flush();
        expect(service.refreshToken).toHaveBeenCalledTimes(0);    
    }));    

});