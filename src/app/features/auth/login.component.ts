import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPayload, AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  mode: 'login' | 'register' = 'login';
  form: AuthPayload = { email: '', password: '' };
  isSubmitting = false;
  errorMessage = '';

  submit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';
    const request = this.mode === 'login' ? this.auth.login(this.form) : this.auth.register(this.form);
    request.subscribe({
      next: () => void this.router.navigate(['/user-registration']),
      error: (error: unknown) => {
        this.errorMessage = error instanceof HttpErrorResponse
          ? error.error?.message ?? error.error?.detail ?? 'Could not connect to the authentication service.'
          : 'Something went wrong. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}