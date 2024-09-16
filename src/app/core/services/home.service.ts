import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getHomePageInfo(req: any): Observable<any> {
    let url = `${environment.homePages}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  createPageInfo(req: any) {
    let form = new FormData();
    for (const key of Object.keys(req)) {
      form.append(key, req[key]);
    }
    return this.http.post<any>(environment.homePages, form, {
      observe: 'response',
    });
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.homePages}/${lang}`, {
      observe: 'response',
    });
  }

  getHomePageInfoWithId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.homePages}/${id}`);
  }

  editHomePageInfo(req: any): Observable<any> {
    return this.http.put<any>(environment.homePages, req);
  }
  
  addHomePageInfo(req: any): Observable<any> {
    return this.http.post<any>(environment.homePages, req);
  }
}
