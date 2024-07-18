import { Component, ViewChild } from '@angular/core';
import { CardTableDocumentsComponent } from '../../components/cards/card-table-documents/card-table-documents.component';
import { IndexNavbarComponent } from '../../components/navbars/index-navbar/index-navbar.component';
import { CardFilterComponent } from '../../components/cards/card-filter/card-filter.component';
import { DocumentFilter } from '../../models/DocumentFilter';

@Component({
  selector: 'app-user-documents',
  standalone: true,
  imports: [CardTableDocumentsComponent, IndexNavbarComponent, CardFilterComponent],
  templateUrl: './user-documents.component.html',
})
export class UserDocumentsComponent {


  @ViewChild(CardTableDocumentsComponent) child!:CardTableDocumentsComponent;

  filter(data: DocumentFilter){
    this.child.filter(data);
  }
  search(key: string){
    this.child.search(key);
  }

}
