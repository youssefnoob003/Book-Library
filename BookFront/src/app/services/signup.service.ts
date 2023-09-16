import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { host } from '../environement/global';
import { signUp } from '../models/signup-model';

@Injectable({
  providedIn: 'root'
})
export class signUpService {
  private apiUrl = `${host}`; 
  private exist = false;
  constructor(private http: HttpClient) { }

  existing(user: signUp): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    };
  
    return this.http.post(this.apiUrl + "Existing", user, httpOptions)
      .pipe(
        map(response => JSON.parse(response.toString()) === 'true'),
        catchError(error => {
          throw new Error(error);
        })
      );
  }

  signUp(user: signUp): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json' 
    };

    return this.http.post(this.apiUrl + "AddUser", user, httpOptions)
      .pipe(
        map(response => response as string), // Cast the response to a string
        catchError(error => {
          throw new Error(error); // Throw an error for error handling
        })
      )
  }
}

    
    
  

