import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-tarjeta-resumen',
  templateUrl: './tarjeta-resumen.component.html',
  styleUrls: ['./tarjeta-resumen.component.scss'],
  imports: [IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon]
})
export class TarjetaResumenComponent {
  @Input() titulo = '';
  @Input() cantidad = 0;
  @Input() icono = 'layers-outline';
  @Output() pulsada = new EventEmitter<void>();
}
