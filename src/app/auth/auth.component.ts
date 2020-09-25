import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  authForm: FormGroup;

  constructor(private router: Router) { }

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
    console.log(this.authForm.value);
    this.router.navigate(['/recipes']);
    this.authForm.reset();
  }
}
