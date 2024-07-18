import { Component, Input } from '@angular/core';
import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer";
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-pdf-view',
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  templateUrl: './pdf-view.component.html',
})
export class PdfViewComponent {
  @Input ({required:true}) url : string | undefined
  pdfURL!: any

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(){
    if(this.url)
     this.pdfURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.url) 
  }
  

}
