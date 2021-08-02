import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/users/user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  userName: string = "Anonymous";
  avatar: string = "assets/images/avt.jpg";
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getCurrentLoginUser();
    this.userName = this.user
  }

}
