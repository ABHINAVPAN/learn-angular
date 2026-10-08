import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'employee-demo-token';
  readonly isAuthenticated = signal(this.getToken() !== null);

  login(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/login', payload).pipe(
      tap((response) => {
        sessionStorage.setItem(this.storageKey, response.token);
        this.isAuthenticated.set(true);
      }),
    );
  }

  register(payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8080/api/auth/register', payload).pipe(
      tap((response) => {
        sessionStorage.setItem(this.storageKey, response.token);
        this.isAuthenticated.set(true);
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.storageKey);
  }
}
