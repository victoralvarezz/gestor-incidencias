import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaIncidenciaPage } from './nueva-incidencia.page';
import { IncidenciasService } from '../../services/incidencias.service';

describe('NuevaIncidenciaPage', () => {
  let component: NuevaIncidenciaPage;
  let fixture: ComponentFixture<NuevaIncidenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaIncidenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('guarda una incidencia y actualiza el dashboard y la lista', async () => {
    const servicio = TestBed.inject(IncidenciasService);
    const totalAnterior = servicio.total();

    component.formulario.setValue({
      titulo: 'Pantalla rota',
      descripcion: 'La pantalla no muestra ninguna imagen.',
      prioridad: 'Alta'
    });
    await vi.waitFor(() => expect(component.formulario.pending).toBe(false));
    component.guardar();

    expect(servicio.total()).toBe(totalAnterior + 1);
    expect(servicio.pendientes()).toBe(2);
    expect(servicio.incidencias().at(-1)?.titulo).toBe('Pantalla rota');
    expect(component.guardado()).toBe(true);
  });

  it('rechaza datos con espacios y guarda el texto recortado', async () => {
    const servicio = TestBed.inject(IncidenciasService);
    const totalAnterior = servicio.total();

    component.formulario.setValue({
      titulo: '   ',
      descripcion: '          ',
      prioridad: 'Media'
    });
    component.guardar();
    expect(servicio.total()).toBe(totalAnterior);

    component.formulario.setValue({
      titulo: '  Ratón roto  ',
      descripcion: '  El ratón no responde.  ',
      prioridad: 'Media'
    });
    await vi.waitFor(() => expect(component.formulario.pending).toBe(false));
    component.guardar();
    expect(servicio.incidencias().at(-1)?.titulo).toBe('Ratón roto');
    expect(servicio.incidencias().at(-1)?.descripcion).toBe('El ratón no responde.');
  });

  it('consulta el servicio y rechaza un título repetido', async () => {
    const servicio = TestBed.inject(IncidenciasService);
    const totalAnterior = servicio.total();

    component.formulario.setValue({
      titulo: '  ORDENADOR AVERIADO  ',
      descripcion: 'El equipo sigue sin encender.',
      prioridad: 'Alta'
    });
    expect(component.formulario.pending).toBe(true);
    component.guardar();
    expect(servicio.total()).toBe(totalAnterior);

    await vi.waitFor(() => expect(component.formulario.controls.titulo.hasError('tituloRepetido')).toBe(true));
    component.guardar();
    fixture.detectChanges();

    expect(servicio.total()).toBe(totalAnterior);
    expect(fixture.nativeElement.textContent).toContain('Ya existe una incidencia');
  });
});
