# VGBuilder — Documentación de Características y Arquitectura Frontend

Este documento recopila las características diseñadas, implementadas y optimizadas en el frontend de **VGBuilder**, abarcando la experiencia de usuario, la integración del motor de afinidad de equipos, la navegación multi-juego y la persistencia local.

---

## 1. Generación de la Página Principal y Enrutamiento

### 1.1. Arquitectura de la Pantalla Principal (`App.jsx`)
La interfaz está construida con un sistema de diseño modular en React y CSS moderno con soporte nativo de **Modo Oscuro (Dark Mode)** y **Modo Claro (Light Mode)** mediante variables CSS (`--bg-surface`, `--text-primary`, `--accent-cyan`, `--border-subtle`).

El layout principal se compone de:
- **Cabecera Global Compacta (`.app-header`)**:
  - **Identidad de Marca Oficial**: Se sustituyó el isotipo genérico anterior por el nuevo logotipo oficial de la plataforma (`/LogoVGBuilder.png`), eliminando toda referencia previa a "Astra" para consolidar la marca exclusivamente como **VGBuilder**.
  - **Header Minimalista y Reducido**: Se removieron los botones de agregar personajes y sincronización de Enka de la cabecera, reduciendo el relleno vertical (`padding: 12px 28px`) para aprovechar al máximo el espacio útil de la pantalla.
  - **Botón de Modo Oscuro / Claro**: En lugar de un control deslizante (switch track), se implementó un **botón simple y circular (`.theme-simple-btn`)** que alterna reactivamente su emoji según el tema activo:
    - Modo Oscuro activo: `🌙`
    - Modo Claro activo: `☀️`
- **Contenedor Principal (`.main-content`)**: Renderiza condicionalmente las vistas activas según la ruta actual sin necesidad de recargar la página.
- **Pie de Página (`.app-footer`)**: Incluye la información legal de Metips Solutions, identificador de versión (`VGBuilder PoC v0.1.0`) y una acción de mantenimiento para restablecer los datos locales (`localStorage.clear()`).

### 1.2. Enrutamiento Implementado (`router.jsx`)
Para mantener el cliente ligero y sin dependencias externas pesadas, VGBuilder implementa un enrutador basado en el historial del navegador (`window.history.pushState` y evento `popstate`):

- **Ruta Raíz (`/` o `''`)**: Renderiza `HomePage.jsx`, una pantalla de bienvenida donde se presentan los motores de juego disponibles y las métricas de la plataforma.
- **Ruta del Motor (`/genshin` o `/genshin-impact`)**: Renderiza `GenshinEngine.jsx`, el núcleo de gestión de inventario y optimización de afinidades.
- **Ruta 404 (Cualquier ruta no registrada)**: Renderiza `NotFoundPage.jsx`, con un diseño estilizado que informa la ruta errónea consultada y ofrece un botón de retorno a Inicio.

### 1.3. Comportamiento Contextual de la Cabecera en `/genshin`
- Al navegar dentro de `/genshin`, la cabecera **oculta automáticamente los botones de navegación entre motores** ("Motor Genshin Impact" y "Más Pronto").
- La cabecera se simplifica para mostrar exclusivamente el logotipo oficial de **VGBuilder** a la izquierda y el botón de tema dinámico a la derecha.

### 1.4. Propuesta y Visión a Futuro
- **Expansión Multi-Juego**: El botón `+ Más (Pronto)` en la pantalla principal está proyectado para incorporar motores de otros títulos gacha líderes del mercado:
  - *Honkai: Star Rail* (rutas de Vía, Tipos de Combate, Sinergias de Ruptura e Hipercarry).
  - *Zenless Zone Zero* (atributos elementales, anomalías y facciones).
  - *Wuthering Waves* (resonancias y cadenas de habilidades Forte).
- **Perfiles y Cuentas de Usuario**: Migración opcional de LocalStorage a autenticación en backend para sincronización multi-dispositivo y almacenamiento en la nube de escuadras guardadas.
- **Importadores Adicionales**: Soporte para formatos JSON de Good (Genshin Open Object Description) y escaneo de capturas OCR.

---

## 2. Frontend de los Equipos Generados y Guardados

### 2.1. Switch de Navegación en el Inventario (`GenshinEngine.jsx`)
Se eliminó el banner superior estático redundante para maximizar el espacio vertical útil de la pantalla. En su lugar, la interfaz se organiza mediante un **Switch de Pestañas (Tab Switcher)** accesible e intuitivo:

1. `👥 Mi Inventario (N)`: Administrador del catálogo de personajes del jugador.
2. `⚡ Optimizador de Afinidad`: Ventana de cálculo de equipos óptimos y sinergias KQM.
3. `💾 Equipos Guardados (N)`: Vista limpia de las composiciones almacenadas.

