import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class OurServicesService {
  constructor(private http: HttpClient) {}

  getServices(req: any): Observable<any> {
    let url = `${environment.services}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getServiceInfoById(id: number) {
    return this.http.get<any>(`${environment.services}/${id}`, {
      observe: 'response',
    });
  }

  createServiceInfo(req: any) {
    return this.http.post<any>(environment.services, req, {
      observe: 'response',
    });
  }

  updateServiceInfo(req: any) {
    return this.http.put<any>(environment.services, { observe: 'response' });
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.services}/${lang}`, {
      observe: 'response',
    });
  }

  deleteService(id: number) {
    return this.http.delete<any>(`${environment.services}/${id}`, {
      observe: 'response',
    });
  }
}
