import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getMembers(req: any): Observable<any> {
    let url = `${environment.employees}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getMembersInfoById(id: number) {
    return this.http.get<any>(`${environment.employees}/${id}`, {
      observe: 'response',
    });
  }

  createMember(req: any) {
    let form = new FormData();
    for (const key of Object.keys(req)) {
      form.append(key, req[key]);
    }
    return this.http.post<any>(environment.employees, form, {
      observe: 'response',
    });
  }

  updateMemberInfo(req: any) {
    return this.http.put<any>(environment.employees, { observe: 'response' });
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.employees}/${lang}`, {
      observe: 'response',
    });
  }
}
