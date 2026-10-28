import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    sessionStorage.setItem('gestorUsuario', 'alumno');
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => sessionStorage.removeItem('gestorUsuario'));

  // Comprobar que se crea la aplicación
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Comprobar las tres opciones del menú
  it('should have menu labels', () => {
    const app = fixture.nativeElement;
    const labels = app.querySelectorAll('ion-label');

    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toContain('Incidencias');
    expect(labels[1].textContent).toContain('Nueva incidencia');
  });

  it('muestra el panel al administrador', () => {
    component.auth.iniciarSesion('admin', '1234');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Panel de control');
  });

  // Comprobar las rutas configuradas
  it('should have urls', () => {
    const menu = component as unknown as {
      appPages: { url: string }[];
    };

    const urls = menu.appPages.map(pagina => pagina.url);

    expect(urls).toEqual([
      '/pages/dashboard',
      '/pages/incidencias',
      '/pages/nueva-incidencia'
    ]);
  });

});
