# VGBuilder — Plataforma de Optimización Gacha (PoC: Genshin Impact)

Monorepo del proyecto. Contiene el backend (`server/`) y, más adelante, el
frontend (`client/`).

## Estructura del repositorio

```
vgbuilder/
├── server/          → Backend (Bun + Elysia + Drizzle + PostgreSQL)
├── client/          → Frontend (React + Vite) — se agrega en el Epic 4
└── docs/            → Decisiones de arquitectura y notas técnicas
```

## Convención: cada carpeta explica su propósito

Para que cualquiera del equipo (o quien revise el proyecto) entienda qué hace
cada módulo sin tener que leerse todo el código, seguimos esta regla simple:

- **Cada carpeta de módulo dentro de `server/src/` tiene su propio
  `README.md`** con: a qué Epic del backlog corresponde, qué responsabilidad
  tiene, y qué NO debe vivir ahí.
- **`docs/ARCHITECTURE.md`** tiene el resumen de las decisiones grandes
  (por qué este stack, por qué esta organización de carpetas) para no tener
  que repetir la discusión cada vez que alguien nuevo entra al proyecto.

Si agregan una carpeta nueva, agréguenle su README el mismo día — así no se
queda como deuda pendiente.

## Mapeo Epic → Carpeta

| Epic | Carpeta |
|---|---|
| Epic 1 — Metadata | `server/src/catalog/` |
| Epic 2 — Ingesta de Inventario | `server/src/inventory/` |
| Epic 3 — Motor de Afinidad | `server/src/shared/affinity-engine/` (lógica compartida) + `server/src/affinity/` (rutas) |
| Epic 4 — UI y Persistencia | `client/` (pendiente de scaffolding) |

## Por qué Docker

El equipo trabaja en tres sistemas operativos distintos (Linux, Windows) y
el servidor de producción corre Rocky Linux. Para que nadie tenga bugs de
"en mi máquina sí funciona" por diferencias de versión de Postgres, **la
base de datos siempre corre en Docker**, sin importar tu SO. El servidor
Elysia puede correr en Docker también (paridad total con producción) o
directo en tu máquina con `bun run dev` (más cómodo para desarrollo día a
día, con hot-reload nativo de Bun) — ambas opciones están soportadas.

## Cómo arrancar el backend

**Opción A — Postgres en Docker, servidor con Bun local (recomendado para
el día a día):**

```bash
docker compose up -d db          # solo levanta Postgres
cd server
bun install
cp .env.example .env             # DATABASE_URL ya apunta a localhost por defecto
bun run db:push                  # crea las tablas
bun run dev
```

**Opción B — Todo en Docker (para probar paridad exacta con el servidor
Rocky Linux):**

```bash
cp server/.env.example server/.env
docker compose up --build
```

El servidor levanta en `http://localhost:3000` en ambos casos.

## Cómo correr las pruebas del motor de afinidad

```bash
cd server
bun test
```

## Frontend (Epic 4, todavía no arrancado)

Cuando lleguen a esa fase, generar el proyecto con:

```bash
bun create vite@latest client -- --template react-ts
```

y seguir la convención de módulos por Epic también ahí (una carpeta por
feature, no por tipo de archivo).
