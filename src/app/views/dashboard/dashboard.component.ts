import { Component, OnInit } from '@angular/core';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { SAPHeurecompensations } from 'src/app/models/sapheurecompensations.model';
import { SAPHeurePresence } from 'src/app/models/sapheurepresnece.model';
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
  sapheurepresences:Array<SAPHeurePresence>=[ ]
  sapheurecompensations:Array<SAPHeurecompensations>=[ ] 
  taillebooking:number
  tailleheure:number
  taillecompensations:number
  ngOnInit() {
  this.user=JSON.parse(localStorage.getItem("connectedUser")!)
  this.profile=this.user.profile
  if(this.isChef()){
    this.countAllcompensations()
    this.countAllheure()
  this.countAllbooking()}
  if(this.isUser()){
    this.countsapbooking()
    this.countheurepres()
    this.countheurecompenstation()
  }
  if(this.isAdmin()){
    this.countsapByteam()
    this.countheurepres()
    this.countheurecompenstation()
  }
  
}
  isAdmin(){
    return this.user.profile.includes("ADMIN") ? true : false
   }
   isUser(){
    return this.user.profile.includes("USER") ? true : false
   }
   isChef(){
    return this.user.profile.includes("CHEF") ? true : false
   }
   isConnect(){
    return localStorage.getItem('loginIn')==="true" ? true :false
  }
  countAllbooking(){
    this.sapservice.getAllbooking().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapbookings=res
      this.taillebooking=this.sapbookings.length
  })}
  countsapbooking(){
    this.sapservice.getsapbooking(this.user.matriculeRH).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapbookings=res
      this.taillebooking=this.sapbookings.length
    })
  }
  countsapByteam(){
    this.sapservice.getsapselonteam(this.user.idDep.departnom).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapbookings=res
      this.taillebooking=this.sapbookings.length
    })
   }
   countAllheure(){
    this.sapservice.getAllheure().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapheurepresences=res
      this.tailleheure=this.sapheurepresences.length
  })}
  countheurepres(){ 

    
    this.sapservice.getheurepresence(this.user.matriculeRH).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapheurepresences=res
      this.tailleheure=this.sapheurepresences.length
    }) 
}
countAllcompensations(){
  this.sapservice.getAllcompensations().subscribe((res:any)=>{
    console.log('userrrrrs',res)
    this.sapheurecompensations=res
    this.taillecompensations=this.sapheurecompensations.length
})}
countheurecompenstation(){
  this.sapservice.getheurecomp(this.user.matriculeRH).subscribe((res:any)=>{
    console.log('sappp',res)
    this.sapheurecompensations=res
    this.taillecompensations=this.sapheurecompensations.length
  })
}
}
