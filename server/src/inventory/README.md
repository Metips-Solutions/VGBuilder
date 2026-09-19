# inventory

**Epic:** 2 — Ingesta de Inventario del Usuario

## Qué va aquí

Todo lo relacionado con traer el inventario real del jugador desde Enka.
Network, y (más adelante en el frontend) la carga manual de respaldo.

- `inventory.routes.ts` — endpoint `GET /inventory/:uid`
- `inventory.service.ts` — orquesta el fetch y normaliza la respuesta
- `enka.client.ts` — único archivo que le habla a la API externa de Enka

## Por qué existe como proxy

No confirmamos todavía si Enka permite llamadas CORS directas desde el
navegador. Mientras no se pruebe, este módulo actúa como intermediario:
el navegador nos llama a nosotros, nosotros llamamos a Enka del lado del
servidor (sin restricción de CORS ahí). Si se confirma que Enka sí permite
CORS, el frontend puede llamar directo y este módulo queda como respaldo.

## Qué NO va aquí

- Nada de la base de datos propia (este módulo no persiste nada del
  usuario — la persistencia del inventario es responsabilidad del cliente,
  en IndexedDB).
- Nada del cálculo de afinidad.
