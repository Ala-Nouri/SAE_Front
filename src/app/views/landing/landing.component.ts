import { Component, OnInit } from "@angular/core";
import { PdfViewComponent } from "../../components/pdf-view/pdf-view.component";
import { IndexNavbarComponent } from "../../components/navbars/index-navbar/index-navbar.component";
import { Document } from "../../models/Document";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  standalone: true,
  imports: [PdfViewComponent, IndexNavbarComponent]
})
export class LandingComponent implements OnInit {
  url! : string
  filename! : string
  constructor() {}

  ngOnInit(): void {
    this.url = history.state.url
    this.filename = history.state.filename
  }
}
