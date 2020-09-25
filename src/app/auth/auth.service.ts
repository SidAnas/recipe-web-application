import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthService {

  errorMessage = new Subject<string>();

  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC72uqVcnfAjioM96et6qeicyQsSY4piv8',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string): Observable<AuthResponseData>{
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC72uqVcnfAjioM96et6qeicyQsSY4piv8',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError));
  }

  private handleError(errorRes){
    let errorMessage = 'An unknown error occured';

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'Email exists already!!!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'Invalid email';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password';
          break;
      }
      return throwError(errorMessage);
  }
}
