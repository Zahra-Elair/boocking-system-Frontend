import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Departement } from 'src/app/models/departement.model';
import { SAPHeurePresence, } from 'src/app/models/sapheurepresnece.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/project/project.service';
import { AppService } from 'src/app/utils/services/app.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-viewheurepresence',
  templateUrl: './viewheurepresence.component.html',
  styleUrls: ['./viewheurepresence.component.scss']
})
export class ViewheurepresenceComponent implements OnInit {
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
 
  users:Array<User>=[] 
  mat=this.usercurent.matriculeRH
  sapheurepresences:Array<SAPHeurePresence>=[ ]
start: any =new Date('yyyy-MM-dd');  
end : any =new Date('yyyy-MM-dd'); 

  constructor(private sapservice:AppService,private projectService: ProjectService) { }   
     
  ngOnInit(): void { 
    if(this.isAdmin()){
    this.getheurepres(this.usercurent.matriculeRH)
    this.getuserdepart(this.usercurent.idDep.idDep)
  }  if(this.isUser()){ 
    this.getheurepres(this.usercurent.matriculeRH)
  }
  if(this.isSuperAdmin()){
    this.getAllheure()
    this.getAllUsers()
  }   
  }   
  selectheurepres(event:any){
    let choice=event.target.value 
    console.log('choice',choice)
    this.mat=choice
    console.log('sapheurepresences',this.sapheurepresences)
    this.sapservice.getheurepresence(choice).subscribe((res:any)=>{
      console.log(res)
      this.sapheurepresences=res
      console.log('list sapheurepresences',this.sapheurepresences)
    }) 
  }
   
  getheurepres(mat:String){ 

    console.log(mat)
    this.sapservice.getheurepresence(mat).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapheurepresences=res

    }) 
  } 
  getheureselondate(){
    console.log(this.start)  
      console.log(this.end) 
      console.log('mat',this.mat)
      console.log('sapheurepresences',this.sapheurepresences)
    this.sapservice.getselondate(this.mat,this.start,this.end).subscribe((res:any)=>{
      //this.getheurepres(res.matriculeRH)
      
      console.log('sappp',res)
      this.sapheurepresences=res
      
      
    }) 
 
  }
  getAllUsers(){
    this.sapservice.getAllUsers().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
      
  
  })}
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
    return this.usercurent.profile.includes("CHEF") ? true : false
    
   }
   getAllheure(){
    this.sapservice.getAllheure().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.sapheurepresences=res
  })}
 
  
}