# Poblado Ronda 2: Taxonomía y Calibración KQM (11 Nuevos Personajes)

> **Documento:** `POBLADO_RONDA_2.md`  
> **Fecha:** 25 de Octubre de 2026  
> **Proyecto:** VGBuilder — Motor de Afinidad de Equipos (Epic 1 & Epic 3)  
> **Fuente de Verdad:** KeqingMains (KQM) Standard Guides, Constellation Breakdowns & Theorycrafting  
> **Personajes Evaluados (11):** Diona, Tartaglia, Xinyan, Zhongli, Albedo, Ganyu, Xiao, Hu Tao, Rosaria, Yanfei y Eula.

---

## 1. Resumen de Criterios y Lineamientos de Diseño

Siguiendo las decisiones arquitectónicas del motor de VGBuilder (`BITACORA_INVESTIGACION_MOTOR_MATCHING.md`, `CAMBIOS_NEEDS_Y_BINDS_ARTEFACTOS_KQM.md` y `DISENO_EN_PAPEL_ALGORITMO_SCORING.md`), cada personaje se descompone en 4 dimensiones desacopladas:

1. **Roles Oficiales KQM:**  
   - `Main DPS`: Carries de campo con alta demanda de tiempo activo (*field time*). Solo elegibles como objetivo de matching (a menos que una constelación alta desbloquee utilidad de soporte, como Klee $C_2$ o Yanfei $C_4$).
   - `Sub-DPS`: Fuentes de daño fuera de campo (*off-field*) o atacantes de ráfaga rápida (*quickswap*).
   - `Support`: Búfers de atributos, debúfers de resistencia/defensa, agrupadores o baterías.
   - `Healer`: Sanadores directos de vida.

2. **Offers (Mecánicas Colectivas que Aporta al Equipo):**  
   - **Regla de Oro:** Solo se registran aportes que benefician a los aliados o habilitan reacciones al equipo. Los auto-buffs egocéntricos (como la infusión propia de Hu Tao o las acumulaciones personales de Eula) residen en el perfil de daño (`damageProfile`) y no en los tags colectivos.

3. **Needs (Demandas Funcionales del Carry con Prioridad 1 a 10):**  
   - Si el personaje actúa como `Main DPS`, define qué mecánicas exige de sus 3 acompañantes:
     - `need_reaction_enabler`: Aplicadores elementales para amplificación (Vape/Melt) o catalización/superconductor.
     - `need_resistance_shred`: Reducción de resistencias elementales o físicas (VV, Zhongli, etc.).
     - `need_attack_buff`: Búfers de ATK plano o porcentual (Bennett, Nobleza, Tenacidad, TTDS).
     - `need_shield` / `need_interruption_resistance`: Protección contra interrupciones o mitigación de daño.
     - `need_battery_[element]`: Alimentación de partículas para definitivas costosas ($Q \ge 70$ o $80$).
     - `need_physical_shred`: Superconductor o trituración de defensa para carrys físicos.
     - `need_geo_partner`: Pareja Geo para activar Resonancia Geo (+15% DMG protegido por escudo, -20% RES Geo).

4. **Incompatibilidades Duras (`antiTags`):**  
   - Mecánicas externas que sobrescriben o destruyen el perfil de daño del carry (ej. la infusión Cryo de Chongyun o la infusión Pyro de Bennett $C_6$ en atacantes físicos puros como Eula o Xinyan).

5. **Compatibilidad con los 11 Sets de Soporte Universales:**  
   - Asignación basada en la capacidad mecánica del kit de activar la pasiva de 4 piezas sin depender de substats perfectos.

---

## 2. Fichas Detalladas de los 11 Personajes (KQM Standard)

---

### 1. Diona
* **Rareza:** 4★ | **Elemento:** Cryo | **Arma:** Arco | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `Support`, `Healer`
* **Damage Profile:** Cryo Utility / Shielder-Healer
* **Offers (Aportes Colectivos al Equipo):**
  - `shield`: Zarpa helada (E) genera un escudo Cryo con 250% de eficacia contra daño Cryo (alta absorción y resistencia a la interrupción).
  - `healer`: Campo de cóctel embriagador (Q) regenera vida sostenida al personaje en campo cada 2s.
  - `cryo_application`: Impacto de garras en E y pulsos Cryo de área en Q.
  - `battery`: Con E cargada genera de 3 a 4 partículas Cryo fijas. Equipada con *Arco del Sacrificio*, es la mejor batería Cryo F2P del juego base para carrys con definitivas costosas (Ganyu, Eula, Ayaka).
  - `cleanse`: Aplica Cryo brevemente al personaje activo al invocar el escudo, limpiando auras Electro y Hydro perjudiciales.
  - `buff_movement_speed`: Pasiva A1 otorga +10% de velocidad de movimiento y -10% de coste de aguante al personaje escudado.
  - `debuff_attack`: Pasiva A4 reduce el ATK de los enemigos dentro de Q en un -10% durante 15s.
  - `buff_elemental_mastery` ($C_6$): Si la vida del personaje en campo es $> 50\%$ dentro del área de Q, otorga **+200 de Maestría Elemental** fija (búfer masivo para derretidos y vaporizados).
  - `buff_shield_strength` ($C_2$): Aumenta la absorción del escudo un +15% y en multijugador escuda a aliados.
