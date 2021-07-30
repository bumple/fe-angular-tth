import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";

@Component({
  selector: 'app-wallet-create',
  templateUrl: './wallet-create.component.html',
  styleUrls: ['./wallet-create.component.css']
})

export class WalletCreateComponent implements OnInit {

  backgroundImg = 'assets/images/icons/1.png';
  value = '1';
  formRegister: FormGroup | undefined;

  iconList = [{
    value: '2',
    img: 'assets/images/icons/2.png',
    checked: true
  },{
    value: '3',
    img: 'assets/images/icons/3.png',
    checked: false
  },{
    value: '4',
    img: 'assets/images/icons/4.png',
    checked: false
  },{
    value: '5',
    img: 'assets/images/icons/5.png',
    checked: false
  },{
    value: '6',
    img: 'assets/images/icons/6.png',
    checked: false
  },{
    value: '7',
    img: 'assets/images/icons/7.png',
    checked: false
  },{
    value: '8',
    img: 'assets/images/icons/8.png',
    checked: false
  },{
    value: '9',
    img: 'assets/images/icons/9.png',
    checked: false
  },{
    value: '10',
    img: 'assets/images/icons/10.png',
    checked: false
  },{
    value: '11',
    img: 'assets/images/icons/11.png',
    checked: false
  },{
    value: '12',
    img: 'assets/images/icons/12.png',
    checked: false
  },{
    value: '13',
    img: 'assets/images/icons/13.png',
    checked: false
  },{
    value: '14',
    img: 'assets/images/icons/14.png',
    checked: false
  }
  ];

  constructor(private fb: FormBuilder,
              private walletService: WalletService) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: [''],
      amount: [''],
      description: [''],
      icon: [''],
      user_id: 3
    })


  }

  select(index: any) {
    let icon = this.iconList[index];
    this.backgroundImg = icon.img;
    this.value = icon.value;
  }
  submit(){
    let data = this.formRegister?.value;
    data.icon = this.backgroundImg;
    console.log(data);
    this.walletService.createWallet(data).subscribe( (res) => {
      console.log(res);
    } )
  }

}
