import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WalletService} from "../../../services/wallets/wallet.service";
import {ToastrService} from "ngx-toastr";
import {AllserviceService} from "../../../services/allservice.service";
import * as moment from 'moment'


@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletById: any


  constructor(protected activatedRouter: ActivatedRoute,
              protected walletService: WalletService,
              protected router: Router,
              protected toastr: ToastrService,
              protected allService: AllserviceService) {
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

  deleteWallet(walletId: any){
    if(confirm('Are you sure ?!')){
      this.walletService.delete(walletId).subscribe(() =>{
        this.allService.getDataList().subscribe(res =>{
          this.allService.updateData(res.data);
          this.toastr.warning('Delete wallet successfully')
        })
        this.router.navigate(['wallet/info'])
      })
    }
  }

  back(){
    this.router.navigate(['wallet/info']);
  }
}
