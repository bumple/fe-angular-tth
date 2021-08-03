import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WalletService} from "../../../../services/wallets/wallet.service";
import {TransactionService} from "../../../../services/transactions/transaction.service";
import {CategoryService} from "../../../../services/categories/category.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {MultiDataSet, Label, Color} from 'ng2-charts';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,40,40,40,40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90,90,90,90,90,], label: 'Series B' }
  ];

  // Doughnut
  // public doughnutChartLabels: Label[] = ['Income', 'Outcome','Remain'];
  // public doughnutChartData: MultiDataSet = [
  //   [100, 80,50],
  // ];
  // public doughnutChartType: ChartType = 'line';
  // public doughnutChartColour: Color[] = [{backgroundColor: ['green','red','blue']},
  // ];

  wallets: any;
  today = this.getDate();

  constructor(protected walletService: WalletService,
              protected fb: FormBuilder,
              protected transactionService: TransactionService,
              protected categoryService: CategoryService,
              protected router: Router,
              protected allService: AllserviceService,
              protected toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getAllWallets();
  }

  getAllWallets(){
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  onChange(event: any) {
    console.log(event.target.value);

  }

  getDate() {
    let today = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    return yyyy + '-' + mm + '-' + dd;
  }
}

