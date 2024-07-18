import { Component } from '@angular/core';
import { CardTableLogsComponent } from '../../../components/cards/card-table-logs/card-table-logs.component';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CardTableLogsComponent],
  templateUrl: './logs.component.html',
})
export class LogsComponent {

}
