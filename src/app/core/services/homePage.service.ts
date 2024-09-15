import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  constructor(private http: HttpClient) {}
  getHomePageInfo(req: any): Observable<any> {
    let url = `${environment.getHomePages}?`;

    for (const key of Object.keys(req)) {
      const value = req[key];
      url += `${key}=${value}&`;
    }

    return this.http.get<any>(url, { observe: 'response' }).pipe(
      map((response) => {
        const totalData = JSON.parse(
          response.headers.get('x-pagination') as string
        ).TotalData;
        response.body.TotalData = totalData;
        return response.body;
      })
    );
  }
}
