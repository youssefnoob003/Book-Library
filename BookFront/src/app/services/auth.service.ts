import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { user } from '../models/user-model';
import { host } from '../environement/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${host}createToken`; 
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  login(user: user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' 
    };

    return this.http.post(this.apiUrl, user, httpOptions)
      .pipe(
        map((response: any) => response as string), // Cast the response to a string
        catchError(error => {
          let errorMessage = 'An error occurred during login.';
          if (error.status === 401) {
            errorMessage = 'Invalid username or password.';
          }
          return throwError(errorMessage);        
        })
      )
      .pipe(
        map(token => {
          localStorage.setItem(this.tokenKey, token); // Store the token in local storage
          return token;
        })
      );;
  }
  getToken(): string {
    const token = localStorage.getItem(this.tokenKey);
    if (token != null)
    {
      return JSON.parse(token); // Retrieve the token from local storage
    }
    else return "";
  }

  getLinkWithToken(): Observable<any> {
    return this.http.get(`${host}getMessage`, { responseType: 'text' as 'json' });
  }
}

    
    
  

