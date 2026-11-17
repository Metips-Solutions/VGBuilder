# Catálogo Taxonómico del Roster Inicial (21 Personajes) — Estándar KeqingMains (KQM) v2.0

> **Documento:** `ROSTER_21_KQM_TAXONOMIA.md`  
> **Propósito:** Definir con rigor técnico y de *Theorycrafting* (KeqingMains / KQM) las capacidades mecánicas de los 21 personajes iniciales de Genshin Impact para alimentar el **Motor de Matching de VGBuilder**.  
> **Estado:** Versión 2.0 (Corregida tras revisión de Guías Rápidas de KQM, Buffos de Brujas y feedback técnico).

---

## 1. Convenciones y Principios de Diseño v2.0

Tras la auditoría técnica, establecemos los siguientes **principios de diseño estrictos**:

1. **Principio de "Offers" Colectivos (Fin de los buffs egoístas):**
   * La lista `offers` describe **única y exclusivamente lo que el personaje aporta al equipo o a sus compañeros**.
   * Buffs propios que solo aumentan el daño del mismo personaje (ej. infusión propia de Diluc, velocidad de ataque de Diluc C2, teletransporte de Keqing) **NO son offers para el equipo**. Pertenecen a la ficha interna del personaje (`self_buffs` / `damage_profile`).
2. **Generalización Funcional de "Needs" (Desacople de elementos fijos):**
   * En lugar de demandar tags ultra-específicos (ej. `need_anemo_shred`), se modelan **necesidades funcionales**:
     * `need_resistance_shred`: Reducción de resistencia elemental (satisfecho por Anemo con *Sombra Verde*, Zhongli con su escudo -20% a todo, Xilonen, Citlali, etc.).
     * `need_interruption_resistance`: Aplomo frente a golpes (satisfecho por Xingqiu, Beidou, escudos).
     * `need_physical_shred`: Reducción de resistencia física (satisfecho por reacción Superconductor, Rosaria C6, Zhongli, Lisa A4).
   * Personajes versátiles como **Keqing** no demandan un elemento rígido (`need_hydro_app`), sino que su necesidad es contextual a la reacción que lidera (`need_reaction_enabler`: Dendro para Intensificación/Aggravate, Hydro para Taser, Pyro para Sobrecarga).
3. **Mecánica de Infusiones Propias Inamovibles vs. Sobrescribibles:**
   * **Inamovibles / Absolutas:** Infusiones que por código del juego tienen prioridad absoluta y no pueden ser canceladas por campos de otros aliados (ej. la definitiva Geo de **Noelle**).
   * **Sobrescribibles:** Personajes sin infusión propia que dependen de daño Físico (**Razor**), donde campos como Chongyun (`cryo_infusion`) o Bennett C6 (`pyro_infusion`) arruinan completamente su daño.
4. **Buffos de Brujas (Hexerei & Witch Revelation - Misiones QoL):**
   * Integración de las mecánicas añadidas a personajes como **Klee**, **Mona**, **Fischl**, **Sucrose**, **Venti**, **Razor** y **Qiqi**, según las Quick Guides de KQM.

---

## 2. Fichas Detalladas de los 21 Personajes (v2.0)

---

### 1. Amber
* **Rareza:** 4★ | **Elemento:** Pyro | **Arma:** Arco | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `support` / `sub_dps`
* **Perfil de Daño:** Pyro Burst / Soporte de utilidad
* **Offers (Aportes al equipo):**
  * `taunt`: Barón Bunny atrae el aggro enemigo (alivia presión sobre el carry).
  * `pyro_application`: Definitiva aplica Pyro ultrarrápido (6U de calibre, excelente rompe-escudos Cryo).
  * `off_field_pyro_dmg`: Daño de Definitiva y explosión de señuelo.
  * `buff_attack` (C6): Otorga +15% ATK y +15% Mov SPD a todo el equipo durante 10s tras la Q.
* **Sets de Soporte KQM:** *Ritual Antiguo de la Nobleza* (4pc) o *Instructor* (4pc) + arco *Elegía del Fin* (buffer masivo de ATK y EM para carrys de vaporizado).
* **Anti-tags:** Ninguno.

---

