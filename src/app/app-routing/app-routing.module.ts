import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../core/components/home/home.component';
import { RfRegistrationComponent } from '../core/components/rf-registration/rf-registration.component';
import { TdRegistrationComponent } from '../core/components/td-registration/td-registration.component';

const appRoutes: Routes=[
  {path: '', component: HomeComponent},
  {path: 'rfreg', component: RfRegistrationComponent},
  {path: 'tdreg', component: TdRegistrationComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
