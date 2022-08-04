import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/models/departement.model';
import { AppService } from 'src/app/utils/services/app.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestion-depart',
  templateUrl: './gestion-depart.component.html',
  styleUrls: ['./gestion-depart.component.scss']
})
export class GestionDepartComponent implements OnInit {
  p:number=1;
  closeResult = '';
  submitted=false
  departements:Array<Departement>=[]
  registeruserForm:FormGroup
  constructor(private departservice:AppService,private modalService: NgbModal,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getAllDepartement()
    this.registeruserForm = this.fb.group({
      idDep: [''],
      departnom: ['', Validators.required],
      

  });
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
  get f() { return this.registeruserForm.controls; }
  open(content:any,departement:any) {
    this.registeruserForm.patchValue({
      "idDep":departement.idDep,
      "departnom":departement.departnom,

    })
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  updateOneUser(){
   
    this.departservice.updatedepart( this.registeruserForm.value).subscribe((res:any)=>{
      console.log('updateeeone user',res)
      this.getAllDepartement()
      Swal.fire({
        icon:"success",
        
      })
     });
  }

}