* **Needs:** Ninguna (Soporte / Curadora pura).
* **Anti-Tags:** Ninguna.
* **Sets de Soporte KQM:**
  - *Ritual Antiguo de la Nobleza* (Prioridad: **9** — rotación ágil de Q).
  - *Instructor* (Prioridad: **8** — +120 EM al provocar reacción Cryo).
  - *Son de Antaño* (Prioridad: **8** — convierte curación continua en daño plano).
  - *Tenacidad de la Geoarmada* (Prioridad: **5** — zarpas impactan una sola vez, pero el +30% de fuerza de escudo es aprovechable).

---

### 2. Tartaglia (Childe)
* **Rareza:** 5★ | **Elemento:** Hydro | **Arma:** Arco | **Región:** Snezhnaya / Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS` (On-field Hydro Enabler / Burst Nuke)
* **Damage Profile:** Hydro Fast Melee / Riptide AoE
* **Offers (Aportes Colectivos al Equipo):**
  - `hydro_application`: La mayor cadencia de aplicación Hydro en área del juego mediante las marcas de Obstrucción de Flujo (*Riptide*), que no tienen enfriamiento interno (ICD) al golpear grupos.
  - `buff_normal_attack_level`: Pasiva de Talento (*Maestría de armas*) **aumenta en +1 nivel el talento de Ataque Normal de todos los miembros del equipo**.
  - `interruption_power`: Las explosiones de Riptide desestabilizan y tumban a enemigos ligeros y medianos.
  - `coordinated_attacks` ($C_4$): Provoca destellos de Riptide automáticos fuera de campo cada 4s sobre enemigos marcados.
* **Demandas del Carry (`needs`):**
  - `need_offfield_pyro_dmg` / `need_reaction_enabler` (Prioridad: **10**): Habilita al Pyronado de Xiangling a vaporizar en reversa el 100% de sus giros. Requiere una fuente constante de Pyro fuera de campo.
  - `need_attack_buff` / `need_battery_pyro` (Prioridad: **10**): Bennett es indispensable en composiciones internacionales (búfer de ATK base para compensar la falta de buffs propios y batería para recargar el Pyronado de Xiangling).
  - `need_resistance_shred` (Prioridad: **9**): Reducción de resistencias Anemo VV (Kazuha o Sucrose) mediante doble torbellino (Hydro + Pyro).
  - `need_interruption_resistance` / `need_shield` (Prioridad: **7**): En postura cuerpo a cuerpo, ser interrumpido corta el flujo de ataques y castiga severamente el enfriamiento de su habilidad elemental.
* **Anti-Tags:**
  - En postura cuerpo a cuerpo sus golpes se transforman en daño Hydro absoluto inmune a ser sobrescrito por Chongyun o Bennett $C_6$.
* **Sets de Soporte KQM:**
  - N/A (Main DPS de impacto propio).

---

### 3. Xinyan
* **Rareza:** 4★ | **Elemento:** Pyro | **Arma:** Mandoble | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Support`, `Sub-DPS`, `Main DPS` ($C_6$ Torbellino Físico)
* **Damage Profile:** Physical Melee / Pyro Shield
* **Offers (Aportes Colectivos al Equipo):**
  - `shield`: Habilidad elemental genera un escudo Pyro cuya fuerza escala con su DEF.
  - `pyro_application`: El escudo de Nivel 3 pulsa daño Pyro en área continuo.
  - `buff_physical_dmg`: Pasiva A4 otorga **+15% de Daño Físico** a cualquier personaje protegido por su escudo.
  - `debuff_physical_res` ($C_4$): El barrido de su habilidad elemental **reduce la Resistencia Física de los enemigos en un -15%** durante 12s.
  - `cleanse`: Auto-aplica Pyro en el instante de lanzar el escudo, limpiando congelamiento o auras elementales adversas.
* **Demandas del Carry (Si se juega como Main DPS Físico):**
  - `need_physical_shred` (Prioridad: **10**): Requiere Superconductor (Electro + Cryo) para triturar la resistencia física enemiga (-40% RES).
  - `need_attack_buff` (Prioridad: **8**): Bennett o buffers de ATK.
  - `need_interruption_resistance` (Prioridad: **7**).
* **Anti-Tags (Si se juega como Main DPS Físico):**
  - `cryo_infusion` (Chongyun convierte sus golpes físicos en Cryo, destruyendo su daño).
  - `pyro_infusion` (Bennett $C_6$ convierte sus ataques normales y cargados en Pyro, invalidando sus cálices y bonos de daño físico).
* **Sets de Soporte KQM:**
  - *Tenacidad de la Geoarmada* (Prioridad: **8** — los pulsos del escudo Nivel 3 activan y mantienen la pasiva de 4 piezas fuera de campo).
  - *Ritual Antiguo de la Nobleza* (Prioridad: **8** — definitiva de bajo coste y daño de ráfaga físico garantizado con $C_2$).
  - *Instructor* (Prioridad: **7**).

---

