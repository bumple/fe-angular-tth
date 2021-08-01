import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ICategory} from "../../interface/icategory";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category: ICategory[] = [];

  constructor(protected http: HttpClient) {
  }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.url + '/auth/category')
  }

  store(category: ICategory): Observable<any> {
    return this.http.post(environment.url + '/auth/category', category)
  }

  findById(id: any){
    return this.http.get(environment.url + '/auth/category/' + id);
  }

  update(id: any,category: ICategory){
    return this.http.put(environment.url + '/auth/category/' + id,category);
  }
}


