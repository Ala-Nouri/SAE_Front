import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { UsersService } from "../../../services/users.service";
import { User } from "../../../models/user";
import {
  MatDialog,
} from '@angular/material/dialog';
import { UserModalComponent } from "../../modals/user-modal/user-modal.component";
import { AssignRoleModalComponent } from "../../modals/assign-role-modal/assign-role-modal.component";

@Component({
  selector: "app-card-table-user",
  templateUrl: "./card-table-user.component.html",
  standalone: true,
  imports: [ CommonModule]
})
export class CardTableUserComponent {

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  usersList! : User[]
  header = ["PUBLIC_ID",	"FIRSTNAME",	"LASTNAME",	"EMAIL", "ROLES", "ACTIONS"]

  constructor(private userService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initUserList()
  }
  initUserList(){
    this.userService.getUsers().subscribe((users) => {
      if (typeof users != "boolean"){
        this.usersList = users;
      }
    }) 
  }
  create() {
    this.dialog.open(UserModalComponent, {
      data: null
    }).afterClosed().subscribe(()=>{this.initUserList()});
  }
  update(user : User) {
    this.dialog.open(UserModalComponent, {
      data: user
    }).afterClosed().subscribe(()=>{this.initUserList()})
  }
  remove(id: string) {
    this.userService.deleteUser(id).subscribe(()=>{this.initUserList()})
  }
  assign(user: User) {
    this.dialog.open(AssignRoleModalComponent, {
      data: user
    }).afterClosed().subscribe(()=>{this.initUserList()});
    }
}