### 4. Zhongli
* **Rareza:** 5★ | **Elemento:** Geo | **Arma:** Lanza | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Support` (El Escudo y Debuffer Universal por Excelencia)
* **Damage Profile:** Geo Tank / Universal Shield
* **Offers (Aportes Colectivos al Equipo):**
  - `shield`: El escudo de absorción más poderoso y con mejor uptime del juego (20s de duración frente a 12s de enfriamiento, escala con Vida Máx y absorbe 150% de daño universal).
  - `interruption_resistance`: Inmunidad total a la interrupción mientras el escudo esté activo.
  - `debuff_all_res` / `need_resistance_shred`: El Escudo de Jade **reduce en un -20% la Resistencia Elemental de todos los elementos y la Resistencia Física de todos los enemigos cercanos** en área sin necesidad de torbellinos ni setups.
  - `crowd_control`: Su Habilidad Definitiva petrifica a todos los enemigos de la zona durante 3.1 a 4.0s.
  - `geo_construct`: Su pilar de piedra es una construcción Geo que pulsa daño continuo y resuena con otras construcciones (Ningguang, Albedo).
  - `geo_application`: Cristalización continua mediante pulsos del pilar.
  - `buff_shield_strength`: Pasiva A1 aumenta la protección del escudo hasta en un +25% acumulativo al recibir impactos.
  - `healer` ($C_6$): El escudo absorbe daño y regenera vida al personaje activo equivalente al 40% del daño recibido (hasta 8% de la Vida Máx).
* **Needs:** Ninguna (Soporte universal sin dependencias).
* **Anti-Tags:** Ninguna.
* **Sets de Soporte KQM:**
  - *Petra Arcaica* (Prioridad: **10** — BiS ofensivo; al recoger el cristal elemental con Zhongli, otorga **+35% de Bono de Daño Elemental** al equipo durante 10s, superando con creces a Tenacidad en carrys que no escalan con ATK como Hu Tao o Neuvillette).
  - *Tenacidad de la Geoarmada* (Prioridad: **9** — los pulsos del pilar mantienen activo el +20% ATK y +30% de fuerza de escudo continuamente).
  - *Ritual Antiguo de la Nobleza* (Prioridad: **8** — Definitiva de bajo coste: 40 pts).
  - *Instructor* (Prioridad: **8** — +120 EM tras cristalizar en campo).
  - *Pergamino del Héroe* (Prioridad: **7**).

---

### 5. Albedo
* **Rareza:** 5★ | **Elemento:** Geo | **Arma:** Espada Ligera | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `Sub-DPS`, `Support`
* **Damage Profile:** Geo Off-Field AoE (Aura Solar escala con DEF)
* **Offers (Aportes Colectivos al Equipo):**
  - `off_field_geo_dmg`: Su Aura Solar (E) inflige daño Geo en área cada 2s cuando los enemigos reciben daño, funcionando 100% fuera de campo (30s de duración).
  - `geo_application`: Cristalizaciones continuas de apoyo.
  - `geo_construct`: El Aura Solar es una construcción Geo que resuena con el pilar de Zhongli.
  - `battery`: Genera partículas Geo de forma continua con los impactos de sus flores fugaces (67% de probabilidad por golpe).
  - `buff_elemental_mastery`: Pasiva A4 otorga **+125 de Maestría Elemental a todo el equipo** durante 10s tras lanzar su Definitiva (clave en equipos de Hu Tao Doble Geo o equipos de reacciones).
  - `buff_plunge_dmg` ($C_4$): Los personajes en campo dentro de su área infligen **+30% de daño de Ataque Descendente** (sinergia directa con Xiao).
  - `buff_all_dmg` ($C_6$): Personajes dentro del área protegidos por un escudo de Cristalización obtienen **+17% de Bono de Daño general**.
* **Needs:** Ninguna (Sub-DPS / Buffer off-field).
* **Anti-Tags:** Ninguna.
* **Sets de Soporte KQM:**
  - *Tenacidad de la Geoarmada* (Prioridad: **9** — impactos de flor cada 2s mantienen la pasiva permanentemente).
  - *Petra Arcaica* (Prioridad: **9** — genera y recoge cristales con facilidad).
  - *Pergamino del Héroe* (Prioridad: **8**).
  - *Ritual Antiguo de la Nobleza* (Prioridad: **7**).

---

### 6. Ganyu
* **Rareza:** 5★ | **Elemento:** Cryo | **Arma:** Arco | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS` (Disparo Cargado Flor de Escarcha), `Sub-DPS` / `Support` (Lluvia Celestial)
* **Damage Profile:** Cryo Charged Shot Ranged / Cryo Burst AoE
* **Offers (Aportes Colectivos al Equipo):**
  - `off_field_cryo_dmg`: Su Definitiva (Q) crea un radio colosal donde caen carámbanos continuos durante 15s (100% de uptime con 15s de CD).
  - `cryo_application`: Aplicación Cryo masiva y cuadrática sobre grupos de enemigos (piedra angular de arquetipos Freeze tipo Morgana y habilitadora off-field).
  - `buff_cryo_dmg`: Pasiva A4 otorga un **+20% de Bono de Daño Cryo a todos los personajes activos** dentro del radio de su Definitiva.
  - `taunt`: Su flor de loto (E) atrae la atención y ataques de los enemigos y genera partículas Cryo.
  - `debuff_cryo_res` ($C_1$): Las flechas cargadas reducen la Resistencia Cryo enemiga en un -15% durante 6s.
* **Demandas del Carry (`needs` si actúa como Main DPS):**
  - *Variante Derretidos (Melt Ganyu):*
    - `need_shield` / `need_interruption_resistance` (Prioridad: **10**): Cargar una flecha toma ~2s en primera persona; cualquier roce cancela el disparo. Zhongli o Diona son vitales.
    - `need_reaction_enabler` / `need_pyro_app` (Prioridad: **10**): Aplicadores continuos de Pyro (Xiangling + Bennett o Sunfire Jean).
    - `need_attack_buff` (Prioridad: **8**): Bennett Q y resonancia Pyro.
  - *Variante Congelados (Morgana Freeze):*
    - `need_reaction_enabler` / `need_hydro_app` (Prioridad: **10**): Mona o Barbara para congelar continuamente.
    - `need_crowd_control` (Prioridad: **10**): Venti o Sucrose para juntar a los enemigos y detonar el daño cuadrático de los carámbanos.
