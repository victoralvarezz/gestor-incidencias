
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { IncidenciasPage } from './incidencias.page';
import { IncidenciasService } from '../../services/incidencias.service';
import { AuthService } from '../../services/auth.service';

describe('IncidenciasPage', () => {

  let component: IncidenciasPage;
  let fixture: ComponentFixture<IncidenciasPage>;

  beforeEach(async () => {
    sessionStorage.removeItem('gestorUsuario');
    await TestBed.configureTestingModule({
      imports: [IncidenciasPage]
    }).compileComponents();

    fixture = TestBed.createComponent(IncidenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filtra las incidencias y actualiza el resumen al cambiar el estado', () => {
    TestBed.inject(AuthService).iniciarSesion('admin', '1234');
    const servicio = TestBed.inject(IncidenciasService);

    component.busqueda.set('ordenador');
    component.filtroPrioridad.set('Alta');
    expect(component.incidenciasFiltradas().map(i => i.id)).toEqual([1]);

    component.cambiarEstado(servicio.incidencias()[0], 'Resuelta');
    expect(servicio.resueltas()).toBe(2);

    component.filtroEstado.set('Pendiente');
    expect(component.incidenciasFiltradas()).toEqual([]);
  });

  it('impide al alumno cambiar el estado incluso llamando al método', () => {
    const auth = TestBed.inject(AuthService);
    const servicio = TestBed.inject(IncidenciasService);
    auth.iniciarSesion('alumno', '1234');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('ion-select[aria-label^="Cambiar estado"]')).toBeNull();
    component.cambiarEstado(servicio.incidencias()[0], 'Resuelta');
    expect(servicio.incidencias()[0].estado).toBe('Pendiente');
  });
});
