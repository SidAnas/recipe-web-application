import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable()
export class AuthService implements OnInit {

  // errorMessage = new Subject<string>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void{
    // console.log(this.errorMessage);
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC72uqVcnfAjioM96et6qeicyQsSY4piv8',
    {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes => {
      let errorMessage = 'An unknown error occured';

      if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }

      switch (errorRes.error.error.message){
        case 'EMAIL_EXISTS':
          errorMessage = 'Email exists already!!!';
      }
      return throwError(errorMessage);
    }));
  }
}