### 2. Barbara
* **Rareza:** 4★ | **Elemento:** Hydro | **Arma:** Catalizador | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `support` (Healer / Conductora Hydro Melee)
* **Perfil de Daño:** Hydro Curación
* **Offers (Aportes al equipo):**
  * `healer`: Curación pasiva continua con aro de E y curación masiva inmediata en área con Q.
  * `hydro_application`: Aura orbital cuerpo a cuerpo de contacto.
  * `stamina_reduction`: Pasiva A1 reduce -12% el consumo de aguante del personaje activo.
  * `buff_hydro_dmg` (C2): Otorga +15% bono de daño Hydro al personaje activo mientras dure su aro.
  * `revive` (C6): Revive automáticamente al personaje activo derrotado al 100% de vida (cada 15 min).
  * `catalyst_buffer`: Portadora de *Cuento de Cazadores de Dragones* (+48% ATK al siguiente personaje).
* **Inconveniente Mecánico:** `self_wet` (aplica Hydro al personaje activo, vulnerable a congelarse ante enemigos Cryo).
* **Anti-tags:** Ninguno.

---

### 3. Beidou
* **Rareza:** 4★ | **Elemento:** Electro | **Arma:** Mandoble | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` (Off-field AoE Carry) / `support`
* **Perfil de Daño:** Electro Off-Field Multiobjetivo
* **Offers (Aportes al equipo):**
  * `off_field_electro_dmg`: Definitiva con rayos de rebote masivo entre 2+ enemigos.
  * `electro_application`: Aplicación constante en cada rebote.
  * `coordinated_attacks`: Se dispara con los Ataques Normales y Cargados del personaje en campo.
  * `damage_reduction`: Reduce el daño directo recibido por el carry hasta en un ~34%.
  * `interruption_resistance`: Aumento notable de aplomo durante la definitiva.
  * `shield` (C1): Otorga un escudo del 16% de HP al activar la Q.
  * `debuff_electro_res` (C6): Reduce la resistencia Electro enemiga en un -15%.
* **Requisito de Energía (`energy_hungry`):** Coste 80 pts; requiere una batería Electro (Fischl/Raiden).
* **Anti-tags:** Ninguno.

---

### 4. Bennett
* **Rareza:** 4★ | **Elemento:** Pyro | **Arma:** Espada Ligera | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `support` (Buffer Universal / Healer / Batería)
* **Perfil de Daño:** Pyro Buffer
* **Offers (Aportes al equipo):**
  * `buff_attack`: Bono colosal de ATK plano dentro de su campo de Q, escalando con su ATK Básico.
  * `healer`: Curación por pulsos muy rápida hasta el 70% de vida.
  * `battery`: Habilidad Elemental de 2 a 4s de CD que genera 2-3 partículas Pyro para alimentar a aliados.
  * `cleanse`: Auto-aplica Pyro limpiando auras elementales dañinas en el personaje activo.
  * `buff_pyro_dmg` (C6): +15% bono de daño Pyro a personajes cuerpo a cuerpo dentro de su Q.
  * `pyro_infusion` (C6): Imbuye armas cuerpo a cuerpo en Pyro (arma de doble filo).
* **Incompatibilidad Generada (`anti_tags`):** Su C6 `pyro_infusion` arruina a atacantes Físicos (**Razor**) y personajes con infusiones elementales sobrescribibles (**Keqing**).
* **Sets de Soporte KQM:** *Ritual Antiguo de la Nobleza* (4pc) o *Instructor* (4pc).

---

### 5. Chongyun
* **Rareza:** 4★ | **Elemento:** Cryo | **Arma:** Mandoble | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` / `support`
* **Perfil de Daño:** Cryo Burst / Habilitador de Infusión
* **Offers (Aportes al equipo):**
  * `cryo_infusion`: Imbuye espadas, mandobles y lanzas en Cryo dentro de su campo de E.
  * `buff_attack_speed`: Pasiva A1 otorga +8% ATK SPD en su campo.
  * `debuff_cryo_res`: Pasiva A4 reduce la resistencia Cryo enemiga en -10% al disiparse el campo.
  * `cooldown_reduction` (C2): Reduce en un **15% el tiempo de recarga (CD)** de elementales y definitivas lanzadas en su campo.
  * `cryo_application`: Su Q lanza 3-4 espadas Cryo instantáneas sin ICD (ideal para Reverse Melt con Bennett).
