import { Component, OnInit } from '@angular/core';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private sapservice:AppService) {}
  user:any
  profile:any
  sapbookings:Array<SAPBooking>=[]

  ngOnInit() {
  this.user=JSON.parse(localStorage.getItem("connectedUser")!)
  this.profile=this.user.profile
}
  isAdmin(){
    return this.user.profile.includes("ADMIN") ? true : false
   }
   isUser(){
    return this.user.profile.includes("USER") ? true : false
   }
   isConnect(){
    return localStorage.getItem('loginIn')==="true" ? true :false
  }
  getAllbooking(){
    this.sapservice.getAllbooking().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapbookings=res
  })}
}
