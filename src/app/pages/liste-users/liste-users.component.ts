import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-liste-users',
  templateUrl: './liste-users.component.html',
  styleUrls: ['./liste-users.component.scss']
})
export class ListeUsersComponent implements OnInit {
  users:Array<User>=[]
  constructor(private userservice:AppService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  getAllUsers(){
    this.userservice.getAllUsers().subscribe((res:any)=>{
      console.log('userrrrrs',res)
      this.users=res
      
  
  })}
}
