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
    document.body.append(enlace);
    enlace.click();
    enlace.remove();
    // El navegador necesita tiempo para iniciar la descarga antes de liberar el Blob.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  abrirInforme(incidencias: Incidencia[]): boolean {
    const ventana = window.open('', '_blank');
    if (!ventana) return false;

    const documento = ventana.document;
    documento.title = 'Informe de incidencias';
    const estilo = documento.createElement('style');
    estilo.textContent = `
      body { font-family: Arial, sans-serif; margin: 24px; color: #222; font-size: 12px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; table-layout: fixed; }
      th, td { border: 1px solid #bbb; padding: 8px; text-align: left; overflow-wrap: anywhere; vertical-align: top; }
      th { background: #eee; }
      button { padding: 10px 16px; margin-top: 12px; }
      th:nth-child(1) { width: 5%; }
      th:nth-child(2) { width: 22%; }
      th:nth-child(3) { width: 48%; }
      th:nth-child(4) { width: 13%; }
      th:nth-child(5) { width: 12%; }
      @media print {
        @page { size: A4 landscape; margin: 12mm; }
        button { display: none; }
        body { margin: 0; }
        thead { display: table-header-group; }
        tr { break-inside: avoid; }
      }
    `;
    documento.head.append(estilo);

    const titulo = documento.createElement('h1');
    titulo.textContent = 'Informe de incidencias';
    documento.body.append(titulo);

    const fecha = documento.createElement('p');
    fecha.textContent = `Fecha: ${new Date().toLocaleDateString('es-ES')}`;
    documento.body.append(fecha);

    const total = documento.createElement('p');
    total.textContent = `Total de incidencias: ${incidencias.length}`;
    documento.body.append(total);

    const tabla = documento.createElement('table');
    const cabeceras = documento.createElement('thead');
    const cabecera = documento.createElement('tr');
    for (const texto of ['ID', 'Título', 'Descripción', 'Estado', 'Prioridad']) {
      const celda = documento.createElement('th');
      celda.textContent = texto;
      celda.scope = 'col';
      cabecera.append(celda);
    }
    cabeceras.append(cabecera);
    tabla.append(cabeceras);

    const cuerpo = documento.createElement('tbody');

    for (const incidencia of incidencias) {
      const fila = documento.createElement('tr');
      for (const valor of [incidencia.id, incidencia.titulo, incidencia.descripcion,
        incidencia.estado, incidencia.prioridad]) {
        const celda = documento.createElement('td');
        celda.textContent = String(valor);
        fila.append(celda);
      }
      cuerpo.append(fila);
    }
    tabla.append(cuerpo);
    documento.body.append(tabla);

    const boton = documento.createElement('button');
    boton.textContent = 'Imprimir o guardar como PDF';
    boton.addEventListener('click', () => ventana.print());
    documento.body.append(boton);
    return true;
  }
}
