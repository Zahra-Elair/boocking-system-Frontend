import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
 
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,private _router:Router
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login()  {
    
    this.appService.loginUserFromRemote(this.loginForm.value).subscribe(
      (data:any) => {console.log(data)
        if(data == null) {
          alert("Uername or password is wrong");
          console.log("Uername or password is wrong");
        }
        else if(data.profile=="USER"){
        this._router.navigate(["/home"])
        console.log(data.profile);
        localStorage.setItem("connectedUser",JSON.stringify(data))
        console.log(localStorage.getItem("connectedUser"));
      }
        else if(data.profile=="ADMIN"){
          this._router.navigate(["/home"])
          console.log(data.profile);
      
          localStorage.setItem("connectedUser",JSON.stringify(data))
          console.log(localStorage.getItem("connectedUser"));
        }
        else{
          alert("Uername or password is wrong");
          console.log("Uername or password is wrong");
        }
      }
      ,
      error => console.log(error)
    )
    }
    

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
