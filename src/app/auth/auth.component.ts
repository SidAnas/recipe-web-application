import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
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
    // console.log(this.authForm.value);

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    this.isLoading = true;

    if (this.isLoginMode){
      //
    }else {
      this.authService.signup(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      }, errorMessage => {
        console.log('Form auth: ' + errorMessage);
        this.isLoading = false;
        // this.authService.errorMessage.next(errorMessage);
        this.error = errorMessage;
        // this.openDialog();
      });
    }
    this.authForm.reset();
  }



}

