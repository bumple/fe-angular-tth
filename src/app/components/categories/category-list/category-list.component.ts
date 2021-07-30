import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/categories/category.service";
import {ICategory} from "../../../interface/icategory";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(protected categoryService: CategoryService) { }
  categories: ICategory[] =[];
  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(res => {
      console.log(res);
      this.categories = res.data;
    })
  }

}
