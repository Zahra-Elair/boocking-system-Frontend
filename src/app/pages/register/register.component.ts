import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,private _router:Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'register-page');
    this.registerForm = this.formBuilder.group({
      nom: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      password: new FormControl(null,  [Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl(null,  Validators.required),
      prenom: new FormControl(null, Validators.required),
      sapid: new FormControl(null, Validators.required),
      matriculeRH: new FormControl(null, Validators.required), 
      tel: new FormControl(null, Validators.required),
      profile:new FormControl('USER', Validators.required),
    }, {
      validator: this.MustMatch('password', 'confirmpassword')
  }
    );
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
}
