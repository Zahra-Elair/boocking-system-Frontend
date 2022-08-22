import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { SAPHeurecompensations } from 'src/app/models/sapheurecompensations.model';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewcomp',
  templateUrl: './viewcomp.component.html',
  styleUrls: ['./viewcomp.component.scss']
})
export class ViewcompComponent implements OnInit {
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  mat=this.usercurent.matriculeRH
  sapheurecompensations:Array<SAPHeurecompensations>=[ ] 
  users:Array<User>=[] 
  constructor(private sapservice:AppService) { }
  start: any =new Date('yyyy-MM-dd');  
  end : any =new Date('yyyy-MM-dd'); 
  ngOnInit(): void {
    if(this.isAdmin()){
      this.getheurecompenstation(this.usercurent.matriculeRH)
      this.getuserdepart(this.usercurent.idDep.idDep)
    }  if(this.isUser()){
      this.getheurecompenstation(this.usercurent.matriculeRH)
    }
    if(this.isSuperAdmin()){
      this.getAllcompensations()
      this.getAllUsers()
    }  
    }
  
  
getheurecompenstation(mat:string){
  this.sapservice.getheurecomp(mat).subscribe((res:any)=>{
    console.log('sappp',res)
    this.sapheurecompensations=res
  })
}
selectheurepres(event:any){
  let choice=event.target.value 
  console.log('choice',choice)
  this.mat=choice
  console.log('sapheurepresences',this.sapheurecompensations)
  this.sapservice.getheurecomp(choice).subscribe((res:any)=>{
    console.log(res)
    this.sapheurecompensations=res
    console.log('list sapheurepresences',this.sapheurecompensations)
  }) 
}
getAllUsers(){
  this.sapservice.getAllUsers().subscribe((res:any)=>{
    console.log('userrrrrs',res)
    this.users=res
    

})}
getcompselondate(){
  console.log(this.start)
    console.log(this.end)
    console.log(this.mat)
  this.sapservice.getcompselondate(this.mat,this.start,this.end).subscribe((res:any)=>{
    
    console.log('sappp',res)
    this.sapheurecompensations=res
  })

}
getuserdepart(depart:Departement){
    
  this.sapservice.getUserDepart(depart).subscribe((res:any)=>{
    console.log('userrrrrs',res)
    this.users=res
   
    console.log(this.users)
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
  return this.usercurent.profile.includes("CHEF") ? true : false
  
 }

}
