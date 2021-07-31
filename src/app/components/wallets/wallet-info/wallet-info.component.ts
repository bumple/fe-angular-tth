import {Component,OnInit} from '@angular/core';


@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {

  // wallets: IWallet[] = [];
  constructor() {
  }

  ngOnInit(): void {

  }


  // getAll() {
  //   this.walletService.getAllWallets().subscribe(res => {
  //     this.wallets = res.data;
  //   })
  // }
}
