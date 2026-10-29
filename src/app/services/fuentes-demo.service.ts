import { Injectable } from '@angular/core';

// Estructuras de ejemplo: filas de una tabla y documentos con datos anidados.
export interface FilaSqlDemo {
  id: number;
  titulo: string;
  estado: string;
}

export interface DocumentoNoSqlDemo {
  id: string;
  equipo: string;
  ubicacion: { edificio: string; aula: string };
  etiquetas: string[];
}

@Injectable({ providedIn: 'root' })
export class FuentesDemoService {
  async cargar(): Promise<{ filas: FilaSqlDemo[]; documentos: DocumentoNoSqlDemo[] }> {
    // fetch realiza dos peticiones HTTP asíncronas a archivos públicos de esta aplicación.
    const [respuestaSql, respuestaNoSql] = await Promise.all([
      fetch('assets/datos/sql-rest.json'),
      fetch('assets/datos/nosql.json')
    ]);

    if (!respuestaSql.ok || !respuestaNoSql.ok) {
      throw new Error('No se pudieron cargar los datos de demostración.');
    }

    const [filas, documentos] = await Promise.all([
      respuestaSql.json() as Promise<FilaSqlDemo[]>,
      respuestaNoSql.json() as Promise<DocumentoNoSqlDemo[]>
    ]);
    return { filas, documentos };
  }
}
