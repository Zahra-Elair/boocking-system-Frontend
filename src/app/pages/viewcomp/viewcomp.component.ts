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
  start: any =new Date('yyyy-MM-dd');  
  end : any =new Date('yyyy-MM-dd'); 
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
getcompselondate(){
  console.log(this.start)
    console.log(this.end)
  this.sapservice.getcompselondate(this.start,this.end).subscribe((res:any)=>{
    this.getheurecompenstation(res.idDep)
    console.log('sappp',res)
    //this.sapbookings=res
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
