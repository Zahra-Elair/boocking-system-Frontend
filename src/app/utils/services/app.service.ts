import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Departement } from 'src/app/models/departement.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
 

  constructor(private router: Router,private _http:HttpClient) {}

  public loginUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:9090/api/login",user)

  }

  public register(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:9090/api/registeruser",user)

  }
  public update(id:any ,user:User):Observable<any>{
    return this._http.put<any>("http://localhost:9090/api/maj/{id}",user)
  }
  getAllUsers() {
    return this._http.get(`http://localhost:9090/api/allusers`);
  }
 public ajouterdepart(departement:Departement):Observable<any> {
    return this._http.post<any>(`http://localhost:9090/api/ajoutdepart`,departement);
  }
  getAlldepart() {
    return this._http.get(`http://localhost:9090/api/alldepart`);
  }
  logout() {
    localStorage.removeItem("connectedUser")
    this.router.navigate(['/']);
    
  }

}
