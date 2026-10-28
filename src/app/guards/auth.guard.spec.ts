import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router, UrlTree } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  beforeEach(() => {
    sessionStorage.removeItem('gestorUsuario');
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });
  afterEach(() => sessionStorage.removeItem('gestorUsuario'));

  it('envía al login cuando no hay sesión', () => {
    const ruta = TestBed.inject(ActivatedRoute).snapshot;
    const estado = TestBed.inject(Router).routerState.snapshot;
    const resultado = TestBed.runInInjectionContext(() => authGuard(ruta, estado));
    expect(resultado instanceof UrlTree).toBe(true);
    expect(TestBed.inject(Router).serializeUrl(resultado as UrlTree)).toBe('/login');
  });

  it('permite entrar cuando hay sesión', () => {
    TestBed.inject(AuthService).iniciarSesion('alumno', '1234');
    const ruta = TestBed.inject(ActivatedRoute).snapshot;
    const estado = TestBed.inject(Router).routerState.snapshot;
    const resultado = TestBed.runInInjectionContext(() => authGuard(ruta, estado));
    expect(resultado).toBe(true);
  });
});
