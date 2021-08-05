import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.css']
})
export class LayoutsComponent implements OnInit {

  constructor(protected router: Router) {
    this.router.navigate(['statistics'])
  }

  ngOnInit(): void {

  }



}
