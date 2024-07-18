import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { IndexDropdownComponent } from "../../dropdowns/index-dropdown/index-dropdown.component";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
  standalone: true,
  imports: [RouterModule, CommonModule, IndexDropdownComponent]
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  logout(){
    this.authservice.logout()
    this.router.navigate(['/auth'])
  }
}
