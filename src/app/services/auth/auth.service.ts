import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient) { }

  checkAccount(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(environment.url + '/login/',data)


  }

  isLogin() {
    return localStorage.getItem('token');
  }
}
