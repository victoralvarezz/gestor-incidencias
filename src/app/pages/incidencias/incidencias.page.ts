
import { Component, computed, inject, signal } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import { Incidencia, IncidenciasService } from '../../services/incidencias.service';
import { AuthService } from '../../services/auth.service';
import { IncidenciaItemComponent } from '../../components/incidencia-item/incidencia-item.component';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IncidenciaItemComponent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonMenuButton
  ]
})
export class IncidenciasPage {

  readonly servicio = inject(IncidenciasService);
  readonly auth = inject(AuthService);
  readonly busqueda = signal('');
  readonly filtroEstado = signal('Todos');
  readonly filtroPrioridad = signal('Todas');

  readonly incidenciasFiltradas = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    return this.servicio.incidencias().filter(incidencia =>
      (incidencia.titulo.toLowerCase().includes(texto) ||
        incidencia.descripcion.toLowerCase().includes(texto)) &&
      (this.filtroEstado() === 'Todos' || incidencia.estado === this.filtroEstado()) &&
      (this.filtroPrioridad() === 'Todas' || incidencia.prioridad === this.filtroPrioridad())
    );
  });

  cambiarEstado(incidencia: Incidencia, valor: string | null | undefined): void {
    if (this.auth.esAdministrador() &&
      (valor === 'Pendiente' || valor === 'En proceso' || valor === 'Resuelta')) {
      this.servicio.cambiarEstado(incidencia.id, valor);
    }
  }

}
