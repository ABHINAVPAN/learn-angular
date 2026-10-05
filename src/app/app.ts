import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly auth = inject(AuthService);
  protected readonly title = signal('learn-angular');

  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }
}
