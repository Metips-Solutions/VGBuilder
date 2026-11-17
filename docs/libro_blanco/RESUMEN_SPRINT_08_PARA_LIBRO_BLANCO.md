# Insumo de Documentación para el Libro Blanco — Sprint 8 (Semana 8 / Iteración I7)
**Para:** Luis Antonio Cuevas Ortiz (Responsable de la consolidación del Libro Blanco)  
**De:** Equipo de Desarrollo VGBuilder  
**Fecha de Entrega:** 14 de Noviembre de 2026  
**Referencia del Cierre Completo:** [`docs/libro_blanco/CierresSprints/CierreSprint_08_VGBuilder.docx.md`](./CierresSprints/CierreSprint_08_VGBuilder.docx.md)

---

## 1. Actualización de la Tabla del Cronograma General (Sección 4.1 del Libro Blanco)

*Fila actualizada para la tabla comparativa de sprints:*

| Sprint | Código | Fase | Fechas (Inicio - Cierre) | Epic | Tasks Principales | Objetivo del Sprint | Estado |
| :---: | :---: | :---: | :---: | :---: | :--- | :--- | :---: |
| **8** | I7 | Elaboración | 08-Nov-2026 — 14-Nov-2026 | Epic 4 | 4.1.1 Input UID + estado cliente [M], 4.1.2 Persistencia local [S] | Ingesta de perfil Enka con Clipboard API y persistencia de inventario en LocalStorage | **Concluido** (Persistencia de resultados diferida al Sprint 9) |

---

## 2. Sección Detallada para Integrar en el Libro Blanco (Sección 4.2.8)

*Texto formateado y listo para copiar/pegar en la sección secuencial de sprints del Libro Blanco:*

```markdown
#### 4.2.8. Sprint 8 (Semana 8 — Epic 4)
- **Código de Iteración:** I7 | **Fechas:** 08-Nov-2026 a 14-Nov-2026 | **Fase:** Elaboración.
- **Objetivo:** Ingesta de inventario desde perfiles de Enka.Network, manejo de estado reactivo y persistencia local del jugador.
- **Rama principal asociada:** `ModuloInventariosUX`.
- **Hitos completados:**
  - **4.1.1 Input UID + estado cliente (Evaluación: 100%):**
    - Botón interactivo en cabecera `⚡ Sincronizar Enka` junto al flujo manual.
    - Popup modal compacto (`EnkaSyncModal`) con entrada de URL de builds de Enka.
    - Integración con la Clipboard API nativa (`navigator.clipboard.readText()`) para pegado automático en 1 clic.
    - Acciones de control: botón Pegar, botón Borrar, botón Aceptar y feedback de carga asíncrona.
    - Normalización determinista de avatares y cálculo de constelaciones ($C_0-C_6$) cruzada con el catálogo local `CHARACTERS`.
    - Submódulo interactivo de Ayuda en 4 pasos desplegable dentro del modal (configuración in-game de privacidad, exhibidor público de hasta 8 personajes, obtención de enlace Enka y pegado).
  - **4.1.2 Persistencia local de inventario y resultados (Evaluación: 50%):**
    - **Persistencia de inventario (Completada):** Estado del inventario reactivo en React 19 sincronizado bidireccionalmente con `localStorage` bajo la clave `genshin_inventory_team`.
    - **Estrategia de Fusión Inteligente (*Smart Merge*):** Actualización de constelaciones de personajes existentes e inserción de nuevas unidades sin suprimir personajes añadidos previamente a mano.
    - **Pie de página corporativo y reseteo:** Integración de `app-footer` con branding de Metips Solutions e hipervínculo para restablecer el almacenamiento local (`localStorage.clear()`), protegido con diálogo nativo de confirmación (`window.confirm`).
    - **Persistencia de resultados (Diferida al Sprint 9):** Se desacopla temporalmente la persistencia del Top 5 de equipos recomendados por el motor para integrarse en conjunto con la UI del Dashboard (Task 4.1.3 y 4.1.4).
- **Horas-Hombre Invertidas:**
  - Luis Antonio Cuevas Ortiz: **10 hrs** (QA / Pruebas de almacenamiento / Evaluación McCall).
  - Juan Pablo Chávez Ramírez: **5 hrs** (Scrum Master / Software Engineer / Aprobación de ADR).
  - Rodrigo Yahir Hernández Caro: **5 hrs** (Frontend Developer / Componentes y estilos Spotify).
  - *Total del Sprint:* **20 hrs**.
- **Decisión Arquitectónica Clave (ADR — Abandono de IndexedDB por LocalStorage):**
  - Se evaluó el requerimiento inicial de emplear `IndexedDB`. Tras el análisis técnico, se concluyó que la estructura del inventario de un jugador para el alcance del PoC ocupa menos de 5 KB (~3.2 KB para un catálogo de 52 personajes).
  - El uso de `IndexedDB` introducía sobrecarga innecesaria (APIs asíncronas basadas en eventos, migraciones de esquemas `onupgradeneeded` y latencia en el renderizado inicial).
  - Se acordó de forma unánime estandarizar el almacenamiento en `localStorage` mediante serialización JSON (`JSON.stringify` / `JSON.parse`), logrando acceso sincrónico inmediato (< 1 ms), cero dependencias externas y máxima facilidad de inspección en las DevTools del navegador.
- **Riesgos y Soluciones:**
  - *Borrado accidental de datos locales (RIE-35):* Se blindó la acción de reseteo del footer mediante un modal nativo de confirmación antes de vaciar el almacenamiento.
  - *Permisos del portapapeles en navegadores restrictivos (RIE-36):* Se implementó manejo de excepciones que instruye al usuario a pegar con `Ctrl+V` si el navegador bloquea la lectura automática.
```

---

## 3. Resumen de Factores de Calidad de McCall para el Libro Blanco

*Puntaje global obtenido para registrar en la sección de aseguramiento de calidad:*

* **Puntaje Total del Sprint:** **50 / 55 puntos** (Calidad: **90.9%**).
* **Puntos Fuertes Destacados:**
  - *Corrección (5/5) y Eficiencia (5/5):* Mapeo exacto de constelaciones sin desfasamiento y tiempos de lectura en disco casi instantáneos.
  - *Usabilidad (5/5) y Portabilidad (5/5):* Flujo de pegado en 1 clic que ahorra fricción al usuario y compatibilidad universal en navegadores modernos mediante estándares W3C.
  - *Mantenibilidad (5/5):* Componentes desacoplados en la carpeta modular `src/inventory/` con barrel exports limpios.
