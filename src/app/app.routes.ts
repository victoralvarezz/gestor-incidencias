
import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'pages/dashboard',
    pathMatch: 'full'
  },

  {
    path: 'pages/dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page')
        .then(m => m.DashboardPage)
  },

  {
    path: 'pages/incidencias',
    loadComponent: () =>
      import('./pages/incidencias/incidencias.page')
        .then(m => m.IncidenciasPage)
  },

  {
    path: 'pages/nueva-incidencia',
    loadComponent: () =>
      import('./pages/nueva-incidencia/nueva-incidencia.page')
        .then(m => m.NuevaIncidenciaPage)
  },

  {
    path: '**',
    redirectTo: 'pages/dashboard'
  }

];
