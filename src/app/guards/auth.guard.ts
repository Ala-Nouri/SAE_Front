import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next : ActivatedRouteSnapshot): boolean {
    return this.checkAuth(next);
  }
  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticatedUser()) {
      if (route.data["role"] && route.data["role"] != this.authService.isAdminUser()){
        return false;
      }
      return true
      
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}