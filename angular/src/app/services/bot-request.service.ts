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

   createRiderRequest(botrequest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create_rider/`, botrequest);
  }
  
   deleteCreateRiderRequest(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/create_rider/delete/${id}`);
  }
  
   getCreateRiderRequests(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/create_rider/${id}`); 
  } //user id
 
   getAllCreateRiderRequests(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/create_rider/all/${id}`); 
  } //user id 
  
  //post is with file  
  deleteImportClassificationRequest(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/import_classification/delete/${id}`);
  }
  
  getImportClassificationRequests(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/import_classification/${id}`); 
  } //user id
  
  getAllImportClassificationRequests(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/import_classification/all/${id}`); 
  } //user id  



  runRequest(botrequest: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/run/`, botrequest);
  }
  


}
