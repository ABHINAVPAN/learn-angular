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
  },
  // RxJS user-details transfer: route data selects the cleanup example.
  {
    path: 'rxjs-user-details/subsink',
    loadComponent: () => import('./features/user-details-demo/user-details-demo.component').then(m => m.RxjsUserDetailsDemoComponent),
    data: { cleanup: 'subsink' }
  },
  {
    path: 'rxjs-user-details/subscription-array',
    loadComponent: () => import('./features/user-details-demo/user-details-demo.component').then(m => m.RxjsUserDetailsDemoComponent),
    data: { cleanup: 'subscription-array' }
  },
  {
    path: 'rxjs-user-details/take-until-destroyed',
    loadComponent: () => import('./features/user-details-demo/user-details-demo.component').then(m => m.RxjsUserDetailsDemoComponent),
    data: { cleanup: 'take-until-destroyed' }
  }
];
