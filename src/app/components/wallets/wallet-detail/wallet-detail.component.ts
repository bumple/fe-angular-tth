import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {WalletService} from "../../../services/wallets/wallet.service";

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletById: any

  constructor(protected activatedRouter: ActivatedRoute,
              protected walletService: WalletService) {
  }

  ngOnInit(): void {
    this.getWalletById();
  }

  getWalletById() {
    let id = this.activatedRouter.snapshot.queryParamMap.get('id');
    this.walletService.findById(id).subscribe(res => {
      this.walletById = res.data;
    })
  }
}