* **Incompatibilidad Generada (`anti_tags`):** Su `cryo_infusion` arruina a **Razor** (elimina daño físico) y **Keqing** (cancela su daño Electro).

---

### 6. Diluc
* **Rareza:** 5★ | **Elemento:** Pyro | **Arma:** Mandoble | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `main_dps` (On-field Pyro Carry)
* **Perfil de Daño:** Pyro Melee Continuo
* **Offers (Aportes al equipo):**
  * `pyro_application`: Aplicación Pyro constante en campo (habilidad elemental y básicos imbuidos).
* **Mecánicas Propias / Egoístas:** Infusión Pyro tras Q (+20% Pyro DMG) y aumento de ATK/ATK SPD personal a C2. *(No son offers para compañeros).*
* **Demandas del Carry (`needs`):**
  * `need_hydro_app` (Prioridad: **10**): Indispensable para vaporizar sus combos (Xingqiu, Yelan).
  * `need_attack_buff` (Prioridad: **8**): Bennett o buffers de ATK.
  * `need_resistance_shred` (Prioridad: **8**): Reducción de Pyro RES (vía *Sombra Verde* [Sucrose/Kazuha], Zhongli, Xilonen o Citlali).
  * `need_interruption_resistance` (Prioridad: **7**): Requiere aplomo para ejecutar sus combos de 3 elementales sin ser derribado (cubierto por Xingqiu o escudo).
* **Incompatibilidades Duras (`anti_tags`):** `cryo_infusion` (Chongyun interfiere con su vaporizado constante).

---

### 7. Fischl
* **Rareza:** 4★ | **Elemento:** Electro | **Arma:** Arco | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `sub_dps` / `support` (Batería Universal / Daño Off-field Supremo)
* **Perfil de Daño:** Electro Off-Field de Objetivo Único
* **Offers (Aportes al equipo):**
  * `off_field_electro_dmg`: Oz en campo con casi 100% uptime alternando E y Q.
  * `battery`: La generadora más consistente de partículas Electro del juego.
  * `electro_application`: Descargas rápidas a distancia.
  * `snapshot`: Oz captura los buffs al momento de invocarse.
  * `coordinated_attacks` (C6): Oz dispara en sincronía con cada Ataque Normal del personaje activo.
  * `buff_attack` / `buff_elemental_mastery` (Hexerei Rite): Bono grupal al compartir equipo con otro miembro Hexerei (Klee, Mona, Sucrose, Venti, Razor).
* **Sets de Soporte KQM:** *Tenacidad de la Geoarmada* (4pc, Oz mantiene el buff de +20% ATK activo continuamente).

---

### 8. Jean
* **Rareza:** 5★ | **Elemento:** Anemo | **Arma:** Espada Ligera | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `support` (Healer / VV Shredder / Sunfire Enabler)
* **Perfil de Daño:** Anemo Burst / Soporte
* **Offers (Aportes al equipo):**
  * `healer`: Curación masiva e instantánea a todo el equipo en Q, más regeneración continua en el campo.
  * `crowd_control`: Atrae y lanza enemigos ligeros con E.
  * `cleanse` / `sunfire`: Auto-aplica Anemo al personaje activo. Combinada con la Q de Bennett, causa remolinos Pyro continuos a los enemigos (*Sunfire*).
  * `buff_attack_speed` (C2): Recoger un orbe elemental da +15% ATK y Mov SPD a todo el equipo durante 15s.
  * `debuff_anemo_res` (C4): Reduce la resistencia Anemo enemiga en -40% dentro del campo.
* **Sets de Soporte KQM:** *Sombra Verde Esmeralda* (4pc, inyecta `need_resistance_shred` de -40%).

---

