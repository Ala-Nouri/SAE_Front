import { Component } from '@angular/core';
import { IndexNavbarComponent } from '../../components/navbars/index-navbar/index-navbar.component';
import { RouterModule } from '@angular/router';
import { CardImgComponent } from '../../components/cards/card-img/card-img.component';
import { CardFormComponent } from '../../components/cards/card-form/card-form.component';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [IndexNavbarComponent, RouterModule, CardImgComponent, CardFormComponent],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {
  imgs: string[] = [];
  data : any

  constructor() {}

  ngOnInit(){
    const blobs: Blob[] = []
    history.state.files.forEach((file: File) => blobs.push(new Blob([file])))
    blobs.forEach((blob)=> this.imgs.push(window.URL.createObjectURL(blob))) ;
    this.data = history.state.data
  }

}
