import { Component, OnInit } from '@angular/core';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewsap',
  templateUrl: './viewsap.component.html',
  styleUrls: ['./viewsap.component.scss']
})
export class ViewsapComponent implements OnInit {
  sapbookings:Array<SAPBooking>=[]
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(private sapservice:AppService) { }

  ngOnInit(): void {
    if(this.isAdmin()){
    this.getsapbooking(this.usercurent.matriculeRH)
    }
    if(this.isUser()){
      this.getsapbooking(this.usercurent.matriculeRH)
      }
      if(this.isSuperAdmin()){
        this.getAllbooking()
        }
  }
  getsapbooking(mat:number){
    this.sapservice.getsapbooking(mat).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapbookings=res
    })
  }
  getAllbooking(){
    this.sapservice.getAllbooking().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapbookings=res
  })}
    isAdmin(){
    return this.usercurent.profile.includes("ADMIN") ? true : false
    
   }
   isUser(){ 
    return this.usercurent.profile.includes("USER") ? true : false
   }
  
   isSuperAdmin(){
    return this.usercurent.profile.includes("SUPERADMIN") ? true : false
    
   }
}
