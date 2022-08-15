import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Departement } from 'src/app/models/departement.model';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  departements:Array<Departement>=[]
 
  public addForm: FormGroup;
  toastr: any;
  usercurent=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private departservice:AppService,
    private appService: AppService,private _router:Router
  ) { }

  ngOnInit(): void {
    this.getAllDepartement()
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.addForm = this.formBuilder.group({
      nom: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null,  [Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl(null,  Validators.required),
      prenom: new FormControl(null, Validators.required),
      sapid: new FormControl(null, Validators.required),
      matriculeRH: new FormControl(null, Validators.required), 
      tel: new FormControl(null, Validators.required),
      idDep: this.usercurent.idDep.idDep,
      profile:'USER',
    }, {
      validator: this.MustMatch('password', 'confirmpassword')
  }
    );

  this.addForm = this.formBuilder.group({
    nom: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required,Validators.email]),
    password: new FormControl(null,  [Validators.required, Validators.minLength(6)]),
    confirmpassword: new FormControl(null,  Validators.required),
    prenom: new FormControl(null, Validators.required),
    sapid: new FormControl(null, Validators.required),
    matriculeRH: new FormControl(null, Validators.required), 
    tel: new FormControl(null, Validators.required),
    idDep: new FormControl(null, Validators.required),
    profile:new FormControl(null, Validators.required),
  }, {
    validator: this.MustMatch('password', 'confirmpassword')
}
  );

  }
  register() {
    if (this.addForm.valid) {
      this.appService.register(this.addForm.value).subscribe( data=> {console.log(data)
        
        this._router.navigate(["home/list-user"])
        
        
      }
      );
    } else {
      console.log(this.addForm.value)
      this.toastr.error('erreur');
    }
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }
  getAllDepartement(){
    this.departservice.getAlldepart().subscribe((res:any)=>{
      console.log('departement',res)
      this.departements=res
      
  })}
  isAdmin(){
    return this.usercurent.profile.includes("ADMIN") ? true : false
    
   }
   
   isSuperAdmin(){
    return this.usercurent.profile.includes("SUPERADMIN") ? true : false
    
   }
}
