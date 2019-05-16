import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from '../shared/model/user.model';
import { ActivatedRoute } from '@angular/router';

import {GOOGLE_AUTH_URL , GITHUB_AUTH_URL , FACEBOOK_AUTH_URL} from '../shared/util/APIHelper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../shared/css/authform.css']
})
export class LoginComponent implements OnInit {
  user : User ;

  GOOGLE_AUTH_URL = GOOGLE_AUTH_URL;
  FACEBOOK_AUTH_URL = FACEBOOK_AUTH_URL;
  GITHUB_AUTH_URL = GITHUB_AUTH_URL;

  constructor(private authService : AuthService,private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.route.snapshot.params['error'] != null){
      this.authService.errorMsg(this.route.snapshot.params['error']);
    }
  }

  onSubmit(form: NgForm){

    const email : string= form.value["email"];
    const password : string= form.value["password"];

    if(!email.includes(".")){
      this.authService.errorMsg("Invalid Email Address !");
    }else{
      this.user = new User(null,email,password,null,null,null,null);
      this.authService.onLogin(this.user);
    }
  }

}
