import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-gestion-depart',
  templateUrl: './gestion-depart.component.html',
  styleUrls: ['./gestion-depart.component.scss']
})
export class GestionDepartComponent implements OnInit {
  departements:Array<Departement>=[]
  constructor(private departservice:AppService) { }

  ngOnInit(): void {
    this.getAllDepartement()
  }
  getAllDepartement(){
    this.departservice.getAlldepart().subscribe((res:any)=>{
      console.log('departement',res)
      this.departements=res
      
  })}
}
