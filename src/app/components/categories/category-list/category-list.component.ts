import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/categories/category.service";
import {ICategory} from "../../../interface/icategory";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {IWallet} from "../../../interface/iwallet";
import {Router} from "@angular/router";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: ICategory[] = [];
  wallets: IWallet[] = [];
  formAddCategory: FormGroup | undefined;

  constructor(protected categoryService: CategoryService,
              protected walletService: WalletService,
              protected fb: FormBuilder,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllWallets();
    this.formAddCategory = this.fb.group({
      wallet_id: [''],
      name: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })
  }

  sendId(id: any) {
    this.router.navigate(['category/edit'], {queryParams: {id: id}});
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.categories = res.data;
    })
  }

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  createCategory() {
    let data = this.formAddCategory?.value;
    console.log(data);
    this.categoryService.store(data).subscribe(() => {
      this.getAllCategories();
    })
  }

  getName() {
    return this.formAddCategory?.get('name');
  }

  getNote() {
    return this.formAddCategory?.get('note');
  }
}
