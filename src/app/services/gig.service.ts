import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllGigDTO, Gig, GigLocal} from '../models/gig.model';
import { singleServiceDTO } from '../models/singleserviceDTO';


@Injectable({
  providedIn: 'root'
})
export class GigService {
  url: string = environment.baseUrl + '/Gigs';

  constructor(private http: HttpClient) { }

 
  createGig(formData: FormData): Observable<any> {
    return this.http.post<any>(this.url + "/post", formData).pipe(
      catchError(this.handleError)
    );
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

  getGigsByProvider(providerId: number): Observable<Gig[]> {
    return this.http.get<Gig[]>(`${this.url}/by-provider/${providerId}`);
  }
  getWholeGig(): Observable<AllGigDTO[]> {
    return this.http.get<AllGigDTO[]>(`${this.url}/all`);
  }

  deleteGig(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getGigs(): Observable<Gig[]> {
    return this.http.get<Gig[]>(this.url);
  }

  updateGig(id: number, gig: Partial<Gig>): Observable<any> { 
    return this.http.put<any>(`${this.url}/${id}`, gig).pipe(
      catchError(this.handleError)
    );
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
  
  getGigById(id: string): Observable<singleServiceDTO> {
    return this.http.get<singleServiceDTO>(`${this.url}/details/${id}`);
  }

  

}
