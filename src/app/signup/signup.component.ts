import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NgForm } from '@angular/forms';

import { User } from '../shared/model/user.model';
import {GOOGLE_AUTH_URL , GITHUB_AUTH_URL , FACEBOOK_AUTH_URL} from '../shared/util/APIHelper';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../shared/css/authform.css']
})
export class SignupComponent implements OnInit {

  user : User ;

  GOOGLE_AUTH_URL = GOOGLE_AUTH_URL;
  FACEBOOK_AUTH_URL = FACEBOOK_AUTH_URL;
  GITHUB_AUTH_URL = GITHUB_AUTH_URL;

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }


  onSubmit(form: NgForm){
    this.authService.clearErrorMsg();

    const username : string = form.value["username"];
    const email : string= form.value["email"];
    const password : string= form.value["password"];
    const confirmPassword : string= form.value["confirmPassword"];

    if(!this.checkInputError(email,password,confirmPassword)){
      this.user = new User(username,email,password,null,null,null,null);
      this.authService.onSignup(this.user);
    }
    
    
  }

  checkInputError(email:string,password:string,confirmPassword:string){
    let error: boolean = false;

    if(!email.includes(".")){
      this.authService.errorMsg("Invalid Email Address !");
      error = true;
    }
    if(password !== confirmPassword){
      this.authService.errorMsg("Password and confirmation does not match !");
      error = true;
    }
    return error;
  }

}
