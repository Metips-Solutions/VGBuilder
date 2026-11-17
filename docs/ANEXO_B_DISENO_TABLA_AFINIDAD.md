# Anexo B. Diseño de la Tabla de Afinidad y Motor de Scoring

**Propósito:** El propósito de este módulo es la definición e imposición de reglas deterministas para el proceso de emparejamiento (*match*) que ejecuta el motor de recomendación al momento de estructurar la composición de un equipo a partir de las necesidades del personaje ancla.

---

### B.1 – Principios de funcionamiento del sistema

La tabla de afinidad opera mediante un conjunto de condicionales lógicas que asignan una puntuación plana al identificar una relación sinérgica ventajosa entre dos o más etiquetas (*tags*). 

Tómese como caso de estudio la categoría de personajes de elemento Pyro: en su arquitectura conceptual, estos requieren unidades que faciliten la activación de reacciones elementales multiplicativas (Vaporizado o Derretido), demandando la presencia de un aplicador de elemento Hydro o Cryo. Esta relación se implementa asignando un valor ponderado a la combinación según su jerarquía de eficacia en el juego; por ejemplo, las reacciones elementales principales reciben ponderaciones diferenciadas reflejando su impacto real en el rendimiento del equipo (como la graduación de prioridad entre Vaporizado, Derretido y Sobrecarga).

---

### B.2 – Extracción de necesidades del personaje ancla

Durante la investigación inicial del sistema de puntuación (*scoring*), se identificó un problema fundamental: personajes clasificados bajo el mismo rol de *Main DPS* presentan requerimientos estructurales marcadamente divergentes. 

Al analizar los casos de Noelle y Ningguang —ambas unidades *Main DPS* del elemento Geo—, se observa que Noelle constituye un perfil autosuficiente al poseer capacidades nativas de mitigación y curación; en contraste, Ningguang requiere soporte externo de escudos y sanación. Asimismo, Noelle incrementa su desempeño con bonificaciones de Defensa, mientras que Ningguang escala a partir del parámetro de Ataque. Esta especialización se acentúa en versiones avanzadas del metajuego, donde las unidades requieren duplas altamente específicas. En consecuencia, el sistema implementa una lógica no restrictiva pero ponderada, que incrementa sustancialmente el puntaje ante sinergias óptimas o aplica penalizaciones en caso de incompatibilidad.

Un caso representativo corresponde a las unidades orientadas a daño físico, las cuales buscan maximizar el daño no elemental. Dichos personajes se benefician directamente de soportes que reduzcan las resistencias físicas enemigas; no obstante, el algoritmo penaliza severamente aquellas combinaciones con unidades que imbuyan los ataques normales con infusión elemental, anulando el perfil de daño principal.

---

### B.3 – Implementación en código

