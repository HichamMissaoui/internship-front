import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.css']
})
export class Oauth2Component implements OnInit {

  constructor(private route: ActivatedRoute,private authService : AuthService,private router : Router) { }

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get("token") != null){
      localStorage.setItem("accessToken", this.route.snapshot.queryParamMap.get("token"));
      localStorage.setItem("tokenType", "Bearer");
      this.authService.getUser();
    }
    if(this.route.snapshot.queryParamMap.get("error") != null){
      this.router.navigate(['/login/' + this.route.snapshot.queryParamMap.get("error")]);
    }
  }

}
