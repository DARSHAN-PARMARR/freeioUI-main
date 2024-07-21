import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string= environment.baseUrl+'/payment';

  constructor(private http: HttpClient) {}

  getOrderDetails(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${orderId}`);
  }
}
