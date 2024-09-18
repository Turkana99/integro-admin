import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  getAboutPageInfo(req: any): Observable<any> {
    let url = `${environment.about}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }


  getAboutInfoWithId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.about}/${id}`);
  }

  editAboutPageInfo(req: any): Observable<any> {
    return this.http.put<any>(environment.about, req);
  }

  addAboutPageInfo(req: any): Observable<any> {
    return this.http.post<any>(environment.about, req);
  }

  deleteAboutPageInfo(id: number) {
    return this.http.delete<any>(`${environment.about}/${id}`);
  }
}
