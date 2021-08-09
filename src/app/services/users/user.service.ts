import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient,
              protected toastr: ToastrService) { }

  register(data: any){
    return this.http.post(environment.url + '/auth/register',data);
  }

  getCurrentLoginUser(){
    return localStorage.getItem('user');
  }
  refreshLoginUser(id:any){
    return this.http.get(environment.url + '/auth/user/' + id);
  }

  editProfile(data:any, id:any) {
    let headers = new HttpHeaders({ 'enctype': 'multipart/form-data'})
    return this.http.post(environment.url + '/auth/user/' + id , data, {headers} );
  }

  changePassword(data:any, id:any) {
    return this.http.patch(environment.url + '/auth/user/changePassword/' +id, data);
  }
}
