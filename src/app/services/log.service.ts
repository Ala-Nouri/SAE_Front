import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://127.0.0.1:5000/api/logs';

  constructor(private http: HttpClient) { }

  getLogs():Observable<any>{
    return this.http.get(`${this.apiUrl}`).pipe(
      map((resp: any) => {
        return resp as Log[];
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }
}
