import { Component, OnInit, ViewChild } from "@angular/core";
import { CardTableDocumentsComponent } from "../../../components/cards/card-table-documents/card-table-documents.component";
import { CardFilterComponent } from "../../../components/cards/card-filter/card-filter.component";
import { DocumentFilter } from "../../../models/DocumentFilter";

@Component({
  selector: "app-settings",
  templateUrl: "./documents.component.html",
  standalone: true,
  imports: [CardTableDocumentsComponent, CardFilterComponent]
})
export class DocumentsComponent implements OnInit {

  @ViewChild(CardTableDocumentsComponent) child!:CardTableDocumentsComponent;

  constructor() {}

  ngOnInit(): void {}

  filter(data: DocumentFilter){
    this.child.filter(data);
  }

  search(key: string){
    this.child.search(key);
  }
}
