import { Component, OnInit } from "@angular/core";
import { AuthNavbarComponent } from "../../components/navbars/auth-navbar/auth-navbar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [AuthNavbarComponent, RouterModule],
  templateUrl: "./auth.component.html",
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
