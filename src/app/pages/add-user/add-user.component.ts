import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public addForm: FormGroup;
  toastr: any;
  constructor(
    private renderer: Renderer2,
    private appService: AppService,private _router:Router
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.addForm = new FormGroup({
      nom: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      prenom: new FormControl(null, Validators.required),
      sapid: new FormControl(null, Validators.required),
      matriculeRH: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      profile:new FormControl('USER', Validators.required),
    });
  }
  register() {
    if (this.addForm.valid) {
      this.appService.register(this.addForm.value).subscribe( data=> {console.log(data)
        
        this._router.navigate(["/"])
      }
      );
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }
}
