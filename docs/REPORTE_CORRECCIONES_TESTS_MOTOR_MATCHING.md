# Reporte Técnico: Diagnóstico y Corrección de Fallos en el Motor de Matching v2.0 (Epic 3)

> **Documento:** `REPORTE_CORRECCIONES_TESTS_MOTOR_MATCHING.md`  
> **Fecha:** 24 de Octubre de 2026  
> **Módulo:** `server/src/shared/affinity-engine/`  
> **Comando de prueba:** `bun test`  
> **Resultado:** 11/11 tests aprobados (100% éxito)

---

## 1. Resumen Ejecutivo del Problema

Al ejecutar la suite de pruebas unitarias (`bun test`), se identificó una falla en la prueba central de recomendación de composiciones para el personaje **Diluc**:

```bash
✗ Motor de Matching v2.0 (Epic 3) > Diluc: Recomienda Vaporizados Clásico como Top 1 con Xingqiu, Bennett y Sucrose
  Expected to contain: "Xingqiu"
  Received: [ "Diluc", "Beidou", "Mona", "Sucrose" ]
```

El algoritmo recomendaba erróneamente como la mejor composición absoluta (**Top 1** con 8,100 pts) un equipo híbrido sin sanador conformado por **Diluc, Beidou, Mona y Sucrose**, relegando al equipo canónico meta (**Diluc, Xingqiu, Bennett y Sucrose**, 7,400 pts) al puesto #22 de combinaciones evaluadas.

---

## 2. Diagnóstico de Causas Raíz

Al contrastar la lógica de ejecución con los documentos de diseño y teoría (`DISENO_EN_PAPEL_ALGORITMO_SCORING.md`, `BITACORA_INVESTIGACION_MOTOR_MATCHING.md`, `CAMBIOS_NEEDS_Y_BINDS_ARTEFACTOS_KQM.md` y `seed.ts`), se descubrieron 5 fallos estructurales acoplados:

### 2.1 Discrepancia en Constelaciones de Beidou (`roster-data.ts`)
* **Problema:** En `roster-data.ts`, la mecánica `shield` de Beidou estaba declarada a $C_0$ sin condición de constelación.
* **Realidad KQM / Seed:** En `seed.ts` y en las mecánicas oficiales del juego, el escudo de Beidou se desbloquea exclusivamente en su **Constelación 1** (*Impulso desenfrenado* tras activar la Definitiva).
* **Impacto en el motor:** A $C_0$, Beidou era tratada como escudera, permitiendo al equipo `[Diluc, Beidou, Mona, Sucrose]` eludir la penalización crítica de supervivencia (-1,500 pts por falta total de sostén) y aportando erróneamente una fuente adicional para `need_interruption_resistance`.

### 2.2 Tags Falsos de Alineamiento Hexerei en Anemo (`roster-data.ts`)
* **Problema:** Tanto **Sucrose** como **Venti** tenían asignada la mecánica `{ value: "buff_attack", minAlignmentCount: 2 }`.
* **Realidad KQM / Seed:** En `seed.ts`, el rito de brujas de Sucrose otorga `buff_all_dmg` y `buff_hexerei_dmg`, jamás aumento de ATK plano o porcentual.
* **Impacto en el motor:** Al juntar a Sucrose y Mona (ambas de clase `Hexerei`), Sucrose inyectaba automáticamente `buff_attack`. Sumado a la *Nobleza* de Mona y a *Cuento de Cazadores de Dragones* (`catalyst_buffer`), el algoritmo consideraba que la necesidad de ATK de Diluc ya estaba saturada (3 fuentes, 1,400 pts) sin necesidad de contar con Bennett.

### 2.3 Acumulación Espuria en `need_reaction_enabler` (`scoring.ts`)
* **Problema:** La función evaluaba la demanda funcional `need_reaction_enabler` comprobando si el conjunto `allActiveTags` contenía cualquiera de los tags elementales (`hydro_application`, `cryo_application`, `pyro_application`, `electro_application`) y sumaba un contador acumulativo con curva decreciente:
  ```typescript
  if (need.value === "need_reaction_enabler") {
    if (allActiveTags.has("hydro_application")) matchSources++;
    if (allActiveTags.has("cryo_application")) matchSources++;
    if (allActiveTags.has("pyro_application")) matchSources++;
    if (allActiveTags.has("electro_application")) matchSources++;
  }
  ```
