import { Component, OnInit } from "@angular/core";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { AdminNavbarComponent } from "../../components/navbars/admin-navbar/admin-navbar.component";
import { RouterModule } from "@angular/router";


@Component({
  selector: "app-admin",
  standalone: true,
  imports:[SidebarComponent, AdminNavbarComponent, RouterModule,],
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
