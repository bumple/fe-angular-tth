import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/categories/category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../services/wallets/wallet.service";
import {IWallet} from "../../../interface/iwallet";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";



@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {

  _id: number | undefined;
  event_value: any;
  categories: any;
  wallets: IWallet[] = []
  formAddCategory: FormGroup | undefined;
  formUpdateCategory: FormGroup | undefined;

  constructor(protected categoryService: CategoryService,
              protected walletService: WalletService,
              protected fb: FormBuilder,
              protected router: Router,
              protected toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllWallets();

    this.formAddCategory = this.fb.group({
      wallet_id: [''],
      name: ['', [Validators.required]],
      note: ['', [Validators.required]],
    })
  }


  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  createCategory() {
    let data = this.formAddCategory?.value;
    this.categoryService.store(data).subscribe(() => {
      this.walletService.getCategoryByWalletId(this.event_value).subscribe(res => {
        this.toastr.success('Add new category success')
        this.categories = res;
      });
    })
  }

  onChange(event: any) {
    this.walletService.getCategoryByWalletId(event.target.value).subscribe(res => {
      this.categories = res;
      this.event_value = event.target.value;
    })
  }

  delete(id: number) {
    if (confirm('Are you sure ?!')) {
      this.categoryService.delete(id).subscribe(() => {
        this.walletService.getCategoryByWalletId(this.event_value).subscribe(res => {
          this.toastr.success('Delete success')
          this.categories = res;
        });
      })
    }
  }

  sendId(id: number) {
    this._id = id
    this.categoryService.findById(this._id).subscribe( (res:any) => {
      console.log(res);
      this.formUpdateCategory = this.fb.group({
        name: [res.name, [Validators.required]],
        note: [res.note, [Validators.required]],
      })
    })
  }

  update() {
    let data = this.formUpdateCategory?.value;
    this.categoryService.update(this._id,data).subscribe(() => {
      this.walletService.getCategoryByWalletId(this.event_value).subscribe(res => {
        this.toastr.success('Edit category success')
        this.categories = res;
      });
    })
  }

  getName() {
    return this.formAddCategory?.get('name');
  }

  getNote() {
    return this.formAddCategory?.get('note');
  }
}
