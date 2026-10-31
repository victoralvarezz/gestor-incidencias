import { Injectable, computed, signal } from '@angular/core';

export type Rol = 'administrador' | 'usuario';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly claveSesion = 'gestorUsuario';

  // Al recargar, recuperamos el usuario de esta pestaña.
  readonly usuario = signal<string | null>(
    ['alumno', 'admin'].includes(sessionStorage.getItem(this.claveSesion) ?? '')
      ? sessionStorage.getItem(this.claveSesion) : null
  );
  readonly estaAutenticado = computed(() => this.usuario() !== null);
  readonly rol = computed<Rol | null>(() => {
    if (this.usuario() === 'admin') return 'administrador';
    if (this.usuario() === 'alumno') return 'usuario';
    return null;
  });
  readonly esAdministrador = computed(() => this.rol() === 'administrador');

  iniciarSesion(nombre: string, contrasena: string): boolean {
    // Credenciales de ejemplo para practicar el flujo de acceso.
    const usuario = nombre.trim();
    const clave = contrasena.trim();
    if (!((usuario === 'alumno' && clave === '1234') ||
      (usuario === 'admin' && clave === '1234'))) {
      return false;
    }

    sessionStorage.setItem(this.claveSesion, usuario);
    this.usuario.set(usuario);
    return true;
  }

  cerrarSesion(): void {
    sessionStorage.removeItem(this.claveSesion);
    this.usuario.set(null);
  }
}
