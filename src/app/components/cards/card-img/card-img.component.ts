import { Component, Input } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-card-img',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './card-img.component.html',
  styleUrl: './card-img.component.css'
})
export class CardImgComponent {
  @Input() urls : string[] | undefined
  
}
