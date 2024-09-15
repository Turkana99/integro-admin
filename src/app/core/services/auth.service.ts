import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { jwtDecode } from 'jwt-decode';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: UserInterface | null = null;

  constructor(private router: Router, private http: HttpClient) {
    this._restore();
  }

  private get user(): UserInterface | null {
    return this._user;
  }

  private set user(value: UserInterface | null) {
    this._user = value;

    if (value) {
      localStorage.setItem('user', JSON.stringify(value));
    } else localStorage.clear();
  }

  public get userInfo() {
    return structuredClone(this._user);
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.loginUrl, { email, password }).pipe(
      map((response) => {
        console.log('RESPONSE', response);
        if (response.error) {
          throw new Error('Login failed');
        }

        console.log(
          'token',
          this.getDecodedAccessToken(response.data.accessToken)
        );

        this.user = this.getDecodedAccessToken(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        this.router.navigate(['/organizations']);
        return response;
      })
    );
  }

  public loginMock(user: UserInterface) {
    this.user = user;
    localStorage.setItem('accessToken', "tokennnnn");
    this.router.navigate(['/main']);
  }

  public logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }

  private _restore() {
    this._user = JSON.parse(
      localStorage.getItem('user') || 'null'
    ) as UserInterface;
  }

  public isTokenExpired(token: string): boolean {
    const decodedToken: any = this.getDecodedAccessToken(token);
    const expiryDate: Date = new Date(decodedToken.exp * 1000);
    const currentDate: Date = new Date();
    return expiryDate < currentDate;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  resetPassword(request: any): Observable<any> {
    return this.http.post<any>(environment.resetPass, request);
  }
}
