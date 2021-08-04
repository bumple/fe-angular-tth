import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../../services/transactions/transaction.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  _id: any
  transaction: any
  formUpdateTran: FormGroup | undefined
  transactions: any

  constructor(protected TranService: TransactionService,
              protected activated: ActivatedRoute,
              protected fb: FormBuilder,
              protected toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllTranByCategoryId()
  }

  getAllTranByCategoryId() {
    this.activated.params.subscribe(params => {
      let latestID = +params['id'];
      this.TranService.getTransactionByCategoryId(latestID)
        .subscribe(res => {
          this.transactions = res;
        });
    });
  }

  getTranById(id: any) {
    this.TranService.findById(id).subscribe(res => {
      this.transaction = res;
      this._id = this.transaction.id;
      this.formUpdateTran = this.fb.group({
        note: [this.transaction.note],
        money: [this.transaction.money],
        date: [moment(this.transaction.created_at).format("YYYY-MM-DD")],
      })
    })
  }

  editTran() {
    let data = this.formUpdateTran?.value;
    this.TranService.update(this._id, data).subscribe(() => {
      this.toastr.success('Update transaction successfully')
      this.getAllTranByCategoryId();
    })
  }

  delete(id: number) {
    if (confirm('Are you sure ?!')) {
      this.TranService.delete(id).subscribe(() => {
        this.toastr.warning('Delete transaction successfully')
        this.getAllTranByCategoryId();
      })
    }
  }
}
