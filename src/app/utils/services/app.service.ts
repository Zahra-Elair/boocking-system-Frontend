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
  public update(user:User):Observable<any>{
    return this._http.put<any>("http://localhost:9090/api/maj",user)
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
  getUserDepart(depart:Departement) {
    return this._http.get(`http://localhost:9090/api/allusers/${depart}`);
  }
  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  deleteUser(id:any) {
    return this._http.delete(`http://localhost:9090/api/delete/${id}`);
  }
    deleteDepart(id:any) {
      return this._http.delete(`http://localhost:9090/api/deletedepart/${id}`);
  }
  logout() {
    localStorage.removeItem("connectedUser")
    this.router.navigate(['/']);
    
  }

}
