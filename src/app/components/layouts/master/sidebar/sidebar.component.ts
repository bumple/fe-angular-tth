import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../../../services/wallets/wallet.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {UserService} from "../../../../services/users/user.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName: string = "Anonymous";
  avatar: string = "assets/images/avt.jpg";
  user: any;
  wallets: any;
  total: number = 0;
  formEditProfile: FormGroup | undefined;
  formChangePassword: FormGroup | undefined;
  hidden: boolean = true;
  file: any;
  imgSrc: any;


  constructor(private userService: UserService,
              private authService: AuthService,
              protected walletService: WalletService,
              protected router: Router,
              protected allService: AllserviceService,
              protected toastr: ToastrService,
              private fb: FormBuilder) {
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.userService.refreshLoginUser(value.id).subscribe( (res) => {
       console.log(res);
       this.user = res;
       this.userName = this.user.name;
       this.avatar = 'http://localhost:8000/storage/image/' + this.user.avatar;
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentLoginUser();
    this.allService.dataList.subscribe(data => {
      this.wallets = data;
    });
    this.allService.getDataList().subscribe(res => {
      this.allService.updateData(res.data);
      this.getTotalMoney();
    });
    this.formEditProfile = this.fb.group({
      name: new FormControl(this.userName, [Validators.required, Validators.minLength(3)]),
      file: null,
      fileSource: new FormControl('', [Validators.required])
    })

    this.formChangePassword = this.fb.group( {
      currentPassword: new FormControl(''),
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    })

  }

  logOut() {
    this.authService.logout();
  }

  sendId(id: any) {
    this.router.navigate(['transaction/info'], {queryParams: {id: id}});
  }

  getTotalMoney() {
    for (let i = 0; i < this.wallets.length; i++) {
      this.total += this.wallets[i].amount;
      console.log(this.total);
    }
  }

  submitProfile() {
    let id = JSON.parse(<string>localStorage.getItem('user')).id;
    let formData = new FormData();
    formData.append('name',this.formEditProfile?.get('name')?.value);
    formData.append('image', this.formEditProfile?.get('file')?.value);
    console.log(formData.get('image'));
    this.userService.editProfile(formData, id).subscribe( (res) => {
      console.log(res);
      this.toastr.success("Update successfully");
    });
    /*const filePath = `avatar/${this.file.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    console.log(filePath);
    console.log(fileRef);
    this.storage.upload(filePath, this.file).snapshotChanges().pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( url => {
          this.imgSrc = url;
        })
      })
    ).subscribe();
    console.log(this.imgSrc);*/
  }

  // @ts-ignore
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
   /*   console.log(event.target.files[0]);*/
      // @ts-ignore
      const file = event.target.files[0];
      // @ts-ignore
      this.formEditProfile.patchValue({
        file: file
      });
      // @ts-ignore
      this.formEditProfile?.get('file').updateValueAndValidity()


      reader.readAsDataURL(file);

      reader.onload = () => {
        this.avatar = reader.result as string;
      };
    }
  }

  changeName() {
    this.hidden = false;
  }

  submitName() {
    // @ts-ignore
    this.userName = this.formEditProfile?.get('name')?.value;
    this.hidden = true;
  }

  changePassword() {
    let id = JSON.parse(<string>localStorage.getItem('user')).id;
    let data = this.formChangePassword?.value;
    console.log(data);
    if (data.password !== data.password_confirmation) {
      this.toastr.error('Password confirm is incorrect');
    } else {
      this.userService.changePassword(data,id).subscribe((res)=>{
        if (res === "ok") {
          this.toastr.success('Password changed successfully. Please login again');
          this.logOut();
        } else {
          this.toastr.success('Password incorrect!');
        }
      });
    }
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

  get password() {
    return this.formChangePassword?.get('password')
  }

  get password_confirmation() {
    return this.formChangePassword?.get('password_confirmation')
  }
}

