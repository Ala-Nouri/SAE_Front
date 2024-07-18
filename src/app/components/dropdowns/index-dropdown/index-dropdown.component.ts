import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterModule } from "@angular/router";
import { createPopper } from "@popperjs/core";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-index-dropdown",
  templateUrl: "./index-dropdown.component.html",
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class IndexDropdownComponent implements OnInit {
  constructor(private authService: AuthService) {}
  isAdmin!: Boolean
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;
  ngOnInit() {
    this.isAdmin = this.authService.isAdminUser()
  }
  toggleDropdown(event: { preventDefault: () => void; }) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
      this.createPoppper();
    }
  }
  createPoppper() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }
}
