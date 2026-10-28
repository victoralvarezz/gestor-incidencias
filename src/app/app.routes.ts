
import { Routes } from '@angular/router';
import { adminGuard, authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'pages/incidencias',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page')
        .then(m => m.LoginPage)
  },

  {
    path: 'pages/dashboard',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page')
        .then(m => m.DashboardPage)
  },

  {
    path: 'pages/incidencias',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/incidencias/incidencias.page')
        .then(m => m.IncidenciasPage)
  },

  {
    path: 'pages/nueva-incidencia',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/nueva-incidencia/nueva-incidencia.page')
        .then(m => m.NuevaIncidenciaPage)
  },

  {
    path: '**',
    redirectTo: 'pages/incidencias'
  }

];
