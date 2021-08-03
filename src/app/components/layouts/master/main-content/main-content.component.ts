import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../../services/wallets/wallet.service";
import {TransactionService} from "../../../../services/transactions/transaction.service";
import {CategoryService} from "../../../../services/categories/category.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";
import {ChartType} from 'chart.js';
import {MultiDataSet, Label, Color} from 'ng2-charts';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Download Sales', 'testing', 'Duyen'];
  public doughnutChartData: MultiDataSet = [
    [100, 0, 0],
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColour: Color[] = [{backgroundColor: ['green','red','yellow']},
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
  }

}

