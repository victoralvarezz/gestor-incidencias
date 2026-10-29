# Gestor de incidencias

## Accesos de demostración

| Usuario | Contraseña | Rol |
| --- | --- | --- |
| `alumno` | `1234` | Usuario estándar: consulta y comunica incidencias |
| `admin` | `1234` | Administrador: consulta, crea, cambia estados y accede al dashboard |

La autenticación es simulada en el navegador mediante `AuthService` y `sessionStorage`. Estos controles sirven para la práctica; no constituyen seguridad de servidor.

## Fase 3: datos y exportación

El gráfico y el CSV usan las incidencias del `IncidenciasService`. Esas incidencias son datos de prueba guardados en un Signal. Al recargar la página, las incidencias nuevas y los cambios de estado se pierden. El CSV descarga una copia de la lista actual; no guarda datos en una base de datos.

El botón **Informe PDF** abre un informe preparado para imprimir. En la nueva pestaña se pulsa **Imprimir o guardar como PDF** y se elige **Guardar como PDF** en el diálogo del navegador. Esta opción no necesita una librería de PDF; el archivo lo genera el navegador.

### Persistencia y consumo asíncrono pendientes

Todavía no hay conexión SQL ni NoSQL, servidor, API ni credenciales. Para cumplir ese apartado del enunciado habría que elegir con el profesor una base de datos y un servidor que controle los roles. El navegador llamaría de forma asíncrona a una API con operaciones sencillas: `GET /incidencias` para consultar, `POST /incidencias` para crear y `PATCH /incidencias/:id` para cambiar el estado. El servicio Angular recibiría la respuesta y actualizaría el Signal; el servidor guardaría los datos en SQL o NoSQL y comprobaría que solo un administrador puede cambiar estados y exportar la información.

En la aplicación actual, los roles se comprueban en el navegador y solo sirven para demostrar el flujo. No deben considerarse autorización real hasta que el servidor haga esa comprobación.
