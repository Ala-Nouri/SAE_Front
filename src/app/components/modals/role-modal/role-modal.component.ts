import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/Role';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PropertiesFactory } from '../../../utils/properties-factory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role-modal.component.html'
})
export class RoleModalComponent {

  title! :string
  action! :string
  roleForm! : FormGroup
  categories = ['All','Administrative','Financial','Human Resources','Technical']
  subcategories = ['All'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Role, private fb: FormBuilder, private roleService: RoleService, private propertiesFactory: PropertiesFactory) {}

  ngOnInit(){
    if (this.data){
      this.title = `Update ${this.data.name} role infos`
      this.action ="Update"
      this.initUpdateForm()
    }
    else {
      this.title = "Create new role"
      this.action = "Create"
      this.initCreateForm()

    }
  }

  initCreateForm(){
    this.roleForm = this.fb.group({
      name : new FormControl('', Validators.required),
      category : new FormControl('All', Validators.required),
      subcategory : new FormControl('All', Validators.required)
      
    })
  }
  initUpdateForm(){
    this.roleForm = this.fb.group({
      name : new FormControl(this.data.name, Validators.required),
      category : new FormControl(this.data.category, Validators.required),
      subcategory : new FormControl(this.data.subcategory, Validators.required)
      
    })
    this.updateSubcategoriesList()
  }

  updateSubcategoriesList() {
    this.subcategories = ['All', ...this.propertiesFactory.getProperties(this.roleForm.controls['category'].value)];
    }

  validate(){
    if (this.action === "Create"){
      console.log(this.action)
      if (this.roleForm.valid){
        let name = this.roleForm.controls["name"].value
        let category = this.roleForm.controls["category"].value
        let subcategory = this.roleForm.controls["subcategory"].value
        this.roleService.createRole(name, category, subcategory).subscribe()
      }
    }
    if (this.action === "Update"){
      console.log(this.action)
      if (this.roleForm.valid){
        let name = this.roleForm.controls["name"].value
        let category = this.roleForm.controls["category"].value
        let subcategory = this.roleForm.controls["subcategory"].value
        this.roleService.updateRole(name, category, subcategory, this.data.id.toString()).subscribe() 
      }
    }
  }
}


