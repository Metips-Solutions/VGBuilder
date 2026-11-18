

**Control de documento**

| Nombre del proyecto | VGBuilder |
| :---- | :---- |
| **Cierre de iteración** | Código: I1 Fecha: 25/Sep/2026 |
| **Generador por** | Juan Pablo Chavez Ramirez |
| **Aprobado por** | Juan Pablo Chavez Ramirez |
| **Alcance de la distribución del documento** | Control interno para todo el proyecto. |

Índice

# 

# **Sobre este documento**

La calidad se logra por medio de la revisión constante de las actividades que conducen desde la idea al producto. Al momento del cierre de una iteración es buen momento para hacer un alto, y evaluar lo logrado, los problemas encontrados y los retos a enfrentar.

El presente documento marca el final de la iteración ***I1***, y contiene una evaluación de los artefactos y actividades realizadas durante la misma.

Se recogen también las impresiones y observaciones hechas durante el desarrollo de la iteración, así como el esfuerzo invertido en cada una de las disciplinas involucradas.

# **Resumen de la Iteración**

## ***Identificación***

Código de iteración: I1

Se suele usar la siguiente convención: I, E, C, T por la inicial de la fase a la que pertenece la iteración: Inicio, Elaboración, Construcción o Transición.   
Se sigue con un número o correlativo que cuenta desde uno.   
Fecha de inicio y cierre es auto explicativo. Lo mismo con los comentarios, de haberlos.

| Código de la iteración | Fase a la que pertenece | Fecha de inicio | Fecha de cierre | Comentarios |
| ----- | ----- | ----- | ----- | ----- |
| I1 | Inicio | 25-Sep-2026 | 25-Sep-2026 |  |

## ***Hitos especiales***

El Sprint 1 **ha concluido con éxito**, completando satisfactoriamente las actividades 1-3, las cuales fueron:

1.1 Definir la taxonomía de ‘tags’  
1.2 Definición del esquema de la base de datos  
1.3 Creación del contrato de API. 

## ***Artefactos y evaluación***

| Artefacto | Meta (%) | Comentarios |
| ----- | ----- | ----- |
| 1.1 | 100% |  |
| 1.2 | 100% |  |
| 1.3 | 100% |  |

| Artefacto | Aspecto a evaluar | Evaluación | Comentarios |
| :---- | :---- | :---- | :---- |
| 1.1 | Evitar la redundancia y ambigüedad de las etiquetas con la finalidad de facilitar el desarrollo correcto del motor de afinidad a hacer. Aplicar esto al roster inicial de juego. | 100%  | OK |
| 1.2 | Revisión de la estructura de la base de datos. | 100% | OK |
| 1.3 | Revisión de la estructura de API. | 80% | Falta darle una revisión mas exhaustiva para comprobar su correcta implementación futura. |

## ***Riesgos y problemas***

En el punto 1.1: La salud de los tags es dependiente de aquel que ingrese las tags. Se ha dejado un diccionario de términos para que aquellos que continúan puedan proceder sin romper o confundirse. 

En el punto 1.2: La base de datos es sensible a redundancia en la tabla ‘tag\_affinities’, por lo que se debe ser cuidadoso con los registros a ingresar. Un ejemplo *On-Game* seria la reacción de Vaporizado donde se busca tanto un personaje que poseea las tags *Hydro-Application* como otro que poseea la tag *Pyro-Application*, provocando que un administrador pueda subir la misma combinación pero invertida, para esto se tiene que sanitizar desde el futuro archivo seed.ts para evitar este problema.

En el punto 1.3: Se tiene contemplado que el usuario pueda importar su inventario de una manera mas comoda, dentro del juego los mismo usuarios tienen acceso a su UID, con el cual y la ayuda de Enka.Network podemos extraer estos mismo inventarios. El riesgo es el tiempo que tome documentar, traducir y adaptar los identificadores que Enka Network utilice. Aun asi, se le ha dedicado un sprint futuro solo a este apartado.

## ***Notas y observaciones***

El punto 1.1 solo se aplico a un grupo inicial de veintiún personajes, actualmente el juego posee alrededor de un centenar, los cuales una vez funcional el proyecto se agregaran conforme a las reglas establecidas en la taxonomía de tags.

El punto 1.2 solo esta preparado para juegos con jugabilidad similar a nuestro caso base (Genshin Impact), por lo que para juegos de otro arquetipo habría que agregar realizar una update al schema para su tipo de jugabilidad.

