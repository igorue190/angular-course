import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorModalRegistrationComponent } from './components/error-modal-registration/error-modal-registration.component';
import { StrenthPasswordComponent } from './components/strenth-password/strenth-password.component';
import { ForgotPasswordModalComponent } from './components/forgot-password-modal/forgot-password-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LogoutComponent,
    ErrorModalRegistrationComponent,
    StrenthPasswordComponent,
    ForgotPasswordModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LogoutComponent,
    StrenthPasswordComponent
  ]
})
export class LayoutModule { }
