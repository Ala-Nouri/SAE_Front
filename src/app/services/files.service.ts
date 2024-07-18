import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ElectronService } from './electron.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private apiUrl = 'http://127.0.0.1:5000/api/files';


  constructor(private http: HttpClient, private electronService: ElectronService) { }

  uploadFile(files: File[]): Observable<boolean> {
    const formData = new FormData();
    files.forEach((file)=> formData.append('files', file));
    return this.http.post(`${this.apiUrl}/upload`, formData).pipe(
      map((resp: any) => {
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }


  extractInfo(files: File[]): Observable<any> {
    let filenames:string[] =[]
    files.forEach((file)=> filenames.push(file.name))
    return this.http.post(`${this.apiUrl}/process`, {"files":filenames}).pipe(
      map((resp : any)=>{
        return resp
      }),
      catchError((error: any) => {
        return of(false);
      })
    )
  }

  downloadFile(id: string, path:string, filename: string){
  let url = `${this.apiUrl}/download/${id}`;
  let ipcRenderer = this.electronService.getIpcRenderer()
  ipcRenderer.download({
    url: url,
    properties: {
      directory: path,
      filename : filename
    }
    });
  }

  async view(id: String, path: String, filename: String){
    let ipcRenderer = this.electronService.getIpcRenderer()
    let blob = await ipcRenderer.fetch({
      properties: {
        directory: path,
        filename : filename
      }
      })
    let file = new File([blob], filename.toString())
    let decryptionResult = await this.decrypt(id, file).toPromise();
    return(decryptionResult)
    
    
  }

  decrypt(id: String, file: File) {
    const formData = new FormData();
    formData.append('file',file);
    return this.http.post(`${this.apiUrl}/decrypt/${id}`, formData).pipe(
      map((resp : any)=>{
        return `${this.apiUrl}/download/${id}`
      }),
      catchError((error: any) => {
        return of(false)
      })
    );
  }
}
