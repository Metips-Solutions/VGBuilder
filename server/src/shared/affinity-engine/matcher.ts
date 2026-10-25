import {
  MatchInput,
  CatalogData,
  TeamMatchResult,
  CharacterData,
} from "./types";
import { DEFAULT_CATALOG } from "./roster-data";
import { bindSupportArtifacts, CompanionEntry } from "./artifact-binder";
import { calculateTeamScore } from "./scoring";

/**
 * Determina los roles tácticos efectivos de un personaje en función de su constelación:
 * - Klee: Solo desbloquea "Support" a C2+ (minas con -23% DEF debuff).
 * - Razor: Solo desbloquea "Support" a C4+ (E pulsada con -15% DEF debuff).
 * - Amber: Solo desbloquea "Support" a C6+ (+15% ATK y Vel. Mov. al equipo).
 */
export function getEffectiveRoles(
  character: CharacterData,
  constellation: number = 0
): string[] {
  let roles = [...character.roles];

  // Klee: Main DPS en C0/C1; a C2+ desbloquea soporte debuffer de DEF
  if (character.name === "Klee") {
    if (constellation < 2) {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    } else if (!roles.some((r) => r.toLowerCase() === "support")) {
      roles.push("Support");
    }
  }

  // Razor: Main DPS en C0-C3; a C4+ desbloquea soporte debuffer de DEF
  if (character.name === "Razor") {
    if (constellation >= 4) {
      if (!roles.some((r) => r.toLowerCase() === "support")) {
        roles.push("Support");
      }
    } else {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    }
  }

  // Amber: Sub-DPS en C0-C5; a C6+ desbloquea soporte grupal
  if (character.name === "Amber") {
    if (constellation >= 6) {
      if (!roles.some((r) => r.toLowerCase() === "support")) {
        roles.push("Support");
      }
    } else {
      roles = roles.filter((r) => r.toLowerCase() !== "support");
    }
  }

  return roles;
}

/**
 * Task 3.1.1 & 3.1.2: Motor de Matching Óptimo para Carry.
 *
 * Evalúa todas las combinaciones C(K, 3) de acompañantes del inventario del jugador,
 * descartando incompatibilidades duras (anti-tags), asignando sets de artefactos de soporte,
 * y calculando el puntaje de afinidad total para retornar los mejores 5 equipos (Top 5).
 */
