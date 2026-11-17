# Diseño en Papel: Algoritmo de Matching y Scoring de Equipos (VGBuilder) v2.0

> **Documento:** `DISENO_EN_PAPEL_ALGORITMO_SCORING.md`  
> **Propósito:** Especificación lógica, matemática y simulación a mano ("lápiz y papel") del motor de recomendación antes de su codificación.  
> **Estado:** Prototipo 1 (v2.0) — Integración de Vías de Amplificación Flexibles (Reacciones vs Mono Elemental), Acumulación de Buffs con Rendimientos Decrecientes (Diminishing Returns) y Validación de Infusiones.

---

## 1. Principios de Diseño Corregidos (v2.0)

A partir del análisis técnico y jugable, incorporamos tres pilares fundamentales:

### 1.1 El Modelo de Dos Pilares para el Main DPS
Todo Carry busca maximizar su daño combinando dos fuentes:
1. **Pilar 1: Escalado Directo (Stats y Multiplicadores Universales):**
   * Incremento de ATK / HP / DEF según su escalado (`buff_attack`, etc.).
   * Reducción de Resistencias y Defensas enemigas (`debuff_resistance`, `debuff_defense`).
   * Aumento de Daño Elemental directo (`buff_[element]_dmg`, `buff_all_dmg`).
   * Resistencia a la interrupción / Aplomo (`interruption_resistance`).
   *(Estos stats benefician SIEMPRE al carry, independientemente de si hay reacciones o no).*
2. **Pilar 2: Vías de Amplificación Flexibles (Reacción OR Mono-Elemental):**
   * En lugar de forzar un solo elemento rígido (ej. fijar solo Hydro para Diluc), el algoritmo evalúa qué **Vía de Amplificación** está habilitada por el equipo:
     * **Vía A (Vaporizado):** Requiere `hydro_application`.
     * **Vía B (Derretido):** Requiere `cryo_application` (ej. Chongyun o Kaeya).
     * **Vía C (Mono Elemental Consistente):** Requiere $\ge 3$ personajes del mismo elemento (ej. 3 Pyro) + buffers de daño elemental masivo.  
       *Un equipo Mono Pyro (Diluc + Xiangling + Bennett + Kazuha/Xilonen) no depende de tiempos de aura ni ICD y puede igualar o superar a un equipo de reacciones gracias a la saturación de buffs directos.*

### 1.2 Acumulación de Buffs con Rendimientos Decrecientes (Diminishing Returns)
En el meta moderno (ej. combinar Kazuha con Xilonen o Bennett con set de Nobleza y Tenacidad), **los buffs similares se acumulan y hacen al equipo extremadamente fuerte**.  
Por tanto, **no se anulan los tags repetidos**, sino que se aplica una curva de rendimiento decreciente:
* **Multiplicadores Ofensivos (`buff_attack`, `debuff_resistance`, `buff_dmg`):**
  * 1er aporte: **100%** del valor base.
  * 2do aporte: **50%** del valor base.
  * 3er aporte: **25%** del valor base.
* **Mecánicas Utilitarias Únicas (`shield`, `healer`):**
  * 1er aporte: **100%** del valor base.
  * 2do aporte repetido: **15%** (aporta poco valor extra tener dos escudos en la rotación).

### 1.3 Validación Real de Infusiones y Anti-Tags
* **Diluc + Chongyun ES VIABLE (Melt Diluc de la 1.0):**  
  Diluc no depende de daño físico. Dentro del campo de Chongyun, sus básicos aplican Cryo y su habilidad elemental (Pyro) activa **Derretidos consistentes sobre sus propios golpes**. Además, al lanzar su Definitiva, su infusión Pyro tiene prioridad y no se anula. Por lo tanto, `cryo_infusion` **NO es un anti-tag para Diluc**.
* **¿Quiénes SÍ tienen Anti-Tags estrictos?**  
  * **Razor (Físico Puro):** `cryo_infusion` y `pyro_infusion` son destructivos porque no tiene infusión propia para salvar su daño blanco físico.
  * **Keqing (Electro Pura):** `cryo_infusion` y `pyro_infusion` sobrescriben su conversión Electro.

