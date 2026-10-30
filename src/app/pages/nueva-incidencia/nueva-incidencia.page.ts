
import { Component, inject, signal } from '@angular/core';

import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonNote,
  IonButtons,
  IonMenuButton
} from '@ionic/angular';

import { IncidenciasService } from '../../services/incidencias.service';

@Component({
  selector: 'app-nueva-incidencia',
  templateUrl: './nueva-incidencia.page.html',
  styleUrls: ['./nueva-incidencia.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonNote,
    IonButtons,
    IonMenuButton
  ]
})
export class NuevaIncidenciaPage {

  // Accedemos al servicio de incidencias
  private servicio = inject(IncidenciasService);

  // Indica si hemos guardado correctamente
  guardado = signal(false);

  // Creamos el formulario reactivo
  formulario = new FormGroup({

    titulo: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ],
      asyncValidators: [async control => {
        const disponible = await this.servicio.tituloDisponible(control.value);
        return disponible ? null : { tituloRepetido: true };
      }]
    }),

    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10)
      ]
    }),

    prioridad: new FormControl<'Baja' | 'Media' | 'Alta'>(
      'Media',
      {
        nonNullable: true,
        validators: [Validators.required]
      }
    )
  });

  // Metodo para guardar una incidencia
  guardar(): void {

    this.guardado.set(false);

    const datos = this.formulario.getRawValue();
    const titulo = datos.titulo.trim();
    const descripcion = datos.descripcion.trim();

    if (titulo.length < 3) {
      this.formulario.controls.titulo.setErrors({ longitud: true });
    }
    if (descripcion.length < 10) {
      this.formulario.controls.descripcion.setErrors({ longitud: true });
    }

    // Comprobamos que el formulario sea valido
    if (this.formulario.invalid || this.formulario.pending) {
      this.formulario.markAllAsTouched();
      return;
    }

    // Añadimos la incidencia mediante el servicio
    this.servicio.agregarIncidencia({ ...datos, titulo, descripcion });

    // Limpiamos el formulario
    this.formulario.reset({
      titulo: '',
      descripcion: '',
      prioridad: 'Media'
    });

    // Mostramos mensaje de confirmacion
    this.guardado.set(true);
  }
}
