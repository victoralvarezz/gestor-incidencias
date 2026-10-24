import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  IonRouterLink
} from '@ionic/angular';

import { addIcons } from 'ionicons';

import {
  gridOutline,
  gridSharp,
  listOutline,
  listSharp,
  addCircleOutline,
  addCircleSharp,
  bookmarkOutline,
  bookmarkSharp
} from 'ionicons/icons';

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
    IonRouterOutlet
  ],
})
export class AppComponent {

  // Opciones del menu lateral
  protected readonly appPages = [
    { title: 'Panel de control', url: '/pages/dashboard', icon: 'grid' },
    { title: 'Incidencias', url: '/pages/incidencias', icon: 'list' },
    { title: 'Nueva incidencia', url: '/pages/nueva-incidencia', icon: 'add-circle' },
  ];

  // Etiquetas originales: las quitaremos al modificar el HTML
  protected readonly labels = [
    'Family',
    'Friends',
    'Notes',
    'Work',
    'Travel',
    'Reminders'
  ];

  constructor() {
    addIcons({
      gridOutline,
      gridSharp,
      listOutline,
      listSharp,
      addCircleOutline,
      addCircleSharp,
      bookmarkOutline,
      bookmarkSharp
    });
  }
}
