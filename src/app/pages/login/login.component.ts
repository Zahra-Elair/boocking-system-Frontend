import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
          this.toastr.error("Uername or password is wrong");
          localStorage.setItem("loginIn","false")
          console.log("Uername or password is wrong");
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Authentification Failed',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if(data.profile=="USER"){
        this._router.navigate(["/home"])
        console.log(data.profile);
        localStorage.setItem("connectedUser",JSON.stringify(data))
        localStorage.setItem("loginIn","true")
        console.log(localStorage.getItem("connectedUser"));
      //  this.toastr.success("success");
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Authentification Successufly',
        showConfirmButton: false,
        timer: 1500
      })
      }
        else if(data.profile=="ADMIN"){
          this._router.navigate(["/home"])
          console.log(data.profile);
          //this.toastr.success("success");
          localStorage.setItem("connectedUser",JSON.stringify(data))
          localStorage.setItem("loginIn","true")
          console.log(localStorage.getItem("connectedUser"));
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Authentification Successufly',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else if(data.profile=="CHEF"){
          this._router.navigate(["/home"])
          console.log(data.profile);
          //this.toastr.success("success");
          localStorage.setItem("connectedUser",JSON.stringify(data))
          localStorage.setItem("loginIn","true")
          console.log(localStorage.getItem("connectedUser"));
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Authentification Successufly',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else{
          this.toastr.error("Uername or password is wrong");
          localStorage.setItem("loginIn","false")
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
