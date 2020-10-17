import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

const rq_list= [{"status":"started","id":1},
                {"status":"failed","id":2},
                {"status":"started","id":3},
];

@Injectable()
export class MockBotRequestService implements HttpInterceptor {

    private baseUrl = environment.apiUrl +'bot_requests';

    constructor(private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): 
              Observable<HttpEvent<any>> {
        if (request.url && request.url
         .indexOf(`${this.baseUrl}/create/create_rider/`) > -1) {
            return
              of(new HttpResponse({ status: 200, body:"ras" }));
        }

        return next.handle(request);
    }
}


