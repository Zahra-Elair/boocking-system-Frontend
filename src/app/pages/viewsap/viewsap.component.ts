import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewsap',
  templateUrl: './viewsap.component.html',
  styleUrls: ['./viewsap.component.scss']
})
export class ViewsapComponent implements OnInit {
  sapbookings:Array<SAPBooking>=[]
  users:Array<User>=[] 
  start: any =new Date('yyyy-MM-dd');  
  end : any =new Date('yyyy-MM-dd'); 
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  mat=this.usercurent.matriculeRH
  constructor(private sapservice:AppService) { }
  
  ngOnInit(): void {
    if(this.isAdmin()){
    this.getsapByteam(this.usercurent.idDep.departnom)
    this.getuserdepart(this.usercurent.idDep.idDep)
    }
    if(this.isUser()){
      this.getsapbooking(this.usercurent.matriculeRH)
      }
      if(this.isSuperAdmin()){
        this.getAllbooking()
        this.getAllUsers()
        }
  }
  getsapbooking(mat:string){
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
  selectheurepres(event:any){
    let choice=event.target.value 
    console.log('choice',choice)
    this.mat=choice
    console.log('sapheurepresences',this.sapbookings)
    this.sapservice.getsapbooking(choice).subscribe((res:any)=>{
      console.log(res)
      this.sapbookings=res
      console.log('list sapheurepresences',this.sapbookings)
    }) 
  }
  getbookselondate(){
    console.log(this.start)
      console.log(this.end)
      console.log(this.mat)
    this.sapservice.getbookselondate(this.mat,this.start,this.end).subscribe((res:any)=>{
      
      console.log('sappp',res)
      this.sapbookings=res
    })
  }
  getuserdepart(depart:Departement){
    
    this.sapservice.getUserDepart(depart).subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
     
      console.log(this.users)
    }) 
  } 
  getAllUsers(){
    this.sapservice.getAllUsers().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
      
  
  })}
 getsapByteam(team:any){
  this.sapservice.getsapselonteam(team).subscribe((res:any)=>{
    console.log('sappp',res)
    this.sapbookings=res
  })
 }
  
    isAdmin(){
    return this.usercurent.profile.includes("ADMIN") ? true : false
    
   }
   isUser(){ 
    return this.usercurent.profile.includes("USER") ? true : false
   }
  
   isSuperAdmin(){
    return this.usercurent.profile.includes("CHEF") ? true : false
    
   }
}
