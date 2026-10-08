import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="topbar">
      <div class="brand">Employee JWT Demo</div>
      <nav>
        @if (auth.isAuthenticated()) {
          <a routerLink="/employees">Employees</a>
          <button type="button" (click)="logout()">Logout</button>
        } @else {
          <a routerLink="/login">Login</a>
        }
      </nav>
    </header>
    <router-outlet />
  `,
  styles: [
    `
      .topbar { display:flex; justify-content:space-between; align-items:center; padding: 1rem 1.5rem; background:#0f172a; color:white; }
      nav { display:flex; gap:1rem; align-items:center; }
      a, button { color:white; background:transparent; border:none; cursor:pointer; text-decoration:none; font:inherit; }
      .brand { font-weight:700; }
    `,
  ],
})
export class AppComponent {
  protected readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