Tambien se opto por no disponer de una tabla de auditoria, al ser una base de datos de solo consulta, los casos imprevistos de un fallo por la inserción de algún usuario son 0, por lo que no se requiere de un medio para saber quien provoco el error. 

El punto 1.3 contempla de momento artefactos, esto hay que analizarlo mas a profundidad ya que no nos debería importar el inventario de artefactos y armas que el usuario poseea al ser objetos mas alcanzables.

# **Asignación de recursos**

| Rol | Horas-Hombre | Desempeñado por | Observaciones |
| :---- | :---- | :---- | :---- |
| Investigador | 14 hrs (Investigación y documentación) | Juan Pablo Chavez Ramirez | Buen trabajo |
| Investigador | 10 hrs (Investigación y documentación) | Luis Antonio Cuevas Ortiz | Buen Trabajo |
| Arquitecto de DB | 10 hrs (Investigación, documentación y diseño) | Rodrigo Yahir Hernandez Caro | Buen trabajo |

# **Anexos**

## **Anexo A**

### **Anexo A: Taxonomía de Etiquetas (Tags) para el Motor de Afinidad**

**Propósito:** Definir la categorización oficial de personajes (rol, elemento, mecánicas y clase de afinidad) que usará el algoritmo para calcular las sinergias de equipo. También sirve como base para estructurar la base de datos (schema.ts / seed.ts).

#### **A.1 — Roles de Personajes**

Define la función principal del personaje en el equipo. Nota: Un personaje solo puede tener múltiples roles (ej. main\_dps y support) si su estilo de juego cambia completamente dependiendo de cómo se le equipe (ej. Noelle). No se asignan roles dobles por tener habilidades secundarias aisladas.

| Rol | Definición |
| :---- | :---- |
| **Main DPS** | Daño principal del equipo. Requiere estar activo en el campo de batalla la mayor parte del tiempo para ejecutar sus combos. |
| **Sub DPS** | Daño secundario. Aporta una cantidad significativa de daño sin necesidad de consumir tiempo activo en el campo. |
| **Support** | Utilidad y apoyo. Se enfoca en curar, mejorar estadísticas (buffs) o dar utilidad al equipo, no en hacer daño. |

#### **A.2 — Condiciones de Mecánicas (Gates)**

Son los requisitos lógicos que deben cumplirse para que una mecánica se active. Nota: Si un personaje tiene varias condiciones para un mismo efecto, se evalúan de forma independiente usando "O" (OR). Si se cumple cualquiera, el efecto aplica.

| Condición (Gate) | Momento de Evaluación | Semántica (Cuándo aplica) |
| :---- | :---- | :---- |
| **min\_constellation: Cx** | Antes de armar el equipo. | Requiere que el personaje tenga desbloqueada la constelación X o superior. Es una propiedad fija del personaje. |
| **min\_alignment\_count: N** | Después de armar el equipo. | Requiere que haya al menos N personajes en el equipo que compartan la misma facción (alignment\_class). |

#### **A.3 — Clases de Afinidad ("Buffo de Bruja")**

Grupos o facciones que otorgan poderes extra (un segundo kit de habilidades) cuando un equipo contiene **2 o más miembros** del mismo grupo. Un personaje nunca pertenece a más de un grupo a la vez.

* **NULL (Ninguno):** No pertenece a ningún grupo. Se usa un valor NULL real en BD (no el texto "None") para evitar errores en el código.

* **Hexerei:** Fischl, Klee, Mona, Razor, Sucrose, Venti.

* **Witch:** Qiqi.

#### **A.4 y A.5 — Reglas de Nomenclatura para Mecánicas**

Para mantener la base de datos limpia y estandarizada:

* **Vocabulario cerrado:** Todo nombre de mecánica debe coincidir con los patrones oficiales (ej. \[elemento\]\_application, buff\_\[elemento\]\_dmg).

* **Glosario central:** La lista completa de mecánicas está en el archivo taxonomia-tags.md.

* **Nuevos términos:** Si una mecánica no encaja en lo existente, debe documentarse primero en el glosario oficial antes de usarse en el código.

#### **A.6 — Decisiones Técnicas de Diseño**

Resumen de las simplificaciones y decisiones tomadas durante esta tarea:

1. **Exclusividad de Facciones:** La clase de afinidad (alignment\_class) se guardará como una sola columna en la tabla de personajes, asumiendo que un personaje nunca estará en dos grupos.

2. **Alcance Inicial (Epic 1):** El lanzamiento incluye un grupo cerrado de **21 personajes** base, con sus datos de arma, región y clase de afinidad totalmente completos.

