import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

import { API_BASE_URL } from '../util/APIHelper';
import { AlertService } from './alert.service';


@Injectable()
export class AuthService {
  user: User;

  accessToken: string;
  tokenType: string;

  constructor(private httpClient: HttpClient, private router: Router, private alertService: AlertService) { }

  onSignup(user: User) {
    this.httpClient
      .post(API_BASE_URL + '/auth/signup', user)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
          this.alertService.success("Registered successfully, Please Login !");
        },
        (error) => {
        }
      );
  }

  onLogin(user: User) {
    this.alertService.clear();
    this.httpClient
      .post(API_BASE_URL + '/auth/login', user)
      .subscribe(
        (response) => {
          localStorage.setItem("accessToken", response["accessToken"]);
          localStorage.setItem("tokenType", response["tokenType"]);         
          this.formatUserInfo(response["user"]);
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
  }

  getUser() {
    this.httpClient
      .get(API_BASE_URL + '/user/me')
      .subscribe(
        (response) => {
          this.formatUserInfo(response);         
          this.router.navigate(['home']);
        },
        (error) => {

        }
      );
  }

  formatUserInfo(response: Object) {
    localStorage.setItem("name", response["name"]);
    localStorage.setItem("email", response["email"]);
    localStorage.setItem("id", response["id"]);
    localStorage.setItem("imageUrl", response["imageUrl"]);
    localStorage.setItem("provider", response["provider"]);
    localStorage.setItem("isAuth", "true");
    this.user = new User(response["name"],response["email"],null,parseInt(response["id"]),response["imageUrl"],response["roles"],response["provider"]);
    this.isAdminCheck(this.user);
  }

  onLogout() {
    this.user = null;
    this.router.navigate(['']);
    localStorage.setItem("accessToken", "");
    localStorage.setItem("tokenType", "");
    localStorage.setItem("isAuth", "");
    localStorage.setItem("isAdmin", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("id", "");
    localStorage.setItem("imageUrl", "");
    localStorage.setItem("provider", "");
  }

  isAdminCheck(user: User) {
    user.roles.forEach(role => {
      if (role["name"] == "ROLE_ADMIN") {
        localStorage.setItem("isAdmin", "true");
      }

    });
  }

  errorMsg(message: string) {
    this.alertService.error("ERROR : " + message);
  }

  clearErrorMsg() {
    this.alertService.clear();
  }

  isAuth() {
    if (localStorage.getItem("isAuth")) {
      return true;
    } else {
      return false;
    }
  }

  isAdmin() {
    if (localStorage.getItem("isAdmin") == "true") {
      return true;
    } else {
      return false;
    }
  }
}