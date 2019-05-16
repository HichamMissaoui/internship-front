import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/model/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  getUserName(){
    return localStorage.getItem("name");
  }

  getEmail(){
    return localStorage.getItem("email");
  }

  getImageURL(){
    if(localStorage.getItem("imageUrl") != "null"){
      return localStorage.getItem("imageUrl");
    }else{
      return "assets/images/user.png";
    }
  }

  isLocalProvider(){
    if(localStorage.getItem("provider") == "local" ){
      return true;
    }else{
      return false;
    }
  }

}
