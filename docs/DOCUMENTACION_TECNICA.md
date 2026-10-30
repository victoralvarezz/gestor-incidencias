# Documentación técnica

## Objetivo y tecnologías

Gestor de incidencias de clase construido con Ionic, Angular y TypeScript. Usa
componentes independientes, formularios reactivos, servicios, Signals y guards.
No necesita un servidor ni claves de acceso para ejecutar la demostración.

## Rutas y permisos

| Ruta | Acceso | Función |
| --- | --- | --- |
| `/login` | Todos | Iniciar sesión |
| `/pages/incidencias` | Alumno y administrador | Consultar y filtrar incidencias |
| `/pages/nueva-incidencia` | Alumno y administrador | Registrar incidencias |
| `/pages/dashboard` | Administrador | Resumen, gráfico, fuentes simuladas y exportaciones |

`AuthService` comprueba las dos cuentas de prueba y guarda el nombre en
`sessionStorage` mientras la pestaña está abierta. `authGuard` exige una sesión;
`adminGuard` exige además el rol de administrador. El menú oculta el dashboard
al alumno. El cambio de estado y las exportaciones vuelven a comprobar el rol
en el método que ejecuta la acción. Son controles de interfaz, no autorización
de servidor.

## Componentes y datos

- `IncidenciasService` contiene tres incidencias iniciales en un Signal. Crear
  una incidencia o cambiar su estado actualiza el listado y los contadores sin
  recargar la página. Los datos vuelven a los iniciales tras recargar.
- `IncidenciaItemComponent` recibe la incidencia y el permiso mediante
  `@Input()`; comunica el estado elegido al listado mediante `@Output()`.
- `TarjetaResumenComponent` recibe el título y la cantidad mediante `@Input()`
  y avisa al dashboard del clic mediante `@Output()`.
- Los formularios de acceso y de nueva incidencia usan `FormGroup`,
  `FormControl` y `Validators`. El segundo exige título de 3 caracteres,
  descripción de 10 y prioridad. También rechaza texto compuesto solo por
  espacios. Los errores se muestran junto al campo.
- `FuentesDemoService` usa `fetch` y `Promise.all` para leer en paralelo dos
  archivos de `src/assets/datos`. Uno representa filas SQL/REST y otro
  documentos NoSQL. Se muestran solo al pulsar el botón del dashboard. No son
  las incidencias editables ni conexiones a bases de datos reales.

## Exportaciones

`ExportacionService` crea un CSV con cabecera, marca UTF-8, separador `;` y
comillas escapadas. Exporta todas las incidencias actuales, sin aplicar los
filtros visibles del listado. El informe PDF se construye como una página HTML
imprimible con fecha, total y tabla; el usuario usa **Guardar como PDF** en el
diálogo de impresión del navegador. Si se bloquea la pestaña, aparece un aviso.
No se descarga un PDF directamente desde la aplicación.

## Ejecución y comprobaciones

Con Node.js y npm instalados, desde la raíz del repositorio:

```text
npm ci
npm start
npm test -- --watch=false
npm run lint
npm run build
```

En PowerShell puede usarse `npm.cmd` si `npm` está bloqueado. La compilación de
producción crea `www`. El proyecto no añade dependencias para generar informes
ni para conectar bases de datos.

## Diseño y despliegue

Ionic proporciona los controles, el menú y la cuadrícula del resumen. Las hojas
SCSS ajustan formularios, filtros, botones y fuentes simuladas a pantallas
estrechas. Los campos tienen etiquetas; los avisos usan `role="alert"` o
`role="status"`, y el foco visible tiene un contorno global. El gráfico de
barras usa HTML y CSS y muestra también la cantidad en texto.

`angular.json` deja la salida en `www`; `vercel.json` configura ese directorio,
el comando de compilación y las rutas de la aplicación. Antes de entregar hay
que comprobar en Vercel qué rama se publica y probar la web desplegada con
ambos roles. La configuración del repositorio no publica por sí sola la versión
actual.

## Límites que debe confirmar el enunciado

No se ha localizado el enunciado original en el repositorio. Si exige SQL o
NoSQL reales, descarga directa de un archivo PDF, Compodoc o un informe
Lighthouse, esos apartados requieren trabajo adicional. No deben presentarse
las simulaciones como conexiones reales.
