import { Component, OnInit } from '@angular/core';
import { SAPHeurecompensations } from 'src/app/models/sapheurecompensations.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewcomp',
  templateUrl: './viewcomp.component.html',
  styleUrls: ['./viewcomp.component.scss']
})
export class ViewcompComponent implements OnInit {
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
   
  sapheurecompensations:Array<SAPHeurecompensations>=[ ] 
  constructor(private sapservice:AppService) { }

  ngOnInit(): void {
    if(this.isAdmin()){
      this.getheurecompenstation(this.usercurent.matriculeRH)
      
    }  if(this.isUser()){
      this.getheurecompenstation(this.usercurent.matriculeRH)
    }
    if(this.isSuperAdmin()){
      this.getAllcompensations()
    }  
    }
  
  
getheurecompenstation(mat:string){
  this.sapservice.getheurecomp(mat).subscribe((res:any)=>{
    console.log('sappp',res)
    this.sapheurecompensations=res
  })
}
getAllcompensations(){
  this.sapservice.getAllcompensations().subscribe((res:any)=>{
    console.log('userrrrrs',res)
    this.sapheurecompensations=res
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