Para la materialización técnica de este módulo, el motor de afinidad se implementó en TypeScript puro dentro del directorio [`server/src/shared/affinity-engine/`](file:///home/tyreans/metips/vgbuilder/server/src/shared/affinity-engine/). Esta arquitectura garantiza una ejecución isomorfa y ligera, capaz de procesar combinaciones tanto en el entorno de pruebas de Node/Bun como en el cliente web sin acoplamiento a frameworks de interfaz ni controladores de base de datos.

El algoritmo abandona la matriz estática $O(N^2)$ bidimensional en favor de una **función de puntuación matemática multicapa (v2.0)** definida formalmente como:

$$\text{Total Score} = S_{\text{scaling\_buffs}} + S_{\text{amplification}} + S_{\text{blueprint}} + S_{\text{resonance}} + S_{\text{micro\_affinities}} - P_{\text{penalties}}$$

La ejecución de este modelo se organiza en cuatro etapas secuenciales dentro del código:

#### 1. Tipado declarativo de necesidades y restricciones duras
En [`types.ts`](file:///home/tyreans/metips/vgbuilder/server/src/shared/affinity-engine/types.ts), cada personaje se modela incluyendo un vector de demandas obligatorias (`needs`) ponderadas en una escala de 1 a 10, junto con una lista de etiquetas de conflicto mecánico (`antiTags`):

```typescript
export type CharacterNeed = {
  value: string;
  priority: number; // 1 (deseable) a 10 (indispensable para la viabilidad del carry)
};

export type CharacterAntiTag = {
  value: string;
  reason?: string | null; // Justificación táctica de la incompatibilidad
};
```

#### 2. Satisfacción de necesidades con rendimientos decrecientes ($S_{\text{scaling\_buffs}}$)
En [`scoring.ts`](file:///home/tyreans/metips/vgbuilder/server/src/shared/affinity-engine/scoring.ts#L64-L241), el motor evalúa las demandas del carry calculando el valor base ($\text{priority} \times 100$). Para reflejar fielmente las mecánicas del juego —donde acumular un mismo beneficio aporta rendimientos decrecientes y no beneficios infinitos—, se aplica una curva de saturación de tres factores ($100\%$ para la 1.ª fuente, $50\%$ para la 2.ª y $25\%$ para la 3.ª o subsecuentes):

```typescript
for (const need of carryNeeds) {
  const baseValue = need.priority * 100;
  let matchSources = 0;

  // Identificación de fuentes válidas (ej. habilitadores elementales para Pyro)
  if (need.value === "need_reaction_enabler" && targetCarry.element === "Pyro") {
    const hydroSources = companions.filter((c) =>
      c.character.mechanics.some((m) => m.value === "hydro_application")
    ).length;
    const cryoSources = companions.filter((c) =>
      c.character.mechanics.some((m) => m.value === "cryo_application")
    ).length;

    if (hydroSources > 0) matchSources += hydroSources;
    else if (cryoSources > 0) matchSources += cryoSources;
  }
  // ... evaluación de necesidades adicionales (escudo, aplomo, shred elemental)

  // Aplicación de curva de rendimientos decrecientes (100%, 50%, 25%)
  let needScore = 0;
  for (let k = 1; k <= matchSources; k++) {
    if (k === 1) needScore += baseValue * 1.0;
    else if (k === 2) needScore += baseValue * 0.5;
    else needScore += baseValue * 0.25;
  }
  sScalingBuffs += Math.round(needScore);
}
```

#### 3. Evaluación dinámica de vías de amplificación ($S_{\text{amplification}}$)
El algoritmo no impone una vía única arbitraria, sino que evalúa de forma concurrente los multiplicadores elementales disponibles (Vaporizado, Derretido o Mono Elemental), bonificando la cadencia y consistencia de los acompañantes:

```typescript
if (targetCarry.element === "Pyro") {
  let vapeScore = 0;
  let meltScore = 0;

  if (hasHydro) {
    vapeScore = 1000;
    // Bonificación por aplicación coordinada continua en cada golpe (Xingqiu / Yelan)
    if (hasHydroCoordinated) vapeScore += 350;
    else if (allActiveTags.has("off_field_hydro_dmg")) vapeScore += 150;
  }

  if (hasCryo) {
    meltScore = 900;
    // Bonificación por aura orbital a corta distancia (Kaeya / Rosaria)
    if (companions.some((c) => c.character.name === "Kaeya" || c.character.name === "Rosaria")) {
      meltScore += 100;
    }
  }

  // Selección de la vía dominante
  sAmplification = Math.max(vapeScore, meltScore, monoPyroScore);
}
```

#### 4. Poda estricta y penalizaciones estructurales ($P_{\text{penalties}}$)
Para resguardar la coherencia del equipo sin comprometer el tiempo de respuesta, el sistema articula dos niveles de control:
* **Poda dura en fase de generación ([`matcher.ts`](file:///home/tyreans/metips/vgbuilder/server/src/shared/affinity-engine/matcher.ts)):** Si alguna unidad candidata posee un atributo catalogado en los `antiTags` del ancla (como la infusión Cryo de Chongyun sobre el daño blanco de Razor o Eula), la combinación se descarta de inmediato con puntaje $-\infty$, evitando cálculos innecesarios.
* **Penalizaciones graduales en puntuación ([`scoring.ts`](file:///home/tyreans/metips/vgbuilder/server/src/shared/affinity-engine/scoring.ts#L881)):** Se sustraen puntos ante configuraciones tácticamente deficientes:
  * **Cero supervivencia:** $-1,500\text{ pts}$ ante la ausencia absoluta de curadores o escudos.
  * **Sobrecarga melee:** $-600\text{ pts}$ en unidades cuerpo a cuerpo por dispersión de objetivos.
  * **Curación continua sobre Hu Tao:** $-250\text{ pts}$ con personajes que eleven su vida por encima del umbral del $50\%$ anulando su pasiva A4 (dejando a Xingqiu explícitamente exento de sanción debido a su curación pasiva diferida).

---

### B.4 – Conclusión

El diseño de la tabla de afinidades evolucionó hacia una arquitectura rigurosa orientada a etiquetas específicas, permitiendo generar composiciones alineadas con los estándares competitivos del juego. Esta estructura facilita la parametrización dinámica y el ajuste de las reglas de compatibilidad entre personajes a partir de sus atributos mecánicos.

La consolidación de este módulo aportó resultados concluyentes en el desempeño del recomendador:
1. **Diferenciación efectiva intra-rol:** Unidades con la misma etiqueta genérica de *Main DPS* (como Razor frente a Diluc, o Hu Tao frente a Yoimiya) reciben sugerencias personalizadas acordes a su tipo de daño nativo y requerimientos de soporte.
2. **Respaldo empírico y estabilidad:** El comportamiento del motor se validó mediante una suite de **47 pruebas unitarias automatizadas** con un índice de aprobación del $100\%$ (240 aserciones ejecutadas en $\approx 9.8\text{ s}$), garantizando la correcta evaluación de 52 personajes y 26 plantillas a través de cuatro expansiones sucesivas del metajuego.
3. **Resiliencia ante inventarios reducidos:** Ante la ausencia o exclusión voluntaria de soportes óptimos de primer nivel (Tier S), el algoritmo redirige suavemente la recomendación hacia alternativas funcionales viables (transicionando de Vaporizado hacia Derretido u opciones Mono Elementales) sin degradar la experiencia de recomendación.

Como trabajo futuro, se contempla la vinculación interactiva entre la inyección de artefactos de soporte y la modulación en tiempo real de los pesos de las necesidades del personaje ancla, refinando aún más la precisión del emparejamiento.
