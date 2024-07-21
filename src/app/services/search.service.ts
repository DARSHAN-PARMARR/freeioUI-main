import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gig } from '../models/gig.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private url: string = environment.baseUrl + '/Gigs/search';

  constructor(private http: HttpClient) { }

  searchGigs(term: string): Observable<Gig[]> {
    return this.http.get<Gig[]>(`${this.url}?term=${term}`).pipe(
      catchError(this.handleError)
    );
  }
  getGigById(id: string): Observable<Gig> {
    return this.http.get<Gig>(`${this.url}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);  
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Error Try again after some time');
  }
}