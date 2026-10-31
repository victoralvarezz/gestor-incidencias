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
  espacios. Además, un validador asíncrono consulta `IncidenciasService` para
  impedir títulos repetidos sin distinguir mayúsculas ni espacios exteriores.
  Mientras se resuelve, el formulario no se puede guardar. Los errores se
  muestran junto al campo.
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
npm run docs:generate
```

En PowerShell puede usarse `npm.cmd` si `npm` está bloqueado. La compilación de
producción crea `www`. `docs:generate` crea
`docs/REFERENCIA_GENERADA.md` desde las rutas, guards, componentes y servicios
del código. Es la alternativa de documentación generada a Compodoc y usa solo
Node. El proyecto no añade dependencias para generar informes ni para conectar
bases de datos.

## Diseño y despliegue

Ionic proporciona los controles y el menú; CSS Grid ordena el resumen. El listado
muestra columnas en escritorio y tarjetas en pantallas estrechas. Las hojas SCSS
ajustan formularios, filtros, botones y fuentes simuladas. Los campos tienen
etiquetas; los avisos usan `role="alert"` o
`role="status"`, y el foco visible tiene un contorno global. El pequeño gráfico
circular usa CSS y los estados reales del Signal; la leyenda muestra también
la cantidad en texto.

`angular.json` deja la salida en `www`; `vercel.json` configura ese directorio,
el comando de compilación y las rutas de la aplicación. Antes de entregar hay
que comprobar en Vercel qué rama se publica y probar la web desplegada con
ambos roles. La configuración del repositorio no publica por sí sola la versión
actual.

El workflow `.github/workflows/ci.yml` se ejecuta al subir cambios a `develop`
o abrir una solicitud de cambios hacia esa rama. Comprueba que la referencia
generada está actualizada y ejecuta pruebas, lint y build. Su resultado se debe
revisar en GitHub tras el push.

## Límites y comprobaciones externas

El enunciado permite simular SQL/REST y NoSQL; los dos JSON cumplen ese alcance.
No deben presentarse como conexiones reales. La exportación PDF usa la función
de impresión del navegador, de modo que hay que comprobar manualmente el
archivo guardado. El objetivo de 90 en Lighthouse para Accesibilidad y Buenas
Prácticas aún necesita una medición real en navegador. Tampoco se ha verificado
la publicación actual de Vercel como parte de esta fase.
