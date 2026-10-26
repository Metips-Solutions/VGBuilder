# affinity (client)

**Epic:** 3 — Motor de Afinidad

## Qué va aquí

Cálculo de afinidad y sinergias que se ejecuta en el navegador contra el inventario del usuario.
Importará la lógica pura de TypeScript de `server/src/shared/affinity-engine/` para ejecutar el cálculo de sinergias del equipo sin necesidad de procesar en el backend.

## Qué NO va aquí

- Almacenamiento del inventario (va en `src/inventory/`).
- Componentes de UI generales (van en `src/dashboard/`).
