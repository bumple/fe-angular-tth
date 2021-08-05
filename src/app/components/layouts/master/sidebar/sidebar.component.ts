import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../../../services/wallets/wallet.service";
import {IWallet} from "../../../../interface/iwallet";
import {ICategory} from "../../../../interface/icategory";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {UserService} from "../../../../services/users/user.service";
import {AuthService} from "../../../../services/auth/auth.service";

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
  total: number =0;

  constructor(private userService: UserService,
              private authService: AuthService,
              protected walletService: WalletService,
              protected router: Router,
              protected allService: AllserviceService) {
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.userName = value.name;
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentLoginUser();
    this.allService.dataList.subscribe(data => {
      this.wallets = data;
      console.log(this.wallets);
    });
    this.allService.getDataList().subscribe(res => {
      this.allService.updateData(res.data);
      this.getTotalMoney();
    });

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


}

