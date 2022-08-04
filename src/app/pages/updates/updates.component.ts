import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/departement.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {
  
  public updateForm: FormGroup;
  departements:Array<Departement>=[]
  public registerForm: FormGroup;
  user=JSON.parse(localStorage.getItem("connectedUser")!)
  
  toastr: any;
  constructor(  private appService : AppService,private _router:Router,private formBuilder: FormBuilder,)
   {
    
    this.getAllDepartement()
    this.updateForm =  this.formBuilder.group({
      id:['', Validators.required],
      nom: ['', Validators.required],
      email:['',[Validators.required,Validators.email]],
      password: ['', Validators.required],
      prenom: ['', Validators.required],
      sapid:['', Validators.required],
      matriculeRH: ['', Validators.required],
      tel: ['', Validators.required],
      profile:['', Validators.required],
      idDep:['', Validators.required],
    });
    }
  
  ngOnInit(): void {
    this.updateForm.patchValue({
      'id':this.user.id,
      'nom': this.user.nom,
      'email': this.user.email,
      'password': this.user.password,
      'prenom': this.user.prenom,
      'sapid':this.user.sapid,
      'matriculeRH': this.user.matriculeRH, 
      'tel': this.user.tel,
      'profile':this.user.profile,
      'idDep':this.user.idDep,
    });

  }
  updateUser(){
    if(this.updateForm.valid){
      localStorage.removeItem("connectedUser")
    
    this.appService.update(this.updateForm.value).subscribe(res=>{
      console.log('updateeeone user',res)
      
      this._router.navigate(["/home"])
      //this.toastr.success('success');
      localStorage.setItem("connectedUser",JSON.stringify(res))

      //window.location.reload()
    });
    }
    else 
    this.toastr.error('erreur');

  }
  getAllDepartement(){
    this.appService.getAlldepart().subscribe((res:any)=>{
      console.log('departement',res)
      this.departements=res
      
  })}

}
