
import { Injectable, signal, computed } from '@angular/core';

export interface Incidencia {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'Pendiente' | 'En proceso' | 'Resuelta';
  prioridad: 'Baja' | 'Media' | 'Alta';
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  // Datos de prueba
  readonly incidencias = signal<Incidencia[]>([
    {
      id: 1,
      titulo: 'Ordenador averiado',
      descripcion: 'El ordenador no arranca.',
      estado: 'Pendiente',
      prioridad: 'Alta'
    },
    {
      id: 2,
      titulo: 'Problema de conexión',
      descripcion: 'No funciona la conexión a Internet.',
      estado: 'En proceso',
      prioridad: 'Media'
    },
    {
      id: 3,
      titulo: 'Impresora reparada',
      descripcion: 'La impresora vuelve a funcionar.',
      estado: 'Resuelta',
      prioridad: 'Baja'
    }
  ]);

  // Estadísticas automáticas
  readonly total = computed(() =>
    this.incidencias().length
  );

  readonly pendientes = computed(() =>
    this.incidencias().filter(i => i.estado === 'Pendiente').length
  );

  readonly resueltas = computed(() =>
    this.incidencias().filter(i => i.estado === 'Resuelta').length
  );

  // Añadir una nueva incidencia
  agregarIncidencia(
    datos: Pick<Incidencia, 'titulo' | 'descripcion' | 'prioridad'>
  ): void {

    const lista = this.incidencias();

    const nuevoId = Math.max(0, ...lista.map(i => i.id)) + 1;

    const nueva: Incidencia = {
      id: nuevoId,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      prioridad: datos.prioridad,
      estado: 'Pendiente'
    };

    this.incidencias.update(actuales => [...actuales, nueva]);
  }

  cambiarEstado(id: number, estado: Incidencia['estado']): void {
    this.incidencias.update(actuales =>
      actuales.map(incidencia =>
        incidencia.id === id ? { ...incidencia, estado } : incidencia
      )
    );
  }

}
