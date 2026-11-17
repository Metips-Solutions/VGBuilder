# client — Frontend de VGBuilder

**Epic:** 4 — UI y Persistencia (con integración de Epic 2 para la Ingesta de Inventario)

Aplicación web Single Page Application (SPA) desarrollada con **React 19**, **Vite** y ejecutada sobre el runtime **Bun**.

---

## Estructura del cliente

Siguiendo la convención de arquitectura del proyecto, el código está organizado por **módulo/dominio funcional** (feature-driven) en lugar de agrupar por tipo técnico:

```
client/
├── public/
│   └── Images/
│       └── Genshin Impact/       → Assets estáticos (Icons, Splash Art, Namecards, TCG)
├── src/
│   ├── inventory/                → Epic 2 & 4: Gestión de inventario (manual y Enka)
│   │   ├── components/           → Componentes visuales de selección y lista de equipo
│   │   ├── data/                 → Datos locales de catálogo (characters.js)
│   │   ├── index.js              → Barrel export público del módulo
│   │   └── README.md             → Documentación específica del módulo
│   ├── affinity/                 → Epic 3: Motor de afinidad en navegador (pendiente)
│   ├── dashboard/                → Epic 4: Layout y dashboard principal (pendiente)
│   ├── shared/                   → Cliente HTTP, tipos y utilidades transversales
│   ├── App.jsx                   → Contenedor raíz de la aplicación
│   ├── index.css                 → Sistema de diseño (Dark Theme inspirado en Spotify)
│   └── main.jsx                  → Punto de entrada de React DOM
├── index.html                    → Plantilla HTML con tipografía Plus Jakarta Sans
├── vite.config.js                → Configuración de Vite y proxy hacia el backend (:3000)
├── tsconfig.json                 → Configuración de TypeScript
└── package.json                  → Dependencias y scripts del frontend
```

---

## Sistema de diseño

La interfaz gráfica implementa un tema oscuro inmersivo (con soporte para alternar a tema claro) inspirado en los patrones visuales y ergonomía de Spotify:
- **Colores base**: Superficies carbón y casi negras (`#121212`, `#181818`, `#1f1f1f`).
- **Geometría**: Botones píldora redondeados (radius 9999px), selectores de constelaciones táctiles y carruseles fluidos.
- Documento completo y prototipo en: [`docs/design/DESIGN.md`](../docs/design/DESIGN.md) y [`docs/design/Prototipo_Base.jpg`](../docs/design/Prototipo_Base.jpg).

---

## Comandos para desarrollo

Todos los comandos se ejecutan dentro del directorio `client/`:

```bash
cd client
```

### 1. Instalar dependencias
```bash
bun install
```

### 2. Iniciar servidor de desarrollo (Hot Reload)
```bash
bun run dev
```
Inicia Vite en `http://localhost:5173`. Las llamadas a `/catalog`, `/inventory` y `/affinity` se redirigen automáticamente al backend en `http://localhost:3000`.

### 3. Compilar para producción
```bash
bun run build
```
Genera la versión optimizada en la carpeta `dist/`.

### 4. Previsualizar compilación de producción
```bash
bun run preview
```
Inicia el servidor local de prueba para los archivos de `dist/` en `http://localhost:4173`.
