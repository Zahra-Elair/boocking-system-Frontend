import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('mainSidebar', { static: false }) mainSidebar;
  
  @Output() mainSidebarHeight: EventEmitter<any> = new EventEmitter<any>();
  user=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(public appService: AppService) {}

  ngOnInit() { 
    console.log(this.user.profile)
    console.log(this.isAdmin());
    console.log(this.isCHEF());


  }
  
  isAdmin(){
    return this.user.profile.includes("ADMIN") ? true : false
   }
   isUser(){
    return this.user.profile.includes("USER") ? true : false
   }
   isCHEF(){
   
    return this.user.profile.includes("CHEF") ? true : false
   }

  ngAfterViewInit() {
    this.mainSidebarHeight.emit(this.mainSidebar.nativeElement.offsetHeight);
  }
}
