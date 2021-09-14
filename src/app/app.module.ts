import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RfRegistrationComponent } from './core/components/rf-registration/rf-registration.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { StrenthPasswordComponent } from './shared/strenth-password/strenth-password.component';
import { TdRegistrationComponent } from './core/components/td-registration/td-registration.component';
import { HomeComponent } from './core/components/home/home.component';
import { MustMatchDirective } from './shared/directives/must-match.directive';
import { LoginComponent } from './core/components/login/login.component';
import { LayoutModule } from './shared/common/layout/layout.module';
import { AuthGuardGuard } from './app-routing/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    RfRegistrationComponent,
    StrenthPasswordComponent,
    TdRegistrationComponent,
    HomeComponent,
    MustMatchDirective,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    LayoutModule
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
