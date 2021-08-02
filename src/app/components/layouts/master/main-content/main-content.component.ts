import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../../services/wallets/wallet.service";
import {TransactionService} from "../../../../services/transactions/transaction.service";
import {CategoryService} from "../../../../services/categories/category.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";
import {IWallet} from "../../../../interface/iwallet";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {



  wallets: IWallet[] = [];
  formAddWallet: FormGroup | undefined;
  formAddCategory: FormGroup | undefined;
  username: string | undefined

  constructor(protected walletService: WalletService,
              protected fb: FormBuilder,
              protected transactionService: TransactionService,
              protected categoryService: CategoryService,
              protected router: Router,
              protected allService: AllserviceService,
              protected toastr: ToastrService) { }

  ngOnInit(): void {
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.username = value.name;
  }



  gotoWalletInfo(){
    this.router.navigate(['wallet/info']);
  }

  createCate(){

  }
}