### 9. Kaeya
* **Rareza:** 4★ | **Elemento:** Cryo | **Arma:** Espada Ligera | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` / `support` (Batería Cryo / Aplicador Proximidad)
* **Perfil de Daño:** Cryo Off-Field Melee
* **Offers (Aportes al equipo):**
  * `off_field_cryo_dmg`: Carámbanos orbitales de su Q.
  * `cryo_application`: Aplicación constante en rango cuerpo a cuerpo (*Close Range Orbit*).
  * `battery`: Habilidad Elemental de 6s de CD que genera 2-3 partículas Cryo.
  * `snapshot`: Su definitiva congela los buffs al lanzarse.
* **Limitación de Rango:** Su aura orbital es de melé estricto; excelente para Diluc o Razor, ineficiente para Klee a distancia.
* **Sets de Soporte KQM:** *Ritual Antiguo de la Nobleza* (4pc).

---

### 10. Keqing
* **Rareza:** 5★ | **Elemento:** Electro | **Arma:** Espada Ligera | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `main_dps` (On-field Electro Fast Carry / Driver)
* **Perfil de Daño:** Electro Rápido en Campo
* **Offers (Aportes al equipo):**
  * `electro_application`: Múltiples fuentes de aplicación rápida Electro.
* **Mecánicas Propias / Egoístas:** Infusión Electro de 5s en su espada y teletransporte. *(No son offers para aliados).*
* **Demandas del Carry (`needs`):**
  * `need_reaction_enabler` (Prioridad: **10**): Versátil, requiere un habilitador según el arquetipo:
    * *Dendro* (Prioridad 10) para Intensificación (*Aggravate* con Collei/Nahida).
    * *Hydro* (Prioridad 8) para Electrocargado (*Taser* con Xingqiu/Fischl).
    * *Pyro* (Prioridad 7) para Sobrecarga (*Overload* con Chevreuse/Xiangling).
  * `need_resistance_shred` (Prioridad: **9**): Reducción de Electro RES (vía *Sombra Verde* [Sucrose/Kazuha] o Zhongli/Xilonen).
  * `need_attack_buff` (Prioridad: **7**): Bennett, Sara o Nobleza.
  * `need_interruption_resistance` / `need_sustain` (Prioridad: **7**): Su consumo alto de aguante en ataques cargados la hace vulnerable si no tiene escudo o aplomo.
* **Incompatibilidades Duras (`anti_tags`):** `cryo_infusion` (Chongyun) y `pyro_infusion` (Bennett C6) — sobrescriben su espada anulando su daño Electro.

---

### 11. Klee
* **Rareza:** 5★ | **Elemento:** Pyro | **Arma:** Catalizador | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `main_dps` (On-field) | `support` / `sub_dps` (con C2 o como portadora de TTDS)
* **Perfil de Daño:** Pyro Explosivo en Área / Saturación de Aura
* **Offers (Aportes al equipo):**
  * `pyro_application`: Saturación extrema de Pyro en área (E, bombas y rayos de Q).
  * `battery`: Pasiva A4: si sus cargados asestan crítico, regenera 2 pts de energía fija para todo el equipo.
  * `interruption_power`: Sus bombas derriban y tumban enemigos gigantes (alivia presión sobre el equipo).
  * `debuff_defense` (C2 — CLAVE KQM): Las minas de su E reducen la **Defensa enemiga en un -23%** durante 10s (uno de los debuffs más potentes del juego).
  * `catalyst_buffer`: Puede portar *Cuento de Cazadores de Dragones* (+48% ATK al siguiente aliado) al jugarse como enabler/support.
  * `buff_hexerei_c1`: Con la misión *Witch's Homework* (Hexerei), su C1 se convierte en un bono masivo y gratuito de daño.
* **Demandas del Carry (`needs`):**
  * `need_shield` / `need_interruption_resistance` (Prioridad: **10**): Muy frágil y animaciones largas de lanzamiento; un escudo (Zhongli, Layla, Noelle) es crítico.
  * `need_hydro_app` (Prioridad: **9**): Aplica tanto Pyro que requiere aplicadores rápidos (Xingqiu, Mona) o doble Hydro para vaporizar con consistencia.
  * `need_crowd_control` (Prioridad: **8**): Agrupadores como Sucrose que concentren tanto enemigos como las minas sueltas de su E.
* **Anti-tags:** Inmune a infusiones por ser catalizadora.

---

### 12. Lisa
* **Rareza:** 4★ | **Elemento:** Electro | **Arma:** Catalizador | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` / `support` (Def Shredder / Electro Enabler)
* **Perfil de Daño:** Electro Off-Field en Área
* **Offers (Aportes al equipo):**
  * `off_field_electro_dmg`: Definitiva en área amplia durante 15s.
  * `debuff_defense`: Pasiva A4 reduce la **Defensa enemiga en un -15%** durante 10s con su Q.
  * `electro_application`: Descargas constantes a distancia.
  * `catalyst_buffer`: Portadora de *Cuento de Cazadores de Dragones* (+48% ATK).
