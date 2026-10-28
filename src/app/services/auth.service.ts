import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly claveSesion = 'gestorUsuario';

  // Al recargar, recuperamos el usuario de esta pestaña.
  readonly usuario = signal<string | null>(
    sessionStorage.getItem(this.claveSesion) === 'alumno' ? 'alumno' : null
  );
  readonly estaAutenticado = computed(() => this.usuario() !== null);

  iniciarSesion(nombre: string, contrasena: string): boolean {
    // Credenciales de ejemplo para practicar el flujo de acceso.
    if (nombre !== 'alumno' || contrasena !== '1234') {
      return false;
    }

    sessionStorage.setItem(this.claveSesion, nombre);
    this.usuario.set(nombre);
    return true;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.claveSesion);
    this.usuario.set(null);
  }
}
