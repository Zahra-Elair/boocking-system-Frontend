import { Component, OnInit } from '@angular/core';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-viewsap',
  templateUrl: './viewsap.component.html',
  styleUrls: ['./viewsap.component.scss']
})
export class ViewsapComponent implements OnInit {
  sapbookings:Array<SAPBooking>=[]
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(private sapservice:AppService) { }

  ngOnInit(): void {
    this.getsapbooking(this.usercurent.matriculeRH)
  }
  getsapbooking(mat:number){
    this.sapservice.getsapbooking(mat).subscribe((res:any)=>{
      console.log('sappp',res)
      this.sapbookings=res
    })
  }
}
