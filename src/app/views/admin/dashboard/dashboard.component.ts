import { Component } from "@angular/core";
import { CardTableUserComponent } from "../../../components/cards/card-table-user/card-table-user.component";


@Component({
  selector: "app-dashboard",
  standalone: true,
  imports:[CardTableUserComponent],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent {

  constructor() {}

  ngOnInit() {
    
  }
}