* **Anti-Tags:** Ninguna (Usuaria de arco inmune a infusiones cuerpo a cuerpo).
* **Sets de Soporte KQM (si actúa como Sub-DPS / Support):**
  - *Ritual Antiguo de la Nobleza* (Prioridad: **9** — Definitiva con 100% de uptime).
  - *Pergamino del Héroe* (Prioridad: **7**).
  - *Instructor* (Prioridad: **7**).

---

### 7. Xiao
* **Rareza:** 5★ | **Elemento:** Anemo | **Arma:** Lanza | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS` (Hipercarry de Daño Descendente en Área)
* **Damage Profile:** Anemo Melee Plunge AoE
* **Offers (Aportes Colectivos al Equipo):**
  - `anemo_application`: Ráfagas Anemo constantes durante sus saltos.
  - `interruption_power`: Impactos descendentes pesados que interrumpen y derriban armaduras y enemigos grandes.
* **Demandas del Carry (`needs`):**
  - `need_battery_anemo` / `need_battery` (Prioridad: **10**): Su Definitiva cuesta 70 puntos de energía y durante su transformación **Xiao no genera partículas elementales con su E**. Requiere obligatoriamente una batería Anemo: Sucrose (con Sacrificio), Jean o Venti.
  - `need_sustain` / `need_shield` (Prioridad: **10**): Su Definitiva drena su propia vida continuamente (2-3% por segundo) y sus saltos lo dejan expuesto a proyectiles en el aire. Exige sanadores continuos de alto volumen (Bennett, Jean) o escudos irrompibles (Zhongli).
  - `need_resistance_shred` (Prioridad: **9**): La resistencia Anemo enemiga casi no se puede bajar con Sombra Verde (VV no baja Anemo); requiere fuentes directas como el escudo de Zhongli (-20% all RES), Jean $C_4$ (-40% Anemo RES) o Venti $C_2/C_6$.
  - `need_attack_buff` (Prioridad: **8**): Bennett, Nobleza y Tenacidad.
* **Anti-Tags:**
  - Su infusión Anemo durante la Definitiva es **absoluta e inamovible** (inmune a Chongyun y Bennett $C_6$).
* **Sets de Soporte KQM:**
  - N/A (Main DPS de daño personal).

---

### 8. Hu Tao
* **Rareza:** 5★ | **Elemento:** Pyro | **Arma:** Lanza | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS` (Hipercarry de Daño Monotarget y Vaporizados de Élite)
* **Damage Profile:** Pyro Melee Fast (Ataques Cargados fluidos)
* **Offers (Aportes Colectivos al Equipo):**
  - `buff_crit_rate`: Pasiva A1 (*Aleteo sutil*) otorga **+12% de Probabilidad de Crítico a todos los aliados** (excepto a sí misma) durante 8s cuando finaliza su habilidad elemental.
  - `pyro_application`: Marcas de pétalos sangrientos y ataques normales/cargados imbuidos en Pyro.
* **Demandas del Carry (`needs`):**
  - `need_reaction_enabler` / `need_hydro_app` (Prioridad: **10**): Exige aplicación Hydro constante y sin desfase; sus ataques cargados no tienen ICD y requieren que el enemigo tenga siempre aura Hydro para vaporizar en cada envite. Xingqiu es su socio mandatorio (o Doble Hydro: Xingqiu + Mona/Yelan).
  - `need_shield` / `need_interruption_resistance` (Prioridad: **10**): Juega por debajo del 50% de Vida para obtener +33% de Daño Pyro (Pasiva A4) y pasiva de Báculo de Homa. Un escudo robusto (Zhongli, Diona, Noelle) evita su muerte súbita y cancelaciones de embestida.
  - `need_resistance_shred` (Prioridad: **9**): Reducción de resistencias Pyro o universal (Zhongli -20% RES, o torbellino VV mediante un habilitador Pyro como Amber o Yanfei $C_4$).
  - `need_geo_partner` (Prioridad: **8**): En el arquetipo clásico *Doble Geo Doble Hydro* (Hu Tao + Xingqiu + Zhongli + Albedo).
* **Anti-Tags:**
  - Su infusión Pyro en E es absoluta e inamovible.
  - *Calibración de Curación (Soft Penalty -250 pts):* En equipos pre-Furina, Hu Tao prefiere jugar a $< 50\%$ HP para activar su Pasiva A4 (+33% Bono Pyro) y pasiva de Báculo de Homa. En lugar de una exclusión destructiva (-999 pts), el motor aplica una **penalización ligera (-250 pts) a curadores continuos masivos**, permitiendo que sanadores flexibles o composiciones futuras con **Furina** (donde la curación grupal es obligatoria para acumular *Algarabía*) sigan siendo viables y altamente competitivas.
* **Sets de Soporte KQM:**
  - N/A (Main DPS de impacto propio).

---

