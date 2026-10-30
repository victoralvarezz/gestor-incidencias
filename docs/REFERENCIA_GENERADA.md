# Referencia técnica generada

> Generada desde el código con `npm run docs:generate`. No editar a mano.

## Rutas

| Ruta | Guard | Carga lazy |
| --- | --- | --- |
| `/` | — | No |
| `login` | — | Sí |
| `pages/dashboard` | adminGuard | Sí |
| `pages/incidencias` | authGuard | Sí |
| `pages/nueva-incidencia` | authGuard | Sí |
| `**` | — | No |

Guards disponibles: `authGuard`, `adminGuard`.

## Componentes reutilizables

| Componente | @Input | @Output |
| --- | --- | --- |
| [IncidenciaItemComponent](../src/app/components/incidencia-item/incidencia-item.component.ts) | incidencia, puedeCambiarEstado | estadoCambiado |
| [TarjetaResumenComponent](../src/app/components/tarjeta-resumen/tarjeta-resumen.component.ts) | titulo, cantidad | pulsada |

## Servicios

- [AuthService](../src/app/services/auth.service.ts)
- [ExportacionService](../src/app/services/exportacion.service.ts)
- [FuentesDemoService](../src/app/services/fuentes-demo.service.ts)
- [IncidenciasService](../src/app/services/incidencias.service.ts)
