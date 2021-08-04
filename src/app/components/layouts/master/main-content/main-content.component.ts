import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {WalletService} from "../../../../services/wallets/wallet.service";
import {TransactionService} from "../../../../services/transactions/transaction.service";
import {CategoryService} from "../../../../services/categories/category.service";
import {Router} from "@angular/router";
import {AllserviceService} from "../../../../services/allservice.service";
import {ToastrService} from "ngx-toastr";
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 40, 40, 40, 40,40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90, 90, 90, 90, 90,50], label: 'Series B'}
  ];

  tranArray: any;
  cateName: any;
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

  getAllWallets() {
    this.walletService.getAllWallets().subscribe(res => {
      this.wallets = res.data;
    })
  }

  onChange(event: any) {
    // console.log(event.target.value);
    this.categoryService.cateStatisticToday(event.target.value).subscribe(res => {
      // console.log(res,'today');
      this.tranArray = res;
      this.tranArray = this.tranArray[0];
      // this.cateName = this.tranArray[1];
      this.cateName = res;
      this.cateName = this.cateName[1];
      // Chuyển đổi object this.cateName -> mảng cateIndex
      let cateIndex = Object.keys(this.cateName).map((item) =>{
        return this.cateName[item];
      });
      for (let i = 0; i < this.tranArray.length; i++) {
        for (let j = 0; j < this.tranArray[i].length; j++) {
          for (let k = 0; k < cateIndex.length; k++) {
            if(this.tranArray[i][j].category_id == this.cateName.index){
              this.tranArray[i][j].category_id = cateIndex[k];
            }
            // console.log(cateIndex[this.tranArray[i][j].category_id][0])
          }
        }
      }

      console.log(this.tranArray,'test')
      console.log(cateIndex,'test123')
      // @ts-ignore
      console.log(this.cateName,'catename')
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
}

