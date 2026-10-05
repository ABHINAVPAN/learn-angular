import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registration, RegistrationPayload } from './user-registration.model';

@Injectable({ providedIn: 'root' })
export class UserRegistrationService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/registrations';

  getAll(): Observable<Registration[]> {
    return this.http.get<Registration[]>(this.apiUrl);
  }

  create(registration: RegistrationPayload): Observable<Registration> {
    return this.http.post<Registration>(this.apiUrl, registration);
  }

  update(id: number, registration: RegistrationPayload): Observable<Registration> {
    return this.http.put<Registration>(`${this.apiUrl}/${id}`, registration);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}