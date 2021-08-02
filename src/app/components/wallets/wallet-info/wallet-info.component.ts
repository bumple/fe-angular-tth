import {Component, OnInit} from '@angular/core';
import {IWallet} from "../../../interface/iwallet";
import {WalletService} from "../../../services/wallets/wallet.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransactionService} from "../../../services/transactions/transaction.service";
import {CategoryService} from "../../../services/categories/category.service";
import {ICategory} from "../../../interface/icategory";
import {Router} from "@angular/router";

import {stringify} from "@angular/compiler/src/util";
import {AllserviceService} from "../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.css']
})
export class WalletInfoComponent implements OnInit {

  wallets: IWallet[] = [];
  categories: any;

  formAddWallet: FormGroup | undefined;
  formAddMoney: FormGroup | undefined;
  formAddTransaction: FormGroup | undefined;

  username: string | undefined


  backgroundImg = 'assets/images/icons/1.png';
  value = '1';

  iconList = [{
    value: '2',
    img: 'assets/images/icons/2.png',
    checked: true
  }, {
    value: '3',
    img: 'assets/images/icons/3.png',
    checked: false
  }, {
    value: '4',
    img: 'assets/images/icons/4.png',
    checked: false
  }, {
    value: '5',
    img: 'assets/images/icons/5.png',
    checked: false
  }, {
    value: '6',
    img: 'assets/images/icons/6.png',
    checked: false
  }, {
    value: '7',
    img: 'assets/images/icons/7.png',
    checked: false
  }, {
    value: '8',
    img: 'assets/images/icons/8.png',
    checked: false
  }, {
    value: '9',
    img: 'assets/images/icons/9.png',
    checked: false
  }, {
    value: '10',
    img: 'assets/images/icons/10.png',
    checked: false
  }, {
    value: '11',
    img: 'assets/images/icons/11.png',
    checked: false
  }, {
    value: '12',
    img: 'assets/images/icons/12.png',
    checked: false
  }, {
    value: '13',
    img: 'assets/images/icons/13.png',
    checked: false
  }, {
    value: '14',
    img: 'assets/images/icons/14.png',
    checked: false
  }
  ];

  constructor(protected walletService: WalletService,
              protected fb: FormBuilder,
              protected transactionService: TransactionService,
              protected categoryService: CategoryService,
              protected router: Router,
              protected allService: AllserviceService,
              protected toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllWallet();

    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.username = value.name;

    this.formAddMoney = this.fb.group({
      id: [''],
      amount: ['', [Validators.required], [Validators.min(0)]],
      description: ['', [Validators.required]],
    })

    this.formAddWallet = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      icon: [''],
      user_id: [value.id]
    })


    this.formAddTransaction = this.fb.group({
      wallet_id: [''],
      category_id: [''],
      money: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })
  }

  select(index: any) {
    let icon = this.iconList[index];
    this.backgroundImg = icon.img;
    this.value = icon.value;
  }

  create() {
    let data = this.formAddWallet?.value;
    data.icon = this.backgroundImg;
    console.log(data);
    this.walletService.createWallet(data).subscribe(() => {
      this.toastr.success('Create wallet success')
      this.getAllWallet();
    });
  }
  getAllWallet() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
      this.allService.updateData(res.data);
    })
  }






  submit() {
    let data = this.formAddMoney?.value;
    this.walletService.plusMoney(data.id, data).subscribe(res => {
      this.toastr.success('Add money to wallet success')
      this.getAllWallet();
    })
  }

  createTran() {
    let data = this.formAddTransaction?.value;
    this.transactionService.store(data).subscribe(() => {
      this.toastr.success('Add transaction success')
      this.getAllWallet();
    })
  }

  getDetail(id: any) {
    this.router.navigate(['wallet/detail'], {queryParams: {id: id}});
  }

  get amount() {
    return this.formAddMoney?.get('amount');
  }

  get money() {
    return this.formAddTransaction?.get('money');
  }

  get note() {
    return this.formAddTransaction?.get('note');
  }

  onChange(event: any) {
    console.log(event.target.value)
    this.walletService.getCategoryByWalletId(event.target.value).subscribe(res => {
      this.categories = res;
    })
  }
}
