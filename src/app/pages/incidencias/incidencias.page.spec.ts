
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { IncidenciasPage } from './incidencias.page';
import { IncidenciasService } from '../../services/incidencias.service';

describe('IncidenciasPage', () => {

  let component: IncidenciasPage;
  let fixture: ComponentFixture<IncidenciasPage>;

  beforeEach(async () => {
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
    const servicio = TestBed.inject(IncidenciasService);

    component.busqueda.set('ordenador');
    component.filtroPrioridad.set('Alta');
    expect(component.incidenciasFiltradas().map(i => i.id)).toEqual([1]);

    component.cambiarEstado(servicio.incidencias()[0], 'Resuelta');
    expect(servicio.resueltas()).toBe(2);

    component.filtroEstado.set('Pendiente');
    expect(component.incidenciasFiltradas()).toEqual([]);
  });
});
