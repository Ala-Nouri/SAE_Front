import { Component, OnInit } from "@angular/core";
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";
import { RouterModule } from "@angular/router";
import { DropboxComponent } from "../../components/dropbox/dropbox.component";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  standalone: true,
  imports: [IndexNavbarComponent, RouterModule, DropboxComponent]
})
export class IndexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
