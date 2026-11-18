

**Control de documento**

| Nombre del proyecto | VGBuilder |
| :---- | :---- |
| **Cierre de iteración** | Código: I2 Fecha: 02/Oct/2026 |
| **Generador por** | Rodrigo Yahir Hernandez Caro & Luis Antonio Cuevas Ortiz |
| **Aprobado por** | Juan Pablo Chavez Ramirez |
| **Alcance de la distribución del documento** | Control interno para todo el proyecto. |

**Indice**

[**Sobre este documento	3**](#heading=)

[**Resumen de la Iteración	4**](#resumen-de-la-iteración)

[Identificación	4](#heading=)

[Hitos especiales	4](#heading=)

[Artefactos y evaluación	5](#heading=)

[Riesgos y problemas	6](#heading=)

[Notas y observaciones	6](#heading=)

[**Asignación de recursos	7**](#heading=)

[**Anexos	8**](#heading=)

[Anexo A: Población de la DB	8](#anexo-a:-población-de-la-db)

[A.1- Entorno	8](#a.1--entorno)

[A.2- Procedimiento	8](#a.2--procedimiento)

[A.3- Resultados	10](#a.3--resultados)

[A.4- Decisiones técnicas	10](#a.4--decisiones-técnicas)

[A.5- Riesgos y puntos pendientes	10](#a.5--riesgos-y-puntos-pendientes)

[Conclusión	10](#conclusión)

[Anexo B: Generar descripción corta por personaje a partir de sus tags.	11](#anexo-b:-generar-descripción-corta-por-personaje-a-partir-de-sus-tags.)

[B.1 – Estrategia Técnica de Inyección (Seeding)	11](#b.1-–-estrategia-técnica-de-inyección-\(seeding\))

[B.2 – Actividades y Herramientas del Sprint	11](#b.2-–-actividades-y-herramientas-del-sprint)

[Conclusión	12](#conclusión-1)

[**Referencias a otros documentos	13**](#referencias-a-otros-documentos)

[**Glosario de términos	13**](#heading=)

# 

# **Sobre este documento**

La calidad se logra por medio de la revisión constante de las actividades que conducen desde la idea al producto. Al momento del cierre de una iteración es buen momento para hacer un alto, y evaluar lo logrado, los problemas encontrados y los retos a enfrentar.

El presente documento marca el final de la iteración ***I2***, y contiene una evaluación de los artefactos y actividades realizadas durante la misma.

Se recogen también las impresiones y observaciones hechas durante el desarrollo de la iteración, así como el esfuerzo invertido en cada una de las disciplinas involucradas.

# **Resumen de la Iteración** {#resumen-de-la-iteración}

## ***Identificación***

Código de iteración: I2

Se suele usar la siguiente convención: I, E, C, T por la inicial de la fase a la que pertenece la iteración: Inicio, Elaboración, Construcción o Transición.   
Se sigue con un número o correlativo que cuenta desde uno.   
Fecha de inicio y cierre es auto explicativo. Lo mismo con los comentarios, de haberlos.

| Código de la iteración | Fase a la que pertenece | Fecha de inicio | Fecha de cierre | Comentarios |
| ----- | ----- | ----- | ----- | ----- |
| I2 | Inicio | 25-Sep-2026 | 02-Oct-2026 |  |

## ***Hitos especiales***

El Sprint 2 **ha concluido con éxito**, completando satisfactoriamente las actividades 4 y 5, las cuales fueron:

1.4 Población de la DB  
1.5 Generacion de Breves descripciones de los personajes

## ***Artefactos y evaluación***

| Artefacto | Meta (%) | Comentarios |
| ----- | ----- | ----- |
| 1.4 | 100% |  |
| 1.5 | 100% |  |

| Artefacto | Aspecto a evaluar | Evaluación | Comentarios |
| :---- | :---- | :---- | :---- |
| 1.4 | El seed logre cargar sin errores el roster de 21 personajes con su taxonomía de tags, umbrales y atributos fijos, conforme al esquema y a la taxonomía definidos en 1.1 y 1.2.  | 100%  | OK |
| 1.5 | Generacion de Descripcion de Personajes | 100% | Cambio de vista de Dinamico a Estatico |

## 

## ***Riesgos y problemas***

Para este sprint, el unico problema fue la falta de los archivos ‘env’ en las maquinas de los demas participantes, se corrigio entregando estos mismos de manera privada para impedir su publicacion en el repositorio publico

En descripciones, el cambio de decision de descripcion dinamica a estatica produce que alguien tenga que dedicarse a crearla manualmente. Mas alla de eso, no presenta problemas.

## ***Notas y observaciones***

El uso de drizzle facilita mucho la visualizacion de la insercion de registros a postgreSQL y permite que todos los participantes tengan la misma base de datos de una manera mas sencilla y rapida.

En la parte de descripciones, la idea original era realizar una descripcion automatica en base a los tags (Tome por ejemplo el personaje Bennett, en base a sus tags seria algo como ‘Personaje Pyro de Espada Ligera que da Ataque’) pero se decidio remover y poner una descripcion personalizada, la decision de mantenerlo separado mas alla de facilitar el merge que se iba a realizar en github fue con la intencion de facilitar su edicion posterior, vease en este caso que las descripciones estan generadas con Inteligencia Artificial, esta adaptacion facilita a hacer un texto mas humano sin tener que enredarse modificando el arreglo de personajes generado en el punto 1.4

# 

# **Asignación de recursos**

| Rol | Horas-Hombre | Desempeñado por | Observaciones |
| :---- | :---- | :---- | :---- |
| Investigador | 8 hrs (Investigación y documentación) | Juan Pablo Chavez Ramirez | Buen trabajo |
| Investigador | 10 hrs (Investigación, documentación y generación de codigo) | Luis Antonio Cuevas Ortiz | Buen Trabajo |
| Arquitecto de DB | 10 hrs (Investigación, documentación y generación de codigo) | Rodrigo Yahir Hernandez Caro | Buen trabajo |

# **Anexos**

## **Anexo A: Población de la DB** {#anexo-a:-población-de-la-db}

Documentar la carga inicial de la base de datos de VGBuilder con la taxonomía de tags \[7\], y el roster de 21 personajes de Genshin Impact \[8\], \[9\], mediante un script de seeding reproducible (server/src/shared/db/seed.ts). 

### **A.1- Entorno** {#a.1--entorno}

| Componente | Detalle |
| :---- | :---- |
| Sistema | Windows con WSL (Debian) y VSC Code |
| Runtime | Bun |
| Base de datos | PostgreSQL 16 \[5\] en Docker \[10\] |
| ORM | Drizzle ORM / drizzle-kit \[6\] |
| Esquema | schema.ts |

### **A.2- Procedimiento** {#a.2--procedimiento}

1. Se configuraron los archivos .env de la raíz (db\_user, db\_password, db\_name, db\_port) y de server (DATABASE\_URL hacia localhost).  
2. Se levantó Postgres con docker compose up \-d db \[10\].  
3. Se crearon las tablas con bun run db:push \[11\].  
4. Se han hecho cambios a seeds.ts

| \# Bug | Descripción |
| :---- | :---- |
| 1 | "element" paso de tag a columna en "characters" |
| 2 | El insert de "characters" ahora envia los atributos "element", "weaponType", "rarity", "region", "alignmentClass" e "imagenUrl" |
| 3 | Las mecánicas ahora se manejan desde un arreglo "mechanics" y se guardan como tags de categoria "mecánica", teniendo de umbrales "min\_constellation" y "min\_alignment\_count" en "character\_tags" |
| 4 | Se decidió realizar unos cambios para que los tags se fusionaran y no lograran duplicarse por la llave primaria (ej. Mona) |

5. Se ejecutó bun run src/shared/db/seed.ts, que terminó con "Listo ✅".  
6. Se verificaron los conteos en Drizzle Studio \[6\].

### 

### 

### 

### **A.3- Resultados** {#a.3--resultados}

| Tabla | Registros |
| :---- | :---- |
| games | 1 |
| characters | 21 |
| tags | 52 |
| characters\_tag | 121 |

### **A.4- Decisiones técnicas** {#a.4--decisiones-técnicas}

1. Atributos fijos como columnas: elemento, arma, rareza, región y clase de afinidad viven en “characters”. Solo rol y mecánicas son tags.  
2. Umbrales en la tabla pivote: el tag es el mismo para todos, pero el umbral depende del personaje, por lo que se guarda en “character\_tags”.  
3. Seed reiniciable: el script borra y reinserta los datos de genshin-impact en cada ejecución, para iterar la taxonomía sin residuos.

### **A.5- Riesgos y puntos pendientes** {#a.5--riesgos-y-puntos-pendientes}

* La taxonomía sigue siendo un borrador a validar en equipo.

### **Conclusión** {#conclusión}

Con esta tarea la base de datos pasó de un esquema vacío a un catálogo funcional de 21 personajes con 52 tags y 121 relaciones. El seed es la fuente de verdad ejecutable de la taxonomía: cualquier miembro del equipo puede recrear la BD con Docker y dos comandos.

## **Anexo B: Generar descripción corta por personaje a partir de sus tags.** {#anexo-b:-generar-descripción-corta-por-personaje-a-partir-de-sus-tags.}

Creación de función para la inserción de descripción a los 21 personajes iniciales del lanzamiento, las cuales sintetizan su rol, elemento y mecánicas principales. Además, se define la estrategia de inyección (seeding) utilizada para aislar esta información y evitar conflictos en el control de versiones. 

### **B.1 – Estrategia Técnica de Inyección (Seeding)** {#b.1-–-estrategia-técnica-de-inyección-(seeding)}

Para mantener la escalabilidad y evitar colisiones (*merge conflicts*) con el código base del equipo al momento de poblar la base de datos, las descripciones no se incluyeron en el arreglo principal del catálogo. En su lugar, se aislaron en un diccionario de datos estructurado (characterDescriptions). Se diseñó una función asíncrona independiente que, tras la inserción inicial de los personajes y sus etiquetas, ejecuta operaciones UPDATE dirigidas específicamente a la columna description de la tabla characters.

### **B.2 – Actividades y Herramientas del Sprint**  {#b.2-–-actividades-y-herramientas-del-sprint}

| Actividad Realizada (Lo que se hizo) | Herramientas / Comandos (Lo que se usó) | Resultado / Propósito |
| :---- | :---- | :---- |
| Inyección de datos iniciales (Seeding) del catálogo | TypeScript (seed.ts), Drizzle ORM, Bun (bun run) | Poblamiento exitoso de la base de datos con los 21 personajes base del Epic 1 y sus respectivas relaciones de etiquetas (roles, mecánicas). |
| Visualización del esquema y validación de datos | Drizzle Studio (bunx drizzle-kit studio), DBeaver, PostgreSQL | Verificación visual y estructural de las tablas, confirmando la correcta integridad referencial (llaves foráneas) en el entorno local. |
| Desarrollo del módulo de descripciones aisladas | TypeScript (Operaciones UPDATE en Drizzle), Diccionarios de datos (Record\<string, string\>) | Creación de una función asíncrona independiente para integrar las descripciones de los personajes sin alterar el arreglo original, garantizando un código limpio. |
| Gestión de control de versiones y despliegue local | Git (switch \-c, add, commit, push), GitHub, Personal Access Token (PAT) | Empaquetado de la nueva funcionalidad en la rama feat/descripciones-personajes y sincronización exitosa con el repositorio remoto de Metips Solutions. |

#### 

### **Conclusión** {#conclusión-1}

Separar la información cualitativa (descripciones) de las propiedades estructurales (roles y mecánicas) mediante una función de actualización asíncrona asegura un flujo de trabajo colaborativo ininterrumpido. Esta decisión técnica resguarda la integridad del archivo `seed.ts`, previene cuellos de botella en la integración continua y otorga flexibilidad total para escalar o modificar los textos descriptivos sin comprometer la base lógica del motor de afinidad.

# **Referencias a otros documentos** {#referencias-a-otros-documentos}

**\[1\]** PostgreSQL Global Development Group, "PostgreSQL: The World's Most Advanced Open Source Relational Database," *PostgreSQL*. \[Online\]. Available: [https\://www\.postgresql.org/](https://www.postgresql.org/?utm_source=gemini). \[Accessed: Sep. 25, 2026\]. 

**\[2\]** Drizzle Team, "Drizzle ORM Documentation," *Drizzle ORM*. \[Online\]. Available: [https\://orm.drizzle.team/](https://orm.drizzle.team/?utm_source=gemini). \[Accessed: Sep. 25, 2026\].

\[3\] KeqingMains, "KQM Theorycrafting Library." \[En línea\]. Disponible en: [https\://library.keqingmains.com/](https://library.keqingmains.com/)

**\[4\]** HoYoverse, *Genshin Impact*. Shanghái, China: Cognosphere PTE. LTD., 2020\.

**\[5\]** HoYoverse, "Genshin Impact \- Step Into a Vast Magical World of Adventure," *genshin.hoyoverse.com*, 2020\. \[Online\]. Available: [https\://genshin.hoyoverse.com/](https://genshin.hoyoverse.com/). \[Accessed: Oct. 2, 2026\].

**\[6\]** Docker, Inc., "postgres \- Official Image," *Docker Hub*. \[Online\]. Available: [https\://hub.docker.com/\_/postgres](https://hub.docker.com/_/postgres). \[Accessed: Oct. 2, 2026\].

**\[7\]** Drizzle Team, "Drizzle Kit: push," *Drizzle ORM*. \[Online\]. Available: [https\://orm.drizzle.team/docs/drizzle-kit-push](https://orm.drizzle.team/docs/drizzle-kit-push). \[Accessed: Oct. 2, 2026\].

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

