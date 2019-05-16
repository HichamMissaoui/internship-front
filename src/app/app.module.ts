import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './shared/services/auth.service';
import { AdminService } from './shared/services/admin.service';
import { AuthGuard } from './shared/guards/authGuard';
import { AdminGuard } from './shared/guards/adminGuard';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';

import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
import { Oauth2Component } from './oauth2/oauth2.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {CalendarModule} from 'primeng/calendar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    WelcomeComponent,
    HeaderComponent,
    ProfileComponent,
    NotFoundComponent,
    AdminComponent,
    AlertComponent,
    Oauth2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule
  ],
  providers: [
    AuthService,
    AdminService,
    AuthGuard,
    AdminGuard,
    AlertService,
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
