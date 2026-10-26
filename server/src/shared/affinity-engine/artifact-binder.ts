import type {
  CharacterData,
  SupportArtifactSet,
  CharacterArtifactBind,
  ArtifactAssignment,
} from "./types";

export type CompanionEntry = {
  character: CharacterData;
  constellation: number;
};

/**
 * Determina si un set de soporte es tácticamente viable para la composición del equipo.
 * - "Instructor" exige provocar reacciones que amplifiquen el daño del carry vía Maestría Elemental.
 *   Queda descalificado si:
 *   1. El Carry es Geo (Ningguang, Noelle) ya que no amplifica su daño con EM.
 *   2. El Carry es Físico (Razor, Eula, Xinyan) o Anemo Hipercarry (Xiao) que no amplifica su daño con EM.
 *   3. El equipo es Mono-Elemento (>= 3 personajes del mismo elemento sin reacciones amplificadoras).
 */
export function isSupportSetViableForTeam(
  setName: string,
  targetCarry: CharacterData,
  companions: CompanionEntry[]
): boolean {
  if (setName === "Instructor") {
    // 1. Carries Geo no escalan su daño con EM
    if (targetCarry.element === "Geo") return false;

    // 2. Carries Físicos o Anemo Hipercarry no escalan su daño principal con EM
    if (
      targetCarry.damageProfile === "Physical Melee" ||
      targetCarry.name === "Razor" ||
      targetCarry.name === "Eula" ||
      targetCarry.name === "Xiao"
    ) {
      return false;
    }

    // 3. Equipos Mono-Elemento sin reacciones amplificadoras
    const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
    const elementCounts = new Map<string, number>();
    for (const c of fullTeam) {
      elementCounts.set(c.element, (elementCounts.get(c.element) ?? 0) + 1);
    }

    const carryCount = elementCounts.get(targetCarry.element) ?? 0;
    if (carryCount >= 3) {
      if (targetCarry.element === "Pyro") {
        const hasReaction = fullTeam.some((c) => c.element === "Hydro" || c.element === "Cryo");
        if (!hasReaction) return false;
      } else if (targetCarry.element === "Cryo") {
        const hasReaction = fullTeam.some((c) => c.element === "Pyro");
        if (!hasReaction) return false;
      } else if (targetCarry.element === "Electro") {
        const hasReaction = fullTeam.some((c) => c.element === "Hydro" || c.element === "Dendro" || c.element === "Pyro");
        if (!hasReaction) return false;
      } else if (targetCarry.element === "Geo" || targetCarry.element === "Anemo") {
        return false;
      }
    }
  }

  if (setName === "Sombra Verde Esmeralda") {
    // Sombra Verde Esmeralda solo reduce resistencias PHEC (Pyro, Hydro, Electro, Cryo).
    // Si el Carry es Anemo o Geo, VV solo es viable si existe al menos un Sub-DPS PHEC que aproveche la bajada elemental.
    if (targetCarry.element === "Anemo" || targetCarry.element === "Geo") {
      const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
      const hasPHECSubDps = fullTeam.some(
        (c) =>
          ["Pyro", "Hydro", "Electro", "Cryo"].includes(c.element) &&
          c.roles.includes("Sub-DPS")
      );
      if (!hasPHECSubDps) {
        return false;
      }
    }
  }

  if (setName === "Petra Arcaica") {
    // Petra Arcaica otorga +35% de Bono de Daño Elemental al recoger un cristal de Cristalización.
    // 1. Debe existir al menos un elemento reactivo PHEC (Pyro, Hydro, Electro, Cryo) en el equipo.
    const fullTeam = [targetCarry, ...companions.map((c) => c.character)];
    const hasPHEC = fullTeam.some((c) =>
      ["Pyro", "Hydro", "Electro", "Cryo"].includes(c.element)
    );
    if (!hasPHEC) {
      return false;
    }

    // 2. Cristalización es inerte con Dendro, Anemo, Geo y Físico (no existen cristales de estos tipos).
    // Si el Carry no es PHEC o su daño es puramente físico, Petra Arcaica queda descalificado
    // para que la cascada asigne sets legítimos (Tenacidad, Nobleza, Recuerdos).
    const isPHECCarry = ["Pyro", "Hydro", "Electro", "Cryo"].includes(targetCarry.element);
    const isPhysicalCarry = targetCarry.damageProfile?.toLowerCase().includes("physical");
    if (!isPHECCarry || isPhysicalCarry) {
      return false;
    }
  }

  return true;
}

