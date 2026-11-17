# inventory (client)

**Epic:** 2 — Ingesta de Inventario del Usuario / Epic 4 — UI y Persistencia

## Qué va aquí

Módulo frontend encargado de la gestión e ingesta del inventario de personajes del usuario:

- **Carga manual de personajes**: Modal de selección de personajes de Teyvat con carrusel, vista de atributos y filtro elemental.
- **Selector de constelaciones**: Configuración de constelación (C0 a C6) para cada personaje del inventario.
- **Visualización de inventario**: Lista y cuadrícula con los personajes agregados y opciones para eliminarlos.
- **Persistencia en cliente**: Guardado del estado del equipo en el navegador (actualmente `localStorage`, con migración prevista a `IndexedDB`).
- **Próximas fases**: Entrada de UID y consumo del proxy backend hacia Enka.Network.

## Estructura del módulo

```
inventory/
├── components/
│   ├── CharacterCarousel.jsx     → Carrusel horizontal para navegar personajes
│   ├── CharacterModal.jsx        → Modal principal para añadir personajes al inventario
│   ├── CharacterShowcase.jsx     → Ficha de presentación con splash art y atributos
│   ├── ConstellationSelector.jsx → Selector visual de constelación C0-C6
│   ├── ElementFilter.jsx         → Filtro por elemento (Pyro, Hydro, Anemo, etc.)
│   └── InventoryList.jsx         → Lista/grid de personajes en inventario y estado vacío
├── data/
│   └── characters.js             → Catálogo mock/inicial de personajes y elementos
├── index.js                      → Barrel exports del módulo
└── README.md                     → Documentación del módulo
```

## Qué NO va aquí

- Cálculo de sinergias o afinidad de equipos (corresponde a `src/affinity/`).
- Layout y vistas globales del dashboard principal (corresponde a `src/dashboard/`).
- Helpers genéricos o tipos transversales (corresponden a `src/shared/`).
