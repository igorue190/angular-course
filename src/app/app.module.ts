import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './shared/common/layout/layout.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { RfRegistrationComponent } from './core/components/rf-registration/rf-registration.component';
import { StrenthPasswordComponent } from './shared/strenth-password/strenth-password.component';
import { TdRegistrationComponent } from './core/components/td-registration/td-registration.component';
import { HomeComponent } from './core/components/home/home.component';
import { MustMatchDirective } from './shared/directives/must-match.directive';
import { LoginComponent } from './core/components/login/login.component';
import { AuthGuardGuard } from './app-routing/auth-guard.guard';
import { FocusDirective } from './shared/directives/focus.directive';


@NgModule({
  declarations: [
    AppComponent,
    RfRegistrationComponent,
    StrenthPasswordComponent,
    TdRegistrationComponent,
    HomeComponent,
    MustMatchDirective,
    LoginComponent,
    FocusDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
