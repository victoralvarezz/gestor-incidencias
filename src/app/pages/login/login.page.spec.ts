import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let fixture: ComponentFixture<LoginPage>;
  let pagina: LoginPage;

  beforeEach(() => {
    sessionStorage.removeItem('gestorUsuario');
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    fixture = TestBed.createComponent(LoginPage);
    pagina = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => sessionStorage.removeItem('gestorUsuario'));

  function introducir(usuario: string, contrasena: string): void {
    const [entradaUsuario, entradaContrasena] = fixture.nativeElement.querySelectorAll('ion-input');
    entradaUsuario.value = usuario;
    entradaUsuario.dispatchEvent(new CustomEvent('ionInput', { bubbles: true, detail: { value: usuario } }));
    entradaContrasena.value = contrasena;
    entradaContrasena.dispatchEvent(new CustomEvent('ionInput', { bubbles: true, detail: { value: contrasena } }));
    fixture.detectChanges();
  }

  it.each([
    ['admin', '/pages/dashboard', true],
    ['alumno', '/pages/incidencias', false]
  ])('permite iniciar sesión como %s desde el formulario', (usuario, destino, administrador) => {
    const navegar = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    introducir(usuario, '1234');
    pagina.entrar();

    expect(pagina.error()).toBe(false);
    expect(TestBed.inject(AuthService).esAdministrador()).toBe(administrador);
    expect(navegar).toHaveBeenCalledWith(destino);
  });

  it('permite entrar como administrador con espacios accidentales', () => {
    introducir(' admin ', '1234 ');
    pagina.entrar();

    expect(pagina.error()).toBe(false);
    expect(TestBed.inject(AuthService).usuario()).toBe('admin');
    expect(TestBed.inject(AuthService).esAdministrador()).toBe(true);
  });
});
