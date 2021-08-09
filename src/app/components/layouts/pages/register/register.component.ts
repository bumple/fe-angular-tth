import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/users/user.service";
import {Route, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private route: Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    })
  }

  submit() {
    let data = this.formRegister?.value;
    if (data.password_confirmation == data.password) {
      this.userService.register(data).subscribe((res) => {
        this.toastr.success('Register successfully')
        // console.log(res)
        this.route.navigate(['login'])
      })
    } else {
      this.toastr.error('Password confirm is incorrect');
    }
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'Email is required';
    }
    return this.email?.hasError('email') ? 'Wrong type of email' : '';
  }

  getErrorMessageName() {
    if (this.name?.hasError('required')) {
      return 'Username required';
    }
    return 'Username is too short';
  }


  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'Password is required';
    }
    return 'Password is weak';
  }

  getErrorMessagePasswordConfirm() {
    return this.password?.hasError('required') ? 'Password confirm is required' : '';
  }


  get email() {
    return this.formRegister?.get('email')
  }

  get name() {
    return this.formRegister?.get('name')
  }

  get password() {
    return this.formRegister?.get('password')
  }

  get password_confirmation() {
    return this.formRegister?.get('password_confirmation')
  }
}
