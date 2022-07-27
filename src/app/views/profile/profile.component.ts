import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user=JSON.parse(localStorage.getItem("connectedUser")!)
  private router: Router;
  constructor(public appService: AppService) {}

  ngOnInit() {}
  
  updateUser(id :Number){
this.router.navigate(['home/update',id]);
  }
}
