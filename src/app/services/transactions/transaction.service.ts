import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ITransaction} from "../../interface/itransaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transaction: ITransaction[] = [];

  constructor(protected http: HttpClient) {
  }

  getTransactionByCategoryId(id: any): Observable<any> {
    return this.http.get(environment.url + '/auth/transaction/info/' + id)
  }

  findById(id: any) {
    return this.http.get(environment.url + '/auth/transaction/' + id)
  }

  update(id: any, transaction: any): Observable<any> {
    return this.http.put(environment.url + '/auth/transaction/' + id, transaction)
  }

  store(transaction: ITransaction): Observable<any> {
    return this.http.post(environment.url + '/auth/transaction', transaction);
  }

  delete(id:any) {
    return this.http.delete(`${environment.url}/auth/transaction/${id}`)
  }
}
