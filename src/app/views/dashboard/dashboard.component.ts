import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}
  user:any
  profile:any
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
}
