
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { IncidenciasPage } from './incidencias.page';

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

});

