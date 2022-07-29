import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-ajouterdepart',
  templateUrl: './ajouterdepart.component.html',
  styleUrls: ['./ajouterdepart.component.scss']
})
export class AjouterdepartComponent implements OnInit {
  public ajoutdepart: FormGroup;
  toastr: any;
  
  constructor(    private formBuilder: FormBuilder,  
      private appService: AppService,private _router:Router) { }

  ngOnInit(): void {
    this.ajoutdepart = this.formBuilder.group({
      departnom: new FormControl(null, Validators.required),
   
    }
    );
  }
  ajouterdepartement() {
    if (this.ajoutdepart.valid) {
      this.appService.ajouterdepart(this.ajoutdepart.value).subscribe( data=> {console.log(data)
        
        this._router.navigate(["/home/gestserv"])
      }
      );
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }
}
