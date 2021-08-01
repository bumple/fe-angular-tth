import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,
              public jwtHelper: JwtHelperService,
              private toastr: ToastrService,
              ) { }

  checkAccount(data: any): Observable<any> {
    // @ts-ignore
    return this.http.post(environment.url + '/login/',data)
  }

  isLogin() {
    
    return localStorage.getItem('token');
  }

  logout(){
    this.toastr.success('Đăng xuất thành công')
    // @ts-ignore

    return this.http.post(environment.url + '/auth/logout').subscribe(()=>{
      localStorage.clear();
      this.router.navigate(['login'])
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }
}
