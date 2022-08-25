import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/utils/services/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.scss']
})
export class ListeUsersComponent implements OnInit {
  users:Array<User>=[]
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(private userservice:AppService) { }
  

  ngOnInit(): void {
    //this.getAllUsers()
    if(this.isSuperAdmin()){
      this.getAllUsers()
    }
    else if (this.isAdmin){
    this.getuserdepart(this.usercurent.idDep.idDep)
    console.log(this.usercurent.idDep)
    }
    else if (this.isUser){
      this.getuserdepart(this.usercurent.idDep.idDep)
      console.log(this.usercurent.idDep)
      }
  }
  getAllUsers(){
    this.userservice.getAllUsers().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
      
  
  })}
  getuserdepart(depart:Departement){
    this.userservice.getUserDepart(depart).subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
    })
  }
  deleteUser(id:any){
    Swal.fire({
      title: 'Confirmer',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) => {
      if (result.isConfirmed) {
         this.userservice.deleteUser(id).subscribe(res=>{
           console.log("supprimer user ... ",res)
           this.getuserdepart(this.usercurent.idDep.idDep)
          Swal.fire(
            'Supprimer!',
            '',
            'success'
          )
         })
      }
    })
  }
  deleteAdmin(id:any){
    Swal.fire({
      title: 'Confirmer',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OUI'
    }).then((result) => {
      if (result.isConfirmed) {
         this.userservice.deleteUser(id).subscribe(res=>{
           console.log("supprimer user ... ",res)
           this.getAllUsers()
          Swal.fire(
            'Supprimer!',
            '',
            'success'
          )
         })
      }
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
