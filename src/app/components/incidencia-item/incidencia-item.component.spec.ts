import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { IncidenciaItemComponent } from './incidencia-item.component';
import { Incidencia } from '../../services/incidencias.service';

describe('IncidenciaItemComponent', () => {
  const incidencia: Incidencia = {
    id: 1,
    titulo: 'Ordenador averiado',
    descripcion: 'No arranca.',
    prioridad: 'Alta',
    estado: 'Pendiente'
  };

  it('muestra los datos sin selector para el alumno', () => {
    const fixture = TestBed.createComponent(IncidenciaItemComponent);
    fixture.componentRef.setInput('incidencia', incidencia);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Ordenador averiado');
    expect(fixture.nativeElement.querySelector('ion-select')).toBeNull();
    const cambios: string[] = [];
    fixture.componentInstance.estadoCambiado.subscribe(valor => cambios.push(valor));
    fixture.componentInstance.avisarCambio('Resuelta');
    expect(cambios).toEqual([]);
  });

  it('avisa al padre del estado elegido por el administrador', () => {
    const fixture = TestBed.createComponent(IncidenciaItemComponent);
    fixture.componentRef.setInput('incidencia', incidencia);
    fixture.componentRef.setInput('puedeCambiarEstado', true);
    fixture.detectChanges();

    const cambios: string[] = [];
    fixture.componentInstance.estadoCambiado.subscribe(valor => cambios.push(valor));
    expect(fixture.nativeElement.querySelector('ion-select')).not.toBeNull();
    fixture.componentInstance.avisarCambio('Resuelta');
    expect(cambios).toEqual(['Resuelta']);
  });
});
