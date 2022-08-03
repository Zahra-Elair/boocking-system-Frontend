import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { AppService } from 'src/app/utils/services/app.service';
import Swal from 'sweetalert2';
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
  deleteDepart(id:any){
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
         this.departservice.deleteDepart(id).subscribe(res=>{
           console.log("supprimer user ... ",res)
           this.getAllDepartement()
          Swal.fire(
            'Supprimer!',
            '',
            'success'
          )
         })
      }
    })
  }
  /*open(content:any,user:any) {
    this.registeruserForm.patchValue({
      "_id":user._id,
      "nom":user.nom,
      "prenom":user.prenom,
      "adresse":user.adresse,
      "email":user.email,
      "date_de_naissance":user.date_de_naissance,
      "num_tel":user.num_tel,
      "role":user.role,
      "superviseur_id":user.superviseur_id,

    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }*/
}