### 2.2. Pestaña "Mi Inventario" (`InventoryList.jsx`)
- **Acciones Centralizadas**: Los botones para incorporar personajes se trasladaron exclusivamente a esta vista dentro de `.inventory-header-actions`:
  - `⚡ Sincronizar Enka`: Importa y actualiza personajes y constelaciones directamente desde perfiles de Enka.Network.
  - `+ Agregar Personaje`: Abre el modal interactivo con carrusel, selector de constelación (C0-C6) y showcase.
- **Botón de Eliminación en Esquina con "✕" (`.inventory-delete-btn`)**:
  - Cada tarjeta de personaje cuenta con un botón circular ubicado en la esquina superior derecha (`position: absolute; top: 10px; right: 10px;`).
  - Fondo translúcido con desenfoque de cristal y transición a rojo carmesí (`#ef4444`) con elevación al hacer hover.
- **Evento de Mantener Presionado (Long-Press para Teléfonos)**:
  - En dispositivos móviles táctiles, el usuario puede mantener presionada la tarjeta durante 650 ms para borrar el personaje del inventario sin requerir pulsar exactamente el botón pequeño de la esquina.
  - **Scroll Guard**: Se detecta el movimiento del dedo; si el usuario se desplaza más de 10 píxeles (gesto de scroll en teléfono), el temporizador se cancela automáticamente evitando borrados accidentales.
  - **Feedback Visual y Háptico**: La tarjeta se contrae levemente (`scale(0.96)`) con borde rojo iluminado (`.is-pressing`), y emite una vibración corta (`navigator.vibrate(50)`).
- **Filtro Anti-Duplicados en "Agregar Personaje" (`CharacterModal.jsx`)**:
  - El modal filtra los personajes disponibles contra el inventario actual (`inventory`), evitando mostrar personajes ya incorporados al equipo. Si todos los personajes (o los de un elemento) ya han sido agregados, muestra un estado vacío informativo y deshabilita el botón de incorporar.
- **Mejora en Modo Claro (Light Mode)**: Se disminuyó la opacidad del gradiente de cobertura (`--card-backdrop` ajustado a `0.50` en bordes y `0.22` al centro) para que los artes de fondo (namecards) de cada personaje se aprecien con excelente fidelidad y contraste sin oscurecer los textos.

### 2.3. Pestaña "Optimizador de Afinidad" (`AffinityMatcher.jsx`)

#### A. Disposición en 2 Columnas Asimétricas
- **Columna Izquierda Angosta (300px, ~60% del ancho original)**: Dedicada a la selección del Carry y exploración rápida de acompañantes.
- **Columna Derecha Amplia (~75% del espacio en pantalla)**: Brinda el espacio necesario para que las tarjetas de los equipos sugeridos sean grandes, espaciosas y con un impacto visual premium.

#### B. Filtro Compacto por Elemento
- Barra superior de botones reducida en tamaño (altura 26px, iconos de 14px, tipografía 0.72rem), con badges de color elemental para Todos, Pyro, Hydro, Anemo, Electro, Dendro, Cryo y Geo.

#### C. Selección de Carry Integrada en la Tarjeta (Sin Botones Saturados)
- Se **eliminó el botón explícito "Seleccionar Carry"** y se removió la etiqueta redundante `🎯 CARRY ACTIVO`.
- **Interacción Fluida**:
  - Al hacer **clic en cualquier parte de la tarjeta del Main DPS** (fuera del icono de avatar), se ejecuta automáticamente la selección del Carry y la búsqueda de equipos por afinidad (`POST /affinity/match`).
  - La tarjeta activa se resalta con un borde rojizo iluminado distintivo (`row-selected-carry`).
  - **Función Desactivada en Soportes**: En las tarjetas de Sub-DPS, Soportes y Curadores esta función de clic está estrictamente desactivada para preservar su rol táctico de acompañamiento.

#### D. Interacción Monocromática para Exclusión de Personajes
- Para evitar sobrecargar la interfaz con botones adicionales de activación/desactivación, **hacer clic directamente sobre el icono/avatar de cualquier personaje alterna su estado a monocromático** (`filter: grayscale(100%); opacity: 0.4`).
- Al estar en escala de grises, el personaje se desactiva y se **excluye automáticamente del JSON** que se envía al endpoint. Un nuevo clic sobre el avatar le devuelve su color y lo reincorpora al cálculo.
- Se implementó `e.stopPropagation()` sobre el avatar para que alternar el estado monocromático no dispare accidentalmente la selección del Carry.

#### E. Leyenda de Soportes en Desarrollo
- Inmediatamente arriba de la lista de Sub-DPS, Soportes y Curadores, se ubica la leyenda informativa:
  > *⚙️ Trabajando en poder usar personajes que no sean Main Dps*

