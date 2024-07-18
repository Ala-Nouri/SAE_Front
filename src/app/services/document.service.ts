import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Document } from '../models/Document';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://127.0.0.1:5000/api/documents';
  
  constructor(private http: HttpClient, private electronService: ElectronService) { }

  createDocument(data: any){
    return this.http.post(`${this.apiUrl}`, data).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((error: any) => {
        console.log(error)
        return of(false);
      })
    );
  }

  getAllDocuments(){
    return this.http.get(`${this.apiUrl}`).pipe(
      map((resp: any) => {
        return resp;
        }),
        catchError((error: any) => {
          return of (false)
        })
    )
  }

  getDocumentById(id: string){
    return this.http.get(`${this.apiUrl}/${id}`).pipe(
      map((resp: any) => {
        return resp as Document;
        }),
        catchError((error: any) => {
          return of (false)
        })
    )
  }

  deleteDocument(id: string, path: string, filename: string){
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map((resp: any) => {
        let ipcRenderer = this.electronService.getIpcRenderer()
        ipcRenderer.delete(
          {properties: {
          directory: path,
          filename : filename
        }})
        return true;
        }),
        catchError((error: any) => {
          console.log(error)
          return of (false)
        })
    )
  }

  search(key: string){
    return this.http.post(`${this.apiUrl}/search`,{"key":key}).pipe(
      map((resp: any) => {
        return resp as Document[];
      }),
      catchError((error: any) => {
        return of (false)
      })
    )
  }

  archive(id: string){
    return this.http.put(`${this.apiUrl}/archive/${id}`,null).pipe(
      map((resp: any) => {
        return resp;
        }),
      catchError((error: any) => {
        return of (false)
      })
    )
  }
}