/**
 * Task 3.3.2 / Fase 3: Support Artifact Binder.
 *
 * Asigna de forma no duplicada los 11 sets de soporte universal a los
 * 3 acompañantes del equipo según su compatibilidad KQM y prioridad táctica.
 *
 * Aplica cascada si dos personajes compiten por el mismo set (ej. Bennett y Mona
 * por Nobleza) y emite alertas descriptivas si se requiere intervención del usuario.
 */
export function bindSupportArtifacts(
  companions: CompanionEntry[],
  targetCarry: CharacterData,
  artifactSets: SupportArtifactSet[],
  artifactBinds: CharacterArtifactBind[]
): {
  assignments: ArtifactAssignment[];
  injectedTags: string[];
} {
  const setByName = new Map<string, SupportArtifactSet>();
  for (const s of artifactSets) {
    setByName.set(s.name, s);
  }

  // Identificar candidatos de sets por cada acompañante
  type Candidate = {
    companion: CompanionEntry;
    setName: string;
    priority: number;
    setObj: SupportArtifactSet;
  };

  const allCandidates: Candidate[] = [];

  for (const comp of companions) {
    // Razor solo equipa sets de soporte universales cuando actúa en su rol de soporte (C4+)
    if (comp.character.name === "Razor" && comp.constellation < 4) {
      continue;
    }

    const binds = artifactBinds.filter(
      (b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase()
    );

    for (const b of binds) {
      // Filtrar sets no viables tácticamente para el equipo (ej. Instructor en Mono-Elemento o Carry Físico/Xiao)
      if (!isSupportSetViableForTeam(b.artifactName, targetCarry, companions)) {
        continue;
      }

      const setObj = setByName.get(b.artifactName);
      if (setObj) {
        allCandidates.push({
          companion: comp,
          setName: b.artifactName,
          priority: b.priority,
          setObj,
        });
      }
    }
  }

  // Ordenar candidatos por prioridad descendente (10 -> 1)
  allCandidates.sort((a, b) => b.priority - a.priority);

  const usedSets = new Set<string>();
  const companionAssignment = new Map<
    number,
    { setName: string; setObj: SupportArtifactSet }
  >();

  // Asignación voraz por mayor prioridad de impacto
  for (const cand of allCandidates) {
    const charId = cand.companion.character.id;
    if (companionAssignment.has(charId)) continue; // Ya tiene set asignado
    if (usedSets.has(cand.setName)) continue; // Set ya asignado a otro aliado

    companionAssignment.set(charId, {
      setName: cand.setName,
      setObj: cand.setObj,
    });
    usedSets.add(cand.setName);
  }

  const assignments: ArtifactAssignment[] = [];
  const injectedTags: string[] = [];

  for (const comp of companions) {
    const charId = comp.character.id;
    const assigned = companionAssignment.get(charId);

    if (assigned) {
      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: assigned.setName,
        providedTag: assigned.setObj.providedTag,
      });
      if (assigned.setObj.providedTag) {
        injectedTags.push(assigned.setObj.providedTag);
      }
    } else {
      // No se pudo asignar set único o no es viable en esta composición
      const compBinds = artifactBinds.filter(
        (b) => b.characterName.toLowerCase() === comp.character.name.toLowerCase()
      );
      const topSet = compBinds.length > 0 ? compBinds[0].artifactName : null;

      let alertMsg: string;
      if (topSet && usedSets.has(topSet)) {
        alertMsg = `Conflicto de set: ${comp.character.name} compite por ${topSet}, pero ya está asignado. Equípale con artefactos de daño personal/substats ofensivos.`;
      } else {
        alertMsg = `Sin set de soporte aplicable para esta composición: Equípale con artefactos de daño personal/estadísticas ofensivas acordes a su rol.`;
      }

      assignments.push({
        characterId: charId,
        characterName: comp.character.name,
        artifactSetName: "Set de Daño Personal (ej. Emblema)",
        providedTag: null,
        alert: alertMsg,
      });
    }
  }

  return { assignments, injectedTags };
}
