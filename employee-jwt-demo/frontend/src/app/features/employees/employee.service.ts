import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/api/employees');
  }

  create(payload: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>('http://localhost:8080/api/employees', payload);
  }

  update(id: number, payload: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`http://localhost:8080/api/employees/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/employees/${id}`);
  }
}
