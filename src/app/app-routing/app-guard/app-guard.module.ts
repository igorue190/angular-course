import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeGuard } from './home.guard';
import { LoginGuard } from './login.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HomeGuard,
    LoginGuard
  ]
})
export class AppGuardModule { }