### 9. Rosaria
* **Rareza:** 4★ | **Elemento:** Cryo | **Arma:** Lanza | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `Sub-DPS`, `Support` (Búfer de Crítico y Trituradora Física)
* **Damage Profile:** Cryo Burst AoE / Physical Buffer
* **Offers (Aportes Colectivos al Equipo):**
  - `off_field_cryo_dmg`: Su Definitiva clava una lanza de hielo que pulsa daño Cryo en área cada 2s durante 8s (12s con $C_2$).
  - `cryo_application`: Pulsos Cryo rápidos sin ICD que habilitan Derretidos en reversa o Congelamiento continuo.
  - `buff_crit_rate`: Pasiva A4 (*Búsqueda en la sombra*) comparte **hasta un +15% de Probabilidad de Crítico a todos los aliados** durante 10s tras lanzar su Definitiva (basado en el Crítico propio de Rosaria).
  - `debuff_physical_res` ($C_6$): Su Definitiva **reduce la Resistencia Física de los enemigos en un -20%** durante 10s (soporte insustituible para carrys físicos como Eula y Razor).
  - `battery`: Su E genera 3 partículas Cryo con solo 6s de enfriamiento (batería de primer nivel para Eula o Ganyu).
  - `buff_movement_speed`: Pasiva nocturna otorga +10% de velocidad de movimiento al equipo de noche.
* **Demandas del Carry (Si se jugara como Carry Físico):**
  - `need_physical_shred` (Superconductor con Electro).
* **Anti-Tags (Si se juega como Carry Físico):**
  - `cryo_infusion` y `pyro_infusion`. (Como Sub-DPS/Support off-field es inmune).
* **Sets de Soporte KQM:**
  - *Ritual Antiguo de la Nobleza* (Prioridad: **10** — la duración de su Definitiva a $C_2$ empareja perfectamente con los 12s de Nobleza).
  - *Instructor* (Prioridad: **8** — +120 EM al activar reacciones).
  - *Corazón Forjado* (Prioridad: **7**).
  - *Pergamino del Héroe* (Prioridad: **7**).

---