## **Anexo B** 

**Diseño del Esquema Relacional**

La arquitectura inicial (Epic 1\) se diseñó para escalar a múltiples juegos, priorizando la integridad referencial. Se diseño a través de Drizzle y bun para la generación posterior del código sql.

**Tablas.**

**![][image1]**

| Tabla | Descripción y Función Principal | Optimizaciones y Restricciones |
| :---- | :---- | :---- |
| **Games** | Núcleo estructural del sistema. Almacena el identificador de cada juego soportado. | Llave primaria serial y restricción UNIQUE en el slug. |
| **Characters** | Catálogo de personajes con sus atributos base (elemento, arma, rareza, región). | Llave foránea vinculada estrictamente a games.id. |
| **Tags** | Sistema de categorización genérico para metadatos. | Restricción combinada única (Juego \+ Categoría \+ Valor) para evitar duplicidad. |
| **Character\_tags** | Tabla pivote para la asignación N:M entre personajes y sus etiquetas. | Llave primaria compuesta e índice dedicado en tag\_id para acelerar consultas inversas. |
| **Tag\_affinities** | Motor de reglas lógicas. Define el peso de las sinergias entre dos etiquetas distintas. | Integridad referencial doble hacia la tabla tags. |
| **Artifact\_sets** | Catálogo de equipamiento con conexión a arquetipos. | Llave foránea hacia tags.id. |
| **Team\_presets** | Almacenamiento de composiciones predefinidas. | Flexibilidad de esquema utilizando el formato jsonb. |

**Conclusión.**

La creación de la BD se baso en la futura escalabilidad de VGBuilder, donde se espera ampliar a mas videojuegos y personajes. La configuración del entorno local y el despliegue de la arquitectura de datos representan un avance fundamental para la infraestructura de la plataforma VGBuilder. Al integrar PostgreSQL mediante contenedores Docker, se logró establecer un entorno de desarrollo estandarizado y altamente reproducible para todos los miembros del equipo, eliminando las discrepancias de configuración y asegurando la estabilidad del servidor.

Anexo C

**Contrato de API — VGBuilder**

# 1.- Introducción

Este anexo documenta, de forma legible, el contrato de API del backend de VGBuilder: los endpoints HTTP expuestos por sus tres módulos de solo lectura (Catalog, Inventory, Affinity) y los modelos de datos (schemas) que esos endpoints devuelven.

El contrato completo, en formato OpenAPI 3.0.3, vive en el archivo vgbuilder-api-contract.yaml del repositorio; este documento es su versión de referencia para lectura humana, no un reemplazo del archivo fuente.

# 2.- Endpoints

## 2.1.- CATALOG

**GET /catalog/characters**

Lista todos los personajes del catálogo, cada uno con sus tags ya resueltos (join contra character\_tags/tags). Es el único endpoint real de este módulo hoy.

Respuesta 200 → arreglo de Character (ver sección 3.1).

## 2.2.- INVENTORY

**GET /inventory/{uid}**

Obtiene el inventario normalizado de un jugador a partir de su UID de juego. Actúa como proxy de solo lectura hacia Enka Network: no persiste nada del lado del servidor.

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| uid | string (path) | Sí | UID del jugador en el juego. Ejemplo: "601321537". |

Respuesta 200 → NormalizedInventoryResponse (ver sección 3.2). Respuesta 404 → UID no encontrado o perfil no público en Enka. Respuesta 502 → Enka no respondió o respondió con error.

## 

## 2.3.- AFFINITY

**GET /affinity/tag-affinities**

Lista los pesos de afinidad entre pares de tags. No calcula nada — sirve los datos crudos para que el motor de afinidad (shared/affinity-engine, que corre en el navegador) calcule la sinergia por su cuenta.

Respuesta 200 → arreglo de TagAffinity (ver sección 3.3).

**GET /affinity/presets**

Lista los presets de equipos meta. Es la misma tabla que team\_presets del esquema; se expone desde Affinity porque es el motor de afinidad quien la consume directamente.

Respuesta 200 → arreglo de TeamPreset (ver sección 3.3).

# 3.- Modelos de datos (Schemas)

## 3.1.- CATALOG