* **Sets de Soporte KQM:** *Ritual Antiguo de la Nobleza* (4pc) o *Instructor* (4pc).

---

### 13. Mona
* **Rareza:** 5★ | **Elemento:** Hydro | **Arma:** Catalizador | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `support` / `sub_dps` (Buffer de Daño / Hydro Burst)
* **Perfil de Daño:** Hydro Burst
* **Offers (Aportes al equipo):**
  * `buff_all_dmg` (Omen / Presagio): Su Q aumenta el daño recibido por los enemigos de cualquier fuente hasta en un **+60%**.
  * `taunt`: Ilusión de su E distrae enemigos y pulsa daño Hydro.
  * `crowd_control`: Inmoviliza en burbujas a enemigos ligeros.
  * `off_field_hydro_dmg`: Pulsos continuos de su ilusión.
  * `buff_vaporize_dmg` (C1 + Hexerei Rite): Tras la misión QoL de Bruja (*Witch's Eve Rite*), sus normales acumulan cargas que aumentan el daño de Vaporizado del aliado en +15% por carga y extienden el Presagio hasta 8s. Su C1 amplifica reacciones Hydro a un 24%.
  * `catalyst_buffer`: Portadora de *Cazadores de Dragones* (+48% ATK).
* **Sets de Soporte KQM:** *Ritual Antiguo de la Nobleza* (4pc) o *Tenacidad* (4pc).

---

### 14. Ningguang
* **Rareza:** 4★ | **Elemento:** Geo | **Arma:** Catalizador | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `main_dps` / `sub_dps` (Geo Burst Carry)
* **Perfil de Daño:** Geo Proyectiles a Distancia
* **Offers (Aportes al equipo):**
  * `buff_geo_dmg`: Pasiva A4 otorga +12% de bono de daño Geo a cualquier aliado que atraviese su Pantalla de Jade.
  * `battery` (C2): Reinicia el CD de la pantalla al romperse, generando partículas Geo extra para aliados Geo (ej. Noelle).
  * `geo_construct`: La Pantalla de Jade es un constructo Geo (útil para personajes que resuenan o exigen constructos en campo como Zhongli o Chiori).
  * `catalyst_buffer`: Si actúa de soporte, puede portar *Cazadores de Dragones* (+48% ATK) o *Prototipo Ámbar* (cura al equipo).
* **Demandas del Carry (`needs`):**
  * `need_geo_partner` (Prioridad: **10**): Obligatorio un segundo Geo para activar la Consonancia Geo (+15% daño y -20% Geo RES al enemigo).
  * `need_shield` (Prioridad: **9**): Necesita un escudo para mantener el buff de la consonancia Geo.
  * `need_attack_buff` (Prioridad: **8**): Bennett o consonancia Pyro.

---

### 15. Noelle
* **Rareza:** 4★ | **Elemento:** Geo | **Arma:** Mandoble | **Región:** Mondstadt | **Alineamiento:** `None`
* **Roles KQM:** `support` / `healer` (C0-C5) | `main_dps` (Carry Monstruoso a C6)
* **Perfil de Daño:** Geo Barrido en Área On-field (escala masiva con Defensa)
* **Offers (Aportes al equipo):**
  * `shield`: Armadura protectora resistente que escala con su DEF.
  * `healer`: Al golpear con su escudo activo, cura a **todos los aliados del equipo**.
* **Mecánica de Infusión Inamovible:**  
  * `geo_infusion_absolute`: Su definitiva imbuye su mandoble en Geo con alcance masivo. **Esta infusión es inamovible y absoluta**; no puede ser sobrescrita por Bennett C6 ni Chongyun.
* **Demandas del Carry a C6 (`needs`):**
  * `need_battery_geo` (Prioridad: **10**): No genera partículas de energía elemental por sí misma; requiere una batería Geo (Ningguang, Gorou, Geo Traveler).
  * `need_offfield_dps` (Prioridad: **8**): Sub-DPS pasivos que sumen daño mientras ella barre el campo (Fischl, Xingqiu, Albedo).
  * `need_geo_partner` (Prioridad: **9**): Para activar la consonancia Geo.

---

### 16. Qiqi
* **Rareza:** 5★ | **Elemento:** Cryo | **Arma:** Espada Ligera | **Región:** Liyue | **Alineamiento:** `Witch`
* **Roles KQM:** `support` (Healer Pura / Conductora de Daño Plano)
* **Perfil de Daño:** Cryo Curación Continua
* **Offers (Aportes al equipo):**
  * `healer`: La mayor tasa de curación sostenida del juego base (orbe orbital y talismanes de ataque).
  * `cryo_application`: Orbe que gira periódicamente aplicando Cryo cuerpo a cuerpo.
  * `revive` (C6): Revive a todos los miembros caídos al 100% de HP.
  * `buff_superconduct_dmg` (Witch Revelation): Potenciación de la reacción de Superconductor al emparejarse con alineamiento de brujas.
* **Sinergia con Artefactos KQM:**  
  * Es la mejor portadora de *Son de Antaño* (4pc, transforma su sobrecuración en daño plano directo al Carry) o *Perla Oceánica*.

---

### 17. Razor
* **Rareza:** 4★ | **Elemento:** Electro | **Arma:** Mandoble | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `main_dps` (On-field Physical Carry) | `support` (C4 / C6 experimental con Nobleza)
* **Perfil de Daño:** Daño Físico Melee Puro
* **Offers (Aportes al equipo):**
  * `debuff_defense` (C4): Su E al ser pulsada reduce la DEF enemiga en un **-15%** durante 7s (sirve a cualquier aliado físico o elemental).
  * `electro_application`: Descargas secundarias de su lobo.
* **Mecánicas Propias / Egoístas:** Aplomo propio, velocidad de ataque y autorrecarga de energía elemental.
* **Demandas del Carry (`needs`):**
  * `need_physical_shred` (Prioridad: **10**): Necesita triturar la resistencia física enemiga; satisfecho principalmente por la reacción de **Superconductor** (vía aplicador Cryo continuo como **Kaeya**, Rosaria, Qiqi), o por debuffers universales (Zhongli, Lisa A4, Rosaria C6).
  * `need_interruption_resistance` / `need_sustain` (Prioridad: **8**): Debe mantenerse atacando en campo sin esquivar constantemente.
  * `need_attack_buff` (Prioridad: **7**): Buffers de ATK que no infundan elementos.
* **Incompatibilidades Duras (`anti_tags` — CRÍTICO):**  
  * `cryo_infusion` (Chongyun) y `pyro_infusion` (Bennett C6) **PROHIBIDOS**. Al no tener infusión inamovible, su daño físico se convierte en elemental y pierde todo su escalado.

---

### 18. Sucrose (Sacarosa)
* **Rareza:** 4★ | **Elemento:** Anemo | **Arma:** Catalizador | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `support` (Buffer de Maestría / VV Shredder / Crowd Control / Driver)
* **Perfil de Daño:** Anemo Torbellino
* **Offers (Aportes al equipo):**
  * `buff_elemental_mastery`: Comparte +50 EM fijo y el **20% de su propia EM** con todo el equipo.
  * `crowd_control`: Succión y derribo en área con E y Q.
  * `battery`: Con *Memorias de Sacrificio* genera nubes masivas de partículas Anemo.
  * `buff_absorbed_element_dmg` (C6): Otorga +20% de bono de daño elemental del elemento absorbido en su Q.
  * `buff_all_dmg` / `buff_hexerei_dmg` (Hexerei): Bono grupal con compañeros de bruja.
  * `catalyst_buffer`: Portadora de *Cazadores de Dragones* (+48% ATK) o *Memorias de Sacrificio*.
* **Sets de Soporte KQM:** *Sombra Verde Esmeralda (VV)* (4pc, inyecta `need_resistance_shred` de -40%).

---

### 19. Venti
* **Rareza:** 5★ | **Elemento:** Anemo | **Arma:** Arco | **Región:** Mondstadt | **Alineamiento:** `Hexerei`
* **Roles KQM:** `support` (Control de Masas Supremo / Batería Universal)
* **Perfil de Daño:** Anemo Torbellino Off-field
* **Offers (Aportes al equipo):**
  * `crowd_control`: El agujero negro más potente del juego para agrupar y suspender enemigos ligeros y medianos.
  * `battery`: Pasiva A4 regenera **15 puntos de energía fija** a todos los aliados del elemento absorbido.
  * `debuff_anemo_res` (C2 / C4): Reduce resistencia Anemo enemiga.
  * `debuff_absorbed_element_res` (C6): Reduce en un -20% la resistencia enemiga al elemento absorbido en su Q.
* **Sets de Soporte KQM:** *Sombra Verde Esmeralda (VV)* (4pc).

---

### 20. Xiangling
* **Rareza:** 4★ | **Elemento:** Pyro | **Arma:** Lanza | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` (Reina del Daño Off-field y Reacciones Pyro)
* **Perfil de Daño:** Pyro Off-field Masivo 360°
* **Offers (Aportes al equipo):**
  * `off_field_pyro_dmg`: Pyronado continuo alrededor del personaje activo.
  * `pyro_application`: **Sin ICD (No Internal Cooldown)**. Cada giro del Pyronado aplica Pyro, permitiendo vaporizar o derretir continuamente todos los golpes.
  * `snapshot`: Congela los buffs de ATK al momento del lanzamiento durante toda su duración.
  * `buff_attack`: El chile de Guoba da +10% ATK durante 10s al aliado que lo tome.
  * `debuff_pyro_res` (C1): Guoba reduce la resistencia Pyro enemiga en -15%.
  * `buff_pyro_dmg` (C6): +14% bono de daño Pyro a todo el equipo durante la Q.
* **Requisito de Energía (`energy_hungry`):** Coste 80 pts; requiere a **Bennett** como batería Pyro casi obligatoria.

---

### 21. Xingqiu
* **Rareza:** 4★ | **Elemento:** Hydro | **Arma:** Espada Ligera | **Región:** Liyue | **Alineamiento:** `None`
* **Roles KQM:** `sub_dps` (Rey de la Aplicación Hydro Off-field y Utilidad Táctica)
* **Perfil de Daño:** Hydro Proyectiles Coordinados Off-field
* **Offers (Aportes al equipo):**
  * `hydro_application`: La aplicación Hydro de mayor frecuencia del juego.
  * `off_field_hydro_dmg`: Ráfagas constantes de espadas de lluvia.
  * `coordinated_attacks`: Se activan con cada Ataque Normal del personaje activo.
  * `damage_reduction`: Absorbe y reduce directamente hasta un ~40% del daño recibido por el aliado.
  * `interruption_resistance`: Confiere **aplomo máximo**, evitando que el carry sea interrumpido o derribado.
  * `healer`: Curación menor cuando las espadas de lluvia expiran o se rompen.
  * `debuff_hydro_res` (C2): Reduce la resistencia Hydro enemiga en un -15%.
* **Sets de Soporte KQM:** *Emblema del Destino* (4pc) o *Nobleza* (4pc) con *Espada del Sacrificio*.

---

## 3. Matriz de Síntesis Comparativa (v2.0)

| Personaje | Rol KQM | Perfil Daño | Offers Reales al Equipo | Demandas Funcionales del Carry (`needs`) | Anti-Tags Duros |
|---|---|---|---|---|---|
| **Amber** | Support / Sub-DPS | Pyro Burst | `taunt`, `pyro_app` (burst 6U), `buff_attack` (C6) | - | - |
| **Barbara** | Support / Healer | Hydro Heal | `healer`, `hydro_app` (melee), `buff_hydro_dmg` (C2), `revive` (C6), `ttds_holder` | - | - |
| **Beidou** | Sub-DPS | Electro AoE | `off_field_electro_dmg`, `coordinated_attacks`, `damage_reduction`, `interruption_resistance`, `shield` (C1), `debuff_electro_res` (C6) | `need_battery` (Electro) | - |
| **Bennett** | Support / Healer | Pyro Buffer | `buff_attack`, `healer`, `battery`, `cleanse`, `buff_pyro_dmg` (C6), `pyro_infusion` (C6) | - | C6 arruina Físicos |
| **Chongyun** | Sub-DPS / Support | Cryo Burst | `cryo_infusion`, `cooldown_reduction` (C2), `debuff_cryo_res`, `buff_attack_speed` | - | Arruina Físicos/Electro |
| **Diluc** | Main DPS | Pyro Melee | `pyro_application` | `need_hydro_app` (10), `need_attack_buff` (8), `need_resistance_shred` (8), `need_interruption_resistance` (7) | `cryo_infusion` |
| **Fischl** | Sub-DPS / Support | Electro Single Target | `off_field_electro_dmg`, `battery`, `snapshot`, `coordinated_attacks` (C6), Hexerei | - | - |
| **Jean** | Support / Healer | Anemo Utility | `healer` (instantánea), `cleanse`, `sunfire`, `crowd_control`, `buff_attack_speed` (C2), `debuff_anemo_res` (C4) | - | - |
| **Kaeya** | Sub-DPS / Support | Cryo Melee | `off_field_cryo_dmg` (melee orbit), `battery`, `snapshot` | - | Distancia larga (Klee) |
| **Keqing** | Main DPS | Electro Fast Melee | `electro_application` | `need_reaction_enabler` (Dendro/Hydro/Pyro 10), `need_resistance_shred` (9), `need_interruption_resistance` (7) | `cryo_infusion`, `pyro_infusion` |
| **Klee** | Main DPS / Support (C2) | Pyro AoE Ranged | `pyro_application`, `battery`, `interruption_power`, `debuff_defense` (C2 -23%), `ttds_holder`, Hexerei | `need_shield` / `need_interruption_resistance` (10), `need_hydro_app` (9), `need_crowd_control` (8) | - |
| **Lisa** | Sub-DPS / Support | Electro AoE | `off_field_electro_dmg`, `debuff_defense` (-15%), `ttds_holder` | - | - |
| **Mona** | Support / Sub-DPS | Hydro Buffer | `buff_all_dmg` (Omen +60%), `taunt`, `crowd_control`, `buff_vaporize_dmg` (C1 + Hexerei), `ttds_holder` | - | - |
| **Ningguang** | Main DPS / Burst | Geo Ranged | `buff_geo_dmg` (+12%), `battery` (C2), `geo_construct` | `need_geo_partner` (10), `need_shield` (9), `need_attack_buff` (8) | - |
| **Noelle** | Support / Main DPS (C6) | Geo Tank / Carry | `shield`, `healer`, `geo_infusion_absolute` | Si DPS: `need_battery_geo` (10), `need_geo_partner` (9), `need_offfield_dps` (8) | - (Infusión Inamovible) |
| **Qiqi** | Support / Healer | Cryo Pure Heal | `healer` (masiva), `cryo_application` (orbital), `revive` (C6), Witch Revelation | - | - |
| **Razor** | Main DPS / Support (C4) | Physical Melee | `debuff_defense` (C4 -15%), `electro_application` | `need_physical_shred` (10), `need_interruption_resistance` (8), `need_attack_buff` (7) | `cryo_infusion`, `pyro_infusion` |
| **Sucrose** | Support | Anemo Swirl / EM | `buff_elemental_mastery` (+50 + 20%), `crowd_control`, `buff_absorbed_element_dmg` (C6), Hexerei | - | - |
| **Venti** | Support | Anemo CC Supremo | `crowd_control` (supremo), `battery` (15 energía), `debuff_anemo_res` (C2), `debuff_absorbed_res` (C6), Hexerei | - | - |
| **Xiangling** | Sub-DPS | Pyro Off-field 360° | `off_field_pyro_dmg`, `pyro_application` (sin ICD), `snapshot`, `buff_attack` (Guoba), `debuff_pyro_res` (C1) | `need_battery_pyro` (Bennett 10) | - |
| **Xingqiu** | Sub-DPS / Support | Hydro Off-field | `hydro_application` (suprema), `coordinated_attacks`, `damage_reduction`, `interruption_resistance`, `healer`, `debuff_hydro_res` (C2) | - | - |
