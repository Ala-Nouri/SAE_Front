import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogService } from '../../../services/log.service';
import { Log } from '../../../models/Log';

@Component({
  selector: 'app-card-table-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-table-logs.component.html',
})
export class CardTableLogsComponent {
  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  logsList! : Log[]
  header =["DATE",	"MESSAGE"]

  constructor(private logService: LogService) {}

  ngOnInit(){
    this.initLogList()
  }

  initLogList(){
    this.logService.getLogs().subscribe((resp)=>{
      console.log(resp)
      this.logsList = resp.slice().reverse();
    })
  }

  
}
