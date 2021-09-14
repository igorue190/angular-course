import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../core/components/home/home.component';
import { LoginComponent } from '../core/components/login/login.component';
import { RfRegistrationComponent } from '../core/components/rf-registration/rf-registration.component';
import { TdRegistrationComponent } from '../core/components/td-registration/td-registration.component';
import { AuthGuardGuard } from './auth-guard.guard';

const appRoutes: Routes=[
  {path: '', component: HomeComponent, canActivate: [AuthGuardGuard]},
  {path: 'rfreg', component: RfRegistrationComponent},
  {path: 'tdreg', component: TdRegistrationComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule],
  providers:[AuthGuardGuard]
})
export class AppRoutingModule { }
