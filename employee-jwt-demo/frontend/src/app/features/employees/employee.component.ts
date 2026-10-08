import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  private readonly employeesApi = inject(EmployeeService);

  employees: Employee[] = [];
  form: Partial<Employee> = this.emptyForm();
  editingId: number | null = null;
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeesApi.getAll().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.messageFor(error);
        this.isLoading = false;
      },
    });
  }

  save(): void {
    const payload = {
      ...this.form,
      salary: Number(this.form.salary ?? 0),
      hireDate: this.form.hireDate ?? new Date().toISOString().slice(0, 10),
    };

    const request = this.editingId === null
      ? this.employeesApi.create(payload)
      : this.employeesApi.update(this.editingId, payload);

    request.subscribe({
      next: () => {
        this.successMessage = this.editingId === null ? 'Employee added.' : 'Employee updated.';
        this.cancelEdit();
        this.loadEmployees();
      },
      error: (error: unknown) => {
        this.errorMessage = this.messageFor(error);
      },
    });
  }

  edit(employee: Employee): void {
    this.editingId = employee.id;
    this.form = { ...employee };
  }

  delete(employee: Employee): void {
    this.employeesApi.delete(employee.id).subscribe({
      next: () => {
        this.successMessage = 'Employee deleted.';
        this.loadEmployees();
      },
      error: (error: unknown) => {
        this.errorMessage = this.messageFor(error);
      },
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  private emptyForm(): Partial<Employee> {
    return {
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      salary: 0,
      status: 'ACTIVE',
      hireDate: new Date().toISOString().slice(0, 10),
    };
  }

  private messageFor(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.message ?? 'Could not reach the employee API.';
    }
    return 'Something went wrong.';
  }
}
