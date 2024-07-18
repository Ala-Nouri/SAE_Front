import { Component, Input } from '@angular/core';
import { Document } from '../../../models/Document';
import { DocumentService } from '../../../services/document.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FilesService } from '../../../services/files.service';
import { DocumentFilter } from '../../../models/DocumentFilter';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-card-table-documents',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './card-table-documents.component.html',
})
export class CardTableDocumentsComponent {
  @Input({required:true}) isAdmin : Boolean | undefined

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  docsList! : Document[]
  filteredDocList! : Document[]
  header =["DOCUMENT ID",	"FILE NAME",	"UPLOAD DATE",	"CREATED BY",	"FILE PATH", "ACTIONS"]

  constructor(private documentService: DocumentService, private fileService: FilesService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
   this.initDocList()
  }

  initDocList(){
    this.documentService.getAllDocuments().subscribe((docs) => {
      if (typeof docs != "boolean"){
        this.docsList = docs;
        this.filteredDocList = this.docsList;
      }
    })
  }

  remove(doc: Document) {
    this.documentService.deleteDocument(doc.document_id.toString(), doc.file_path, doc.file_name).subscribe((res)=>{
      if (res){
        this.initDocList()
      }
      else {
        this.snackBar.open("An error has occured, please try again", "OK",{horizontalPosition:"right", duration: 3000})
      }
    })
    }

    archive(doc: Document) {
      this.documentService.archive(doc.document_id.toString()).subscribe((res)=>{
        if (res){
          this.initDocList()
        }
        else {
          this.snackBar.open("An error has occured, please try again", "OK",{horizontalPosition:"right", duration: 3000})
        }
      })
      }

    async view(doc: Document) {
      await this.fileService.view(doc.document_id.toString(),doc.file_path,doc.file_name).then((url)=>{
        this.router.navigate(["/landing"],{state:{url:url}})
      })
          
      }

      filter(data: DocumentFilter){
        this.filteredDocList = this.docsList.filter(item => {
          let matches = true;
          
          // Check each property based on filter criteria
          for (const key in data) {
            if(key == 'created_by' && item.created_by.public_id == data.created_by){
                break;
            }
            else if (data[key as keyof DocumentFilter] && data[key as keyof DocumentFilter] !== 'All') {
              if (item[key as keyof Document] !== data[key as keyof DocumentFilter]) {
                matches = false;
                break;
              }
            }
          }
          return matches;
        });
      }
    search(key:string){
      if (key != ""){
        this.documentService.search(key).subscribe((docs) => {
          if (typeof docs != "boolean"){
            this.filteredDocList = docs;
          }
        })
      }
      else{
        this.filteredDocList = this.docsList;
      }
    }
}
