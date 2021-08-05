import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean | false | undefined;
  formLogin: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  submit(){
    let data = this.formLogin?.value;
    this.authService.checkAccount(data).subscribe((res:any) => {
      localStorage.setItem('token',res.access_token)
      localStorage.setItem('user',JSON.stringify(res.user))
      this.router.navigate(['']);
        this.toastr.success('Welcome to TimeToHigh')
    },
      (error) => {
        this.toastr.error('Email or Password is incorrect');
      })
  }

  get email(){
    return this.formLogin?.get('email');
  }

  get password(){
    return this.formLogin?.get('password');
  }

  getErrorMessageEmail(){
    return this.email?.hasError('required') ? 'Email is required' : '';
  }

  getErrorMessagePassword(){
    return this.email?.hasError('required') ? 'Password is required' : '';
  }

  showPassword(){
    this.hide = !this.hide;
  }
}
