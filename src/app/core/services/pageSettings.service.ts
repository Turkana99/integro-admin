import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageSettingsService {
  constructor(private http: HttpClient) {}

  getPages(req: any): Observable<any> {
    let url = `${environment.pageSettings}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getPageTypesInfo(id: number) {
    return this.http.get<any>(environment.pageSettingsType);
  }

  getPagesInfoById(id: number) {
    return this.http.get<any>(`${environment.pageSettings}/${id}`);
  }

  createPages(req: any): Observable<any> {
    return this.http.post<any>(environment.pageSettings, req);
  }

  getPagesInfoWithId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.pageSettings}/${id}`);
  }

  updatePagesInfo(req: any): Observable<any> {
    return this.http.put<any>(environment.pageSettings, req);
  }

  deletePage(id: number) {
    return this.http.delete<any>(`${environment.pageSettings}/${id}`, {
      observe: 'response',
    });
  }
}
