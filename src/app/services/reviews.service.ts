import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateReviewDTO } from '../models/CreateReviewDTO';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  url:string= environment.baseUrl+'/reviews';
  constructor(private http: HttpClient) { }

  createReview(review: CreateReviewDTO): Observable<any> {
    return this.http.post<any>(this.url, review);
  }
}
