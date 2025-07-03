import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.baseUrl}/users/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  register(data: { email: string; password: string; roleId: number }): Observable<any> {
    // Solo enviamos las propiedades necesarias
    const payload = {
      email: data.email,
      password: data.password,
      roleId: data.roleId,
    };
    return this.http.post(`${this.baseUrl}/users/register`, payload);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
