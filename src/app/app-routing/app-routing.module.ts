import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../core/components/home/home.component';
import { LoginComponent } from '../core/components/login/login.component';
import { RfRegistrationComponent } from '../core/components/rf-registration/rf-registration.component';
import { TdRegistrationComponent } from '../core/components/td-registration/td-registration.component';
import { AppGuardModule } from './app-guard/app-guard.module';
import { HomeGuard } from './app-guard/home.guard';
import { LoginGuard } from './app-guard/login.guard';

const appRoutes: Routes=[
  {path: '', component: HomeComponent, canActivate: [HomeGuard]},
  {path: 'rfreg', component: RfRegistrationComponent},
  {path: 'tdreg', component: TdRegistrationComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    AppGuardModule
  ],
  exports:[RouterModule],
  providers:[
    HomeGuard,
    LoginGuard
  ]
})
export class AppRoutingModule { }
