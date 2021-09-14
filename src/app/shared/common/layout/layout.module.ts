import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    LogoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LogoutComponent
  ]
})
export class LayoutModule { }
