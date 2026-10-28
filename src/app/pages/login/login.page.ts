import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonNote,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonNote,
    IonTitle,
    IonToolbar
  ]
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal(false);

  readonly formulario = new FormGroup({
    usuario: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    contrasena: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  entrar(): void {
    this.error.set(false);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.getRawValue();
    if (this.auth.iniciarSesion(datos.usuario, datos.contrasena)) {
      this.router.navigateByUrl('/pages/dashboard');
    } else {
      this.error.set(true);
    }
  }
}
