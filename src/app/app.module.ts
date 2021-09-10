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

@NgModule({
  declarations: [
    AppComponent,
    RfRegistrationComponent,
    StrenthPasswordComponent,
    TdRegistrationComponent,
    HomeComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
