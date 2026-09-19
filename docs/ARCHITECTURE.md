# Arquitectura de VGBuilder

Resumen de las decisiones de arquitectura del proyecto, para que quien entre
al repo no tenga que adivinar por qué está organizado así.

## Estilo de despliegue: monolito

Un solo proceso Bun/Elysia + una base de datos PostgreSQL. No hay
microservicios ni necesidad de ellos para el alcance del PoC (10 semanas,
un solo juego).

## Organización interna: capas + módulos por dominio

No usamos MVC clásico. En su lugar:

- **Capas** dentro de cada módulo: `*.routes.ts` (entrada HTTP) →
  `*.service.ts` (lógica de negocio) → `*.repository.ts` (acceso a datos).
- **Módulos por dominio**, no por tipo técnico: `catalog/`, `inventory/`,
  `affinity/`. Cada uno mapea 1:1 con un Epic del backlog.

Cada módulo es una instancia de Elysia independiente, combinada en
`src/index.ts` con `.use()`.

## El motor de afinidad vive en el cliente, no en el backend

El cálculo de sinergia/match (Epic 3) se ejecuta en el navegador, contra el
inventario que el usuario ya tiene en IndexedDB. El backend solo sirve el
catálogo (Epic 1) del que ese cálculo depende.

Por eso el algoritmo vive en `server/src/shared/affinity-engine/` como
**módulo TypeScript puro, sin dependencias de Elysia ni de la BD**: el mismo
archivo se importa desde el backend (solo para poder correrle pruebas
unitarias con `bun test`, rápido y sin navegador) y se empaqueta dentro del
build de React para ejecutarse de verdad en el cliente.

## Ingesta de inventario: posible proxy por CORS

`inventory.service.ts` está pensado para actuar como proxy hacia
Enka.Network si el navegador no puede llamarlo directo por CORS (pendiente
de probar). Si Enka sí permite CORS desde el navegador, este servicio se
queda casi vacío — no es un problema, es la opción segura por defecto.

## Persistencia del usuario: sin cuentas, sin login

No hay tablas de usuarios ni autenticación. El inventario y los resultados
viven en IndexedDB del navegador de cada quien. El backend nunca almacena
datos de un usuario particular — solo la metadata del juego (Epic 1).

## Docker para paridad entre entornos

El equipo desarrolla en Linux, Windows y macOS (mezcla de SOs), mientras
que producción corre en un servidor con Rocky Linux. Para evitar
diferencias de comportamiento entre entornos (versión de Postgres,
locale/encoding, etc.), Postgres siempre corre en Docker con una imagen
fija (`postgres:16-alpine`), y el servidor Elysia usa la misma imagen base
(`oven/bun:1`) tanto en desarrollo (opcional, vía `docker compose up
server`) como en el despliegue real en Rocky Linux. Esto significa que el
SO del host de cada desarrollador deja de ser un factor de riesgo — Docker
abstrae esa diferencia.

## Stack

| Capa | Tecnología |
|---|---|
| Base de datos | PostgreSQL |
| API | Elysia sobre Bun |
| ORM | Drizzle |
| Frontend | React + Vite (pendiente, Epic 4) |
| Persistencia cliente | IndexedDB |
| Hosting | Servidor propio + Nginx + PM2/systemd |
