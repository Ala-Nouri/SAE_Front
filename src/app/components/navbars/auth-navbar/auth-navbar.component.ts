import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-auth-navbar",
  standalone: true,
  templateUrl: "./auth-navbar.component.html",
  imports: [RouterModule, CommonModule]
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor() {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
}
