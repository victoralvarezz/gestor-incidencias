import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { describe, beforeEach, it, expect } from 'vitest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Comprobar que se crea la aplicación
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Comprobar las tres opciones del menú
  it('should have menu labels', () => {
    const app = fixture.nativeElement;
    const labels = app.querySelectorAll('ion-label');

    expect(labels.length).toBe(3);
    expect(labels[0].textContent).toContain('Panel de control');
    expect(labels[1].textContent).toContain('Incidencias');
    expect(labels[2].textContent).toContain('Nueva incidencia');
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
