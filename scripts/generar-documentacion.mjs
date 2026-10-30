import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';

const raiz = resolve(import.meta.dirname, '..');
const leer = ruta => readFileSync(join(raiz, ruta), 'utf8');
const enlace = ruta => `../${relative(raiz, ruta).split(sep).join('/')}`;

function archivos(directorio) {
  return readdirSync(join(raiz, directorio), { withFileTypes: true }).flatMap(entrada => {
    const ruta = join(directorio, entrada.name);
    return entrada.isDirectory() ? archivos(ruta) : [join(raiz, ruta)];
  });
}

const codigoRutas = leer('src/app/app.routes.ts');
const coincidencias = [...codigoRutas.matchAll(/path:\s*'([^']*)'/g)];
const rutas = coincidencias.map((coincidencia, indice) => {
  const fin = coincidencias[indice + 1]?.index ?? codigoRutas.length;
  const bloque = codigoRutas.slice(coincidencia.index, fin);
  const guard = bloque.match(/canActivate:\s*\[([^\]]+)\]/)?.[1] ?? '—';
  const lazy = bloque.includes('loadComponent') ? 'Sí' : 'No';
  const ruta = coincidencia[1] || '/';
  return `| \`${ruta}\` | ${guard} | ${lazy} |`;
});

const componentes = archivos('src/app/components')
  .filter(ruta => ruta.endsWith('.component.ts'))
  .sort()
  .map(ruta => {
    const codigo = readFileSync(ruta, 'utf8');
    const nombre = codigo.match(/export class (\w+)/)?.[1] ?? 'Sin nombre';
    const entradas = [...codigo.matchAll(/@Input\(\)\s+(\w+)/g)].map(x => x[1]).join(', ');
    const salidas = [...codigo.matchAll(/@Output\(\)\s+(\w+)/g)].map(x => x[1]).join(', ');
    return `| [${nombre}](${enlace(ruta)}) | ${entradas || '—'} | ${salidas || '—'} |`;
  });

const servicios = archivos('src/app/services')
  .filter(ruta => ruta.endsWith('.service.ts'))
  .sort()
  .map(ruta => {
    const nombre = readFileSync(ruta, 'utf8').match(/export class (\w+)/)?.[1] ?? 'Sin nombre';
    return `- [${nombre}](${enlace(ruta)})`;
  });

const guardias = [...leer('src/app/guards/auth.guard.ts')
  .matchAll(/export const (\w+): CanActivateFn/g)]
  .map(x => `\`${x[1]}\``).join(', ');

const contenido = [
  '# Referencia técnica generada',
  '',
  '> Generada desde el código con `npm run docs:generate`. No editar a mano.',
  '',
  '## Rutas',
  '',
  '| Ruta | Guard | Carga lazy |',
  '| --- | --- | --- |',
  ...rutas,
  '',
  `Guards disponibles: ${guardias}.`,
  '',
  '## Componentes reutilizables',
  '',
  '| Componente | @Input | @Output |',
  '| --- | --- | --- |',
  ...componentes,
  '',
  '## Servicios',
  '',
  ...servicios,
  ''
].join('\n');

writeFileSync(join(raiz, 'docs/REFERENCIA_GENERADA.md'), contenido, 'utf8');
