import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { AuthGuardService } from 'src/app/app-routing/auth-guard.service';
import { FormUserData } from 'src/app/model/mock-users';
import { FormValidationService } from '../../services/form-validation.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formUserData = FormUserData;

  userNameError$: Observable<string>;
  passwordError$: Observable<string>;

  loginForm: FormGroup;

  constructor(private authGuardService: AuthGuardService, 
    private router: Router,
    private formValidationService: FormValidationService,
    private fb: FormBuilder,
    private loginService: LoginService) { }

  get userNameControl() : FormControl{
    return this.loginForm.get(this.formUserData.userName) as FormControl;
  }
  get passwordControl() : FormControl{
    return this.loginForm.get(this.formUserData.password) as FormControl;
  } 

  ngOnInit(): void {
    this.loginForm = this.buildRegisterFormGroup()
    this.initErrorMessageContainers()
  }

  private buildRegisterFormGroup() : FormGroup {
    return this.fb.group({
      [this.formUserData.userName]: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      [this.formUserData.password]: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  private initErrorMessageContainers(){
    this.userNameError$ = this.formValidationService.error$(this.userNameControl);
    this.passwordError$ = this.formValidationService.error$(this.passwordControl);
  }

  onSubmit(){
    console.log("Form submitted: ", this.loginForm); 
    
      if(this.loginService.login(this.userNameControl.value, this.passwordControl.value)){
          this.authGuardService.login();
          this.router.navigate(['']);
      }
  }
}
