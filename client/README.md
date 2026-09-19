# client (pendiente — Epic 4)

Todavía no se genera el proyecto de React aquí. Cuando lleguen a esa fase
del cronograma (Sprint 8-9), correr desde la raíz del repo:

```bash
bun create vite@latest client -- --template react-ts
```

## Convención a seguir cuando se arranque

Igual que en `server/`, organizar por módulo/feature y no por tipo de
archivo (nada de una carpeta `components/` genérica con todo mezclado):

```
client/src/
├── inventory/     → input de UID, fetch (directo o vía proxy), estado del inventario
├── affinity/      → copia o import del mismo shared/affinity-engine/ del backend
├── dashboard/     → UI principal, Task 4.1.3
└── shared/        → cosas realmente transversales (llamadas fetch genéricas, tipos)
```

Cada carpeta nueva que agreguen aquí también debería llevar su propio
`README.md` corto, siguiendo la misma convención del backend.
