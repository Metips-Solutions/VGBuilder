

**Control de documento**

| Nombre del proyecto | VGBuilder |
| :---- | :---- |
| **Cierre de iteración** | Código: I3 Fecha: 09/Oct/2026 |
| **Generador por** | Rodrigo Yahir Hernandez Caro & Luis Antonio Cuevas Ortiz |
| **Aprobado por** | Juan Pablo Chavez Ramirez |
| **Alcance de la distribución del documento** | Control interno para todo el proyecto. |

**Indice**

**[Sobre este documento	3](#heading=)**

[**Resumen de la Iteración	4**](#resumen-de-la-iteración)

[**Identificación	4**](#heading=)

[**Hitos especiales	4**](#heading=)

[**Artefactos y evaluación	5**](#heading=)

[**Riesgos y problemas	6**](#heading=)

[**Notas y observaciones	6**](#heading=)

[**Asignación de recursos	7**](#heading=)

[**Anexos	8**](#heading=)

[**Anexo A: Desarrollar endpoints de solo lectura (API) para el catálogo.	8**](#anexo-a:-desarrollar-endpoints-de-solo-lectura-\(api\)-para-el-catálogo.)

[**A.1 – Estrategia Técnica de Optimización y Validación	8**](#a.1-–-estrategia-técnica-de-optimización-y-validación)

[**A.2 – Actividades y Herramientas del Sprint	8**](#a.2-–-actividades-y-herramientas-del-sprint)

[**Conclusión	10**](#conclusión)

[**Anexo B.	10**](#anexo-b.)

[**B.1 – Factores de calidad de McCall.	10**](#b.1-–-factores-de-calidad-de-mccall.)

[**Referencias a otros documentos	10**](#referencias-a-otros-documentos)

[**Glosario de términos	11**](#heading=)

# 

# **Sobre este documento**

La calidad se logra por medio de la revisión constante de las actividades que conducen desde la idea al producto. Al momento del cierre de una iteración es buen momento para hacer un alto, y evaluar lo logrado, los problemas encontrados y los retos a enfrentar.

El presente documento marca el final de la iteración ***I3***, y contiene una evaluación de los artefactos y actividades realizadas durante la misma.

Se recogen también las impresiones y observaciones hechas durante el desarrollo de la iteración, así como el esfuerzo invertido en cada una de las disciplinas involucradas.

# **Resumen de la Iteración** {#resumen-de-la-iteración}

## ***Identificación***

Código de iteración: I3

Se suele usar la siguiente convención: I, E, C, T por la inicial de la fase a la que pertenece la iteración: Inicio, Elaboración, Construcción o Transición.   
Se sigue con un número o correlativo que cuenta desde uno.   
Fecha de inicio y cierre es auto explicativo. Lo mismo con los comentarios, de haberlos.

| Código de la iteración | Fase a la que pertenece | Fecha de inicio | Fecha de cierre | Comentarios |
| ----- | ----- | ----- | ----- | ----- |
| I3 | Inicio | 02-Oct-2026 | 09-Oct-2026 |  |

## ***Hitos especiales***

El Sprint 3 **ha concluido con éxito**, completando satisfactoriamente la actividad , las cuales fueron:

1.6 Desarrollar endpoints de solo lectura (API) para el catálogo

## ***Artefactos y evaluación***

| Artefacto | Meta (%) | Comentarios |
| ----- | ----- | ----- |
| 1.6 | 100% |  |

| Artefacto | Aspecto a evaluar | Evaluación | Comentarios |
| :---- | :---- | :---- | :---- |
| 1.6 | Comprobar la correcta implementación y exposición del catálogo de personajes, garantizando tiempos de respuesta óptimos y validación estricta de esquemas contra el contrato de API.  | 100%  | OK |

## 

## ***Riesgos y problemas***

Para el Sprint numero 3 solo se tenia el riesgo *RIE-22* y los riesgos generales, del cual solo se presentaron el *RIE-07* y el *RIE-05* al no usar correctamente git por parte de uno de los integrantes y no verificar correctamente la ejecución en cada maquina del codigo al que se le habia hecho push.

## ***Notas y observaciones***

Este Sprint ya se había previsto al ser uno muy ligero, donde solo se iba a entregar un json con los datos de la db, donde por el momento se entregan todos para la demo con el juego *Genshin Impact*, pero para un futuro se debera agregar un unico parametro para diferenciar entre juegos a futuro. 

Tambien se tomara en cuenta apoyar a uno de los compañeros para en el uso de comandos de git, ya que a pesar de demostrar el correcto funcionamiento y correcta creación del codigo correspondiente, no se subio a la nube, dando discrepancias entre los demas compañeros.

De mientras, el equipo aprovechara el tiempo extra para prepararse para el siguiente sprint, el cual representa el reto mayor y a la vez el punto mas fuerte de todos, el llenado automático del perfil del inventario con ayuda de una API externa.

# 

# **Asignación de recursos**

| Rol | Horas-Hombre | Desempeñado por | Observaciones |
| :---- | :---- | :---- | :---- |
| Investigador | 8 hrs (Investigación y documentación) | Juan Pablo Chavez Ramirez | Buen trabajo |
| Investigador | 8 hrs (Investigación, documentación y generación de codigo) | Luis Antonio Cuevas Ortiz | Buen Trabajo |
| Arquitecto de API | 9 hrs (Investigación, documentación y generación de codigo) | Rodrigo Yahir Hernandez Caro | Buen trabajo |

# **Anexos**

### **Anexo A: Desarrollar endpoints de solo lectura (API) para el catálogo.** {#anexo-a:-desarrollar-endpoints-de-solo-lectura-(api)-para-el-catálogo.}

Propósito: Creación y exposición del endpoint HTTP GET /catalog/characters para servir el catálogo completo al frontend, cumpliendo rigurosamente con el contrato OpenAPI 3.0.3 del proyecto y resolviendo cuellos de botella de rendimiento en la consulta a la base de datos.

#### **A.1 – Estrategia Técnica de Optimización y Validación** {#a.1-–-estrategia-técnica-de-optimización-y-validación}

Para evitar el colapso de la base de datos por el problema de consultas N+1 (donde originalmente se hacía una petición extra por cada personaje para obtener sus etiquetas), la estrategia técnica consistió en trasladar el cruce relacional a la memoria del servidor. Se ejecutaron dos únicas consultas en paralelo (Promise.all) y, mediante un diccionario de datos (Map) en la capa de servicio, se unieron los personajes con sus respectivos tags de manera altamente eficiente.

Adicionalmente, se implementó una validación de esquemas estricta en la capa de rutas utilizando el tipado de ElysiaJS (t.Object, t.Array). Esto garantiza que los datos nativos de PostgreSQL sean transformados forzosamente antes de salir (por ejemplo, casteando los IDs numéricos a String) para acatar con exactitud el contrato de la API.

#### **A.2 – Actividades y Herramientas del Sprint** {#a.2-–-actividades-y-herramientas-del-sprint}

| Actividad Realizada (Lo que se hizo) | Herramientas / Comandos (Lo que se usó) | Resultado / Propósito |
| :---- | :---- | :---- |
| Refactorización de consultas a la base de datos | TypeScript, Drizzle ORM, PostgreSQL | Extracción centralizada de las tablas characters y character\_tags en solo dos llamadas, reduciendo drásticamente las peticiones al motor SQL. |
| Procesamiento y mapeo relacional en memoria | TypeScript (Map, Promise.all) | Eliminación del problema N+1, uniendo los personajes y sus etiquetas de forma local y estructurada dentro del servidor (Servicio). |
| Exposición HTTP y validación estricta de contrato | ElysiaJS, Contrato OpenAPI 3.0.3 | Creación del endpoint GET /catalog/characters con tipado fuerte, garantizando que el JSON de salida no contenga identificadores internos irrelevantes y coincida exactamente con las especificaciones. |
| Gestión de control de versiones y ramas | Git (switch \-c, add, commit, push), GitHub | Empaquetado de la nueva arquitectura de la API en la rama feat/endpoints-catalogo y sincronización remota para su revisión. |

#### **Conclusión** {#conclusión}

Mantener una arquitectura estricta en tres capas (Repositorios, Servicios y Rutas) junto con la validación de esquemas de ElysiaJS, asegura que la API sea altamente confiable y resistente a errores de base de datos. Procesar los cruces relacionales en la memoria de Node/Bun en lugar de saturar el motor SQL demuestra una optimización técnica crítica, garantizando que el Motor de Afinidad en el frontend reciba los datos exactos que necesita, en el formato correcto y con tiempos de respuesta de pocos milisegundos.

### **Anexo B.** {#anexo-b.}

#### **B.1 – Factores de calidad de McCall.** {#b.1-–-factores-de-calidad-de-mccall.}

![][image1]

# **Referencias a otros documentos** {#referencias-a-otros-documentos}

\[1\] ElysiaJS, "ElysiaJS \- Fast, and friendly Bun web framework," *elysiajs.com*. \[Online\]. Available: [https\://elysiajs.com/](https://elysiajs.com/). \[Accessed: Oct. 8, 2026\]. 

\[2\] OpenAPI Initiative (The Linux Foundation), "OpenAPI Specification v3.0.3," *GitHub*, 2020\. \[Online\]. Available: [https\://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md). \[Accessed: Oct. 8, 2026\].

\[3\] Microsoft, "TypeScript Documentation \- Everyday Types," *typescriptlang.org*. \[Online\]. Available: [https\://www\.typescriptlang.org/docs/handbook/2/everyday-types.html](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html). \[Accessed: Oct. 8, 2026\]. 

\[4\] Oven, "Bun Documentation \- Build faster with Bun," *bun.sh*. \[Online\]. Available: [https\://bun.sh/docs](https://bun.sh/docs). \[Accessed: Oct. 8, 2026\]. 

\[5\] Drizzle Team, "Drizzle ORM \- Relational Queries," *Drizzle ORM*. \[Online\]. Available: [https\://orm.drizzle.team/docs/rqb](https://orm.drizzle.team/docs/rqb). \[Accessed: Oct. 8, 2026\]. 

# **Glosario de términos**

* **Endpoint (API):** La ruta de internet (en este caso, /catalog/characters) a la que el frontend le pide la lista de personajes al servidor.  
* **Problema N+1:** Error que tumba el rendimiento, donde se hace una consulta a la base de datos para traer todo y luego *otra* consulta extra por cada personaje. Lo resolvimos armando los datos directo en la memoria.  
* **Procesamiento en Memoria (Promise.all / Map):** La manera que utilizamos para extraer todo de golpe de la base de datos y unir los personajes con sus etiquetas internamente en el servidor. Siendo más rápido que pedir a la base de datos que haga las relaciones.  
* **ElysiaJS:** El framework que estamos usando sobre Bun. Levanta la API en corto y nos sirve de cadenero para asegurar que los datos salgan con el formato exacto que necesitamos.  
* **Contrato OpenAPI 3.0.3:** Básicamente es el manual de reglas estrictas, el cual define cómo tiene que verse la respuesta JSON de la API; si a ElysiaJS no le cuadra la forma del dato con este contrato, bloquea la salida.  
* **Archivos .env:** Los archivos donde guardamos las variables de entorno o contraseñas locales (como las credenciales de PostgreSQL).   
* **Motor de Afinidad:** El sistema que está esperando en el frontend. Es el que va a consumir todos estos datos de personajes hiper optimizados para calcular las bonificaciones de los equipos.

### 

[image1]: <data:image/png;base64,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>