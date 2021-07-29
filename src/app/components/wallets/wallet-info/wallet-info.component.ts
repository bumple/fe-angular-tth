import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {Router} from "@angular/router";
import {IWallet} from "../iwallet";

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {



  closeButton = document.getElementById('close_modal');
  formAddMoney: FormGroup | undefined;
  wallets: IWallet[] = [];
  constructor(protected walletService: WalletService,
              protected router: Router,
              protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAll();
    // @ts-ignore
    this.formAddMoney = this.fb.group({
      'id': [''],
      'amount': ['',[Validators.required],[Validators.min(0)]],
      'description': ['',[Validators.required]],
    })
  }

  getAll(){
    this.walletService.getAllWallets().subscribe( res => {
      this.wallets = res.data;
      console.log(res);
    })
  }

  submit() {
    // @ts-ignore
    let data = this.formAddMoney?.value;
    this.walletService.update(data.id,data).subscribe(() => {})
  }

  get amount() {
    return this.formAddMoney?.get('amount');
  }

  getErrorMessageAmount() {
    // if(this.amount?.hasError('min')){
    // return "You must insert amount of money";
    return this.amount?.hasError('required') ? "Insert amount of money" : '';
    // }
  }
}
