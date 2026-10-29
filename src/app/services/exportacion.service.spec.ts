import { describe, expect, it } from 'vitest';
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
});
