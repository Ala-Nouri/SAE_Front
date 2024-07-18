import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, MatSnackBarModule]
})
export class LoginComponent implements OnInit {
  constructor(private authService : AuthService, private fb : FormBuilder, private router: Router, private snackBar: MatSnackBar) {}
  loginForm:any
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
      remember: ['']
    })
  }

  signin(){
    if (this.loginForm.valid) {
      let remember = this.loginForm.value.remember ? true : false
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password, remember).subscribe(
      (resp)=>{
        if (resp) {
          this.router.navigate([''])
        }
        else {
          this.snackBar.open("Please verify your credentials", "OK",{horizontalPosition:"right", duration: 3000})
        }
      }
    )
    } else {
      this.snackBar.open("Please verify your inputs", "OK",{horizontalPosition:"right", duration: 3000})
    }
    
  }
}

