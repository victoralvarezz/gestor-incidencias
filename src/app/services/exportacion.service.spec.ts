import { describe, expect, it, vi } from 'vitest';
import { ExportacionService } from './exportacion.service';

describe('ExportacionService', () => {
  it('crea un CSV que conserva comillas, puntos y coma y acentos', () => {
    const csv = new ExportacionService().crearCsv([{
      id: 4,
      titulo: 'Pantalla; "rota"',
      descripcion: 'No se enciende',
      estado: 'Pendiente',
      prioridad: 'Alta'
    }]);

    expect(csv).toContain('ID;Título;Descripción;Estado;Prioridad');
    expect(csv).toContain('"4";"Pantalla; ""rota""";"No se enciende";"Pendiente";"Alta"');
  });

  it('prepara el informe con fecha y listado para guardar como PDF', () => {
    const documento = document.implementation.createHTMLDocument();
    const imprimir = vi.fn();
    const abrir = vi.spyOn(window, 'open').mockReturnValue({ document: documento, print: imprimir } as unknown as Window);

    const resultado = new ExportacionService().abrirInforme([{
      id: 5,
      titulo: 'Cañón averiado',
      descripcion: 'No proyecta',
      estado: 'En proceso',
      prioridad: 'Media'
    }]);

    expect(resultado).toBe(true);
    expect(documento.title).toBe('Informe de incidencias');
    expect(documento.body.textContent).toContain('Fecha:');
    expect(documento.body.textContent).toContain('Cañón averiado');
    documento.querySelector('button')?.click();
    expect(imprimir).toHaveBeenCalledOnce();
    abrir.mockRestore();
  });
});