### 1.4 Módulo de Asignación y Bind de Artefactos de Soporte (11 Sets)
Para evitar cálculos irreales o duplicidad inválida de pasivas:
1. **Regla de Unicidad:** En un mismo equipo, **las pasivas de 4 piezas del mismo set NO se acumulan** (ej. no se pueden llevar dos sets de *Nobleza* ni dos de *Tenacidad* ni dos de *Instructor*).
2. **Compatibilidad Mecánica del Portador:**
   * *Sombra Verde Esmeralda (VV):* Exclusivo de Anemo (Sucrose, Jean, Venti).
   * *Tenacidad de la Geoarmada:* Exclusivo de habilidades elementales continuas desde fuera de campo (Fischl, Layla, Zhongli).
   * *Nobleza (4pc):* Portadores de definitivas de rotación ágil (Bennett, Kaeya, Xingqiu, Mona, Lisa).
   * *Instructor (4pc — Nuevo):* Provocadores de reacciones elementales en campo (+120 EM a todo el equipo).
   * *Son de Antaño:* Curadores masivos continuos (Qiqi, Barbara, Jean).
   * *Petra Arcaica:* Personajes Geo que generen y recojan cristales.
3. **Asignación Óptima en Cascada (Support Artifact Binder):**  
   Para cada trío de acompañantes evaluado, el motor asigna de forma unívoca el mejor set compatible a cada soporte para maximizar el puntaje global e inyectar el tag correspondiente **una sola vez**.
4. **Lógica de Cascada y Resolución de Conflictos (Fallback con Alerta):**
   * **Paso 1 (Prioridad Máxima):** Cada soporte busca su set óptimo de soporte universal no tomado.
   * **Paso 2 (Desvío Táctico):** Si su set ideal ya fue tomado por un compañero (ej. Bennett ya porta *Nobleza*), el segundo personaje busca un set alternativo que cubra otra necesidad del carry (ej. *Instructor* para +120 EM, o *Pergamino del Héroe* para bono elemental universal).
   * **Paso 3 (Alerta por Colisión de Portador):** Si un personaje no tiene ningún otro set de soporte compatible que aporte un buff nuevo al equipo (ej. Hu Tao con Xingqiu y Yelan compitiendo por *Nobleza*), el motor:
     * Asigna el set de soporte a uno de ellos.
     * Genera una **Alerta de Sugerencia para el Usuario**:  
       > *"Sugerencia de Equipamiento: Ambos personajes (ej. Xingqiu y Yelan) son candidatos al mismo set de soporte. Se recomienda designar a uno como portador del set de 4 piezas y equipar al otro con su set de daño personal (ej. Emblema del Destino). El usuario tiene la decisión final."*

---

## 2. La Función de Puntuación Matemática (v2.0)

La escala global opera de **0 a 10,000 puntos**:

$$\text{Score Total} = S_{\text{scaling\_buffs}} + S_{\text{amplification}} + S_{\text{blueprint}} + S_{\text{resonance}} + S_{\text{micro\_affinities}} - P_{\text{penalties}}$$

---

### Desglose de Términos:

#### 1. $S_{\text{scaling\_buffs}}$ — Stats y Multiplicadores con Rendimientos Decrecientes
Por cada tipo de buff $t$ que beneficia al Carry (`buff_attack`, `debuff_resistance`, `interruption_resistance`):

$$S_{\text{scaling\_buffs}} = \sum_{t} \text{Weight}(t) \times \left( 1 + 0.5 \times (k_t - 1) \right) \quad (\text{para } k_t \ge 1 \text{ fuentes activas})$$

* *Ejemplo con `buff_attack` (Peso base: 800 pts):*
  * Bennett solo: $800$ pts.
  * Bennett + Set de Nobleza (4pc): $800 + 400 = \mathbf{1,200\text{ pts}}$.
* *Ejemplo con `debuff_resistance` (Peso base: 800 pts):*
  * Sucrose con Sombra Verde (VV): $800$ pts.
  * Sucrose VV + Zhongli (-20% all RES) o Xilonen: $800 + 400 = \mathbf{1,200\text{ pts}}$.

---

#### 2. $S_{\text{amplification}}$ — Vía de Amplificación (Reacción OR Mono-Elemental)
El algoritmo evalúa qué vía de amplificación está presente y toma la de mayor puntuación:

$$S_{\text{amplification}} = \max(S_{\text{reaction\_vape}}, S_{\text{reaction\_melt}}, S_{\text{mono\_elemental}})$$

* **Vía Vaporizado (si hay Hydro activo):** **+1,000 pts** (+ buffs condicionales como Mona C1: +400 pts).
* **Vía Derretido (si hay Cryo activo):** **+1,000 pts**.
* **Vía Mono Elemental (si hay $\ge 3$ miembros del elemento del carry + buffer elemental):** **+950 pts**.  
  *(Casi idéntico a una reacción, premiando la consistencia y ausencia de problemas de recarga/aura).*

