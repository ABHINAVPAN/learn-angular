import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect empty URL path directly to the parent-child demonstration page
  {
    path: '',
    redirectTo: 'demo',
    pathMatch: 'full'
  },
  // Route accessing the Parent Component
  {
    path: 'demo',
    loadComponent: () => import('./features/parent-child-demo/parent/parent.component').then(m => m.ParentComponent)
  }
];
