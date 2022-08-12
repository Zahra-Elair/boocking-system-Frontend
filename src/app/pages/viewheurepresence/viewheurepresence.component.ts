import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/departement.model';
import { SAPHeurePresence, } from 'src/app/models/sapheurepresnece.model';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewheurepresence',
  templateUrl: './viewheurepresence.component.html',
  styleUrls: ['./viewheurepresence.component.scss']
})
export class ViewheurepresenceComponent implements OnInit {
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
   
  users:Array<User>=[] 

  sapheurepresences:Array<SAPHeurePresence>=[ ]
start: any =new Date('yyyy-MM-dd');  
end : any =new Date('yyyy-MM-dd'); 

  constructor(private sapservice:AppService) { }  
     
  ngOnInit(): void { 
    if(this.isAdmin()){
    this.getheurepres(this.usercurent.matriculeRH)
    this.getuserdepart(this.usercurent.idDep.idDep)
  }  if(this.isUser()){
    this.getheurepres(this.usercurent.matriculeRH)
  }
  if(this.isSuperAdmin()){
    this.getAllheure()
  }  
  }   
  
  getheurepres(mat:String){ 
    
    this.sapservice.getheurepresence(mat).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapheurepresences=res
    }) 
  }
  getheureselondate(){
    console.log(this.start)
      console.log(this.end)
    this.sapservice.getselondate(this.start,this.end).subscribe((res:any)=>{
      
      console.log('sappp',res)
      this.sapheurepresences=res
    })
 
  }
  getuserdepart(depart:Departement){
    
    this.sapservice.getUserDepart(depart).subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
     
      console.log(this.users)
    }) 
  } 
  isAdmin(){
    return this.usercurent.profile.includes("ADMIN") ? true : false
    
   }
   isUser(){ 
    return this.usercurent.profile.includes("USER") ? true : false
   }
  
   isSuperAdmin(){
    return this.usercurent.profile.includes("SUPERADMIN") ? true : false
    
   }
   getAllheure(){
    this.sapservice.getAllheure().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapheurepresences=res
  })}

}