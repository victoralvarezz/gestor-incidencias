import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DashboardPage } from './dashboard.page';
import { IncidenciasService } from '../../services/incidencias.service';
import { AuthService } from '../../services/auth.service';
import { ExportacionService } from '../../services/exportacion.service';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('muestra las tres cifras y abre el listado al pulsar una tarjeta', () => {
    const tarjetas = fixture.nativeElement.querySelectorAll('app-tarjeta-resumen');
    expect(tarjetas.length).toBe(3);
    expect(tarjetas[0].textContent).toContain('Total');
    expect(tarjetas[0].textContent).toContain('3');

    const navegar = vi.spyOn(TestBed.inject(Router), 'navigateByUrl');
    tarjetas[0].querySelector('ion-button').click();
    expect(navegar).toHaveBeenCalledWith('/pages/incidencias');
  });

  it('actualiza el gráfico al cambiar el estado de una incidencia', () => {
    const servicio = TestBed.inject(IncidenciasService);
    expect(component.grafico().map(estado => estado.cantidad)).toEqual([1, 1, 1]);
    const fondoInicial = component.fondoDonut();

    servicio.cambiarEstado(1, 'Resuelta');
    fixture.detectChanges();

    expect(component.grafico().map(estado => estado.cantidad)).toEqual([0, 1, 2]);
    expect(fixture.nativeElement.querySelector('.grafico').textContent).toContain('Resuelta');
    expect(component.fondoDonut()).not.toBe(fondoInicial);
    expect(fixture.nativeElement.querySelector('.donut')).toBeTruthy();
  });

  it('solo exporta cuando el usuario es administrador', () => {
    const auth = TestBed.inject(AuthService);
    const exportacion = TestBed.inject(ExportacionService);
    const descargar = vi.spyOn(exportacion, 'descargar').mockImplementation(() => undefined);
    const informe = vi.spyOn(exportacion, 'abrirInforme').mockReturnValue(true);

    auth.iniciarSesion('alumno', '1234');
    component.exportarCsv();
    component.abrirInforme();
    expect(descargar).not.toHaveBeenCalled();
    expect(informe).not.toHaveBeenCalled();

    auth.iniciarSesion('admin', '1234');
    component.exportarCsv();
    component.abrirInforme();
    expect(descargar).toHaveBeenCalledOnce();
    expect(informe).toHaveBeenCalledOnce();
    auth.cerrarSesion();
  });

  it('avisa si el navegador bloquea el informe', () => {
    TestBed.inject(AuthService).iniciarSesion('admin', '1234');
    vi.spyOn(TestBed.inject(ExportacionService), 'abrirInforme').mockReturnValue(false);

    component.abrirInforme();
    fixture.detectChanges();

    expect(component.errorInforme()).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain('bloqueado');
  });
});
