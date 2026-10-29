import { afterEach, describe, expect, it, vi } from 'vitest';
import { FuentesDemoService } from './fuentes-demo.service';

describe('FuentesDemoService', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('carga en paralelo filas y documentos de las dos fuentes simuladas', async () => {
    const fetchSimulado = vi.fn((ruta: string) => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(ruta.includes('sql-rest')
        ? [{ id: 1, titulo: 'Ordenador', estado: 'Pendiente' }]
        : [{ id: 'doc-1', equipo: 'Ordenador', ubicacion: { edificio: 'A', aula: '2' }, etiquetas: ['hardware'] }])
    }));
    vi.stubGlobal('fetch', fetchSimulado);

    const datos = await new FuentesDemoService().cargar();

    expect(fetchSimulado).toHaveBeenCalledTimes(2);
    expect(datos.filas[0].titulo).toBe('Ordenador');
    expect(datos.documentos[0].ubicacion.aula).toBe('2');
  });

  it('informa del fallo si una lectura HTTP falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(new FuentesDemoService().cargar()).rejects.toThrow('No se pudieron cargar');
  });
});