export function findOptimalTeams(
  input: MatchInput,
  catalog: CatalogData = DEFAULT_CATALOG
): TeamMatchResult[] {
  const targetCarry = catalog.characters.find(
    (c) => c.id === input.targetCharacterId || String(c.id) === String(input.targetCharacterId)
  );

  if (!targetCarry) {
    throw new Error(`Personaje carry con ID ${input.targetCharacterId} no encontrado en catálogo.`);
  }

  // Filtrar acompañantes válidos del inventario
  const blacklist = new Set((input.blacklist ?? []).map(String));
  const candidateEntries: CompanionEntry[] = [];

  for (const item of input.inventory) {
    const charIdStr = String(item.characterId);
    if (charIdStr === String(targetCarry.id)) continue;
    if (blacklist.has(charIdStr)) continue;

    const charData = catalog.characters.find(
      (c) => c.id === item.characterId || String(c.id) === charIdStr
    );
    if (!charData) continue;

    // Acompañante debe poder actuar como Sub-DPS, Soporte o Curador según su constelación
    const eligibleRoles = ["sub-dps", "support", "healer"];
    const charConstellation = item.constellation ?? 0;
    const effectiveRoles = getEffectiveRoles(charData, charConstellation);
    const hasEligibleRole = effectiveRoles.some((r) =>
      eligibleRoles.includes(r.toLowerCase())
    );

    if (hasEligibleRole) {
      candidateEntries.push({
        character: charData,
        constellation: charConstellation,
      });
    }
  }

  const K = candidateEntries.length;
  if (K < 3) {
    return []; // No hay suficientes acompañantes para formar un equipo de 4
  }

  const antiTagValues = new Set((targetCarry.antiTags ?? []).map((at) => at.value));
  const evaluatedTeams: TeamMatchResult[] = [];

  // Bucle de combinatoria C(K, 3)
  for (let i = 0; i < K - 2; i++) {
    for (let j = i + 1; j < K - 1; j++) {
      for (let k = j + 1; k < K; k++) {
        const trio: CompanionEntry[] = [
          candidateEntries[i],
          candidateEntries[j],
          candidateEntries[k],
        ];

        // 1. Hard Constraints: Comprobar Anti-Tags incompatibles con el Carry
        let hasConflict = false;
        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            // Verificar si la mecánica está activa en esta constelación
            if (m.minConstellation && comp.constellation < m.minConstellation) {
              continue;
            }
            if (antiTagValues.has(m.value)) {
              hasConflict = true;
              break;
            }
          }
          if (hasConflict) break;
        }

        if (hasConflict) continue; // Descarte inmediato (-infinito)

        // 2. Activar Tags del Equipo (constelaciones y alineamientos)
        const activeTags = new Set<string>();

        // Tags del Carry
        for (const m of targetCarry.mechanics) {
          activeTags.add(m.value);
        }

        // Tags de los Acompañantes
        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            if (m.minConstellation && comp.constellation < m.minConstellation) {
              continue;
            }
            activeTags.add(m.value);
          }
        }

        // Conteo de miembros de alineamiento (ej. Hexerei / Witch)
        const fullTeamChars = [targetCarry, ...trio.map((c) => c.character)];
        const hexereiCount = fullTeamChars.filter((c) => c.alignmentClass === "Hexerei").length;
        const witchCount = fullTeamChars.filter((c) => c.alignmentClass === "Witch").length;

        for (const comp of trio) {
          for (const m of comp.character.mechanics) {
            if (m.minAlignmentCount) {
              const alignCount = comp.character.alignmentClass === "Hexerei" ? hexereiCount : witchCount;
              if (alignCount >= m.minAlignmentCount) {
                activeTags.add(m.value);
              }
            }
          }
        }

        // 3. Asignación de Sets de Artefactos de Soporte (Waterfall)
        const { assignments, injectedTags } = bindSupportArtifacts(
          trio,
          targetCarry,
          catalog.artifactSets,
          catalog.artifactBinds
        );

        // 4. Evaluación de Puntuación Matemática
        const scoreResult = calculateTeamScore(
          targetCarry,
          trio,
          activeTags,
          injectedTags,
          catalog.presets,
          catalog.tagAffinities
        );

        // Encontrar constelación del carry en el inventario del jugador
        const carryInventory = input.inventory.find(
          (inv) => inv.characterId === targetCarry.id || String(inv.characterId) === String(targetCarry.id)
        );
        const carryConstellation = carryInventory?.constellation ?? 0;

        evaluatedTeams.push({
          rank: 0,
          archetype: scoreResult.detectedArchetype,
          totalScore: scoreResult.totalScore,
          team: [
            {
              id: targetCarry.id,
              name: targetCarry.name,
              element: targetCarry.element,
              role: "Main DPS",
              constellation: carryConstellation,
            },
            ...trio.map((c) => {
              const compRoles = getEffectiveRoles(c.character, c.constellation);
              const displayRole =
                compRoles.find((r) => r.toLowerCase() !== "main dps") ??
                compRoles[0] ??
                "Support";
              return {
                id: c.character.id,
                name: c.character.name,
                element: c.character.element,
                role: displayRole,
                constellation: c.constellation,
              };
            }),
          ],
          scoreBreakdown: scoreResult.breakdown,
          artifactAssignments: assignments,
          synergyTags: Array.from(activeTags).concat(injectedTags),
          explanations: scoreResult.explanations,
        });
      }
    }
  }

  // Ordenar combinaciones por puntuación total descendente
  evaluatedTeams.sort((a, b) => b.totalScore - a.totalScore);

  // Seleccionar el Top 5
  const topTeams = evaluatedTeams.slice(0, 5);
  topTeams.forEach((team, idx) => {
    team.rank = idx + 1;
  });

  return topTeams;
}
