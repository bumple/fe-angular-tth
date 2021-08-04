import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ICategory} from "../../interface/icategory";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  category: ICategory[] = [];

  constructor(protected http: HttpClient,
              protected toastr: ToastrService) {
  }

  getAllCategories(): Observable<any> {
    return this.http.get(environment.url + '/auth/category')
  }

  store(category: ICategory): Observable<any> {
    this.toastr.success('Add new category success')
    return this.http.post(environment.url + '/auth/category', category)
  }

  findById(id: any){
    return this.http.get(environment.url + '/auth/category/' + id);
  }

  update(id: any,category: ICategory){
    this.toastr.success('Update successfully')
    return this.http.put(environment.url + '/auth/category/' + id,category);
  }

  delete(id:number){
    this.toastr.warning('Delete successfully')
    return this.http.delete(`${environment.url}/auth/category/${id}`);
  }

  cateStatisticToday(id:number){
    return this.http.get(`${environment.url}/auth/statistics/${id}`)
  }
}


