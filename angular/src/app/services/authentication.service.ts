import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { User} from '@app/models/user';

import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private baseUrl = environment.apiUrl +'users';
    private authUrl = environment.authUrl;
    private readonly JWT_TOKEN = 'JWT_TOKEN'; //their name
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
 
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>; //save other information about user

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser'))); 
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${this.authUrl}jwt/create/`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.storeJwtToken(user.access);
                this.storeRefreshToken(user.refresh);
                localStorage.setItem('currentUser', JSON.stringify(user, this.replacer)); //not ideal as both token as saved at same place
                this.currentUserSubject.next(JSON.parse(localStorage.getItem('currentUser')));//user
                return this.currentUser;
            })); //error catch in error.interceptor
    }

    logout() {
        // remove user from local storage and set current user to null
        // logout is not in djoser path
        this.http.post(`${this.baseUrl}/logout/`, this.currentUser);
        localStorage.removeItem('currentUser');
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
        this.currentUserSubject.next(null);
    }
    
     isLoggedIn() {
         return !!this.getJwtToken();
     }
   
    public getJwtToken() {
       return localStorage.getItem(this.JWT_TOKEN);
    }

    refreshToken() {
         return this.http.post<any>(`${this.authUrl}jwt/refresh/`,
         {'refresh': this.getRefreshToken() } 
         )
         .pipe(tap(ans => {
         this.storeJwtToken(ans.access);
    }));
    }
    
    private storeRefreshToken(refresh: string) {
        localStorage.setItem(this.REFRESH_TOKEN, refresh);
      }
   
    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
      }
    
    private getRefreshToken() {
       return localStorage.getItem(this.REFRESH_TOKEN);
    }
    
    private replacer(key, value) {
      if (key === 'access' || key === 'refresh') {
        return undefined;
      }
      return value;
    }
}

