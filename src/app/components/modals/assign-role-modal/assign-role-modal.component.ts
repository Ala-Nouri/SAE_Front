import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-assign-role-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './assign-role-modal.component.html',
})
export class AssignRoleModalComponent {
  roleList! : Role[]
  roleForm!: FormGroup
  options!: [{ name:string, checked:boolean }] 

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder, private roleService: RoleService, private userService: UsersService) {}

  ngOnInit(){
    this.roleService.getRoles().subscribe((data) => {
      this.roleList = data;
      this.initRoleForm();
    })
    
  }

  initRoleForm(){
    this.roleForm = this.fb.group({});
    if (this.roleList){
      this.roleList.forEach((role)=>{
        this.roleForm.addControl(role.id.toString(), new FormControl(this.data.roles.includes(role.name)))
      })
    }

  }
   
  assign(){
    let roles = []
    for (let control in this.roleForm.controls){
      if (this.roleForm.controls[control].value){
        roles.push(control)
      }
    }
    this.userService.assignRoleToUser(this.data.public_id, roles).subscribe()

}

}
