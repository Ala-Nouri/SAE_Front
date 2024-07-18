import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FilesService } from '../../services/files.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl,  ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dropbox',
  standalone: true,
  imports: [NgxDropzoneModule, CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './dropbox.component.html',
})
export class DropboxComponent {

  constructor(private fileService : FilesService, private snackBar: MatSnackBar, private router: Router) {}

  files: File[] = [];


  progress = false

onSelect(event: { addedFiles: any; }) {
  this.files.push(...event.addedFiles);
}

onRemove(event: File) {
  this.files.splice(this.files.indexOf(event), 1);
}

upload() {
    this.progress = ! this.progress
    this.fileService.uploadFile(this.files).subscribe((res)=> {
      if (res) {
        this.fileService.extractInfo(this.files).subscribe((data)=>{
          this.router.navigate(['/verify'],{state:{"data":data, "files":this.files}})
            
          }
        )
      } else {
        this.progress = ! this.progress
        this.snackBar.open("An error has occurred, please try again", "OK",{horizontalPosition:"right", duration: 3000})
      }
    })
  }
  
}
