# Manual de usuario

## Acceso

Abre la aplicación e inicia sesión como `alumno` o `admin`, con la contraseña de prueba `1234`. Los dos campos son obligatorios. Si los dejas vacíos, el formulario muestra un aviso; si los datos no coinciden, verás un mensaje de acceso incorrecto. Usa **Cerrar sesión** en el menú lateral al terminar.

## Consultar y registrar incidencias

En **Incidencias**, utiliza la búsqueda y los filtros de estado y prioridad. El contador indica cuántas incidencias coinciden. Si ninguna coincide, aparece un mensaje en lugar de una lista vacía.

Abre el menú lateral y selecciona **Nueva incidencia**. Escribe un título de al menos 3 caracteres, una descripción de al menos 10 y elige una prioridad. Los espacios al principio y al final no cuentan para las longitudes mínimas y se eliminan al guardar. Si falta algún dato, verás un aviso junto al campo. Pulsa **Guardar incidencia**. La nueva incidencia aparece como **Pendiente** en el listado y actualiza el resumen del administrador.

## Funciones del administrador

En **Incidencias**, cambia el estado con el selector de cada fila. En **Panel de control**, consulta los totales y el gráfico. **Descargar CSV** guarda todas las incidencias actuales, aunque haya filtros activos en el listado. El archivo usa `;` como separador y se puede abrir en una hoja de cálculo.

**Informe PDF** abre el informe en otra pestaña: pulsa **Imprimir o guardar como PDF** y selecciona el destino PDF del navegador. Si el navegador bloquea la pestaña, la aplicación muestra un aviso. Permite ventanas emergentes para esta aplicación e inténtalo de nuevo. La aplicación prepara el informe imprimible; es el navegador quien crea el archivo PDF.

En **Fuentes de datos de demostración**, pulsa **Cargar fuentes simuladas** para ver dos ejemplos de datos que llegan de forma asíncrona. Son archivos JSON locales: uno representa filas SQL/REST y otro documentos NoSQL.

## Importante

Esta versión es una práctica: los datos nuevos y los cambios de estado se pierden al recargar. La sesión se conserva solo en la pestaña actual. Las cuentas de prueba no protegen información real y la aplicación no se conecta a bases de datos reales.

## Comprobación rápida antes de entregar

1. Entra como `alumno`, crea una incidencia y comprueba que aparece en el listado. No debe aparecer el panel de control ni el selector para cambiar estados.
2. Cierra sesión, entra como `admin` y cambia un estado. Comprueba que cambian las cifras del panel y el gráfico.
3. Descarga el CSV y abre el informe para guardarlo como PDF. Revisa que incluyen la incidencia creada.
4. Prueba la aplicación con teclado y en una pantalla estrecha: el menú, los formularios, los filtros y los botones deben seguir siendo utilizables.
