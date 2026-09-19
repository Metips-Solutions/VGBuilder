# shared/db

**Epic:** 1 — Arquitectura y Gestión de Metadata

## Qué va aquí

- `schema.ts` — definición de todas las tablas (Drizzle). Fuente de verdad
  del modelo de datos.
- `client.ts` — la única instancia de conexión a Postgres. Todo lo demás en
  el proyecto importa `db` desde aquí, nunca crea su propia conexión.
- `migrations/` — generado automáticamente por `bun run db:generate`, no
  editar a mano.

## Qué NO va aquí

- Lógica de negocio. Este módulo solo describe la forma de los datos y da
  acceso a la conexión — las queries específicas de cada dominio viven en
  el `*.repository.ts` de su propio módulo (`catalog/`, `inventory/`, etc.).
