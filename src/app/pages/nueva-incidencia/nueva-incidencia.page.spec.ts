import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaIncidenciaPage } from './nueva-incidencia.page';

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
});
