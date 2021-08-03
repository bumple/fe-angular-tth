import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {

  constructor(protected httpService: HttpClient) {
  }
  private _dataListSource: BehaviorSubject<any> = new BehaviorSubject([]);
  dataList: Observable<any> = this._dataListSource.asObservable();

  getDataList(): Observable<any> {
    return this.httpService.get(environment.url + '/auth/wallet');
  }

  updateData(data: any) {
    // console.log(data);
    this._dataListSource.next(data);
  }
}

