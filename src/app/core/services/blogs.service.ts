import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getBlogs(req: any): Observable<any> {
    let url = `${environment.blogs}?`;
    let temp = [];
    for (const key of Object.keys(req)) {
      const value = req[key];
      temp.push(`${key}=${value}`);
    }
    url += temp.join('&');

    return this.http.get<any>(url, { observe: 'response' });
  }

  getBlogsInfoById(id: number) {
    return this.http.get<any>(`${environment.blogs}/${id}`, {
      observe: 'response',
    });
  }

  createBlog(req: any) {
    return this.http.post<any>(environment.blogs, req, {
      observe: 'response',
    });
  }

  updateBlogInfo(req: any) {
    return this.http.put<any>(environment.blogs, { observe: 'response' });
  }

  getActiveWithLang(lang: string) {
    return this.http.get<any>(`${environment.blogs}/${lang}`, {
      observe: 'response',
    });
  }
}
