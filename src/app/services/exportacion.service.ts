import { Injectable } from '@angular/core';
import { Incidencia } from './incidencias.service';

@Injectable({ providedIn: 'root' })
export class ExportacionService {
  crearCsv(incidencias: Incidencia[]): string {
    const filas = incidencias.map(incidencia => [
      incidencia.id,
      incidencia.titulo,
      incidencia.descripcion,
      incidencia.estado,
      incidencia.prioridad
    ].map(valor => `"${String(valor).replaceAll('"', '""')}"`).join(';'));

    return '\uFEFFID;Título;Descripción;Estado;Prioridad\r\n' + filas.join('\r\n') + '\r\n';
  }

  descargar(nombre: string, contenido: Blob): void {
    const enlace = document.createElement('a');
    const url = URL.createObjectURL(contenido);
    enlace.href = url;
    enlace.download = nombre;
    enlace.click();
    URL.revokeObjectURL(url);
  }
}
