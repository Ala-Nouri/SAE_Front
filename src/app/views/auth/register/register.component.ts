import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  standalone:true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private fb : FormBuilder, private router: Router, private snackBar: MatSnackBar) {}
  signupForm : any
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      companyName : ['', Validators.required],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required], 
      email : ['', [Validators.required, Validators.email]], 
      password : ['', Validators.required]  
    })
  }

  signup(){
    if (this.signupForm.valid) {
      this.authService.signup(
        this.signupForm.value.companyName,
        this.signupForm.value.firstName,
        this.signupForm.value.lastName,
        this.signupForm.value.email,
        this.signupForm.value.password
      ).subscribe((success) => {
        if (success) {
          this.router.navigate([''])
        } else {
          this.snackBar.open("An error occuired, please retry", "OK",{horizontalPosition:"right", duration: 3000})
        }
      })
    }
    else {
      this.snackBar.open("Please verify your inputs", "OK",{horizontalPosition:"right", duration: 3000})
    }
  }

}