* **Impacto en el motor:**
  1. La propia aplicación Pyro de Diluc contaba como "fuente de reacción" para sí mismo.
  2. La aplicación Electro de Beidou sumaba una 3ª fuente (+250 pts), a pesar de que para un atacante cuerpo a cuerpo como Diluc, la Sobrecarga empuja enemigos y dispersa las áreas de impacto.
  3. El equipo con Mona + Beidou acumulaba 1,750 pts por tener elementos cruzados en lugar de evaluar una vía de amplificación limpia.

### 2.4 Ruptura de Consistencia en Meta Blueprints (`scoring.ts`)
* **Problema:** El preset `Vaporizados Clásico` exige en su especificación funcional los elementos `["Pyro", "Hydro", "Pyro", "Anemo"]`.
* **Impacto en el motor:** El algoritmo solo verificaba la presencia de tags de soporte universales (`hydro_application`, `buff_attack`, `need_resistance_shred`), omitiendo comprobar la plantilla elemental. Cualquier equipo con Mona (Hydro) y Sucrose (Anemo + Hexerei ATK) absorbía el bono pleno de +1,500 pts y se auto-adjudicaba el nombre *"Vaporizados Clásico"*.

### 2.5 Omisión de Micro-Afinidades Clave del Diseño en Papel (`scoring.ts`)
* **Problema:** En `DISENO_EN_PAPEL_ALGORITMO_SCORING.md` (Sección 3.1, Caso A) se establecen sinergias secundarias para el equipo canónico (+300 pts) que no estaban implementadas en código:
  * Batería Pyro de Bennett alimentando la Definitiva de Diluc.
  * Transferencia masiva de Maestría Elemental (EM) de Sucrose potenciando directamente el multiplicador de Vaporizado.
  * Sincronía de ataques coordinados (`coordinated_attacks` de Xingqiu) activados en cada golpe normal de la rotación melé de Diluc.
  * El motor Sunfire (`Jean + Bennett`) estaba sobreponderado en +500 pts, haciendo que llevar un segundo sanador redundante superara a un búfer ofensivo especializado como Sucrose.

---

## 3. Modificaciones Implementadas

### 3.1 Normalización de Datos (`server/src/shared/affinity-engine/roster-data.ts`)

1. **Beidou:**
   * Se ajustó el tag `shield` con `minConstellation: 1`.
   * Se incorporó `coordinated_attacks` (rayos de Rompetormentas con ataques normales).
2. **Sucrose:**
   * Se eliminó el tag apócrifo `buff_attack` a 2 miembros Hexerei.
   * Se sincronizó con `seed.ts`: `{ value: "battery" }`, `{ value: "buff_all_dmg", minAlignmentCount: 2 }` y `{ value: "buff_hexerei_dmg", minAlignmentCount: 2 }`.
3. **Venti:**
   * Se eliminó `buff_attack` a 2 miembros Hexerei y se incorporó `{ value: "off_field_anemo_dmg" }`.

### 3.2 Refactorización de la Lógica de Puntuación (`server/src/shared/affinity-engine/scoring.ts`)

1. **Evaluación Contextual de `need_reaction_enabler`:**
   * Si el Carry es Pyro, solo los acompañantes que aportan Hydro o Cryo (o una saturación Mono Pyro con $\ge 3$ Pyro y Anemo VV) satisfacen la demanda.
   * No se computa la aplicación Pyro propia del Carry ni reacciones perjudiciales como Electro/Sobrecarga en melé.
2. **Filtro Estricto de Trituración de Resistencias (`need_resistance_shred`):**
   * Se descartaron debuffs de elementos ajenos al daño del Carry (ej. `debuff_cryo_res` de Chongyun o `debuff_anemo_res` de Jean ya no suman en Diluc).
   * Se reconocen únicamente debuffs universales (`need_resistance_shred`, `debuff_elemental_res`, `debuff_defense`) y el del elemento coincidente (`debuff_${element}_res`).
3. **Validación Elemental en Blueprints Meta ($S_{\text{blueprint}}$):**
   * El bono óptimo (+1,500 pts) y la asignación del arquetipo oficial exigen coincidencia estricta de elementos y tags.
   * Las variantes donde los elementos difieren (ej. doble Hydro con Mona) reciben puntaje de variante secundaria (+1,000 pts).
