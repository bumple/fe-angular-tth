import {Component,OnInit} from '@angular/core';
import {IWallet} from "../../../interface/iwallet";
import {WalletService} from "../../../services/wallets/wallet.service";

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent implements OnInit {
  wallets: IWallet[] = [];
  constructor(protected walletService: WalletService) { }

  ngOnInit(): void {
    this.getAllWallet();
  }

  getAllWallet(){
    this.walletService.getAllWallets().subscribe( res => {
      this.wallets = res.data;
    })
  }

}
