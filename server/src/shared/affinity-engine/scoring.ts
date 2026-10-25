import {
  CharacterData,
  ScoreBreakdown,
  TeamPreset,
  TagAffinity,
} from "./types";
import { CompanionEntry } from "./artifact-binder";

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
        const hasVV =
          allActiveTags.has("need_resistance_shred") ||
          allActiveTags.has("debuff_elemental_res");
        if (hydroSources > 0) matchSources += hydroSources;
        else if (cryoSources > 0) matchSources += cryoSources;
        else if (pyroCount >= 3 && hasVV) matchSources += 1;
      } else if (targetCarry.element === "Electro") {
        if (allActiveTags.has("hydro_application")) matchSources++;
        if (allActiveTags.has("cryo_application")) matchSources++;
        if (allActiveTags.has("pyro_application")) matchSources++;
      } else {
        if (allActiveTags.has("hydro_application")) matchSources++;
        if (allActiveTags.has("cryo_application")) matchSources++;
      }
    } else if (need.value === "need_resistance_shred") {
      if (allActiveTags.has("need_resistance_shred")) matchSources++;
      if (allActiveTags.has("debuff_elemental_res")) matchSources++;
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
    } else if (need.value === "need_battery_geo") {
      const geoBatteries = companions.filter(
        (c) => c.character.element === "Geo" && (c.character.name === "Ningguang" && c.constellation >= 2)
      );
      if (geoBatteries.length > 0) matchSources += 2;
    } else if (need.value === "need_physical_shred") {
      if (allActiveTags.has("cryo_application") && targetCarry.element === "Electro") matchSources += 2; // Superconductor
      if (allActiveTags.has("debuff_defense")) matchSources++;
    } else if (need.value === "need_sustain") {
      if (allActiveTags.has("healer")) matchSources++;
      if (allActiveTags.has("shield")) matchSources++;
    } else if (need.value === "need_crowd_control") {
      if (allActiveTags.has("crowd_control")) matchSources++;
    } else if (need.value === "need_offfield_dps") {
      if (allActiveTags.has("off_field_pyro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_hydro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_electro_dmg")) matchSources++;
      if (allActiveTags.has("off_field_cryo_dmg")) matchSources++;
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

  const hasHydro = allActiveTags.has("hydro_application");
  const hasCryo = allActiveTags.has("cryo_application");
  const hasPyro = allActiveTags.has("pyro_application");
  const hasElectro = allActiveTags.has("electro_application");
  const hasVV = allActiveTags.has("need_resistance_shred") || allActiveTags.has("debuff_elemental_res");

  if (targetCarry.element === "Pyro") {
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
    }

    if (hasCryo) {
      meltScore = 900;
      // Proximidad cuerpo a cuerpo favorece a Kaeya
      const hasKaeya = companions.some((c) => c.character.name === "Kaeya");
      if (hasKaeya) meltScore += 100;
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
  } else if (targetCarry.damageProfile === "Physical Melee" || targetCarry.name === "Razor") {
    if (hasCryo && hasElectro) {
      sAmplification = 1000;
      detectedArchetype = "Superconductor Físico";
      explanations.push(`Multiplicador físico: Superconductor (-40% RES Física enemigo -> +1000 pts)`);
    }
  } else if (targetCarry.element === "Geo") {
    const geoCount = fullTeam.filter((c) => c.element === "Geo").length;
    if (geoCount >= 2) {
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
    if (hasHydro) {
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
    let matches = 0;
    const reqTags = preset.composition.requiredTags ?? [];
    for (const rt of reqTags) {
      if (allActiveTags.has(rt)) matches++;
    }

    const teamElems = fullTeam.map((c) => c.element).sort();
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
        const bonus = 1500;
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
    sResonance += 500;
    explanations.push(`Resonancia Geo (+15% Daño protegido por escudo -> +500 pts)`);
  }

  if ((elementCounts.get("Cryo") ?? 0) >= 2) {
    sResonance += 350;
    explanations.push(`Resonancia Cryo (+15% Prob. Crítico -> +350 pts)`);
  }

  if ((elementCounts.get("Hydro") ?? 0) >= 2) {
    sResonance += 350;
    explanations.push(`Resonancia Hydro (+25% Vida Máxima -> +350 pts)`);
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

  // Buffer de Maestría Elemental (EM) para amplificación de reacciones
  const hasEMBuffer = allActiveTags.has("buff_elemental_mastery");
  if (hasEMBuffer && (hasHydro || hasCryo) && targetCarry.element === "Pyro") {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Buffer de Maestría Elemental potenciando reacciones de amplificación (+300 pts)");
  }

  // Ataques Coordinados en sincronía con Carry de Ataques Normales (Diluc, Keqing, Razor)
  const hasCoordinated = allActiveTags.has("coordinated_attacks");
  if (
    hasCoordinated &&
    (targetCarry.damageProfile === "Pyro Melee" ||
      targetCarry.damageProfile === "Electro Fast Melee" ||
      targetCarry.damageProfile === "Physical Melee")
  ) {
    sMicroAffinities += 200;
    explanations.push("Micro-afinidad: Ataques coordinados activados fluidamente por el Carry melee (+200 pts)");
  }

  // Pantalla de Jade Geo Buff con compañero Geo
  const hasNingguang = fullTeam.some((c) => c.name === "Ningguang");
  const hasOtherGeo = fullTeam.some((c) => c.name !== "Ningguang" && c.element === "Geo");
  if (hasNingguang && hasOtherGeo) {
    sMicroAffinities += 300;
    explanations.push("Micro-afinidad: Pantalla de Jade otorga +12% Bono Geo a aliado (+300 pts)");
  }

  // Hexerei Rite: 2 o más miembros Hexerei
  const hexereiCount = fullTeam.filter((c) => c.alignmentClass === "Hexerei").length;
  if (hexereiCount >= 2) {
    sMicroAffinities += 300;
    explanations.push(`Micro-afinidad: Rito Hexerei activo (${hexereiCount} brujas en equipo -> +300 pts)`);
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

  // Sobrecarga cuerpo a cuerpo indeseada (Pyro Melee + Electro dispersa enemigos pequeños)
  if (targetCarry.damageProfile === "Pyro Melee" && hasElectro && !hasHydro) {
    pPenalties += 600;
    explanations.push("Penalización táctica: Sobrecarga empuja enemigos fuera del rango cuerpo a cuerpo (-600 pts)");
  }

  // Xiangling sin Bennett (hambre de energía extrema)
  if (hasXiangling && !hasBennett) {
    pPenalties += 800;
    explanations.push("Penalización energética: Xiangling sin Bennett como batería (-800 pts)");
  }

  // Noelle Main DPS sin batería Geo
  if (targetCarry.name === "Noelle") {
    const hasGeoBattery = companions.some(
      (c) => c.character.name === "Ningguang" && c.constellation >= 2
    );
    if (!hasGeoBattery) {
      pPenalties += 600;
      explanations.push("Penalización de rotación: Noelle sin batería Geo de recarga rápida (-600 pts)");
    }
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
