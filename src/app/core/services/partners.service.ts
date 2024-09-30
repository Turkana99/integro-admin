import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartnersService {
  constructor(private http: HttpClient) {}

  getPartners(req: any): Observable<any> {
    let url = `${environment.partners}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getPartnersInfoById(id: number) {
    return this.http.get<any>(`${environment.partners}/${id}`, {
      observe: 'response',
    });
  }

  createPartner(req: any): Observable<any> {
    return this.http.post<any>(environment.partners, req);
  }

  updatePartnerInfo(req: any): Observable<any> {
    return this.http.put<any>(environment.partners, req);
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.partners}/${lang}`, {
      observe: 'response',
    });
  }
  deletePartner(id: number) {
    return this.http.delete<any>(`${environment.partners}/${id}`, {
      observe: 'response',
    });
  }
}
