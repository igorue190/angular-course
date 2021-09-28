import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthGuardService } from 'src/app/app-routing/auth-guard.service';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userNameError$: Observable<string>;
  passwordError$: Observable<string>;

  loginForm: FormGroup;

  constructor(private authGuardService: AuthGuardService, 
    private router: Router,
    private formValidationService: FormValidationService,
    private fb: FormBuilder) { }

  get userNameControl() : FormControl{
    return this.loginForm.get('userName') as FormControl;
  }
  get passwordControl() : FormControl{
    return this.loginForm.get('password') as FormControl;
  } 

  ngOnInit(): void {
    this.loginForm = new FormGroup({});
    this.loginForm.addControl('userName', this.fb.control('', [Validators.required, Validators.minLength(4)]));
    this.loginForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));

    this.userNameError$ = this.formValidationService.error$(this.userNameControl);
    this.passwordError$ = this.formValidationService.error$(this.passwordControl);
  }

  onSubmit(){
    console.log("Form submitted: ", this.loginForm); 
    this.authGuardService.login();
    this.router.navigate(['']);
  }
}
