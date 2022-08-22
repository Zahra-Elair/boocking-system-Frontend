import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Departement } from 'src/app/models/departement.model';
import Swal from 'sweetalert2';
import { SAPBooking } from 'src/app/models/sapbooking.models';
import { SAPHeurePresence } from 'src/app/models/sapheurepresnece.model';

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
  public updatedepart(depart:Departement):Observable<any>{
    return this._http.put<any>("http://localhost:9090/api/majdepart",depart)
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
  getsapbooking(sap:string) {
    return this._http.get(`http://localhost:9090/api/allsap/${sap}`);
  }
  getheurepresence(mat:String) {
    return this._http.get(`http://localhost:9090/api/heurepres/${mat}`);
  }
 
  getheurecomp(mat:String) {
    return this._http.get(`http://localhost:9090/api/heurecomp/${mat}`);
  }
  getselondate(mat:any,start:any,end:any) {
    return this._http.get(`http://localhost:9090/api/date/${mat}/${start}/${end}`);
  }
  getAllheure() {
    return this._http.get(`http://localhost:9090/api/allheurepres`);
  }
  getAllbooking() {
    return this._http.get(` http://localhost:9090/api/allbooking	`);
  }
  getAllcompensations() {
    return this._http.get(`http://localhost:9090/api/allheurecomp`);
  }
  getbookselondate(mat:any,start:any,end:any) {
    return this._http.get(`http://localhost:9090/api/datebook/${mat}/${start}/${end}`);
  }
  getcompselondate(mat:any,start:any,end:any) {
    return this._http.get(`http://localhost:9090/api/datecomp/${mat}/${start}/${end}`);
  }
  getsapselonteam(team:any) {
    return this._http.get(`http://localhost:9090/api/sapteam/${team}`);
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
    localStorage.removeItem("loginIn")
    this.router.navigate(['/']);
    Swal.fire({
      icon:'success',
      text:'Logout'
    })
  
    
  }

}
