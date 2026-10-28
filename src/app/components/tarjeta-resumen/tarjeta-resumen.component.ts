import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular';

@Component({
  selector: 'app-tarjeta-resumen',
  templateUrl: './tarjeta-resumen.component.html',
  styleUrls: ['./tarjeta-resumen.component.scss'],
  imports: [IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle]
})
export class TarjetaResumenComponent {
  @Input() titulo = '';
  @Input() cantidad = 0;
  @Output() pulsada = new EventEmitter<void>();
}
