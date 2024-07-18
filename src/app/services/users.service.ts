import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://127.0.0.1:5000/api/users';

  constructor(private http: HttpClient) { }


  getUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}`).pipe(
      map((resp: any) => {
        return resp as User[];
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  createUser(firstName: string, lastName: string, email: string, password: string):Observable<any>{
    return this.http.post(`${this.apiUrl}`,{'firstname': firstName, 'lastname': lastName,'email': email, 'password': password}).pipe(
      map((resp: any) => {
        return resp.status == 200
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }

  updateUser(firstName: string, lastName: string, email: string, password: string, id:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,{'firstname': firstName, 'lastname': lastName,'email': email, 'password': password}).pipe(
      map((resp: any) => {
        console.log(resp)
        return true
      }),
      catchError((error: any) => {
        console.log(error)
        return of(false);
      })
    )
  }

  deleteUser(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((resp: any) => {
        console.log("serv")
        console.log(resp)
        return true
      }),
      catchError((error: any) => {
        console.log(error)
        return of(false);
      })
    )
  }

  assignRoleToUser(id: string, roles:string[]):Observable<any>{
    return this.http.post(`${this.apiUrl}/assign/${id}`,{"roles": roles}).pipe(
      map((resp: any) => {
        return true
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }
}
