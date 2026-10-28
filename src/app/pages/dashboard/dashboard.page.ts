import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import { IncidenciasService } from '../../services/incidencias.service';
import { TarjetaResumenComponent } from '../../components/tarjeta-resumen/tarjeta-resumen.component';

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
    TarjetaResumenComponent,
    IonButtons,
    IonMenuButton
  ]
})
export class DashboardPage {

  readonly servicio = inject(IncidenciasService);
  private readonly router = inject(Router);

  verIncidencias(): void {
    this.router.navigateByUrl('/pages/incidencias');
  }

}