### *Character*

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| id | string | Sí | ID interno/inestable. Usable solo como llave de join en memoria durante la sesión. |
| name | string | Sí | Nombre del personaje. |
| element | string | Sí | Vocabulario libre. Ej. "Pyro". |
| weaponType | string | Sí | Ej. "Claymore". |
| rarity | integer | Sí | Rareza del personaje. |
| region | string | Sí | Región de origen. |
| alignmentClass | string (nullable) | No | Grupo de sinergia especial (ej. "Hexerei"). Null si no aplica. |
| imageUrl | string (uri, nullable) | No | URL de la imagen del personaje. |
| description | string (nullable) | No | Descripción del personaje. |
| tags | array\<CharacterTagRef\> | Sí | Tags resueltos del personaje (roles, mecánicas, etc.). |

### CharacterTagRef

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| category | string | Sí | Categoría del tag. Ej. "mechanic", "role". |
| value | string | Sí | Valor del tag. Ej. "buff\_vaporize\_dmg". |

## 3.2.- INVENTORY

### NormalizedInventoryResponse

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| uid | string | Sí | UID del jugador. |
| nickname | string (nullable) | No | Nombre visible del jugador. |
| accountLevel | integer (nullable) | No | Nivel de cuenta del jugador. |
| characters | array\<InventoryCharacterEntry\> | Sí | Personajes que el jugador tiene desbloqueados. |

### 

### InventoryCharacterEntry

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| gameCharacterId | integer | Sí | ID numérico crudo de Enka (avatarId). Pendiente de cruzar contra catalog.characters cuando exista el mapeo de IDs. |
| level | integer | Sí | Nivel del personaje. |
| ascension | integer (0-6) | Sí | Fase de ascensión. |
| constellation | integer (0-6) | Sí | Constelación desbloqueada. Derivada del tamaño de talentIdList en la respuesta cruda de Enka (0 si no viene). |
| friendshipLevel | integer | Sí | Nivel de amistad con el personaje. |
| weapon | InventoryWeapon (nullable) | Sí | Arma equipada, en versión mínima (ver abajo). |
| artifacts | array\<InventoryArtifactPiece\> | Sí | Piezas de artefacto equipadas. |

### InventoryWeapon

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| name | string | Sí | Nombre del arma, tal cual lo expone Enka. |
| icon | string | Sí | URL del ícono, tal cual lo expone Enka. |
| refinement | integer (nullable) | No | Opcional/best-effort. No garantizado en la v1 del proxy. |

### InventoryArtifactPiece

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| slot | string (enum) | Sí | EQUIP\_BRACER, EQUIP\_NECKLACE, EQUIP\_SHOES, EQUIP\_RING o EQUIP\_DRESS. |
| gameSetId | integer | Sí | setId crudo de Enka. |
| level | integer | Sí | Nivel de la pieza. |
| mainStat | ArtifactStat | Sí | Estadística principal. |
| subStats | array\<ArtifactStat\> | Sí | Estadísticas secundarias. |

### *ArtifactStat*

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| statType | string | Sí | Código crudo de Enka. Ej. "FIGHT\_PROP\_CRITICAL\_HURT". |
| value | number | Sí | Valor de la estadística. |

### *Error*

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| code | string | Sí | Código de error. |
| message | string | Sí | Mensaje descriptivo del error. |

## 3.3.- AFFINITY

### *TagAffinity*

*weight es el peso de UNA fila (un par de tags), no un score final. El cálculo de sinergia de un equipo suma libremente todos los pares que matcheen, sin normalizar — el total de un equipo NO tiene techo ni está acotado a \-10/10. Ese rango solo aplica por fila.*

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| id | string | Sí | Identificador de la fila. |
| tagAId | string | Sí | Primer tag del par. |
| tagBId | string | Sí | Segundo tag del par. |
| weight | integer (-10 a 10\) | Sí | Peso de esta fila. No confundir con el score total de un equipo, que no está acotado. |

### *TeamPreset*

| Campo | Tipo | Requerido | Descripción |
| :---- | :---- | :---- | :---- |
| id | string | Sí | ID interno/inestable, mismo criterio que Character.id. |
| name | string | Sí | Nombre del preset. |
| composition | array\<string\> | Sí | Arreglo plano de slugs/nombres de personaje. Sin objetos anidados ni campo role. |

# **Referencias a otros documentos**

