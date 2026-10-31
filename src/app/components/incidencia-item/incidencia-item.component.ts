import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonBadge, IonSelect, IonSelectOption } from '@ionic/angular';
import { Incidencia } from '../../services/incidencias.service';

@Component({
  selector: 'app-incidencia-item',
  templateUrl: './incidencia-item.component.html',
  styleUrls: ['./incidencia-item.component.scss'],
  imports: [IonBadge, IonSelect, IonSelectOption]
})
export class IncidenciaItemComponent {
  @Input() incidencia!: Incidencia;
  @Input() puedeCambiarEstado = false;
  @Output() estadoCambiado = new EventEmitter<string>();

  avisarCambio(valor: string): void {
    if (this.puedeCambiarEstado) {
      this.estadoCambiado.emit(valor);
    }
  }
}
