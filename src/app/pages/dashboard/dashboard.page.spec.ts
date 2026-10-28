import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { DashboardPage } from './dashboard.page';

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
});
