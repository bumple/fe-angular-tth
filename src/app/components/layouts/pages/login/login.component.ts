import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup | undefined;
  errLogin: string = '';
  message: string | undefined;


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  submit(){
    let data = this.formLogin?.value;
    console.log(data);


    this.authService.checkAccount(data).subscribe((res:any) => {
      localStorage.setItem('token',res.access_token)
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['']);
    },
      (error) => {
        this.message = error.message;
      })
  }

}
