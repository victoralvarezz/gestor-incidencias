import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => sessionStorage.removeItem('gestorUsuario'));
  afterEach(() => sessionStorage.removeItem('gestorUsuario'));

  it('solo inicia sesión con las credenciales de prueba', () => {
    const auth = TestBed.inject(AuthService);

    expect(auth.iniciarSesion('alumno', 'mal')).toBe(false);
    expect(auth.estaAutenticado()).toBe(false);
    expect(auth.iniciarSesion('alumno', '1234')).toBe(true);
    expect(auth.estaAutenticado()).toBe(true);
    expect(sessionStorage.getItem('gestorUsuario')).toBe('alumno');
  });

  it('recupera la sesión y la elimina al salir', () => {
    sessionStorage.setItem('gestorUsuario', 'alumno');
    const auth = new AuthService();

    expect(auth.estaAutenticado()).toBe(true);
    auth.cerrarSesion();
    expect(auth.estaAutenticado()).toBe(false);
    expect(sessionStorage.getItem('gestorUsuario')).toBeNull();
  });

  it('ignora una sesión con un usuario desconocido', () => {
    sessionStorage.setItem('gestorUsuario', 'desconocido');
    const auth = new AuthService();
    expect(auth.estaAutenticado()).toBe(false);
  });
});
