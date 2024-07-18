import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:5000/api/auth';

  private isAuthenticated = false;
  private authSecretKey = 'Bearer Token';
  private jwtHelper = new JwtHelperService();
  
constructor(private http: HttpClient) {
  this.isAuthenticated = !!sessionStorage.getItem(this.authSecretKey);
}

  login(email: string, password: string, remember: boolean): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/signin`, { 'email': email, 'password': password, 'remember': remember }).pipe(
      map((resp: any) => {
        sessionStorage.setItem(this.authSecretKey, resp.token);
        this.isAuthenticated = true;
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  signup(companyName: string, firstName: string, lastName: string, email: string, password: string): Observable<boolean>  {
    return this.http.post(`${this.apiUrl}/signup`, {'company_name': companyName,'firstname': firstName, 'lastname': lastName,'email': email, 'password': password}).pipe(
      map((resp: any) => {
        return true
      }),
      catchError((error: any) => {
        return of(false)
      })
    )
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.authSecretKey)
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isAdminUser() : boolean {
    const token = this.getToken()
    if (token) {
      return this.jwtHelper.decodeToken(token)['isAdmin']
    }
    return false
  }

  logout(): void {
    sessionStorage.removeItem(this.authSecretKey);
    this.isAuthenticated = false;
  }
}
