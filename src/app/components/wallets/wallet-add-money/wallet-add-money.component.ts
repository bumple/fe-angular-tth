import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {WalletService} from "../../../services/wallets/wallet.service";
import {IWallet} from "../../../interface/iwallet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-wallet-add-money',
  templateUrl: './wallet-add-money.component.html',
  styleUrls: ['./wallet-add-money.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WalletAddMoneyComponent implements OnInit {
  wallets: IWallet[] = [];
  formAddMoney: FormGroup | undefined;


  constructor(protected walletService: WalletService,
              protected fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllWallet();
    this.formAddMoney = this.fb.group({
      'id': [''],
      'amount': ['',[Validators.required],[Validators.min(0)]],
      'description': ['',[Validators.required]],
    })
  }

  getAllWallet(){
    this.walletService.getAllWallets().subscribe( res => {
      this.wallets = res.data;
    })
  }

  submit() {
    let data = this.formAddMoney?.value;
    this.walletService.plusMoney(data.id,data).subscribe(res => {
      this.getAllWallet();
      console.log(res);
    })
  }

  get amount() {
    return this.formAddMoney?.get('amount');
  }
}
