# shared/affinity-engine

**Epic:** 3 — Motor de Afinidad de Equipos

## Qué va aquí

El algoritmo de afinidad/sinergia/match en sí (Tasks 3.1.1, 3.1.2, 3.2.2,
3.3.2), como funciones puras de TypeScript.

Este archivo se ejecuta en dos contextos:

1. **En el navegador** (importado desde `client/`) — ahí es donde corre de
   verdad, contra el inventario real del usuario.
2. **Aquí, en el backend** — solo para poder probarlo con `bun test` sin
   necesitar un navegador. Ver `affinity-engine.test.ts`.

## Regla de oro de esta carpeta

**Cero dependencias de Elysia, de Drizzle, o de `window`/DOM.** Si una
función necesita la base de datos o el request HTTP, no pertenece aquí —
pertenece a `affinity.service.ts` (en `server/src/affinity/`).

Cuando se arranque el `client/` (Epic 4), este archivo se copia o se
referencia ahí tal cual — no se reescribe.
