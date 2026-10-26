import type {
  CharacterData,
  ScoreBreakdown,
  TeamPreset,
  TagAffinity,
} from "./types";
import type { CompanionEntry } from "./artifact-binder";

/**
 * Task 3.1.2: Algoritmo de Scoring Matemático v2.0
 * Formulación:
 * Total Score = S_scaling_buffs + S_amplification + S_blueprint + S_resonance + S_micro_affinities - P_penalties
 */
export function calculateTeamScore(
  targetCarry: CharacterData,
  companions: CompanionEntry[],
  activeTags: Set<string>,
  injectedArtifactTags: string[],
  presets: TeamPreset[],
  tagAffinities: TagAffinity[]
): {
  totalScore: number;
  breakdown: ScoreBreakdown;
  detectedArchetype: string;
  explanations: string[];
} {
  const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
  const explanations: string[] = [];

  // Combinar todos los tags activos (personajes + artefactos inyectados)
  const allActiveTags = new Set<string>(activeTags);
  for (const t of injectedArtifactTags) {
    allActiveTags.add(t);
  }

  const hasHydro = allActiveTags.has("hydro_application");
  const hasCryo = allActiveTags.has("cryo_application");
  const hasPyro = allActiveTags.has("pyro_application");
  const hasElectro = allActiveTags.has("electro_application");
  const hasAnemo = allActiveTags.has("anemo_application");
  const hasGeo = allActiveTags.has("geo_application");
  const hasDendro = allActiveTags.has("dendro_application");
  const hasVV = allActiveTags.has("need_resistance_shred") || allActiveTags.has("debuff_elemental_res");

  // Ataques coordinados aportados por un Acompañante fuera de campo
  const hasCompanionCoordinated = companions.some((c) =>
    c.character.mechanics.some(
      (m) =>
        m.value === "coordinated_attacks" &&
        (!m.minConstellation || c.constellation >= m.minConstellation)
    )
  );

  // Ataques coordinados aportados por un Acompañante Hydro fuera de campo
  const hasHydroCoordinated = companions.some((c) =>
    c.character.element === "Hydro" &&
    c.character.mechanics.some(
      (m) =>
        (m.value === "coordinated_attacks" || m.value === "raincutter") &&
        (!m.minConstellation || c.constellation >= m.minConstellation)
    )
  );

  // 1. S_scaling_buffs (Demandas del Carry con Diminishing Returns)
  let sScalingBuffs = 0;
  const carryNeeds = targetCarry.needs ?? [
    { value: "need_reaction_enabler", priority: 8 },
    { value: "need_attack_buff", priority: 8 },
    { value: "need_sustain", priority: 8 },
  ];

  for (const need of carryNeeds) {
    const baseValue = need.priority * 100;
    let matchSources = 0;

    // Verificar fuentes que satisfacen esta necesidad
    if (need.value === "need_reaction_enabler") {
      if (targetCarry.element === "Pyro") {
        const hydroSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              m.value === "hydro_application" &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        const cryoSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              m.value === "cryo_application" &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
        if (hydroSources > 0) matchSources += hydroSources;
        else if (cryoSources > 0) matchSources += cryoSources;
        else if (pyroCount >= 3 && hasVV) matchSources += 1;
      } else if (targetCarry.element === "Hydro") {
        const pyroSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              (m.value === "pyro_application" || m.value === "off_field_pyro_dmg") &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        if (pyroSources > 0) matchSources += pyroSources * 2;
      } else if (targetCarry.element === "Cryo") {
        const pyroSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              (m.value === "pyro_application" || m.value === "off_field_pyro_dmg") &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        const hydroSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              m.value === "hydro_application" &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        if (pyroSources > 0) matchSources += pyroSources;
        if (hydroSources > 0) matchSources += hydroSources;
      } else if (targetCarry.element === "Electro") {
        if (allActiveTags.has("hydro_application")) matchSources++;
        if (allActiveTags.has("cryo_application")) matchSources++;
        if (allActiveTags.has("pyro_application")) matchSources++;
        if (allActiveTags.has("dendro_application")) matchSources += 2; // Aceleración (Quicken)
      } else if (targetCarry.element === "Dendro") {
        const electroSources = companions.filter((c) =>
          c.character.mechanics.some(
            (m) =>
              (m.value === "electro_application" || m.value === "off_field_electro_dmg") &&
              (!m.minConstellation || c.constellation >= m.minConstellation)
          )
        ).length;
        if (electroSources > 0) matchSources += electroSources * 2; // Propagación (Spread)
      } else {
        if (allActiveTags.has("hydro_application")) matchSources++;
        if (allActiveTags.has("cryo_application")) matchSources++;
      }
    } else if (need.value === "need_dendro_shred") {
      if (allActiveTags.has("debuff_dendro_res")) matchSources += 2;
    } else if (need.value === "need_anemo_shred") {
      if (allActiveTags.has("debuff_anemo_res")) matchSources += 2; // Jean C4, Venti C2/C6, Faruzan
      if (allActiveTags.has("debuff_all_res")) matchSources += 1;   // Zhongli
      if (allActiveTags.has("debuff_defense")) matchSources += 1;   // Klee C2, Lisa, Razor C4
    } else if (need.value === "need_normal_attack_buff") {
      if (allActiveTags.has("buff_normal_attack_dmg")) matchSources += 2;
      if (allActiveTags.has("buff_attack_speed")) matchSources += 1;
    } else if (need.value === "need_coordinated_attacks") {
      if (allActiveTags.has("coordinated_attacks")) matchSources += 2;
    } else if (need.value === "need_resistance_shred") {
      const isSwirlable = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
      if (isSwirlable) {
        if (allActiveTags.has("need_resistance_shred")) matchSources++;
        if (allActiveTags.has("debuff_elemental_res")) matchSources++;
      }
      if (allActiveTags.has("debuff_all_res")) matchSources++;
      if (allActiveTags.has(`debuff_${targetCarry.element.toLowerCase()}_res`)) matchSources++;
      if (allActiveTags.has("debuff_defense")) matchSources++;
    } else if (need.value === "need_attack_buff") {
      if (allActiveTags.has("buff_attack")) matchSources++;
      if (allActiveTags.has("need_attack_buff")) matchSources++;
      if (allActiveTags.has("catalyst_buffer")) matchSources++;
    } else if (need.value === "need_interruption_resistance") {
      if (allActiveTags.has("interruption_resistance")) matchSources++;
      if (allActiveTags.has("shield")) matchSources++;
    } else if (need.value === "need_shield") {
      if (allActiveTags.has("shield")) matchSources++;
    } else if (need.value === "need_geo_partner") {
      const geoCount = fullTeam.filter((c) => c.element === "Geo").length;
      if (geoCount >= 2) matchSources += geoCount - 1;
    } else if (need.value === "need_freeze") {
      if (hasHydro && (hasCryo || targetCarry.element === "Cryo")) matchSources += 2;
    } else if (need.value === "need_defense_buff") {
      if (allActiveTags.has("buff_defense")) matchSources += 2;
    } else if (need.value === "need_offfield_electro_dmg") {
      if (allActiveTags.has("off_field_electro_dmg") || allActiveTags.has("coordinated_attacks")) matchSources += 2;
      else if (allActiveTags.has("electro_application")) matchSources += 1;
    } else if (need.value.startsWith("need_battery")) {
      const neededElement = need.value.replace("need_battery_", "").toLowerCase();
      const sameElementBatteries = companions.filter(
        (c) =>
          c.character.element.toLowerCase() === neededElement &&
          (c.character.mechanics.some((m) => m.value === "battery") ||
            (c.character.name === "Ningguang" && c.constellation >= 2) ||
            c.character.name === "Diona" ||
            c.character.name === "Rosaria" ||
            c.character.name === "Shenhe" ||
            c.character.name === "Kaeya" ||
            c.character.name === "Aloy" ||
            c.character.name === "Sucrose" ||
            c.character.name === "Jean" ||
            c.character.name === "Venti" ||
            c.character.name === "Fischl" ||
            c.character.name === "Kujou Sara")
      );
      if (sameElementBatteries.length > 0) {
        matchSources += 2;
      } else if (allActiveTags.has("universal_battery")) {
        matchSources += 2;
      }
    } else if (need.value === "need_physical_shred") {
      if (allActiveTags.has("cryo_application") && (targetCarry.element === "Electro" || allActiveTags.has("electro_application"))) matchSources += 2; // Superconductor
      if (allActiveTags.has("debuff_physical_res")) matchSources += 2; // Eula / Rosaria C6 / Xinyan C4
      if (allActiveTags.has("debuff_all_res")) matchSources++; // Zhongli
      if (allActiveTags.has("debuff_defense")) matchSources++;
    } else if (need.value === "need_hydro_app" || need.value === "need_offfield_hydro_dmg") {
      if (allActiveTags.has("off_field_hydro_dmg") || allActiveTags.has("coordinated_attacks")) matchSources += 2;
      else if (allActiveTags.has("hydro_application")) matchSources += 1;
    } else if (need.value === "need_offfield_pyro_dmg" || need.value === "need_pyro_app") {
      if (allActiveTags.has("off_field_pyro_dmg")) matchSources += 2;
      else if (allActiveTags.has("pyro_application")) matchSources += 1;
    } else if (need.value === "need_sustain") {
      if (allActiveTags.has("healer") || allActiveTags.has("shield")) matchSources++;
    } else if (need.value === "need_crowd_control") {
      if (allActiveTags.has("crowd_control")) matchSources++;
    } else if (need.value === "need_offfield_dps") {
      if (allActiveTags.has("buff_electro_crit_dmg")) matchSources += 2; // Hiper-buffeo crítico reemplaza DPS off-field en Hypercarry
      if (allActiveTags.has("off_field_pyro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_hydro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_electro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_cryo_dmg")) matchSources++;
      if (allActiveTags.has("off_field_geo_dmg")) matchSources++;
    } else {
      if (allActiveTags.has(need.value)) matchSources++;
    }

    // Aplicar curva de rendimientos decrecientes (100%, 50%, 25%)
    let needScore = 0;
    for (let k = 1; k <= matchSources; k++) {
      if (k === 1) needScore += baseValue * 1.0;
      else if (k === 2) needScore += baseValue * 0.5;
      else needScore += baseValue * 0.25;
    }

    if (needScore > 0) {
      sScalingBuffs += Math.round(needScore);
      explanations.push(`Demanda satisfecha: ${need.value} (${matchSources} fuente(s) -> +${Math.round(needScore)} pts)`);
    }
  }

  // 2. S_amplification (Reacciones y Mono-Elemental)
  let sAmplification = 0;
  let detectedArchetype = "Sinergia Balanceada";

  if (
    targetCarry.damageProfile === "Physical Melee" ||
    targetCarry.name === "Razor" ||
    targetCarry.name === "Eula" ||
    targetCarry.name === "Xinyan"
  ) {
    const hasCryoApp = hasCryo || targetCarry.element === "Cryo";
    const hasElectroApp = hasElectro || targetCarry.element === "Electro";
    if (hasCryoApp && hasElectroApp) {
      sAmplification = 1000;
      if (allActiveTags.has("buff_superconduct_dmg")) {
        sAmplification += 200; // Superconductor Estelar (Witch Revelation)
        explanations.push(`Multiplicador físico: Superconductor Estelar mejorado (-40% RES Física + daño de reacción aumentado -> +${sAmplification} pts)`);
      } else {
        explanations.push(`Multiplicador físico: Superconductor (-40% RES Física enemigo -> +1000 pts)`);
      }
      detectedArchetype = "Superconductor Físico";
    }
  } else if (targetCarry.element === "Pyro") {
    let vapeScore = 0;
    let meltScore = 0;
    let monoPyroScore = 0;

    if (hasHydro) {
      vapeScore = 1000;
      if (
        allActiveTags.has("buff_vaporize_dmg") ||
        allActiveTags.has("hexerei_vaporize_bonus")
      ) {
        vapeScore += 200; // Presagio C1 / Rito de Mona
      }
      if (hasHydroCoordinated) {
        vapeScore += 350; // Hidro-aplicación coordinada de alta frecuencia para sostener vaporizados en cada golpe
      } else if (allActiveTags.has("off_field_hydro_dmg")) {
        vapeScore += 150; // Hidro-aplicación off-field intermitente
      }
    }

    if (hasCryo) {
      meltScore = 900;
      // Proximidad cuerpo a cuerpo favorece a Kaeya / Rosaria
      const hasCloseCryo = companions.some((c) => c.character.name === "Kaeya" || c.character.name === "Rosaria");
      if (hasCloseCryo) meltScore += 100;
    }

    const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
    if (pyroCount >= 3 && hasVV) {
      monoPyroScore = 950;
    }

    if (vapeScore >= meltScore && vapeScore >= monoPyroScore && vapeScore > 0) {
      sAmplification = vapeScore;
      detectedArchetype = "Vaporizados";
      explanations.push(`Multiplicador ofensivo: Vaporizado continuo (+${vapeScore} pts)`);
    } else if (meltScore >= vapeScore && meltScore >= monoPyroScore && meltScore > 0) {
      sAmplification = meltScore;
      detectedArchetype = "Derretidos";
      explanations.push(`Multiplicador ofensivo: Derretido orbital (+${meltScore} pts)`);
    } else if (monoPyroScore > 0) {
      sAmplification = monoPyroScore;
      detectedArchetype = "Mono Pyro Hipercarry";
      explanations.push(`Multiplicador ofensivo: Mono Pyro concentrado (+${monoPyroScore} pts)`);
    }
  } else if (targetCarry.element === "Hydro") {
    // Tartaglia (Childe) / Kokomi / Kamisato Ayato
    if (hasPyro || allActiveTags.has("off_field_pyro_dmg")) {
      sAmplification = 1000;
      detectedArchetype = targetCarry.name === "Kamisato Ayato" ? "Ayato Vaporizado" : "Vaporizados (Internacional)";
      explanations.push(`Multiplicador ofensivo: Vaporizado continuo con acompañante Pyro (+1000 pts)`);
    } else if (hasElectro && hasDendro) {
      sAmplification = 950;
      detectedArchetype = "Hiperflorecimiento";
      explanations.push(`Multiplicador elemental: Hiperflorecimiento (Dendro + Hydro + Electro) (+950 pts)`);
    } else if (hasElectro) {
      sAmplification = 850;
      detectedArchetype = targetCarry.name === "Sangonomiya Kokomi" ? "Kokomi Taser" : (targetCarry.name === "Kamisato Ayato" ? "Ayato Taser" : "Electro-Charged / Taser");
      explanations.push(`Multiplicador elemental: Electrocargado continuo (+850 pts)`);
    }
  } else if (targetCarry.element === "Dendro") {
    // Tighnari
    if (hasElectro) {
      sAmplification = 1100;
      detectedArchetype = "Tighnari Spread";
      explanations.push("Multiplicador elemental: Aceleración y Propagación (Spread) continua (+1100 pts)");
    } else if (hasHydro) {
      sAmplification = 600;
      detectedArchetype = "Florecimiento (Bloom)";
      explanations.push("Multiplicador elemental: Florecimiento (+600 pts)");
    }
  } else if (targetCarry.element === "Cryo") {
    // Ganyu / Ayaka
    let meltScore = 0;
    let freezeScore = 0;
    if (hasPyro || allActiveTags.has("off_field_pyro_dmg")) {
      meltScore = 1000;
    }
    if (hasHydro && (allActiveTags.has("crowd_control") || allActiveTags.has("need_freeze") || targetCarry.name === "Kamisato Ayaka")) {
      freezeScore = 1000;
      if (allActiveTags.has("crowd_control")) freezeScore += 100;
    }
    if (targetCarry.name === "Kamisato Ayaka" && freezeScore > 0) {
      sAmplification = freezeScore;
      detectedArchetype = "Ayaka Permafrost";
      explanations.push(`Multiplicador ofensivo: Permafrost permanente para Soumetsu (+${freezeScore} pts)`);
    } else if (meltScore >= freezeScore && meltScore > 0) {
      sAmplification = meltScore;
      detectedArchetype = "Derretidos (Melt Ganyu)";
      explanations.push(`Multiplicador ofensivo: Derretido cargado (+${meltScore} pts)`);
    } else if (freezeScore > 0) {
      sAmplification = freezeScore;
      detectedArchetype = "Permafrost / Morgana";
      explanations.push(`Multiplicador ofensivo: Congelamiento permanente con CC (+${freezeScore} pts)`);
    }
  } else if (targetCarry.element === "Anemo") {
    if (targetCarry.name === "Shikanoin Heizou") {
      if (hasPyro && hasHydro) {
        sAmplification = 1400;
        detectedArchetype = "Heizou Nacional";
        explanations.push("Multiplicador elemental: Vaporizado conducido con Torbellinos en área (Heizou Nacional) (+1400 pts)");
      } else if (hasHydro && hasElectro) {
        sAmplification = 1200;
        detectedArchetype = "Heizou Taser";
        explanations.push("Multiplicador elemental: Doble Torbellino Electrocargado continuo (Heizou Taser) (+1200 pts)");
      } else {
        sAmplification = 800;
        detectedArchetype = "Heizou Driver";
        explanations.push("Multiplicador Anemo: Driver cuerpo a cuerpo con Torbellinos continuos (+800 pts)");
      }
    } else if (targetCarry.name === "Xiao") {
      if (allActiveTags.has("battery")) {
        sAmplification = 1000;
        detectedArchetype = "Xiao Hypercarry";
        explanations.push("Multiplicador Anemo: Rotación fluida de Ataques Descendentes (+1000 pts)");
      }
    } else if (allActiveTags.has("battery")) {
      sAmplification = 1000;
      detectedArchetype = "Anemo Swirl/Burst";
      explanations.push("Multiplicador Anemo: Rotación fluida con batería elemental (+1000 pts)");
    }
  } else if (targetCarry.element === "Geo") {
    const geoCount = fullTeam.filter((c) => c.element === "Geo").length;
    if (geoCount >= 3 && allActiveTags.has("buff_defense")) {
      sAmplification = 1100;
      if (geoCount >= 4 || targetCarry.name === "Arataki Itto") {
        detectedArchetype = "Mono Geo Hiperdefensa";
      } else {
        detectedArchetype = "Triple Geo";
      }
      explanations.push("Multiplicador Geo: Hiperdefensa escalada con Gorou (+1100 pts)");
    } else if (geoCount >= 2) {
      sAmplification = 900;
      if (allActiveTags.has("shield")) sAmplification += 100;
      const pyroCount = fullTeam.filter((c) => c.element === "Pyro").length;
      if (pyroCount >= 2) {
        detectedArchetype = "Doble Geo Doble Pyro";
      } else {
        detectedArchetype = "Doble Geo";
      }
      explanations.push(`Multiplicador Geo: Resonancia Geo + Daño de cristalización (+${sAmplification} pts)`);
    }
  } else if (targetCarry.element === "Electro") {
    // Raiden / Keqing / Lisa
    if (targetCarry.name === "Shogun Raiden") {
      if (hasPyro && hasHydro) {
        sAmplification = 1100;
        if (hasCompanionCoordinated) {
          sAmplification += 300;
          explanations.push("Multiplicador elemental: Sobrecarga y Electro-Vaporizado continuo coordinado en equipo Nacional (+1400 pts)");
        } else {
          explanations.push("Multiplicador elemental: Sobrecarga y Electro-Vaporizado en equipo Nacional (+1100 pts)");
        }
        detectedArchetype = "Raiden National";
      } else if (allActiveTags.has("buff_electro_crit_dmg") || hasVV) {
        sAmplification = 1000;
        detectedArchetype = "Raiden Hypercarry";
        explanations.push("Multiplicador elemental: Electro Hipercarry concentrado (+1000 pts)");
      } else if (hasDendro) {
        sAmplification = 1000;
        detectedArchetype = "Aceleración / Aggravate";
        explanations.push("Multiplicador elemental: Aceleración e Intensificación (Aggravate) (+1000 pts)");
      } else if (hasHydro) {
        sAmplification = 850;
        detectedArchetype = "Electro-Charged / Taser";
        explanations.push("Multiplicador elemental: Electrocargado continuo (+850 pts)");
      }
    } else if (hasHydro) {
      sAmplification = 800;
      detectedArchetype = "Electro-Charged / Taser";
      explanations.push(`Multiplicador elemental: Electrocargado continuo (+800 pts)`);
    } else if (hasCryo) {
      sAmplification = 700;
      detectedArchetype = "Superconductor";
    }
  }

  // 3. S_blueprint (Pattern Matching con Presets Meta)
  let sBlueprint = 0;
  for (const preset of presets) {
    if (
      preset.composition.targetCarryName &&
      preset.composition.targetCarryName !== targetCarry.name
    ) {
      continue;
    }
    // Carries físicos no deben emparejarse con presets de reacciones elementales ofensivas
    if (
      (targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Xinyan") &&
      (preset.composition.archetype === "Vaporizados Clásico" ||
        preset.composition.archetype === "Vaporizados" ||
        preset.composition.archetype === "Derretidos" ||
        preset.composition.archetype === "Mono Pyro Hipercarry" ||
        preset.composition.archetype === "Sunfire Pyro Vaporizado")
    ) {
      continue;
    }
    if (
      preset.composition.carryElement &&
      preset.composition.carryElement !== targetCarry.element
    ) {
      continue;
    }
    let matches = 0;
    const reqTags = preset.composition.requiredTags ?? [];
    for (const rt of reqTags) {
      if (rt === "coordinated_attacks") {
        if (targetCarry.element === "Pyro" && preset.composition.archetype.includes("Vaporizado")) {
          if (hasHydroCoordinated) matches++;
        } else if (hasCompanionCoordinated) {
          matches++;
        }
      } else if (allActiveTags.has(rt)) {
        matches++;
      }
    }

    const teamElems: string[] = fullTeam.map((c) => c.element).sort();
    const presetElems = preset.composition.elements
      ? [...preset.composition.elements].sort()
      : [];
    let elemsMatch = false;
    if (presetElems.length === 4) {
      elemsMatch = teamElems.every((el, idx) => el === presetElems[idx]);
    } else if (presetElems.length > 0) {
      elemsMatch = presetElems.every((el) => teamElems.includes(el));
    } else {
      elemsMatch = true;
    }

    if (reqTags.length > 0 && matches === reqTags.length) {
      if (elemsMatch) {
        let bonus = preset.composition.targetCarryName ? 1600 : 1500;
        // Blueprints ultra-especializados con buffers dedicados (ej. Shenhe flat DMG o Sara C6 crit DMG)
        if (
          preset.composition.targetCarryName &&
          preset.composition.requiredTags?.some((t) => t.includes("flat_dmg") || t.includes("crit_dmg"))
        ) {
          bonus = 1650;
        }
        if (bonus > sBlueprint) {
          sBlueprint = bonus;
          if (preset.composition.archetype) {
            detectedArchetype = preset.composition.archetype;
          }
        }
      } else {
        const partial = 1000;
        if (partial > sBlueprint) {
          sBlueprint = partial;
          if (detectedArchetype === "Sinergia Balanceada" && preset.composition.archetype) {
            detectedArchetype = preset.composition.archetype;
          }
        }
      }
    } else if (reqTags.length > 0 && matches >= reqTags.length - 1) {
      const partial = 1000;
      if (partial > sBlueprint) sBlueprint = partial;
    }
  }

  if (sBlueprint > 0) {
    explanations.push(`Blueprint Meta reconocido: ${detectedArchetype} (+${sBlueprint} pts)`);
  }

  // 4. S_resonance (Resonancias Elementales Contextuales)
  let sResonance = 0;
  const elementCounts = new Map<string, number>();
  for (const c of fullTeam) {
    elementCounts.set(c.element, (elementCounts.get(c.element) ?? 0) + 1);
  }

  const scalesWithAtk = targetCarry.damageProfile !== "Geo Tank";

  if ((elementCounts.get("Pyro") ?? 0) >= 2) {
    const val = scalesWithAtk ? 400 : 150;
    sResonance += val;
    explanations.push(`Resonancia Pyro (+25% ATK -> +${val} pts)`);
  }

  if ((elementCounts.get("Geo") ?? 0) >= 2) {
    const isGeoCarry = targetCarry.element === "Geo";
    const val = isGeoCarry ? 500 : 300;
    sResonance += val;
    explanations.push(
      isGeoCarry
        ? `Resonancia Geo (+15% Daño protegido por escudo y -20% RES Geo -> +500 pts)`
        : `Resonancia Geo (+15% Daño protegido por escudo -> +300 pts)`
    );
  }

  if ((elementCounts.get("Cryo") ?? 0) >= 2) {
    sResonance += 350;
    explanations.push(`Resonancia Cryo (+15% Prob. Crítico -> +350 pts)`);
  }

  if ((elementCounts.get("Hydro") ?? 0) >= 2) {
    const hpBeneficiary = targetCarry.name === "Hu Tao" || fullTeam.some((c) => c.name === "Yelan");
    const val = hpBeneficiary ? 500 : 350;
    sResonance += val;
    explanations.push(`Resonancia Hydro (+25% Vida Máxima -> +${val} pts)`);
  }

  if ((elementCounts.get("Electro") ?? 0) >= 2) {
    sResonance += 250;
    explanations.push(`Resonancia Electro (Generación de partículas elementales -> +250 pts)`);
  }

  // 5. S_micro_affinities (Sinergias de Pares Tácticas)
  let sMicroAffinities = 0;

  // Sunfire: Jean + Bennett
  const hasJean = companions.some((c) => c.character.name === "Jean");
  const hasBennett = companions.some((c) => c.character.name === "Bennett");
  if (hasJean && hasBennett) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Motor Sunfire (Jean Q + Bennett Q) remolinos Pyro continuos (+300 pts)");
  }

  // Batería Pyro: Bennett + Xiangling
  const hasXiangling = companions.some((c) => c.character.name === "Xiangling");
  if (hasBennett && hasXiangling) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Batería Bennett alimentando Pyronado de Xiangling (+500 pts)");
  }

  // Snapshot: Fischl / Xiangling con Bennett ATK
  const hasFischl = companions.some((c) => c.character.name === "Fischl");
  if ((hasFischl || hasXiangling) && hasBennett) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Habilidad Snapshot fijando el buff de ATK (+300 pts)");
  }

  // Batería Pyro de Bennett para el Carry Pyro
  if (hasBennett && targetCarry.element === "Pyro" && targetCarry.name !== "Bennett") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Batería Bennett alimentando al Carry Pyro (+300 pts)");
  }

  // Bennett Buffer de ATK masivo para Carry en campo que escala con ATK (no-Pyro)
  if (
    hasBennett &&
    targetCarry.element !== "Pyro" &&
    scalesWithAtk &&
    targetCarry.name !== "Bennett"
  ) {
    sMicroAffinities += 300;
    explanations.push(
      `Micro-afinidad: Viaje Fantástico de Bennett hiperbufa el ATK base de ${targetCarry.name} en campo (+300 pts)`
    );
  }

  // Batería Electro: Fischl alimentando a Carry Electro
  if (hasFischl && targetCarry.element === "Electro" && targetCarry.name !== "Fischl" && targetCarry.name !== "Shogun Raiden") {
    sMicroAffinities += 300;
    explanations.push(
      `Micro-afinidad: Batería Electro (Oz de Fischl) recargando la Definitiva de ${targetCarry.name} (+300 pts)`
    );
  }

  // Buffer de Maestría Elemental (EM) para amplificación de reacciones
  const hasEMBuffer = allActiveTags.has("buff_elemental_mastery");
  if (
    hasEMBuffer &&
    (hasHydro || hasCryo) &&
    targetCarry.element === "Pyro" &&
    targetCarry.damageProfile !== "Physical Melee"
  ) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Buffer de Maestría Elemental potenciando reacciones de amplificación (+300 pts)");
  }

  // Ataques Coordinados en sincronía con Carry de Ataques Normales (Diluc, Keqing, Razor, Klee, Tartaglia, Hu Tao, Yoimiya, Raiden)
  if (
    hasCompanionCoordinated &&
    (targetCarry.damageProfile === "Pyro Melee" ||
      targetCarry.damageProfile === "Pyro Melee Fast" ||
      targetCarry.damageProfile === "Pyro Ranged Fast" ||
      targetCarry.damageProfile === "Electro Fast Melee" ||
      targetCarry.damageProfile === "Electro Fast" ||
      targetCarry.damageProfile === "Physical Melee" ||
      targetCarry.damageProfile === "Hydro Fast Melee" ||
      targetCarry.name === "Hu Tao" ||
      targetCarry.name === "Yoimiya" ||
      targetCarry.name === "Shogun Raiden")
  ) {
    sMicroAffinities += 350;
    explanations.push("Micro-afinidad: Ataques coordinados activados fluidamente por el Carry (+350 pts)");
  }

  // Batería Universal (Musou Isshin de Raiden)
  if (allActiveTags.has("universal_battery")) {
    sMicroAffinities += 350;
    explanations.push("Micro-afinidad: Batería Universal (Musou Isshin de Raiden) recargando energía de todo el equipo (+350 pts)");
  }

  // Bono de Daño a Habilidades Definitivas (Ojo del Castigo Atronador de Raiden)
  const teamHasBurstDamage =
    targetCarry.damageProfile?.includes("Burst") ||
    targetCarry.name === "Shogun Raiden" ||
    targetCarry.name === "Kamisato Ayaka" ||
    targetCarry.name === "Eula" ||
    targetCarry.name === "Tartaglia" ||
    fullTeam.some(
      (c) =>
        c.name === "Xiangling" ||
        c.name === "Xingqiu" ||
        c.name === "Beidou" ||
        c.name === "Rosaria"
    );
  if (allActiveTags.has("buff_burst_dmg") && teamHasBurstDamage) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Ojo del Castigo Atronador potencia el daño de las Definitivas (+300 pts)");
  }

  // Daño Crítico Electro (Kujou Sara C6)
  if (allActiveTags.has("buff_electro_crit_dmg") && (targetCarry.element === "Electro" || hasElectro)) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Danza Tengu C6 otorga +60% Daño Crítico Electro (+500 pts)");
  }

  // Dúo Hiperbuffer para Raiden Hypercarry (Bennett ATK plano + Sara C6 CRIT Electro)
  if (targetCarry.name === "Shogun Raiden" && hasBennett && allActiveTags.has("buff_electro_crit_dmg")) {
    sMicroAffinities += 400;
    explanations.push("Micro-afinidad: Dúo Hiperbuffer insustituible (Bennett ATK + Sara C6 CRIT Electro) (+400 pts)");
  }

  // Daño Crítico Geo (Gorou C6)
  if (
    allActiveTags.has("buff_geo_crit_dmg") &&
    targetCarry.element === "Geo" &&
    targetCarry.name !== "Sangonomiya Kokomi"
  ) {
    sMicroAffinities += 400;
    explanations.push("Micro-afinidad: Colmillo del General C6 otorga hasta +40% Daño Crítico Geo (+400 pts)");
  }

  // Bono Plano de Defensa (Estandarte de Gorou)
  if (
    allActiveTags.has("buff_defense") &&
    (targetCarry.name === "Noelle" ||
      targetCarry.name === "Arataki Itto" ||
      targetCarry.damageProfile?.includes("DEF Scaling"))
  ) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Estandarte de Gorou otorga Bono de Defensa y Resistencia a Interrupción (+300 pts)");
  }

  // Succión magnética de fragmentos de Cristalización (Gorou Q)
  if (
    allActiveTags.has("magnetize_crystallize") &&
    (targetCarry.element === "Geo" ||
      targetCarry.damageProfile?.includes("DEF Scaling"))
  ) {
    sMicroAffinities += 200;
    explanations.push("Micro-afinidad: Succión magnética de fragmentos de Cristalización garantizando uptime de escudos (+200 pts)");
  }

  // Bono de Daño a Ataques Normales (Thoma C6 / Yoimiya)
  if (
    allActiveTags.has("buff_normal_attack_dmg") &&
    (targetCarry.damageProfile === "Pyro Ranged Fast" ||
      targetCarry.damageProfile === "Physical Melee" ||
      targetCarry.name === "Yoimiya" ||
      targetCarry.name === "Razor" ||
      targetCarry.name === "Noelle")
  ) {
    sMicroAffinities += 250;
    explanations.push("Micro-afinidad: Bono de Daño a Ataques Normales en Carry rápido (+250 pts)");
  }

  // Pantalla de Jade Geo Buff con compañero Geo (solo si el Carry es Geo)
  const hasNingguang = fullTeam.some((c) => c.name === "Ningguang");
  const hasOtherGeo = fullTeam.some((c) => c.name !== "Ningguang" && c.element === "Geo");
  if (hasNingguang && hasOtherGeo && targetCarry.element === "Geo") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Pantalla de Jade otorga +12% Bono Geo a aliado (+300 pts)");
  }

  // Escudo de Jade de Zhongli (Universal Shred -20%)
  if (allActiveTags.has("debuff_all_res")) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Escudo de Jade de Zhongli tritura -20% todas las resistencias enemigas (+300 pts)");
  }

  // Búfer de Prob. Crítico (Rosaria / Hu Tao)
  if (allActiveTags.has("buff_crit_rate") && targetCarry.name !== "Rosaria") {
    sMicroAffinities += 250;
    explanations.push("Micro-afinidad: Bono de Probabilidad de Crítico compartido al Carry (+250 pts)");
  }

  // Hexerei Rite: 2 o más miembros Hexerei
  const hexereiCount = fullTeam.filter((c) => c.alignmentClass === "Hexerei").length;
  if (hexereiCount >= 2) {
    sMicroAffinities += 300;
    explanations.push(`Micro-afinidad: Rito Hexerei activo (${hexereiCount} brujas en equipo -> +300 pts)`);
  }

  // Bono de Daño Elemental / Universal (Pergamino del Héroe, Petra Arcaica, Kazuha A4, Sucrose C6)
  // Nota: buff_elemental_dmg solo beneficia al Carry si este es de elemento PHEC (Pyro, Hydro, Electro, Cryo)
  // y no es un carry de daño puramente físico. Elementos Dendro, Anemo, Geo y Físico son inertes para Petra/Swirl.
  const isPHECCarry = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
  const isPhysicalCarry = targetCarry.damageProfile?.toLowerCase().includes("physical");
  const hasElementalDmgBonus = isPHECCarry && !isPhysicalCarry && allActiveTags.has("buff_elemental_dmg");

  const hasDmgBonus =
    allActiveTags.has("buff_all_dmg") ||
    hasElementalDmgBonus ||
    allActiveTags.has(`buff_${targetCarry.element.toLowerCase()}_dmg`);
  if (hasDmgBonus) {
    sMicroAffinities += 400;
    explanations.push("Multiplicador de Daño: Bono de Daño Elemental / Universal al equipo (+400 pts)");
  }

  // Daño Plano Adicional (Son de Antaño)
  if (allActiveTags.has("buff_flat_dmg")) {
    sMicroAffinities += 300;
    explanations.push("Daño Plano Adicional: Son de Antaño convierte curación acumulada en daño de impacto (+300 pts)");
  }

  // Torbellino Estelar (Witch Revelation con Anemo)
  if (allActiveTags.has("buff_swirl_dmg") && fullTeam.some((c) => c.element === "Anemo")) {
    sMicroAffinities += 200;
    explanations.push("Micro-afinidad: Torbellino Estelar amplificado (Witch Revelation + Dispersión Cryo/Anemo) (+200 pts)");
  }

  // Aceleración / Propagación (Spread) directa para Tighnari con Electro
  if (targetCarry.name === "Tighnari" && hasElectro) {
    sMicroAffinities += 600;
    explanations.push("Micro-afinidad: Aceleración / Propagación (Spread) alimentada por Electro off-field (+600 pts)");
    if (hasFischl || fullTeam.some((c) => c.name === "Yae Miko")) {
      sMicroAffinities += 450;
      explanations.push("Micro-afinidad: Sinergia Electro de alta cadencia para Aceleración (Oz / Cerezos Kitsune) (+450 pts)");
    }
  }

  // Plumas Glaciares de Shenhe (Icy Quills)
  if (allActiveTags.has("buff_cryo_flat_dmg") && (targetCarry.element === "Cryo" || hasCryo)) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Plumas Glaciares de Shenhe (Icy Quills) inyectan daño plano masivo a golpes Cryo (+500 pts)");
    if (targetCarry.name === "Kamisato Ayaka") {
      sMicroAffinities += 500;
      explanations.push("Micro-afinidad: Núcleo Cryo Supremo (Ayaka Soumetsu + Shenhe Plumas Glaciares) (+500 pts)");
      if (fullTeam.some((c) => c.name === "Kaedehara Kazuha")) {
        sMicroAffinities += 350;
        explanations.push("Micro-afinidad: Agrupación y Bono Cryo masivo de Kazuha para la tormenta de Soumetsu (+350 pts)");
      }
    }
  }

  // Formación de las Nubes de Yun Jin para Carries de Ataque Normal
  const hasNormalAttackFocus =
    targetCarry.name === "Yoimiya" ||
    targetCarry.name === "Kamisato Ayato" ||
    targetCarry.name === "Noelle" ||
    targetCarry.damageProfile?.includes("Normal") ||
    targetCarry.damageProfile?.includes("Fast");
  const hasYunJin = fullTeam.some((c) => c.name === "Yun Jin");
  if (hasYunJin && hasNormalAttackFocus) {
    sMicroAffinities += 400;
    explanations.push(`Micro-afinidad: Formación de las Nubes de Yun Jin bufa los Ataques Normales de ${targetCarry.name} (+400 pts)`);
  }

  // Doble Hydro insustituible (Xingqiu + Yelan) para Hu Tao y Yoimiya
  const hasXingqiu = fullTeam.some((c) => c.name === "Xingqiu");
  const hasYelan = fullTeam.some((c) => c.name === "Yelan");
  if ((targetCarry.name === "Hu Tao" || targetCarry.name === "Yoimiya") && hasXingqiu && hasYelan) {
    sMicroAffinities += 500;
    explanations.push(`Micro-afinidad: Doble Hydro insustituible (Xingqiu + Yelan) garantizando vaporización perfecta y +25% Vida (+500 pts)`);
  }

  // Núcleo Hu Tao Doble Geo Clásico (Zhongli + Albedo)
  if (targetCarry.name === "Hu Tao") {
    const hasZhongli = fullTeam.some((c) => c.name === "Zhongli");
    const hasAlbedo = fullTeam.some((c) => c.name === "Albedo");
    if (hasZhongli && hasAlbedo) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Núcleo Doble Geo clásico (Zhongli Escudo + Albedo Daño Off-field y Maestría Elemental) (+300 pts)");
    }
  }

  // Núcleo Geo de Hiperdefensa (Gorou + Albedo alimentando a Itto)
  if (targetCarry.name === "Arataki Itto") {
    const hasGorou = fullTeam.some((c) => c.name === "Gorou");
    const hasAlbedo = fullTeam.some((c) => c.name === "Albedo");
    if (hasGorou && hasAlbedo) {
      sMicroAffinities += 400;
      explanations.push("Micro-afinidad: Núcleo Geo de Hiperdefensa (Gorou + Albedo alimentando a Itto) (+400 pts)");
    }
  }

  // Trituración de Resistencia Anemo genuina (Zhongli, Jean C4, Venti C2/C6, Faruzan)
  if (targetCarry.element === "Anemo" && (allActiveTags.has("debuff_anemo_res") || allActiveTags.has("debuff_all_res"))) {
    sMicroAffinities += 500;
    explanations.push("Micro-afinidad: Trituración de Resistencia Anemo genuina activa (Zhongli / Jean C4 / Faruzan) (+500 pts)");
  }

  // Sinergias de Heizou Driver (Nacional y Taser)
  if (targetCarry.name === "Shikanoin Heizou") {
    // 1. Driver activando ataques coordinados a gran cadencia
    if (hasCompanionCoordinated) {
      sMicroAffinities += 400;
      explanations.push("Micro-afinidad: Heizou Driver en campo activa ataques coordinados a máxima cadencia (+400 pts)");
    }
    // 2. Pasiva A4 (+80 ME al causar Torbellino)
    if (hasPyro || hasHydro || hasElectro) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Pasiva A4 (Razonamiento penetrante) comparte +80 ME tras Torbellino (+300 pts)");
    }
    // 3. Cargas de Declinación rápidas para Puñetazo Fudou
    if (hasCompanionCoordinated && (hasPyro || hasElectro || hasHydro)) {
      sMicroAffinities += 300;
      explanations.push("Micro-afinidad: Torbellinos continuos alimentan 4 cargas de Declinación para Puñetazo Fudou de Convicción (+300 pts)");
    }
  }

  // 6. P_penalties (Penalizaciones por Fallas Estructurales)
  let pPenalties = 0;

  // Falta de sostén (sin escudo ni curación)
  const hasHealer = allActiveTags.has("healer");
  const hasShield = allActiveTags.has("shield");
  if (!hasHealer && !hasShield) {
    pPenalties += 1500;
    explanations.push("Penalización crítica: Ausencia total de sustain (sin curador ni escudo -> -1500 pts)");
  }

  // Hu Tao con curación continua/dedicada (pierde pasiva A4 <50% HP si no hay mecánica de consumo como Furina)
  // Excluye a Xingqiu cuya micro-curación pasiva al romperse espadas es ideal para mantener a Hu Tao <50% HP
  const hasDedicatedHealer = companions.some(
    (c) =>
      c.character.name !== "Xingqiu" &&
      c.character.mechanics.some(
        (m) =>
          (m.value === "healer" || m.value === "continuous_healing") &&
          (!m.minConstellation || c.constellation >= m.minConstellation)
      )
  );
  if (targetCarry.name === "Hu Tao" && hasDedicatedHealer) {
    pPenalties += 250;
    explanations.push("Penalización leve: Curador continuo eleva vida por encima del 50% reduciendo bono A4 (-250 pts)");
  }

  // Sobrecarga cuerpo a cuerpo indeseada (Pyro Melee + Electro dispersa enemigos pequeños)
  if (targetCarry.damageProfile === "Pyro Melee" && hasElectro && !hasHydro) {
    pPenalties += 600;
    explanations.push("Penalización táctica: Sobrecarga empuja enemigos fuera del rango cuerpo a cuerpo (-600 pts)");
  }

  // Xiangling sin batería en el equipo (hambre de energía moderada, compensable con Favonius/ER)
  const hasBattery = allActiveTags.has("battery");
  if (hasXiangling && !hasBattery) {
    pPenalties += 250;
    explanations.push("Penalización energética moderada: Xiangling sin batería en el equipo (-250 pts)");
  }

  // Noelle Main DPS sin batería Geo
  if (targetCarry.name === "Noelle") {
    const hasGeoBattery =
      companions.some(
        (c) =>
          (c.character.name === "Ningguang" && c.constellation >= 2) ||
          c.character.name === "Gorou" ||
          c.character.name === "Albedo" ||
          c.character.name === "Shogun Raiden"
      ) || allActiveTags.has("universal_battery");
    if (!hasGeoBattery) {
      pPenalties += 600;
      explanations.push("Penalización de rotación: Noelle sin batería Geo de recarga rápida (-600 pts)");
    }
  }

  // Tartaglia con doble Hydro redundante que satura auras y elimina el control Anemo VV
  const hasOtherHydro = companions.some((c) => c.character.element === "Hydro");
  if (targetCarry.name === "Tartaglia" && hasOtherHydro) {
    pPenalties += 600;
    explanations.push("Penalización táctica: Doble Hydro con Tartaglia satura el aura e impide el control elemental Anemo por Torbellino (-600 pts)");
  }

  // Incompatibilidad mecánica dura Raiden + Beidou (Musou Isshin es daño de Definitiva y NO activa las descargas de Beidou)
  const hasBeidou = companions.some((c) => c.character.name === "Beidou");
  if (targetCarry.name === "Shogun Raiden" && hasBeidou) {
    pPenalties += 1000;
    explanations.push("Penalización crítica: Ruptura mecánica (los ataques en Definitiva de Raiden no pueden activar las descargas de Beidou) (-1000 pts)");
  }

  // Electro rompe el congelamiento en composiciones Permafrost
  if (
    targetCarry.element === "Cryo" &&
    (allActiveTags.has("need_freeze") || targetCarry.name === "Kamisato Ayaka") &&
    hasElectro
  ) {
    pPenalties += 800;
    explanations.push("Penalización táctica: Electro en equipo Permafrost consume auras y desestabiliza la congelación (-800 pts)");
  }

  // Yoimiya sin escudo (interrupciones constantes reinician el combo N5)
  if (targetCarry.name === "Yoimiya" && !hasShield) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Yoimiya sin escudo sufre interrupciones críticas que reinician su combo N5 (-400 pts)");
  }

  // Kokomi con buffs de Prob. Crítico (anulados por su pasiva -100% CRIT)
  if (targetCarry.name === "Sangonomiya Kokomi" && allActiveTags.has("buff_crit_rate")) {
    pPenalties += 250;
    explanations.push("Penalización mecánica: Buff de Probabilidad de Crítico anulado por pasiva (-100% CRIT) (-250 pts)");
  }

  // Interferencia de Hydro en Tighnari (Florecimiento consume aura Dendro y arruina Propagación)
  if (targetCarry.name === "Tighnari" && hasHydro) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Hidro genera Florecimiento descontrolado, consumiendo el aura Dendro y privando a Tighnari de Propagación (-400 pts)");
  }

  // Itto Main DPS sin batería Geo
  if (targetCarry.name === "Arataki Itto") {
    const hasGeoBattery =
      companions.some(
        (c) =>
          c.character.name === "Gorou" ||
          c.character.name === "Albedo" ||
          c.character.name === "Zhongli" ||
          (c.character.name === "Ningguang" && c.constellation >= 2)
      ) || allActiveTags.has("universal_battery");
    if (!hasGeoBattery) {
      pPenalties += 600;
      explanations.push("Penalización de rotación: Arataki Itto sin batería Geo para sostener su Definitiva de 70 de coste (-600 pts)");
    }
  }

  // Sombra Verde Esmeralda (VV) inútil en Anemo Hypercarry sin daño PHEC que swirlear
  const hasPHECOffField =
    allActiveTags.has("off_field_pyro_dmg") ||
    allActiveTags.has("off_field_hydro_dmg") ||
    allActiveTags.has("off_field_electro_dmg") ||
    allActiveTags.has("off_field_cryo_dmg");
  const hasVVAssigned = injectedArtifactTags.includes("need_resistance_shred");
  if (targetCarry.element === "Anemo" && hasVVAssigned && !hasPHECOffField) {
    pPenalties += 400;
    explanations.push("Penalización táctica: Sombra Verde Esmeralda (VV) no reduce Resistencia Anemo ni potencia ataques Anemo (-400 pts)");
  }

  // Gorou en equipo sin Carry Geo ni escalado de Defensa (soporte hiperespecializado desperdiciado)
  const hasGorou = companions.some((c) => c.character.name === "Gorou");
  const isDefOrGeoCarry =
    targetCarry.element === "Geo" ||
    targetCarry.damageProfile?.includes("DEF Scaling") ||
    targetCarry.name === "Noelle" ||
    targetCarry.name === "Arataki Itto";
  if (hasGorou && !isDefOrGeoCarry) {
    pPenalties += 800;
    explanations.push("Penalización táctica: Gorou es un buffer hiperespecializado en DEF/Geo; en este equipo sus aumentos de Defensa y Daño Crítico Geo son completamente desperdiciados (-800 pts)");
  }

  const totalScore =
    sScalingBuffs +
    sAmplification +
    sBlueprint +
    sResonance +
    sMicroAffinities -
    pPenalties;

  return {
    totalScore,
    breakdown: {
      scalingBuffs: sScalingBuffs,
      amplification: sAmplification,
      blueprint: sBlueprint,
      resonance: sResonance,
      microAffinities: sMicroAffinities,
      penalties: pPenalties,
    },
    detectedArchetype,
    explanations,
  };
}
