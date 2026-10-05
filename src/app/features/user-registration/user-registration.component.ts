import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserRegistrationService } from './user-registration.service';
import { Registration, RegistrationPayload } from './user-registration.model';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css',
})
export class UserRegistrationComponent {
  private readonly registrationsApi = inject(UserRegistrationService);

  registrations: Registration[] = [];
  form: RegistrationPayload = this.emptyForm();
  editingId: number | null = null;
  isLoading = true;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.registrationsApi.getAll().subscribe({
      next: (registrations) => {
        this.registrations = registrations;
        this.isLoading = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.messageFor(error);
        this.isLoading = false;
      },
    });
  }

  save(): void {
    const payload: RegistrationPayload = {
      firstName: this.form.firstName.trim(),
      lastName: this.form.lastName.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
      course: this.form.course,
    };
    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const request = this.editingId === null
      ? this.registrationsApi.create(payload)
      : this.registrationsApi.update(this.editingId, payload);

    request.subscribe({
      next: (saved) => {
        if (this.editingId === null) {
          this.registrations = [saved, ...this.registrations];
          this.successMessage = 'Registration added.';
        } else {
          this.registrations = this.registrations.map((item) => item.id === saved.id ? saved : item);
          this.successMessage = 'Registration updated.';
        }
        this.cancelEdit();
        this.isSaving = false;
      },
      error: (error: unknown) => {
        this.errorMessage = this.messageFor(error);
        this.isSaving = false;
      },
    });
  }

  edit(registration: Registration): void {
    this.editingId = registration.id;
    this.form = {
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      phone: registration.phone,
      course: registration.course,
    };
    this.errorMessage = '';
    this.successMessage = '';
  }

  delete(registration: Registration): void {
    if (!window.confirm(`Delete the registration for ${registration.firstName} ${registration.lastName}?`)) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.registrationsApi.delete(registration.id).subscribe({
      next: () => {
        this.registrations = this.registrations.filter((item) => item.id !== registration.id);
        this.successMessage = 'Registration deleted.';
        if (this.editingId === registration.id) {
          this.cancelEdit();
        }
      },
      error: (error: unknown) => this.errorMessage = this.messageFor(error),
    });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  private emptyForm(): RegistrationPayload {
    return { firstName: '', lastName: '', email: '', phone: '', course: '' };
  }

  private messageFor(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.message ?? 'Could not reach the registration API. Check that the Spring Boot server is running.';
    }
    return 'Something went wrong. Please try again.';
  }
}