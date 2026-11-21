# client — Frontend de VGBuilder

**Epic:** 4 — UI y Persistencia (con integración de Epic 2 para Ingesta de Inventario y Epic 3 para Afinidad)

Aplicación web híbrida construida con **Astro (`output: 'static'`)**, **Islas React 19** (`@astrojs/react`) y ejecutada sobre el runtime **Bun** con servidor estático + proxy en **Elysia**.

---

## Arquitectura del cliente

Las páginas informativas y de navegación (`/`, `/404`) se generan como HTML + CSS puro sin JavaScript de React, mientras que las herramientas interactivas (`/genshin`) se cargan como islas React aisladas (`client:only="react"`):

```text
client/
├── public/
│   └── Images/                     → Assets estáticos (logos, banners, Genshin Impact, stckersGI)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro        → Shell HTML, Google Fonts, anti-FOUC de tema, Header y Footer
│   ├── components/layout/
│   │   ├── Header.astro            → Cabecera independiente (logo nativo + toggle light/dark)
│   │   └── Footer.astro            → Pie independiente (info + <dialog> nativo de reset local)
│   ├── pages/
│   │   ├── index.astro             → Portada / directorio de juegos (HTML/CSS puro)
│   │   ├── genshin.astro           → Ruta /genshin (carga CSS del motor + isla GenshinWorkspace)
│   │   └── 404.astro               → Página 404 estática
│   ├── styles/
│   │   ├── global.css              → Tokens de diseño, temas, botones base y modales Apple HIG
│   │   ├── header.css              → Estilos de Header.astro
│   │   ├── footer.css              → Estilos de Footer.astro
│   │   ├── dashboard.css           → Estilos de portada y 404
│   │   └── genshin/                → Hojas separadas del motor (inventory, affinity, modals)
│   ├── inventory/
│   │   ├── GenshinWorkspace.jsx    → Contenedor de estado/modales de la isla React
│   │   ├── GenshinEngine.jsx       → Motor de pestañas (Personajes, Creación Equipos, Guardados)
│   │   ├── components/             → Componentes visuales interactivos
│   │   └── data/                   → Catálogos estáticos locales
│   ├── affinity/                   → Motor de afinidad local (Epic 3)
│   └── shared/                     → Componentes compartidos (AppleConfirmModal)
├── astro.config.mjs                → Configuración Astro + React + proxy dev (:3000) + redirects
├── server.ts                       → Servidor Elysia de producción (dist/ + HTTP 404 real + proxy)
├── server.test.ts                  → Pruebas unitarias de enrutamiento, seguridad y proxy
├── tsconfig.json                   → Configuración TypeScript para Astro + React + Bun
└── package.json                    → Dependencias y scripts
```

---

## Comandos para desarrollo y producción

Todos los comandos se ejecutan dentro del directorio `client/`:

```bash
cd client
```

### 1. Instalar dependencias
```bash
bun install
```

### 2. Iniciar servidor de desarrollo
```bash
bun run dev
```
Inicia Astro en `http://localhost:5173`. Las llamadas a `/api`, `/catalog`, `/inventory` y `/affinity` se redirigen automáticamente al backend en `http://localhost:3000`.

### 3. Compilar para producción
```bash
SITE_URL=https://tu-dominio.com bun run build
```
Genera la versión estática optimizada en `dist/`. La variable `SITE_URL` (por defecto `https://vgbuilder.app`) configura `Astro.site` para generar URLs canónicas y etiquetas Open Graph / Twitter Cards absolutas (`og-image.jpg`).

### 4. Ejecutar en producción (Elysia + Proxy API)
```bash
SERVER_URL=http://localhost:3000 PORT=3001 bun run start
```
Sirve `dist/` con códigos HTTP 404 reales y reenvía `/api/*` (excepto `/api/health`), `/catalog*`, `/inventory*` y `/affinity*` hacia `SERVER_URL`.

### 5. Ejecutar pruebas
```bash
bun test
```
