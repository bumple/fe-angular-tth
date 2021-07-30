import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/users/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup | undefined;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    })
  }

  submit() {
    let data = this.formRegister?.value;
    this.userService.register(data).subscribe((res) => {
      console.log(res)
    })
  }

  getErrorMessageMail() {
    if (this.email?.hasError('required')) {
      return 'Không được bỏ trống';
    }
    return this.email?.hasError('email') ? 'Không đúng định dạng mail' : '';
  }

  // @ts-ignore
  // @ts-ignore
  getErrorMessageName() {
    if (this.name?.hasError('required')) {
      return 'Không được bỏ trống';
    } else if (this.name?.hasError('minLength')) {
      return 'Tối thiểu 6 ký tự';
    } else {
      return 'Tối đa 32 ký tự';
    }
  }


  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'Không được bỏ trống';
    } else if (this.password?.hasError('minLength')) {
      return 'Tối thiểu 6 ký tự';
    } else {
      return 'Tối đa 32 ký tự';
    }
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
}
