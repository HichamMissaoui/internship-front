import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.getAllUsers();
  }

  getImgUrl(imageUrl : string){
    if(imageUrl == null){
      return "assets/images/user.png";
    }else{
      return imageUrl;
    }
  }

}