### 10. Yanfei
* **Rareza:** 4★ | **Elemento:** Pyro | **Arma:** Catalizador | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS` (Ataque Cargado de Sellos Escarlatas), `Support` ($C_4$ "Tankfei")
* **Damage Profile:** Pyro Ranged AoE / Pyro Shielder ($C_4$)
* **Offers (Aportes Colectivos al Equipo):**
  - `pyro_application`: Proyectiles Pyro teledirigidos a larga distancia.
  - `catalyst_buffer`: Puede equipar *Cuento de Cazadores de Dragones* (+48% ATK al Carry entrante) o *Prototipo Ámbar* (para curar al equipo al tirar Q).
  - `shield` ($C_4$ — Arquetipo célebre KQM *"Tankfei"*): Lanzar su Definitiva genera un escudo masivo equivalente al **45% de la Vida Máx de Yanfei** durante 15s. (Permite usar a Yanfei como escudera Pyro para habilitar torbellinos VV en equipos de Hu Tao o proteger a Xiao y Ganyu).
* **Demandas del Carry (`needs` si actúa como Main DPS):**
  - `need_reaction_enabler` / `need_hydro_app` (Prioridad: **10**): Xingqiu es indispensable para vaporizar sus sellos escarlatas cargados.
  - `need_shield` / `need_interruption_resistance` (Prioridad: **10**): Los ataques cargados consumen casi todo su aguante y la dejan quieta; ser golpeada corta su rotación.
  - `need_attack_buff` (Prioridad: **8**): Bennett Q y resonancia Pyro.
  - `need_resistance_shred` (Prioridad: **9**): Sucrose / Jean con Sombra Verde.
* **Anti-Tags:**
  - Usuaria de catalizador (ataques puramente elementales, inmune a sobrescrituras).
* **Sets de Soporte KQM (como Tankfei $C_4$):**
  - *Ritual Antiguo de la Nobleza* (Prioridad: **9** — tira Q para escudar y activa el +20% ATK grupal).
  - *Instructor* (Prioridad: **9** — aplica Pyro antes del swap, activa Instructor dando +120 EM y pasa TTDS al Carry).
  - *Tenacidad de la Geoarmada* (Prioridad: **6**).

---

### 11. Eula
* **Rareza:** 5★ | **Elemento:** Cryo | **Arma:** Mandoble | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `Main DPS`, `Support` (Debuffer Físico y Cryo / Sub-DPS Nuke)
* **Damage Profile:** Physical Melee (Espada Luminosa acumulativa)
* **Offers (Aportes Colectivos al Equipo):**
  - `debuff_physical_res`: Al mantener pulsada su habilidad elemental (Hold E) consumiendo 2 cargas de Corazón Impasible, **reduce la Resistencia Física de los enemigos en un -25%** durante 7s (debuffer físico de alto calibre para Razor, Xinyan o carrys físicos cuando no se dispone de Rosaria $C_6$ o Zhongli).
  - `debuff_cryo_res`: El mismo Hold E **reduce la Resistencia Cryo enemiga en un -25%**, habilitando soporte para carrys Cryo (Ganyu, Rosaria, Chongyun).
  - `interruption_resistance`: Las cargas de Corazón Impasible otorgan aplomo casi inquebrantable y bono de DEF.
  - `cryo_application`: Impactos de Cryo en E y Q para facilitar la reacción de Superconductor.
  - `physical_nuke`: La explosión de su Definitiva inflige un daño de ráfaga masivo incluso sin pasar 7s en campo (*quickswap burst*).
* **Demandas del Carry (`needs` si actúa como Main DPS):**
  - `need_physical_shred` / `need_reaction_enabler` (Prioridad: **10**): Exige un aplicador Electro fuera de campo (Fischl, Beidou, Lisa, Raiden) para activar **Superconductor (-40% de Resistencia Física enemiga)**.
  - `need_battery_cryo` / `need_battery` (Prioridad: **10**): Su Definitiva cuesta 80 puntos de energía y su generación propia es muy baja. Demanda una batería Cryo especializada: Diona (con Sacrificio) o Rosaria (con Favonius).
  - `need_sustain` / `need_shield` (Prioridad: **9**): Durante los 7s de carga de la Espada Luminosa no puede cambiar de personaje ni esquivar en exceso para maximizar acumulaciones; un escudo o sanador continuo es crítico.
  - `need_attack_buff` (Prioridad: **8**): Bennett (si no es $C_6$), Rosaria con Nobleza o Tenacidad en escudero.
* **Anti-Tags (Incompatibilidades Duras):**
  - `pyro_infusion`: **Bennett $C_6$ destruye completamente a Eula como Carry**, convirtiendo sus ataques normales en Pyro e inutilizando todos sus cálices y bonos de daño físico (+100%+ Phys DMG).
  - `cryo_infusion`: **Chongyun convierte sus golpes normales en Cryo**, arruinando su daño físico sostenido.
* **Sets de Soporte KQM (si actúa como Support/Sub-DPS):**
  - *Ritual Antiguo de la Nobleza* (Prioridad: **8** — ráfaga en Q +20% ATK al carry).
  - *Instructor* (Prioridad: **7**).
  - *Tenacidad de la Geoarmada* (Prioridad: **6**).

---

## 3. Matriz Comparativa y Resumen de Taxonomía (Ronda 2)

| Personaje | Elemento | Arma | Roles Principales | Perfil de Daño | Tags Colectivos Clave (`offers`) | Demandas de Carry (`needs`) | Anti-Tags Duras | Set Soporte BiS |
|---|:---:|:---:|---|---|---|---|:---:|:---:|
| **Diona** | Cryo | Arco | `Support`, `Healer` | Cryo Utility / Shield-Heal | `shield`, `healer`, `battery`, `cleanse`, `buff_elemental_mastery` ($C_6$ +200 EM), `buff_movement_speed` | - | - | *Nobleza* (9) / *Instructor* (8) |
| **Tartaglia** | Hydro | Arco | `Main DPS` | Hydro Fast Melee / Riptide AoE | `hydro_application` (sin ICD), `buff_normal_attack_level` (+1), `interruption_power`, `coordinated_attacks` ($C_4$) | `need_offfield_pyro_dmg` (10), `need_attack_buff` (10), `need_resistance_shred` (9) | - | DPS Propio |
| **Xinyan** | Pyro | Mandoble | `Support`, `Sub-DPS`, `Main DPS` ($C_6$) | Physical Melee / Pyro Shield | `shield`, `pyro_application`, `buff_physical_dmg` (+15%), `debuff_physical_res` ($C_4$ -15%), `cleanse` | Si DPS: `need_physical_shred` (10), `need_attack_buff` (8) | `cryo_infusion`, `pyro_infusion` | *Tenacidad* (8) / *Nobleza* (8) |
| **Zhongli** | Geo | Lanza | `Support` | Geo Tank / Universal Shield | `shield` (supremo), `interruption_resistance` (total), `debuff_all_res` (-20% universal), `crowd_control`, `geo_construct`, `healer` ($C_6$) | - | - | *Petra* (10) / *Tenacidad* (9) |
| **Albedo** | Geo | Espada | `Sub-DPS`, `Support` | Geo Off-Field AoE DEF | `off_field_geo_dmg`, `geo_construct`, `battery`, `buff_elemental_mastery` (+125 EM), `buff_plunge_dmg` ($C_4$), `buff_all_dmg` ($C_6$) | - | - | *Tenacidad* (9) / *Petra* (9) |
| **Ganyu** | Cryo | Arco | `Main DPS`, `Sub-DPS`, `Support` | Cryo Charged Ranged / AoE Rain | `off_field_cryo_dmg`, `cryo_application`, `buff_cryo_dmg` (+20%), `taunt`, `debuff_cryo_res` ($C_1$) | Si DPS Melt: `need_shield` (10), `need_pyro_app` (10)<br>Si Freeze: `need_hydro_app` (10), `need_crowd_control` (10) | - | *Nobleza* (9) (como Sub-DPS) |
| **Xiao** | Anemo | Lanza | `Main DPS` | Anemo Melee Plunge AoE | `anemo_application`, `interruption_power` | `need_battery_anemo` (10), `need_sustain` (10), `need_resistance_shred` (9), `need_attack_buff` (8) | - | DPS Propio |
| **Hu Tao** | Pyro | Lanza | `Main DPS` | Pyro Melee Fast | `buff_crit_rate` (A1 +12%), `pyro_application` | `need_hydro_app` (10 Xingqiu), `need_shield` (10), `need_resistance_shred` (9), `need_geo_partner` (8) | Curadores continuos (-250 soft penalty) | DPS Propio |
| **Rosaria** | Cryo | Lanza | `Sub-DPS`, `Support` | Cryo Burst / Phys Buffer | `off_field_cryo_dmg`, `cryo_application`, `buff_crit_rate` (A4 +15%), `debuff_physical_res` ($C_6$ -20%), `battery` | Si DPS: `need_physical_shred` (10) | Si DPS: `cryo_infusion`, `pyro_infusion` | *Nobleza* (10) / *Instructor* (8) |
| **Yanfei** | Pyro | Catalizador | `Main DPS`, `Support` ($C_4$) | Pyro Ranged AoE / Shielder | `pyro_application`, `catalyst_buffer` (TTDS), `shield` ($C_4$ 45% HP "Tankfei") | Si DPS: `need_hydro_app` (10), `need_shield` (10), `need_resistance_shred` (9) | - | *Nobleza* (9) / *Instructor* (9) (Tankfei) |
| **Eula** | Cryo | Mandoble | `Main DPS`, `Support` | Physical Melee Nuke / Debuffer | `debuff_physical_res` (-25%), `debuff_cryo_res` (-25%), `interruption_resistance`, `cryo_application`, `physical_nuke` | Si DPS: `need_physical_shred` (10), `need_battery_cryo` (10), `need_sustain` (9) | **`pyro_infusion`** (Bennett $C_6$), **`cryo_infusion`** (Chongyun) | *Nobleza* (8) / DPS Propio |

---

## 4. Nuevos Arquetipos y Presets Habilitados por esta Ronda

Con la incorporación de estos 11 personajes, el motor de afínidad desbloquea los arquetipos más celebrados de la historia del juego:

1. **Tartaglia Internacional (Childe International):**
   - Composición: `[Tartaglia] + [Xiangling] + [Bennett] + [Sucrose / Kazuha]`
   - Mecánica: Tartaglia aplica Hydro masivo permitiendo que Pyronado vaporice en cada golpe, mientras Bennett bufa a ambos y recarga a Xiangling.
2. **Hu Tao Doble Hydro / Doble Geo:**
   - Composición A: `[Hu Tao] + [Xingqiu] + [Zhongli] + [Albedo]`
   - Composición B: `[Hu Tao] + [Xingqiu] + [Mona] + [Zhongli]`
   - Mecánica: Xingqiu vaporiza los cargados de Hu Tao, Zhongli da escudo irrompible y tritura resistencias (-20%), Albedo aporta +125 EM y resonancia Geo (+15% DMG).
3. **Morgana (Ganyu Permafreeze Clásica):**
   - Composición: `[Ganyu] + [Mona] + [Venti] + [Diona]`
   - Mecánica: Venti absorbe enemigos en su agujero negro, Mona aplica Hydro y fija el Presagio (+60% DMG) gracias a congelamiento permanente, Diona funge de batería Cryo y escudo.
4. **Xiao Hypercarry Anemo:**
   - Composición: `[Xiao] + [Sucrose / Jean] + [Zhongli] + [Bennett]`
   - Mecánica: Sucrose/Jean genera partículas Anemo para el coste 70 de Xiao, Zhongli aporta la única reducción de RES Anemo viable (-20%) y Bennett cura el drenaje de HP y bufa su enorme escalado de ATK.
5. **Eula Superconductor Físico Canónico:**
   - Composición: `[Eula] + [Fischl / Raiden] + [Rosaria / Diona] + [Zhongli / Bennett C0-C5]`
   - Mecánica: Fischl mantiene Superconductor (-40% RES Física), Rosaria a $C_6$ reduce otro -20% RES Física, aporta partículas Cryo y +15% Crit Rate, Zhongli o Diona aseguran que la rotación de 7s de la Espada Luminosa no sea interrumpida.
6. **Melt Ganyu (Ganyu Derretidos de Proximidad):**
   - Composición: `[Ganyu] + [Xiangling] + [Bennett] + [Zhongli]`
   - Mecánica: Escudo de Zhongli para apuntar sin ser interrumpido, Xiangling + Bennett aportan aura Pyro para que los dos golpes de la flecha cargada de Ganyu derritan con multiplicador x2.0.

---

## 5. Código TypeScript Listo para `seed.ts` y `roster-data.ts`

```typescript
// Fragmento listo para incorporar a ROSTER en seed.ts y DEFAULT_CHARACTERS en roster-data.ts:

