# shared/affinity-engine

**Epic:** 3 — Motor de Afinidad de Equipos (VGBuilder)

## Qué va aquí

El algoritmo completo de afinidad, sinergia y recomendación de equipos (Tasks 3.1.1, 3.1.2, 3.2.2, 3.3.2), implementado como funciones puras de TypeScript.

Este módulo se ejecuta en dos contextos:

1. **En el navegador** (importado desde `client/` en el Epic 4): se ejecuta contra el inventario real del usuario en IndexedDB, calculando el Top 5 en < 30 ms en memoria.
2. **En el backend**: importado para correr la suite de pruebas unitarias con `bun test` sin requerir navegador ni conexión a base de datos.

## Estructura de Módulos

```
shared/affinity-engine/
├── types.ts              → Contratos TypeScript del motor (MatchInput, TeamMatchResult, etc.)
├── roster-data.ts        → Catálogo de referencia KQM (21 personajes, 11 sets, binds, presets)
├── artifact-binder.ts    → Asignación de los 11 sets de soporte universal y cascada de colisiones
├── scoring.ts            → Función matemática de puntuación v2.0 (diminishing returns, blueprint, etc.)
├── matcher.ts            → Bucle combinatorio C(K,3), filtrado de anti-tags y generación del Top 5
├── affinity-engine.ts    → Punto de entrada público (re-exporta motor + funciones legacy)
└── affinity-engine.test.ts → Suite completa de pruebas con Bun test
```

## Regla de Oro de esta Carpeta

**Cero dependencias de Elysia, Drizzle, PostgreSQL o `window`/DOM.**  
El motor es 100% determinista y puramente computacional. Si una función requiere base de datos o llamadas HTTP, pertenece a `server/src/affinity/affinity.service.ts`.

## Ejecución de Pruebas

Para validar el motor y los escenarios de Diluc, Razor (anti-tags), Ningguang y cascadas de artefactos:

```bash
cd server
bun test
```
