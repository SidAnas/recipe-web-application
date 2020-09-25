import { Component,  OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  authForm: FormGroup;
  error: string = null;

  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void{
    this.initForm();
  }

  onSwitchMode(): void{
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  initForm(): void{
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void{

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(responseData => {
      console.log(responseData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      console.log('Form auth: ' + error);
      this.error = error;
      this.authService.errorMessage.next(this.error);
      this.isLoading = false;
      this.openDialog();

    });

    this.authForm.reset();
  }

  openDialog(): void{
    this.dialog.open(DialogComponent);
  }



}


@Component({
  selector: 'app-dialog',
  templateUrl: '../auth/dialog/dialog.component.html'
})
export class DialogComponent implements OnInit{
  error = 'An error occured!';

  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.authService.errorMessage.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    console.log(this.error);
  }
}
