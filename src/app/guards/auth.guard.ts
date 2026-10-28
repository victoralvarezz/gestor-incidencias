import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // El router decide si abre la página o envía al login.
  return auth.estaAutenticado() ? true : router.createUrlTree(['/login']);
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.estaAutenticado()) return router.createUrlTree(['/login']);
  return auth.esAdministrador() ? true : router.createUrlTree(['/pages/incidencias']);
};