### 2.4. Tarjetas de Equipos Sugeridos y Guardados: Diseño sin Saturación y Stickers Amigables
Tanto en la lista de resultados del Optimizador como en la vista de Equipos Guardados ([SavedTeamsView.jsx](file:///home/tyreans/metips/vgbuilder/client/src/inventory/components/SavedTeamsView.jsx)), las tarjetas muestran **únicamente lo esencial**:

1. **Nombre del Arquetipo / Equipo**: Título tipográfico limpio y destacado (ej. *Vaporizados Clásico*, *Mono Geo Hiperdefensa*, *Tighnari Spread*).
2. **Botón de Guardado / Eliminación**: Botón `💾 Guardar Equipo` (con cambio a `✓ Guardado` tras pulsar) o botón `🗑️ Eliminar` en la vista de guardados.
3. **Cuadrícula de los 4 Personajes (`team-members-grid`) con Stickers Dinámicos**:
   - **Retratos de Stickers Amigables (`client/public/Images/stckersGI/`)**:
     - 50 personajes poseen **2 stickers amigables** que se renderizan de forma **aleatoria (50% / 50%)**.
     - Noelle cuenta con 1 sticker amigable (`noelle_shy.png`).
     - Aloy (quien no posee stickers en la carpeta) utiliza el icono oficial actual como fallback.
     - Ajuste `object-fit: contain` con padding suave y zoom en hover (`scale(1.08)`).
   - **Nombre**: En tipografía negrita destacada.
   - **Rol Táctico**: Main DPS, Sub-DPS, Support o Healer.
   - **Tag de Elemento**: Badge distintivo coloreado según el elemento Genshin.
   - **Sin Constelación**: Se omitieron las etiquetas `C0`, `C1` para un diseño limpio enfocado en la alineación del equipo.
4. **Set de Artefactos Sugerido**:
   - Al pie de cada integrante se muestra una píldora con el nombre del set de soporte óptimo asignado por el motor (ej. *Ritual Antiguo de la Nobleza*, *Sombra Verde Esmeralda*, *Set de Daño Personal*).
   - Si el personaje no requiere un set de soporte específico (como los Carries puros), se despliega con elegancia la leyenda:
     > `"Sin set sugerido"`

---

## 3. Persistencia de Equipos en LocalStorage

### 3.1. Clave de Almacenamiento y Estructura de Datos
Las composiciones seleccionadas por el usuario se persisten en el navegador bajo la clave:
```javascript
localStorage.getItem('genshin_saved_teams')
```

Para asegurar una estructura ligera, robusta y sin campos innecesarios, se omitió el timestamp:

```json
[
  {
    "id": "team_Vaporizados Clásico_Bennett_Diluc_Sucrose_Xingqiu",
    "rank": 1,
    "archetype": "Vaporizados Clásico",
    "totalScore": 8600,
    "targetCharacterId": 6,
    "team": [
      {
        "id": 6,
        "name": "Diluc",
        "element": "Pyro",
        "role": "Main DPS"
      },
      {
        "id": 21,
        "name": "Xingqiu",
        "element": "Hydro",
        "role": "Sub-DPS"
      },
      {
        "id": 4,
        "name": "Bennett",
        "element": "Pyro",
        "role": "Support"
      },
      {
        "id": 18,
        "name": "Sucrose",
        "element": "Anemo",
        "role": "Support"
      }
    ],
    "artifactAssignments": [
      {
        "characterId": 21,
        "characterName": "Xingqiu",
        "artifactSetName": "Set de Daño Personal (ej. Emblema)"
      },
      {
        "characterId": 4,
        "characterName": "Bennett",
        "artifactSetName": "Ritual Antiguo de la Nobleza"
      },
      {
        "characterId": 18,
        "characterName": "Sucrose",
        "artifactSetName": "Sombra Verde Esmeralda"
      }
    ]
  }
]
```

### 3.2. Ciclo de Vida del Guardado
1. **Generación de ID Determinista**: El ID único de cada equipo se genera combinando el arquetipo y los nombres ordenados alfabéticamente de los 4 integrantes (`team_${archetype}_${memberNames}`). Esto garantiza que el mismo equipo no se guarde duplicado.
2. **Feedback Visual Inmediato**: Al pulsar el botón `💾 Guardar Equipo`:
   - El botón pasa inmediatamente al estado verde `✓ Guardado`.
   - Se dispara un mensaje toast flotante en la esquina inferior (`¡Equipo guardado con éxito!`).
3. **Sincronización Reactiva con la Pestaña**: La pestaña `💾 Equipos Guardados` en el switch de navegación actualiza en tiempo real su contador numérico gracias a un listener sobre el estado y eventos de almacenamiento.
4. **Administración en `SavedTeamsView.jsx`**:
   - El usuario puede consultar todos sus equipos almacenados con sus avatares grandes, sets sugeridos y elementos.
   - Cada equipo cuenta con su botón `🗑️ Eliminar` individual.
   - Se incluye el botón `🗑️ Vaciar Guardados` con diálogo de confirmación para limpiar la colección completa.
   - Si no hay equipos guardados, se muestra un estado vacío que invita a explorar el Optimizador.
