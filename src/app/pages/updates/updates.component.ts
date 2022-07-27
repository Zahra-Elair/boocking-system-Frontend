import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss']
})
export class UpdatesComponent implements OnInit {
  public updateForm: FormGroup;
  public registerForm: FormGroup;
  user=JSON.parse(localStorage.getItem("connectedUser")!)
  constructor(  private appService : AppService) { }
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      tel: new FormControl('', Validators.required),
      
    });

  }
  updateUser(){
    this.appService.update(this.user.id ,this.updateForm.value).subscribe((res:any)=>{
      console.log('updateeeone user',res)
      
     });

  }

}
