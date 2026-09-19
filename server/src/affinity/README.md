# affinity

**Epic:** 3 — Motor de Afinidad de Equipos

## Qué va aquí

Endpoints de solo lectura que exponen los datos que el cliente necesita
para poder calcular afinidad/sinergia por su cuenta: la tabla de afinidad
entre tags y los presets de equipos meta.

- `affinity.routes.ts` — `GET /affinity/tag-affinities`, `GET /affinity/presets`
- `affinity.service.ts` — consulta esos datos (sin calcular nada)

## Qué NO va aquí — importante

**El algoritmo en sí (scoring de sinergia, match %, sugerencia de sets) no
vive en este módulo.** Vive en `server/src/shared/affinity-engine/`, como
módulo TypeScript puro, y se ejecuta de verdad en el navegador. Este
módulo del backend solo le da al cliente los datos crudos que ese motor
necesita para funcionar.

Si te encuentras escribiendo lógica de cálculo aquí, probablemente
pertenece a `shared/affinity-engine/` en su lugar.
