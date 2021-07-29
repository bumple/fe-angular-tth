import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {IWallet} from "../../interface/iwallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  wallet: IWallet[] = [];
  constructor(protected http: HttpClient) { }

  getAllWallets():Observable<any>{
    return this.http.get(environment.url + '/wallet');
  }

  findById(id: number):Observable<any>{
    return this.http.get(environment.url + '/wallet/' + id)
  }

  plusMoney(id: number,wallet: IWallet):Observable<any>{
    return this.http.put(environment.url + '/wallet/info/' +id , wallet)
  }

  update(id: number,wallet: IWallet):Observable<any>{
    return this.http.put(environment.url + '/wallet/' +id , wallet)
  }

  delete(id: number):Observable<any>{
    return this.http.delete(environment.url + '/wallet/' + id)
  }

  createWallet(wallet: IWallet): Observable<any>{
    return this.http.post(environment.url + '/wallet', wallet)
  }
}
