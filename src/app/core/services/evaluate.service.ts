import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvaluateService {
  constructor(private http: HttpClient) {}

  getEvaluations(req: any): Observable<any> {
    let url = `${environment.evaluate}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  deleteEvaluation(id: number) {
    return this.http.delete<any>(`${environment.evaluate}/${id}`, {
      observe: 'response',
    });
  }

  getEvaluationById(id: number) {
    return this.http.get<any>(`${environment.evaluate}/${id}`);
  }
}