export const ROUND_2_CHARACTERS = [
  {
    name: "Diona",
    element: "Cryo",
    weaponType: "Bow",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Support", "Healer"],
    damageProfile: "Cryo Utility",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "healer" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "buff_movement_speed" },
      { category: "mecanica", value: "debuff_attack" },
      { category: "mecanica", value: "buff_shield_strength", minConstellation: 2 },
      { category: "mecanica", value: "buff_elemental_mastery", minConstellation: 6 },
    ],
  },
  {
    name: "Tartaglia",
    element: "Hydro",
    weaponType: "Bow",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS"],
    damageProfile: "Hydro Fast Melee",
    mechanics: [
      { category: "mecanica", value: "hydro_application" },
      { category: "mecanica", value: "buff_normal_attack_level" },
      { category: "mecanica", value: "interruption_power" },
      { category: "mecanica", value: "coordinated_attacks", minConstellation: 4 },
    ],
    needs: [
      { value: "need_offfield_pyro_dmg", priority: 10 },
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_attack_buff", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_interruption_resistance", priority: 7 },
    ],
  },
  {
    name: "Xinyan",
    element: "Pyro",
    weaponType: "Claymore",
    rarity: 4,
    region: "Liyue",
    roles: ["Support", "Sub-DPS", "Main DPS"],
    damageProfile: "Physical Melee",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "buff_physical_dmg" },
      { category: "mecanica", value: "cleanse" },
      { category: "mecanica", value: "debuff_physical_res", minConstellation: 4 },
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_interruption_resistance", priority: 7 },
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe y destruye el daño físico" },
      { value: "pyro_infusion", reason: "Sobrescribe y destruye el daño físico" },
    ],
  },
  {
    name: "Zhongli",
    element: "Geo",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Support"],
    damageProfile: "Geo Tank",
    mechanics: [
      { category: "mecanica", value: "shield" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "need_resistance_shred" },
      { category: "mecanica", value: "debuff_all_res" },
      { category: "mecanica", value: "crowd_control" },
      { category: "mecanica", value: "geo_construct" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "healer", minConstellation: 6 },
    ],
  },
  {
    name: "Albedo",
    element: "Geo",
    weaponType: "Sword",
    rarity: 5,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Geo Off-Field AoE",
    mechanics: [
      { category: "mecanica", value: "off_field_geo_dmg" },
      { category: "mecanica", value: "geo_application" },
      { category: "mecanica", value: "geo_construct" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "buff_elemental_mastery" },
      { category: "mecanica", value: "buff_plunge_dmg", minConstellation: 4 },
      { category: "mecanica", value: "buff_all_dmg", minConstellation: 6 },
    ],
  },
  {
    name: "Ganyu",
    element: "Cryo",
    weaponType: "Bow",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS", "Sub-DPS", "Support"],
    damageProfile: "Cryo Charged Shot",
    mechanics: [
      { category: "mecanica", value: "off_field_cryo_dmg" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "buff_cryo_dmg" },
      { category: "mecanica", value: "taunt" },
      { category: "mecanica", value: "debuff_cryo_res", minConstellation: 1 },
    ],
    needs: [
      { value: "need_shield", priority: 10 },
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_attack_buff", priority: 8 },
      { value: "need_crowd_control", priority: 8 },
    ],
  },
  {
    name: "Xiao",
    element: "Anemo",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS"],
    damageProfile: "Anemo Melee Plunge",
    mechanics: [
      { category: "mecanica", value: "anemo_application" },
      { category: "mecanica", value: "interruption_power" },
    ],
    needs: [
      { value: "need_battery_anemo", priority: 10 },
      { value: "need_sustain", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 },
    ],
  },
  {
    name: "Hu Tao",
    element: "Pyro",
    weaponType: "Polearm",
    rarity: 5,
    region: "Liyue",
    roles: ["Main DPS"],
    damageProfile: "Pyro Melee Fast",
    mechanics: [
      { category: "mecanica", value: "buff_crit_rate" },
      { category: "mecanica", value: "pyro_application" },
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_shield", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_geo_partner", priority: 8 },
    ],
  },
  {
    name: "Rosaria",
    element: "Cryo",
    weaponType: "Lanza",
    rarity: 4,
    region: "Mondstadt",
    roles: ["Sub-DPS", "Support"],
    damageProfile: "Cryo Burst",
    mechanics: [
      { category: "mecanica", value: "off_field_cryo_dmg" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "buff_crit_rate" },
      { category: "mecanica", value: "battery" },
      { category: "mecanica", value: "debuff_physical_res", minConstellation: 6 },
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
    ],
    antiTags: [
      { value: "cryo_infusion", reason: "Sobrescribe y destruye el daño físico (si se juega como Carry)" },
      { value: "pyro_infusion", reason: "Sobrescribe y destruye el daño físico (si se juega como Carry)" },
    ],
  },
  {
    name: "Yanfei",
    element: "Pyro",
    weaponType: "Catalyst",
    rarity: 4,
    region: "Liyue",
    roles: ["Main DPS", "Support"],
    damageProfile: "Pyro Ranged AoE",
    mechanics: [
      { category: "mecanica", value: "pyro_application" },
      { category: "mecanica", value: "catalyst_buffer" },
      { category: "mecanica", value: "shield", minConstellation: 4 },
    ],
    needs: [
      { value: "need_reaction_enabler", priority: 10 },
      { value: "need_shield", priority: 10 },
      { value: "need_resistance_shred", priority: 9 },
      { value: "need_attack_buff", priority: 8 },
    ],
  },
  {
    name: "Eula",
    element: "Cryo",
    weaponType: "Claymore",
    rarity: 5,
    region: "Mondstadt",
    roles: ["Main DPS", "Support"],
    damageProfile: "Physical Melee",
    mechanics: [
      { category: "mecanica", value: "debuff_physical_res" },
      { category: "mecanica", value: "debuff_cryo_res" },
      { category: "mecanica", value: "interruption_resistance" },
      { category: "mecanica", value: "cryo_application" },
      { category: "mecanica", value: "physical_nuke" },
    ],
    needs: [
      { value: "need_physical_shred", priority: 10 },
      { value: "need_battery_cryo", priority: 10 },
      { value: "need_sustain", priority: 9 },
      { value: "need_attack_buff", priority: 8 },
    ],
    antiTags: [
      { value: "pyro_infusion", reason: "Sobrescribe golpes normales a Pyro, destruyendo sus bonos de daño físico (si actúa como Carry)" },
      { value: "cryo_infusion", reason: "Sobrescribe golpes normales a Cryo, destruyendo sus bonos de daño físico (si actúa como Carry)" },
    ],
  },
];
```
