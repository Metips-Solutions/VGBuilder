# catalog

**Epic:** 1 — Arquitectura y Gestión de Metadata

## Qué va aquí

Todo lo relacionado con la metadata oficial del juego: personajes, tags,
sets de artefactos, presets de equipos. Es de **solo lectura** — nadie
escribe en estas tablas desde una request HTTP normal, se pueblan por
script/seed (Task 1.1.3).

- `catalog.routes.ts` — endpoints HTTP (`GET /catalog/...`)
- `catalog.service.ts` — combina y formatea datos para la API
- `catalog.repository.ts` — único lugar que hace queries a `characters`,
  `tags`, `character_tags`, `artifact_sets`, `team_presets`

## Qué NO va aquí

- Nada del inventario del usuario (eso es `inventory/`).
- Nada del cálculo de afinidad (eso es `shared/affinity-engine/` +
  `affinity/`).
