import { Component } from '@angular/core';
import { RoleService } from '../../../services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../../../models/Role';
import { MatDialog } from '@angular/material/dialog';
import { RoleModalComponent } from '../../modals/role-modal/role-modal.component';

@Component({
  selector: 'app-card-table-roles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-table-roles.component.html'
})
export class CardTableRolesComponent {

  get color(): string {
    return this._color;
  }
  set color(color: string) {
    this._color = color !== "light" && color !== "dark" ? "light" : color;
  }
  private _color = "light";
  rolesList! : Role[]
  header = ["ID",	"NAME", "CATEGORY",	"SUBCATEGORY", "ACTIONS"]

  constructor(private roleService: RoleService, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {
   this.initRolesList()
  }

  initRolesList(){
    this.roleService.getRoles().subscribe((roles) => {
      if (typeof roles != "boolean"){
        this.rolesList = roles;
      }
    })
  }
  remove(id: number) {
    this.roleService.deleteRole(id.toString()).subscribe(()=>{
      this.initRolesList()
    })
    }
    update(role: Role) {
      this.dialog.open(RoleModalComponent, {
        data: role
      }).afterClosed().subscribe(()=>{this.initRolesList()});
    }
    create() {
      this.dialog.open(RoleModalComponent, {
        data: null
      }).afterClosed().subscribe(()=>{
        this.initRolesList()});
    }
}
