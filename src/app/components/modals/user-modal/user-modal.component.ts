import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent {
  title! :string
  action! :string
  userForm! : FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private fb: FormBuilder, private userService: UsersService) {}

  ngOnInit(){
    if (this.data){
      this.title = `Update ${this.data.firstName} ${this.data.lastName} infos`
      this.action ="Update"
      this.initUpdateForm()
    }
    else {
      this.title = "Create new user"
      this.action = "Create"
      this.initCreateForm()

    }
  }

  initCreateForm(){
    this.userForm = this.fb.group({
      firstname : new FormControl('', Validators.required),
      lastname : new FormControl('', Validators.required),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', Validators.required)
    })
  }
  initUpdateForm(){
    this.userForm = this.fb.group({
      firstname : new FormControl(this.data.firstName, Validators.required),
      lastname : new FormControl(this.data.lastName, Validators.required),
      email : new FormControl(this.data.email, [Validators.required, Validators.email]),
      password : new FormControl('')
    })
  }

  validate(){
    if (this.action === "Create"){
      if (this.userForm.valid){
        let firstName = this.userForm.controls["firstname"].value
        let lastName = this.userForm.controls["lastname"].value
        let email = this.userForm.controls["email"].value
        let password = this.userForm.controls["password"].value
        this.userService.createUser(firstName, lastName, email, password).subscribe()
      }
    }
    if (this.action === "Update"){
      if (this.userForm.valid){
        let firstName = this.userForm.controls["firstname"].value
        let lastName = this.userForm.controls["lastname"].value
        let email = this.userForm.controls["email"].value
        let password = this.userForm.controls["password"].value
        this.userService.updateUser(firstName, lastName, email, password, this.data.public_id).subscribe()
      }
    }
  }
}
