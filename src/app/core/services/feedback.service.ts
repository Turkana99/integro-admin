import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbacksService {
  constructor(private http: HttpClient) {}

  getFeedbacks(req: any): Observable<any> {
    let url = `${environment.feedbacks}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }


  deleteFeedback(id: number) {
    return this.http.delete<any>(`${environment.feedbacks}/${id}`, {
      observe: 'response',
    });
  }
}