4. **Implementación de Micro-Afinidades Tácticas ($S_{\text{micro\_affinities}}$):**
   * **Batería Pyro de Bennett al Carry (+300 pts):** Partículas masivas alimentando la definitiva del Carry Pyro.
   * **Búfer de EM para amplificación (+300 pts):** Reconoce a Sucrose compartiendo Maestría en composiciones de Vaporizado o Derretido.
   * **Ataques Coordinados (+200 pts):** Sinergia entre Xingqiu y atacantes normales melé (Diluc, Razor, Keqing).
   * **Calibración de Sunfire (+300 pts):** Ajustado para no sobrepasar la utilidad ofensiva de maestría elemental cuando ya existe sustain en el equipo.

---

## 4. Comparativa de Puntuación (Antes vs Después)

### Caso: Diluc + Acompañantes en Inventario Base

| Composición | Score Anterior | Score Corregido | Arquetipo Inferido | Estado |
|---|:---:|:---:|---|---|
| **Diluc + Xingqiu + Bennett + Sucrose** | 7,400 pts | **7,700 pts** | **Vaporizados Clásico** | 🥇 **Top 1 Canónico** |
| **Diluc + Mona + Sucrose + Xingqiu** | 7,850 pts | **7,650 pts** | Vaporizados (Variante Doble Hydro) | 🥈 Top 2 |
| **Diluc + Bennett + Jean + Xingqiu** | 7,700 pts | **7,500 pts** | Vaporizados (Variante Sunfire) | 🥉 Top 3 (Top 1 al vetar a Sucrose) |
| **Diluc + Bennett + Jean + Xiangling** | 7,700 pts | **7,350 pts** | Mono Pyro Hipercarry | 4° Puesto |
| **Diluc + Beidou + Mona + Sucrose** | 8,100 pts | **6,000 pts** | Sinergia Desbalanceada | ❌ Relegado (-1,500 pts sin sustain) |

---

## 5. Verificación y Resultados de Tests

Ejecución de `bun test` en el paquete `server`:

```bash
$ bun test --coverage
bun test v1.4.2 (744846f84)

src/shared/affinity-engine/affinity-engine.test.ts:
✓ calcularSinergiaEquipo (Legacy) > suma la afinidad cuando hay match entre tags [0.13ms]
✓ calcularSinergiaEquipo (Legacy) > regresa 0 si no hay ningún match [0.05ms]
✓ calcularMatchPreset (Legacy) > calcula el porcentaje correcto [0.18ms]
✓ calcularMatchPreset (Legacy) > regresa 0 si el preset está vacío [0.02ms]
✓ sugerirSetPorArquetipo (Legacy) > encuentra el set correcto por tag de arquetipo [0.11ms]
✓ sugerirSetPorArquetipo (Legacy) > regresa null si no hay set para ese arquetipo [0.02ms]
✓ Motor de Matching v2.0 (Epic 3) > Diluc: Recomienda Vaporizados Clásico como Top 1 con Xingqiu, Bennett y Sucrose [54.21ms]
✓ Motor de Matching v2.0 (Epic 3) > Diluc: Blacklist de Sucrose reconfigura el Top 1 a variantes Derretidos / Sunfire / Mona [28.00ms]
✓ Motor de Matching v2.0 (Epic 3) > Ningguang: Recomienda Doble Geo Doble Pyro (Noelle, Bennett, Xiangling) [37.13ms]
✓ Motor de Matching v2.0 (Epic 3) > Razor: Anti-tags descartan estrictamente a Chongyun y Bennett C6 [21.64ms]
✓ Motor de Matching v2.0 (Epic 3) > Support Artifact Binder: Cascada táctica cuando Bennett y Mona compiten por Nobleza [0.24ms]

-----------------------------------------------|---------|---------|-------------------
File                                           | % Funcs | % Lines | Uncovered Line #s
-----------------------------------------------|---------|---------|-------------------
All files                                      |   98.61 |   98.44 |
 src/shared/affinity-engine/affinity-engine.ts |  100.00 |  100.00 | 
 src/shared/affinity-engine/artifact-binder.ts |  100.00 |  100.00 | 
 src/shared/affinity-engine/matcher.ts         |  100.00 |   98.56 | 27,60
 src/shared/affinity-engine/roster-data.ts     |  100.00 |  100.00 | 
 src/shared/affinity-engine/scoring.ts         |   91.67 |   92.07 | ...
 src/shared/affinity-engine/types.ts           |  100.00 |  100.00 | 
-----------------------------------------------|---------|---------|-------------------

 11 pass
 0 fail
 36 expect() calls
Ran 11 tests across 1 file. [179.00ms]
```
