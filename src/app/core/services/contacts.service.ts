import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  getContacts(req: any): Observable<any> {
    let url = `${environment.contacts}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getContactsInfoById(id: number) {
    return this.http.get<any>(`${environment.contacts}/${id}`, {
      observe: 'response',
    });
  }

  createContact(req: any) {
    return this.http.post<any>(environment.contacts, req, {
      observe: 'response',
    });
  }

  updateContactsInfo(req: any) {
    return this.http.put<any>(environment.contacts, { observe: 'response' });
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.contacts}/${lang}`, {
      observe: 'response',
    });
  }
}
