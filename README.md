# Gestor de incidencias

Aplicación de clase realizada con Ionic, Angular y TypeScript. Permite consultar y registrar incidencias, filtrar la lista y, como administrador, cambiar estados, consultar el dashboard y exportar datos.

## Ejecutar el proyecto

Requiere Node.js y npm. Desde la raíz del proyecto:

```text
npm ci
npm start
```

En PowerShell con la ejecución de scripts restringida, usa `npm.cmd` en vez de `npm`.

Para comprobar el proyecto: `npm test -- --watch=false`, `npm run lint` y `npm run build`.
`npm run docs:generate` actualiza la referencia técnica a partir del código.

## Usuarios de prueba

| Usuario | Contraseña | Rol |
| --- | --- | --- |
| `alumno` | `1234` | Consulta y crea incidencias |
| `admin` | `1234` | También cambia estados, ve el dashboard y exporta |

Las credenciales y los roles están implementados en el navegador para la práctica. No son seguridad real. No introduzcas datos privados.

## Funcionalidades y límites

- Las incidencias de ejemplo están en `IncidenciasService`, guardadas en un Signal. Las altas y cambios de estado se pierden al recargar.
- Los filtros de texto, estado y prioridad trabajan sobre ese Signal.
- El formulario de nueva incidencia comprueba de forma asíncrona mediante `IncidenciasService` que el título no esté repetido.
- El CSV contiene la lista actual completa, con cabeceras, acentos y campos entrecomillados; puede abrirse en una hoja de cálculo con separador `;`.
- **Informe PDF** abre una página imprimible con la misma lista. Pulsa **Imprimir o guardar como PDF** y elige **Guardar como PDF** en el navegador. El navegador genera el PDF; la aplicación no descarga directamente un archivo PDF.
- **Fuentes de datos de demostración** hace dos lecturas HTTP asíncronas de archivos locales: `sql-rest.json` imita filas que entregaría una API REST con SQL y `nosql.json` imita documentos NoSQL. Se muestran en el dashboard. **No hay conexión SQL, API REST de servidor ni base NoSQL reales.** Estos datos son independientes de las incidencias editables.

## Estructura sencilla

- `pages`: login, incidencias, nueva incidencia y dashboard.
- `components`: una tarjeta de resumen y un elemento de incidencia con `@Input()` y `@Output()`.
- `services`: autenticación de prueba, incidencias con Signals, exportación y fuentes simuladas.
- `guards`: protección funcional de rutas según la sesión y el rol.

Consulta el [Manual de usuario](docs/MANUAL_USUARIO.md) para los pasos de uso y la
[Documentación técnica](docs/DOCUMENTACION_TECNICA.md) para entender las rutas,
los datos y las comprobaciones de la práctica. La
[Referencia técnica generada](docs/REFERENCIA_GENERADA.md) enumera rutas,
guards, componentes y servicios.

## Integración continua

El archivo `.github/workflows/ci.yml` ejecuta en `develop` la generación de
documentación, las pruebas, lint y la compilación. Comprueba también que la
referencia generada esté al día. Antes de entregar, revisa el resultado del
workflow en GitHub.

## Despliegue en Vercel

`npm run build` genera los archivos estáticos en `www`. `vercel.json` indica el directorio de salida y reescribe las rutas de la aplicación hacia `index.html`, para que funcionen al abrir una URL directamente. En Vercel, la raíz del proyecto debe ser este repositorio y el comando de compilación es `npm run build`. No hacen falta variables de entorno para esta versión simulada. No publiques datos reales ni consideres la autenticación del navegador segura.

## Trabajo que requeriría un backend real

Para consumir SQL y NoSQL reales habría que acordar el servidor y los almacenes de datos, crear una API, protegerla y cambiar las lecturas simuladas por peticiones a ella. El servidor debería validar la identidad y los permisos; los guards del navegador no bastan. Este apartado no queda cumplido como integración real con bases de datos.

La referencia técnica se genera con un script de Node incluido en el proyecto,
como alternativa sencilla a Compodoc sin instalar otra dependencia. Lighthouse
requiere un navegador compatible y una aplicación servida localmente o publicada;
su objetivo de 90 en Accesibilidad y Buenas Prácticas aún debe medirse.