---

#### 3. $S_{\text{blueprint}}$ — Coherencia Táctica de Plantilla Meta
* **Blueprint Óptimo (ej. Doble Hydro, Mono Pyro Consolidado, Taser):** **+1,500 pts**.
* **Blueprint Secundario (ej. Vape con Escudo, Melt Melee):** **+1,000 pts**.
* **Composición Libre:** **0 pts**.

---

#### 4. $S_{\text{resonance}}$ — Resonancias Contextualizadas
* **2 Pyro (+25% ATK):** **+400 pts** si el Carry escala con ATK; **+50 pts** si no.
* **2 Hydro (+25% HP):** **+400 pts** si escala con HP (Hu Tao/Neuvillette).
* **2 Geo (+15% Dmg con Escudo):** **+400 pts** si hay shielder.
* **2 Cryo (+15% Crítico):** **+400 pts** en Permafrost/Mono Cryo; **0 pts** si hay Pyro que derrita el hielo.

---

#### 5. $S_{\text{micro\_affinities}}$ — Sinergias Secundarias entre Soportes
* Batería alimentando a personaje de recarga alta: **+300 pts**.
* Buffer de ATK alimentando a sub-dps con snapshot: **+200 pts**.

---

#### 6. $P_{\text{penalties}}$ — Poda y Penalizaciones
* **Anti-Tag Presente (ej. Razor con Chongyun o Bennett C6):** **Score = $-\infty$ (Descarte Inmediato)**.
* **Falta Total de Supervivencia si el carry es frágil (0 curas y 0 escudos):** **-1,000 pts**.

---

# 3. Simulación Manual en Papel (Caso Exhaustivo: Diluc)

Probemos a mano 5 combinaciones reales para **Diluc**:

---

### Caso A: Diluc + Xingqiu + Bennett + Sucrose (Vaporizado Clásico)
* **Stats Directos ($S_{\text{scaling\_buffs}}$):**
  * `need_attack_buff` (Bennett): **800 pts**
  * `need_resistance_shred` (Sucrose con VV): **800 pts**
  * `need_interruption_resistance` (Xingqiu): **700 pts**  
  * *Subtotal Stats:* **2,300 pts**
* **Vía de Amplificación ($S_{\text{amplification}}$):** Vaporizado habilitado por Xingqiu = **+1,000 pts**.
* **Blueprint ($S_{\text{blueprint}}$):** Vaporizado Clásico = **+1,500 pts**.
* **Resonancia ($S_{\text{resonance}}$):** 2 Pyro (+25% ATK útil para Diluc) = **+400 pts**.
* **Sinergias Secundarias ($S_{\text{micro\_affinities}}$):** Bennett batería + Sucrose comparte EM = **+300 pts**.
* **SCORE TOTAL CASO A:**  
  $$2,300 + 1,000 + 1,500 + 400 + 300 = \mathbf{5,500\text{ pts}}$$

---

### Caso B: Diluc + Xiangling + Bennett + Sucrose (Mono Pyro Consistente)
*Aquí NO hay reacciones de vaporizado ni derretido, pero hay acumulación masiva de stats Pyro:*
* **Stats Directos ($S_{\text{scaling\_buffs}}$ con Diminishing Returns):**
  * `need_attack_buff`: Bennett (800) + Chile de Guoba (50% de 800 = 400) = **1,200 pts**
  * `need_resistance_shred`: Sucrose con VV (800) + Guoba C1 baja -15% Pyro RES (50% de 800 = 400) = **1,200 pts**
  * `buff_pyro_dmg`: Xiangling C6 (+14% Pyro) = **600 pts**
  * `need_interruption_resistance`: 0 pts
  * *Subtotal Stats:* **3,000 pts** *(¡700 pts más que el equipo de reacción por acumulación de buffs!)*
* **Vía de Amplificación ($S_{\text{amplification}}$):** Vía Mono Elemental (3 Pyro + Sucrose VV) = **+950 pts**.
* **Blueprint ($S_{\text{blueprint}}$):** Mono Pyro Meta = **+1,500 pts**.
* **Resonancia ($S_{\text{resonance}}$):** 2+ Pyro = **+400 pts**.
* **Sinergias Secundarias ($S_{\text{micro\_affinities}}$):** Bennett alimenta la ulti de Xiangling (300) + Xiangling snapshot de Bennett (200) = **+500 pts**.
* **SCORE TOTAL CASO B:**  
  $$3,000 + 950 + 1,500 + 400 + 500 = \mathbf{6,350\text{ pts}}$$
