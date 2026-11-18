# VGBuilder — Libro Blanco
## Informe sobre el seguimiento y evaluación del proyecto

---

### ÍNDICE GENERAL

1. [Introducción](#1-introducción)
   - 1.1. [Contexto y Antecedentes](#11-contexto-y-antecedentes)
   - 1.2. [Justificación del Proyecto](#12-justificación-del-proyecto)
   - 1.3. [Planteamiento del Problema](#13-planteamiento-del-problema)
   - 1.4. [Objetivos del Proyecto](#14-objetivos-del-proyecto)
2. [Características Técnicas del Proyecto](#2-características-técnicas-del-proyecto)
   - 2.1. [Arquitectura de Software y Stack Tecnológico](#21-arquitectura-de-software-y-stack-tecnológico)
   - 2.2. [Requerimientos de Software y Entorno de Ejecución](#22-requerimientos-de-software-y-entorno-de-ejecución)
   - 2.3. [Requerimientos de Hardware (Servidor y Cliente)](#23-requerimientos-de-hardware-servidor-y-cliente)
3. [Acciones Realizadas y Organización](#3-acciones-realizadas-y-organización)
   - 3.1. [Organización de Recursos y Personal](#31-organización-de-recursos-y-personal)
   - 3.2. [Metodología de Trabajo (Scrum de 10 Sprints)](#32-metodología-de-trabajo-scrum-de-10-sprints)
   - 3.3. [Estrategia de Ramas en Control de Versiones](#33-estrategia-de-ramas-en-control-de-versiones)
   - 3.4. [Canales de Comunicación y Herramientas](#34-canales-de-comunicación-y-herramientas)
4. [Seguimiento y Control del Proyecto](#4-seguimiento-y-control-del-proyecto)
   - 4.1. [Cronograma General de Sprints](#41-cronograma-general-de-sprints)
   - 4.2. [Detalle Secuencial por Sprints (1 al 10)](#42-detalle-secuencial-por-sprints)
     - 4.2.1. [Sprint 1: Esquema de Base de Datos, Taxonomía de Tags y Contrato API](#421-sprint-1-semana-1--epic-1)
     - 4.2.2. [Sprint 2: Población de la Base de Datos y Descripciones Estáticas](#422-sprint-2-semana-2--epic-1)
     - 4.2.3. [Sprint 3: Endpoints de Catálogo de Solo Lectura y Swagger UI](#423-sprint-3-semana-3--epic-1)
     - 4.2.4. [Sprint 4: Ingesta de Inventario (Enka.Network) y Fallback Manual UX](#424-sprint-4-semana-4--epic-2)
     - 4.2.5. [Sprint 5: Rediseño Responsive Modal de Equipos y Preparación del Motor](#425-sprint-5-semana-5--epic-3)
     - 4.2.6. [Sprint 6: Presets KQM, Scoring de Sinergia y Poda de Incompatibilidades](#426-sprint-6-semana-6--epic-3)
     - 4.2.7. [Sprint 7: Motor Completo, Bind de Artefactos y Expansión a 52 Personajes](#427-sprint-7-semana-7--epic-3--sprint-actual)
     - 4.2.8. [Sprint 8: Input UID y Persistencia Local de Sesión](#428-sprint-8-semana-8--epic-4--planificado)
     - 4.2.9. [Sprint 9: Dashboard e Integración Front-Motor End-to-End](#429-sprint-9-semana-9--epic-4--planificado)
     - 4.2.10. [Sprint 10: Pruebas de Integración, Documentación y Cierre](#4210-sprint-10-semana-10--planificado)
   - 4.3. [Gestión de Riesgos y Control de Desviaciones](#43-gestión-de-riesgos-y-control-de-desviaciones)
5. [Resultados y Beneficios Obtenidos](#5-resultados-y-beneficios-obtenidos)
   - 5.1. [Evaluación de Resultados al Sprint Actual](#51-evaluación-de-resultados-al-sprint-actual)
   - 5.2. [Beneficios Aportados por la Solución](#52-beneficios-aportados-por-la-solución)
   - 5.3. [Evaluación del Seguimiento y Control](#53-evaluación-del-seguimiento-y-control)
   - 5.4. [Recomendaciones para Versiones Futuras](#54-recomendaciones-para-versiones-futuras)
6. [Resumen Ejecutivo del Informe Final](#6-resumen-ejecutivo-del-informe-final)
7. [Anexos](#7-anexos)
8. [Glosario de Términos](#8-glosario-de-términos)

---

## 1. Introducción

### 1.1. Contexto y Antecedentes
En videojuegos de rol y acción con sistemas de combate dinámicos basados en reacciones elementales y rotaciones temporizadas, la construcción y optimización de equipos (*team building*) constituye la mayor barrera de entrada para la base de jugadores. Títulos como *Genshin Impact* poseen catálogos superiores a los 120 personajes, de los cuales cerca de 50 asumen el rol de atacantes principales en campo (*Main DPS / On-field Carry*). 

La teoría de optimización analítica (conocida en la comunidad como *Theorycrafting*, abanderada mundialmente por la organización *KeqingMains* o *KQM*) ha formulado arquetipos, requerimientos de recarga de energía y combinaciones matemáticamente ideales. Sin embargo, esta información se encuentra dispersa en hojas de cálculo especializadas, guías estáticas de cientos de páginas y simuladores de combate que asumen escenarios teóricos ideales: posesión de todos los personajes de 5 estrellas promocionales y constelaciones completas. Esto genera la denominada **parálisis por análisis** en el jugador promedio o de presupuesto moderado (*Free-to-Play* y *Low-Spender*).

### 1.2. Justificación del Proyecto
**VGBuilder** surge como una respuesta tecnológica para democratizar y automatizar el *theorycrafting*. A diferencia de las guías estáticas, VGBuilder calcula el mejor equipo posible **a partir del inventario real y constelaciones efectivas que el usuario posee**. 

Al modelar las interacciones de combate en una matriz formal de afinidades elementales, demandas funcionales (*needs*), aportes mecánicos (*offers*) y restricciones duras de incompatibilidad (*anti-tags*), el sistema elimina el sesgo subjetivo y las horas de investigación empírica. El usuario recibe recomendaciones fundamentadas matemáticamente, acompañadas de la asignación óptima de sets de artefactos de soporte, optimizando los recursos del jugador dentro del juego.

### 1.3. Planteamiento del Problema
El jugador común enfrenta tres fricciones críticas:
1. **La falacia del meta genérico:** Las recomendaciones populares asumen que el jugador cuenta con unidades soporte exclusivas de alta rareza (como Furina, Kazuha o Zhongli). Si el usuario carece de ellas, desconoce cómo reemplazarlas eficazmente sin descompensar la generación de energía o las reacciones elementales.
2. **Incompatibilidades mecánicas inadvertidas (*Anti-Tags*):** Existen habilidades que modifican las mecánicas del equipo con efectos perjudiciales si no se comprenden a fondo (por ejemplo, imbuir en Cryo o Pyro armas de personajes físicos como Razor o Eula, anulando sus bonificaciones de daño).
3. **Saturación y solapamiento de soporte:** Acumular múltiples personajes que otorgan el mismo bono (por ejemplo, ataque porcentual) sufre de **rendimientos decrecientes** (*diminishing returns*), mientras que equipar dos sets idénticos de 4 piezas de *Nobleza Obligada* o *Tenacidad de la Geoarmada* no acumula sus efectos, desperdiciando el potencial del equipo.

### 1.4. Objetivos del Proyecto

#### 1.4.1. Objetivo General
Diseñar, implementar y evaluar un sistema integral (VGBuilder) compuesto por una interfaz web responsiva y un motor algorítmico de matching y scoring, capaz de evaluar el inventario de personajes de un usuario, modelar sinergias y penalizaciones tácticas según estándares KQM y generar las 5 mejores recomendaciones de equipos balanceados con sus respectivos sets de soporte.

#### 1.4.2. Objetivos Específicos
- **Modelado Taxonómico:** Construir un esquema relacional y una taxonomía estricta de tags que clasifique el catálogo de personajes en roles, perfiles de daño, aportes al equipo (*offers*), demandas funcionales (*needs*) y exclusiones mecánicas (*anti-tags*).
- **Ingesta de Inventario Dual:** Desarrollar un mecanismo de ingesta automatizado mediante consulta a la API pública de Enka.Network, respaldado por un catálogo interactivo de respaldo (*fallback manual*) con selección visual de personajes y constelaciones ($C_0$ a $C_6$).
- **Motor de Scoring Heurístico:** Formular una función matemática ponderada que premie la satisfacción de demandas primarias, reacciones elementales y mitigación de daño, aplicando curvas de rendimientos decrecientes y podas duras ($-\infty$) ante anti-tags.
- **Asignador de Artefactos de Soporte:** Implementar un subsistema que asigne dinámicamente hasta 11 conjuntos de artefactos clave a los soportes del equipo recomendado, garantizando unicidad y complementariedad.

---

## 2. Características Técnicas del Proyecto

### 2.1. Arquitectura de Software y Stack Tecnológico
VGBuilder adopta una arquitectura modular orientada por dominio (*Domain-Driven Modularity*), estructurada con tecnologías modernas de alto rendimiento:

```
[Cliente Web: React 18 + Vite] <---> [Backend API: Bun + ElysiaJS]
                                                |
                                      [ORM: Drizzle ORM]
                                                |
                                      [DB: PostgreSQL]
                                                |
                                  [Motor de Afinidad (Core TS)]
```

- **Runtime de Alto Rendimiento:** **Bun**, utilizado como entorno de ejecución nativo para el backend y ejecutor de pruebas ultrarrápido (`bun test`).
- **Framework de Backend:** **ElysiaJS**, framework optimizado para Bun con tipado seguro end-to-end, alto throughput de peticiones concurrentes y generación nativa de documentación OpenAPI/Swagger en `/docs`.
- **Capa de Persistencia y ORM:** **Drizzle ORM**, aprovechando consultas fuertemente tipadas en TypeScript con cero sobrecarga en tiempo de ejecución, mapeando esquemas relacionales sin consultas $N+1$.
- **Motor de Base de Datos:** **PostgreSQL**, garantizando integridad relacional, soporte para esquemas estructurados y persistencia escalable de catálogos y afinidades.
- **Frontend / Capa de Presentación:** **React 18** empaquetado con **Vite**, componentes interactivos modulares, estilizado CSS responsivo con soporte temático nativo (Dark Mode) y almacenamiento local vía `localStorage`.
- **Contenerización y Paridad:** `docker-compose.yml` orquestando los contenedores de base de datos PostgreSQL y servicios de aplicación para garantizar idéntico comportamiento entre desarrollo y despliegue.

### 2.2. Requerimientos de Software y Entorno de Ejecución
- **Entorno de Ejecución Backend:** Bun v1.0.0 o superior (compatible con Node.js 18+).
- **Gestores de Paquetes:** `bun` (recomendado) o `npm`/`pnpm`.
- **Base de Datos:** PostgreSQL 15+.
- **Herramientas de Compilación Frontend:** Vite 5+.
- **Navegadores Soportados:** Google Chrome 90+, Mozilla Firefox 88+, Safari 14+, Microsoft Edge 90+.
- **Control de Versiones:** Git 2.30+.

### 2.3. Requerimientos de Hardware (Servidor y Cliente)
- **Servidor / Host de Despliegue:**
  - Procesador: Arquitectura x86_64 o ARM64, mínimo 2 núcleos a 2.0 GHz.
  - Memoria RAM: Mínimo 2 GB (Recomendado 4 GB para pruebas de matching combinatorio intensivo).
  - Almacenamiento: 1 GB de espacio en disco disponible para dependencias y assets de personajes.
- **Cliente (Dispositivo de Usuario):**
  - Procesador: Mínimo Dual-Core 1.5 GHz.
  - Memoria RAM: Mínimo 2 GB.
  - Resolución de Pantalla: Responsive (adaptable desde 360px en móviles hasta 1920x1080 en escritorio).

---

## 3. Acciones Realizadas y Organización

### 3.1. Organización de Recursos y Personal
El equipo está conformado por tres integrantes, distribuidos bajo roles especializados con registro formal de horas-hombre por sprint:
1. **Juan Pablo Chávez Ramírez:** *Scrum Master / Product Owner / Investigador de Theorycrafting / Software Engineer*. Responsable de la facilitación ágil, seguimiento del cronograma de 10 Sprints, investigación KQM, calibración del motor de scoring y consolidación del Libro Blanco.
2. **Luis Antonio Cuevas Ortiz:** *Desarrollador Frontend & Diseñador UX / Investigador*. Encargado del diseño del catálogo visual, maquetación responsiva, selector de constelaciones, gestión del tema y desarrollo del flujo de fallback manual.
3. **Rodrigo Yahir Hernández Caro:** *Arquitecto de Base de Datos y API / Software Engineer*. Encargado del modelado relacional con Drizzle ORM, arquitectura de endpoints en Elysia/Bun, integración con Enka.Network y optimización de consultas.

### 3.2. Metodología de Trabajo (Scrum de 10 Sprints)
Se implementó el marco de trabajo ágil Scrum organizado en un ciclo secuencial de **10 Sprints de una semana de duración cada uno**, divididos en 4 Epics de desarrollo:
- **Epic 1 (Sprints 1–3):** Base de Datos con Drizzle ORM, Taxonomía KQM y Endpoints del Catálogo en ElysiaJS.
- **Epic 2 (Sprint 4):** Ingesta de Inventario (Enka.Network + Fallback Manual UX en React).
- **Epic 3 (Sprints 5–7):** Motor de Afinidad, Algoritmo de Scoring y Binds de Artefactos.
- **Epic 4 (Sprints 8–9):** Persistencia de Sesión, Dashboard e Integración Front-Motor End-to-End.
- **Cierre (Sprint 10):** Pruebas de integración, estabilización y entrega final.

### 3.3. Estrategia de Ramas en Control de Versiones
Para garantizar la independencia técnica y prevenir conflictos de integración entre el frontend visual y el motor matemático, se implementó una estrategia de ramas en Git:
- `main`: Rama de producción e integración continua donde convergen únicamente versiones estables validadas por Pull Request (`api-contract`, `endpoints-catalogo`, `enka-db-mapping`).
- `ModuloInventariosUX`: Rama dedicada exclusivamente al cliente React + Vite, componentes de inventario, assets gráficos (splash arts y namecards) y responsividad del catálogo manual.
- `pruebas-y-correcciones-de-motor-VGBuilder`: Rama técnica de experimentación algorítmica donde se desarrolló la lógica de scoring, calibración de presets KQM, simulación de combinaciones y resolución de bugs en el motor de afinidad.

### 3.4. Canales de Comunicación y Herramientas
- **Comunicación en Vivo:** Servidor de Discord y reuniones semanales para *Daily Standups* y *Sprint Reviews*.
- **Control de Código y Tareas:** Repositorio en GitHub con tablero Kanban priorizado por Epics (`[S]`, `[M]`, `[L]`) y revisión obligatoria de código antes de mergear a `main`.

---

## 4. Seguimiento y Control del Proyecto

### 4.1. Cronograma General de Sprints

| Sprint | Código | Fase | Fechas (Inicio - Cierre) | Epic | Tasks Principales | Objetivo del Sprint | Estado |
| :---: | :---: | :---: | :---: | :---: | :--- | :--- | :---: |
| **1** | I1 | Inicio | 25-Sep-2026 — 25-Sep-2026 | Epic 1 | 1.1.1 Esquema BD [M], 1.1.2 Taxonomía de tags [M] | Modelo de datos y taxonomía definidos y validados | Concluido |
| **2** | I2 | Inicio | 25-Sep-2026 — 02-Oct-2026 | Epic 1 | 1.1.3 Poblar roster + sets [M], 1.1.5 Descripciones por template [S] | Catálogo inicial cargado en base de datos | Concluido |
| **3** | I3 | Inicio | 02-Oct-2026 — 09-Oct-2026 | Epic 1 | 1.1.4 Endpoints de solo lectura [L] | API de catálogo funcional, probada y documentada (Swagger) | Concluido |
| **4** | I4 | Inicio | 09-Oct-2026 — 16-Oct-2026 | Epic 2 | 2.1.1 Integración Enka [M], 2.1.2 UI carga manual [M] | Ingesta de inventario completa (Enka + Fallback UX) | Concluido |
| **5** | I5 | Inicio | 16-Oct-2026 — 23-Oct-2026 | Epic 3 | 3.1.1 Tabla de afinidad [M], 3.1.2 Algoritmo de sinergia [M] | Motor de afinidad base y rediseño responsive de UI | Concluido (Reprogramado) |
| **6** | I5 | Inicio | 24-Oct-2026 — 30-Oct-2026 | Epic 3 | 3.2.1 Curar presets [S], 3.2.2 Match % [M] | Comparación contra equipos meta y calibración KQM | Concluido |
| **7** | I6 | Elaboración | 31-Oct-2026 — 07-Nov-2026 | Epic 3 | 3.3.1 Mapeo sets-arquetipo [S], 3.3.2 Sugerencia de sets [M] | Motor completo: binds de artefactos y roster expandido | **En curso** |
| **8** | I7 | Elaboración | 08-Nov-2026 — 14-Nov-2026 | Epic 4 | 4.1.1 Input UID + estado cliente [M], 4.1.2 Persistencia local [S] | Captura y persistencia de sesión funcionando | Planificado |
| **9** | I8 | Construcción | 15-Nov-2026 — 21-Nov-2026 | Epic 4 | 4.1.3 Dashboard [M], 4.1.4 Integración front-motor | Producto integrado end-to-end, demo funcional | Planificado |
| **10** | I9 | Transición | 22-Nov-2026 — 28-Nov-2026 | — | Pruebas de integración, corrección de bugs, documentación y ensayo | Entrega final y defensa del proyecto | Planificado |

---

### 4.2. Detalle Secuencial por Sprints

#### 4.2.1. Sprint 1 (Semana 1 — Epic 1)
- **Código de Iteración:** I1 | **Fechas:** 25-Sep-2026 a 25-Sep-2026 | **Fase:** Inicio.
- **Objetivo:** Modelo de datos y taxonomía definidos y validados.
- **Hitos completados:**
  - 1.1 Definición de la taxonomía de tags (`Task 1.1.2 - Definicion Taxonomia de Tags.pdf`) aplicada a los 21 personajes iniciales (Evaluación: 100%).
  - 1.2 Definición del esquema de la base de datos con Drizzle ORM y PostgreSQL (Evaluación: 100%).
  - 1.3 Creación del contrato de API en formato OpenAPI (`vgbuilder-api-contract.yaml`) (Evaluación: 80%).
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (14 hrs), Luis Antonio Cuevas (10 hrs), Rodrigo Yahir Hernández (10 hrs).
- **Riesgos y Soluciones:** 
  - *Calidad y consistencia de tags:* Se elaboró un diccionario formal de términos para evitar ambigüedades en futuras cargas.
  - *Redundancia en afinidades:* Se identificó la sensibilidad de la tabla `tag_affinities` ante duplicidad simétrica (ej. Vaporizado: Pyro+Hydro e Hydro+Pyro); se determinó sanitizar y normalizar desde el script de seed.
  - *Integración con Enka.Network:* Se anticipó la complejidad de traducir identificadores de Enka, asignando un sprint exclusivo a esta tarea.

#### 4.2.2. Sprint 2 (Semana 2 — Epic 1)
- **Código de Iteración:** I2 | **Fechas:** 25-Sep-2026 a 02-Oct-2026 | **Fase:** Inicio.
- **Objetivo:** Catálogo inicial cargado en base de datos.
- **Hitos completados:**
  - 1.4 Población de la base de datos con script `seed.ts` para el roster inicial de 21 personajes, sets de artefactos y armas (Evaluación: 100%).
  - 1.5 Generación de breves descripciones estáticas de habilidades y personajes (Evaluación: 100%).
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (8 hrs), Luis Antonio Cuevas (10 hrs), Rodrigo Yahir Hernández (10 hrs).
- **Riesgos y Soluciones:** 
  - *Gestión de variables de entorno:* Se resolvieron problemas de ejecución local por falta de archivos `.env`, compartiendo plantillas seguras sin comprometer credenciales en Git.
  - *Descripciones de personajes:* Se decidió utilizar descripciones estáticas curadas en lugar de generación dinámica para garantizar consistencia terminológica.

#### 4.2.3. Sprint 3 (Semana 3 — Epic 1)
- **Código de Iteración:** I3 | **Fechas:** 02-Oct-2026 a 09-Oct-2026 | **Fase:** Inicio.
- **Objetivo:** API de catálogo funcional, probada y sin problemas de desempeño.
- **Hitos completados:**
  - 1.6 Desarrollo de endpoints de solo lectura para el catálogo (`/catalog/characters`, `/catalog/sets`, `/catalog/tags`) utilizando ElysiaJS y Bun (Evaluación: 100%).
  - Integración de Swagger UI en la ruta `/docs` para verificación inmediata.
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (8 hrs), Luis Antonio Cuevas (8 hrs), Rodrigo Yahir Hernández (9 hrs).
- **Riesgos y Soluciones:** 
  - *Consultas N+1:* Se optimizó el repositorio de datos para consultar relaciones mediante joins eficientes en una sola transacción Drizzle.
  - *Manejo de Git:* Se presentaron roces por commits incompletos (*RIE-07* y *RIE-05*); se capacitó al equipo en flujos de revisión previa y pruebas locales antes de subir cambios.

#### 4.2.4. Sprint 4 (Semana 4 — Epic 2)
- **Código de Iteración:** I4 | **Fechas:** 09-Oct-2026 a 16-Oct-2026 | **Fase:** Inicio.
- **Objetivo:** Ingesta de inventario completa con soporte Enka y fallback manual responsivo.
- **Rama principal asociada:** `ModuloInventariosUX`.
- **Hitos completados:**
  - 1.7 Mapeo de avatares de Enka a IDs de la base de datos local (`enka-db-mapping`) (Evaluación: 100%).
  - 1.8 Desarrollo de UI de carga manual como fallback en React 18 + Vite (Evaluación: 90%).
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (5 hrs), Luis Antonio Cuevas (10 hrs), Rodrigo Yahir Hernández (12 hrs).
- **Riesgos y Soluciones:** 
  - *Limitaciones de Enka (RIE-19):* Al exponer Enka únicamente la vitrina del jugador (8-12 personajes), el **Fallback Manual** se consolidó como funcionalidad crítica para permitir al usuario seleccionar libremente el resto de su catálogo y constelaciones ($C_0-C_6$).
  - *Políticas CORS (RIE-21):* Se estructuró el llamado a Enka mediante el servicio backend como proxy inverso para sortear bloqueos de navegador.

#### 4.2.5. Sprint 5 (Semana 5 — Epic 3)
- **Código de Iteración:** I5 | **Fechas:** 16-Oct-2026 a 23-Oct-2026 | **Fase:** Inicio.
- **Objetivo:** Motor de afinidad calculando compatibilidad básica y rediseño de interfaz.
- **Hitos completados:**
  - 1.7 Reestructuración completa del modelo de cajas (*box model*) y diseño responsivo del modal "Gestión de Equipos" bajo pantallas móviles (`max-width: 820px`), resolviendo colapsos visuales y desbordamientos (Evaluación: 100%).
  - Actividades de motor (1.8 tabla ponderada y 1.9 algoritmo de scoring) quedaron en fase de investigación preliminar (Evaluación: 0%), reprogramándose su culminación para el siguiente sprint.
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (2 hrs), Luis Antonio Cuevas (10 hrs), Rodrigo Yahir Hernández (1 hr).
- **Riesgos y Soluciones:** Se reconoció la complejidad matemática del motor; el equipo acordó concentrar esfuerzos en la siguiente iteración para diseñar formalmente las curvas de rendimientos decrecientes y no utilizar implementaciones provisionales apresuradas (*RIE-28*).

#### 4.2.6. Sprint 6 (Semana 6 — Epic 3)
- **Código de Iteración:** I5 | **Fechas:** 24-Oct-2026 a 30-Oct-2026 | **Fase:** Inicio.
- **Objetivo:** Comparación contra equipos meta KQM funcionando y cálculo de Match %.
- **Hitos completados:**
  - 1.8 Diseño de la tabla de afinidad ponderada entre tags (Evaluación: 80% — pendiente refinamiento de falsos positivos).
  - 1.9 Implementación del algoritmo de scoring de sinergia de equipo con rendimientos decrecientes (Evaluación: 100%).
  - 1.10 Curación y carga de presets de equipos meta populares KQM (Evaluación: 100%).
- **Horas-Hombre Invertidas:** Juan Pablo Chávez (30 hrs), Luis Antonio Cuevas (6 hrs), Rodrigo Yahir Hernández (6 hrs).
- **Riesgos y Soluciones:** 
  - *Roster acotado (RIE-30):* Se estableció el procedimiento para expandir el roster más allá de 21 unidades mediante cargas por rondas de popularidad.
  - *Detección de causas raíz en tests:* Se resolvieron fallos teóricos críticos: Beidou otorgaba escudo a $C_0$ cuando correspondía a $C_1$, y Sacarosa/Venti inyectaban erróneamente `buff_attack` mediante mecánicas Hexerei. Las correcciones devolvieron consistencia a los resultados.

#### 4.2.7. Sprint 7 (Semana 7 — Epic 3) — *Sprint Actual*
- **Código de Iteración:** I6 | **Fechas:** 31-Oct-2026 a 07-Nov-2026 | **Fase:** Elaboración.
- **Objetivo:** Motor de afinidad completo: mapeo y sugerencia de sets de artefactos, poda estricta por anti-tags y expansión del roster a 52 personajes.
- **Rama principal asociada:** `pruebas-y-correcciones-de-motor-VGBuilder`.
- **Hitos alcanzados:**
  - Creación del subsistema `artifact-binder.ts` con 11 sets de soporte (Sombra Verde, Nobleza, Tenacidad, Geoarmada, Instructor, etc.), evitando solapamientos redundantes en el mismo equipo.
  - Expansión del roster a **52 personajes** completamente catalogados y calibrados con sus roles primarios y secundarios.
  - Implementación de **poda dura en fase combinatoria**: descarte inmediato con puntuación $-\infty$ para combinaciones con anti-tags (ej. infusión Cryo de Chongyun sobre atacantes físicos como Razor o Eula).
- **Actividades en proceso:** Calibración final de pesos y preparación del Pull Request para la fusión hacia `main`.

#### 4.2.8. Sprint 8 (Semana 8 — Epic 4) — *Planificado*
- **Código de Iteración:** I7 | **Fechas:** 08-Nov-2026 a 14-Nov-2026 | **Fase:** Elaboración.
- **Objetivo:** Captura y persistencia de sesión del usuario.
- **Tareas:** 4.1.1 Input UID + estado cliente [M], 4.1.2 Persistencia local [S].
- **Alcance:** Validación de UID, manejo de estados asíncronos y almacenamiento de sesión en el cliente.

#### 4.2.9. Sprint 9 (Semana 9 — Epic 4) — *Planificado*
- **Código de Iteración:** I8 | **Fechas:** 15-Nov-2026 a 21-Nov-2026 | **Fase:** Construcción.
- **Objetivo:** Integración del Frontend con el Motor de Afinidad y visualización del Dashboard.
- **Tareas:** 4.1.3 Dashboard [M], 4.1.4 Integración front-motor.
- **Alcance:** Conectar la interfaz desarrollada en `ModuloInventariosUX` con el motor algorítmico, renderizando las tarjetas del Top 5 de equipos recomendados.

#### 4.2.10. Sprint 10 (Semana 10) — *Planificado*
- **Código de Iteración:** I9 | **Fechas:** 22-Nov-2026 a 28-Nov-2026 | **Fase:** Transición.
- **Objetivo:** Estabilización, pruebas finales y cierre del proyecto.
- **Tareas:** Pruebas de estrés combinatorio en cliente web, congelación de código, elaboración de documentación final y presentación académica.

---

### 4.3. Gestión de Riesgos y Control de Desviaciones
A lo largo de los sprints ejecutados se gestionó una matriz de riesgos categorizada:
- **Técnicos de Ingesta (RIE-17 a RIE-21):** Solventados mediante la estrategia dual (Enka + Fallback Manual en React).
- **Algorítmicos y Matemáticos (RIE-26 a RIE-29):** Mitigados mediante curvas de rendimientos decrecientes y calibración con presets KQM en lugar de pesos empíricos subjetivos.
- **De Catálogo y Cobertura (RIE-30 a RIE-33):** Atendidos expandiendo el roster de 21 a 52 personajes y estructurando el bind de artefactos por arquetipo funcional.

---

## 5. Resultados y Beneficios Obtenidos

### 5.1. Evaluación de Resultados al Sprint Actual
Al corte del Sprint 7, el motor de afinidad de VGBuilder es capaz de procesar un roster completo de 52 personajes en menos de 100 ms, identificando con precisión matemática los equipos óptimos coincidentes con las guías de KeqingMains para arquetipos Vaporize, Melt, Freeze, Aggravate, Hyperbloom y Physical Superconduct.

### 5.2. Beneficios Aportados por la Solución
- **Personalización Real:** No recomienda un "equipo ideal inalcanzable", sino la mejor formación viable con lo que el jugador realmente tiene.
- **Optimización de Artefactos:** Los jugadores ya no gastan recursos mejorando sets de soporte duplicados dentro del mismo equipo.
- **Educación Táctica:** El desglose de puntuación muestra al usuario *por qué* ese equipo funciona (reducción de resistencias, aplomo, recarga de energía).

### 5.3. Evaluación del Seguimiento y Control
El esquema de 10 Sprints permitió detectar a tiempo discrepancias teóricas complejas (como la auditoría de constelaciones de Beidou y Sacarosa en el Sprint 6), evitando arrastrar fallos de cálculo hacia la fase de integración visual.

### 5.4. Recomendaciones para Versiones Futuras
- Módulo de optimización de substats específicos (probabilidad crítica, daño crítico y recarga de energía).
- Simulador de rotaciones temporales con DPS estimado por segundo.
- Soporte para cuentas múltiples y comparación de progreso de inventarios.

---

## 6. Resumen Ejecutivo del Informe Final
*(Reservado para redacción final del Scrum Master tras culminar el Sprint 10)*

El presente informe expone el desarrollo de **VGBuilder**, una plataforma de ingeniería de software diseñada para resolver la complejidad del armado de equipos en videojuegos de rol de acción. A lo largo de un ciclo ágil de 10 Sprints distribuidos en tres líneas de desarrollo concurrentes (`main`, `ModuloInventariosUX` y `pruebas-y-correcciones-de-motor-VGBuilder`), el equipo logró modelar matemáticamente las interacciones de combate, diseñar una experiencia de usuario intuitiva con fallback manual y formular un algoritmo de scoring heurístico calibrado contra estándares internacionales de *theorycrafting*. VGBuilder demuestra cómo el modelado formal de reglas de juego transforma horas de investigación empírica en recomendaciones inmediatas y accionables.

---

## 7. Anexos
- **Anexo A:** Diagramas de Arquitectura, Flujo de Datos y Esquema de Base de Datos.
- **Anexo B:** Matriz y Diseño de Tablas de Afinidad (`docs/ANEXO_B_DISENO_TABLA_AFINIDAD.md`).
- **Anexo C:** Especificación Algorítmica del Motor de Matching y Poda Combinatoria (`docs/ANEXO_C_MOTOR_MATCHING.md`).

---

## 8. Glosario de Términos
- **Carry / Main DPS:** Personaje que permanece la mayor cantidad de tiempo en el campo de batalla ejecutando el daño principal.
- **Battery (Batería):** Unidad que genera abundantes partículas de energía elemental para recargar la habilidad definitiva de aliados costosos.
- **Enabler:** Personaje que aplica aura elemental constante fuera de campo para habilitar reacciones continuas al atacante activo.
- **Sustain:** Rol protector del equipo, integrado por curadores (*healers*) y escuderos (*shielders*).
- **Anti-Tags:** Atributos mecánicos que entran en conflicto directo con las demandas de otro personaje (ej. infusiones de armas no deseadas).
- **Diminishing Returns (Rendimientos Decrecientes):** Principio matemático por el cual sumar fuentes adicionales del mismo stat otorga incrementos de efectividad marginalmente menores.
- **KQM (KeqingMains):** Organización de referencia global en *theorycrafting*, modelado matemático y pruebas de mecánicas en Genshin Impact.
- **ICD (Internal Cooldown):** Temporizador y contador de golpes que restringe la frecuencia con la que un ataque puede aplicar un elemento.
- **ElysiaJS:** Framework web de alto rendimiento diseñado específicamente para el entorno Bun.
- **Drizzle ORM:** ORM TypeScript de tipado estricto y cero sobrecarga de abstracción.
