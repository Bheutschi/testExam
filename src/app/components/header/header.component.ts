import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
      public usersService: UsersService,
      public router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClicked(): void {
    this.usersService.logout();
    this.router.navigate(['/']);
  }

}
