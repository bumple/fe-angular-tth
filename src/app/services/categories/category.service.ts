import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(protected http: HttpClient) { }

  getAllCategories():Observable<any>{
    return this.http.get(environment.url + '/auth/category')
  }

}
