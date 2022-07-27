import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;

  
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,private _router:Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = new FormGroup({
      nom: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null,  [Validators.required, Validators.minLength(6)]),
      prenom: new FormControl(null, Validators.required),
      sapid: new FormControl(null, Validators.required),
      matriculeRH: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      tel: new FormControl(null, Validators.required),
      profile:new FormControl('USER', Validators.required),
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.appService.register(this.registerForm.value).subscribe( data=> {console.log(data)
        
        this._router.navigate(["/"])
      }
      );
    } else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(
      document.querySelector('app-root'),
      'register-page'
    );
  }
}
