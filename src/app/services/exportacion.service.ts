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

  abrirInforme(incidencias: Incidencia[]): boolean {
    const ventana = window.open('', '_blank');
    if (!ventana) return false;

    const documento = ventana.document;
    documento.title = 'Informe de incidencias';
    const estilo = documento.createElement('style');
    estilo.textContent = `
      body { font-family: Arial, sans-serif; margin: 24px; color: #222; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
      th, td { border: 1px solid #bbb; padding: 8px; text-align: left; overflow-wrap: anywhere; }
      th { background: #eee; }
      button { padding: 10px 16px; margin-top: 12px; }
      @media print { button { display: none; } body { margin: 0; } }
    `;
    documento.head.append(estilo);

    const titulo = documento.createElement('h1');
    titulo.textContent = 'Informe de incidencias';
    documento.body.append(titulo);

    const fecha = documento.createElement('p');
    fecha.textContent = `Fecha: ${new Date().toLocaleDateString('es-ES')}`;
    documento.body.append(fecha);

    const tabla = documento.createElement('table');
    const cabecera = documento.createElement('tr');
    for (const texto of ['ID', 'Título', 'Descripción', 'Estado', 'Prioridad']) {
      const celda = documento.createElement('th');
      celda.textContent = texto;
      cabecera.append(celda);
    }
    tabla.append(cabecera);

    for (const incidencia of incidencias) {
      const fila = documento.createElement('tr');
      for (const valor of [incidencia.id, incidencia.titulo, incidencia.descripcion,
        incidencia.estado, incidencia.prioridad]) {
        const celda = documento.createElement('td');
        celda.textContent = String(valor);
        fila.append(celda);
      }
      tabla.append(fila);
    }
    documento.body.append(tabla);

    const boton = documento.createElement('button');
    boton.textContent = 'Imprimir o guardar como PDF';
    boton.addEventListener('click', () => ventana.print());
    documento.body.append(boton);
    return true;
  }
}
