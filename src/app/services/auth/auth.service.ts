import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,
              public jwtHelper: JwtHelperService) { }

  checkAccount(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(environment.url + '/login/',data)
  }

  isLogin() {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }
}
