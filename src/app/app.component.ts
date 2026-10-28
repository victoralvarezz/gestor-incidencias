import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  IonButton
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  gridOutline,
  listOutline,
  addCircleOutline
} from 'ionicons/icons';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonRouterOutlet,
    IonButton
  ],
})
export class AppComponent {

  readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // Opciones del menu lateral
  protected readonly appPages = [
    { title: 'Panel de control', url: '/pages/dashboard', icon: 'grid' },
    { title: 'Incidencias', url: '/pages/incidencias', icon: 'list' },
    { title: 'Nueva incidencia', url: '/pages/nueva-incidencia', icon: 'add-circle' },
  ];

  constructor() {
    addIcons({
      gridOutline,
      listOutline,
      addCircleOutline
    });
  }

  cerrarSesion(): void {
    this.auth.cerrarSesion();
    this.router.navigateByUrl('/login');
  }
}
