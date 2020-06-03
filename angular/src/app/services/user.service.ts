import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '@app/models/user';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = environment.apiUrl +'users';
    private authUrl = environment.authUrl;
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    register(user: User) {
        return this.http.post(`${this.authUrl}users/`, user );
    }
    
    delete(id: number) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}