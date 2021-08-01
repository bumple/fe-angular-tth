import {Component, OnInit} from '@angular/core';
import {WalletService} from "../../../../services/wallets/wallet.service";
import {IWallet} from "../../../../interface/iwallet";
import {ICategory} from "../../../../interface/icategory";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username: string | undefined;
  wallets: any;

  constructor(protected walletService: WalletService,
              protected router: Router) {
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.username = value.name;
  }

  ngOnInit(): void {
    this.getAllWallets();
  }

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  sendId(id: any) {
    this.router.navigate(['transaction/info'], {queryParams: {id: id}})
  }
}
