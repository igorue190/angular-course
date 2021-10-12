import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { ErrorModalRegistrationComponent } from './components/error-modal-registration/error-modal-registration.component';

@NgModule({
  declarations: [
    LogoutComponent,
    ErrorModalRegistrationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoutComponent
  ]
})
export class LayoutModule { }
