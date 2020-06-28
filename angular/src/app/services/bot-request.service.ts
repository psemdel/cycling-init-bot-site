import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class BotRequestService {
  private baseUrl = environment.apiUrl +'bot_requests';

  constructor(private http: HttpClient) { }

  createRq(routine: string, botrequest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create/${routine}/`, botrequest);
  } 
  
  deleteRq(routine: string, rq_id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/delete/${routine}/${rq_id}`);
  }
  
  getAllRq(routine: string, author_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all/${routine}/${author_id}`); 
  } //user id 
  
  getRq(routine: string, author_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${routine}/${author_id}`); 
  } //user id   

  runRq(botrequest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/run/`, botrequest);
  }

}
