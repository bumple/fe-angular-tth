import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IWallet} from "../../interface/iwallet";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  wallet: IWallet[] = [];

  constructor(protected http: HttpClient,
              protected toastr: ToastrService) {
  }

  getAllWallets(): Observable<any> {
    return this.http.get(environment.url + '/auth/wallet');
  }

  findById(id: any): Observable<any> {
    return this.http.get(environment.url + '/auth/wallet/' + id);
  }

  plusMoney(id: number, wallet: IWallet): Observable<any> {
    return this.http.put(environment.url + '/auth/wallet/info/' + id, wallet)
  }

  update(id: any, wallet: IWallet): Observable<any> {
    this.toastr.success('Update wallet successfully')
    return this.http.put(environment.url + '/auth/wallet/' + id, wallet)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.url + '/auth/wallet/' + id)
  }

  createWallet(wallet: IWallet): Observable<any> {
    return this.http.post(environment.url + '/auth/wallet', wallet)
  }

  getCategoryByWalletId(id: any) {
    return this.http.get(environment.url + '/auth/category/info/' + id)
  }


}
