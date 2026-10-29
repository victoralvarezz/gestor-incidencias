import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import { IncidenciasService } from '../../services/incidencias.service';
import { TarjetaResumenComponent } from '../../components/tarjeta-resumen/tarjeta-resumen.component';
import { AuthService } from '../../services/auth.service';
import { ExportacionService } from '../../services/exportacion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    TarjetaResumenComponent,
    IonButtons,
    IonMenuButton
  ]
})
export class DashboardPage {

  readonly servicio = inject(IncidenciasService);
  private readonly auth = inject(AuthService);
  private readonly exportacion = inject(ExportacionService);
  private readonly router = inject(Router);

  readonly grafico = computed(() => {
    const incidencias = this.servicio.incidencias();
    const estados = ['Pendiente', 'En proceso', 'Resuelta'] as const;

    return estados.map(estado => {
      const cantidad = incidencias.filter(incidencia => incidencia.estado === estado).length;
      return {
        estado,
        cantidad,
        porcentaje: incidencias.length ? cantidad * 100 / incidencias.length : 0
      };
    });
  });

  verIncidencias(): void {
    this.router.navigateByUrl('/pages/incidencias');
  }

  exportarCsv(): void {
    if (!this.auth.esAdministrador()) return;

    const csv = this.exportacion.crearCsv(this.servicio.incidencias());
    this.exportacion.descargar('incidencias.csv', new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  }

  abrirInforme(): void {
    if (!this.auth.esAdministrador()) return;
    this.exportacion.abrirInforme(this.servicio.incidencias());
  }

}
