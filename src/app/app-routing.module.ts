import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './shared/guards/authGuard';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './shared/guards/adminGuard';
import { Oauth2Component } from './oauth2/oauth2.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'home',canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:error', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'oauth2/redirect', component: Oauth2Component },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
  { path: 'admin', canActivate: [AdminGuard], component: AdminComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
