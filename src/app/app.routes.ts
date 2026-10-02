import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tax-dashboard',
    pathMatch: 'full'
  },
  {
    path: 'tax-dashboard',
    loadComponent: () => import('./pages/tax-dashboard/tax-dashboard.component').then(m => m.TaxDashboardComponent)
  }
];
