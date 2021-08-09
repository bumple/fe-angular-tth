import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WalletService} from "../../../../services/wallets/wallet.service";
import {TransactionService} from "../../../../services/transactions/transaction.service";
import {CategoryService} from "../../../../services/categories/category.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as FileSaver from "file-saver";
import { saveAs } from 'file-saver';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public check: boolean = true;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Week 1','Week 2','Week 3','Week 4'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {data: [0, 0, 0, 0], label: 'Income'},
    {data: [0, 0, 0, 0], label: 'Outcome'}
  ];

  moneyFlow: any;
  wallet_name:any;
  tranArray: any;
  wallets: any;
  today = this.getDate();
  sum: number | undefined;
  week: any;
  formChooseDate: FormGroup | undefined;
  user_id:any;

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
    this.getReportData();

    let value = JSON.parse(<string>localStorage.getItem('user'))
    this.user_id = value.id;

    this.formChooseDate = this.fb.group({
      from: [''],
      to: [''],
      user_id: [this.user_id]
    })

  }

  pickDate(){
    let data = this.formChooseDate?.value;
    if (data.from && data.to ){
      this.check = false;
      this.transactionService.getReportFromToDate(data).subscribe((res:any) => {
        this.wallet_name = res.wallet_name;
        this.moneyFlow = res.money;
        console.log(this.wallet_name[0],'tranfilter');
        console.log(this.moneyFlow,'moneyflow');
      })
    }
  }

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  getReportData(){
    this.transactionService.getReportData().subscribe((res:any) =>{
      // console.log(res.week1.Income);
      this.barChartData = [
        {data: [res.week1.Income||0, res.week2.Income||0, res.week3.Income||0, res.week4.Income||0], label: 'Income'},
        {data: [res.week1.Outcome*-1||0, res.week2.Outcome*-1||0, res.week3.Outcome*-1||0, res.week4.Outcome*-1||0], label: 'Outcome'}
      ];
    })
  }

  onChange(event: any) {
    // console.log(event.target.value);
    this.categoryService.cateStatisticToday(event.target.value).subscribe((res:any) => {
      this.tranArray = res.data;
      this.sum = res.total;
    })
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

  export(){
    let data = this.formChooseDate?.value;

    this.transactionService.exportToExcel(data).subscribe((res:any)=>{
      saveAs(res, `Report-Transaction-${data.from}-${data.to}`);
    })
  }
}

