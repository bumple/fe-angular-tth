import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../../services/wallets/wallet.service";
import {ToastrService} from "ngx-toastr";
import {AllserviceService} from "../../../services/allservice.service";
import {IWallet} from "../../../interface/iwallet";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment'

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletById: any
  wallets: IWallet[] = [];
  categories: any;

  formEditWallet: FormGroup | undefined;
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

  constructor(protected activatedRouter: ActivatedRoute,
              protected walletService: WalletService,
              protected router: Router,
              protected toastr: ToastrService,
              protected allService: AllserviceService,
              protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getWalletById();
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.formEditWallet = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      icon: [''],
      user_id: [value.id]
    })
  }

  getWalletById() {
    let id = this.activatedRouter.snapshot.queryParamMap.get('id');
    this.walletService.findById(id).subscribe(res => {
      this.walletById = res.data;
      this.backgroundImg = this.walletById.icon;
      for (let i=0; i<this.iconList.length;i++){
        if (this.iconList[i].img == this.backgroundImg) {
          this.value = this.iconList[i].value;
        }
      }
    })

  }

  deleteWallet(walletId: any) {
    if (confirm('Are you sure ?!')) {
      this.walletService.delete(walletId).subscribe(() => {
        this.allService.getDataList().subscribe(res => {
          this.allService.updateData(res.data);
          this.toastr.warning('Delete wallet successfully')
        })
        this.router.navigate(['wallet/info'])
      })
    }
  }

  back() {
    this.router.navigate(['wallet/info']);
  }

  openEdit() {
    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.formEditWallet = this.fb.group({
      name: [this.walletById.name, [Validators.required]],
      amount: [this.walletById.amount, [Validators.required]],
      description: [this.walletById.description, [Validators.required]],
      icon: [''],
      user_id: [value.id]
    })
  }

  editWallet() {
    let id = this.activatedRouter.snapshot.queryParamMap.get('id');
    let data = this.formEditWallet?.value;
    data.icon = this.backgroundImg;
    this.walletService.update(id, data).subscribe(() => {
      this.toastr.success('Create wallet success');
      this.getWalletById();
    });
  }

  select(index: any) {
    let icon = this.iconList[index];
    this.backgroundImg = icon.img;
    console.log(this.backgroundImg);
    this.value = icon.value;
  }

  getAllWallet() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
      this.allService.updateData(res.data);
    })
  }
}
