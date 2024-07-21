import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url:string= environment.baseUrl+'/User';

  constructor(private http: HttpClient) { }
  
  getUsers(): Observable<any> {
    return this.http.get<any>(this.url); 
  }
}
