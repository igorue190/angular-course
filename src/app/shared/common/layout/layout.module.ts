import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorModalRegistrationComponent } from './components/error-modal-registration/error-modal-registration.component';
import { StrenthPasswordComponent } from './components/strenth-password/strenth-password.component';

@NgModule({
  declarations: [
    LogoutComponent,
    ErrorModalRegistrationComponent,
    StrenthPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoutComponent,
    StrenthPasswordComponent
  ]
})
export class LayoutModule { }
