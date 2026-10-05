import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
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
  private readonly apiUrl = 'http://localhost:8080/api/auth';
  private readonly storageKey = 'learn-angular-auth-token';
  readonly isAuthenticated = signal(this.getToken() !== null);

  getToken(): string | null {
    return sessionStorage.getItem(this.storageKey);
  }

  login(payload: AuthPayload): Observable<AuthResponse> {
    return this.authenticate(`${this.apiUrl}/login`, payload);
  }

  register(payload: AuthPayload): Observable<AuthResponse> {
    return this.authenticate(`${this.apiUrl}/register`, payload);
  }

  logout(): void {
    sessionStorage.removeItem(this.storageKey);
    this.isAuthenticated.set(false);
  }

  private authenticate(url: string, payload: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(url, payload).pipe(
      tap((response) => {
        sessionStorage.setItem(this.storageKey, response.token);
        this.isAuthenticated.set(true);
      }),
    );
  }
}