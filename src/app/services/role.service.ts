import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://127.0.0.1:5000/api/roles';

  constructor(private http: HttpClient) { }

  getRoles():Observable<any>{
    return this.http.get(`${this.apiUrl}`).pipe(
      map((resp: any) => {
        return resp as Role[];
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  createRole(name: string, category: string, subcategory: string):Observable<any>{
    return this.http.post(`${this.apiUrl}`,{'name': name, 'category': category,'subcategory': subcategory}).pipe(
      map((resp: any) => {
        return resp.status == 200
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }

  updateRole(name: string, category: string, subcategory: string, id:string):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,{'name': name, 'category': category,'subcategory': subcategory}).pipe(
      map((resp: any) => {
        return true
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }

  deleteRole(id: string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((resp: any) => {
        return true
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }
}
