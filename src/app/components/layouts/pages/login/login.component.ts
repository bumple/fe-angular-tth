import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | undefined;
  errLogin: string = '';

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  submit(){
    let data = this.formLogin?.value;
    console.log(this.authService.checkAccount(data))
    this.authService.checkAccount(data).subscribe((res:any) => {
      console.log(res)
    })
    // if (this.authService.checkAccount(data)){
    //   localStorage.setItem('token','123');
    //   this.router.navigate(['wallet']);
    // }else {
    //   this.errLogin = 'Sai mật khẩu hoặc tài khoản';
    // }
  }






}
