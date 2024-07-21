import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url: string = environment.baseUrl + '/User';
  
  private userPayload: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
    this.currentUserSubject = new BehaviorSubject<any>(this.userPayload);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.url}/register`, userObj).pipe(
      catchError((error) => {
        console.error('Error during registration:', error);
        throw error; 
      })
    );
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(`${this.url}/authenticate`, loginObj).pipe(
      tap(res => {
        this.storeToken(res.token);
        this.userPayload = this.decodedToken();
        this.storeUserData(this.userPayload);
        this.currentUserSubject.next(this.userPayload);
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }


  getProviderNameById(providerId: number): Observable<string> {
    return this.http.get<{ name: string }>(`${this.url}/${providerId}`).pipe(
      map(response => response.name)
    );
  }


  getUserImage(userId: number): Observable<Blob> {
    return this.http.get(`${this.url}/${userId}/image`, { responseType: 'blob' });
  }

  getProviderImage(gigId: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.url}/${gigId}/provider-image`, { responseType: 'blob' as 'json' });
  }
  
  private storeUserData(tokenPayload: any): void {
    if (tokenPayload) {
      localStorage.setItem('userId', tokenPayload.UserId);
      localStorage.setItem('userName', tokenPayload.name);
      localStorage.setItem('userRole', tokenPayload.role);
      localStorage.setItem('userEmail', tokenPayload.Email); 
      localStorage.setItem('userUsername', tokenPayload.UserName); 
      // localStorage.setItem('userImage', tokenPayload.Image || '');

     // console.log('Stored image data:', tokenPayload.Image); 
    }
  }
  
  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  getLoggedInUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  storeToken(tokenValue: string): void {
    localStorage.setItem('token', tokenValue);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['home']);
    window.location.reload();
  }
  
  decodedToken(): any {
    const token = this.getToken();
    if (token) {
      const jwtHelper = new JwtHelperService();
      return jwtHelper.decodeToken(token);
    }
    return null;
  }
  
  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
  
  getEmailFromToken(): string | null {
    if (this.userPayload)
      return this.userPayload.Email;
    return null;
  }

  getUserNameFromToken(): string | null {
    if (this.userPayload)
      return this.userPayload.UserName;
    return null;
  }

  getImageFromToken(): string | null {
    if (this.userPayload)
      return this.userPayload.Image;
    return null;
  }

  getUserProfile(userId: number): Observable<User> {
    return this.http.get<User>(`${this.url}/profile/${userId}`).pipe(
      tap((user: User) => {
        if (user.image && typeof user.image !== 'string') {
          // Convert byte array to a base64 string
          user.image = 'data:image/png;base64,' + this.arrayBufferToBase64(new Uint8Array(user.image));
        }
      })
    );
  }

  private arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}