import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {Router} from "@angular/router";
import {IWallet} from "../../../interface/iwallet";
import {TransactionService} from "../../../services/transactions/transaction.service";
import {CategoryService} from "../../../services/categories/category.service";
import {ICategory} from "../../../interface/icategory";

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {

  formAddTransaction: FormGroup | undefined;
  formAddMoney: FormGroup | undefined;
  wallets: IWallet[] = [];
  categories: ICategory[] = [];
  constructor(protected walletService: WalletService,
              protected router: Router,
              protected fb: FormBuilder,
              protected transactionService: TransactionService,
              protected categoryService:CategoryService) {
  }

  ngOnInit(): void {
    this.getAllWallet();
    this.getAllCategories();
    // @ts-ignore
    this.formAddMoney = this.fb.group({
      'id': [''],
      'amount': ['',[Validators.required],[Validators.min(0)]],
      'description': ['',[Validators.required]],
    })

    this.formAddTransaction = this.fb.group({
      'wallet_id': [''],
      'category_id': [''],
      'money': [''],
      'note': [''],
    })
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe( res => {
      this.categories = res.data;
      console.log(res.data);
    })
  }

  createTran(){
    let data = this.formAddTransaction?.value;
    this.transactionService.store(data).subscribe( () => {})
  }

  getAllWallet(){
    this.walletService.getAllWallets().subscribe( res => {
      this.wallets = res.data;
    })
  }

  submit() {
    // @ts-ignore
    let data = this.formAddMoney?.value;
    this.walletService.plusMoney(data.id,data).subscribe(res => {
      console.log(res);
    })
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
