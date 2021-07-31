import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/categories/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IWallet} from "../../../interface/iwallet";

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  wallets: IWallet[] = [];
  formUpdateCategory: FormGroup | undefined;
  constructor(protected categoryService: CategoryService,
              protected walletService: WalletService,
              protected fb: FormBuilder,
              protected activated: ActivatedRoute,
              protected router: Router) { }

  ngOnInit(): void {
    this.getAllWallets()
    let id = this.activated.snapshot.queryParamMap.get('id');
    this.categoryService.findById(id).subscribe( (res:any) => {
      console.log(res)
      this.formUpdateCategory = this.fb.group({
        name: [res.name, [Validators.required]],
        note: [res.note, [Validators.required]],
      })
    })
  }

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  update(){
    let data = this.formUpdateCategory?.value;
    let id = this.activated.snapshot.queryParamMap.get('id');
    this.categoryService.update(id,data).subscribe(() => {
      this.router.navigate(['category/info']);
    })
  }

  back(){
    this.router.navigate(['category/info'])
  }
}