*(¡Resultado realista!: El Mono Pyro con Bennett y Xiangling compite al más alto nivel por su daño bruto y batería infinita).*

---

### Caso C: Diluc + Chongyun + Bennett + Sucrose (Melt Diluc Clásico)
*Este equipo antes se descartaba erróneamente. Ahora es VÁLIDO:*
* **Stats Directos ($S_{\text{scaling\_buffs}}$):**
  * `need_attack_buff` (Bennett): **800 pts**
  * `need_resistance_shred` (Sucrose VV): **800 pts**
  * `cooldown_reduction` + `attack_speed` (Chongyun C2 y pasiva): **500 pts**
  * *Subtotal Stats:* **2,100 pts**
* **Vía de Amplificación ($S_{\text{amplification}}$):** Vía Derretido (Cryo continuo en básicos de Diluc) = **+1,000 pts**.
* **Blueprint ($S_{\text{blueprint}}$):** Melt Melee Clásico = **+1,000 pts**.
* **Resonancia ($S_{\text{resonance}}$):** 2 Pyro = **+400 pts**.
* **Sinergias Secundarias ($S_{\text{micro\_affinities}}$):** Chongyun derrite con Bennett = **+300 pts**.
* **SCORE TOTAL CASO C:**  
  $$2,100 + 1,000 + 1,000 + 400 + 300 = \mathbf{4,800\text{ pts}}$$
*(Es un equipo plenamente funcional, viable y divertido de jugar).*

---

### Caso D: Diluc + Xingqiu + Bennett + Noelle (Vaporizado Defensivo)
* **Stats Directos:**
  * `need_attack_buff` (Bennett): **800 pts**
  * `need_interruption_resistance` (Noelle escudo + Xingqiu): **700 pts**
  * `need_resistance_shred`: 0 pts
  * *Subtotal Stats:* **1,500 pts**
* **Vía de Amplificación:** Vaporizado = **+1,000 pts**.
* **Blueprint:** Vaporizado Seguro = **+1,000 pts**.
* **Resonancia:** 2 Pyro = **+400 pts**.
* **Sinergias Secundarias:** Bennett batería = **+200 pts**.
* **SCORE TOTAL CASO D:**  
  $$1,500 + 1,000 + 1,000 + 400 + 200 = \mathbf{4,100\text{ pts}}$$

---

### Caso E: Razor + Chongyun + Bennett + Noelle (Conflicto Destructivo de Infusión)
* **Fase 0 (Filtros):**  
  * Razor es Main DPS Físico puro.  
  * Chongyun aporta `cryo_infusion` (listado en `character_anti_tags` de Razor).  
* **SCORE TOTAL CASO E:**  
  $$\mathbf{-\infty\text{ (DESCARTADO)}}$$
  *(Aquí sí se aplica la poda rígida, porque Razor pierde todo su escalado físico al imbuirse en Cryo).*

---

## 4. Tabla Resumen Comparativa de la Simulación v2.0

| Puesto | Composición | Score | Arquetipo Inferido | Justificación del Algoritmo |
|---|---|---|---|---|
| 🥇 **Top 1** | **Diluc + Xiangling + Bennett + Sucrose** | **6,350 pts** | **Mono Pyro** | Acumulación masiva de buffs de ATK y bajada de Pyro RES (Diminishing Returns) + batería inagotable. |
| 🥈 **Top 2** | **Diluc + Xingqiu + Bennett + Sucrose** | **5,500 pts** | **Vaporizados** | El clásico óptimo: Vaporizados constantes, aplomo de Xingqiu y bono de Sombra Verde VV. |
| 🥉 **Top 3** | **Diluc + Chongyun + Bennett + Sucrose** | **4,800 pts** | **Derretidos (Melt)** | Totalmente viable: Derretidos sobre básicos con campo de Chongyun y reducción de CDs (C2). |
| 4° | **Diluc + Xingqiu + Bennett + Noelle** | **4,100 pts** | **Vape Seguro** | Cómodo con escudo, pero inferior en daño por carecer de reducción de resistencias Anemo VV. |
| ❌ **Eliminado** | **Razor + Chongyun + Bennett + Noelle** | **$-\infty$** | **Incompatible** | Poda estricta por Anti-Tag: Chongyun destruye el daño físico de Razor. |
