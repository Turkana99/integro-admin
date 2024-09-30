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

  createMember(req: any): Observable<any> {
    return this.http.post<any>(environment.employees, req);
  }

  getMemberInfoWithId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.employees}/${id}`);
  }

  updateMemberInfo(req: any): Observable<any> {
    return this.http.put<any>(environment.employees, req);
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.employees}/${lang}`, {
      observe: 'response',
    });
  }

  deleteMember(id: number) {
    return this.http.delete<any>(`${environment.employees}/${id}`, {
      observe: 'response',
    });
  }
}