**\[1\]** OpenAPI Initiative (The Linux Foundation), "The OpenAPI Specification Repository," *GitHub*, 2026\. \[Online\]. Available: [https\://github.com/oai/openapi-specification](https://github.com/oai/openapi-specification?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

**\[2\]** SmartBear Software, "OpenAPI Specification," *Swagger*. \[Online\]. Available: [https\://swagger.io/specification/](https://swagger.io/specification/?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

**\[3\]** EnkaNetwork, "API-docs: API documentation for the Enka.Network API responses and structure," *GitHub*, 2026\. \[Online\]. Available: [https\://github.com/EnkaNetwork/API-docs](https://github.com/EnkaNetwork/API-docs?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

**\[4\]** EnkaNetwork, "Enka.Network API Documentation Web," *Enka.Network*. \[Online\]. Available: [https\://api.enka.network/](https://api.enka.network/?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

**\[5\]** PostgreSQL Global Development Group, "PostgreSQL: The World's Most Advanced Open Source Relational Database," *PostgreSQL*. \[Online\]. Available: [https\://www\.postgresql.org/](https://www.postgresql.org/?utm_source=gemini). \[Accessed: Sep. 25, 2026\]. 

**\[6\]** Drizzle Team, "Drizzle ORM Documentation," *Drizzle ORM*. \[Online\]. Available: [https\://orm.drizzle.team/](https://orm.drizzle.team/?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

\[7\] KeqingMains, "KQM Theorycrafting Library." \[En línea\]. Disponible en: [https\://library.keqingmains.com/](https://library.keqingmains.com/?utm_source=gemini)

# **Glosario de términos**

* **API (Application Programming Interface):** Interfaz de programación de aplicaciones que define un conjunto de reglas y protocolos para que distintos sistemas de software se comuniquen entre sí, como el contrato de comunicación estructurado para el proyecto o la integración externa con Enka.Network.   
* **Backend:** Capa lógica del sistema que opera del lado del servidor. Se encarga de gestionar la infraestructura de la base de datos (PostgreSQL), procesar las reglas de negocio (como el Motor de Afinidad) y proveer acceso a los datos de forma segura.  
* **Frontend:** Capa visual e interfaz de usuario de la plataforma. Es la parte de la aplicación con la que interactúan directamente los usuarios finales, responsable de capturar las interacciones y presentar la información consumida desde el servidor.  
* **Alignment Class (Clase de Afinidad):** Agrupación o facción especial dentro del sistema de reglas (ej. *Hexerei*, *Witch*) que otorga bonificaciones adicionales cuando un equipo incluye un número mínimo de personajes pertenecientes al mismo grupo. 

* **Drizzle ORM:** Mapeador objeto-relacional de TypeScript para bases de datos SQL que permite declarar esquemas, realizar consultas y gestionar migraciones con un tipado estricto en tiempo de compilación. 

* **Enka.Network API:** Servicio y API de terceros que permite consultar y extraer de manera automatizada el inventario de personajes y equipamiento de un jugador a partir de su identificador de usuario en el juego (UID). 

* **Integridad Referencial:** Regla de consistencia en modelos relacionales garantizada mediante el uso de llaves foráneas (*foreign keys*), asegurando que las referencias entre tablas (ej. characters.game\_id con games.id) siempre correspondan a registros existentes. 

* **JSONB (Binary JSON):** Formato de almacenamiento binario descomprimido para datos JSON en PostgreSQL, utilizado en tablas como team\_presets para permitir la flexibilidad de almacenar estructuras complejas sin perder rendimiento en consultas. 

* **Motor de Afinidad (Affinity Engine):** Algoritmo central de la plataforma VGBuilder encargado de calcular el nivel de sinergia entre los integrantes de un equipo analizando las combinaciones de sus etiquetas (*tags*) y asignándoles un peso cuantitativo. 

* **PostgreSQL:** Sistema de gestión de base de datos relacional de código abierto que proporciona soporte avanzado para concurrencia mediante el mecanismo MVCC, procesamiento de datos JSONB y transacciones ACID. 

* **Sanitización de Datos:** Proceso de validación y filtrado aplicado a los registros (como en el archivo seed.ts para la tabla tag\_affinities) para impedir combinaciones redundantes o duplicadas que distorsionen los cálculos del motor. 

* **Seeding (seed.ts):** Proceso automatizado mediante *scripts* de código que inyecta el conjunto inicial de datos de prueba o producción (personajes, etiquetas, configuraciones base) a una base de datos vacía o recién sincronizada. 

* **Tabla Pivote (Junction Table):** Tabla intermedia dentro de un modelo relacional (ej. character\_tags) diseñada para resolver relaciones de muchos a muchos (N:M) mediante una llave primaria compuesta e índices específicos para optimizar las consultas inversas. 

* **Taxonomía de Tags:** Sistema estandarizado y jerárquico de categorización de etiquetas (roles, elementos, condiciones y mecánicas) que evita la redundancia y ambigüedad en el catálogo de personajes.

[image1]: <data:image/png;base64,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>