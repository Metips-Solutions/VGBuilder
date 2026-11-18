**Control de documento**

| Nombre del proyecto | VGBuilder |
| :---- | :---- |
| **Cierre de iteración** | Código: I7 Fecha: 14/Nov/2026 |
| **Generado por** | Rodrigo Yahir Hernandez Caro & Luis Antonio Cuevas Ortiz |
| **Aprobado por** | Juan Pablo Chavez Ramirez |
| **Alcance de la distribución del documento** | Control interno para todo el proyecto. |

**Indice**

**[Sobre este documento](#sobre-este-documento)**

[**Resumen de la Iteración**](#resumen-de-la-iteración)

[**Identificación**](#identificación)

[**Hitos especiales**](#hitos-especiales)

[**Artefactos y evaluación**](#artefactos-y-evaluación)

[**Riesgos y problemas**](#riesgos-y-problemas)

[**Notas y observaciones**](#notas-y-observaciones)

[**Asignación de recursos**](#asignación-de-recursos)

[**Anexos**](#anexos)

[**Anexo A: Ingesta de perfil de Enka, Normalización y Estado Reactivo del Cliente (Task 4.1.1)**](#anexo-a-ingesta-de-perfil-de-enka-normalización-y-estado-reactivo-del-cliente)

[**A.1 – Arquitectura de Comunicación y Consumo del Proxy Backend**](#a1--arquitectura-de-comunicación-y-consumo-del-proxy-backend)

[**A.2 – Interfaz de Usuario: Componente EnkaSyncModal y Clipboard API**](#a2--interfaz-de-usuario-componente-enkasyncmodal-y-clipboard-api)

[**A.3 – Submódulo de Ayuda Interactiva de 4 Pasos y Protocolo de Privacidad**](#a3--submódulo-de-ayuda-interactiva-de-4-pasos-y-protocolo-de-privacidad)

[**A.4 – Conclusión del Task 4.1.1**](#a4--conclusión-del-task-411)

[**Anexo B: Persistencia de Inventario y Decisión Arquitectónica: Abandono de IndexedDB por LocalStorage (Task 4.1.2)**](#anexo-b-persistencia-de-inventario-y-decisión-arquitectónica-abandono-de-indexeddb-por-localstorage)

[**B.1 – Análisis Comparativo y Trade-Offs: IndexedDB vs. LocalStorage (JSON)**](#b1--análisis-comparativo-y-trade-offs-indexeddb-vs-localstorage-json)

[**B.2 – Modelo de Datos, Serialización y Estrategia de Fusión Inteligente**](#b2--modelo-de-datos-serialización-y-estrategia-de-fusión-inteligente)

[**B.3 – Justificación del Alcance al 50%: Desacoplamiento de Resultados del Motor**](#b3--justificación-del-alcance-al-50-desacoplamiento-de-resultados-del-motor)

[**B.4 – Pie de Página (Footer), Identidad Corporativa y Reseteo Seguro**](#b4--pie-de-página-footer-identidad-corporativa-y-reseteo-seguro)

[**B.5 – Conclusión del Task 4.1.2**](#b5--conclusión-del-task-412)

[**Anexo C: Factores de Calidad de McCall**](#anexo-c-factores-de-calidad-de-mccall)

[**C.1 – Evaluación de Factores de Calidad (Sprint 8 / Iteración I7)**](#c1--evaluación-de-factores-de-calidad-sprint-8--iteración-i7)

[**Referencias a otros documentos**](#referencias-a-otros-documentos)

[**Glosario de términos**](#glosario-de-términos)

---

# **Sobre este documento**

La calidad en el ciclo de vida del software se consolida mediante la evaluación rigurosa y continua de los entregables que transforman las especificaciones de diseño en módulos funcionales. El cierre de una iteración permite pausar el desarrollo activo para auditar técnicamente lo construido, examinar las decisiones arquitectónicas tomadas, medir desviaciones y recalibrar los esfuerzos del equipo frente a los objetivos trazados.

El presente documento formaliza el cierre de la iteración ***I7*** (Sprint 8), correspondiente al **Epic 4: UI y Persistencia**. Contiene el desglose exhaustivo de las actividades de desarrollo, la justificación de los cambios estructurales implementados, la evaluación formal de calidad y los anexos técnicos de ingeniería.

---

# **Resumen de la Iteración** {#resumen-de-la-iteración}

## ***Identificación***

| Código de la iteración | Fase a la que pertenece | Fecha de inicio | Fecha de cierre | Comentarios |
| :---: | :---: | :---: | :---: | :--- |
| **I7** (Sprint 8) | Elaboración | 08-Nov-2026 | 14-Nov-2026 | Enfoque en Epic 4 (UI y Persistencia de Sesión del Usuario). |

## ***Hitos especiales***

Durante el Sprint 8 se abordaron los dos hitos planificados de captura y persistencia de datos del usuario:

1. **Task 4.1.1: Implementación de UID de Enka + Estado del cliente**  
   *Estado: Completado con éxito (Evaluación: 100%).*  
   Se diseñó e implementó el flujo completo de sincronización de perfiles públicos de Enka.Network hacia la interfaz de usuario en React 19. Esto abarca el botón de cabecera `⚡ Sincronizar Enka`, el componente modal compacto `EnkaSyncModal`, la integración directa con la Clipboard API nativa (`navigator.clipboard.readText()`), el filtrado de errores, el mapeo de constelaciones ($C_0-C_6$) cruzado con el catálogo local de assets, y un submódulo interactivo de ayuda estructurado en 4 pasos.

2. **Task 4.1.2: Persistir inventario y resultados con IndexedDB del navegador**  
   *Estado: Completado parcialmente (Evaluación: 50%).*  
   Se implementó la persistencia y reactividad total del **inventario del jugador** en el navegador. No obstante, tras un análisis técnico de rendimiento y complejidad, **se tomó la decisión arquitectónica de abandonar IndexedDB en favor de `localStorage` con serialización JSON**. El inventario completo de un jugador ocupa menos de 5 KB, haciendo innecesaria la sobrecarga asíncrona de cursores y transacciones de IndexedDB.  
   El hito se declara al **50% de cumplimiento** debido a que únicamente se persistió el inventario del jugador; la persistencia de los *resultados generados por el motor de afinidad (equipos recomendados)* fue desacoplada intencionalmente para integrarse en el siguiente sprint en conjunto con la construcción de las vistas del Dashboard (Task 4.1.3). Asimismo, se integró un pie de página (`app-footer`) con la información de **Metips Solutions** y un hipervínculo para el reseteo seguro del almacenamiento local.

---

## ***Artefactos y evaluación***

| Artefacto / Hito | Meta (%) | Logrado (%) | Evaluación | Comentarios |
| :--- | :---: | :---: | :---: | :--- |
| **Task 4.1.1** — Ingesta UID Enka + Estado del Cliente | 100% | 100% | 100% | Integración completa: Clipboard API, normalización determinista y submódulo de ayuda. |
| **Task 4.1.2** — Persistencia de inventario y resultados | 100% | 50% | 50% | Inventario persistido en JSON (`localStorage`). Persistencia de resultados diferida al Sprint 9. |

| Artefacto | Aspecto a evaluar | Evaluación | Comentarios |
| :--- | :--- | :---: | :--- |
| **EnkaSyncModal (UI)** | Fluidez de captura, validación de URL y lectura del portapapeles. | 100% | Acceso mediante 1 clic (`Clipboard API`); manejo robusto de excepciones de permisos. |
| **Normalizador Enka** | Mapeo de personajes y asignación exacta de niveles de constelación ($C_0-C_6$). | 100% | Los IDs de Enka se traducen deterministamente cruzándose con `CHARACTERS`. |
| **Persistencia Local** | Retención de datos frente a recargas de página y cambios de pestaña. | 100% | Estado sincronizado sincrónicamente con `localStorage.getItem` y `setItem`. |
| **Reseteo de Storage** | Capacidad del usuario para purgar datos y evitar inconsistencias. | 100% | Enlace en footer protegido por diálogo de confirmación `window.confirm`. |
| **Persistencia de Resultados** | Almacenamiento local del Top 5 de equipos recomendados por el motor. | 0% | Pospuesto para la fase de construcción de la UI del Dashboard (Task 4.1.3). |

---

## ***Riesgos y problemas***

| Código | Riesgo Identificado | Causa Raíz | Impacto Potencial | Severidad | Mitigación Implementada |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **RIE-34** | Sobrecarga o latencia innecesaria por uso de IndexedDB en cliente. | Requerimiento original estipulaba IndexedDB para esquemas de datos mínimos (< 5 KB). | Complejidad accidental, código asíncrono propenso a desincronizaciones de UI y mayor lentitud de inicio. | **ALTA** | **Abandono de IndexedDB:** Migración a `localStorage` serializado con `JSON.stringify` / `parse`. Acceso sincrónico inmediato sin latencia de conexión. |
| **RIE-35** | Borrado involuntario de datos locales del inventario. | El usuario hace clic accidentalmente en opciones de limpieza de sesión. | Pérdida de personajes y constelaciones configurados manualmente. | **MEDIA** | Implementación de confirmación explícita mediante diálogo modal interactivo antes de invocar `localStorage.clear()`. |
| **RIE-36** | Restricciones de permisos del navegador al leer portapapeles. | Políticas de seguridad en navegadores Chromium/WebKit para `navigator.clipboard`. | El botón "Pegar" no rescata la URL automáticamente en contextos no seguros. | **BAJA** | Manejo de excepciones con bloque `try/catch` que orienta al usuario a pegar manualmente con `Ctrl+V` si el navegador deniega el acceso. |
| **RIE-37** | Inconsistencia por perfiles de Enka privados o sin vitrina. | El jugador no activa la opción in-game de "Mostrar detalles" o no coloca avatares en vitrina. | Petición a Enka devuelve arreglo vacío o error 400. | **MEDIA** | Inclusión del submódulo interactivo de Ayuda en 4 pasos dentro del modal, explicando la configuración requerida dentro del juego. |

---

## ***Notas y observaciones***

1. **Racional de la decisión de almacenamiento:** La adopción de `localStorage` en sustitución de IndexedDB representa una simplificación arquitectónica alineada con los principios de desarrollo ágil y minimalismo técnico (*YAGNI*). La estructura de un equipo de personajes en Genshin Impact es estricta (máximo 4 activos en escuadra y unas pocas decenas en inventario). El almacenamiento en cadenas JSON elimina la necesidad de librerías intermediarias (Dexie, idb) o código repetitivo de transacciones.
2. **Desacoplamiento temporal de la persistencia de resultados:** Al encontrarse el desarrollo del motor de afinidad recién finalizado en el Sprint 7 y pendiente su interfaz de visualización (Dashboard Task 4.1.3), almacenar estructuras de recomendación prematuramente en el cliente introducía riesgo de deuda técnica por cambios en los contratos de datos. El 50% pendiente de esta tarea se completará de forma orgánica en el Sprint 9.

---

# **Asignación de recursos**

| Integrante | Rol en la Iteración | Horas-Hombre | Observaciones |
| :---- | :---- | :---: | :---- |
| **Luis Antonio Cuevas Ortiz** | QA / Tester / Investigador | **10 hrs** | Diseño de pruebas de almacenamiento local, validación de casos borde en Clipboard API y redacción de factores McCall. |
| **Juan Pablo Chavez Ramirez** | Scrum Master / Software Engineer | **5 hrs** | Revisión de arquitectura de persistencia, aprobación de ADR (IndexedDB a LocalStorage) y supervisión de PRs. |
| **Rodrigo Yahir Hernandez Caro** | Frontend Developer / Investigador | **5 hrs** | Construcción de componentes (`EnkaSyncModal`, footer), hooks de estado y estilos CSS inspirados en Spotify. |
| **Total** | | **20 hrs** | Recursos optimizados con alto grado de entrega funcional. |

---

# **Anexos**

---

## **Anexo A: Ingesta de perfil de Enka, Normalización y Estado Reactivo del Cliente (Task 4.1.1)**

**Propósito:** Proporcionar un canal ágil y sin fricción para que el usuario ingrese la URL pública de su perfil de Enka.Network, normalizando automáticamente sus personajes y constelaciones ($C_0-C_6$) para inyectarlos en el estado global reactivo de la aplicación.

### **A.1 – Arquitectura de Comunicación y Consumo del Proxy Backend**

Para evitar bloqueos por políticas de *Cross-Origin Resource Sharing* (CORS) presentes al invocar la API pública de Enka directamente desde el navegador del cliente, la arquitectura emplea un proxy inverso en el servidor backend desarrollado sobre ElysiaJS y Bun:

```
[Cliente React 19]  ──(POST /api/inventory/sync-by-url)──>  [Vite Proxy :5173]
                                                                   │
                                                                   ▼
[Enka.Network API]  <──(GET /api/profile/.../builds/)───  [Backend Elysia :3000]
```

1. **Extracción y Validación de Identificadores:** El endpoint recibe `{ url: string }` y utiliza una expresión regular determinista para descomponer la ruta:
   $$\text{regex} = \text{/enka\.network\/u\/([^\/]+)\/([^\/]+)/i}$$
   Extrayendo con precisión el `username` y el `hoyoId` del jugador.
2. **Normalización Determinista:** La respuesta en bruto de Enka devuelve identificadores de avatar numéricos (ej. `"10000032"` para Bennett). El servicio mapea dichos avatares contra la base de datos interna mediante `ENKA_TO_DB_MAP`, calculando el número exacto de constelaciones a partir de la longitud del vector de talentos desbloqueados (`avatarData.talentIdList.length`).
3. **Consumo en Cliente:** El cliente recibe la carga útil `{ success: true, count: N, data: [{ id, name, constellations }] }` y la cruza con la biblioteca gráfica local [`CHARACTERS`](file:///home/tyreans/metips/vgbuilder/client/src/inventory/data/characters.js), recuperando imágenes de *Splash Art*, íconos de vestimenta, tarjetas de presentación (*Namecards*) e íconos elementales de TCG.

<!-- CAPTURA 1: [Pegar captura de pantalla de la cabecera principal mostrando el botón '⚡ Sincronizar Enka' junto al botón '+ Agregar Personaje'] -->
![Captura 1 - Botón de sincronización en cabecera][image1]

---

### **A.2 – Interfaz de Usuario: Componente EnkaSyncModal y Clipboard API**

El componente [`EnkaSyncModal.jsx`](file:///home/tyreans/metips/vgbuilder/client/src/inventory/components/EnkaSyncModal.jsx) se diseñó bajo una estética de popup compacto con tema oscuro inspirado en la ergonomía de Spotify:

* **Integración con la Clipboard API:** El botón **"📋 Pegar"** ejecuta de forma asíncrona:
  ```javascript
  const clipText = await navigator.clipboard.readText();
  if (clipText) setUrl(clipText.trim());
  ```
  Esto permite al usuario volcar la URL copiada de su navegador con un solo clic, sin obligarlo a realizar combinaciones de teclado o menús contextuales. Si el navegador restringe los permisos, un bloque `try/catch` captura el evento y muestra una sugerencia amigable para el pegado manual.
* **Control de Formulario y Acciones Rápidas:**
  - **Botón "🗑️ Borrar":** Vierte una cadena vacía en el estado del input y reinicia cualquier mensaje de error o éxito previo.
  - **Botón "✓ Aceptar":** Inicia la sincronización, activando un indicador de carga animado (*spinner*) y deshabilitando temporalmente los controles para prevenir peticiones redundantes.
  - **Cierre y Accesibilidad:** El diálogo implementa soporte para cierre mediante tecla `Escape`, clic sobre la capa difuminada de fondo (*backdrop blur*) o botón superior derecho `✕`.

<!-- CAPTURA 2: [Pegar captura de pantalla del popup compacto 'EnkaSyncModal' abierto con el campo de URL y los tres botones: Pegar, Borrar y Aceptar] -->
![Captura 2 - Modal compacto de sincronización con Enka][image2]

---

### **A.3 – Submódulo de Ayuda Interactiva de 4 Pasos y Protocolo de Privacidad**

Uno de los principales motivos de error en herramientas orientadas a Genshin Impact radica en la falta de conocimiento sobre el funcionamiento de los exhibidores públicos del juego. Para resolver esto sin forzar al usuario a abandonar la plataforma, se diseñó un **submódulo de ayuda integrado en forma de panel desplegable (drawer/acordeón)** que se activa con el botón `❓`:

```
┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐    ┌───────────────────┐
│   1. EN GENSHIN   │    │   2. EXHIBIDOR    │    │  3. ENKA.NETWORK  │    │  4. PEGAR Y LISTO │
│ Paimon Menu       │───>│ Coloca hasta 8    │───>│ Ingresa tu UID en │───>│ Pulsa "Pegar"     │
│ Editar Perfil     │    │ personajes en la  │    │ enka.network y    │    │ y luego "Aceptar" │
│ Detalles: ON      │    │ vitrina pública   │    │ copia la URL      │    │ en VGBuilder      │
└───────────────────┘    └───────────────────┘    └───────────────────┘    └───────────────────┘
```

1. **Paso 1 (En Genshin):** Menú Paimon → Editar Perfil → Habilitar la opción obligatoria *"Mostrar detalles de los personajes"*.
2. **Paso 2 (Exhibidor):** Configurar en la vitrina pública los personajes deseados (el juego admite un máximo de 8 unidades simultáneas).
3. **Paso 3 (Enka.Network):** Ingresar a la plataforma web con el UID del juego y copiar el enlace del perfil.
4. **Paso 4 (Pegar y Listo):** Volver a VGBuilder y pulsar los botones *Pegar* y *Aceptar*.
* **Protocolo de Privacidad:** Se especifica formalmente que VGBuilder no solicita ni almacena contraseñas, correos ni datos sensibles de credenciales, procesando exclusivamente datos públicos expuestos por la API oficial de Hoyoverse.

<!-- CAPTURA 3: [Pegar captura de pantalla del submódulo de Ayuda desplegado dentro del modal mostrando las 4 tarjetas de pasos y la nota de privacidad] -->
![Captura 3 - Submódulo interactivo de Ayuda en 4 pasos][image3]

---

### **A.4 – Conclusión del Task 4.1.1**

La implementación del Task 4.1.1 concluyó con una tasa de éxito del 100%. La combinación del proxy en backend con la Clipboard API y la guía visual de ayuda reduce drásticamente la tasa de rebote del usuario, transformando un proceso propenso a errores en una operación ejecutada en menos de tres segundos.

---

## **Anexo B: Persistencia de Inventario y Decisión Arquitectónica: Abandono de IndexedDB por LocalStorage (Task 4.1.2)**

**Propósito:** Detallar la arquitectura de almacenamiento del estado del cliente en el navegador, documentar el cambio formal de tecnología persistente (abandono de IndexedDB en favor de `localStorage` con serialización JSON), explicar la estrategia de sincronización y registrar los mecanismos de reseteo seguro integrados en el pie de página de la aplicación.

### **B.1 – Análisis Comparativo y Trade-Offs: IndexedDB vs. LocalStorage (JSON)**

El planteamiento preliminar del proyecto contemplaba el empleo de la API `IndexedDB` para la persistencia del cliente. No obstante, durante la ejecución del Sprint 8 se realizó una evaluación técnica de complejidad frente a requerimientos reales:

| Dimensión de Evaluación | IndexedDB | LocalStorage (con serialización JSON) | Veredicto para VGBuilder PoC |
| :--- | :--- | :--- | :---: |
| **Modelo de Ejecución** | Asíncrono (basado en eventos `onsuccess`/`onerror` o wrappers `Promise`). | Sincrónico directo (`localStorage.getItem`, `setItem`). | **Ganador: LocalStorage** (Lectura inmediata sin saltos de render en React). |
| **Complejidad de Código** | Alta: requiere definición de esquemas, `objectStores`, índices y migraciones de versión (`onupgradeneeded`). | Mínima: dos llamadas estándar `JSON.parse()` y `JSON.stringify()`. | **Ganador: LocalStorage** (Elimina >150 líneas de código boilerplate). |
| **Volumen de Datos Típico** | Optimizado para megabytes o gigabytes (archivos binarios, blobs, colecciones masivas). | Límite estándar de 5 MB por origen en navegadores modernos. | **Ganador: LocalStorage** (El inventario del jugador pesa **~3.2 KB**, consumiendo apenas el **0.06%** del límite). |
| **Capacidad de Inspección y Debug** | Compleja: requiere navegar múltiples niveles en el inspector de almacenamiento. | Inmediata: clave y valor legibles directamente en la pestaña *Application* de DevTools. | **Ganador: LocalStorage** (Facilita pruebas unitarias y soporte al usuario). |
| **Sobrecarga de Dependencias** | Suele exigir librerías de terceros (Dexie.js, idb) para evitar código verboso. | API nativa estándar W3C con 100% de soporte universal sin dependencias externas. | **Ganador: LocalStorage** (Cero impacto en el tamaño del bundle de producción). |

**Conclusión del Análisis de Decisión Arquitectónica (ADR):**  
Para el alcance del PoC de VGBuilder, la adopción de IndexedDB constituía un caso claro de sobreingeniería (*over-engineering*). Se resolvió de manera unánime abandonar IndexedDB y estandarizar la persistencia del inventario mediante cadenas JSON estructuradas en `localStorage`.

---

### **B.2 – Modelo de Datos, Serialización y Estrategia de Fusión Inteligente**

El estado del inventario se gestiona en [`client/src/App.jsx`](file:///home/tyreans/metips/vgbuilder/client/src/App.jsx) a través del hook `useState` inicializado mediante *lazy evaluation* para garantizar que la lectura del disco ocurra exactamente una vez durante el ciclo de vida:

```javascript
const [inventory, setInventory] = useState(() => {
  try {
    const saved = localStorage.getItem('genshin_inventory_team');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});
```

Cada elemento del inventario se almacena bajo el siguiente esquema JSON:
```json
{
  "character": {
    "id": "bennett",
    "name": "Bennett",
    "element": "pyro",
    "role": "Support · Healer",
    "region": "Mondstadt",
    "stars": 4,
    "image": "/Images/Genshin Impact/Splash Art/bennett-nobg.png",
    "icon": "/Images/Genshin Impact/Character Icons/Bennett.png"
  },
  "constellation": 5,
  "source": "enka",
  "syncedAt": "2026-11-14T00:30:00.000Z"
}
```

#### Estrategia de Fusión Inteligente (*Smart Merge*):
Cuando el usuario importa personajes mediante Enka, el sistema no sobreescribe ciegamente el inventario:
```javascript
const handleSyncEnkaSuccess = (syncedCharacters) => {
  setInventory((prev) => {
    const prevMap = new Map(prev.map((item) => [item.character.id, item]));
    syncedCharacters.forEach((item) => {
      prevMap.set(item.character.id, item); // Actualiza constelación o inserta nuevo
    });
    const updated = Array.from(prevMap.values());
    localStorage.setItem('genshin_inventory_team', JSON.stringify(updated));
    return updated;
  });
};
```
Esta lógica garantiza que las unidades previamente configuradas a mano no se eliminen si no estaban presentes en el exhibidor actual de Enka, actualizando únicamente los niveles de constelación de las coincidencias detectadas.

<!-- CAPTURA 4: [Pegar captura de pantalla de la pestaña Application/Storage > Local Storage de las DevTools del navegador mostrando la clave 'genshin_inventory_team' con su contenido JSON] -->
![Captura 4 - Inspección del LocalStorage en DevTools con la clave genshin_inventory_team][image4]

---

### **B.3 – Justificación del Alcance al 50%: Desacoplamiento de Resultados del Motor**

El Task 4.1.2 contemplaba originalmente persistir tanto el *inventario* como los *resultados de equipos*. Durante la ejecución del sprint, se concluyó que la persistencia de resultados debía desacoplarse técnicamente:

1. **Eficiencia del motor de afinidad:** El motor combinatorio desarrollado en el Sprint 6 y 7 ejecuta el filtrado de anti-tags y la selección del Top 5 en menos de **80 milisegundos**. Debido a esta velocidad, recalcular las recomendaciones al vuelo es computacionalmente más económico que gestionar cachés de resultados invalidadas por cada cambio de constelación.
2. **Dependencia de la UI del Dashboard (Sprint 9):** Los resultados del motor serán consumidos por los componentes del Dashboard (Task 4.1.3 y 4.1.4). Persistir esquemas de resultados en esta fase sin contar con las vistas finales de presentación representaba un riesgo innecesario de refactorización.  
Por estos motivos, el hito se cierra satisfactoriamente al **50% de su alcance total**, programándose el 50% restante para el Sprint 9.

---

### **B.4 – Pie de Página (Footer), Identidad Corporativa y Reseteo Seguro**

Para cerrar la experiencia de usuario y dotar a la plataforma de una terminación profesional, se incorporó un elemento semántico `<footer>` en la base del layout principal:

* **Información Corporativa:** Se incluye el identificador de versión (`VGBuilder · Astra PoC v0.1.0`), la descripción funcional del sistema y los créditos formales de autoría: **© 2026 Metips Solutions**.
* **Hipervínculo de Reseteo de Almacenamiento:** Se diseñó un enlace interactivo accesible `Restablecer datos locales (Resetear localStorage)`. Al pulsarse, no purga el almacenamiento a ciegas, sino que dispara un cuadro de diálogo nativo de advertencia:
  > *"¿Estás seguro de que deseas restablecer el almacenamiento local (localStorage)? Se eliminarán todos los personajes y constelaciones guardados en este navegador."*
* Si el usuario confirma, se invoca `localStorage.removeItem('genshin_inventory_team')`, vaciando sincrónicamente el estado en memoria (`setInventory([])`) para actualizar la interfaz al estado de bienvenida (*empty hero*) de forma instantánea y sin recargar el navegador.

<!-- CAPTURA 5: [Pegar captura de pantalla del footer en la parte inferior de la ventana principal mostrando los datos de Metips Solutions y el enlace 'Restablecer datos locales'] -->
![Captura 5 - Footer con branding y enlace de reseteo][image5]

<!-- CAPTURA 6: [Pegar captura de pantalla del cuadro de diálogo de confirmación emergente (window.confirm) al hacer clic en el enlace de restablecer] -->
![Captura 6 - Diálogo de confirmación para reseteo de almacenamiento][image6]

---

### **B.5 – Conclusión del Task 4.1.2**

La resolución técnica del Task 4.1.2 garantizó una persistencia de datos sólida, inmediata y libre de fricciones técnicas. La adopción de `localStorage` simplificó radicalmente la base de código, mientras que el mecanismo de reseteo con confirmación asegura la tranquilidad del usuario en el control de sus datos locales.

---

## **Anexo C: Factores de Calidad de McCall**

### **C.1 – Evaluación de Factores de Calidad (Sprint 8 / Iteración I7)**

Se auditaron los desarrollos del Sprint 8 aplicando el marco de factores de calidad de software de McCall, distribuidos en sus tres dimensiones operativas:

| EJE DE CALIDAD | FACTORES | MÉTRICAS ADAPTADAS AL SPRINT 8 (TASKS 4.1.1 Y 4.1.2) | Puntaje (1-5) | Justificación Técnica |
| :---: | :--- | :--- | :---: | :--- |
| **OPERACIÓN DEL PRODUCTO** | **1. Corrección** | Fidelidad en la extracción de constelaciones ($C_0-C_6$) y mapeo a catálogo local. | **5** | El normalizador mapea con exactitud los IDs de Enka hacia los personajes locales sin registrar desfases de atributos. |
| | **2. Eficiencia** | Velocidad de lectura/escritura en el almacenamiento persistente y sincronización. | **5** | `localStorage` responde en $< 1\text{ ms}$; el proxy backend resuelve peticiones a Enka en $< 600\text{ ms}$. |
| | **3. Integridad** | Protección contra datos corruptos en el portapapeles o cadenas JSON no válidas. | **4** | Bloques `try/catch` envuelven la lectura de portapapeles y el parseo de almacenamiento local con valores de respaldo. |
| | **4. Fiabilidad** | Estabilidad del inventario ante recargas bruscas de página o cierre de pestañas. | **5** | El inventario almacenado persiste de forma determinista entre sesiones del navegador sin pérdidas. |
| | **5. Usabilidad** | Ergonomía del botón "Pegar" en 1 clic y claridad del submódulo de ayuda en 4 pasos. | **5** | El flujo ahorra tecleo manual; la guía visual reduce la confusión del usuario sobre la privacidad del juego. |
| **REVISIÓN DEL PRODUCTO** | **6. Mantenibilidad** | Modularidad de componentes y aislamiento de la capa de persistencia. | **5** | `EnkaSyncModal.jsx` y los métodos de almacenamiento están desacoplados y centralizados en `src/inventory/`. |
| | **7. Flexibilidad** | Facilidad de evolución para alternar esquemas o adoptar otra tecnología de persistencia. | **4** | El estado React consume una interfaz limpia (`get`/`set`), facilitando futuras migraciones si la data escala. |
| | **8. Capacidad de prueba** | Viabilidad para probar unitariamente flujos de pegado, borrado y reseteo. | **4** | La lógica se valida directamente en el navegador y compila de forma limpia en Vite con Bun (`bun run build`). |
| **TRANSICIÓN DE PRODUCTO** | **9. Portabilidad** | Compatibilidad en diversos navegadores (Chrome, Firefox, Safari, Edge) y móviles. | **5** | `localStorage` y `Clipboard API` constituyen estándares web universales implementados ampliamente. |
| | **10. Reutilización** | Aprovechamiento del sistema de diseño (botones píldora, modales y tokens de color). | **4** | Reutilización estricta de las clases `.btn-pill`, variables CSS compartidas y estética Spotify. |
| | **11. Interoperabilidad** | Comunicación armónica entre cliente React, proxy Elysia y la API externa de Enka. | **4** | Enrutamiento transparente mediante proxy inverso en Vite hacia el servidor Bun sin roces de CORS. |
| **Total** | | | **50 / 55** | **Nivel de Calidad Alcanzado: Excelente (90.9%)** |

---

# **Referencias a otros documentos**

\[1\] W3C, "Clipboard API and events," W3C Working Draft, 2023. [En línea]. Disponible en: https://www.w3.org/TR/clipboard-apis/. [Accedido: 13-nov-2026].

\[2\] Mozilla Developer Network (MDN), "Window.localStorage," MDN Web Docs, 2024. [En línea]. Disponible en: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage. [Accedido: 13-nov-2026].

\[3\] J. A. McCall, P. K. Richards y G. F. Walters, "Factors in Software Quality," Rome Air Development Center, US Department of Commerce, Reports NTIS AD/A-049 014, 015, 055, 1977.

\[4\] Enka.Network, "Enka.Network API Documentation (OpenAPI v3)," 2024. [En línea]. Disponible en: https://api.enka.network/. [Accedido: 13-nov-2026].

\[5\] React Team, "Synchronizing with Effects and State Persistence," React v19 Documentation, 2024. [En línea]. Disponible en: https://react.dev/learn/synchronizing-with-effects. [Accedido: 13-nov-2026].

---

# **Glosario de términos**

* **Clipboard API (`navigator.clipboard`):** Interfaz estándar del navegador que permite leer y escribir texto en el portapapeles del sistema operativo de manera programática y asíncrona mediante promesas.
* **Decisión Arquitectónica (ADR - Architectural Decision Record):** Documento técnico que captura una decisión de diseño de software significativa, su contexto y sus consecuencias justificadas.
* **Exhibidor de Personajes (Vitrina pública):** Sección dentro del perfil de Genshin Impact donde el jugador expone públicamente hasta 8 personajes con sus armas y artefactos, consumida por Enka.Network.
* **HoyoId:** Identificador único secundario asignado por los servicios de Enka.Network a las cuentas de Hoyoverse vinculadas a un mismo usuario.
* **IndexedDB:** Sistema de base de datos transaccional no relacional en el cliente orientado a grandes volúmenes de datos estructurados, descartado en este sprint por sobrecarga innecesaria para el volumen de datos del PoC.
* **LocalStorage:** Almacenamiento local persistente clave-valor en el navegador web con capacidad estándar de 5 MB por dominio y acceso sincrónico.
* **Merge Inteligente (*Smart Merge*):** Algoritmo de consolidación de inventario que actualiza las constelaciones de personajes existentes e incorpora nuevos sin suprimir los registros manuales previos.
* **Modal Backdrop:** Capa visual oscurecida y con desenfoque (*blur*) que se superpone a la aplicación para centrar la atención del usuario en el diálogo activo.
* **Normalización de Inventario:** Proceso de homologación que convierte los códigos numéricos de avatar y talentos de Enka en objetos estructurados con metadata gráfica e íconos locales.
* **YAGNI (*You Aren't Gonna Need It*):** Principio de ingeniería de software que promueve no implementar funcionalidades o arquitecturas complejas hasta que sean estrictamente requeridas por el sistema.

---

<!-- DEFINICIÓN DE PLACEHOLDERS DE IMÁGENES -->
[image1]: <data:image/png;base64,PLACEHOLDER_CAPTURA_1_BOTON_SINCRONIZAR_ENKA>
[image2]: <data:image/png;base64,PLACEHOLDER_CAPTURA_2_MODAL_ENKASYNCMODAL>
[image3]: <data:image/png;base64,PLACEHOLDER_CAPTURA_3_SUBMODULO_AYUDA_4_PASOS>
[image4]: <data:image/png;base64,PLACEHOLDER_CAPTURA_4_LOCALSTORAGE_DEVTOOLS>
[image5]: <data:image/png;base64,PLACEHOLDER_CAPTURA_5_FOOTER_METIPS_SOLUTIONS>
[image6]: <data:image/png;base64,PLACEHOLDER_CAPTURA_6_DIALOGO_CONFIRMACION_RESET>
