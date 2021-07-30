import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ITransaction} from "../../interface/itransaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transaction: ITransaction[] = [];
  constructor(protected http: HttpClient) { }

  store(transaction: ITransaction):Observable<any>{
    return this.http.post(environment.url + '/transaction', transaction);
  }
}
