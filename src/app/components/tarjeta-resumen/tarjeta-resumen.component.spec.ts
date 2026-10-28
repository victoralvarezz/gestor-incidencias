import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TarjetaResumenComponent } from './tarjeta-resumen.component';

describe('TarjetaResumenComponent', () => {
  it('muestra los datos recibidos y emite al pulsar el botón', () => {
    const fixture: ComponentFixture<TarjetaResumenComponent> = TestBed.createComponent(TarjetaResumenComponent);
    fixture.componentRef.setInput('titulo', 'Pendientes');
    fixture.componentRef.setInput('cantidad', 2);
    fixture.detectChanges();

    let pulsaciones = 0;
    fixture.componentInstance.pulsada.subscribe(() => pulsaciones++);
    expect(fixture.nativeElement.textContent).toContain('Pendientes');
    expect(fixture.nativeElement.textContent).toContain('2');
    fixture.nativeElement.querySelector('ion-button').click();
    expect(pulsaciones).toBe(1);
  });
});
