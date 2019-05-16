import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { API_BASE_URL } from '../util/APIHelper';
import { AlertService } from './alert.service';
import { User } from '../model/user.model';

@Injectable()
export class AdminService  {
  usersList : User[] ;
    
    constructor(private httpClient: HttpClient, private router : Router,private alertService: AlertService){}

    getAllUsers(){
        this.httpClient
      .get<User[]>(API_BASE_URL + '/users')
      .subscribe(
        (response) => {
            this.usersList = response;
        },
        (error) => {
          switch(error.status){
            case 403: { 
              this.alertService.error('Forbidden, reserved for admin !');          
              break; 
           } 
           case 500: { 
            this.alertService.error('Internal Server Error');   
              break; 
           } 
           default: { 
            this.alertService.error('Unknown error !'); 
              break; 
           } 
          }
        }
      );
    }


}