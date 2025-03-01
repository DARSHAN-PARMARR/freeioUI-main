import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url: string = environment.baseUrl + '/payment';

  constructor(private http: HttpClient) { }

  checkout(checkoutRequest: any): Observable<any> {
    return this.http.post<any>(`${this.url}/checkout`, checkoutRequest);
  }
  
}
