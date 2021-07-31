import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {TransactionService} from "../../../services/transactions/transaction.service";
import {CategoryService} from "../../../services/categories/category.service";
import {IWallet} from "../../../interface/iwallet";
import {ICategory} from "../../../interface/icategory";

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  formAddTransaction: FormGroup | undefined;
  formAddMoney: FormGroup | undefined;
  wallets: IWallet[] = [];
  categories: ICategory[] = [];
  constructor(protected walletService: WalletService,
              protected fb: FormBuilder,
              protected transactionService: TransactionService,
              protected categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllWallet();
    this.getAllCategories();
    this.formAddTransaction = this.fb.group({
      'wallet_id': [''],
      'category_id': [''],
      'money': ['',[Validators.required]],
      'note': ['',[Validators.required]],
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
    this.transactionService.store(data).subscribe( () => {
      this.getAllWallet();
    })
  }

  getAllWallet(){
    this.walletService.getAllWallets().subscribe( res => {
      this.wallets = res.data;
    })
  }

  get money() {
    return this.formAddTransaction?.get('money');
  }

  get note() {
    return this.formAddTransaction?.get('note');
  }
}
