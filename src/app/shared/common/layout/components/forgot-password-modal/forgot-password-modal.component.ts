import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormValidationService } from 'src/app/core/services/form-validation.service';
import { LoginService } from 'src/app/core/services/login.service';
import { FormUserData } from 'src/app/model/mock-users';
import { emailOb } from 'src/app/model/userAuth';

@Component({
  selector: 'forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent implements OnInit {

  passwordForm: FormGroup;
  submitted = false;
  formUserData = FormUserData;
  emailError$: Observable<string>;

  get emailControl() : FormControl{
    return this.passwordForm.get(this.formUserData.email) as FormControl;
  }

  constructor(public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      [this.formUserData.email]: this.fb.control('', Validators.email)
    });
    this.emailError$ = this.formValidationService.error$(this.emailControl);
  }

  onSubmit(){
    if(this.passwordForm.invalid){
      return;
    }

    this.submitted = true;
    const email: emailOb = {
      requestType: 'PASSWORD_RESET',
      email: this.emailControl.value
    }
    this.loginService.sendEmailVerification(email).subscribe(() => {
      this.submitted = false;
      this.dialogRef.close();
    });
  }

  closeModal(){
    this.dialogRef.close();
  }
}
