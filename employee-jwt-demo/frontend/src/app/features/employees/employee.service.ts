import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/api/employees');
  }

  create(payload: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>('/api/employees', payload);
  }

  update(id: number, payload: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`/api/employees/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/employees/${id}`);
  }
}
