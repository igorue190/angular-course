import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormUserData } from 'src/app/model/mock-users';
import { userAuth } from 'src/app/model/userAuth';
import { ForgotPasswordModalComponent } from 'src/app/shared/common/layout/components/forgot-password-modal/forgot-password-modal.component';
import { FormValidationService } from '../../services/form-validation.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formUserData = FormUserData;
  submitted = false;

  emailError$: Observable<string>;
  passwordError$: Observable<string>;

  loginForm: FormGroup;

  constructor(private router: Router,
    private formValidationService: FormValidationService,
    private fb: FormBuilder,
    private loginService: LoginService,
    private dialog: MatDialog) { }

  get emailControl() : FormControl{
    return this.loginForm.get(this.formUserData.email) as FormControl;
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
      [this.formUserData.email]: this.fb.control('', [Validators.email, Validators.required]),
      [this.formUserData.password]: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  private initErrorMessageContainers(){
    this.emailError$ = this.formValidationService.error$(this.emailControl);
    this.passwordError$ = this.formValidationService.error$(this.passwordControl);
  }

  forgotPassword(){
    this.dialog.open(ForgotPasswordModalComponent);
  }

  onSubmit(){
    if(this.loginForm.invalid){
      return
    }

    this.submitted = true;
    console.log("Form submitted: ", this.loginForm); 
    const userAuth: userAuth = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
      returnSecureToken: true
    }
      this.loginService.login(userAuth).subscribe(() => {
        this.submitted = false;
        this.router.navigate(['']);
      });
  }
}
